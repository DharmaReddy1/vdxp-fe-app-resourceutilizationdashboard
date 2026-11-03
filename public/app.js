import {metrics} from '/model.js';
const $=id=>document.getElementById(id);
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=(value,digits=1)=>Number(value).toLocaleString(undefined,{maximumFractionDigits:digits,minimumFractionDigits:digits});
const percent=r=>r.capacity?`${num(r.used/r.capacity*100,0)}%`:'N/A';
let data=[],selection=[];
function options(id,key,label){const values=[...new Set(data.map(r=>r[key]).filter(Boolean))].sort();$(id).innerHTML=`<option value="">${label}</option>`+values.map(v=>`<option value="${escape(v)}">${escape(v)}</option>`).join('');}
function setData(rows){data=rows;options('date','date','All dates');options('area','area','All process areas');$('status').value='';render();}
function render(){
 selection=data.filter(r=>(!$('date').value||r.date===$('date').value)&&(!$('area').value||r.area===$('area').value)&&(!$('status').value||($('status').value==='over'?r.used>=r.capacity:r.used<r.capacity)));
 const m=metrics(selection);$('scope').textContent=`${selection.length} of ${data.length} records`;
 const cards=[['Total resources',num(m.resources,0),'Across selected process areas',''],['Daily capacity',num(m.capacity),'Hours available to allocate',''],['Capacity used',num(m.used),'R1 hours from workbook',''],['Available hours',num(m.available),m.available<0?'Demand exceeds capacity':'Remaining daily capacity',m.available<0?'negative':'positive'],['Utilization',m.utilization===null?'N/A':`${num(m.utilization,0)}%`,`${m.overloaded} process records at capacity`,m.utilization>=100?'negative':'positive']];
 $('kpis').innerHTML=cards.map(([label,value,note,color])=>`<article class="kpi"><div class="kpi-label">${label}</div><div class="kpi-value ${color}">${value}</div><small>${note}</small></article>`).join('');
 const groups=new Map();selection.forEach(r=>{const g=groups.get(r.area)||{area:r.area,capacity:0,used:0};g.capacity+=r.capacity;g.used+=r.used;groups.set(r.area,g);});
 const areas=[...groups.values()].sort((a,b)=>(b.capacity?b.used/b.capacity:Infinity)-(a.capacity?a.used/a.capacity:Infinity));
 const max=Math.max(100,...areas.filter(r=>r.capacity).map(r=>r.used/r.capacity*100));
 $('bars').innerHTML=areas.length?areas.map(r=>`<div class="bar-row"><span title="${escape(r.area)}">${escape(r.area)}</span><div class="track"><div class="fill ${r.used>=r.capacity?'over':''}" style="width:${r.capacity?r.used/r.capacity*100/max*100:100}%"></div></div><strong class="${r.used>=r.capacity?'negative':''}">${percent(r)}</strong></div>`).join(''):'<div class="empty">No records match these filters.</div>';
 const denominator=Math.max(m.used,m.capacity,1),excess=Math.max(0,m.used-m.capacity);
 $('balance').innerHTML=`<div class="balance-big ${m.utilization>=100?'negative':'positive'}">${m.utilization===null?'N/A':num(m.utilization,0)+'%'}</div><div class="balance-label">total capacity utilization</div><div class="balance-meter"><span style="width:${Math.min(m.used,m.capacity)/denominator*100}%"></span><span class="excess" style="width:${excess/denominator*100}%"></span></div><div class="balance-keys"><span>${num(m.used)} h used</span><span>${num(m.capacity)} h capacity</span></div>`;
 $('attention').innerHTML=areas.filter(r=>r.used>=r.capacity).slice(0,5).map(r=>`<div class="attention-row"><span>${escape(r.area)}</span><strong class="negative">${num(Math.max(0,r.used-r.capacity))} h over</strong></div>`).join('')||'<p>No teams at capacity in this selection.</p>';
 const cells=r=>`<td>${num(r.resources,0)}</td><td>${num(r.capacity)}</td><td>${num(r.incidents,2)}</td><td>${num(r.srs,2)}</td><td>${num(r.ot,2)}</td><td>${num(r.defects)}</td><td>${num(r.used)}</td><td class="${r.capacity-r.used<0?'negative':''}">${num(r.capacity-r.used)}</td><td>${percent(r)}</td><td><span class="badge ${r.used>=r.capacity?'over':''}">${r.used>=r.capacity?'At Capacity':'Available'}</span></td>`;
 $('rows').innerHTML=selection.length?selection.map(r=>`<tr><td>${escape(r.area)}${r.date?`<br><small>${escape(r.date)}</small>`:''}</td>${cells(r)}</tr>`).join(''):'<tr><td colspan="11" class="empty">No matching records. Reset the filters to see all data.</td></tr>';
 $('totals').innerHTML=`<tr><td>Total · selected records</td>${cells(m)}</tr>`;
}
['date','area','status'].forEach(id=>$(id).addEventListener('change',render));
$('clear').onclick=()=>{['date','area','status'].forEach(id=>$(id).value='');render();};
$('upload').onchange=async event=>{
 const file=event.target.files[0];if(!file)return;
 if(!/\.(xlsx|xls)$/i.test(file.name)||file.size>10*1024*1024){$('notice').textContent='Choose an Excel workbook (.xlsx or .xls) under 10 MB.';event.target.value='';return;}
 $('notice').textContent='Reading and validating workbook…';$('upload').disabled=true;
 try{const response=await fetch('/api/import',{method:'POST',body:file});const result=await response.json();if(!response.ok)throw Error(result.error);setData(result.rows);$('source').textContent=file.name;$('notice').textContent=`Imported ${result.rows.length} records from ${result.sheetName}. All statistics reflect your selection.`;}
 catch(error){$('notice').textContent=`Import failed: ${error.message} Your displayed data has been kept.`;}
 finally{$('upload').disabled=false;event.target.value='';}
};
$('export').onclick=()=>{
 const keys=['date','area','resources','capacity','incidents','srs','ot','defects','used'];
 const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
 const csv=[['Date','Process Area','Resources','Daily Capacity (hrs)','Incidents','SRs','OT(CR, ME, PRB)','Defects','Capacity used for R1 (hours)','Available (hrs)','Utilization %'].map(quote).join(','),...selection.map(r=>[...keys.map(k=>r[k]),r.capacity-r.used,r.capacity?r.used/r.capacity*100:''].map(v=>quote(typeof v==='string'&&/^[=+\-@]/.test(v)?"'"+v:v)).join(','))].join('\r\n');
 const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='capacity-selection.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
fetch('/api/sample').then(r=>{if(!r.ok)throw Error('Unable to load sample');return r.json();}).then(setData).catch(error=>$('notice').textContent=error.message);
