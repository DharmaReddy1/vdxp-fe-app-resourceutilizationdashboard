sap.ui.define([], function () {
 "use strict";
 function number(value, digits) { return Number(value).toLocaleString(undefined, {minimumFractionDigits: digits, maximumFractionDigits: digits}); }
 function decorate(row) {
  var r = Object.assign({}, row);
  ["resources","capacity","incidents","srs","ot","defects","used"].forEach(function(key) { r[key+"Text"] = number(r[key], key==="resources"?0:1); });
  r.available = r.capacity-r.used;
  r.availableText = number(r.available,1);
  r.availableState = r.available<0?"Error":"Success";
  r.utilization = r.capacity?r.used/r.capacity*100:null;
  r.utilizationText = r.utilization===null?"N/A":number(r.utilization,0)+"%";
  r.barPercent = r.utilization===null?(r.used>0?100:0):Math.min(100,Math.max(0,r.utilization));
  r.state = r.used>=r.capacity?"Error":"Success";
  r.statusText = r.used>=r.capacity?"At Capacity":"Available";
  r.hoursText = number(r.used,1)+" / "+number(r.capacity,1)+" h";
  r.excessText = number(Math.max(0,r.used-r.capacity),1)+" hours over capacity";
  return r;
 }
 function summarize(rows) {
  var total = {};
  ["resources","capacity","incidents","srs","ot","defects","used"].forEach(function(key) {total[key]=rows.reduce(function(sum,row) {return sum+row[key];},0);});
  return decorate(total);
 }
 function build(rows, filters) {
  var selected=rows.filter(function(r) {return (!filters.date||r.date===filters.date)&&(!filters.area||r.area===filters.area)&&(!filters.status||(filters.status==="over"?r.used>=r.capacity:r.used<r.capacity));});
  var groups=new Map();
  selected.forEach(function(r) {var g=groups.get(r.area)||{area:r.area,capacity:0,used:0};g.capacity+=r.capacity;g.used+=r.used;groups.set(r.area,g);});
  var chart=Array.from(groups.values()).map(decorate).sort(function(a,b) {return (b.utilization===null?Infinity:b.utilization)-(a.utilization===null?Infinity:a.utilization);});
  var attention=chart.filter(function(r) {return r.used>=r.capacity;});
  return {records:selected.map(decorate),totals:summarize(selected),chart:chart,attention:attention,attentionCount:attention.length,scope:selected.length+" of "+rows.length+" records"};
 }
 return {build:build,decorate:decorate};
});