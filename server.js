import http from 'node:http';
import {readFile} from 'node:fs/promises';
import XLSX from 'xlsx';
import {sample,parseRows} from './model.js';
const port=Number(process.env.PORT || 4010);
const files={"/model/roster.js":["model/roster.js","text/javascript"],"/fragment/Resources.fragment.xml":["fragment/Resources.fragment.xml","application/xml"],"/":["index.html","text/html"],"/Component.js":["Component.js","text/javascript"],"/manifest.json":["manifest.json","application/json"],"/view/Main.view.xml":["view/Main.view.xml","application/xml"],"/model/capacity.js":["model/capacity.js","text/javascript"],"/controller/Main.controller.js":["controller/Main.controller.js","text/javascript"],"/css/style.css":["css/style.css","text/css"]};
http.createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  const json=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  try {
    if(req.method==='GET' && path==='/api/sample') return json(200,sample);
    if(req.method==='GET' && path==='/api/template') {
      const sheet=XLSX.utils.json_to_sheet(sample.map(r=>({'Date':r.date,'Process Area':r.area,'Resources':r.resources,'Daily Capacity (hrs)':r.capacity,'Incidents':r.incidents,'SRs':r.srs,'OT(CR, ME, PRB)':r.ot,'Defects':r.defects,'Capacity used for R1 (hours)':r.used})));
      const workbook=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook,sheet,'Capacity');
      res.writeHead(200,{'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Content-Disposition':'attachment; filename="capacity-template.xlsx"'});
      return res.end(XLSX.write(workbook,{type:'buffer',bookType:'xlsx'}));
    }
    if(req.method==='POST' && path==='/api/import') {
      const chunks=[];let size=0;
      for await(const chunk of req) {size+=chunk.length;if(size>10*1024*1024) {json(413,{error:'Workbook exceeds 10 MB.'});return;}chunks.push(chunk);}
      const workbook=XLSX.read(Buffer.concat(chunks),{type:'buffer',cellDates:true});
      const sheetName=workbook.SheetNames.find(name=>name.toLowerCase()==='capacity')||workbook.SheetNames[0];
      if(!sheetName) throw Error('Workbook contains no sheets.');
      const rows=parseRows(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:1,defval:''}));
      return json(200,{rows,sheetName});
    }
    if(req.method==='GET' && files[path]) {
      const [file,type]=files[path];res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-cache'});
      return res.end(await readFile(new URL(`./webapp/${file}`,import.meta.url)));
    }
    json(404,{error:'Not found'});
  } catch(error) {json(400,{error:path==='/api/import'?error.message:'Unable to process request.'});}
}).listen(port,'127.0.0.1',()=>console.log(`Capacity dashboard: http://localhost:${port}`));
