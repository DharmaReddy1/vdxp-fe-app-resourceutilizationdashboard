export const sample = [
  ['Plan & Source',2,16,.33,0,0,0,4],
  ['Make',3,24,.67,0,0,0,8],
  ['Customer Excellence',3,24,.67,1,41.25,0,177],
  ['Logistics',3,24,0,0,0,0,0],
  ['Finance',2,16,1,1.33,17.5,0,87.3],
  ['MDG',2,16,.33,.33,4.25,0,22.3],
  ['Technical - Dev',4,32,0,1,0,0,32],
  ['Technical - Security',4,32,0,2.33,11,0,53.3],
  ['Technical - Integration',2,16,.33,0,0,0,4],
  ['GTS',1,8,0,0,0,0,0]
].map(([area,resources,capacity,incidents,srs,ot,defects,used])=>({area,resources,capacity,incidents,srs,ot,defects,used,date:'2026-06-30'}));

export function metrics(rows) {
  const sum = key => rows.reduce((total,row)=>total+row[key],0);
  const capacity=sum('capacity'), used=sum('used');
  return {resources:sum('resources'),capacity,used,available:capacity-used,
    utilization:capacity ? used/capacity*100 : null,
    overloaded:rows.filter(r=>r.used>=r.capacity).length,
    incidents:sum('incidents'),srs:sum('srs'),ot:sum('ot'),defects:sum('defects')};
}

const normalized = value => String(value ?? '').toLowerCase().replace(/[^a-z0-9]/g,'');
const aliases = {
  area:['Process Area','Process'], resources:['Resources','Resource Count'],
  capacity:['Daily Capacity (hrs)','Daily Capacity','Capacity Hours'],
  incidents:['Incidents'],srs:['SRs','Service Requests'],ot:['OT(CR, ME, PRB)','OT','Other Tickets'],
  defects:['Defects'],used:['Capacity used for R1 (hours)','Capacity used for R1 (hrs)','Used Hours','Capacity Used'],
  date:['Date','Report Date']
};
export function parseRows(matrix) {
  const headerIndex=matrix.findIndex(row=>row.some(c=>aliases.area.map(normalized).includes(normalized(c))) && row.some(c=>aliases.capacity.map(normalized).includes(normalized(c))));
  if(headerIndex<0) throw Error('No capacity table found. Include Process Area and Daily Capacity (hrs) headers.');
  const header=matrix[headerIndex].map(normalized);
  const columns=Object.fromEntries(Object.entries(aliases).map(([key,names])=>[key,header.findIndex(c=>names.map(normalized).includes(c))]));
  for(const key of ['area','resources','capacity','incidents','srs','ot','defects','used']) {
    if(columns[key]<0) throw Error(`Missing required column: ${aliases[key][0]}`);
  }
  const reportDate=matrix.slice(0,headerIndex).flatMap(row=>row.map((cell,i)=>normalized(cell)==='date'?row[i+1]:null)).find(Boolean);
  function dateValue(value) {
    if(!value) return '';
    if(typeof value==='string' && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
      const raw=value.trim();
      const parsed=new Date(raw+'T00:00:00Z');
      if(Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0,10)!==raw) throw Error('Invalid report date.');
      return raw;
    }
    const date=value instanceof Date?value:new Date(String(value));
    if(Number.isNaN(date.getTime())) throw Error('Invalid report date. Use YYYY-MM-DD or an Excel date cell.');
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  const rows=[];
  matrix.slice(headerIndex+1).forEach((row,index)=>{
    const area=String(row[columns.area] ?? '').trim();
    if(!area || /^(total|grand total)$/i.test(area)) return;
    const record={area,date:dateValue(columns.date>=0?row[columns.date]:reportDate)};
    for(const key of ['resources','capacity','incidents','srs','ot','defects','used']) {
      const raw=row[columns[key]];
      const number=typeof raw==='number'?raw:Number(String(raw??'').replace(/,/g,'').trim());
      if(raw===undefined || raw===null || String(raw).trim()==='' || !Number.isFinite(number) || number<0) throw Error(`Row ${headerIndex+index+2}: ${aliases[key][0]} must be a nonnegative number.`);
      record[key]=number;
    }
    if(!Number.isInteger(record.resources)) throw Error(`Row ${headerIndex+index+2}: Resources must be a whole number.`);
    rows.push(record);
  });
  if(!rows.length) throw Error('The workbook has no data rows.');
  return rows;
}
