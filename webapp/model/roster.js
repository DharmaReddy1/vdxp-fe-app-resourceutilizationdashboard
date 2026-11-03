sap.ui.define([],function(){
"use strict";
var people=[
 {
  "id": "643057901",
  "name": "Pooja Solanki",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "BTP IS",
  "phone": "91-9916403494",
  "email": "psolank8@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643057207",
  "name": "Priyanka Srinivasan",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "BTP IS",
  "phone": "91-6374927562",
  "email": "psrini17@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059579",
  "name": "Sarojkanta Parida",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "BTP IS",
  "phone": "91-8460651484",
  "email": "SParid12@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "643057902",
  "name": "Manjeet Wadhwani",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Deliver (CE/SD)",
  "phone": "91-8446701104",
  "email": "MWadhwa9@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "643057900",
  "name": "Naveen Singh",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Deliver (CE/SD)",
  "phone": "91-7697766966",
  "email": "NSing170@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "643059130",
  "name": "Kaushik Samanta",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Deliver (CE/SD)",
  "phone": "91-8013533470",
  "email": "ksamant9@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643030116",
  "name": "Ramakrishna Vajapeyayajula",
  "release": "R1/R2.1",
  "allocation": "Shared",
  "role": "TL",
  "module": "Deliver (CE/SD) | ICSM | GTS",
  "phone": "1-6463311906",
  "email": "rvajapey@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643058265",
  "name": "Meenakshi Bapanapalli",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "EWM/IM",
  "phone": "1-6673204493",
  "email": "mbapanap@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "TBA",
  "name": "TBA",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "EWM/IM",
  "phone": "TBA",
  "email": "",
  "status": "Active"
 },
 {
  "id": "643059010",
  "name": "Siddhanta Chakraborty",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "EWM/IM",
  "phone": "91-7602954416",
  "email": "SChak184@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059026",
  "name": "Abhijit Khopade",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "EWM/IM",
  "phone": "91-9673273498",
  "email": "AKhopade@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643056840",
  "name": "Sreehari Tokala",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Finance",
  "phone": "91-9704343753",
  "email": "stokala1@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643046962",
  "name": "Avijit Kar",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Finance",
  "phone": "91-9831929097",
  "email": "AKar15@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643058916",
  "name": "Venkateswara Rao Penjarla",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL (Backup)",
  "module": "Finance-CO",
  "phone": "91-9000260917",
  "email": "vpenjarl@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643058370",
  "name": "Dixit Prajapati",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Make-PM",
  "phone": "91-8128975690",
  "email": "dprajap5@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059129",
  "name": "Sarin Francis",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Make-PM",
  "phone": "91-9884866202",
  "email": "sfranc23@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643057395",
  "name": "Nilesh Pagar",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Make-PP QM",
  "phone": "91-7588833633",
  "email": "npagar@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059241",
  "name": "Shashi Bhushan Roy",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Make-PP QM",
  "phone": "1-5166538250",
  "email": "SRoy145@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "702540843",
  "name": "Mohammad Imthiyaz",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "MDG",
  "phone": "91-9380762690",
  "email": "mimthiya@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643038065",
  "name": "Gopikrishna Reddy Vyata",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL (Backup)",
  "module": "Security",
  "phone": "91-9007078484",
  "email": "gvyata@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643057903",
  "name": "Lokesh Lal",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Security",
  "phone": "91-8149668170",
  "email": "llal2@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643058476",
  "name": "Shaik Salma",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Security",
  "phone": "91-7569325756",
  "email": "SSalma2@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "643054049",
  "name": "Jayeeta Das Saha",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Security",
  "phone": "91-9903333399",
  "email": "jdassah1@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059118",
  "name": "Adish Navghare",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Security",
  "phone": "91-8999538789",
  "email": "anavghar@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643055968",
  "name": "Soumava Das",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Source",
  "phone": "91-9830302752",
  "email": "sdas270@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059806",
  "name": "Mohd Amaan",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Tech - ABAP|RAP|Common Object",
  "phone": "91-9897819164",
  "email": "MAmaan1@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "643059291",
  "name": "Sumit Paddya",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Tech - ABAP|RAP|Common Object",
  "phone": "91-9836666571",
  "email": "spaddya@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643057394",
  "name": "Sanjay Pal",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "Tech - BTP AppDev|CAPM|RAP",
  "phone": "91-9038701729",
  "email": "SPal50@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059025",
  "name": "Arnab Majumdar",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Tech - CAPM|SBPA",
  "phone": "91-7384516466",
  "email": "amajum27@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059168",
  "name": "Dharma Reddy",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "Tech - CAPM|SBPA",
  "phone": "91-6304731570",
  "email": "DReddy29@ITS.JNJ.com",
  "status": "Active"
 },
 {
  "id": "643057402",
  "name": "Ashraf Bagwan",
  "release": "R1/R2.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "TM",
  "phone": "91-9975595655",
  "email": "ABagwan@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059011",
  "name": "Rasika Deshpande",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TM",
  "module": "TM",
  "phone": "91-9890872569",
  "email": "RDeshpa6@its.jnj.com",
  "status": "Active"
 },
 {
  "id": "643059348",
  "name": "Vaman Reddy",
  "release": "R2.2/R3.1",
  "allocation": "Dedicated",
  "role": "TL",
  "module": "VCM",
  "phone": "1-4754490565",
  "email": "vreddy98@its.jnj.com",
  "status": "Active"
 }
];
var mapping={
 "plan & source":["Source"],
 "make":["Make-PM","Make-PP QM"],
 "customer excellence":["Deliver (CE/SD)"],
 "logistics":["EWM/IM","TM"],
 "finance":["Finance","Finance-CO"],
 "mdg":["MDG"],
 "technical - dev":["Tech - ABAP|RAP|Common Object","Tech - BTP AppDev|CAPM|RAP","Tech - CAPM|SBPA"],
 "technical - security":["Security"],
 "technical - integration":["BTP IS"],
 "gts":["GTS"]
};
function normalize(value){return String(value||"").trim().toLowerCase().replace(/\s+/g," ");}
function modules(area){return mapping[normalize(area)]||[String(area||"").trim()];}
function find(area,release){
 var wanted=modules(area).map(normalize);
 return people.filter(function(p){
  var exact=normalize(p.module);
  var parts=p.module.split(/\s+\|\s+/).map(normalize);
  return p.status==="Active"&&(!release||p.release===release)&&wanted.some(function(m){return exact===m||parts.indexOf(m)>=0;});
 }).map(function(p){
  return Object.assign({},p,{
   emailHref:p.email?"mailto:"+p.email:"",
   phoneHref:p.phone!=="TBA"?"tel:+"+p.phone.replace(/[^0-9]/g,""):"",
   contactAvailable:p.phone!=="TBA",
   emailAvailable:!!p.email
  });
 }).sort(function(a,b){return a.name.localeCompare(b.name);});
}
return {find:find,modules:modules};
});