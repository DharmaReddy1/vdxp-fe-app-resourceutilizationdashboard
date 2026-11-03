sap.ui.define([
 "sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/m/MessageToast","../model/capacity","../model/roster","sap/ui/core/Fragment"
],function(Controller,JSONModel,MessageBox,MessageToast,capacity,roster,Fragment){
 "use strict";
 return Controller.extend("capacity.dashboard.controller.Main",{
  onInit:function(){
   this._rows=[];
   this._model=new JSONModel({busy:false,source:"Loading sample data...",filters:{date:"",area:"",status:""},dates:[{key:"",text:"All dates"}],areas:[{key:"",text:"All process areas"}],records:[],chart:[],attention:[],attentionCount:0,totals:capacity.build([],{ }).totals,scope:""});
   this._model.setSizeLimit(10000);this.getView().setModel(this._model,"vm");
   this._loadSample();
  },
  _loadSample:async function(){
   this._model.setProperty("/busy",true);
   try{var response=await fetch("/api/sample");if(!response.ok)throw Error("Could not load sample data.");this._setRows(await response.json(),"Sample workbook ? 30 Jun 2026");}
   catch(error){MessageBox.error(error.message);}
   finally{this._model.setProperty("/busy",false);}
  },
  onSample:function(){MessageBox.confirm("Discard the current tab data and reload the sample workbook?",{onClose:function(action){if(action===MessageBox.Action.OK)this._loadSample();}.bind(this)});},
  _setRows:function(rows,source){
   this._rows=rows;
   function options(key,label){return [{key:"",text:label}].concat(Array.from(new Set(rows.map(function(r){return r[key];}).filter(Boolean))).sort().map(function(v){return {key:v,text:v};}));}
   this._model.setProperty("/dates",options("date","All dates"));this._model.setProperty("/areas",options("area","All process areas"));
   this._model.setProperty("/source",source);this.onReset();
  },
  onFilterChange:function(){var result=capacity.build(this._rows,this._model.getProperty("/filters"));Object.keys(result).forEach(function(key){this._model.setProperty("/"+key,result[key]);}.bind(this));},
  onReset:function(){this._model.setProperty("/filters",{date:"",area:"",status:""});this.onFilterChange();},
  onTemplate:function(){window.location.assign("/api/template");},
  onFileSizeExceed:function(){MessageBox.error("Choose a workbook smaller than 10 MB.");},
  onTypeMismatch:function(){MessageBox.error("Choose an Excel workbook (.xlsx or .xls).");},
  onUpload:async function(event){
   var files=event.getParameter("files"),file=files&&files[0];if(!file)return;
   if(!/\.(xlsx|xls)$/i.test(file.name)||file.size>10*1024*1024){MessageBox.error("Choose an Excel workbook smaller than 10 MB.");return;}
   this._model.setProperty("/busy",true);
   try{
    var response=await fetch("/api/import",{method:"POST",body:file}),result=await response.json();
    if(!response.ok)throw Error(result.error||"Workbook import failed.");
    this._setRows(result.rows,file.name+" ? "+result.sheetName);
    MessageToast.show("Imported "+result.rows.length+" records.");
   }catch(error){MessageBox.error(error.message+" The displayed data has been kept.");}
   finally{this._model.setProperty("/busy",false);this.byId("upload").clear();}
  },

  onResourcesPress:async function(event){
   var context=event.getSource().getBindingContext("vm");
   if(!context)return;
   var row=context.getObject();
   if(!this._resourcesModel){
    this._resourcesModel=new JSONModel({});
    this.getView().setModel(this._resourcesModel,"resources");
   }
   this._resourcesModel.setData({area:row.area,workbookCount:row.resources,release:"R1/R2.1",title:row.area+" - Resource Contacts",people:[],summary:""});
   this._updateResources();
   try{
    if(!this._resourceDialogPromise){
     this._resourceDialogPromise=Fragment.load({id:this.getView().getId(),name:"capacity.dashboard.fragment.Resources",controller:this}).then(function(dialog){this.getView().addDependent(dialog);this._resourceDialog=dialog;return dialog;}.bind(this)).catch(function(error){this._resourceDialogPromise=null;throw error;}.bind(this));
    }
    var dialog=await this._resourceDialogPromise;dialog.open();
   }catch(error){MessageBox.error("Could not open resource contacts: "+error.message);}
  },
  _updateResources:function(){
   var data=this._resourcesModel.getData();
   var people=roster.find(data.area,data.release);
   this._resourcesModel.setProperty("/people",people);
   this._resourcesModel.setProperty("/summary","Workbook resources: "+data.workbookCount+" | Matching roster entries: "+people.length+" | Modules: "+roster.modules(data.area).join(", "));
  },
  onResourceReleaseChange:function(){this._updateResources();},
  onCloseResources:function(){if(this._resourceDialog)this._resourceDialog.close();},
  onExport:function(){
   var keys=["date","area","resources","capacity","incidents","srs","ot","defects","used","available","utilization"];
   function quote(value){var text=String(value==null?"":value);if(typeof value==="string"&&/^[=+\-@]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';}
   var header=["Date","Process Area","Resources","Daily Capacity (hrs)","Incidents","SRs","OT(CR, ME, PRB)","Defects","Capacity used for R1 (hours)","Available (hrs)","Utilization %"];
   var csv=[header.map(quote).join(",")].concat(this._model.getProperty("/records").map(function(row){return keys.map(function(key){return quote(row[key]);}).join(",");})).join("\r\n");
   var url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"})),link=document.createElement("a");link.href=url;link.download="capacity-selection.csv";link.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
 });
});