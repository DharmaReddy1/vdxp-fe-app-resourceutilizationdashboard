import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sample,metrics,parseRows} from '../model.js';
test('weighted totals derive utilization from hours, not row percentages',()=>{
 const m=metrics(sample);assert.equal(m.resources,26);assert.equal(m.capacity,208);
 assert.ok(Math.abs(m.used-387.9)<.001);assert.ok(Math.abs(m.utilization-186.4903846)<.001);
 assert.equal(m.overloaded,5);
});
const header=['Process Area','Resources','Daily Capacity (hrs)','Incidents','SRs','OT(CR, ME, PRB)','Defects','Capacity used for R1 (hours)'];
test('imports screenshot-style preamble and ignores supplied totals',()=>{
 const rows=parseRows([['Date:','Jun 30, 2026'],[],header,['Make',3,24,.67,0,0,0,8],['TOTAL',3,24,.67,0,0,0,8]]);
 assert.equal(rows.length,1);assert.equal(rows[0].date,'2026-06-30');assert.equal(rows[0].used,8);
});
test('rejects incomplete and invalid workbooks instead of replacing valid data',()=>{
 assert.throws(()=>parseRows([['Process Area','Daily Capacity (hrs)']]),/Missing required column/);
 assert.throws(()=>parseRows([header,['Make',3,24,0,0,0,0,'bad']]),/nonnegative/);
 assert.throws(()=>parseRows([header]),/no data rows/);
});
test('empty selections avoid divide-by-zero',()=>assert.equal(metrics([]).utilization,null));
