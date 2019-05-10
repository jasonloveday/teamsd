/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:4,minor:0,patch:1,flag:"-20101007",revision:Number("$Rev: 6824 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_e,_f){
if(typeof _e!="string"){
return dojo.global();
}
if(_e.indexOf(".")==-1){
return dojo.evalProp(_e,dojo.global(),_f);
}
var ref=dojo.parseObjPath(_e,dojo.global(),_f);
if(ref){
return dojo.evalProp(ref.prop,ref.obj,_f);
}
return null;
};
dojo.errorToString=function(_11){
if(!dj_undef("message",_11)){
return _11.message;
}else{
if(!dj_undef("description",_11)){
return _11.description;
}else{
return _11;
}
}
};
dojo.raise=function(_12,_13){
if(_13){
_12=_12+": "+dojo.errorToString(_13);
}else{
_12=dojo.errorToString(_12);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_12);
}
}
catch(e){
}
throw _13||Error(_12);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_15){
return dj_global.eval?dj_global.eval(_15):eval(_15);
}
dojo.unimplemented=function(_16,_17){
var _18="'"+_16+"' not implemented";
if(_17!=null){
_18+=" "+_17;
}
dojo.raise(_18);
};
dojo.deprecated=function(_19,_1a,_1b){
var _1c="DEPRECATED: "+_19;
if(_1a){
_1c+=" "+_1a;
}
if(_1b){
_1c+=" -- will be removed in version: "+_1b;
}
dojo.debug(_1c);
};
dojo.render=(function(){
function vscaffold(_1d,_1e){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1d};
for(var i=0;i<_1e.length;i++){
tmp[_1e[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _21={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_21;
}else{
for(var _22 in _21){
if(typeof djConfig[_22]=="undefined"){
djConfig[_22]=_21[_22];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _25=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _26={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_27,_28){
this.modulePrefixes_[_27]={name:_27,value:_28};
},moduleHasPrefix:function(_29){
var mp=this.modulePrefixes_;
return Boolean(mp[_29]&&mp[_29].value);
},getModulePrefix:function(_2b){
if(this.moduleHasPrefix(_2b)){
return this.modulePrefixes_[_2b].value;
}
return _2b;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _26){
dojo.hostenv[_2c]=_26[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if(_2d.charAt(0)=="/"||_2d.match(/^\w+:/)){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_2e?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _33=this.getText(uri,null,true);
if(!_33){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_36,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length;i>0;i--){
var _45=_43.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_45)){
_43[0]="../"+_43[0];
}else{
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=_47.split(".");
var _4d=this.getModuleSymbols(_47);
var _4e=((_4d[0].charAt(0)!="/")&&!_4d[0].match(/^\w+:/));
var _4f=_4d[_4d.length-1];
var ok;
if(_4f=="*"){
_47=_4c.slice(0,-1).join(".");
while(_4d.length){
_4d.pop();
_4d.push(this.pkgFileName);
_4b=_4d.join("/")+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,!_49?_47:null);
if(ok){
break;
}
_4d.pop();
}
}else{
_4b=_4d.join("/")+".js";
_47=_4c.join(".");
var _51=!_49?_47:null;
ok=this.loadPath(_4b,_51);
if(!ok&&!_48){
_4d.pop();
while(_4d.length){
_4b=_4d.join("/")+".js";
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
_4d.pop();
_4b=_4d.join("/")+"/"+this.pkgFileName+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
}
}
if(!ok&&!_49){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_52){
var _53=String(_52);
var _54=_53;
var _55=_52.split(/\./);
if(_55[_55.length-1]=="*"){
_55.pop();
_54=_55.join(".");
}
var _56=dojo.evalObjPath(_54,true);
this.loaded_modules_[_53]=_56;
this.loaded_modules_[_54]=_56;
return _56;
};
dojo.hostenv.findModule=function(_57,_58){
var lmn=String(_57);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_58){
dojo.raise("no loaded module named '"+_57+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_5a){
var _5b=_5a["common"]||[];
var _5c=_5a[dojo.hostenv.name_]?_5b.concat(_5a[dojo.hostenv.name_]||[]):_5b.concat(_5a["default"]||[]);
for(var x=0;x<_5c.length;x++){
var _5e=_5c[x];
if(_5e.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5e);
}else{
dojo.hostenv.loadModule(_5e);
}
}
};
dojo.require=function(_5f){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_60,_61){
var _62=arguments[0];
if((_62===true)||(_62=="common")||(_62&&dojo.render[_62].capable)){
var _63=[];
for(var i=1;i<arguments.length;i++){
_63.push(arguments[i]);
}
dojo.require.apply(dojo,_63);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_65){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_66,_67){
return dojo.hostenv.setModulePrefix(_66,_67);
};
dojo.setModulePrefix=function(_68,_69){
dojo.deprecated("dojo.setModulePrefix(\""+_68+"\", \""+_69+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_68,_69);
};
dojo.exists=function(obj,_6b){
var p=_6b.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_6e){
var _6f=_6e?_6e.toLowerCase():dojo.locale;
if(_6f=="root"){
_6f="ROOT";
}
return _6f;
};
dojo.hostenv.searchLocalePath=function(_70,_71,_72){
_70=dojo.hostenv.normalizeLocale(_70);
var _73=_70.split("-");
var _74=[];
for(var i=_73.length;i>0;i--){
_74.push(_73.slice(0,i).join("-"));
}
_74.push(false);
if(_71){
_74.reverse();
}
for(var j=_74.length-1;j>=0;j--){
var loc=_74[j]||"ROOT";
var _78=_72(loc);
if(_78){
break;
}
}
};
dojo.hostenv.localesGenerated;
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function preload(_79){
_79=dojo.hostenv.normalizeLocale(_79);
dojo.hostenv.searchLocalePath(_79,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
preload();
var _7c=djConfig.extraLocale||[];
for(var i=0;i<_7c.length;i++){
preload(_7c[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_7e,_7f,_80,_81){
dojo.hostenv.preloadLocalizations();
var _82=dojo.hostenv.normalizeLocale(_80);
var _83=[_7e,"nls",_7f].join(".");
var _84="";
if(_81){
var _85=_81.split(",");
for(var i=0;i<_85.length;i++){
if(_82.indexOf(_85[i])==0){
if(_85[i].length>_84.length){
_84=_85[i];
}
}
}
if(!_84){
_84="ROOT";
}
}
var _87=_81?_84:_82;
var _88=dojo.hostenv.findModule(_83);
var _89=null;
if(_88){
if(djConfig.localizationComplete&&_88._built){
return;
}
var _8a=_87.replace("-","_");
var _8b=_83+"."+_8a;
_89=dojo.hostenv.findModule(_8b);
}
if(!_89){
_88=dojo.hostenv.startPackage(_83);
var _8c=dojo.hostenv.getModuleSymbols(_7e);
var _8d=_8c.concat("nls").join("/");
var _8e;
dojo.hostenv.searchLocalePath(_87,_81,function(loc){
var _90=loc.replace("-","_");
var _91=_83+"."+_90;
var _92=false;
if(!dojo.hostenv.findModule(_91)){
dojo.hostenv.startPackage(_91);
var _93=[_8d];
if(loc!="ROOT"){
_93.push(loc);
}
_93.push(_7f);
var _94=_93.join("/")+".js";
_92=dojo.hostenv.loadPath(_94,null,function(_95){
var _96=function(){
};
_96.prototype=_8e;
_88[_90]=new _96();
for(var j in _95){
_88[_90][j]=_95[j];
}
});
}else{
_92=true;
}
if(_92&&_88[_90]){
_8e=_88[_90];
}else{
_88[_90]=_8e;
}
if(_81){
return true;
}
});
}
if(_81&&_82!=_84){
_88[_82.replace("-","_")]=_88[_84.replace("-","_")];
}
};
(function(){
var _98=djConfig.extraLocale;
if(_98){
if(!_98 instanceof Array){
_98=[_98];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_9c,_9d){
req(m,b,_9c,_9d);
if(_9c){
return;
}
for(var i=0;i<_98.length;i++){
req(m,b,_98[i],_9d);
}
};
}
})();
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _9f=document.location.toString();
var _a0=_9f.split("?",2);
if(_a0.length>1){
var _a1=_a0[1];
var _a2=_a1.split("&");
for(var x in _a2){
var sp=_a2[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _a6=document.getElementsByTagName("script");
var _a7=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_a6.length;i++){
var src=_a6[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_a7);
if(m){
var _ab=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_ab+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_ab;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_ab;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _b3=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_b3>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_b3+6,_b3+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
drh.ie80=drh.ie&&dav.indexOf("MSIE 8.0")>=0;
drh.ie90=drh.ie&&dav.indexOf("MSIE 9.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _b5=window["document"];
var tdi=_b5["implementation"];
if(drh.ie&&(window.location.protocol=="file:")){
djConfig.ieForceActiveXXhr=true;
}
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _b9=null;
var _ba=null;
if(!dojo.render.html.ie||!djConfig.ieForceActiveXXhr){
try{
_b9=new XMLHttpRequest();
}
catch(e){
}
}
if(!_b9){
for(var i=0;i<3;++i){
var _bc=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_b9=new ActiveXObject(_bc);
}
catch(e){
_ba=e;
}
if(_b9){
dojo.hostenv._XMLHTTP_PROGIDS=[_bc];
break;
}
}
}
if(!_b9){
return dojo.raise("XMLHTTP not available",_ba);
}
return _b9;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_be,_bf){
if(!_be){
this._blockAsync=true;
}
var _c0=this.getXmlhttpObject();
function isDocumentOk(_c1){
var _c2=_c1["status"];
return Boolean((!_c2)||((200<=_c2)&&(300>_c2))||(_c2==304));
}
if(_be){
var _c3=this,_c4=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_c0.onreadystatechange=function(){
if(_c4){
gbl.clearTimeout(_c4);
_c4=null;
}
if(_c3._blockAsync||(xhr&&xhr._blockAsync)){
_c4=gbl.setTimeout(function(){
_c0.onreadystatechange.apply(this);
},10);
}else{
if(4==_c0.readyState){
if(isDocumentOk(_c0)){
_be(_c0.responseText);
}
}
}
};
}
_c0.open("GET",uri,_be?true:false);
try{
_c0.send(null);
if(_be){
return null;
}
if(!isDocumentOk(_c0)){
var err=Error("Unable to load "+uri+" status:"+_c0.status);
err.status=_c0.status;
err.responseText=_c0.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_bf)&&(!_be)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _c0.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_c8){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_c8);
}else{
try{
var _c9=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_c9){
_c9=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_c8));
_c9.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_c8+"</div>");
}
catch(e2){
window.status=_c8;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_cb,_cc,fp){
var _ce=_cb["on"+_cc]||function(){
};
_cb["on"+_cc]=function(){
fp.apply(_cb,arguments);
_ce.apply(_cb,arguments);
};
return true;
}
function dj_load_init(e){
var _d0=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_d0!="domcontentloaded"&&_d0!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _d1=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_d1();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_d1);
}
}
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&!djConfig.delayMozLoadingFix)){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var _d3=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_d3=_d3.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_d3=_d3.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_d3.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _d4=new dojo.xml.Parse();
if(_d3.length>0){
for(var x=0;x<_d3.length;x++){
var _d6=document.getElementById(_d3[x]);
if(!_d6){
continue;
}
var _d7=_d4.parseElement(_d6,null,true);
dojo.widget.getParser().createComponents(_d7);
}
}else{
if(djConfig.parseWidgets){
var _d7=_d4.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_d7);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_dc,_dd){
dj_currentContext=_dc;
dj_currentDocument=_dd;
};
dojo._fireCallback=function(_de,_df,_e0){
if((_df)&&((typeof _de=="string")||(_de instanceof String))){
_de=_df[_de];
}
return (_df?_de.apply(_df,_e0||[]):_de());
};
dojo.withGlobal=function(_e1,_e2,_e3,_e4){
var _e5;
var _e6=dj_currentContext;
var _e7=dj_currentDocument;
try{
dojo.setContext(_e1,_e1.document);
_e5=dojo._fireCallback(_e2,_e3,_e4);
}
finally{
dojo.setContext(_e6,_e7);
}
return _e5;
};
dojo.withDoc=function(_e8,_e9,_ea,_eb){
var _ec;
var _ed=dj_currentDocument;
try{
dj_currentDocument=_e8;
_ec=dojo._fireCallback(_e9,_ea,_eb);
}
finally{
dj_currentDocument=_ed;
}
return _ec;
};
}
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_ee,_ef){
if(!dojo.lang.isFunction(_ef)){
dojo.raise("dojo.inherits: superclass argument ["+_ef+"] must be a function (subclass: ["+_ee+"']");
}
_ee.prototype=new _ef();
_ee.prototype.constructor=_ee;
_ee.superclass=_ef.prototype;
_ee["super"]=_ef.prototype;
};
dojo.lang._mixin=function(obj,_f1){
var _f2={};
for(var x in _f1){
if((typeof _f2[x]=="undefined")||(_f2[x]!=_f1[x])){
obj[x]=_f1[x];
}
}
if(dojo.render.html.ie&&(typeof (_f1["toString"])=="function")&&(_f1["toString"]!=obj["toString"])&&(_f1["toString"]!=_f2["toString"])){
obj.toString=_f1.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_f5){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_f8,_f9){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_f8.prototype,arguments[i]);
}
return _f8;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_fc,_fd,_fe,_ff){
if(!dojo.lang.isArrayLike(_fc)&&dojo.lang.isArrayLike(_fd)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_fc;
_fc=_fd;
_fd=temp;
}
var _101=dojo.lang.isString(_fc);
if(_101){
_fc=_fc.split("");
}
if(_ff){
var step=-1;
var i=_fc.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_fc.length;
}
if(_fe){
while(i!=end){
if(_fc[i]===_fd){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_fc[i]==_fd){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_105,_106,_107){
return dojo.lang.find(_105,_106,_107,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_108,_109){
return dojo.lang.find(_108,_109)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,name){
try{
return typeof obj[name]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _118=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_118++;
break;
}
}
return _118==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_11c){
var _11d=dojo.lang.isString(arr);
if(_11d){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_11c)){
_11c=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_11c){
var _11e=obj;
obj=_11c;
_11c=_11e;
}
}
if(Array.map){
var _11f=Array.map(arr,_11c,obj);
}else{
var _11f=[];
for(var i=0;i<arr.length;++i){
_11f.push(_11c.call(obj,arr[i]));
}
}
if(_11d){
return _11f.join("");
}else{
return _11f;
}
},reduce:function(arr,_122,obj,_124){
var _125=_122;
if(arguments.length==1){
dojo.debug("dojo.lang.reduce called with too few arguments!");
return false;
}else{
if(arguments.length==2){
_124=_122;
_125=arr.shift();
}else{
if(arguments.lenght==3){
if(dojo.lang.isFunction(obj)){
_124=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_124;
_124=obj;
obj=tmp;
}
}
}
}
var ob=obj?obj:dj_global;
dojo.lang.map(arr,function(val){
_125=_124.call(ob,_125,val);
});
return _125;
},forEach:function(_129,_12a,_12b){
if(dojo.lang.isString(_129)){
_129=_129.split("");
}
if(Array.forEach){
Array.forEach(_129,_12a,_12b);
}else{
if(!_12b){
_12b=dj_global;
}
for(var i=0,l=_129.length;i<l;i++){
_12a.call(_12b,_129[i],i,_129);
}
}
},_everyOrSome:function(_12e,arr,_130,_131){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_12e?"every":"some"](arr,_130,_131);
}else{
if(!_131){
_131=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _134=_130.call(_131,arr[i],i,arr);
if(_12e&&!_134){
return false;
}else{
if((!_12e)&&(_134)){
return true;
}
}
}
return Boolean(_12e);
}
},every:function(arr,_136,_137){
return this._everyOrSome(true,arr,_136,_137);
},some:function(arr,_139,_13a){
return this._everyOrSome(false,arr,_139,_13a);
},filter:function(arr,_13c,_13d){
var _13e=dojo.lang.isString(arr);
if(_13e){
arr=arr.split("");
}
var _13f;
if(Array.filter){
_13f=Array.filter(arr,_13c,_13d);
}else{
if(!_13d){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_13d=dj_global;
}
_13f=[];
for(var i=0;i<arr.length;i++){
if(_13c.call(_13d,arr[i],i,arr)){
_13f.push(arr[i]);
}
}
}
if(_13e){
return _13f.join("");
}else{
return _13f;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_144,_145){
var _146=[];
for(var i=_145||0;i<_144.length;i++){
_146.push(_144[i]);
}
return _146;
}});
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_149){
var _14a=window,_14b=2;
if(!dojo.lang.isFunction(func)){
_14a=func;
func=_149;
_149=arguments[2];
_14b++;
}
if(dojo.lang.isString(func)){
func=_14a[func];
}
var args=[];
for(var i=_14b;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_14a,args);
},_149);
};
dojo.lang.clearTimeout=function(_14e){
dojo.global().clearTimeout(_14e);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_157,_158,_159){
with(dojo.parseObjPath(_157,_158,_159)){
return dojo.evalProp(prop,obj,_159);
}
};
dojo.lang.setObjPathValue=function(_15a,_15b,_15c,_15d){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_15d=true;
}
with(dojo.parseObjPath(_15a,_15c,_15d)){
if(obj&&(_15d||(prop in obj))){
obj[prop]=_15b;
}
}
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_15e,_15f){
var fcn=(dojo.lang.isString(_15f)?_15e[_15f]:_15f)||function(){
};
return function(){
return fcn.apply(_15e,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_161,_162,_163){
var nso=(_162||dojo.lang.anon);
if((_163)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_161){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_161;
return ret;
};
dojo.lang.forward=function(_167){
return function(){
return this[_167].apply(this,arguments);
};
};
dojo.lang.curry=function(_168,func){
var _16a=[];
_168=_168||dj_global;
if(dojo.lang.isString(func)){
func=_168[func];
}
for(var x=2;x<arguments.length;x++){
_16a.push(arguments[x]);
}
var _16c=(func["__preJoinArity"]||func.length)-_16a.length;
function gather(_16d,_16e,_16f){
var _170=_16f;
var _171=_16e.slice(0);
for(var x=0;x<_16d.length;x++){
_171.push(_16d[x]);
}
_16f=_16f-_16d.length;
if(_16f<=0){
var res=func.apply(_168,_171);
_16f=_170;
return res;
}else{
return function(){
return gather(arguments,_171,_16f);
};
}
}
return gather([],_16a,_16c);
};
dojo.lang.curryArguments=function(_174,func,args,_177){
var _178=[];
var x=_177||0;
for(x=_177;x<args.length;x++){
_178.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_174,func].concat(_178));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_17e,_17f){
if(!farr.length){
if(typeof _17f=="function"){
_17f();
}
return;
}
if((typeof _17e=="undefined")&&(typeof cb=="number")){
_17e=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_17e){
_17e=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_17e,_17f);
},_17e);
};
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_181){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _184=dl.nameAnonFunc(args[2],ao.adviceObj,_181);
ao.adviceFunc=_184;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _184=dl.nameAnonFunc(args[0],ao.srcObj,_181);
ao.srcFunc=_184;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _184=dl.nameAnonFunc(args[1],dj_global,_181);
ao.srcFunc=_184;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _184=dl.nameAnonFunc(args[3],dj_global,_181);
ao.adviceObj=dj_global;
ao.adviceFunc=_184;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _184=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_181);
ao.aroundFunc=_184;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.connect(ao);
}
ao.srcFunc="onkeypress";
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _186={};
for(var x in ao){
_186[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_186.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_186));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _18e;
if((arguments.length==1)&&(typeof a1=="object")){
_18e=a1;
}else{
_18e={srcObj:a1,srcFunc:a2};
}
_18e.adviceFunc=function(){
var _18f=[];
for(var x=0;x<arguments.length;x++){
_18f.push(arguments[x]);
}
dojo.debug("("+_18e.srcObj+")."+_18e.srcFunc,":",_18f.join(", "));
};
this.kwConnect(_18e);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_196,_197){
var fn=(_197)?"disconnect":"connect";
if(typeof _196["srcFunc"]=="function"){
_196.srcObj=_196["srcObj"]||dj_global;
var _199=dojo.lang.nameAnonFunc(_196.srcFunc,_196.srcObj,true);
_196.srcFunc=_199;
}
if(typeof _196["adviceFunc"]=="function"){
_196.adviceObj=_196["adviceObj"]||dj_global;
var _199=dojo.lang.nameAnonFunc(_196.adviceFunc,_196.adviceObj,true);
_196.adviceFunc=_199;
}
_196.srcObj=_196["srcObj"]||dj_global;
_196.adviceObj=_196["adviceObj"]||_196["targetObj"]||dj_global;
_196.adviceFunc=_196["adviceFunc"]||_196["targetFunc"];
return dojo.event[fn](_196);
};
this.kwConnect=function(_19a){
return this._kwConnectImpl(_19a,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_19d){
return this._kwConnectImpl(_19d,true);
};
};
dojo.event.MethodInvocation=function(_19e,obj,args){
this.jp_=_19e;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_1a6){
this.object=obj||dj_global;
this.methodname=_1a6;
this.methodfunc=this.object[_1a6];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_1a8){
if(!obj){
obj=dj_global;
}
if(!obj[_1a8]){
obj[_1a8]=function(){
};
if(!obj[_1a8]){
dojo.raise("Cannot set do-nothing method on that object "+_1a8);
}
}else{
if((!dojo.lang.isFunction(obj[_1a8]))&&(!dojo.lang.isAlien(obj[_1a8]))){
return null;
}
}
var _1a9=_1a8+"$joinpoint";
var _1aa=_1a8+"$joinpoint$method";
var _1ab=obj[_1a9];
if(!_1ab){
var _1ac=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_1ac=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_1a9,_1aa,_1a8]);
}
}
var _1ad=obj[_1a8].length;
obj[_1aa]=obj[_1a8];
_1ab=obj[_1a9]=new dojo.event.MethodJoinPoint(obj,_1aa);
obj[_1a8]=function(){
var args=[];
if((_1ac)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_1ac)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _1ab.run.apply(_1ab,args);
};
obj[_1a8].__preJoinArity=_1ad;
}
return _1ab;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _1b3=[];
for(var x=0;x<args.length;x++){
_1b3[x]=args[x];
}
var _1b5=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _1b7=marr[0]||dj_global;
var _1b8=marr[1];
if(!_1b7[_1b8]){
dojo.raise("function \""+_1b8+"\" does not exist on \""+_1b7+"\"");
}
var _1b9=marr[2]||dj_global;
var _1ba=marr[3];
var msg=marr[6];
var _1bc;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _1b7[_1b8].apply(_1b7,to.args);
}};
to.args=_1b3;
var _1be=parseInt(marr[4]);
var _1bf=((!isNaN(_1be))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _1c2=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_1b5(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_1ba){
_1b9[_1ba].call(_1b9,to);
}else{
if((_1bf)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_1b7[_1b8].call(_1b7,to);
}else{
_1b7[_1b8].apply(_1b7,args);
}
},_1be);
}else{
if(msg){
_1b7[_1b8].call(_1b7,to);
}else{
_1b7[_1b8].apply(_1b7,args);
}
}
}
};
var _1c5=function(){
if(this.squelch){
try{
return _1b5.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _1b5.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_1c5);
}
var _1c6;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_1c6=mi.proceed();
}else{
if(this.methodfunc){
_1c6=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_1c5);
}
return (this.methodfunc)?_1c6:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_1cb,_1cc,_1cd,_1ce,_1cf,_1d0,once,_1d2,rate,_1d4){
var arr=this.getArr(_1cf);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_1cb,_1cc,_1cd,_1ce,_1d2,rate,_1d4];
if(once){
if(this.hasAdvice(_1cb,_1cc,_1cf,arr)>=0){
return;
}
}
if(_1d0=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_1d7,_1d8,_1d9,arr){
if(!arr){
arr=this.getArr(_1d9);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _1d8=="object")?(new String(_1d8)).toString():_1d8;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_1d7)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_1df,_1e0,_1e1,once){
var arr=this.getArr(_1e1);
var ind=this.hasAdvice(_1df,_1e0,_1e1,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_1df,_1e0,_1e1,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_1e5){
if(!this.topics[_1e5]){
this.topics[_1e5]=new this.TopicImpl(_1e5);
}
return this.topics[_1e5];
};
this.registerPublisher=function(_1e6,obj,_1e8){
var _1e6=this.getTopic(_1e6);
_1e6.registerPublisher(obj,_1e8);
};
this.subscribe=function(_1e9,obj,_1eb){
var _1e9=this.getTopic(_1e9);
_1e9.subscribe(obj,_1eb);
};
this.unsubscribe=function(_1ec,obj,_1ee){
var _1ec=this.getTopic(_1ec);
_1ec.unsubscribe(obj,_1ee);
};
this.destroy=function(_1ef){
this.getTopic(_1ef).destroy();
delete this.topics[_1ef];
};
this.publishApply=function(_1f0,args){
var _1f0=this.getTopic(_1f0);
_1f0.sendMessage.apply(_1f0,args);
};
this.publish=function(_1f2,_1f3){
var _1f2=this.getTopic(_1f2);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_1f2.sendMessage.apply(_1f2,args);
};
};
dojo.event.topic.TopicImpl=function(_1f6){
this.topicName=_1f6;
this.subscribe=function(_1f7,_1f8){
var tf=_1f8||_1f7;
var to=(!_1f8)?dj_global:_1f7;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_1fb,_1fc){
var tf=(!_1fc)?_1fb:_1fc;
var to=(!_1fc)?null:_1fb;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_1ff){
this._getJoinPoint().squelch=_1ff;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_200,_201){
dojo.event.connect(_200,_201,this,"sendMessage");
};
this.sendMessage=function(_202){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_205){
var na;
var tna;
if(_205){
tna=_205.all||_205.getElementsByTagName("*");
na=[_205];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _209={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _20e=0;
this.normalizedEventName=function(_20f){
switch(_20f){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _20f;
break;
default:
return _20f.toLowerCase();
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_213){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_213.length;x++){
node.__clobberAttrs__.push(_213[x]);
}
};
this.removeListener=function(node,_216,fp,_218){
if(!_218){
var _218=false;
}
_216=dojo.event.browser.normalizedEventName(_216);
if((_216=="onkey")||(_216=="key")){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_218);
}
_216="onkeypress";
}
if(_216.substr(0,2)=="on"){
_216=_216.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_216,fp,_218);
}
};
this.addListener=function(node,_21a,fp,_21c,_21d){
if(!node){
return;
}
if(!_21c){
var _21c=false;
}
_21a=dojo.event.browser.normalizedEventName(_21a);
if((_21a=="onkey")||(_21a=="key")){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_21c,_21d);
}
_21a="onkeypress";
}
if(_21a.substr(0,2)!="on"){
_21a="on"+_21a;
}
if(!_21d){
var _21e=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_21c){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_21e=fp;
}
if(node.addEventListener){
node.addEventListener(_21a.substr(2),_21e,_21c);
return _21e;
}else{
if(typeof node[_21a]=="function"){
var _221=node[_21a];
node[_21a]=function(e){
_221(e);
return _21e(e);
};
}else{
node[_21a]=_21e;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_21a]);
}
return _21e;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_224,_225){
if(typeof _224!="function"){
dojo.raise("listener not a function: "+_224);
}
dojo.event.browser.currentEvent.currentTarget=_225;
return _224.call(_225,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_228){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _22a=evt.keyCode;
if(_22a>=65&&_22a<=90&&evt.shiftKey==false){
_22a+=32;
}
if(_22a>=1&&_22a<=26&&evt.ctrlKey){
_22a+=96;
}
evt.key=String.fromCharCode(_22a);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _22a=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_22a+=32;
}
evt.key=String.fromCharCode(_22a);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_228?_228:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _22c=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_22c.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_22c.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event.common","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_234,_235){
var out="";
for(var i=0;i<_234;i++){
out+=str;
if(_235&&i<_234-1){
out+=_235;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_244,_245,_246){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_244){
this.mimetype=_244;
}
if(_245){
this.transport=_245;
}
if(arguments.length>=4){
this.changeUrl=_246;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,_249,_24a){
},error:function(type,_24c,_24d,_24e){
},timeout:function(type,_250,_251,_252){
},handle:function(type,data,_255,_256){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_257){
if(_257["url"]){
_257.url=_257.url.toString();
}
if(_257["formNode"]){
_257.formNode=dojo.byId(_257.formNode);
}
if(!_257["method"]&&_257["formNode"]&&_257["formNode"].method){
_257.method=_257["formNode"].method;
}
if(!_257["handle"]&&_257["handler"]){
_257.handle=_257.handler;
}
if(!_257["load"]&&_257["loaded"]){
_257.load=_257.loaded;
}
if(!_257["changeUrl"]&&_257["changeURL"]){
_257.changeUrl=_257.changeURL;
}
_257.encoding=dojo.lang.firstValued(_257["encoding"],djConfig["bindEncoding"],"");
_257.sendTransport=dojo.lang.firstValued(_257["sendTransport"],djConfig["ioSendTransport"],false);
var _258=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_257[fn]&&_258(_257[fn])){
continue;
}
if(_257["handle"]&&_258(_257["handle"])){
_257[fn]=_257.handle;
}
}
dojo.lang.mixin(this,_257);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_25f){
if(!(_25f instanceof dojo.io.Request)){
try{
_25f=new dojo.io.Request(_25f);
}
catch(e){
dojo.debug(e);
}
}
var _260="";
if(_25f["transport"]){
_260=_25f["transport"];
if(!this[_260]){
dojo.io.sendBindError(_25f,"No dojo.io.bind() transport with name '"+_25f["transport"]+"'.");
return _25f;
}
if(!this[_260].canHandle(_25f)){
dojo.io.sendBindError(_25f,"dojo.io.bind() transport with name '"+_25f["transport"]+"' cannot handle this type of request.");
return _25f;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_25f))){
_260=tmp;
break;
}
}
if(_260==""){
dojo.io.sendBindError(_25f,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _25f;
}
}
this[_260].bind(_25f);
_25f.bindSuccess=true;
return _25f;
};
dojo.io.sendBindError=function(_263,_264){
if((typeof _263.error=="function"||typeof _263.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _265=new dojo.io.Error(_264);
setTimeout(function(){
_263[(typeof _263.error=="function")?"error":"handle"]("error",_265,null,_263);
},50);
}else{
dojo.raise(_264);
}
};
dojo.io.queueBind=function(_266){
if(!(_266 instanceof dojo.io.Request)){
try{
_266=new dojo.io.Request(_266);
}
catch(e){
dojo.debug(e);
}
}
var _267=_266.load;
_266.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_267.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _269=_266.error;
_266.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_269.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_266);
dojo.io._dispatchNextQueueBind();
return _266;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_26c,last){
var enc=/utf/i.test(_26c||"")?encodeURIComponent:dojo.string.encodeAscii;
var _26f=[];
var _270=new Object();
for(var name in map){
var _272=function(elt){
var val=enc(name)+"="+enc(elt);
_26f[(last==name)?"push":"unshift"](val);
};
if(!_270[name]){
var _275=map[name];
if(dojo.lang.isArray(_275)){
dojo.lang.forEach(_275,_272);
}else{
_272(_275);
}
}
}
return _26f.join("&");
};
dojo.io.setIFrameSrc=function(_276,src,_278){
try{
var r=dojo.render.html;
if(!_278){
if(r.safari){
_276.location=src;
}else{
frames[_276.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_276.contentWindow.document;
}else{
if(r.safari){
idoc=_276.document;
}else{
idoc=_276.contentWindow;
}
}
if(!idoc){
_276.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_27b,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _27b.replace(/\%\{(\w+)\}/g,function(_27e,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _281=str.split(" ");
for(var i=0;i<_281.length;i++){
_281[i]=_281[i].charAt(0).toUpperCase()+_281[i].substring(1);
}
return _281.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _286=escape(str);
var _287,re=/%u([0-9A-F]{4})/i;
while((_287=_286.match(re))){
var num=Number("0x"+_287[1]);
var _28a=escape("&#"+num+";");
ret+=_286.substring(0,_287.index)+_28a;
_286=_286.substring(_287.index+_287[0].length);
}
ret+=_286.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_28f){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_28f){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_298){
if(_298){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_29c,_29d){
if(_29d){
str=str.toLowerCase();
_29c=_29c.toLowerCase();
}
return str.indexOf(_29c)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_2a3){
if(_2a3=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_2a3=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_2a5){
var _2a6=[];
for(var i=0,_2a8=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_2a5){
_2a6.push(str.substring(_2a8,i));
_2a8=i+1;
}
}
_2a6.push(str.substr(_2a8));
return _2a6;
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _2aa=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_2aa.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_2ac,_2ad){
var node=_2ac.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_2ad&&node&&node.tagName&&node.tagName.toLowerCase()!=_2ad.toLowerCase()){
node=dojo.dom.nextElement(node,_2ad);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_2af,_2b0){
var node=_2af.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_2b0&&node&&node.tagName&&node.tagName.toLowerCase()!=_2b0.toLowerCase()){
node=dojo.dom.prevElement(node,_2b0);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_2b3){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_2b3&&_2b3.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_2b3);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_2b5){
if(!node){
return null;
}
if(_2b5){
_2b5=_2b5.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_2b5&&_2b5.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_2b5);
}
return node;
};
dojo.dom.moveChildren=function(_2b6,_2b7,trim){
var _2b9=0;
if(trim){
while(_2b6.hasChildNodes()&&_2b6.firstChild.nodeType==dojo.dom.TEXT_NODE){
_2b6.removeChild(_2b6.firstChild);
}
while(_2b6.hasChildNodes()&&_2b6.lastChild.nodeType==dojo.dom.TEXT_NODE){
_2b6.removeChild(_2b6.lastChild);
}
}
while(_2b6.hasChildNodes()){
_2b7.appendChild(_2b6.firstChild);
_2b9++;
}
return _2b9;
};
dojo.dom.copyChildren=function(_2ba,_2bb,trim){
var _2bd=_2ba.cloneNode(true);
return this.moveChildren(_2bd,_2bb,trim);
};
dojo.dom.replaceChildren=function(node,_2bf){
var _2c0=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_2c0.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_2bf);
for(var i=0;i<_2c0.length;i++){
dojo.dom.destroyNode(_2c0[i]);
}
};
dojo.dom.removeChildren=function(node){
var _2c3=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _2c3;
};
dojo.dom.replaceNode=function(node,_2c5){
return node.parentNode.replaceChild(_2c5,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_2c9,_2ca){
var _2cb=[];
var _2cc=(_2c9&&(_2c9 instanceof Function||typeof _2c9=="function"));
while(node){
if(!_2cc||_2c9(node)){
_2cb.push(node);
}
if(_2ca&&_2cb.length>0){
return _2cb[0];
}
node=node.parentNode;
}
if(_2ca){
return null;
}
return _2cb;
};
dojo.dom.getAncestorsByTag=function(node,tag,_2cf){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_2cf);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_2d4,_2d5){
if(_2d5&&node){
node=node.parentNode;
}
while(node){
if(node==_2d4){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _2d8=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _2d9=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_2d9.length;i++){
try{
doc=new ActiveXObject(_2d9[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_2d8.implementation)&&(_2d8.implementation.createDocument)){
doc=_2d8.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_2dc){
if(!_2dc){
_2dc="text/xml";
}
if(!dj_undef("DOMParser")){
var _2dd=new DOMParser();
return _2dd.parseFromString(str,_2dc);
}else{
if(!dj_undef("ActiveXObject")){
var _2de=dojo.dom.createDocument();
if(_2de){
_2de.async=false;
_2de.loadXML(str);
return _2de;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _2df=dojo.doc();
if(_2df.createElement){
var tmp=_2df.createElement("xml");
tmp.innerHTML=str;
if(_2df.implementation&&_2df.implementation.createDocument){
var _2e1=_2df.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_2e1.importNode(tmp.childNodes.item(i),true);
}
return _2e1;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_2e4){
if(_2e4.firstChild){
_2e4.insertBefore(node,_2e4.firstChild);
}else{
_2e4.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_2e7){
if((_2e7!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _2e8=ref.parentNode;
_2e8.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_2eb){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_2eb!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_2eb);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_2ef){
if((!node)||(!ref)||(!_2ef)){
return false;
}
switch(_2ef.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_2f1,_2f2){
var _2f3=_2f1.childNodes;
if(!_2f3.length||_2f3.length==_2f2){
_2f1.appendChild(node);
return true;
}
if(_2f2==0){
return dojo.dom.prependChild(node,_2f1);
}
return dojo.dom.insertAfter(node,_2f3[_2f2-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _2f6=dojo.doc();
dojo.dom.replaceChildren(node,_2f6.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _2f7="";
if(node==null){
return _2f7;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_2f7+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_2f7+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _2f7;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_2fd,_2fe,_2ff){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_2fd,_2fe,_2ff);
}else{
var _300=elem.ownerDocument;
var _301=_300.createNode(2,_2fe,_2fd);
_301.nodeValue=_2ff;
elem.setAttributeNode(_301);
}
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _306=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_308){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_306.apply(this,[_308]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _309=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_30b){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_309){
_309.apply(this,[_30b]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_30e){
if(!dojo.render.html.opera){
var _30f=this._getUrlQuery(_30e.href);
if(_30f==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_30f==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_30f==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _310=this.historyStack.pop();
if(!_310){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_310);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _317=url.split("?");
if(_317.length<2){
return null;
}else{
return _317[1];
}
},_loadIframeHistory:function(){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _31a=false;
var _31b=node.getElementsByTagName("input");
dojo.lang.forEach(_31b,function(_31c){
if(_31a){
return;
}
if(_31c.getAttribute("type")=="file"){
_31a=true;
}
});
return _31a;
};
dojo.io.formHasFile=function(_31d){
return dojo.io.checkChildrenForFile(_31d);
};
dojo.io.updateNode=function(node,_31f){
node=dojo.byId(node);
var args=_31f;
if(dojo.lang.isString(_31f)){
args={url:_31f};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_326,_327,_328){
if((!_326)||(!_326.tagName)||(!_326.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_328){
_328=dojo.io.formFilter;
}
var enc=/utf/i.test(_327||"")?encodeURIComponent:dojo.string.encodeAscii;
var _32a=[];
for(var i=0;i<_326.elements.length;i++){
var elm=_326.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_328(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_32a.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_32a.push(name+"="+enc(elm.value));
}
}else{
_32a.push(name+"="+enc(elm.value));
}
}
}
var _330=_326.getElementsByTagName("input");
for(var i=0;i<_330.length;i++){
var _331=_330[i];
if(_331.type.toLowerCase()=="image"&&_331.form==_326&&_328(_331)){
var name=enc(_331.name);
_32a.push(name+"="+enc(_331.value));
_32a.push(name+".x=0");
_32a.push(name+".y=0");
}
}
return _32a.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _337=form.getElementsByTagName("input");
for(var i=0;i<_337.length;i++){
var _338=_337[i];
if(_338.type.toLowerCase()=="image"&&_338.form==form){
this.connect(_338,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _33f=false;
if(node.disabled||!node.name){
_33f=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_33f=node==this.clickedButton;
}else{
_33f=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _33f;
},connect:function(_340,_341,_342){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_340,_341,this,_342);
}else{
var fcn=dojo.lang.hitch(this,_342);
_340[_341]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _345=this;
var _346={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_348,_349){
return url+"|"+_348+"|"+_349.toLowerCase();
}
function addToCache(url,_34b,_34c,http){
_346[getCacheKey(url,_34b,_34c)]=http;
}
function getFromCache(url,_34f,_350){
return _346[getCacheKey(url,_34f,_350)];
}
this.clearCache=function(){
_346={};
};
function doLoad(_351,http,url,_354,_355){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_351.method.toLowerCase()=="head"){
var _357=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _357;
};
var _358=_357.split(/[\r\n]+/g);
for(var i=0;i<_358.length;i++){
var pair=_358[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_351.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_351.mimetype=="text/json"||_351.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_351.mimetype=="application/xml")||(_351.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_355){
addToCache(url,_354,_351.method,http);
}
_351[(typeof _351.load=="function")?"load":"handle"]("load",ret,http,_351);
}else{
var _35b=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_351[(typeof _351.error=="function")?"error":"handle"]("error",_35b,http,_351);
}
}
function setHeaders(http,_35d){
if(_35d["headers"]){
for(var _35e in _35d["headers"]){
if(_35e.toLowerCase()=="content-type"&&!_35d["contentType"]){
_35d["contentType"]=_35d["headers"][_35e];
}else{
http.setRequestHeader(_35e,_35d["headers"][_35e]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_345._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _362=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_362,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _363=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_364){
return _363&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_364["mimetype"].toLowerCase()||""))&&!(_364["formNode"]&&dojo.io.formHasFile(_364["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_365){
if(!_365["url"]){
if(!_365["formNode"]&&(_365["backButton"]||_365["back"]||_365["changeUrl"]||_365["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_365);
return true;
}
}
var url=_365.url;
var _367="";
if(_365["formNode"]){
var ta=_365.formNode.getAttribute("action");
if((ta)&&(!_365["url"])){
url=ta;
}
var tp=_365.formNode.getAttribute("method");
if((tp)&&(!_365["method"])){
_365.method=tp;
}
_367+=dojo.io.encodeForm(_365.formNode,_365.encoding,_365["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_365["file"]){
_365.method="post";
}
if(!_365["method"]){
_365.method="get";
}
if(_365.method.toLowerCase()=="get"){
_365.multipart=false;
}else{
if(_365["file"]){
_365.multipart=true;
}else{
if(!_365["multipart"]){
_365.multipart=false;
}
}
}
if(_365["backButton"]||_365["back"]||_365["changeUrl"]){
dojo.undo.browser.addToHistory(_365);
}
var _36a=_365["content"]||{};
if(_365.sendTransport){
_36a["dojo.transport"]="xmlhttp";
}
do{
if(_365.postContent){
_367=_365.postContent;
break;
}
if(_36a){
_367+=dojo.io.argsFromMap(_36a,_365.encoding);
}
if(_365.method.toLowerCase()=="get"||!_365.multipart){
break;
}
var t=[];
if(_367.length){
var q=_367.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_365.file){
if(dojo.lang.isArray(_365.file)){
for(var i=0;i<_365.file.length;++i){
var o=_365.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_365.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_367=t.join("\r\n");
}
}while(false);
var _370=_365["sync"]?false:true;
var _371=_365["preventCache"]||(this.preventCache==true&&_365["preventCache"]!=false);
var _372=_365["useCache"]==true||(this.useCache==true&&_365["useCache"]!=false);
if(!_371&&_372){
var _373=getFromCache(url,_367,_365.method);
if(_373){
doLoad(_365,_373,url,_367,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_365);
var _375=false;
if(_370){
var _376=this.inFlight.push({"req":_365,"http":http,"url":url,"query":_367,"useCache":_372,"startTime":_365.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_345._blockAsync=true;
}
if(_365.method.toLowerCase()=="post"){
if(!_365.user){
http.open("POST",url,_370);
}else{
http.open("POST",url,_370,_365.user,_365.password);
}
setHeaders(http,_365);
http.setRequestHeader("Content-Type",_365.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_365.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_367);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_365,{status:404},url,_367,_372);
}
}else{
var _377=url;
if(_367!=""){
_377+=(_377.indexOf("?")>-1?"&":"?")+_367;
}
if(_371){
_377+=(dojo.string.endsWithAny(_377,"?","&")?"":(_377.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_365.user){
http.open(_365.method.toUpperCase(),_377,_370);
}else{
http.open(_365.method.toUpperCase(),_377,_370,_365.user,_365.password);
}
setHeaders(http,_365);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_365,{status:404},url,_367,_372);
}
}
if(!_370){
doLoad(_365,http,url,_367,_372);
_345._blockAsync=false;
}
_365.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_379,days,path,_37c,_37d){
var _37e=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_37e=d.toGMTString();
}
_379=escape(_379);
document.cookie=name+"="+_379+";"+(_37e!=-1?" expires="+_37e+";":"")+(path?"path="+path:"")+(_37c?"; domain="+_37c:"")+(_37d?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _382=document.cookie.substring(idx+name.length+1);
var end=_382.indexOf(";");
if(end==-1){
end=_382.length;
}
_382=_382.substring(0,end);
_382=unescape(_382);
return _382;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_389,_38a,_38b){
if(arguments.length==5){
_38b=_389;
_389=null;
_38a=null;
}
var _38c=[],_38d,_38e="";
if(!_38b){
_38d=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_38d){
_38d={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _38d[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_38d[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _38d){
_38c.push(escape(prop)+"="+escape(_38d[prop]));
}
_38e=_38c.join("&");
}
dojo.io.cookie.setCookie(name,_38e,days,path,_389,_38a);
};
dojo.io.cookie.getObjectCookie=function(name){
var _391=null,_392=dojo.io.cookie.getCookie(name);
if(_392){
_391={};
var _393=_392.split("&");
for(var i=0;i<_393.length;i++){
var pair=_393[i].split("=");
var _396=pair[1];
if(isNaN(_396)){
_396=unescape(pair[1]);
}
_391[unescape(pair[0])]=_396;
}
}
return _391;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _397=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_397=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io.common"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _39a=dojo.global();
var _39b=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_39b.documentElement.clientWidth;
h=_39a.innerHeight;
}else{
if(!dojo.render.html.opera&&_39a.innerWidth){
w=_39a.innerWidth;
h=_39a.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_39b,"documentElement.clientWidth")){
var w2=_39b.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_39b.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _39f=dojo.global();
var _3a0=dojo.doc();
var top=_39f.pageYOffset||_3a0.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_39f.pageXOffset||_3a0.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _3a5=dojo.doc();
var _3a6=dojo.byId(node);
type=type.toLowerCase();
while((_3a6)&&(_3a6.nodeName.toLowerCase()!=type)){
if(_3a6==(_3a5["body"]||_3a5["documentElement"])){
return null;
}
_3a6=_3a6.parentNode;
}
return _3a6;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _3ae={x:0,y:0};
if(e.pageX||e.pageY){
_3ae.x=e.pageX;
_3ae.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_3ae.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_3ae.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _3ae;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _3b3=dojo.doc().createElement("script");
_3b3.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_3b3);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_3b6,_3b7,args,_3b9,_3ba){
dojo.deprecated("dojo.html."+_3b6,"replaced by dojo.html."+_3b7+"("+(_3b9?"node, {"+_3b9+": "+_3b9+"}":"")+")"+(_3ba?"."+_3ba:""),"0.5");
var _3bb=[];
if(_3b9){
var _3bc={};
_3bc[_3b9]=args[1];
_3bb.push(args[0]);
_3bb.push(_3bc);
}else{
_3bb=args;
}
var ret=dojo.html[_3b7].apply(dojo.html,args);
if(_3ba){
return ret[_3ba];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_3bf,uri){
var loc=dojo.hostenv.getModuleSymbols(_3bf).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _3c4=new dojo.uri.Uri(arguments[i].toString());
var _3c5=new dojo.uri.Uri(uri.toString());
if((_3c4.path=="")&&(_3c4.scheme==null)&&(_3c4.authority==null)&&(_3c4.query==null)){
if(_3c4.fragment!=null){
_3c5.fragment=_3c4.fragment;
}
_3c4=_3c5;
}else{
if(_3c4.scheme==null){
_3c4.scheme=_3c5.scheme;
if(_3c4.authority==null){
_3c4.authority=_3c5.authority;
if(_3c4.path.charAt(0)!="/"){
var path=_3c5.path.substring(0,_3c5.path.lastIndexOf("/")+1)+_3c4.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_3c4.path=segs.join("/");
}
}
}
}
uri="";
if(_3c4.scheme!=null){
uri+=_3c4.scheme+":";
}
if(_3c4.authority!=null){
uri+="//"+_3c4.authority;
}
uri+=_3c4.path;
if(_3c4.query!=null){
uri+="?"+_3c4.query;
}
if(_3c4.fragment!=null){
uri+="#"+_3c4.fragment;
}
}
this.uri=uri.toString();
var _3c9="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_3c9));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_3c9="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_3c9));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_3d0){
return (new RegExp("(^|\\s+)"+_3d0+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_3d2){
_3d2+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_3d2);
};
dojo.html.addClass=function(node,_3d4){
if(dojo.html.hasClass(node,_3d4)){
return false;
}
_3d4=(dojo.html.getClass(node)+" "+_3d4).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_3d4);
};
dojo.html.setClass=function(node,_3d6){
node=dojo.byId(node);
var cs=new String(_3d6);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_3d6);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_3d9,_3da){
try{
if(!_3da){
var _3db=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_3d9+"(\\s+|$)"),"$1$2");
}else{
var _3db=dojo.html.getClass(node).replace(_3d9,"");
}
dojo.html.setClass(node,_3db);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_3dd,_3de){
dojo.html.removeClass(node,_3de);
dojo.html.addClass(node,_3dd);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_3df,_3e0,_3e1,_3e2,_3e3){
_3e3=false;
var _3e4=dojo.doc();
_3e0=dojo.byId(_3e0)||_3e4;
var _3e5=_3df.split(/\s+/g);
var _3e6=[];
if(_3e2!=1&&_3e2!=2){
_3e2=0;
}
var _3e7=new RegExp("(\\s|^)(("+_3e5.join(")|(")+"))(\\s|$)");
var _3e8=_3e5.join(" ").length;
var _3e9=[];
if(!_3e3&&_3e4.evaluate){
var _3ea=".//"+(_3e1||"*")+"[contains(";
if(_3e2!=dojo.html.classMatchType.ContainsAny){
_3ea+="concat(' ',@class,' '), ' "+_3e5.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_3e2==2){
_3ea+=" and string-length(@class)="+_3e8+"]";
}else{
_3ea+="]";
}
}else{
_3ea+="concat(' ',@class,' '), ' "+_3e5.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _3eb=_3e4.evaluate(_3ea,_3e0,null,XPathResult.ANY_TYPE,null);
var _3ec=_3eb.iterateNext();
while(_3ec){
try{
_3e9.push(_3ec);
_3ec=_3eb.iterateNext();
}
catch(e){
break;
}
}
return _3e9;
}else{
if(!_3e1){
_3e1="*";
}
_3e9=_3e0.getElementsByTagName(_3e1);
var node,i=0;
outer:
while(node=_3e9[i++]){
var _3ef=dojo.html.getClasses(node);
if(_3ef.length==0){
continue outer;
}
var _3f0=0;
for(var j=0;j<_3ef.length;j++){
if(_3e7.test(_3ef[j])){
if(_3e2==dojo.html.classMatchType.ContainsAny){
_3e6.push(node);
continue outer;
}else{
_3f0++;
}
}else{
if(_3e2==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_3f0==_3e5.length){
if((_3e2==dojo.html.classMatchType.IsOnly)&&(_3f0==_3ef.length)){
_3e6.push(node);
}else{
if(_3e2==dojo.html.classMatchType.ContainsAll){
_3e6.push(node);
}
}
}
}
return _3e6;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_3f2){
var arr=_3f2.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_3f6){
return _3f6.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.html.getComputedStyle=function(node,_3f8,_3f9){
node=dojo.byId(node);
var _3f8=dojo.html.toSelectorCase(_3f8);
var _3fa=dojo.html.toCamelCase(_3f8);
if(!node||!node.style){
return _3f9;
}else{
if(document.defaultView&&dojo.html.isDescendantOf(node,node.ownerDocument)){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_3f8);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_3f8);
}else{
return _3f9;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_3fa];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_3f8);
}else{
return _3f9;
}
};
dojo.html.getStyleProperty=function(node,_3fd){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_3fd)]:undefined);
};
dojo.html.getStyle=function(node,_3ff){
var _400=dojo.html.getStyleProperty(node,_3ff);
return (_400?_400:dojo.html.getComputedStyle(node,_3ff));
};
dojo.html.setStyle=function(node,_402,_403){
node=dojo.byId(node);
if(node&&node.style){
var _404=dojo.html.toCamelCase(_402);
node.style[_404]=_403;
}
};
dojo.html.setStyleText=function(_405,text){
try{
_405.style.cssText=text;
}
catch(e){
_405.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_407,_408){
if(!_408.style.cssText){
_407.setAttribute("style",_408.getAttribute("style"));
}else{
_407.style.cssText=_408.style.cssText;
}
dojo.html.addClass(_407,dojo.html.getClass(_408));
};
dojo.html.getUnitValue=function(node,_40a,_40b){
var s=dojo.html.getComputedStyle(node,_40a);
if((!s)||((s=="auto")&&(_40b))){
return {value:0,units:"px"};
}
var _40d=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_40d){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_40d[1]),units:_40d[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
dojo.html.getPixelValue=function(node,_40f,_410){
var _411=dojo.html.getUnitValue(node,_40f,_410);
if(isNaN(_411.value)){
return 0;
}
if((_411.value)&&(_411.units!="px")){
return NaN;
}
return _411.value;
};
dojo.html.setPositivePixelValue=function(node,_413,_414){
if(isNaN(_414)){
return false;
}
node.style[_413]=Math.max(0,_414)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_415,_416,_417){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_417=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_417=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_415+" { "+_416+" }";
return dojo.html.styleSheet.insertRule(rule,_417);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_415,_416,_417);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_419){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_419){
_419=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_419);
}
}else{
if(document.styleSheets[0]){
if(!_419){
_419=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_419);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_41c,_41d){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _41e=dojo.hostenv.getText(URI,false,_41d);
if(_41e===null){
return;
}
_41e=dojo.html.fixPathsInCssText(_41e,URI);
if(_41c){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_41e)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _423=doc.getElementsByTagName("style");
for(var i=0;i<_423.length;i++){
if(_423[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _424=dojo.html.insertCssText(_41e,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_41e,"nodeRef":_424});
if(_424&&djConfig.isDebug){
_424.setAttribute("dbgHref",URI);
}
return _424;
};
dojo.html.insertCssText=function(_425,doc,URI){
if(!_425){
return;
}
if(!doc){
doc=document;
}
if(URI){
_425=dojo.html.fixPathsInCssText(_425,URI);
}
var _428;
var _429=doc.getElementsByTagName("style");
if(_429.length==0){
_428=doc.createElement("style");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_428);
}
}else{
_428=_429[0];
}
_428.setAttribute("type","text/css");
if(_428.styleSheet){
_428.styleSheet.cssText+="\n"+_425;
}else{
var _42b=doc.createTextNode("\n"+_425);
_428.appendChild(_42b);
}
return _428;
};
dojo.html.fixPathsInCssText=function(_42c,URI){
if(!_42c||!URI){
return;
}
var _42e,str="",url="",_431="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _432=new RegExp("url\\(\\s*("+_431+")\\s*\\)");
var _433=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_431+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _434=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_431+")['\"]");
while(_42e=_434.exec(_42c)){
url=_42e[2].replace(regexTrim,"$2");
if(!_433.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_42c.substring(0,_42e.index)+"AlphaImageLoader("+_42e[1]+"src='"+url+"'";
_42c=_42c.substr(_42e.index+_42e[0].length);
}
_42c=str+_42c;
str="";
}
while(_42e=_432.exec(_42c)){
url=_42e[1].replace(regexTrim,"$2");
if(!_433.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_42c.substring(0,_42e.index)+"url("+url+")";
_42c=_42c.substr(_42e.index+_42e[0].length);
}
return str+_42c;
};
dojo.html.setActiveStyleSheet=function(_435){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_435){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _441={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _441){
if(_441[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.kwCompoundRequire({common:["dojo.html.common","dojo.html.style"]});
dojo.provide("dojo.html.*");
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _443=dojo.global();
var _444=dojo.doc();
try{
if(_443["getSelection"]){
if(dojo.render.html.safari){
_443.getSelection().collapse();
}else{
_443.getSelection().removeAllRanges();
}
}else{
if(_444.selection){
if(_444.selection.empty){
_444.selection.empty();
}else{
if(_444.selection.clear){
_444.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_445){
_445=dojo.byId(_445)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_445.style.MozUserSelect="none";
}else{
if(h.safari){
_445.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_445.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_447){
_447=dojo.byId(_447)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_447.style.MozUserSelect="";
}else{
if(h.safari){
_447.style.KhtmlUserSelect="";
}else{
if(h.ie){
_447.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_449){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_44a){
var _44b=dojo.global();
var _44c=dojo.doc();
_44a=dojo.byId(_44a);
if(_44c["selection"]&&dojo.body()["createTextRange"]){
var _44d=_44a.createTextRange();
_44d.moveStart("character",0);
_44d.moveEnd("character",_44a.value.length);
_44d.select();
}else{
if(_44b["getSelection"]){
var _44e=_44b.getSelection();
_44a.setSelectionRange(0,_44a.value.length);
}
}
_44a.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _44f=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _451=oSel.getRangeAt(0);
if(_451.startContainer==_451.endContainer&&(_451.endOffset-_451.startOffset)==1&&_451.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_44f=dojo.html.selectionType.CONTROL;
}
}
return _44f;
}
},isCollapsed:function(){
var _452=dojo.global();
var _453=dojo.doc();
if(_453["selection"]){
return _453.selection.createRange().text=="";
}else{
if(_452["getSelection"]){
var _454=_452.getSelection();
if(dojo.lang.isString(_454)){
return _454=="";
}else{
return _454.isCollapsed||_454.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _455=dojo.doc().selection.createRange();
if(_455&&_455.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _456=dojo.global().getSelection();
return _456.anchorNode.childNodes[_456.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _458=dojo.global().getSelection();
if(_458){
var node=_458.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _45a=dojo.global().getSelection();
if(_45a){
return _45a.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _45b=dojo.global().getSelection();
if(_45b&&_45b.rangeCount){
var frag=_45b.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_45e){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_45f){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_464){
var _465=dojo.global();
var _466=dojo.doc();
_464=dojo.byId(_464);
if(_466.selection&&dojo.body().createTextRange){
try{
var _467=dojo.body().createControlRange();
_467.addElement(_464);
_467.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_464);
}
}else{
if(_465["getSelection"]){
var _468=_465.getSelection();
if(_468["removeAllRanges"]){
var _467=_466.createRange();
_467.selectNode(_464);
_468.removeAllRanges();
_468.addRange(_467);
}
}
}
},selectElementChildren:function(_469){
var _46a=dojo.global();
var _46b=dojo.doc();
_469=dojo.byId(_469);
if(_46b.selection&&dojo.body().createTextRange){
var _46c=dojo.body().createTextRange();
_46c.moveToElementText(_469);
_46c.select();
}else{
if(_46a["getSelection"]){
var _46d=_46a.getSelection();
if(_46d["setBaseAndExtent"]){
_46d.setBaseAndExtent(_469,0,_469,_469.innerText.length-1);
}else{
if(_46d["selectAllChildren"]){
_46d.selectAllChildren(_469);
}
}
}
}
},getBookmark:function(){
var _46e;
var _46f=dojo.doc();
if(_46f["selection"]){
var _470=_46f.selection.createRange();
_46e=_470.getBookmark();
}else{
var _471;
try{
_471=dojo.global().getSelection();
}
catch(e){
}
if(_471){
var _470=_471.getRangeAt(0);
_46e=_470.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _46e;
},moveToBookmark:function(_472){
var _473=dojo.doc();
if(_473["selection"]){
var _474=_473.selection.createRange();
_474.moveToBookmark(_472);
_474.select();
}else{
var _475;
try{
_475=dojo.global().getSelection();
}
catch(e){
}
if(_475&&_475["removeAllRanges"]){
_475.removeAllRanges();
_475.addRange(_472);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_476){
if(dojo.global()["getSelection"]){
var _477=dojo.global().getSelection();
if(_477.removeAllRanges){
if(_476){
_477.collapseToStart();
}else{
_477.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_476);
}
}else{
if(dojo.doc().selection){
var _478=dojo.doc().selection.createRange();
_478.collapse(_476);
_478.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _479=dojo.doc().selection;
if(_479.type.toUpperCase()!="NONE"){
_479.clear();
}
return _479;
}else{
var _479=dojo.global().getSelection();
for(var i=0;i<_479.rangeCount;i++){
_479.getRangeAt(i).deleteContents();
}
return _479;
}
}});
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function getTagName(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
}
function getDojoTagName(node){
var _47e=getTagName(node);
if(!_47e){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_47e])){
return _47e;
}
var p=_47e.indexOf(":");
if(p>=0){
return _47e;
}
if(_47e.substr(0,5)=="dojo:"){
return _47e;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
return node.scopeName.toLowerCase()+":"+_47e;
}
if(_47e.substr(0,4)=="dojo"){
return "dojo:"+_47e.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _481=node.className||node.getAttribute("class");
if((_481)&&(_481.indexOf)&&(_481.indexOf("dojo-")!=-1)){
var _482=_481.split(" ");
for(var x=0,c=_482.length;x<c;x++){
if(_482[x].slice(0,5)=="dojo-"){
return "dojo:"+_482[x].substr(5).toLowerCase();
}
}
}
}
return "";
}
this.parseElement=function(node,_486,_487,_488){
var _489=getTagName(node);
if(isIE&&_489.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _48b=true;
if(_487){
var _48c=getDojoTagName(node);
_489=_48c||_489;
_48b=Boolean(_48c);
}
var _48d={};
_48d[_489]=[];
var pos=_489.indexOf(":");
if(pos>0){
var ns=_489.substring(0,pos);
_48d["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_48b=false;
}
}
if(_48b){
var _490=this.parseAttributes(node);
for(var attr in _490){
if((!_48d[_489][attr])||(typeof _48d[_489][attr]!="array")){
_48d[_489][attr]=[];
}
_48d[_489][attr].push(_490[attr]);
}
_48d[_489].nodeRef=node;
_48d.tagName=_489;
_48d.index=_488||0;
}
var _491=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=getDojoTagName(tcn)||getTagName(tcn);
if(!_48d[ctn]){
_48d[ctn]=[];
}
_48d[ctn].push(this.parseElement(tcn,true,_487,_491));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_48d[ctn][_48d[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_491++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_48d[_489].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _48d;
};
this.parseAttributes=function(node){
var _496={};
var atts=node.attributes;
var _498,i=0;
while((_498=atts[i++])){
if(isIE){
if(!_498){
continue;
}
if((typeof _498=="object")&&(typeof _498.nodeValue=="undefined")||(_498.nodeValue==null)||(_498.nodeValue=="")){
continue;
}
}
var nn=_498.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_498.nodeName;
_496[nn]={value:_498.nodeValue};
}
return _496;
};
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_49b,_49c,init,_49e){
if((dojo.lang.isFunction(_49e))||((!_49e)&&(!dojo.lang.isFunction(init)))){
var temp=_49e;
_49e=init;
init=temp;
}
var _4a0=[];
if(dojo.lang.isArray(_49c)){
_4a0=_49c;
_49c=_4a0.shift();
}
if(!init){
init=dojo.evalObjPath(_49b,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_49c?_49c.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _49c();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_4a0;
for(var i=0,l=_4a0.length;i<l;i++){
dojo.lang.extend(ctor,_4a0[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_49b;
if(dojo.lang.isArray(_49e)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_49e));
}else{
dojo.lang.extend(ctor,(_49e)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare._common);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
var _4a5=dojo.parseObjPath(_49b,null,true);
_4a5.obj[_4a5.prop]=ctor;
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(self.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_4ab,_4ac,args){
var _4ae,_4af=this.___proto;
this.___proto=_4ab;
try{
_4ae=_4ab[_4ac].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_4af;
}
return _4ae;
},_inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._contextMethod(p,prop,args):p[prop]);
},inherited:function(prop,args){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(prop,args);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_4b6,_4b7,_4b8){
if(!_4b8||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_4b6,_4b7);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_4bf,_4c0){
this.name=name;
this.module=_4bf;
this.resolver=_4c0;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_4c2,_4c3){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _4c4=this.resolver(name,_4c2);
if((_4c4)&&(!this._loaded[_4c4])&&(!this._failed[_4c4])){
var req=dojo.require;
req(_4c4,false,true);
if(dojo.hostenv.findModule(_4c4,false)){
this._loaded[_4c4]=true;
}else{
if(!_4c3){
dojo.raise("dojo.ns.Ns.resolve: module '"+_4c4+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_4c4]=true;
}
}
return Boolean(this._loaded[_4c4]);
};
dojo.registerNamespace=function(name,_4c7,_4c8){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_4ca){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_4ca;
}
};
dojo.registerNamespaceManifest=function(_4cc,path,name,_4cf,_4d0){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_4cf,_4d0);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _4d1={};
var _4d2=[];
this.getUniqueId=function(_4d3){
var _4d4;
do{
_4d4=_4d3+"_"+(_4d1[_4d3]!=undefined?++_4d1[_4d3]:_4d1[_4d3]=0);
}while(this.getWidgetById(_4d4));
return _4d4;
};
this.add=function(_4d5){
this.widgets.push(_4d5);
if(!_4d5.extraArgs["id"]){
_4d5.extraArgs["id"]=_4d5.extraArgs["ID"];
}
if(_4d5.widgetId==""){
if(_4d5["id"]){
_4d5.widgetId=_4d5["id"];
}else{
if(_4d5.extraArgs["id"]){
_4d5.widgetId=_4d5.extraArgs["id"];
}else{
_4d5.widgetId=this.getUniqueId(_4d5.ns+"_"+_4d5.widgetType);
}
}
}
if(this.widgetIds[_4d5.widgetId]){
dojo.debug("widget ID collision on ID: "+_4d5.widgetId);
}
this.widgetIds[_4d5.widgetId]=_4d5;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_4d7){
if(dojo.lang.isNumber(_4d7)){
var tw=this.widgets[_4d7].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_4d7,1);
}else{
this.removeById(_4d7);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _4de=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_4de(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_4e3,_4e4){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_4e3(x)){
ret.push(x);
if(_4e4){
return false;
}
}
return true;
});
return (_4e4?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _4ea={};
var _4eb=["dojo.widget"];
for(var i=0;i<_4eb.length;i++){
_4eb[_4eb[i]]=true;
}
this.registerWidgetPackage=function(_4ed){
if(!_4eb[_4ed]){
_4eb[_4ed]=true;
_4eb.push(_4ed);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_4eb,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_4ef,_4f0,_4f1,ns){
var impl=this.getImplementationName(_4ef,ns);
if(impl){
var ret=_4f0?new impl(_4f0):new impl();
return ret;
}
};
function buildPrefixCache(){
for(var _4f5 in dojo.render){
if(dojo.render[_4f5]["capable"]===true){
var _4f6=dojo.render[_4f5].prefixes;
for(var i=0;i<_4f6.length;i++){
_4d2.push(_4f6[i].toLowerCase());
}
}
}
}
var _4f8=function(_4f9,_4fa){
if(!_4fa){
return null;
}
for(var i=0,l=_4d2.length,_4fd;i<=l;i++){
_4fd=(i<l?_4fa[_4d2[i]]:_4fa);
if(!_4fd){
continue;
}
for(var name in _4fd){
if(name.toLowerCase()==_4f9){
return _4fd[name];
}
}
}
return null;
};
var _4ff=function(_500,_501){
var _502=dojo.evalObjPath(_501,false);
return (_502?_4f8(_500,_502):null);
};
this.getImplementationName=function(_503,ns){
var _505=_503.toLowerCase();
ns=ns||"dojo";
var imps=_4ea[ns]||(_4ea[ns]={});
var impl=imps[_505];
if(impl){
return impl;
}
if(!_4d2.length){
buildPrefixCache();
}
var _508=dojo.ns.get(ns);
if(!_508){
dojo.ns.register(ns,ns+".widget");
_508=dojo.ns.get(ns);
}
if(_508){
_508.resolve(_503);
}
impl=_4ff(_505,_508.module);
if(impl){
return (imps[_505]=impl);
}
_508=dojo.ns.require(ns);
if((_508)&&(_508.resolver)){
_508.resolve(_503);
impl=_4ff(_505,_508.module);
if(impl){
return (imps[_505]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_503+"\" in \""+_508.module+"\" registered to namespace \""+_508.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_4eb.length;i++){
impl=_4ff(_505,_4eb[i]);
if(impl){
return (imps[_505]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_503+"\" in \""+_508.module+"\" registered to namespace \""+_508.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _50b=this.topWidgets[id];
if(_50b.checkSize){
_50b.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_510,_511){
dw[(_511||_510)]=h(_510);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _513=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _513[n];
}
return _513;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.kwCompoundRequire({common:[["dojo.uri.Uri",false,false]]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.dojoUri("src/widget/templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _515=null;
if(window.getComputedStyle){
var _516=getComputedStyle(div,"");
_515=_516.getPropertyValue("background-image");
}else{
_515=div.currentStyle.backgroundImage;
}
var _517=false;
if(_515!=null&&(_515=="none"||_515=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_518){
this.doAccessibleCheck=_518;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _51a=this.children[i];
if(_51a.onResized){
_51a.onResized();
}
}
},create:function(args,_51c,_51d,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_51c,_51d);
this.mixInProperties(args,_51c,_51d);
this.postMixInProperties(args,_51c,_51d);
dojo.widget.manager.add(this);
this.buildRendering(args,_51c,_51d);
this.initialize(args,_51c,_51d);
this.postInitialize(args,_51c,_51d);
this.postCreate(args,_51c,_51d);
return this;
},destroy:function(_51f){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_51f);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _520;
var i=0;
while(this.children.length>i){
_520=this.children[i];
if(_520 instanceof dojo.widget.Widget){
this.removeChild(_520);
_520.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_523){
var ret=[];
var _525=dojo.lang.isFunction(type);
if(!_525){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_525){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_523){
ret=ret.concat(this.children[x].getChildrenOfType(type,_523));
}
}
return ret;
},getDescendants:function(){
var _527=[];
var _528=[this];
var elem;
while((elem=_528.pop())){
_527.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_528.push(elem);
});
}
}
return _527;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _52f;
var _530=dojo.widget.lcArgsCache[this.widgetType];
if(_530==null){
_530={};
for(var y in this){
_530[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_530;
}
var _532={};
for(var x in args){
if(!this[x]){
var y=_530[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_532[x]){
continue;
}
_532[x]=true;
if((typeof this[x])!=(typeof _52f)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _534=args[x].split(";");
for(var y=0;y<_534.length;y++){
var si=_534[y].indexOf(":");
if((si!=-1)&&(_534[y].length>si)){
this[x][_534[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_534[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_538){
},initialize:function(args,frag,_53b){
return false;
},postInitialize:function(args,frag,_53e){
return false;
},postCreate:function(args,frag,_541){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_544){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_545){
},addChild:function(_546){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_547){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_547){
this.children.splice(x,1);
_547.parent=null;
break;
}
}
return _547;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_54c,_54d,_54e){
var _54f=_54d.parseProperties(_54c["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_550,_551,_552){
var _553=_551.parseProperties(_550["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_556,_557,_558,_559){
dojo.a11y.setAccessibleMode();
var _55a=type.split(":");
_55a=(_55a.length==2)?_55a[1]:type;
var _55b=_559||_556.parseProperties(frag[frag["ns"]+":"+_55a]);
var _55c=dojo.widget.manager.getImplementation(_55a,null,null,frag["ns"]);
if(!_55c){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_55c.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_55b["dojoinsertionindex"]=_558;
var ret=_55c.create(_55b,frag,_557,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_55e,_55f,_560,init,_562){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_565,_566,_567,init,_569){
var _56a=_565.split(".");
var type=_56a.pop();
var regx="\\.("+(_566?_566+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_565.search(new RegExp(regx));
_56a=(r<0?_56a.join("."):_565.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_56a);
var pos=_56a.indexOf(".");
var _56f=(pos>-1)?_56a.substring(0,pos):_56a;
_569=(_569)||{};
_569.widgetType=type;
if((!init)&&(_569["classConstructor"])){
init=_569.classConstructor;
delete _569.classConstructor;
}
dojo.declare(_565,_567,init,_569);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_570){
this.propertySetsList=[];
this.fragment=_570;
this.createComponents=function(frag,_572){
var _573=[];
var _574=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _575=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_575[ltn]){
_574=true;
ret=_575[ltn](frag,this,_572,frag.index);
_573.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_572,frag.index);
if(ret){
_574=true;
_573.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_574){
_573=_573.concat(this.createSubComponents(frag,_572));
}
return _573;
};
this.createSubComponents=function(_57a,_57b){
var frag,_57d=[];
for(var item in _57a){
frag=_57a[item];
if(frag&&typeof frag=="object"&&(frag!=_57a.nodeRef)&&(frag!=_57a.tagName)&&(!dojo.dom.isNode(frag))){
_57d=_57d.concat(this.createComponents(frag,_57b));
}
}
return _57d;
};
this.parsePropertySets=function(_57f){
return [];
};
this.parseProperties=function(_580){
var _581={};
for(var item in _580){
if((_580[item]==_580.tagName)||(_580[item]==_580.nodeRef)){
}else{
var frag=_580[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _584=this;
this.getDataProvider(_584,frag[0].value);
_581.dataProvider=this.dataProvider;
}
_581[item]=frag[0].value;
var _585=this.parseProperties(frag);
for(var _586 in _585){
_581[_586]=_585[_586];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _581[item]!="boolean"){
_581[item]=true;
}
break;
}
}
}
return _581;
};
this.getDataProvider=function(_587,_588){
dojo.io.bind({url:_588,load:function(type,_58a){
if(type=="load"){
_587.dataProvider=_58a;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_58b){
for(var x=0;x<this.propertySetsList.length;x++){
if(_58b==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_58d){
var _58e=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _592=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_592==cpcc[0].value)){
_58e.push(cpl);
}
}
return _58e;
};
this.getPropertySets=function(_593){
var ppl="dojo:propertyproviderlist";
var _595=[];
var _596=_593.tagName;
if(_593[ppl]){
var _597=_593[ppl].value.split(" ");
for(var _598 in _597){
if((_598.indexOf("..")==-1)&&(_598.indexOf("://")==-1)){
var _599=this.getPropertySetById(_598);
if(_599!=""){
_595.push(_599);
}
}else{
}
}
}
return this.getPropertySetsByType(_596).concat(_595);
};
this.createComponentFromScript=function(_59a,_59b,_59c,ns){
_59c.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_59b.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_59c,this,null,null,_59c)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_59c,this,null,null,_59c)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_5a1,_5a2,_5a3){
var _5a4=false;
var _5a5=(typeof name=="string");
if(_5a5){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _5a8=name.toLowerCase();
var _5a9=ns+":"+_5a8;
_5a4=(dojo.byId(name)&&!dojo.widget.tags[_5a9]);
}
if((arguments.length==1)&&(_5a4||!_5a5)){
var xp=new dojo.xml.Parse();
var tn=_5a4?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_5ac,name,_5ae,ns){
_5ae[_5a9]={dojotype:[{value:_5a8}],nodeRef:_5ac,fastMixIn:true};
_5ae.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_5ac,name,_5ae,ns);
}
_5a1=_5a1||{};
var _5b0=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_5a2){
_5b0=true;
_5a2=tn;
if(h){
dojo.body().appendChild(_5a2);
}
}else{
if(_5a3){
dojo.dom.insertAtPosition(tn,_5a2,_5a3);
}else{
tn=_5a2;
}
}
var _5b2=fromScript(tn,name.toLowerCase(),_5a1,ns);
if((!_5b2)||(!_5b2[0])||(typeof _5b2[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_5b0&&_5b2[0].domNode.parentNode){
_5b2[0].domNode.parentNode.removeChild(_5b2[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _5b2[0];
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_5b4,_5b5,_5b6){
var _5b7=_5b4||obj.templatePath;
var _5b8=dojo.widget._templateCache;
if(!_5b7&&!obj["widgetType"]){
do{
var _5b9="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_5b8[_5b9]);
obj.widgetType=_5b9;
}
var wt=_5b7?_5b7.toString():obj.widgetType;
var ts=_5b8[wt];
if(!ts){
_5b8[wt]={"string":null,"node":null};
if(_5b6){
ts={};
}else{
ts=_5b8[wt];
}
}
if((!obj.templateString)&&(!_5b6)){
obj.templateString=_5b5||ts["string"];
}
if((!obj.templateNode)&&(!_5b6)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_5b7)){
var _5bc=dojo.hostenv.getText(_5b7);
if(_5bc){
_5bc=_5bc.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _5bd=_5bc.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_5bd){
_5bc=_5bd[1];
}
}else{
_5bc="";
}
obj.templateString=_5bc;
if(!_5b6){
_5b8[wt]["string"]=_5bc;
}
}
if((!ts["string"])&&(!_5b6)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_5c1){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_5c1);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_5c1);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _5c8=true;
if(dojo.render.html.ie){
_5c8=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _5c8;
}};
dojo.widget.attachTemplateNodes=function(_5c9,_5ca,_5cb){
var _5cc=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_5c9){
_5c9=_5ca.domNode;
}
if(_5c9.nodeType!=_5cc){
return;
}
var _5ce=_5c9.all||_5c9.getElementsByTagName("*");
var _5cf=_5ca;
for(var x=-1;x<_5ce.length;x++){
var _5d1=(x==-1)?_5c9:_5ce[x];
var _5d2=[];
if(!_5ca.widgetsInTemplate||!_5d1.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _5d4=_5d1.getAttribute(this.attachProperties[y]);
if(_5d4){
_5d2=_5d4.split(";");
for(var z=0;z<_5d2.length;z++){
if(dojo.lang.isArray(_5ca[_5d2[z]])){
_5ca[_5d2[z]].push(_5d1);
}else{
_5ca[_5d2[z]]=_5d1;
}
}
break;
}
}
var _5d6=_5d1.getAttribute(this.eventAttachProperty);
if(_5d6){
var evts=_5d6.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _5d8=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _5da=tevt.split(":");
tevt=trim(_5da[0]);
_5d8=trim(_5da[1]);
}
if(!_5d8){
_5d8=tevt;
}
var tf=function(){
var ntf=new String(_5d8);
return function(evt){
if(_5cf[ntf]){
_5cf[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_5d1,tevt,tf,false,true);
}
}
for(var y=0;y<_5cb.length;y++){
var _5de=_5d1.getAttribute(_5cb[y]);
if((_5de)&&(_5de.length)){
var _5d8=null;
var _5df=_5cb[y].substr(4);
_5d8=trim(_5de);
var _5e0=[_5d8];
if(_5d8.indexOf(";")>=0){
_5e0=dojo.lang.map(_5d8.split(";"),trim);
}
for(var z=0;z<_5e0.length;z++){
if(!_5e0[z].length){
continue;
}
var tf=function(){
var ntf=new String(_5e0[z]);
return function(evt){
if(_5cf[ntf]){
_5cf[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_5d1,_5df,tf,false,true);
}
}
}
}
var _5e3=_5d1.getAttribute(this.templateProperty);
if(_5e3){
_5ca[_5e3]=_5d1;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_5d1.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_5d1,wai.name,"role",val);
}else{
var _5e7=val.split("-");
dojo.widget.wai.setAttr(_5d1,wai.name,_5e7[0],_5e7[1]);
}
}
},this);
var _5e8=_5d1.getAttribute(this.onBuildProperty);
if(_5e8){
eval("var node = baseNode; var widget = targetObj; "+_5e8);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_5f0,_5f1,pos,ref,_5f4){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_5f4==undefined){
_5f4=this.children.length;
}
this.addWidgetAsDirectChild(_5f0,_5f1,pos,ref,_5f4);
this.registerChild(_5f0,_5f4);
}
return _5f0;
},addWidgetAsDirectChild:function(_5f5,_5f6,pos,ref,_5f9){
if((!this.containerNode)&&(!_5f6)){
this.containerNode=this.domNode;
}
var cn=(_5f6)?_5f6:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_5f9){
_5f9=0;
}
_5f5.domNode.setAttribute("dojoinsertionindex",_5f9);
if(!ref){
cn.appendChild(_5f5.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_5f5.domNode,ref.parentNode,_5f9);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_5f5.domNode);
}else{
dojo.dom.insertAtPosition(_5f5.domNode,cn,pos);
}
}
}
},registerChild:function(_5fb,_5fc){
_5fb.dojoInsertionIndex=_5fc;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_5fc){
idx=i;
}
}
this.children.splice(idx+1,0,_5fb);
_5fb.parent=this;
_5fb.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_5fb.widgetId];
},removeChild:function(_5ff){
dojo.dom.removeNode(_5ff.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_5ff);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_603){
var _604=this.getFragNodeRef(frag);
if(_603&&(_603.snarfChildDomOutput||!_604)){
_603.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_604);
}else{
if(_604){
if(this.domNode&&(this.domNode!==_604)){
this._sourceNodeRef=dojo.dom.replaceNode(_604,this.domNode);
}
}
}
if(_603){
_603.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _605=new dojo.xml.Parse();
var _606;
var _607=this.domNode.getElementsByTagName("*");
for(var i=0;i<_607.length;i++){
if(_607[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_606=_607[i];
}
if(_607[i].getAttribute("dojoType")){
_607[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_606){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_606);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _60a=_605.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_60a,this);
var _60b=[];
var _60c=[this];
var w;
while((w=_60c.pop())){
for(var i=0;i<w.children.length;i++){
var _60e=w.children[i];
if(_60e._processedSubWidgets||!_60e.extraArgs["issubwidget"]){
continue;
}
_60b.push(_60e);
if(_60e.isContainer){
_60c.push(_60e);
}
}
}
for(var i=0;i<_60b.length;i++){
var _60f=_60b[i];
if(_60f._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_60f._processedSubWidgets=true;
if(_60f.extraArgs["dojoattachevent"]){
var evts=_60f.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _612=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _614=tevt.split(":");
tevt=dojo.string.trim(_614[0]);
_612=dojo.string.trim(_614[1]);
}
if(!_612){
_612=tevt;
}
if(dojo.lang.isFunction(_60f[tevt])){
dojo.event.kwConnect({srcObj:_60f,srcFunc:tevt,targetObj:this,targetFunc:_612});
}else{
alert(tevt+" is not a function in widget "+_60f);
}
}
}
if(_60f.extraArgs["dojoattachpoint"]){
this[_60f.extraArgs["dojoattachpoint"]]=_60f;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _618=args["templateCssPath"]||this.templateCssPath;
if(_618&&!dojo.widget._cssFiles[_618.toString()]){
if((!this.templateCssString)&&(_618)){
this.templateCssString=dojo.hostenv.getText(_618);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_618.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_618);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _61b=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_61b);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_61b)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _61d=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_61d=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_61d){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_61d.length;i++){
var key=_61d[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _624;
if((kval)||(dojo.lang.isString(kval))){
_624=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_624.indexOf("\"")>-1){
_624=_624.replace("\"","&quot;");
}
tstr=tstr.replace(_61d[i],_624);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_61b){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_61d)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_61d){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_626,_627){
if(!_626){
_626=this.domNode;
}
if(!_627){
_627=this;
}
return dojo.widget.attachTemplateNodes(_626,_627,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_629,_62a){
node=dojo.byId(node);
_62a(node,!_629(node));
return _629(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_62f){
dojo.html[(_62f?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_635){
dojo.html.setStyle(node,"display",((_635 instanceof String||typeof _635=="string")?_635:(_635?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_639){
dojo.html.setStyle(node,"visibility",((_639 instanceof String||typeof _639=="string")?_639:(_639?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_63d,_63e){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_63e){
if(_63d>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_63d=0.999999;
}
}else{
if(_63d<0){
_63d=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_63d*100+")";
}
}
node.style.filter="Alpha(Opacity="+_63d*100+")";
}else{
if(h.moz){
node.style.opacity=_63d;
node.style.MozOpacity=_63d;
}else{
if(h.safari){
node.style.opacity=_63d;
node.style.KhtmlOpacity=_63d;
}else{
node.style.opacity=_63d;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _64a=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_64a+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _64a;
};
dojo.html.setStyleAttributes=function(node,_64d){
node=dojo.byId(node);
var _64e=_64d.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_64e.length;i++){
var _650=_64e[i].split(":");
var name=_650[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _652=_650[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_652);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_652});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_652});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_652});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_652});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_652;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_654,_655){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_655){
_655=bs.CONTENT_BOX;
}
var _658=2;
var _659;
switch(_655){
case bs.MARGIN_BOX:
_659=3;
break;
case bs.BORDER_BOX:
_659=2;
break;
case bs.PADDING_BOX:
default:
_659=1;
break;
case bs.CONTENT_BOX:
_659=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_658=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _65d;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_65d=db;
}else{
_65d=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _65f=node;
do{
var n=_65f["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_65f["offsetTop"];
ret.y+=isNaN(m)?0:m;
_65f=_65f.offsetParent;
}while((_65f!=_65d)&&(_65f!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_654){
var _662=dojo.html.getScroll();
ret.y+=_662.top;
ret.x+=_662.left;
}
var _663=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_658>_659){
for(var i=_659;i<_658;++i){
ret.y+=_663[i](node,"top");
ret.x+=_663[i](node,"left");
}
}else{
if(_658<_659){
for(var i=_659;i>_658;--i){
ret.y-=_663[i-1](node,"top");
ret.x-=_663[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_667,_668){
var _669=0;
for(var x=0;x<_667.length;x++){
_669+=dojo.html.getPixelValue(node,_667[x],_668);
}
return _669;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _676=dojo.html.getBorder(node);
return {width:pad.width+_676.width,height:pad.height+_676.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName!="IMG"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _67b=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_67b){
_67b=dojo.html.getStyle(node,"box-sizing");
}
return (_67b?_67b:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _680=dojo.html.getBorder(node);
return {width:box.width-_680.width,height:box.height-_680.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _682=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_682.width,height:node.offsetHeight-_682.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _685=0;
var _686=0;
var isbb=dojo.html.isBorderBox(node);
var _688=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_685=args.width+_688.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_685);
}
if(typeof args.height!="undefined"){
_686=args.height+_688.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_686);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _68b=dojo.html.getBorderBox(node);
var _68c=dojo.html.getMargin(node);
return {width:_68b.width+_68c.width,height:_68b.height+_68c.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _68f=0;
var _690=0;
var isbb=dojo.html.isBorderBox(node);
var _692=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _693=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_68f=args.width-_692.width;
_68f-=_693.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_68f);
}
if(typeof args.height!="undefined"){
_690=args.height-_692.height;
_690-=_693.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_690);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_698,_699,_69a){
if(_698 instanceof Array||typeof _698=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_698.length<4){
_698.push(0);
}
while(_698.length>4){
_698.pop();
}
var ret={left:_698[0],top:_698[1],width:_698[2],height:_698[3]};
}else{
if(!_698.nodeType&&!(_698 instanceof String||typeof _698=="string")&&("width" in _698||"height" in _698||"left" in _698||"x" in _698||"top" in _698||"y" in _698)){
var ret={left:_698.left||_698.x||0,top:_698.top||_698.y||0,width:_698.width||0,height:_698.height||0};
}else{
var node=dojo.byId(_698);
var pos=dojo.html.abs(node,_699,_69a);
var _69e=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_69e.width,height:_69e.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_6a0){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_6a3){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_6a5){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_6a7){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_6a9){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_6ab){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_6b5){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_6b7){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_6b8){
return dojo.html.getDocumentWindow(_6b8.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _6c0=dojo.html.getCursorPosition(e);
with(dojo.html){
var _6c1=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _6c3=_6c1.x+(bb.width/2);
var _6c4=_6c1.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_6c0.x<_6c3?WEST:EAST)|(_6c0.y<_6c4?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_6c5,e){
_6c5=dojo.byId(_6c5);
var _6c7=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_6c5);
var _6c9=dojo.html.getAbsolutePosition(_6c5,true,dojo.html.boxSizing.BORDER_BOX);
var top=_6c9.y;
var _6cb=top+bb.height;
var left=_6c9.x;
var _6cd=left+bb.width;
return (_6c7.x>=left&&_6c7.x<=_6cd&&_6c7.y>=top&&_6c7.y<=_6cb);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _6cf="";
if(node==null){
return _6cf;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _6d1="unknown";
try{
_6d1=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_6d1){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_6cf+="\n";
_6cf+=dojo.html.renderedTextContent(node.childNodes[i]);
_6cf+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_6cf+="\n";
}else{
_6cf+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _6d3="unknown";
try{
_6d3=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_6d3){
case "capitalize":
var _6d4=text.split(" ");
for(var i=0;i<_6d4.length;i++){
_6d4[i]=_6d4[i].charAt(0).toUpperCase()+_6d4[i].substring(1);
}
text=_6d4.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_6d3){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_6cf)){
text.replace(/^\s/,"");
}
break;
}
_6cf+=text;
break;
default:
break;
}
}
return _6cf;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _6d8="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_6d8="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_6d8="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_6d8="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _6d9=null;
switch(_6d8){
case "cell":
_6d9=tn.getElementsByTagName("tr")[0];
break;
case "row":
_6d9=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_6d9=tn.getElementsByTagName("table")[0];
break;
default:
_6d9=tn;
break;
}
var _6da=[];
for(var x=0;x<_6d9.childNodes.length;x++){
_6da.push(_6d9.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _6da;
};
dojo.html.placeOnScreen=function(node,_6dd,_6de,_6df,_6e0,_6e1,_6e2){
if(_6dd instanceof Array||typeof _6dd=="array"){
_6e2=_6e1;
_6e1=_6e0;
_6e0=_6df;
_6df=_6de;
_6de=_6dd[1];
_6dd=_6dd[0];
}
if(_6e1 instanceof String||typeof _6e1=="string"){
_6e1=_6e1.split(",");
}
if(!isNaN(_6df)){
_6df=[Number(_6df),Number(_6df)];
}else{
if(!(_6df instanceof Array||typeof _6df=="array")){
_6df=[0,0];
}
}
var _6e3=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _6e5=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_6e5;
if(!(_6e1 instanceof Array||typeof _6e1=="array")){
_6e1=["TL"];
}
var _6e9,_6ea,_6eb=Infinity,_6ec;
for(var _6ed=0;_6ed<_6e1.length;++_6ed){
var _6ee=_6e1[_6ed];
var _6ef=true;
var tryX=_6dd-(_6ee.charAt(1)=="L"?0:w)+_6df[0]*(_6ee.charAt(1)=="L"?1:-1);
var tryY=_6de-(_6ee.charAt(0)=="T"?0:h)+_6df[1]*(_6ee.charAt(0)=="T"?1:-1);
if(_6e0){
tryX-=_6e3.x;
tryY-=_6e3.y;
}
if(tryX<0){
tryX=0;
_6ef=false;
}
if(tryY<0){
tryY=0;
_6ef=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_6ef=false;
}else{
x=tryX;
}
x=Math.max(_6df[0],x)+_6e3.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_6ef=false;
}else{
y=tryY;
}
y=Math.max(_6df[1],y)+_6e3.y;
if(_6ef){
_6e9=x;
_6ea=y;
_6eb=0;
_6ec=_6ee;
break;
}else{
var dist=Math.pow(x-tryX-_6e3.x,2)+Math.pow(y-tryY-_6e3.y,2);
if(_6eb>dist){
_6eb=dist;
_6e9=x;
_6ea=y;
_6ec=_6ee;
}
}
}
if(!_6e2){
node.style.left=_6e9+"px";
node.style.top=_6ea+"px";
}
return {left:_6e9,top:_6ea,x:_6e9,y:_6ea,dist:_6eb,corner:_6ec};
};
dojo.html.placeOnScreenPoint=function(node,_6f6,_6f7,_6f8,_6f9){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_6f6,_6f7,_6f8,_6f9,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_6fb,_6fc,_6fd,_6fe,_6ff){
var best,_701=Infinity;
_6fb=dojo.byId(_6fb);
var _702=_6fb.style.display;
_6fb.style.display="";
var mb=dojo.html.getElementBox(_6fb,_6fd);
var _704=mb.width;
var _705=mb.height;
var _706=dojo.html.getAbsolutePosition(_6fb,true,_6fd);
_6fb.style.display=_702;
for(var _707 in _6fe){
var pos,_709,_70a;
var _70b=_6fe[_707];
_709=_706.x+(_707.charAt(1)=="L"?0:_704);
_70a=_706.y+(_707.charAt(0)=="T"?0:_705);
pos=dojo.html.placeOnScreen(node,_709,_70a,_6fc,true,_70b,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_701>pos.dist){
_701=pos.dist;
best=pos;
}
}
}
if(!_6ff){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _70d=node.parentNode;
var _70e=_70d.scrollTop+dojo.html.getBorderBox(_70d).height;
var _70f=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_70e<_70f){
_70d.scrollTop+=(_70f-_70e);
}else{
if(_70d.scrollTop>node.offsetTop){
_70d.scrollTop-=(_70d.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_716){
if(_716){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_717,_718){
var rgb=null;
if(dojo.lang.isArray(_717)){
rgb=_717;
}else{
if(_717 instanceof dojo.gfx.color.Color){
rgb=_717.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_717).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_718);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_71c){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_71c);
}
if(!_71c){
_71c=0;
}
_71c=Math.min(Math.max(-1,_71c),1);
_71c=((_71c+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_71c));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_721){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_721));
};
dojo.gfx.color.extractRGB=function(_722){
var hex="0123456789abcdef";
_722=_722.toLowerCase();
if(_722.indexOf("rgb")==0){
var _724=_722.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_724.splice(1,3);
return ret;
}else{
var _726=dojo.gfx.color.hex2rgb(_722);
if(_726){
return _726;
}else{
return dojo.gfx.color.named[_722]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _728="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_728+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_728.indexOf(rgb[i].charAt(0))*16+_728.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_731,end){
this.start=_731;
this.end=end;
if(dojo.lang.isArray(_731)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_731;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeDefault=function(n){
if(dojo.render.html.khtml){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
}else{
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
}
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_740,_741){
if(!_741){
_741=_740;
_740=this;
}
_741=dojo.lang.hitch(_740,_741);
var _742=this[evt]||function(){
};
this[evt]=function(){
var ret=_742.apply(this,arguments);
_741.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_746){
this.repeatCount=_746;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_747,_748,_749,_74a,_74b,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_747)||(!_747&&_748.getValue)){
rate=_74b;
_74b=_74a;
_74a=_749;
_749=_748;
_748=_747;
_747=null;
}else{
if(_747.getValue||dojo.lang.isArray(_747)){
rate=_74a;
_74b=_749;
_74a=_748;
_749=_747;
_748=null;
_747=null;
}
}
if(dojo.lang.isArray(_749)){
this.curve=new dojo.lfx.Line(_749[0],_749[1]);
}else{
this.curve=_749;
}
if(_748!=null&&_748>0){
this.duration=_748;
}
if(_74b){
this.repeatCount=_74b;
}
if(rate){
this.rate=rate;
}
if(_747){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_747[item]){
this.connect(item,_747[item]);
}
},this);
}
if(_74a&&dojo.lang.isFunction(_74a)){
this.easing=_74a;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_74e,_74f){
if(_74f){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_74e>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_74f);
}),_74e);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _751=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_751]);
this.fire("onBegin",[_751]);
}
this.fire("handler",["play",_751]);
this.fire("onPlay",[_751]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _752=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_752]);
this.fire("onPause",[_752]);
return this;
},gotoPercent:function(pct,_754){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_754){
this.play();
}
return this;
},stop:function(_755){
clearTimeout(this._timer);
var step=this._percent/100;
if(_755){
step=1;
}
var _757=this.curve.getValue(step);
this.fire("handler",["stop",_757]);
this.fire("onStop",[_757]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _75a=this.curve.getValue(step);
this.fire("handler",["animate",_75a]);
this.fire("onAnimate",[_75a]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_75b){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _75c=arguments;
if(_75c.length==1&&(dojo.lang.isArray(_75c[0])||dojo.lang.isArrayLike(_75c[0]))){
_75c=_75c[0];
}
dojo.lang.forEach(_75c,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_75e,_75f){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_75e>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_75f);
}),_75e);
return this;
}
if(_75f||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_75f);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_760){
this.fire("onStop");
this._animsCall("stop",_760);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_761){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _764=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_761](args);
},_764);
return this;
}});
dojo.lfx.Chain=function(_766){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _767=arguments;
if(_767.length==1&&(dojo.lang.isArray(_767[0])||dojo.lang.isArrayLike(_767[0]))){
_767=_767[0];
}
var _768=this;
dojo.lang.forEach(_767,function(anim,i,_76b){
this._anims.push(anim);
if(i<_76b.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_76c,_76d){
if(!this._anims.length){
return this;
}
if(_76d||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _76e=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_76c>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_76d);
}),_76c);
return this;
}
if(_76e){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_76e.play(null,_76d);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _76f=this._anims[this._currAnim];
if(_76f){
if(!_76f._active||_76f._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _770=this._anims[this._currAnim];
if(_770){
_770.stop();
this.fire("onStop",[this._currAnim]);
}
return _770;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_771){
var _772=arguments;
if(dojo.lang.isArray(arguments[0])){
_772=arguments[0];
}
if(_772.length==1){
return _772[0];
}
return new dojo.lfx.Combine(_772);
};
dojo.lfx.chain=function(_773){
var _774=arguments;
if(dojo.lang.isArray(arguments[0])){
_774=arguments[0];
}
if(_774.length==1){
return _774[0];
}
return new dojo.lfx.Chain(_774);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _776;
do{
_776=dojo.html.getStyle(node,"background-color");
if(_776.toLowerCase()=="rgba(0, 0, 0, 0)"){
_776="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_776));
if(_776=="transparent"){
_776=[255,255,255,0];
}else{
_776=dojo.gfx.color.extractRGB(_776);
}
return _776;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_777){
if(!_777){
return [];
}
if(dojo.lang.isArrayLike(_777)){
if(!_777.alreadyChecked){
var n=[];
dojo.lang.forEach(_777,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _777;
}
}else{
var n=[];
n.push(dojo.byId(_777));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_77a,_77b,_77c,_77d,_77e){
_77a=dojo.lfx.html._byId(_77a);
var _77f={"propertyMap":_77b,"nodes":_77a,"duration":_77c,"easing":_77d||dojo.lfx.easeDefault};
var _780=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _784 in pm){
pm[_784].property=_784;
parr.push(pm[_784]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _786=function(_787){
var _788=[];
dojo.lang.forEach(_787,function(c){
_788.push(Math.round(c));
});
return _788;
};
var _78a=function(n,_78c){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _78c){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_78c[s]);
}else{
n.style[s]=_78c[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _78e=function(_78f){
this._properties=_78f;
this.diffs=new Array(_78f.length);
dojo.lang.forEach(_78f,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _796=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_796=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_796+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_796+=")";
}else{
_796=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_796;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_780(_77f);
anim.curve=new _78e(_77f.propertyMap);
},onAnimate:function(_799){
dojo.lang.forEach(_77f.nodes,function(node){
_78a(node,_799);
});
}},_77f.duration,null,_77f.easing);
if(_77e){
for(var x in _77e){
if(dojo.lang.isFunction(_77e[x])){
anim.connect(x,anim,_77e[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_79c){
var _79d=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_79c)){
dojo.lang.forEach(_79c,_79d);
}else{
_79d(_79c);
}
};
dojo.lfx.html.fade=function(_79f,_7a0,_7a1,_7a2,_7a3){
_79f=dojo.lfx.html._byId(_79f);
var _7a4={property:"opacity"};
if(!dj_undef("start",_7a0)){
_7a4.start=_7a0.start;
}else{
_7a4.start=function(){
return dojo.html.getOpacity(_79f[0]);
};
}
if(!dj_undef("end",_7a0)){
_7a4.end=_7a0.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_79f,[_7a4],_7a1,_7a2);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_79f);
});
if(_7a3){
anim.connect("onEnd",function(){
_7a3(_79f,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_7a6,_7a7,_7a8,_7a9){
return dojo.lfx.html.fade(_7a6,{end:1},_7a7,_7a8,_7a9);
};
dojo.lfx.html.fadeOut=function(_7aa,_7ab,_7ac,_7ad){
return dojo.lfx.html.fade(_7aa,{end:0},_7ab,_7ac,_7ad);
};
dojo.lfx.html.fadeShow=function(_7ae,_7af,_7b0,_7b1){
_7ae=dojo.lfx.html._byId(_7ae);
dojo.lang.forEach(_7ae,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_7ae,_7af,_7b0,_7b1);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_7ae)){
dojo.lang.forEach(_7ae,dojo.html.show);
}else{
dojo.html.show(_7ae);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_7b4,_7b5,_7b6,_7b7){
var anim=dojo.lfx.html.fadeOut(_7b4,_7b5,_7b6,function(){
if(dojo.lang.isArrayLike(_7b4)){
dojo.lang.forEach(_7b4,dojo.html.hide);
}else{
dojo.html.hide(_7b4);
}
if(_7b7){
_7b7(_7b4,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_7b9,_7ba,_7bb,_7bc){
_7b9=dojo.lfx.html._byId(_7b9);
var _7bd=[];
dojo.lang.forEach(_7b9,function(node){
var _7bf={};
var _7c0,_7c1,_7c2;
with(node.style){
_7c0=top;
_7c1=left;
_7c2=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _7c3=dojo.html.getBorderBox(node).height;
with(node.style){
top=_7c0;
left=_7c1;
position=_7c2;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _7c3;
}}},_7ba,_7bb);
anim.connect("beforeBegin",function(){
_7bf.overflow=node.style.overflow;
_7bf.height=node.style.height;
with(node.style){
overflow="hidden";
_7c3="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_7bf.overflow;
_7c3=_7bf.height;
}
if(_7bc){
_7bc(node,anim);
}
});
_7bd.push(anim);
});
return dojo.lfx.combine(_7bd);
};
dojo.lfx.html.wipeOut=function(_7c5,_7c6,_7c7,_7c8){
_7c5=dojo.lfx.html._byId(_7c5);
var _7c9=[];
dojo.lang.forEach(_7c5,function(node){
var _7cb={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_7c6,_7c7,{"beforeBegin":function(){
_7cb.overflow=node.style.overflow;
_7cb.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_7cb.overflow;
height=_7cb.height;
}
if(_7c8){
_7c8(node,anim);
}
}});
_7c9.push(anim);
});
return dojo.lfx.combine(_7c9);
};
dojo.lfx.html.slideTo=function(_7cd,_7ce,_7cf,_7d0,_7d1){
_7cd=dojo.lfx.html._byId(_7cd);
var _7d2=[];
var _7d3=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_7ce)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_7ce={top:_7ce[0],left:_7ce[1]};
}
dojo.lang.forEach(_7cd,function(node){
var top=null;
var left=null;
var init=(function(){
var _7d8=node;
return function(){
var pos=_7d3(_7d8,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_7d3(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_7d3(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_7d8,true);
dojo.html.setStyleAttributes(_7d8,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_7ce.top||0)},"left":{start:left,end:(_7ce.left||0)}},_7cf,_7d0,{"beforeBegin":init});
if(_7d1){
anim.connect("onEnd",function(){
_7d1(_7cd,anim);
});
}
_7d2.push(anim);
});
return dojo.lfx.combine(_7d2);
};
dojo.lfx.html.slideBy=function(_7dc,_7dd,_7de,_7df,_7e0){
_7dc=dojo.lfx.html._byId(_7dc);
var _7e1=[];
var _7e2=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_7dd)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_7dd={top:_7dd[0],left:_7dd[1]};
}
dojo.lang.forEach(_7dc,function(node){
var top=null;
var left=null;
var init=(function(){
var _7e7=node;
return function(){
var pos=_7e2(_7e7,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_7e2(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_7e2(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_7e7,true);
dojo.html.setStyleAttributes(_7e7,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_7dd.top||0)},"left":{start:left,end:left+(_7dd.left||0)}},_7de,_7df).connect("beforeBegin",init);
if(_7e0){
anim.connect("onEnd",function(){
_7e0(_7dc,anim);
});
}
_7e1.push(anim);
});
return dojo.lfx.combine(_7e1);
};
dojo.lfx.html.explode=function(_7eb,_7ec,_7ed,_7ee,_7ef){
var h=dojo.html;
_7eb=dojo.byId(_7eb);
_7ec=dojo.byId(_7ec);
var _7f1=h.toCoordinateObject(_7eb,true);
var _7f2=document.createElement("div");
h.copyStyle(_7f2,_7ec);
if(_7ec.explodeClassName){
_7f2.className=_7ec.explodeClassName;
}
with(_7f2.style){
position="absolute";
display="none";
var _7f3=h.getStyle(_7eb,"background-color");
backgroundColor=_7f3?_7f3.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_7f2);
with(_7ec.style){
visibility="hidden";
display="block";
}
var _7f4=h.toCoordinateObject(_7ec,true);
with(_7ec.style){
display="none";
visibility="visible";
}
var _7f5={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_7f5[type]={start:_7f1[type],end:_7f4[type]};
});
var anim=new dojo.lfx.propertyAnimation(_7f2,_7f5,_7ed,_7ee,{"beforeBegin":function(){
h.setDisplay(_7f2,"block");
},"onEnd":function(){
h.setDisplay(_7ec,"block");
_7f2.parentNode.removeChild(_7f2);
}});
if(_7ef){
anim.connect("onEnd",function(){
_7ef(_7ec,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_7f8,end,_7fa,_7fb,_7fc){
var h=dojo.html;
_7f8=dojo.byId(_7f8);
end=dojo.byId(end);
var _7fe=dojo.html.toCoordinateObject(_7f8,true);
var _7ff=dojo.html.toCoordinateObject(end,true);
var _800=document.createElement("div");
dojo.html.copyStyle(_800,_7f8);
if(_7f8.explodeClassName){
_800.className=_7f8.explodeClassName;
}
dojo.html.setOpacity(_800,0.3);
with(_800.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_7f8,"background-color").toLowerCase();
}
dojo.body().appendChild(_800);
var _801={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_801[type]={start:_7fe[type],end:_7ff[type]};
});
var anim=new dojo.lfx.propertyAnimation(_800,_801,_7fa,_7fb,{"beforeBegin":function(){
dojo.html.hide(_7f8);
dojo.html.show(_800);
},"onEnd":function(){
_800.parentNode.removeChild(_800);
}});
if(_7fc){
anim.connect("onEnd",function(){
_7fc(_7f8,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_804,_805,_806,_807,_808){
_804=dojo.lfx.html._byId(_804);
var _809=[];
dojo.lang.forEach(_804,function(node){
var _80b=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _80d=dojo.html.getStyle(node,"background-image");
var _80e=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_80b.length>3){
_80b.pop();
}
var rgb=new dojo.gfx.color.Color(_805);
var _810=new dojo.gfx.color.Color(_80b);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_810}},_806,_807,{"beforeBegin":function(){
if(_80d){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_80d){
node.style.backgroundImage=_80d;
}
if(_80e){
node.style.backgroundColor="transparent";
}
if(_808){
_808(node,anim);
}
}});
_809.push(anim);
});
return dojo.lfx.combine(_809);
};
dojo.lfx.html.unhighlight=function(_812,_813,_814,_815,_816){
_812=dojo.lfx.html._byId(_812);
var _817=[];
dojo.lang.forEach(_812,function(node){
var _819=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_813);
var _81b=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_819,end:rgb}},_814,_815,{"beforeBegin":function(){
if(_81b){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_819.toRgb().join(",")+")";
},"onEnd":function(){
if(_816){
_816(node,anim);
}
}});
_817.push(anim);
});
return dojo.lfx.combine(_817);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_81e,_81f,_820){
dojo.html.show(node);
if(dojo.lang.isFunction(_820)){
_820();
}
},hide:function(node,_822,_823,_824){
dojo.html.hide(node);
if(dojo.lang.isFunction(_824)){
_824();
}
}};
dojo.lfx.toggle.fade={show:function(node,_826,_827,_828){
dojo.lfx.fadeShow(node,_826,_827,_828).play();
},hide:function(node,_82a,_82b,_82c){
dojo.lfx.fadeHide(node,_82a,_82b,_82c).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_82e,_82f,_830){
dojo.lfx.wipeIn(node,_82e,_82f,_830).play();
},hide:function(node,_832,_833,_834){
dojo.lfx.wipeOut(node,_832,_833,_834).play();
}};
dojo.lfx.toggle.explode={show:function(node,_836,_837,_838,_839){
dojo.lfx.explode(_839||{x:0,y:0,width:0,height:0},node,_836,_837,_838).play();
},hide:function(node,_83b,_83c,_83d,_83e){
dojo.lfx.implode(node,_83e||{x:0,y:0,width:0,height:0},_83b,_83c,_83d).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_845){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_845&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _849=w||wh.width;
var _84a=h||wh.height;
if(this.width==_849&&this.height==_84a){
return false;
}
this.width=_849;
this.height=_84a;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_84d){
if(_84d.checkSize){
_84d.checkSize();
}
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.Button");
dojo.widget.defineWidget("dojo.widget.Button",dojo.widget.HtmlWidget,{isContainer:true,caption:"",templateString:"<div dojoAttachPoint=\"buttonNode\" class=\"dojoButton\" style=\"position:relative;\" dojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick; onKey:onKey; onFocus;\">\r\n  <div class=\"dojoButtonContents\" align=center dojoAttachPoint=\"containerNode\" style=\"position:absolute;z-index:2;\"></div>\r\n  <img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;\">\r\n  <img dojoAttachPoint=\"centerImage\" style=\"position:absolute;z-index:1;\">\r\n  <img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\r\n</div>\r\n",templateCssString:"/* ---- button --- */\r\n.dojoButton {\r\n\tpadding: 0 0 0 0;\r\n\tfont-size: 8pt;\r\n\twhite-space: nowrap;\r\n\tcursor: pointer;\r\n\tfont-family: Myriad, Tahoma, Verdana, sans-serif;\r\n}\r\n\r\n.dojoButton .dojoButtonContents {\r\n\tpadding: 2px 2px 2px 2px;\r\n\ttext-align: center;\t\t/* if icon and label are split across two lines, center icon */\r\n\tcolor: white;\r\n}\r\n\r\n.dojoButtonLeftPart .dojoButtonContents {\r\n\tpadding-right: 8px;\r\n}\r\n\r\n.dojoButtonDisabled {\r\n\tcursor: url(\"images/no.gif\"), default;\r\n}\r\n\r\n\r\n.dojoButtonContents img {\r\n\tvertical-align: middle;\t/* if icon and label are on same line, center them */\r\n}\r\n\r\n/* -------- colors ------------ */\r\n\r\n.dojoButtonHover .dojoButtonContents {\r\n}\r\n\r\n.dojoButtonDepressed .dojoButtonContents {\r\n\tcolor: #293a4b;\r\n}\r\n\r\n.dojoButtonDisabled .dojoButtonContents {\r\n\tcolor: #aaa;\r\n}\r\n\r\n\r\n/* ---------- drop down button specific ---------- */\r\n\r\n/* border between label and arrow (for drop down buttons */\r\n.dojoButton .border {\r\n\twidth: 1px;\r\n\tbackground: gray;\r\n}\r\n\r\n/* button arrow */\r\n.dojoButton .downArrow {\r\n\tpadding-left: 10px;\r\n\ttext-align: center;\r\n}\r\n\r\n.dojoButton.disabled .downArrow {\r\n\tcursor : default;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/ButtonTemplate.css"),inactiveImg:"src/widget/templates/images/soriaButton-",activeImg:"src/widget/templates/images/soriaActive-",pressedImg:"src/widget/templates/images/soriaPressed-",disabledImg:"src/widget/templates/images/soriaDisabled-",width2height:1/3,fillInTemplate:function(){
if(this.caption){
this.containerNode.appendChild(document.createTextNode(this.caption));
}
dojo.html.disableSelection(this.containerNode);
},postCreate:function(){
this._sizeMyself();
},_sizeMyself:function(){
if(this.domNode.parentNode){
var _84e=document.createElement("span");
dojo.html.insertBefore(_84e,this.domNode);
}
dojo.body().appendChild(this.domNode);
this._sizeMyselfHelper();
if(_84e){
dojo.html.insertBefore(this.domNode,_84e);
dojo.html.removeNode(_84e);
}
},_sizeMyselfHelper:function(){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _850=this.height*this.width2height;
this.containerNode.style.left=_850+"px";
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.height;
this.leftImage.width=this.rightImage.width=_850+1;
this.centerImage.width=this.containerWidth;
this.centerImage.style.left=_850+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
if(this.disabled){
dojo.html.prependClass(this.domNode,"dojoButtonDisabled");
this.domNode.removeAttribute("tabIndex");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
}else{
dojo.html.removeClass(this.domNode,"dojoButtonDisabled");
this.domNode.setAttribute("tabIndex","0");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
}
this.domNode.style.height=this.height+"px";
this.domNode.style.width=(this.containerWidth+2*_850)+"px";
},onMouseOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.activeImg);
},onMouseDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonDepressed");
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.pressedImg);
},onMouseUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.activeImg);
},onMouseOut:function(e){
if(this.disabled){
return;
}
if(e.toElement&&dojo.html.isDescendantOf(e.toElement,this.buttonNode)){
return;
}
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.inactiveImg);
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
},onFocus:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(menu){
dojo.event.connectOnce(this.domNode,"onblur",this,"onBlur");
}
},onBlur:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(!menu){
return;
}
if(menu.close&&menu.isShowingNow){
menu.close();
}
},buttonClick:function(e){
if(!this.disabled){
try{
this.domNode.focus();
}
catch(e2){
}
this.onClick(e);
}
},onClick:function(e){
},_setImage:function(_85d){
this.leftImage.src=dojo.uri.dojoUri(_85d+"l.gif");
this.centerImage.src=dojo.uri.dojoUri(_85d+"c.gif");
this.rightImage.src=dojo.uri.dojoUri(_85d+"r.gif");
},_toggleMenu:function(_85e){
var menu=dojo.widget.getWidgetById(_85e);
if(!menu){
return;
}
if(menu.open&&!menu.isShowingNow){
var pos=dojo.html.getAbsolutePosition(this.domNode,false);
menu.open(pos.x,pos.y+this.height,this);
}else{
if(menu.close&&menu.isShowingNow){
menu.close();
}else{
menu.toggle();
}
}
},setCaption:function(_861){
this.caption=_861;
this.containerNode.innerHTML=_861;
this._sizeMyself();
},setDisabled:function(_862){
this.disabled=_862;
this._sizeMyself();
}});
dojo.widget.defineWidget("dojo.widget.DropDownButton",dojo.widget.Button,{menuId:"",downArrow:"src/widget/templates/images/whiteDownArrow.gif",disabledDownArrow:"src/widget/templates/images/whiteDownArrow.gif",fillInTemplate:function(){
dojo.widget.DropDownButton.superclass.fillInTemplate.apply(this,arguments);
this.arrow=document.createElement("img");
dojo.html.setClass(this.arrow,"downArrow");
dojo.widget.wai.setAttr(this.domNode,"waiState","haspopup",this.menuId);
},_sizeMyselfHelper:function(){
this.arrow.src=dojo.uri.dojoUri(this.disabled?this.disabledDownArrow:this.downArrow);
this.containerNode.appendChild(this.arrow);
dojo.widget.DropDownButton.superclass._sizeMyselfHelper.call(this);
},onClick:function(e){
this._toggleMenu(this.menuId);
}});
dojo.widget.defineWidget("dojo.widget.ComboButton",dojo.widget.Button,{menuId:"",templateString:"<div class=\"dojoButton\" style=\"position:relative;top:0px;left:0px; text-align:none;\" dojoAttachEvent=\"onKey;onFocus\">\r\n\r\n\t<div dojoAttachPoint=\"buttonNode\" class=\"dojoButtonLeftPart\" style=\"position:absolute;left:0px;top:0px;\"\r\n\t\tdojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick;\">\r\n\t\t<div class=\"dojoButtonContents\" dojoAttachPoint=\"containerNode\" style=\"position:absolute;top:0px;right:0px;z-index:2;\"></div>\r\n\t\t<img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;top:0px;\">\r\n\t\t<img dojoAttachPoint=\"centerImage\" style=\"position:absolute;right:0px;top:0px;z-index:1;\">\r\n\t</div>\r\n\r\n\t<div dojoAttachPoint=\"rightPart\" class=\"dojoButtonRightPart\" style=\"position:absolute;top:0px;right:0px;\"\r\n\t\tdojoAttachEvent=\"onMouseOver:rightOver; onMouseOut:rightOut; onMouseDown:rightDown; onMouseUp:rightUp; onClick:rightClick;\">\r\n\t\t<img dojoAttachPoint=\"arrowBackgroundImage\" style=\"position:absolute;top:0px;left:0px;z-index:1;\">\r\n\t\t<img src=\"${dojoRoot}src/widget/templates/images/whiteDownArrow.gif\"\r\n\t\t  \t\tstyle=\"z-index:2;position:absolute;left:3px;top:50%;\">\r\n\t\t<img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\r\n\t</div>\r\n\r\n</div>\r\n",splitWidth:2,arrowWidth:5,_sizeMyselfHelper:function(e){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _866=this.height/3;
if(this.disabled){
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
this.domNode.removeAttribute("tabIndex");
}else{
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
this.domNode.setAttribute("tabIndex","0");
}
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.arrowBackgroundImage.height=this.height;
this.leftImage.width=_866+1;
this.centerImage.width=this.containerWidth;
this.buttonNode.style.height=this.height+"px";
this.buttonNode.style.width=_866+this.containerWidth+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
this.arrowBackgroundImage.width=this.arrowWidth;
this.rightImage.width=_866+1;
this.rightPart.style.height=this.height+"px";
this.rightPart.style.width=this.arrowWidth+_866+"px";
this._setImageR(this.disabled?this.disabledImg:this.inactiveImg);
this.domNode.style.height=this.height+"px";
var _867=this.containerWidth+this.splitWidth+this.arrowWidth+2*_866;
this.domNode.style.width=_867+"px";
},_setImage:function(_868){
this.leftImage.src=dojo.uri.dojoUri(_868+"l.gif");
this.centerImage.src=dojo.uri.dojoUri(_868+"c.gif");
},rightOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.activeImg);
},rightDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonDepressed");
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.pressedImg);
},rightUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.activeImg);
},rightOut:function(e){
if(this.disabled){
return;
}
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.inactiveImg);
},rightClick:function(e){
if(this.disabled){
return;
}
try{
this.domNode.focus();
}
catch(e2){
}
this._toggleMenu(this.menuId);
},_setImageR:function(_86e){
this.arrowBackgroundImage.src=dojo.uri.dojoUri(_86e+"c.gif");
this.rightImage.src=dojo.uri.dojoUri(_86e+"r.gif");
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(e.key==e.KEY_DOWN_ARROW&&e.altKey){
this.rightDown(e);
this.rightClick(e);
dojo.lang.setTimeout(this,"rightUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
}
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_871){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_871))||dojo.html.iframeContentDocument(_871).__parent__||(_871.name&&document.frames[_871.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_873){
var doc=_873.contentDocument||((_873.contentWindow)&&(_873.contentWindow.document))||((_873.name)&&(document.frames[_873.name])&&(document.frames[_873.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _877=dojo.html.getMarginBox(this.domNode);
if(_877.width==0||_877.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_877.width+"px";
this.iframe.style.height=_877.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _879=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_879.width+"px";
height=_879.height+"px";
left=_879.left+"px";
top=_879.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
dojo.provide("dojo.lfx.shadow");
dojo.lfx.shadow=function(node){
this.shadowPng=dojo.uri.dojoUri("src/html/images/shadow");
this.shadowThickness=8;
this.shadowOffset=15;
this.init(node);
};
dojo.extend(dojo.lfx.shadow,{init:function(node){
this.node=node;
this.pieces={};
var x1=-1*this.shadowThickness;
var y0=this.shadowOffset;
var y1=this.shadowOffset+this.shadowThickness;
this._makePiece("tl","top",y0,"left",x1);
this._makePiece("l","top",y1,"left",x1,"scale");
this._makePiece("tr","top",y0,"left",0);
this._makePiece("r","top",y1,"left",0,"scale");
this._makePiece("bl","top",0,"left",x1);
this._makePiece("b","top",0,"left",0,"crop");
this._makePiece("br","top",0,"left",0);
},_makePiece:function(name,_881,_882,_883,_884,_885){
var img;
var url=this.shadowPng+name.toUpperCase()+".png";
if(dojo.render.html.ie55||dojo.render.html.ie60){
img=dojo.doc().createElement("div");
img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"'"+(_885?", sizingMethod='"+_885+"'":"")+")";
}else{
img=dojo.doc().createElement("img");
img.src=url;
}
img.style.position="absolute";
img.style[_881]=_882+"px";
img.style[_883]=_884+"px";
img.style.width=this.shadowThickness+"px";
img.style.height=this.shadowThickness+"px";
this.pieces[name]=img;
this.node.appendChild(img);
},size:function(_888,_889){
var _88a=_889-(this.shadowOffset+this.shadowThickness+1);
if(_88a<0){
_88a=0;
}
if(_889<1){
_889=1;
}
if(_888<1){
_888=1;
}
with(this.pieces){
l.style.height=_88a+"px";
r.style.height=_88a+"px";
b.style.width=(_888-1)+"px";
bl.style.top=(_889-1)+"px";
b.style.top=(_889-1)+"px";
br.style.top=(_889-1)+"px";
tr.style.left=(_888-1)+"px";
r.style.left=(_888-1)+"px";
br.style.left=(_888-1)+"px";
}
}});
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_88b,_88c,_88d){
dojo.html.addClass(_88b,"dojoLayoutContainer");
_88c=dojo.lang.filter(_88c,function(_88e,idx){
_88e.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],_88e.layoutAlign);
});
if(_88d&&_88d!="none"){
var rank=function(_891){
switch(_891.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_88d=="left-right")?2:3;
case "top":
case "bottom":
return (_88d=="left-right")?3:2;
default:
return 4;
}
};
_88c.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_88b,"padding-top",true),left:dojo.html.getPixelValue(_88b,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_88b));
dojo.lang.forEach(_88c,function(_895){
var elm=_895.domNode;
var pos=_895.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
if(_895.onResized){
_895.onResized();
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(_895.resizeTo){
_895.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(_895.resizeTo){
_895.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; overflow: hidden; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
this._ioBindObj;
this.scriptScope;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,scriptSeparation:true,loadingMessage:"Loading...",isLoaded:false,postCreate:function(args,frag,_89c){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_8a0){
this.abort();
this._handleDefaults(this.loadingMessage,"onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",handler:function(type,data,xhr){
delete self._ioBindObj;
if(type=="load"){
self.onDownloadEnd.call(self,url,data);
}else{
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}
}},_8a0));
},_cacheSetting:function(_8a6,_8a7){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_8a6[x])){
_8a6[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_8a6.useCache)){
_8a6.useCache=_8a7;
}
if(dojo.lang.isUndefined(_8a6.preventCache)){
_8a6.preventCache=!_8a7;
}
if(dojo.lang.isUndefined(_8a6.mimetype)){
_8a6.mimetype="text/html";
}
return _8a6;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
dojo.deprecated(this.widgetType+".onUnLoad, use .onUnload (lowercased load)",0.5);
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
if(this.onUnLoad!==dojo.widget.ContentPane.prototype.onUnLoad){
this.onUnLoad.apply(this,arguments);
}
},_runStack:function(_8ac){
var st=this[_8ac];
var err="";
var _8af=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_8af);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_8ac]=[];
if(err.length){
var name=(_8ac=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnload:function(obj,func){
this._pushOnStack(this._onUnloadStack,obj,func);
},addOnUnLoad:function(){
dojo.deprecated(this.widgetType+".addOnUnLoad, use addOnUnload instead. (lowercased Load)",0.5);
this.addOnUnload.apply(this,arguments);
},_pushOnStack:function(_8b6,obj,func){
if(typeof func=="undefined"){
_8b6.push(obj);
}else{
_8b6.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnload();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_8c0,_8c1){
if(!_8c0){
_8c0="onContentError";
}
if(dojo.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_8c0](e);
if(e.returnValue){
switch(_8c1){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
dojo.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
dojo.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString());
}
}
}
arguments.callee._loopStop=false;
},splitAndFixPaths:function(s,url){
var _8c4=[],_8c5=[],tmp=[];
var _8c7=[],_8c8=[],attr=[],_8ca=[];
var str="",path="",fix="",_8ce="",tag="",_8d0="";
if(!url){
url="./";
}
if(s){
var _8d1=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_8c7=_8d1.exec(s)){
_8c4.push(_8c7[1]);
s=s.substring(0,_8c7.index)+s.substr(_8c7.index+_8c7[0].length);
}
if(this.adjustPaths){
var _8d2=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _8d3=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _8d4=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_8d2.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
_8ce="";
while(attr=_8d3.exec(tag)){
path="";
_8d0=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_8d4.exec(_8d0)){
path=_8d0;
}else{
path=(new dojo.uri.Uri(url,_8d0).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(_8d0,url);
break;
default:
path=_8d0;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
_8ce+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=_8ce+tag;
}
s=str+s;
}
_8d1=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_8c7=_8d1.exec(s)){
if(_8c7[1]&&_8c7[1].toLowerCase()=="style"){
_8ca.push(dojo.html.fixPathsInCssText(_8c7[2],url));
}else{
if(attr=_8c7[3].match(/href=(['"]?)([^'">]*)\1/i)){
_8ca.push({path:attr[2]});
}
}
s=s.substring(0,_8c7.index)+s.substr(_8c7.index+_8c7[0].length);
}
var _8d1=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _8d5=/src=(['"]?)([^"']*)\1/i;
var _8d6=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _8d7=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _8d8=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix|registerModulePath)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_8c7=_8d1.exec(s)){
if(this.executeScripts&&_8c7[1]){
if(attr=_8d5.exec(_8c7[1])){
if(_8d6.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  being loaded again.");
}else{
_8c5.push({path:attr[2]});
}
}
}
if(_8c7[2]){
var sc=_8c7[2].replace(_8d7,"");
if(!sc){
continue;
}
while(tmp=_8d8.exec(sc)){
_8c8.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
_8c5.push(sc);
}
}
s=s.substr(0,_8c7.index)+s.substr(_8c7.index+_8c7[0].length);
}
if(this.extractContent){
_8c7=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_8c7){
s=_8c7[1];
}
}
if(this.executeScripts&&this.scriptSeparation){
var _8d1=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*?\S=)((['"])[^>]*scriptScope[^>]*>)/;
var _8da=/([\s'";:\(])scriptScope(.*)/;
str="";
while(tag=_8d1.exec(s)){
tmp=((tag[3]=="'")?"\"":"'");
fix="";
str+=s.substring(0,tag.index)+tag[1];
while(attr=_8da.exec(tag[2])){
tag[2]=tag[2].substring(0,attr.index)+attr[1]+"dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope"+attr[2];
}
str+=tag[2];
s=s.substr(tag.index+tag[0].length);
}
s=str+s;
}
}
return {"xml":s,"styles":_8ca,"titles":_8c4,"requires":_8c8,"scripts":_8c5,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
try{
var node=this.containerNode||this.domNode;
while(node.firstChild){
dojo.html.destroyNode(node.firstChild);
}
if(typeof cont!="string"){
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(typeof data.xml!="string"){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path,dojo.doc(),false,true));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e.text="ContentPane: error in package loading calls, "+(e.description||e);
this._handleDefaults(e,"onContentError","debug");
}
}
}
var _8e0=this;
function asyncParse(){
if(_8e0.executeScripts){
_8e0._executeScripts(data.scripts);
}
if(_8e0.parseContent){
var node=_8e0.containerNode||_8e0.domNode;
var _8e2=new dojo.xml.Parse();
var frag=_8e2.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_8e0);
}
_8e0.onResized();
_8e0.onLoad();
}
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(asyncParse);
}else{
asyncParse();
}
}
},setHandler:function(_8e4){
var fcn=dojo.lang.isFunction(_8e4)?_8e4:window[_8e4];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_8e4+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_8e7){
var self=this;
var tmp="",code="";
for(var i=0;i<_8e7.length;i++){
if(_8e7[i].path){
dojo.io.bind(this._cacheSetting({"url":_8e7[i].path,"load":function(type,_8ed){
dojo.lang.hitch(self,tmp=";"+_8ed);
},"error":function(type,_8ef){
_8ef.text=type+" downloading remote script";
self._handleDefaults.call(self,_8ef,"onExecError","debug");
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_8e7[i];
}
}
try{
if(this.scriptSeparation){
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}else{
var djg=dojo.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=dojo.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
}
catch(e){
e.text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError","debug");
}
}});
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_8fd){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_8fd.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_8fd[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_904){
},dropTargets:[],registerDropTarget:function(_905){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _909=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_909;
this.dragSources[_909]=ds;
ds.domNode.setAttribute(dp,_909);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _90c=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_90c];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _90f=dojo.lang.find(this.dropTargets,dt,true);
if(_90f>=0){
this.dropTargets.splice(_90f,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _915=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_915,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_918){
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_919){
var ret=null;
if(!_919){
return;
}
if(this.currentDropTarget){
e.dragObject=_919;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_919.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_919.dragSource.onDragEnd(e);
}
catch(err){
var _91c={};
for(var i in e){
if(i=="type"){
_91c.type="mouseup";
continue;
}
_91c[i]=e[i];
}
_919.dragSource.onDragEnd(_91c);
}
},function(){
_919.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_925){
var tn=_925.domNode;
if(!tn||!_925.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_925]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_92c){
if(!_92c){
return;
}
var tdo=_92c.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_92c;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_92e){
if(_92e){
_92e.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _931=this.findBestTarget(e);
if(_931.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_931.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_931.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _933=this;
var _934=new Object();
_934.target=null;
_934.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_935){
if(!_933.isInsideBox(e,_935)){
return true;
}
_934.target=_935[2];
_934.points=_935;
return Boolean(_933.nestedTargets);
});
return _934;
},isInsideBox:function(e,_937){
if((e.pageX>_937[0][0])&&(e.pageX<_937[1][0])&&(e.pageY>_937[0][1])&&(e.pageY<_937[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _93c=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_93c.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_93c.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _93c;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_93f){
this.constrainToContainer=true;
if(_93f){
this.constrainingContainer=_93f;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _949=doc.createElement("table");
if(isTr){
var _94a=doc.createElement("tbody");
_949.appendChild(_94a);
_94a.appendChild(node);
}else{
_949.appendChild(node);
}
var _94b=((isTr)?this.domNode:this.domNode.firstChild);
var _94c=((isTr)?node:node.firstChild);
var _94d=tdp.childNodes;
var _94e=_94c.childNodes;
for(var i=0;i<_94d.length;i++){
if((_94e[i])&&(_94e[i].style)){
_94e[i].style.width=dojo.html.getContentBox(_94d[i]).width+"px";
}
}
node=_949;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var _950=document.createElement("div");
_950.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(_950);
_950.appendChild(this.bgIframe.iframe);
node=_950;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _952=dojo.html.getViewport();
var _953=_952.width;
var _954=_952.height;
var _955=dojo.html.getScroll().offset;
var x=_955.x;
var y=_955.y;
}else{
var _958=dojo.html.getContentBox(this.constrainingContainer);
_953=_958.width;
_954=_958.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+_953-mb.width,maxY:y+_954-mb.height};
},updateDragOffset:function(){
var _95a=dojo.html.getScroll().offset;
if(_95a.y!=this.scrollOffset.y){
var diff=_95a.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_95a.y;
}
if(_95a.x!=this.scrollOffset.x){
var diff=_95a.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_95a.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _962=dojo.html.getAbsolutePosition(this.dragClone,true);
var _963={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_963,300);
var _965=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_965.dragClone);
_965.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_967){
this.constrainToContainer=true;
if(_967){
this.constrainingContainer=_967;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,_96c;i<this.domNode.childNodes.length;i++){
_96c=this.domNode.childNodes[i];
if(_96c.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_96c,true);
var _96e=dojo.html.getBorderBox(_96c);
this.childBoxes.push({top:pos.y,bottom:pos.y+_96e.height,left:pos.x,right:pos.x+_96e.width,height:_96e.height,width:_96e.width,node:_96c});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,_971;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_973){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _975=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _977=(dojo.html.gravity(this.childBoxes[0].node,e)&_975);
if(_977){
hide=true;
}
}else{
var _977=true;
}
}else{
var _978=this.childBoxes[i];
var _977=(dojo.html.gravity(_978.node,e)&_975);
if(_978.node===_973[0].dragSource.domNode){
hide=true;
}else{
var _979=_977?(i>0?this.childBoxes[i-1]:_978):(i<this.childBoxes.length-1?this.childBoxes[i+1]:_978);
if(_979.node===_973[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_973,i,_977);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_97b,_97c,_97d){
var _97e=this.vertical?"left":"top";
var _97f;
if(_97c<0){
if(this.childBoxes.length){
_97f=_97d?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_97e]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
_97f=this.childBoxes[_97c];
}
if(_97f){
this.dropIndicator.style[_97e]=(_97d?_97f[_97e]:_97f[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=_97f.height+"px";
this.dropIndicator.style.top=_97f.top+"px";
}else{
this.dropIndicator.style.width=_97f.width+"px";
this.dropIndicator.style.left=_97f.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _983=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_983){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var _984=this.childBoxes[i];
if(dojo.html.gravity(_984.node,e)&_983){
return this.insert(e,_984.node,"before");
}else{
return this.insert(e,_984.node,"after");
}
},insert:function(e,_986,_987){
var node=e.dragObject.domNode;
if(_987=="before"){
return dojo.html.insertBefore(node,_986);
}else{
if(_987=="after"){
return dojo.html.insertAfter(node,_986);
}else{
if(_987=="append"){
_986.appendChild(node);
return true;
}
}
}
return false;
}},function(node,_98a){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(_98a&&dojo.lang.isString(_98a)){
_98a=[_98a];
}
this.acceptedTypes=_98a||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.kwCompoundRequire({common:["dojo.dnd.DragAndDrop"],browser:["dojo.dnd.HtmlDragAndDrop"],dashboard:["dojo.dnd.HtmlDragAndDrop"]});
dojo.provide("dojo.dnd.*");
dojo.provide("dojo.dnd.HtmlDragMove");
dojo.declare("dojo.dnd.HtmlDragMoveSource",dojo.dnd.HtmlDragSource,{onDragStart:function(){
var _98b=new dojo.dnd.HtmlDragMoveObject(this.dragObject,this.type);
if(this.constrainToContainer){
_98b.constrainTo(this.constrainingContainer);
}
return _98b;
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragMoveSource(this.dragObjects[i]));
}
}});
dojo.declare("dojo.dnd.HtmlDragMoveObject",dojo.dnd.HtmlDragObject,{onDragStart:function(e){
dojo.html.clearSelection();
this.dragClone=this.domNode;
if(dojo.html.getComputedStyle(this.domNode,"position")!="absolute"){
this.domNode.style.position="relative";
}
var left=parseInt(dojo.html.getComputedStyle(this.domNode,"left"));
var top=parseInt(dojo.html.getComputedStyle(this.domNode,"top"));
this.dragStartPosition={x:isNaN(left)?0:left,y:isNaN(top)?0:top};
this.scrollOffset=dojo.html.getScroll().offset;
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.containingBlockPosition={x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
dojo.event.connect(this.domNode,"onclick",this,"_squelchOnClick");
},onDragEnd:function(e){
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.domNode.style.top=y+"px";
}
if(!this.disableX){
this.domNode.style.left=x+"px";
}
},_squelchOnClick:function(e){
dojo.event.browser.stopEvent(e);
dojo.event.disconnect(this.domNode,"onclick",this,"_squelchOnClick");
}});
dojo.provide("dojo.widget.Dialog");
dojo.declare("dojo.widget.ModalDialogBase",null,{isContainer:true,focusElement:"",bgColor:"black",bgOpacity:0.4,followScroll:true,closeOnBackgroundClick:false,trapTabs:function(e){
if(e.target==this.tabStartOuter){
if(this._fromTrap){
this.tabStart.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabStart){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabEndOuter){
if(this._fromTrap){
this.tabEnd.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}else{
if(e.target==this.tabEnd){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}
}
}
}
},clearTrap:function(e){
var _996=this;
setTimeout(function(){
_996._fromTrap=false;
},100);
},postCreate:function(){
with(this.domNode.style){
position="absolute";
zIndex=999;
display="none";
overflow="visible";
}
var b=dojo.body();
b.appendChild(this.domNode);
this.bg=document.createElement("div");
this.bg.className="dialogUnderlay";
with(this.bg.style){
position="absolute";
left=top="0px";
zIndex=998;
display="none";
}
b.appendChild(this.bg);
this.setBackgroundColor(this.bgColor);
this.bgIframe=new dojo.html.BackgroundIframe();
if(this.bgIframe.iframe){
with(this.bgIframe.iframe.style){
position="absolute";
left=top="0px";
zIndex=90;
display="none";
}
}
if(this.closeOnBackgroundClick){
dojo.event.kwConnect({srcObj:this.bg,srcFunc:"onclick",adviceObj:this,adviceFunc:"onBackgroundClick",once:true});
}
},uninitialize:function(){
this.bgIframe.remove();
dojo.html.removeNode(this.bg,true);
},setBackgroundColor:function(_998){
if(arguments.length>=3){
_998=new dojo.gfx.color.Color(arguments[0],arguments[1],arguments[2]);
}else{
_998=new dojo.gfx.color.Color(_998);
}
this.bg.style.backgroundColor=_998.toString();
return this.bgColor=_998;
},setBackgroundOpacity:function(op){
if(arguments.length==0){
op=this.bgOpacity;
}
dojo.html.setOpacity(this.bg,op);
try{
this.bgOpacity=dojo.html.getOpacity(this.bg);
}
catch(e){
this.bgOpacity=op;
}
return this.bgOpacity;
},_sizeBackground:function(){
if(this.bgOpacity>0){
var _99a=dojo.html.getViewport();
var h=_99a.height;
var w=_99a.width;
with(this.bg.style){
width=w+"px";
height=h+"px";
}
var _99d=dojo.html.getScroll().offset;
this.bg.style.top=_99d.y+"px";
this.bg.style.left=_99d.x+"px";
var _99a=dojo.html.getViewport();
if(_99a.width!=w){
this.bg.style.width=_99a.width+"px";
}
if(_99a.height!=h){
this.bg.style.height=_99a.height+"px";
}
}
this.bgIframe.size(this.bg);
},_showBackground:function(){
if(this.bgOpacity>0){
this.bg.style.display="block";
}
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},placeModalDialog:function(){
var _99e=dojo.html.getScroll().offset;
var _99f=dojo.html.getViewport();
var mb;
if(this.isShowing()){
mb=dojo.html.getMarginBox(this.domNode);
}else{
dojo.html.setVisibility(this.domNode,false);
dojo.html.show(this.domNode);
mb=dojo.html.getMarginBox(this.domNode);
dojo.html.hide(this.domNode);
dojo.html.setVisibility(this.domNode,true);
}
var x=_99e.x+(_99f.width-mb.width)/2;
var y=_99e.y+(_99f.height-mb.height)/2;
with(this.domNode.style){
left=x+"px";
top=y+"px";
}
},_onKey:function(evt){
if(evt.key){
var node=evt.target;
while(node!=null){
if(node==this.domNode){
return;
}
node=node.parentNode;
}
if(evt.key!=evt.KEY_TAB){
dojo.event.browser.stopEvent(evt);
}else{
if(!dojo.render.html.opera){
try{
this.tabStart.focus();
}
catch(e){
}
}
}
}
},showModalDialog:function(){
if(this.followScroll&&!this._scrollConnected){
this._scrollConnected=true;
dojo.event.connect(window,"onscroll",this,"_onScroll");
}
dojo.event.connect(document.documentElement,"onkey",this,"_onKey");
this.placeModalDialog();
this.setBackgroundOpacity();
this._sizeBackground();
this._showBackground();
this._fromTrap=true;
setTimeout(dojo.lang.hitch(this,function(){
try{
this.tabStart.focus();
}
catch(e){
}
}),50);
},hideModalDialog:function(){
if(this.focusElement){
dojo.byId(this.focusElement).focus();
dojo.byId(this.focusElement).blur();
}
this.bg.style.display="none";
this.bg.style.width=this.bg.style.height="1px";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
dojo.event.disconnect(document.documentElement,"onkey",this,"_onKey");
if(this._scrollConnected){
this._scrollConnected=false;
dojo.event.disconnect(window,"onscroll",this,"_onScroll");
}
},_onScroll:function(){
var _9a5=dojo.html.getScroll().offset;
this.bg.style.top=_9a5.y+"px";
this.bg.style.left=_9a5.x+"px";
this.placeModalDialog();
},checkSize:function(){
if(this.isShowing()){
this._sizeBackground();
this.placeModalDialog();
this.onResized();
}
},onBackgroundClick:function(){
if(this.lifetime-this.timeRemaining>=this.blockDuration){
return;
}
this.hide();
}});
dojo.widget.defineWidget("dojo.widget.Dialog",[dojo.widget.ContentPane,dojo.widget.ModalDialogBase],{templateString:"<div id=\"${this.widgetId}\" class=\"dojoDialog\" dojoattachpoint=\"wrapper\">\r\n\t<span dojoattachpoint=\"tabStartOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\"\ttabindex=\"0\"></span>\r\n\t<span dojoattachpoint=\"tabStart\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n\t<div dojoattachpoint=\"containerNode\" style=\"position: relative; z-index: 2;\"></div>\r\n\t<span dojoattachpoint=\"tabEnd\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n\t<span dojoattachpoint=\"tabEndOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n</div>\r\n",blockDuration:0,lifetime:0,closeNode:"",postMixInProperties:function(){
dojo.widget.Dialog.superclass.postMixInProperties.apply(this,arguments);
if(this.closeNode){
this.setCloseControl(this.closeNode);
}
},postCreate:function(){
dojo.widget.Dialog.superclass.postCreate.apply(this,arguments);
dojo.widget.ModalDialogBase.prototype.postCreate.apply(this,arguments);
},show:function(){
if(this.lifetime){
this.timeRemaining=this.lifetime;
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
if(this.blockDuration&&this.closeNode){
if(this.lifetime>this.blockDuration){
this.closeNode.style.visibility="hidden";
}else{
this.closeNode.style.display="none";
}
}
if(this.timer){
clearInterval(this.timer);
}
this.timer=setInterval(dojo.lang.hitch(this,"_onTick"),100);
}
this.showModalDialog();
dojo.widget.Dialog.superclass.show.call(this);
},onLoad:function(){
this.placeModalDialog();
dojo.widget.Dialog.superclass.onLoad.call(this);
},fillInTemplate:function(){
},hide:function(){
this.hideModalDialog();
dojo.widget.Dialog.superclass.hide.call(this);
if(this.timer){
clearInterval(this.timer);
}
},setTimerNode:function(node){
this.timerNode=node;
},setCloseControl:function(node){
this.closeNode=dojo.byId(node);
dojo.event.connect(this.closeNode,"onclick",this,"hide");
},setShowControl:function(node){
node=dojo.byId(node);
dojo.event.connect(node,"onclick",this,"show");
},_onTick:function(){
if(this.timer){
this.timeRemaining-=100;
if(this.lifetime-this.timeRemaining>=this.blockDuration){
if(this.closeNode){
this.closeNode.style.visibility="visible";
}
}
if(!this.timeRemaining){
clearInterval(this.timer);
this.hide();
}else{
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
}
}
}});
dojo.provide("dojo.widget.ResizeHandle");
dojo.widget.defineWidget("dojo.widget.ResizeHandle",dojo.widget.HtmlWidget,{targetElmId:"",templateCssString:".dojoHtmlResizeHandle {\r\n\tfloat: right;\r\n\tposition: absolute;\r\n\tright: 2px;\r\n\tbottom: 2px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tz-index: 20;\r\n\tcursor: nw-resize;\r\n\tbackground-image: url(grabCorner.gif);\r\n\tline-height: 0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/ResizeHandle.css"),templateString:"<div class=\"dojoHtmlResizeHandle\"><div></div></div>",postCreate:function(){
dojo.event.connect(this.domNode,"onmousedown",this,"_beginSizing");
},_beginSizing:function(e){
if(this._isSizing){
return false;
}
this.targetWidget=dojo.widget.byId(this.targetElmId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetElmId);
if(!this.targetDomNode){
return;
}
this._isSizing=true;
this.startPoint={"x":e.clientX,"y":e.clientY};
var mb=dojo.html.getMarginBox(this.targetDomNode);
this.startSize={"w":mb.width,"h":mb.height};
dojo.event.kwConnect({srcObj:dojo.body(),srcFunc:"onmousemove",targetObj:this,targetFunc:"_changeSizing",rate:25});
dojo.event.connect(dojo.body(),"onmouseup",this,"_endSizing");
e.preventDefault();
},_changeSizing:function(e){
try{
if(!e.clientX||!e.clientY){
return;
}
}
catch(e){
return;
}
var dx=this.startPoint.x-e.clientX;
var dy=this.startPoint.y-e.clientY;
var newW=this.startSize.w-dx;
var newH=this.startSize.h-dy;
if(this.minSize){
var mb=dojo.html.getMarginBox(this.targetDomNode);
if(newW<this.minSize.w){
newW=mb.width;
}
if(newH<this.minSize.h){
newH=mb.height;
}
}
if(this.targetWidget){
this.targetWidget.resizeTo(newW,newH);
}else{
dojo.html.setMarginBox(this.targetDomNode,{width:newW,height:newH});
}
e.preventDefault();
},_endSizing:function(e){
dojo.event.disconnect(dojo.body(),"onmousemove",this,"_changeSizing");
dojo.event.disconnect(dojo.body(),"onmouseup",this,"_endSizing");
this._isSizing=false;
}});
dojo.provide("dojo.widget.FloatingPane");
dojo.declare("dojo.widget.FloatingPaneBase",null,{title:"",iconSrc:"",hasShadow:false,constrainToContainer:false,taskBarId:"",resizable:true,titleBarDisplay:true,windowState:"normal",displayCloseAction:false,displayMinimizeAction:false,displayMaximizeAction:false,_max_taskBarConnectAttempts:5,_taskBarConnectAttempts:0,templateString:"<div id=\"${this.widgetId}\" dojoAttachEvent=\"onMouseDown\" class=\"dojoFloatingPane\">\r\n\t<div dojoAttachPoint=\"titleBar\" class=\"dojoFloatingPaneTitleBar\"  style=\"display:none\">\r\n\t  \t<img dojoAttachPoint=\"titleBarIcon\"  class=\"dojoFloatingPaneTitleBarIcon\">\r\n\t\t<div dojoAttachPoint=\"closeAction\" dojoAttachEvent=\"onClick:closeWindow\"\r\n   \t  \t\tclass=\"dojoFloatingPaneCloseIcon\"></div>\r\n\t\t<div dojoAttachPoint=\"restoreAction\" dojoAttachEvent=\"onClick:restoreWindow\"\r\n   \t  \t\tclass=\"dojoFloatingPaneRestoreIcon\"></div>\r\n\t\t<div dojoAttachPoint=\"maximizeAction\" dojoAttachEvent=\"onClick:maximizeWindow\"\r\n   \t  \t\tclass=\"dojoFloatingPaneMaximizeIcon\"></div>\r\n\t\t<div dojoAttachPoint=\"minimizeAction\" dojoAttachEvent=\"onClick:minimizeWindow\"\r\n   \t  \t\tclass=\"dojoFloatingPaneMinimizeIcon\"></div>\r\n\t  \t<div dojoAttachPoint=\"titleBarText\" class=\"dojoFloatingPaneTitleText\">${this.title}</div>\r\n\t</div>\r\n\r\n\t<div id=\"${this.widgetId}_container\" dojoAttachPoint=\"containerNode\" class=\"dojoFloatingPaneClient\"></div>\r\n\r\n\t<div dojoAttachPoint=\"resizeBar\" class=\"dojoFloatingPaneResizebar\" style=\"display:none\"></div>\r\n</div>\r\n",templateCssString:"\r\n/********** Outer Window ***************/\r\n\r\n.dojoFloatingPane {\r\n\t/* essential css */\r\n\tposition: absolute;\r\n\toverflow: visible;\t\t/* so drop shadow is displayed */\r\n\tz-index: 10;\r\n\r\n\t/* styling css */\r\n\tborder: 1px solid;\r\n\tborder-color: ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight;\r\n\tbackground-color: ThreeDFace;\r\n}\r\n\r\n\r\n/********** Title Bar ****************/\r\n\r\n.dojoFloatingPaneTitleBar {\r\n\tvertical-align: top;\r\n\tmargin: 2px 2px 2px 2px;\r\n\tz-index: 10;\r\n\tbackground-color: #7596c6;\r\n\tcursor: default;\r\n\toverflow: hidden;\r\n\tborder-color: ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.dojoFloatingPaneTitleText {\r\n\tfloat: left;\r\n\tpadding: 2px 4px 2px 2px;\r\n\twhite-space: nowrap;\r\n\tcolor: CaptionText;\r\n\tfont: small-caption;\r\n}\r\n\r\n.dojoTitleBarIcon {\r\n\tfloat: left;\r\n\theight: 22px;\r\n\twidth: 22px;\r\n\tvertical-align: middle;\r\n\tmargin-right: 5px;\r\n\tmargin-left: 5px;\r\n}\r\n\r\n.dojoFloatingPaneActions{\r\n\tfloat: right;\r\n\tposition: absolute;\r\n\tright: 2px;\r\n\ttop: 2px;\r\n\tvertical-align: middle;\r\n}\r\n\r\n\r\n.dojoFloatingPaneActionItem {\r\n\tvertical-align: middle;\r\n\tmargin-right: 1px;\r\n\theight: 22px;\r\n\twidth: 22px;\r\n}\r\n\r\n\r\n.dojoFloatingPaneTitleBarIcon {\r\n\t/* essential css */\r\n\tfloat: left;\r\n\r\n\t/* styling css */\r\n\tmargin-left: 2px;\r\n\tmargin-right: 4px;\r\n\theight: 22px;\r\n}\r\n\r\n/* minimize/maximize icons are specified by CSS only */\r\n.dojoFloatingPaneMinimizeIcon,\r\n.dojoFloatingPaneMaximizeIcon,\r\n.dojoFloatingPaneRestoreIcon,\r\n.dojoFloatingPaneCloseIcon {\r\n\tvertical-align: middle;\r\n\theight: 22px;\r\n\twidth: 22px;\r\n\tfloat: right;\r\n}\r\n.dojoFloatingPaneMinimizeIcon {\r\n\tbackground-image: url(images/floatingPaneMinimize.gif);\r\n}\r\n.dojoFloatingPaneMaximizeIcon {\r\n\tbackground-image: url(images/floatingPaneMaximize.gif);\r\n}\r\n.dojoFloatingPaneRestoreIcon {\r\n\tbackground-image: url(images/floatingPaneRestore.gif);\r\n}\r\n.dojoFloatingPaneCloseIcon {\r\n\tbackground-image: url(images/floatingPaneClose.gif);\r\n}\r\n\r\n/* bar at bottom of window that holds resize handle */\r\n.dojoFloatingPaneResizebar {\r\n\tz-index: 10;\r\n\theight: 13px;\r\n\tbackground-color: ThreeDFace;\r\n}\r\n\r\n/************* Client Area ***************/\r\n\r\n.dojoFloatingPaneClient {\r\n\tposition: relative;\r\n\tz-index: 10;\r\n\tborder: 1px solid;\r\n\tborder-color: ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow;\r\n\tmargin: 2px;\r\n\tbackground-color: ThreeDFace;\r\n\tpadding: 8px;\r\n\tfont-family: Verdana, Helvetica, Garamond, sans-serif;\r\n\tfont-size: 12px;\r\n\toverflow: auto;\r\n}\r\n\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/FloatingPane.css"),fillInFloatingPaneTemplate:function(args,frag){
var _9b4=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_9b4);
dojo.body().appendChild(this.domNode);
if(!this.isShowing()){
this.windowState="minimized";
}
if(this.iconSrc==""){
dojo.html.removeNode(this.titleBarIcon);
}else{
this.titleBarIcon.src=this.iconSrc.toString();
}
if(this.titleBarDisplay){
this.titleBar.style.display="";
dojo.html.disableSelection(this.titleBar);
this.titleBarIcon.style.display=(this.iconSrc==""?"none":"");
this.minimizeAction.style.display=(this.displayMinimizeAction?"":"none");
this.maximizeAction.style.display=(this.displayMaximizeAction&&this.windowState!="maximized"?"":"none");
this.restoreAction.style.display=(this.displayMaximizeAction&&this.windowState=="maximized"?"":"none");
this.closeAction.style.display=(this.displayCloseAction?"":"none");
this.drag=new dojo.dnd.HtmlDragMoveSource(this.domNode);
if(this.constrainToContainer){
this.drag.constrainTo();
}
this.drag.setDragHandle(this.titleBar);
var self=this;
dojo.event.topic.subscribe("dragMove",function(info){
if(info.source.domNode==self.domNode){
dojo.event.topic.publish("floatingPaneMove",{source:self});
}
});
}
if(this.resizable){
this.resizeBar.style.display="";
this.resizeHandle=dojo.widget.createWidget("ResizeHandle",{targetElmId:this.widgetId,id:this.widgetId+"_resize"});
this.resizeBar.appendChild(this.resizeHandle.domNode);
}
if(this.hasShadow){
this.shadow=new dojo.lfx.shadow(this.domNode);
}
this.bgIframe=new dojo.html.BackgroundIframe(this.domNode);
if(this.taskBarId){
this._taskBarSetup();
}
dojo.body().removeChild(this.domNode);
},postCreate:function(){
if(dojo.hostenv.post_load_){
this._setInitialWindowState();
}else{
dojo.addOnLoad(this,"_setInitialWindowState");
}
},maximizeWindow:function(evt){
var mb=dojo.html.getMarginBox(this.domNode);
this.previous={width:mb.width||this.width,height:mb.height||this.height,left:this.domNode.style.left,top:this.domNode.style.top,bottom:this.domNode.style.bottom,right:this.domNode.style.right};
if(this.domNode.parentNode.style.overflow.toLowerCase()!="hidden"){
this.parentPrevious={overflow:this.domNode.parentNode.style.overflow};
dojo.debug(this.domNode.parentNode.style.overflow);
this.domNode.parentNode.style.overflow="hidden";
}
this.domNode.style.left=dojo.html.getPixelValue(this.domNode.parentNode,"padding-left",true)+"px";
this.domNode.style.top=dojo.html.getPixelValue(this.domNode.parentNode,"padding-top",true)+"px";
if((this.domNode.parentNode.nodeName.toLowerCase()=="body")){
var _9b9=dojo.html.getViewport();
var _9ba=dojo.html.getPadding(dojo.body());
this.resizeTo(_9b9.width-_9ba.width,_9b9.height-_9ba.height);
}else{
var _9bb=dojo.html.getContentBox(this.domNode.parentNode);
this.resizeTo(_9bb.width,_9bb.height);
}
this.maximizeAction.style.display="none";
this.restoreAction.style.display="";
if(this.resizeHandle){
this.resizeHandle.domNode.style.display="none";
}
this.drag.setDragHandle(null);
this.windowState="maximized";
},minimizeWindow:function(evt){
this.hide();
for(var attr in this.parentPrevious){
this.domNode.parentNode.style[attr]=this.parentPrevious[attr];
}
this.lastWindowState=this.windowState;
this.windowState="minimized";
},restoreWindow:function(evt){
if(this.windowState=="minimized"){
this.show();
if(this.lastWindowState=="maximized"){
this.domNode.parentNode.style.overflow="hidden";
this.windowState="maximized";
}else{
this.windowState="normal";
}
}else{
if(this.windowState=="maximized"){
for(var attr in this.previous){
this.domNode.style[attr]=this.previous[attr];
}
for(var attr in this.parentPrevious){
this.domNode.parentNode.style[attr]=this.parentPrevious[attr];
}
this.resizeTo(this.previous.width,this.previous.height);
this.previous=null;
this.parentPrevious=null;
this.restoreAction.style.display="none";
this.maximizeAction.style.display=this.displayMaximizeAction?"":"none";
if(this.resizeHandle){
this.resizeHandle.domNode.style.display="";
}
this.drag.setDragHandle(this.titleBar);
this.windowState="normal";
}else{
}
}
},toggleDisplay:function(){
if(this.windowState=="minimized"){
this.restoreWindow();
}else{
this.minimizeWindow();
}
},closeWindow:function(evt){
dojo.html.removeNode(this.domNode);
this.destroy();
},onMouseDown:function(evt){
this.bringToTop();
},bringToTop:function(){
var _9c2=dojo.widget.manager.getWidgetsByType(this.widgetType);
var _9c3=[];
for(var x=0;x<_9c2.length;x++){
if(this.widgetId!=_9c2[x].widgetId){
_9c3.push(_9c2[x]);
}
}
_9c3.sort(function(a,b){
return a.domNode.style.zIndex-b.domNode.style.zIndex;
});
_9c3.push(this);
var _9c7=100;
for(x=0;x<_9c3.length;x++){
_9c3[x].domNode.style.zIndex=_9c7+x*2;
}
},_setInitialWindowState:function(){
if(this.isShowing()){
this.width=-1;
var mb=dojo.html.getMarginBox(this.domNode);
this.resizeTo(mb.width,mb.height);
}
if(this.windowState=="maximized"){
this.maximizeWindow();
this.show();
return;
}
if(this.windowState=="normal"){
this.show();
return;
}
if(this.windowState=="minimized"){
this.hide();
return;
}
this.windowState="minimized";
},_taskBarSetup:function(){
var _9c9=dojo.widget.getWidgetById(this.taskBarId);
if(!_9c9){
if(this._taskBarConnectAttempts<this._max_taskBarConnectAttempts){
dojo.lang.setTimeout(this,this._taskBarSetup,50);
this._taskBarConnectAttempts++;
}else{
dojo.debug("Unable to connect to the taskBar");
}
return;
}
_9c9.addChild(this);
},showFloatingPane:function(){
this.bringToTop();
},onFloatingPaneShow:function(){
var mb=dojo.html.getMarginBox(this.domNode);
this.resizeTo(mb.width,mb.height);
},resizeTo:function(_9cb,_9cc){
dojo.html.setMarginBox(this.domNode,{width:_9cb,height:_9cc});
dojo.widget.html.layout(this.domNode,[{domNode:this.titleBar,layoutAlign:"top"},{domNode:this.resizeBar,layoutAlign:"bottom"},{domNode:this.containerNode,layoutAlign:"client"}]);
dojo.widget.html.layout(this.containerNode,this.children,"top-bottom");
this.bgIframe.onResized();
if(this.shadow){
this.shadow.size(_9cb,_9cc);
}
this.onResized();
},checkSize:function(){
},destroyFloatingPane:function(){
if(this.resizeHandle){
this.resizeHandle.destroy();
this.resizeHandle=null;
}
}});
dojo.widget.defineWidget("dojo.widget.FloatingPane",[dojo.widget.ContentPane,dojo.widget.FloatingPaneBase],{fillInTemplate:function(args,frag){
this.fillInFloatingPaneTemplate(args,frag);
dojo.widget.FloatingPane.superclass.fillInTemplate.call(this,args,frag);
},postCreate:function(){
dojo.widget.FloatingPaneBase.prototype.postCreate.apply(this,arguments);
dojo.widget.FloatingPane.superclass.postCreate.apply(this,arguments);
},show:function(){
dojo.widget.FloatingPane.superclass.show.apply(this,arguments);
this.showFloatingPane();
},onShow:function(){
dojo.widget.FloatingPane.superclass.onShow.call(this);
this.onFloatingPaneShow();
},destroy:function(){
this.destroyFloatingPane();
dojo.widget.FloatingPane.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.ModalFloatingPane",[dojo.widget.FloatingPane,dojo.widget.ModalDialogBase],{windowState:"minimized",displayCloseAction:true,postCreate:function(){
dojo.widget.ModalDialogBase.prototype.postCreate.call(this);
dojo.widget.ModalFloatingPane.superclass.postCreate.call(this);
},show:function(){
this.showModalDialog();
dojo.widget.ModalFloatingPane.superclass.show.apply(this,arguments);
this.bg.style.zIndex=this.domNode.style.zIndex-1;
},hide:function(){
this.hideModalDialog();
dojo.widget.ModalFloatingPane.superclass.hide.apply(this,arguments);
},closeWindow:function(){
this.hide();
dojo.widget.ModalFloatingPane.superclass.closeWindow.apply(this,arguments);
}});
dojo.provide("dojo.widget.LayoutContainer");
dojo.widget.defineWidget("dojo.widget.LayoutContainer",dojo.widget.HtmlWidget,{isContainer:true,layoutChildPriority:"top-bottom",postCreate:function(){
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},addChild:function(_9cf,_9d0,pos,ref,_9d3){
dojo.widget.LayoutContainer.superclass.addChild.call(this,_9cf,_9d0,pos,ref,_9d3);
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},removeChild:function(pane){
dojo.widget.LayoutContainer.superclass.removeChild.call(this,pane);
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},onResized:function(){
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},show:function(){
this.domNode.style.display="";
this.checkSize();
this.domNode.style.display="none";
this.domNode.style.visibility="";
dojo.widget.LayoutContainer.superclass.show.call(this);
}});
dojo.lang.extend(dojo.widget.Widget,{layoutAlign:"none"});
dojo.provide("dojo.widget.LinkPane");
dojo.widget.defineWidget("dojo.widget.LinkPane",dojo.widget.ContentPane,{templateString:"<div class=\"dojoLinkPane\"></div>",fillInTemplate:function(args,frag){
var _9d7=this.getFragNodeRef(frag);
this.label+=_9d7.innerHTML;
var _9d7=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_9d7);
}});
dojo.provide("dojo.widget.PageContainer");
dojo.widget.defineWidget("dojo.widget.PageContainer",dojo.widget.HtmlWidget,{isContainer:true,doLayout:true,templateString:"<div dojoAttachPoint='containerNode'></div>",selectedChild:"",fillInTemplate:function(args,frag){
var _9da=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_9da);
dojo.widget.PageContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
if(this.children.length){
dojo.lang.forEach(this.children,this._setupChild,this);
var _9dd;
if(this.selectedChild){
this.selectChild(this.selectedChild);
}else{
for(var i=0;i<this.children.length;i++){
if(this.children[i].selected){
this.selectChild(this.children[i]);
break;
}
}
if(!this.selectedChildWidget){
this.selectChild(this.children[0]);
}
}
}
},addChild:function(_9df){
dojo.widget.PageContainer.superclass.addChild.apply(this,arguments);
this._setupChild(_9df);
this.onResized();
if(!this.selectedChildWidget){
this.selectChild(_9df);
}
},_setupChild:function(page){
page.hide();
page.domNode.style.position="relative";
dojo.event.topic.publish(this.widgetId+"-addChild",page);
},removeChild:function(page){
dojo.widget.PageContainer.superclass.removeChild.apply(this,arguments);
if(this._beingDestroyed){
return;
}
dojo.event.topic.publish(this.widgetId+"-removeChild",page);
this.onResized();
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this.children.length>0){
this.selectChild(this.children[0],true);
}
}
},selectChild:function(page,_9e3){
page=dojo.widget.byId(page);
this.correspondingPageButton=_9e3;
if(this.selectedChildWidget){
this._hideChild(this.selectedChildWidget);
}
this.selectedChildWidget=page;
this.selectedChild=page.widgetId;
this._showChild(page);
page.isFirstChild=(page==this.children[0]);
page.isLastChild=(page==this.children[this.children.length-1]);
dojo.event.topic.publish(this.widgetId+"-selectChild",page);
},forward:function(){
var _9e4=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[_9e4+1]);
},back:function(){
var _9e5=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[_9e5-1]);
},onResized:function(){
if(this.doLayout&&this.selectedChildWidget){
with(this.selectedChildWidget.domNode.style){
top=dojo.html.getPixelValue(this.containerNode,"padding-top",true);
left=dojo.html.getPixelValue(this.containerNode,"padding-left",true);
}
var _9e6=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_9e6.width,_9e6.height);
}
},_showChild:function(page){
if(this.doLayout){
var _9e8=dojo.html.getContentBox(this.containerNode);
page.resizeTo(_9e8.width,_9e8.height);
}
page.selected=true;
page.show();
},_hideChild:function(page){
page.selected=false;
page.hide();
},closeChild:function(page){
var _9eb=page.onClose(this,page);
if(_9eb){
this.removeChild(page);
page.destroy();
}
},destroy:function(){
this._beingDestroyed=true;
dojo.event.topic.destroy(this.widgetId+"-addChild");
dojo.event.topic.destroy(this.widgetId+"-removeChild");
dojo.event.topic.destroy(this.widgetId+"-selectChild");
dojo.widget.PageContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.PageController",dojo.widget.HtmlWidget,{templateString:"<span wairole='tablist' dojoAttachEvent='onKey'></span>",isContainer:true,containerId:"",buttonWidget:"PageButton","class":"dojoPageController",fillInTemplate:function(){
dojo.html.addClass(this.domNode,this["class"]);
dojo.widget.wai.setAttr(this.domNode,"waiRole","role","tablist");
},postCreate:function(){
this.pane2button={};
var _9ec=dojo.widget.byId(this.containerId);
if(_9ec){
dojo.lang.forEach(_9ec.children,this.onAddChild,this);
}
dojo.event.topic.subscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.subscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.subscribe(this.containerId+"-selectChild",this,"onSelectChild");
},destroy:function(){
dojo.event.topic.unsubscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.unsubscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.unsubscribe(this.containerId+"-selectChild",this,"onSelectChild");
dojo.widget.PageController.superclass.destroy.apply(this,arguments);
},onAddChild:function(page){
var _9ee=dojo.widget.createWidget(this.buttonWidget,{label:page.label,closeButton:page.closable});
this.addChild(_9ee);
this.domNode.appendChild(_9ee.domNode);
this.pane2button[page]=_9ee;
page.controlButton=_9ee;
var _9ef=this;
dojo.event.connect(_9ee,"onClick",function(){
_9ef.onButtonClick(page);
});
dojo.event.connect(_9ee,"onCloseButtonClick",function(){
_9ef.onCloseButtonClick(page);
});
},onRemoveChild:function(page){
if(this._currentChild==page){
this._currentChild=null;
}
var _9f1=this.pane2button[page];
if(_9f1){
_9f1.destroy();
}
this.pane2button[page]=null;
},onSelectChild:function(page){
if(this._currentChild){
var _9f3=this.pane2button[this._currentChild];
_9f3.clearSelected();
}
var _9f4=this.pane2button[page];
_9f4.setSelected();
this._currentChild=page;
},onButtonClick:function(page){
var _9f6=dojo.widget.byId(this.containerId);
_9f6.selectChild(page,false,this);
},onCloseButtonClick:function(page){
var _9f8=dojo.widget.byId(this.containerId);
_9f8.closeChild(page);
},onKey:function(evt){
if((evt.keyCode==evt.KEY_RIGHT_ARROW)||(evt.keyCode==evt.KEY_LEFT_ARROW)){
var _9fa=0;
var next=null;
var _9fa=dojo.lang.find(this.children,this.pane2button[this._currentChild]);
if(evt.keyCode==evt.KEY_RIGHT_ARROW){
next=this.children[(_9fa+1)%this.children.length];
}else{
next=this.children[(_9fa+(this.children.length-1))%this.children.length];
}
dojo.event.browser.stopEvent(evt);
next.onClick();
}
}});
dojo.widget.defineWidget("dojo.widget.PageButton",dojo.widget.HtmlWidget,{templateString:"<span class='item'>"+"<span dojoAttachEvent='onClick' dojoAttachPoint='titleNode' class='selectButton'>${this.label}</span>"+"<span dojoAttachEvent='onClick:onCloseButtonClick' class='closeButton'>[X]</span>"+"</span>",label:"foo",closeButton:false,onClick:function(){
this.focus();
},onCloseButtonMouseOver:function(){
dojo.html.addClass(this.closeButtonNode,"closeHover");
},onCloseButtonMouseOut:function(){
dojo.html.removeClass(this.closeButtonNode,"closeHover");
},onCloseButtonClick:function(evt){
},setSelected:function(){
dojo.html.addClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","0");
},clearSelected:function(){
dojo.html.removeClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","-1");
},focus:function(){
if(this.titleNode.focus){
this.titleNode.focus();
}
}});
dojo.lang.extend(dojo.widget.Widget,{label:"",selected:false,closable:false,onClose:function(){
return true;
}});
dojo.provide("dojo.widget.AccordionContainer");
dojo.widget.defineWidget("dojo.widget.AccordionContainer",dojo.widget.HtmlWidget,{isContainer:true,labelNodeClass:"label",containerNodeClass:"accBody",duration:250,fillInTemplate:function(){
with(this.domNode.style){
if(position!="absolute"){
position="relative";
}
overflow="hidden";
}
},addChild:function(_9fd){
var _9fe=this._addChild(_9fd);
this._setSizes();
return _9fe;
},_addChild:function(_9ff){
if(_9ff.open){
dojo.deprecated("open parameter deprecated, use 'selected=true' instead will be removed in ","0.5");
dojo.debug(_9ff.widgetId+": open == "+_9ff.open);
_9ff.selected=true;
}
if(_9ff.widgetType!="AccordionPane"){
var _a00=dojo.widget.createWidget("AccordionPane",{label:_9ff.label,selected:_9ff.selected,labelNodeClass:this.labelNodeClass,containerNodeClass:this.containerNodeClass,allowCollapse:this.allowCollapse});
_a00.addChild(_9ff);
this.addWidgetAsDirectChild(_a00);
this.registerChild(_a00,this.children.length);
return _a00;
}else{
dojo.html.addClass(_9ff.containerNode,this.containerNodeClass);
dojo.html.addClass(_9ff.labelNode,this.labelNodeClass);
this.addWidgetAsDirectChild(_9ff);
this.registerChild(_9ff,this.children.length);
return _9ff;
}
},postCreate:function(){
var _a01=this.children;
this.children=[];
dojo.html.removeChildren(this.domNode);
dojo.lang.forEach(_a01,dojo.lang.hitch(this,"_addChild"));
this._setSizes();
},removeChild:function(_a02){
dojo.widget.AccordionContainer.superclass.removeChild.call(this,_a02);
this._setSizes();
},onResized:function(){
this._setSizes();
},_setSizes:function(){
var _a03=0;
var _a04=0;
dojo.lang.forEach(this.children,function(_a05,idx){
_a03+=_a05.getLabelHeight();
if(_a05.selected){
_a04=idx;
}
});
var _a07=dojo.html.getContentBox(this.domNode);
var y=0;
dojo.lang.forEach(this.children,function(_a09,idx){
var _a0b=_a09.getLabelHeight();
_a09.resizeTo(_a07.width,_a07.height-_a03+_a0b);
_a09.domNode.style.zIndex=idx+1;
_a09.domNode.style.position="absolute";
_a09.domNode.style.top=y+"px";
y+=(idx==_a04)?dojo.html.getBorderBox(_a09.domNode).height:_a0b;
});
},selectChild:function(page){
dojo.lang.forEach(this.children,function(_a0d){
_a0d.setSelected(_a0d==page);
});
var y=0;
var _a0f=[];
dojo.lang.forEach(this.children,function(_a10,idx){
if(_a10.domNode.style.top!=(y+"px")){
_a0f.push(dojo.lfx.html.slideTo(_a10.domNode,{top:y,left:0},this.duration));
}
y+=_a10.selected?dojo.html.getBorderBox(_a10.domNode).height:_a10.getLabelHeight();
},this);
dojo.lfx.combine(_a0f).play();
}});
dojo.widget.defineWidget("dojo.widget.AccordionPane",dojo.widget.HtmlWidget,{label:"","class":"dojoAccordionPane",labelNodeClass:"label",containerNodeClass:"accBody",selected:false,templateString:"<div dojoAttachPoint=\"domNode\">\r\n<div dojoAttachPoint=\"labelNode\" dojoAttachEvent=\"onclick: onLabelClick\" class=\"${this.labelNodeClass}\">${this.label}</div>\r\n<div dojoAttachPoint=\"containerNode\" style=\"overflow: hidden;\" class=\"${this.containerNodeClass}\"></div>\r\n</div>\r\n",templateCssString:".dojoAccordionPane .label {\r\n\tcolor: #000;\r\n\tfont-weight: bold;\r\n\tbackground: url(\"images/soriaAccordionOff.gif\") repeat-x top left #85aeec;\r\n\tborder:1px solid #d9d9d9;\r\n\tfont-size:0.9em;\r\n}\r\n\r\n.dojoAccordionPane-selected .label {\r\n\tbackground: url(\"images/soriaAccordionSelected.gif\") repeat-x top left #85aeec;\r\n\tborder:1px solid #84a3d1;\r\n}\r\n\r\n.dojoAccordionPane .label:hover {\r\n\tcursor: pointer;\r\n}\r\n\r\n.dojoAccordionPane .accBody {\r\n\tbackground: #fff;\r\n\toverflow: auto;\r\n\tborder:1px solid #84a3d1;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/AccordionPane.css"),isContainer:true,fillInTemplate:function(){
dojo.html.addClass(this.domNode,this["class"]);
dojo.widget.AccordionPane.superclass.fillInTemplate.call(this);
dojo.html.disableSelection(this.labelNode);
this.setSelected(this.selected);
},setLabel:function(_a12){
this.labelNode.innerHTML=_a12;
},resizeTo:function(_a13,_a14){
dojo.html.setMarginBox(this.domNode,{width:_a13,height:_a14});
var _a15=[{domNode:this.labelNode,layoutAlign:"top"},{domNode:this.containerNode,layoutAlign:"client"}];
dojo.widget.html.layout(this.domNode,_a15);
var _a16=dojo.html.getContentBox(this.containerNode);
this.children[0].resizeTo(_a16.width,_a16.height);
},getLabelHeight:function(){
return dojo.html.getMarginBox(this.labelNode).height;
},onLabelClick:function(){
this.parent.selectChild(this);
},setSelected:function(_a17){
this.selected=_a17;
(_a17?dojo.html.addClass:dojo.html.removeClass)(this.domNode,this["class"]+"-selected");
var _a18=this.children[0];
if(_a18){
if(_a17){
if(!_a18.isShowing()){
_a18.show();
}else{
_a18.onShow();
}
}else{
_a18.onHide();
}
}
}});
dojo.lang.extend(dojo.widget.Widget,{open:false});
dojo.provide("dojo.widget.ColorPalette");
dojo.widget.defineWidget("dojo.widget.ColorPalette",dojo.widget.HtmlWidget,{palette:"7x10",_palettes:{"7x10":[["fff","fcc","fc9","ff9","ffc","9f9","9ff","cff","ccf","fcf"],["ccc","f66","f96","ff6","ff3","6f9","3ff","6ff","99f","f9f"],["c0c0c0","f00","f90","fc6","ff0","3f3","6cc","3cf","66c","c6c"],["999","c00","f60","fc3","fc0","3c0","0cc","36f","63f","c3c"],["666","900","c60","c93","990","090","399","33f","60c","939"],["333","600","930","963","660","060","366","009","339","636"],["000","300","630","633","330","030","033","006","309","303"]],"3x4":[["ffffff","00ff00","008000","0000ff"],["c0c0c0","ffff00","ff00ff","000080"],["808080","ff0000","800080","000000"]]},buildRendering:function(){
this.domNode=document.createElement("table");
dojo.html.disableSelection(this.domNode);
dojo.event.connect(this.domNode,"onmousedown",function(e){
e.preventDefault();
});
with(this.domNode){
cellPadding="0";
cellSpacing="1";
border="1";
style.backgroundColor="white";
}
var _a1a=this._palettes[this.palette];
for(var i=0;i<_a1a.length;i++){
var tr=this.domNode.insertRow(-1);
for(var j=0;j<_a1a[i].length;j++){
if(_a1a[i][j].length==3){
_a1a[i][j]=_a1a[i][j].replace(/(.)(.)(.)/,"$1$1$2$2$3$3");
}
var td=tr.insertCell(-1);
with(td.style){
backgroundColor="#"+_a1a[i][j];
border="1px solid gray";
width=height="15px";
fontSize="1px";
}
td.color="#"+_a1a[i][j];
td.onmouseover=function(e){
this.style.borderColor="white";
};
td.onmouseout=function(e){
this.style.borderColor="gray";
};
dojo.event.connect(td,"onmousedown",this,"onClick");
td.innerHTML="&nbsp;";
}
}
},onClick:function(e){
this.onColorSelect(e.currentTarget.color);
e.currentTarget.style.borderColor="gray";
},onColorSelect:function(_a22){
}});
dojo.provide("dojo.widget.TabContainer");
dojo.widget.defineWidget("dojo.widget.TabContainer",dojo.widget.PageContainer,{labelPosition:"top",closeButton:"none",templateString:null,templateString:"<div id=\"${this.widgetId}\" class=\"dojoTabContainer\">\r\n\t<div dojoAttachPoint=\"tablistNode\"></div>\r\n\t<div class=\"dojoTabPaneWrapper\" dojoAttachPoint=\"containerNode\" dojoAttachEvent=\"onKey\" waiRole=\"tabpanel\"></div>\r\n</div>\r\n",templateCssString:".dojoTabContainer {\r\n\tposition : relative;\r\n}\r\n\r\n.dojoTabPaneWrapper {\r\n\tborder : 1px solid #6290d2;\r\n\t_zoom: 1; /* force IE6 layout mode so top border doesnt disappear */\r\n\tdisplay: block;\r\n\tclear: both;\r\n\toverflow: hidden;\r\n}\r\n\r\n.dojoTabLabels-top {\r\n\tposition : relative;\r\n\ttop : 0px;\r\n\tleft : 0px;\r\n\toverflow : visible;\r\n\tmargin-bottom : -1px;\r\n\twidth : 100%;\r\n\tz-index: 2;\t/* so the bottom of the tab label will cover up the border of dojoTabPaneWrapper */\r\n}\r\n\r\n.dojoTabNoLayout.dojoTabLabels-top .dojoTab {\r\n\tmargin-bottom: -1px;\r\n\t_margin-bottom: 0px; /* IE filter so top border lines up correctly */\r\n}\r\n\r\n.dojoTab {\r\n\tposition : relative;\r\n\tfloat : left;\r\n\tpadding-left : 9px;\r\n\tborder-bottom : 1px solid #6290d2;\r\n\tbackground : url(images/tab_left.gif) no-repeat left top;\r\n\tcursor: pointer;\r\n\twhite-space: nowrap;\r\n\tz-index: 3;\r\n}\r\n\r\n.dojoTab div {\r\n\tdisplay : block;\r\n\tpadding : 4px 15px 4px 6px;\r\n\tbackground : url(images/tab_top_right.gif) no-repeat right top;\r\n\tcolor : #333;\r\n\tfont-size : 90%;\r\n}\r\n\r\n.dojoTab .close {\r\n\tdisplay : inline-block;\r\n\theight : 12px;\r\n\twidth : 12px;\r\n\tpadding : 0 12px 0 0;\r\n\tmargin : 0 -10px 0 10px;\r\n\tcursor : default;\r\n\tfont-size: small;\r\n}\r\n\r\n.dojoTab .closeImage {\r\n\tbackground : url(images/tab_close.gif) no-repeat right top;\r\n}\r\n\r\n.dojoTab .closeHover {\r\n\tbackground-image : url(images/tab_close_h.gif);\r\n}\r\n\r\n.dojoTab.current {\r\n\tpadding-bottom : 1px;\r\n\tborder-bottom : 0;\r\n\tbackground-position : 0 -150px;\r\n}\r\n\r\n.dojoTab.current div {\r\n\tpadding-bottom : 5px;\r\n\tmargin-bottom : -1px;\r\n\tbackground-position : 100% -150px;\r\n}\r\n\r\n/* bottom tabs */\r\n\r\n.dojoTabLabels-bottom {\r\n\tposition : relative;\r\n\tbottom : 0px;\r\n\tleft : 0px;\r\n\toverflow : visible;\r\n\tmargin-top : -1px;\r\n\twidth : 100%;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabNoLayout.dojoTabLabels-bottom {\r\n\tposition : relative;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab {\r\n\tborder-top :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tbackground : url(images/tab_bot_left.gif) no-repeat left bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab div {\r\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab.current {\r\n\tborder-top : 0;\r\n\tbackground : url(images/tab_bot_left_curr.gif) no-repeat left bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab.current div {\r\n\tpadding-top : 4px;\r\n\tbackground : url(images/tab_bot_right_curr.gif) no-repeat right bottom;\r\n}\r\n\r\n/* right-h tabs */\r\n\r\n.dojoTabLabels-right-h {\r\n\toverflow : visible;\r\n\tmargin-left : -1px;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab {\r\n\tpadding-left : 0;\r\n\tborder-left :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\r\n\tfloat : none;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab div {\r\n\tpadding : 4px 15px 4px 15px;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab.current {\r\n\tborder-left :  0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n}\r\n\r\n/* left-h tabs */\r\n\r\n.dojoTabLabels-left-h {\r\n\toverflow : visible;\r\n\tmargin-right : -1px;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab {\r\n\tborder-right :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tfloat : none;\r\n\tbackground : url(images/tab_top_left.gif) no-repeat left top;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab.current {\r\n\tborder-right : 0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n\tpadding-bottom : 0;\r\n\tbackground : url(images/tab_top_left.gif) no-repeat 0 -150px;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab div {\r\n\tbackground : 0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/TabContainer.css"),selectedTab:"",postMixInProperties:function(){
if(this.selectedTab){
dojo.deprecated("selectedTab deprecated, use selectedChild instead, will be removed in","0.5");
this.selectedChild=this.selectedTab;
}
if(this.closeButton!="none"){
dojo.deprecated("closeButton deprecated, use closable='true' on each child instead, will be removed in","0.5");
}
dojo.widget.TabContainer.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
this.tablist=dojo.widget.createWidget("TabController",{id:this.widgetId+"_tablist",labelPosition:this.labelPosition,doLayout:this.doLayout,containerId:this.widgetId},this.tablistNode);
dojo.widget.TabContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
dojo.widget.TabContainer.superclass.postCreate.apply(this,arguments);
this.onResized();
},_setupChild:function(tab){
if(this.closeButton=="tab"||this.closeButton=="pane"){
tab.closable=true;
}
dojo.html.addClass(tab.domNode,"dojoTabPane");
dojo.widget.TabContainer.superclass._setupChild.apply(this,arguments);
},onResized:function(){
if(!this.doLayout){
return;
}
var _a26=this.labelPosition.replace(/-h/,"");
var _a27=[{domNode:this.tablist.domNode,layoutAlign:_a26},{domNode:this.containerNode,layoutAlign:"client"}];
dojo.widget.html.layout(this.domNode,_a27);
if(this.selectedChildWidget){
var _a28=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_a28.width,_a28.height);
}
},selectTab:function(tab,_a2a){
dojo.deprecated("use selectChild() rather than selectTab(), selectTab() will be removed in","0.5");
this.selectChild(tab,_a2a);
},onKey:function(e){
if(e.keyCode==e.KEY_UP_ARROW&&e.ctrlKey){
var _a2c=this.correspondingTabButton||this.selectedTabWidget.tabButton;
_a2c.focus();
dojo.event.browser.stopEvent(e);
}else{
if(e.keyCode==e.KEY_DELETE&&e.altKey){
if(this.selectedChildWidget.closable){
this.closeChild(this.selectedChildWidget);
dojo.event.browser.stopEvent(e);
}
}
}
},destroy:function(){
this.tablist.destroy();
dojo.widget.TabContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabController",dojo.widget.PageController,{templateString:"<div wairole='tablist' dojoAttachEvent='onKey'></div>",labelPosition:"top",doLayout:true,"class":"",buttonWidget:"TabButton",postMixInProperties:function(){
if(!this["class"]){
this["class"]="dojoTabLabels-"+this.labelPosition+(this.doLayout?"":" dojoTabNoLayout");
}
dojo.widget.TabController.superclass.postMixInProperties.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.TabButton",dojo.widget.PageButton,{templateString:"<div class='dojoTab' dojoAttachEvent='onClick'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<span dojoAttachPoint='closeButtonNode' class='close closeImage' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onMouseOver:onCloseButtonMouseOver; onMouseOut:onCloseButtonMouseOut; onClick:onCloseButtonClick'></span>"+"</div>"+"</div>",postMixInProperties:function(){
this.closeButtonStyle=this.closeButton?"":"display: none";
dojo.widget.TabButton.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.titleNode);
dojo.widget.TabButton.superclass.fillInTemplate.apply(this,arguments);
},onCloseButtonClick:function(evt){
evt.stopPropagation();
dojo.widget.TabButton.superclass.onCloseButtonClick.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.a11y.TabButton",dojo.widget.TabButton,{imgPath:dojo.uri.dojoUri("src/widget/templates/images/tab_close.gif"),templateString:"<div class='dojoTab' dojoAttachEvent='onClick;onKey'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<img class='close' src='${this.imgPath}' alt='[x]' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onClick:onCloseButtonClick'>"+"</div>"+"</div>"});
dojo.provide("dojo.widget.TreeWithNode");
dojo.declare("dojo.widget.TreeWithNode",null,function(){
},{loadStates:{UNCHECKED:"UNCHECKED",LOADING:"LOADING",LOADED:"LOADED"},state:"UNCHECKED",objectId:"",isContainer:true,lockLevel:0,lock:function(){
this.lockLevel++;
},unlock:function(){
if(!this.lockLevel){
dojo.raise(this.widgetType+" unlock: not locked");
}
this.lockLevel--;
},expandLevel:0,loadLevel:0,hasLock:function(){
return this.lockLevel>0;
},isLocked:function(){
var node=this;
while(true){
if(node.lockLevel){
return true;
}
if(!node.parent||node.isTree){
break;
}
node=node.parent;
}
return false;
},flushLock:function(){
this.lockLevel=0;
},actionIsDisabled:function(_a2f){
var _a30=false;
if(dojo.lang.inArray(this.actionsDisabled,_a2f)){
_a30=true;
}
if(this.isTreeNode){
if(!this.tree.allowAddChildToLeaf&&_a2f==this.actions.ADDCHILD&&!this.isFolder){
_a30=true;
}
}
return _a30;
},actionIsDisabledNow:function(_a31){
return this.actionIsDisabled(_a31)||this.isLocked();
},setChildren:function(_a32){
if(this.isTreeNode&&!this.isFolder){
this.setFolder();
}else{
if(this.isTreeNode){
this.state=this.loadStates.LOADED;
}
}
var _a33=this.children.length>0;
if(_a33&&_a32){
this.destroyChildren();
}
if(_a32){
this.children=_a32;
}
var _a34=this.children.length>0;
if(this.isTreeNode&&_a34!=_a33){
this.viewSetHasChildren();
}
for(var i=0;i<this.children.length;i++){
var _a36=this.children[i];
if(!(_a36 instanceof dojo.widget.Widget)){
_a36=this.children[i]=this.tree.createNode(_a36);
var _a37=true;
}else{
var _a37=false;
}
if(!_a36.parent){
_a36.parent=this;
if(this.tree!==_a36.tree){
_a36.updateTree(this.tree);
}
_a36.viewAddLayout();
this.containerNode.appendChild(_a36.domNode);
var _a38={child:_a36,index:i,parent:this,childWidgetCreated:_a37};
delete dojo.widget.manager.topWidgets[_a36.widgetId];
dojo.event.topic.publish(this.tree.eventNames.afterAddChild,_a38);
}
if(this.tree.eagerWidgetInstantiation){
dojo.lang.forEach(this.children,function(_a39){
_a39.setChildren();
});
}
}
},doAddChild:function(_a3a,_a3b){
return this.addChild(_a3a,_a3b,true);
},addChild:function(_a3c,_a3d,_a3e){
if(dojo.lang.isUndefined(_a3d)){
_a3d=this.children.length;
}
if(!_a3c.isTreeNode){
dojo.raise("You can only add TreeNode widgets to a "+this.widgetType+" widget!");
return;
}
this.children.splice(_a3d,0,_a3c);
_a3c.parent=this;
_a3c.addedTo(this,_a3d,_a3e);
delete dojo.widget.manager.topWidgets[_a3c.widgetId];
},onShow:function(){
this.animationInProgress=false;
},onHide:function(){
this.animationInProgress=false;
}});
dojo.provide("dojo.widget.TreeNodeV3");
dojo.widget.defineWidget("dojo.widget.TreeNodeV3",[dojo.widget.HtmlWidget,dojo.widget.TreeWithNode],function(){
this.actionsDisabled=[];
this.object={};
},{tryLazyInit:true,actions:{MOVE:"MOVE",DETACH:"DETACH",EDIT:"EDIT",ADDCHILD:"ADDCHILD",SELECT:"SELECT"},labelClass:"",contentClass:"",expandNode:null,labelNode:null,nodeDocType:"",selected:false,getnodeDocType:function(){
return this.nodeDocType;
},cloneProperties:["actionsDisabled","tryLazyInit","nodeDocType","objectId","object","title","isFolder","isExpanded","state"],clone:function(deep){
var ret=new this.constructor();
for(var i=0;i<this.cloneProperties.length;i++){
var prop=this.cloneProperties[i];
ret[prop]=dojo.lang.shallowCopy(this[prop],true);
}
if(this.tree.unsetFolderOnEmpty&&!deep&&this.isFolder){
ret.isFolder=false;
}
ret.toggleObj=this.toggleObj;
dojo.widget.manager.add(ret);
ret.tree=this.tree;
ret.buildRendering({},{});
ret.initialize({},{});
if(deep&&this.children.length){
for(var i=0;i<this.children.length;i++){
var _a43=this.children[i];
if(_a43.clone){
ret.children.push(_a43.clone(deep));
}else{
ret.children.push(dojo.lang.shallowCopy(_a43,deep));
}
}
ret.setChildren();
}
return ret;
},markProcessing:function(){
this.markProcessingSavedClass=dojo.html.getClass(this.expandNode);
dojo.html.setClass(this.expandNode,this.tree.classPrefix+"ExpandLoading");
},unmarkProcessing:function(){
dojo.html.setClass(this.expandNode,this.markProcessingSavedClass);
},buildRendering:function(args,_a45,_a46){
if(args.tree){
this.tree=dojo.lang.isString(args.tree)?dojo.widget.manager.getWidgetById(args.tree):args.tree;
}else{
if(_a46&&_a46.tree){
this.tree=_a46.tree;
}
}
if(!this.tree){
dojo.raise("Can't evaluate tree from arguments or parent");
}
this.domNode=this.tree.nodeTemplate.cloneNode(true);
this.expandNode=this.domNode.firstChild;
this.contentNode=this.domNode.childNodes[1];
this.labelNode=this.contentNode.firstChild;
if(this.labelClass){
dojo.html.addClass(this.labelNode,this.labelClass);
}
if(this.contentClass){
dojo.html.addClass(this.contentNode,this.contentClass);
}
this.domNode.widgetId=this.widgetId;
this.labelNode.innerHTML=this.title;
},isTreeNode:true,object:{},title:"",isFolder:null,contentNode:null,expandClass:"",isExpanded:false,containerNode:null,getInfo:function(){
var info={widgetId:this.widgetId,objectId:this.objectId,index:this.getParentIndex()};
return info;
},setFolder:function(){
this.isFolder=true;
this.viewSetExpand();
if(!this.containerNode){
this.viewAddContainer();
}
dojo.event.topic.publish(this.tree.eventNames.afterSetFolder,{source:this});
},initialize:function(args,frag,_a4a){
if(args.isFolder){
this.isFolder=true;
}
if(this.children.length||this.isFolder){
this.setFolder();
}else{
this.viewSetExpand();
}
for(var i=0;i<this.actionsDisabled.length;i++){
this.actionsDisabled[i]=this.actionsDisabled[i].toUpperCase();
}
dojo.event.topic.publish(this.tree.eventNames.afterChangeTree,{oldTree:null,newTree:this.tree,node:this});
},unsetFolder:function(){
this.isFolder=false;
this.viewSetExpand();
dojo.event.topic.publish(this.tree.eventNames.afterUnsetFolder,{source:this});
},insertNode:function(_a4c,_a4d){
if(!_a4d){
_a4d=0;
}
if(_a4d==0){
dojo.html.prependChild(this.domNode,_a4c.containerNode);
}else{
dojo.html.insertAfter(this.domNode,_a4c.children[_a4d-1].domNode);
}
},updateTree:function(_a4e){
if(this.tree===_a4e){
return;
}
var _a4f=this.tree;
dojo.lang.forEach(this.getDescendants(),function(elem){
elem.tree=_a4e;
});
if(_a4f.classPrefix!=_a4e.classPrefix){
var _a51=[this.domNode];
var elem;
var reg=new RegExp("(^|\\s)"+_a4f.classPrefix,"g");
while(elem=_a51.pop()){
for(var i=0;i<elem.childNodes.length;i++){
var _a55=elem.childNodes[i];
if(_a55.nodeDocType!=1){
continue;
}
dojo.html.setClass(_a55,dojo.html.getClass(_a55).replace(reg,"$1"+_a4e.classPrefix));
_a51.push(_a55);
}
}
}
var _a56={oldTree:_a4f,newTree:_a4e,node:this};
dojo.event.topic.publish(this.tree.eventNames.afterChangeTree,_a56);
dojo.event.topic.publish(_a4e.eventNames.afterChangeTree,_a56);
},addedTo:function(_a57,_a58,_a59){
if(this.tree!==_a57.tree){
this.updateTree(_a57.tree);
}
if(_a57.isTreeNode){
if(!_a57.isFolder){
_a57.setFolder();
_a57.state=_a57.loadStates.LOADED;
}
}
var _a5a=_a57.children.length;
this.insertNode(_a57,_a58);
this.viewAddLayout();
if(_a5a>1){
if(_a58==0&&_a57.children[1] instanceof dojo.widget.Widget){
_a57.children[1].viewUpdateLayout();
}
if(_a58==_a5a-1&&_a57.children[_a5a-2] instanceof dojo.widget.Widget){
_a57.children[_a5a-2].viewUpdateLayout();
}
}else{
if(_a57.isTreeNode){
_a57.viewSetHasChildren();
}
}
if(!_a59){
var _a5b={child:this,index:_a58,parent:_a57};
dojo.event.topic.publish(this.tree.eventNames.afterAddChild,_a5b);
}
},createSimple:function(args,_a5d){
if(args.tree){
var tree=args.tree;
}else{
if(_a5d){
var tree=_a5d.tree;
}else{
dojo.raise("createSimple: can't evaluate tree");
}
}
tree=dojo.widget.byId(tree);
var _a5f=new tree.defaultChildWidget();
for(var x in args){
_a5f[x]=args[x];
}
_a5f.toggleObj=dojo.lfx.toggle[_a5f.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
dojo.widget.manager.add(_a5f);
_a5f.buildRendering(args,{},_a5d);
_a5f.initialize(args,{},_a5d);
if(_a5f.parent){
delete dojo.widget.manager.topWidgets[_a5f.widgetId];
}
return _a5f;
},viewUpdateLayout:function(){
this.viewRemoveLayout();
this.viewAddLayout();
},viewAddContainer:function(){
this.containerNode=this.tree.containerNodeTemplate.cloneNode(true);
this.domNode.appendChild(this.containerNode);
},viewAddLayout:function(){
if(this.parent["isTree"]){
dojo.html.setClass(this.domNode,dojo.html.getClass(this.domNode)+" "+this.tree.classPrefix+"IsRoot");
}
if(this.isLastChild()){
dojo.html.setClass(this.domNode,dojo.html.getClass(this.domNode)+" "+this.tree.classPrefix+"IsLast");
}
},viewRemoveLayout:function(){
dojo.html.removeClass(this.domNode,this.tree.classPrefix+"IsRoot");
dojo.html.removeClass(this.domNode,this.tree.classPrefix+"IsLast");
},viewGetExpandClass:function(){
if(this.isFolder){
return this.isExpanded?"ExpandOpen":"ExpandClosed";
}else{
return "ExpandLeaf";
}
},viewSetExpand:function(){
var _a61=this.tree.classPrefix+this.viewGetExpandClass();
var reg=new RegExp("(^|\\s)"+this.tree.classPrefix+"Expand\\w+","g");
dojo.html.setClass(this.domNode,dojo.html.getClass(this.domNode).replace(reg,"")+" "+_a61);
this.viewSetHasChildrenAndExpand();
},viewGetChildrenClass:function(){
return "Children"+(this.children.length?"Yes":"No");
},viewSetHasChildren:function(){
var _a63=this.tree.classPrefix+this.viewGetChildrenClass();
var reg=new RegExp("(^|\\s)"+this.tree.classPrefix+"Children\\w+","g");
dojo.html.setClass(this.domNode,dojo.html.getClass(this.domNode).replace(reg,"")+" "+_a63);
this.viewSetHasChildrenAndExpand();
},viewSetHasChildrenAndExpand:function(){
var _a65=this.tree.classPrefix+"State"+this.viewGetChildrenClass()+"-"+this.viewGetExpandClass();
var reg=new RegExp("(^|\\s)"+this.tree.classPrefix+"State[\\w-]+","g");
dojo.html.setClass(this.domNode,dojo.html.getClass(this.domNode).replace(reg,"")+" "+_a65);
},viewUnfocus:function(){
dojo.html.removeClass(this.labelNode,this.tree.classPrefix+"LabelFocused");
},viewFocus:function(){
dojo.html.addClass(this.labelNode,this.tree.classPrefix+"LabelFocused");
},viewEmphasize:function(){
dojo.html.clearSelection(this.labelNode);
dojo.html.addClass(this.labelNode,this.tree.classPrefix+"NodeEmphasized");
},viewUnemphasize:function(){
dojo.html.removeClass(this.labelNode,this.tree.classPrefix+"NodeEmphasized");
},detach:function(){
if(!this.parent){
return;
}
var _a67=this.parent;
var _a68=this.getParentIndex();
this.doDetach.apply(this,arguments);
dojo.event.topic.publish(this.tree.eventNames.afterDetach,{child:this,parent:_a67,index:_a68});
},doDetach:function(){
var _a69=this.parent;
if(!_a69){
return;
}
var _a6a=this.getParentIndex();
this.viewRemoveLayout();
dojo.widget.DomWidget.prototype.removeChild.call(_a69,this);
var _a6b=_a69.children.length;
if(_a6b>0){
if(_a6a==0){
_a69.children[0].viewUpdateLayout();
}
if(_a6a==_a6b){
_a69.children[_a6b-1].viewUpdateLayout();
}
}else{
if(_a69.isTreeNode){
_a69.viewSetHasChildren();
}
}
if(this.tree.unsetFolderOnEmpty&&!_a69.children.length&&_a69.isTreeNode){
_a69.unsetFolder();
}
this.parent=null;
},destroy:function(){
dojo.event.topic.publish(this.tree.eventNames.beforeNodeDestroy,{source:this});
this.detach();
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},expand:function(){
if(this.isExpanded){
return;
}
if(this.tryLazyInit){
this.setChildren();
this.tryLazyInit=false;
}
this.isExpanded=true;
this.viewSetExpand();
this.showChildren();
},collapse:function(){
if(!this.isExpanded){
return;
}
this.isExpanded=false;
this.hideChildren();
},hideChildren:function(){
this.tree.toggleObj.hide(this.containerNode,this.tree.toggleDuration,this.explodeSrc,dojo.lang.hitch(this,"onHideChildren"));
},showChildren:function(){
this.tree.toggleObj.show(this.containerNode,this.tree.toggleDuration,this.explodeSrc,dojo.lang.hitch(this,"onShowChildren"));
},onShowChildren:function(){
this.onShow();
dojo.event.topic.publish(this.tree.eventNames.afterExpand,{source:this});
},onHideChildren:function(){
this.viewSetExpand();
this.onHide();
dojo.event.topic.publish(this.tree.eventNames.afterCollapse,{source:this});
},setTitle:function(_a6c){
var _a6d=this.title;
this.labelNode.innerHTML=this.title=_a6c;
dojo.event.topic.publish(this.tree.eventNames.afterSetTitle,{source:this,oldTitle:_a6d});
},toString:function(){
return "["+this.widgetType+", "+this.title+"]";
}});
dojo.provide("dojo.widget.TreeV3");
dojo.widget.defineWidget("dojo.widget.TreeV3",[dojo.widget.HtmlWidget,dojo.widget.TreeWithNode],function(){
this.eventNames={};
this.DndAcceptTypes=[];
this.actionsDisabled=[];
this.listeners=[];
this.tree=this;
},{DndMode:"",defaultChildWidget:null,defaultChildTitle:"New Node",eagerWidgetInstantiation:false,eventNamesDefault:{afterTreeCreate:"afterTreeCreate",beforeTreeDestroy:"beforeTreeDestroy",beforeNodeDestroy:"beforeNodeDestroy",afterChangeTree:"afterChangeTree",afterSetFolder:"afterSetFolder",afterUnsetFolder:"afterUnsetFolder",beforeMoveFrom:"beforeMoveFrom",beforeMoveTo:"beforeMoveTo",afterMoveFrom:"afterMoveFrom",afterMoveTo:"afterMoveTo",afterAddChild:"afterAddChild",afterDetach:"afterDetach",afterExpand:"afterExpand",beforeExpand:"beforeExpand",afterSetTitle:"afterSetTitle",afterCollapse:"afterCollapse",beforeCollapse:"beforeCollapse"},classPrefix:"Tree",style:"",allowAddChildToLeaf:true,unsetFolderOnEmpty:true,DndModes:{BETWEEN:1,ONTO:2},DndAcceptTypes:"",templateCssString:"/* indent for all tree children excepts root */\r\n.TreeNode {\r\n    background-image : url('../templates/images/TreeV3/i.gif');\r\n    background-position : top left;\r\n    background-repeat : repeat-y;\r\n    margin-left: 19px;\r\n    zoom: 1;\r\n}\r\n.TreeIsRoot {\r\n    margin-left: 0;\r\n}\r\n \r\n/* left vertical line (grid) for all nodes */\r\n.TreeIsLast {\r\n    background-image: url('../templates/images/TreeV3/i_half.gif');\r\n    background-repeat : no-repeat;\r\n}\r\n \r\n.TreeExpandOpen .TreeExpand {\r\n    background-image: url('../templates/images/TreeV3/expand_minus.gif');\r\n}\r\n \r\n/* closed is higher priority than open */\r\n.TreeExpandClosed .TreeExpand {\r\n    background-image: url('../templates/images/TreeV3/expand_plus.gif');\r\n}\r\n \r\n/* highest priority */\r\n.TreeExpandLeaf .TreeExpand {\r\n    background-image: url('../templates/images/TreeV3/expand_leaf.gif');\r\n}\r\n\r\n/* \r\nshould always override any expand setting, but do not touch children.\r\nif I add .TreeExpand .TreeExpandLoading same time and put it to top/bottom, then it will take precedence over +- for all descendants or always fail\r\nso I have to remove TreeExpand and process this one specifically\r\n*/\r\n\r\n.TreeExpandLoading   {\r\n    width: 18px;\r\n    height: 18px;\r\n    float: left;\r\n    display: inline;\r\n    background-repeat : no-repeat;\r\n    background-image: url('../templates/images/TreeV3/expand_loading.gif');\r\n}\r\n \r\n.TreeContent {\r\n    min-height: 18px;\r\n    min-width: 18px;\r\n    margin-left:18px;\r\n    cursor: default;\r\n    /* can't make inline - multiline bugs */\r\n}\r\n\r\n.TreeIEContent {\r\n\theight: 18px;\r\n}\r\n \r\n.TreeExpand {\r\n    width: 18px;\r\n    height: 18px;\r\n    float: left;\r\n    display: inline;\r\n    background-repeat : no-repeat;\r\n}\r\n \r\n/* same style as IE selection */\r\n.TreeNodeEmphasized {\r\n    background-color: Highlight;\r\n    color: HighlightText;\r\n}\r\n \r\n.TreeContent .RichTextEditable, .TreeContent .RichTextEditable iframe {\r\n      background-color: #ffc;\r\n      color: black;\r\n}\r\n\r\n/* don't use :focus due to opera's lack of support on div's */\r\n.TreeLabelFocused {\r\n      outline: 1px invert dotted;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/TreeV3.css"),templateString:"<div style=\"${this.style}\">\n</div>",isExpanded:true,isTree:true,createNode:function(data){
data.tree=this.widgetId;
if(data.widgetName){
return dojo.widget.createWidget(data.widgetName,data);
}else{
if(this.defaultChildWidget.prototype.createSimple){
return this.defaultChildWidget.prototype.createSimple(data);
}else{
var ns=this.defaultChildWidget.prototype.ns;
var wt=this.defaultChildWidget.prototype.widgetType;
return dojo.widget.createWidget(ns+":"+wt,data);
}
}
},makeNodeTemplate:function(){
var _a71=document.createElement("div");
dojo.html.setClass(_a71,this.classPrefix+"Node "+this.classPrefix+"ExpandLeaf "+this.classPrefix+"ChildrenNo");
this.nodeTemplate=_a71;
var _a72=document.createElement("div");
var _a73=this.classPrefix+"Expand";
if(dojo.render.html.ie){
_a73=_a73+" "+this.classPrefix+"IEExpand";
}
dojo.html.setClass(_a72,_a73);
this.expandNodeTemplate=_a72;
var _a74=document.createElement("span");
dojo.html.setClass(_a74,this.classPrefix+"Label");
this.labelNodeTemplate=_a74;
var _a75=document.createElement("div");
var _a73=this.classPrefix+"Content";
if(dojo.render.html.ie && !dojo.render.html.ie70 && !dojo.render.html.ie80 && !dojo.render.html.ie90){
_a73=_a73+" "+this.classPrefix+"IEContent";
}
dojo.html.setClass(_a75,_a73);
this.contentNodeTemplate=_a75;
_a71.appendChild(_a72);
_a71.appendChild(_a75);
_a75.appendChild(_a74);
},makeContainerNodeTemplate:function(){
var div=document.createElement("div");
div.style.display="none";
dojo.html.setClass(div,this.classPrefix+"Container");
this.containerNodeTemplate=div;
},actions:{ADDCHILD:"ADDCHILD"},getInfo:function(){
var info={widgetId:this.widgetId,objectId:this.objectId};
return info;
},adjustEventNames:function(){
for(var name in this.eventNamesDefault){
if(dojo.lang.isUndefined(this.eventNames[name])){
this.eventNames[name]=this.widgetId+"/"+this.eventNamesDefault[name];
}
}
},adjustDndMode:function(){
var _a79=this;
var _a7a=0;
dojo.lang.forEach(this.DndMode.split(";"),function(elem){
var mode=_a79.DndModes[dojo.string.trim(elem).toUpperCase()];
if(mode){
_a7a=_a7a|mode;
}
});
this.DndMode=_a7a;
},destroy:function(){
dojo.event.topic.publish(this.tree.eventNames.beforeTreeDestroy,{source:this});
return dojo.widget.HtmlWidget.prototype.destroy.apply(this,arguments);
},initialize:function(args){
this.domNode.widgetId=this.widgetId;
for(var i=0;i<this.actionsDisabled.length;i++){
this.actionsDisabled[i]=this.actionsDisabled[i].toUpperCase();
}
if(!args.defaultChildWidget){
this.defaultChildWidget=dojo.widget.TreeNodeV3;
}else{
this.defaultChildWidget=dojo.lang.getObjPathValue(args.defaultChildWidget);
}
this.adjustEventNames();
this.adjustDndMode();
this.makeNodeTemplate();
this.makeContainerNodeTemplate();
this.containerNode=this.domNode;
dojo.html.setClass(this.domNode,this.classPrefix+"Container");
var _a7f=this;
dojo.lang.forEach(this.listeners,function(elem){
var t=dojo.lang.isString(elem)?dojo.widget.byId(elem):elem;
t.listenTree(_a7f);
});
},postCreate:function(){
dojo.event.topic.publish(this.eventNames.afterTreeCreate,{source:this});
},move:function(_a82,_a83,_a84){
if(!_a82.parent){
dojo.raise(this.widgetType+": child can be moved only while it's attached");
}
var _a85=_a82.parent;
var _a86=_a82.tree;
var _a87=_a82.getParentIndex();
var _a88=_a83.tree;
var _a83=_a83;
var _a89=_a84;
var _a8a={oldParent:_a85,oldTree:_a86,oldIndex:_a87,newParent:_a83,newTree:_a88,newIndex:_a89,child:_a82};
dojo.event.topic.publish(_a86.eventNames.beforeMoveFrom,_a8a);
dojo.event.topic.publish(_a88.eventNames.beforeMoveTo,_a8a);
this.doMove.apply(this,arguments);
dojo.event.topic.publish(_a86.eventNames.afterMoveFrom,_a8a);
dojo.event.topic.publish(_a88.eventNames.afterMoveTo,_a8a);
},doMove:function(_a8b,_a8c,_a8d){
_a8b.doDetach();
_a8c.doAddChild(_a8b,_a8d);
},toString:function(){
return "["+this.widgetType+" ID:"+this.widgetId+"]";
}});
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_a8e){
this.pairs=[];
this.returnWrappers=_a8e||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_a90,wrap,_a92,_a93){
var type=(_a93)?"unshift":"push";
this.pairs[type]([name,_a90,wrap,_a92]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_a9b,wrap,_a9d){
dojo.json.jsonRegistry.register(name,_a9b,wrap,_a9d);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _aa0=typeof (o);
if(_aa0=="undefined"){
return "undefined";
}else{
if((_aa0=="number")||(_aa0=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_aa0=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _aa2;
if(typeof (o.__json__)=="function"){
_aa2=o.__json__();
if(o!==_aa2){
return me(_aa2);
}
}
if(typeof (o.json)=="function"){
_aa2=o.json();
if(o!==_aa2){
return me(_aa2);
}
}
if(_aa0!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_aa2=dojo.json.jsonRegistry.match(o);
return me(_aa2);
}
catch(e){
}
if(_aa0=="function"){
return null;
}
res=[];
for(var k in o){
var _aa7;
if(typeof (k)=="number"){
_aa7="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_aa7=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_aa7+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("dojo.widget.TreeCommon");
dojo.declare("dojo.widget.TreeCommon",null,{listenTreeEvents:[],listenedTrees:{},listenNodeFilter:null,listenTree:function(tree){
var _aa9=this;
if(this.listenedTrees[tree.widgetId]){
return;
}
dojo.lang.forEach(this.listenTreeEvents,function(_aaa){
var _aab="on"+_aaa.charAt(0).toUpperCase()+_aaa.substr(1);
dojo.event.topic.subscribe(tree.eventNames[_aaa],_aa9,_aab);
});
var _aac;
if(this.listenNodeFilter){
this.processDescendants(tree,this.listenNodeFilter,this.listenNode,true);
}
this.listenedTrees[tree.widgetId]=true;
},listenNode:function(){
},unlistenNode:function(){
},unlistenTree:function(tree,_aae){
var _aaf=this;
if(!this.listenedTrees[tree.widgetId]){
return;
}
dojo.lang.forEach(this.listenTreeEvents,function(_ab0){
var _ab1="on"+_ab0.charAt(0).toUpperCase()+_ab0.substr(1);
dojo.event.topic.unsubscribe(tree.eventNames[_ab0],_aaf,_ab1);
});
if(this.listenNodeFilter){
this.processDescendants(tree,this.listenNodeFilter,this.unlistenNode,true);
}
delete this.listenedTrees[tree.widgetId];
},checkPathCondition:function(_ab2,_ab3){
while(_ab2&&!_ab2.widgetId){
if(_ab3.call(null,_ab2)){
return true;
}
_ab2=_ab2.parentNode;
}
return false;
},domElement2TreeNode:function(_ab4){
while(_ab4&&!_ab4.widgetId){
_ab4=_ab4.parentNode;
}
if(!_ab4){
return null;
}
var _ab5=dojo.widget.byId(_ab4.widgetId);
if(!_ab5.isTreeNode){
return null;
}
return _ab5;
},processDescendants:function(elem,_ab7,func,_ab9){
var _aba=this;
if(!_ab9){
if(!_ab7.call(_aba,elem)){
return;
}
func.call(_aba,elem);
}
var _abb=[elem];
while(elem=_abb.pop()){
dojo.lang.forEach(elem.children,function(elem){
if(_ab7.call(_aba,elem)){
func.call(_aba,elem);
_abb.push(elem);
}
});
}
}});
dojo.provide("dojo.widget.TreeTimeoutIterator");
dojo.declare("dojo.widget.TreeTimeoutIterator",null,function(elem,_abe,_abf){
var _ac0=this;
this.currentParent=elem;
this.callFunc=_abe;
this.callObj=_abf?_abf:this;
this.stack=[];
},{maxStackDepth:Number.POSITIVE_INFINITY,stack:null,currentParent:null,currentIndex:0,filterFunc:function(){
return true;
},finishFunc:function(){
return true;
},setFilter:function(func,obj){
this.filterFunc=func;
this.filterObj=obj;
},setMaxLevel:function(_ac3){
this.maxStackDepth=_ac3-2;
},forward:function(_ac4){
var _ac5=this;
if(this.timeout){
var tid=setTimeout(function(){
_ac5.processNext();
clearTimeout(tid);
},_ac5.timeout);
}else{
return this.processNext();
}
},start:function(_ac7){
if(_ac7){
return this.callFunc.call(this.callObj,this.currentParent,this);
}
return this.processNext();
},processNext:function(){
var _ac8;
var _ac9=this;
var _aca;
var next;
if(this.maxStackDepth==-2){
return;
}
while(true){
var _acc=this.currentParent.children;
if(_acc&&_acc.length){
do{
next=_acc[this.currentIndex];
}while(this.currentIndex++<_acc.length&&!(_aca=this.filterFunc.call(this.filterObj,next)));
if(_aca){
if(next.isFolder&&this.stack.length<=this.maxStackDepth){
this.moveParent(next,0);
}
return this.callFunc.call(this.callObj,next,this);
}
}
if(this.stack.length){
this.popParent();
continue;
}
break;
}
return this.finishFunc.call(this.finishObj);
},setFinish:function(func,obj){
this.finishFunc=func;
this.finishObj=obj;
},popParent:function(){
var p=this.stack.pop();
this.currentParent=p[0];
this.currentIndex=p[1];
},moveParent:function(_ad0,_ad1){
this.stack.push([this.currentParent,this.currentIndex]);
this.currentParent=_ad0;
this.currentIndex=_ad1;
}});
dojo.provide("dojo.widget.TreeBasicControllerV3");
dojo.widget.defineWidget("dojo.widget.TreeBasicControllerV3",[dojo.widget.HtmlWidget,dojo.widget.TreeCommon],function(){
this.listenedTrees={};
},{listenTreeEvents:["afterSetFolder","afterTreeCreate","beforeTreeDestroy"],listenNodeFilter:function(elem){
return elem instanceof dojo.widget.Widget;
},editor:null,initialize:function(args){
if(args.editor){
this.editor=dojo.widget.byId(args.editor);
this.editor.controller=this;
}
},getInfo:function(elem){
return elem.getInfo();
},onBeforeTreeDestroy:function(_ad5){
this.unlistenTree(_ad5.source);
},onAfterSetFolder:function(_ad6){
if(_ad6.source.expandLevel>0){
this.expandToLevel(_ad6.source,_ad6.source.expandLevel);
}
if(_ad6.source.loadLevel>0){
this.loadToLevel(_ad6.source,_ad6.source.loadLevel);
}
},_focusNextVisible:function(_ad7){
if(_ad7.isFolder&&_ad7.isExpanded&&_ad7.children.length>0){
_ad8=_ad7.children[0];
}else{
while(_ad7.isTreeNode&&_ad7.isLastChild()){
_ad7=_ad7.parent;
}
if(_ad7.isTreeNode){
var _ad8=_ad7.parent.children[_ad7.getParentIndex()+1];
}
}
if(_ad8&&_ad8.isTreeNode){
this._focusLabel(_ad8);
return _ad8;
}
},_focusPreviousVisible:function(_ad9){
var _ada=_ad9;
if(!_ad9.isFirstChild()){
var _adb=_ad9.parent.children[_ad9.getParentIndex()-1];
_ad9=_adb;
while(_ad9.isFolder&&_ad9.isExpanded&&_ad9.children.length>0){
_ada=_ad9;
_ad9=_ad9.children[_ad9.children.length-1];
}
}else{
_ad9=_ad9.parent;
}
if(_ad9&&_ad9.isTreeNode){
_ada=_ad9;
}
if(_ada&&_ada.isTreeNode){
this._focusLabel(_ada);
return _ada;
}
},_focusZoomIn:function(_adc){
var _add=_adc;
if(_adc.isFolder&&!_adc.isExpanded){
this.expand(_adc);
}else{
if(_adc.children.length>0){
_adc=_adc.children[0];
}
}
if(_adc&&_adc.isTreeNode){
_add=_adc;
}
if(_add&&_add.isTreeNode){
this._focusLabel(_add);
return _add;
}
},_focusZoomOut:function(node){
var _adf=node;
if(node.isFolder&&node.isExpanded){
this.collapse(node);
}else{
node=node.parent;
}
if(node&&node.isTreeNode){
_adf=node;
}
if(_adf&&_adf.isTreeNode){
this._focusLabel(_adf);
return _adf;
}
},onFocusNode:function(e){
var node=this.domElement2TreeNode(e.target);
if(node){
node.viewFocus();
dojo.event.browser.stopEvent(e);
}
},onBlurNode:function(e){
var node=this.domElement2TreeNode(e.target);
if(!node){
return;
}
var _ae4=node.labelNode;
_ae4.setAttribute("tabIndex","-1");
node.viewUnfocus();
dojo.event.browser.stopEvent(e);
node.tree.domNode.setAttribute("tabIndex","0");
},_focusLabel:function(node){
var _ae6=node.tree.lastFocused;
var _ae7;
if(_ae6&&_ae6.labelNode){
_ae7=_ae6.labelNode;
dojo.event.disconnect(_ae7,"onblur",this,"onBlurNode");
_ae7.setAttribute("tabIndex","-1");
dojo.html.removeClass(_ae7,"TreeLabelFocused");
}
_ae7=node.labelNode;
_ae7.setAttribute("tabIndex","0");
node.tree.lastFocused=node;
dojo.html.addClass(_ae7,"TreeLabelFocused");
dojo.event.connectOnce(_ae7,"onblur",this,"onBlurNode");
dojo.event.connectOnce(_ae7,"onfocus",this,"onFocusNode");
_ae7.focus();
},onKey:function(e){
if(!e.key||e.ctrkKey||e.altKey){
return;
}
var _ae9=this.domElement2TreeNode(e.target);
if(!_ae9){
return;
}
var _aea=_ae9.tree;
if(_aea.lastFocused&&_aea.lastFocused.labelNode){
_ae9=_aea.lastFocused;
}
switch(e.key){
case e.KEY_TAB:
if(e.shiftKey){
_aea.domNode.setAttribute("tabIndex","-1");
}
break;
case e.KEY_RIGHT_ARROW:
this._focusZoomIn(_ae9);
dojo.event.browser.stopEvent(e);
break;
case e.KEY_LEFT_ARROW:
this._focusZoomOut(_ae9);
dojo.event.browser.stopEvent(e);
break;
case e.KEY_UP_ARROW:
this._focusPreviousVisible(_ae9);
dojo.event.browser.stopEvent(e);
break;
case e.KEY_DOWN_ARROW:
this._focusNextVisible(_ae9);
dojo.event.browser.stopEvent(e);
break;
}
},onFocusTree:function(e){
if(!e.currentTarget){
return;
}
try{
var _aec=this.getWidgetByNode(e.currentTarget);
if(!_aec||!_aec.isTree){
return;
}
var _aed=this.getWidgetByNode(_aec.domNode.firstChild);
if(_aed&&_aed.isTreeNode){
if(_aec.lastFocused&&_aec.lastFocused.isTreeNode){
_aed=_aec.lastFocused;
}
this._focusLabel(_aed);
}
}
catch(e){
}
},onAfterTreeCreate:function(_aee){
var tree=_aee.source;
dojo.event.browser.addListener(tree.domNode,"onKey",dojo.lang.hitch(this,this.onKey));
dojo.event.browser.addListener(tree.domNode,"onmousedown",dojo.lang.hitch(this,this.onTreeMouseDown));
dojo.event.browser.addListener(tree.domNode,"onclick",dojo.lang.hitch(this,this.onTreeClick));
dojo.event.browser.addListener(tree.domNode,"onfocus",dojo.lang.hitch(this,this.onFocusTree));
tree.domNode.setAttribute("tabIndex","0");
if(tree.expandLevel){
this.expandToLevel(tree,tree.expandLevel);
}
if(tree.loadLevel){
this.loadToLevel(tree,tree.loadLevel);
}
},onTreeMouseDown:function(e){
},onTreeClick:function(e){
var _af2=e.target;
var node=this.domElement2TreeNode(_af2);
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
//alert(e.explicitOriginalTarget.nodeType);
if(is_chrome == true){
	if(e.target.nodeType == 1 && e.target.innerText != ''){
		//alert(_af2.nodeType);
		var parentUrl = e.target.baseURI;
		var index = parentUrl.indexOf("#");
		if(index > 0) {
			parentUrl = parentUrl.substring(0,index);
		}
		var nodetext = e.target.innerText;
		var childUrl = node.url;
		var fullUrl = parentUrl+"#"+childUrl;
		var NTPT_PGEXTRA="pageurl="+fullUrl;
		ibmStats.event({  'ibmEV': 'onclick' ,'ibmEvAction' : "\'" + parentUrl + "\'", 'ibmEvName' : "\'"+nodetext+"\'", 'ibmEvModule' : "\'"+fullUrl+"\'" });
	}
}else if(navigator.appName == 'Microsoft Internet Explorer'){
	var baseUrl = location.href;
	if(e.srcElement.nodeType == 1 && e.target.innerText != ''){
		//alert(_af2.nodeType);
		var parentUrl = baseUrl;
		var index = parentUrl.indexOf("#");
		if(index > 0) {
			parentUrl = parentUrl.substring(0,index);
		}
		var nodetext = e.target.innerText;
		var childUrl = node.url;
		var fullUrl = parentUrl+"#"+childUrl;
		var NTPT_PGEXTRA="pageurl="+fullUrl;
		ibmStats.event({  'ibmEV': 'onclick' ,'ibmEvAction' : "\'" + parentUrl + "\'", 'ibmEvName' : "\'"+nodetext+"\'", 'ibmEvModule' : "\'"+fullUrl+"\'" });
	}
}
else{
	if(e.explicitOriginalTarget.nodeType == 3){
		//alert(_af2.nodeType);
		var parentUrl = e.explicitOriginalTarget.baseURI;
		var index = parentUrl.indexOf("#");
		if(index > 0) {
			parentUrl = parentUrl.substring(0,index);
		}
		var nodetext = e.explicitOriginalTarget.wholeText;
		var childUrl = node.url;
		var fullUrl = parentUrl+"#"+childUrl;
		var NTPT_PGEXTRA="pageurl="+fullUrl;
		ibmStats.event({  'ibmEV': 'onclick' ,'ibmEvAction' : "\'" + parentUrl + "\'", 'ibmEvName' : "\'"+nodetext+"\'", 'ibmEvModule' : "\'"+fullUrl+"\'" });
		//ibmStats.event({'lc' : fullUrl});
	}
}
if(!node||!node.isTreeNode){
return;
}
var _af4=function(el){
return el===node.expandNode;
};
if(this.checkPathCondition(_af2,_af4)){
this.processExpandClick(node);
}
this._focusLabel(node);
},processExpandClick:function(node){
if(node.isExpanded){
this.collapse(node);
}else{
this.expand(node);
}
},batchExpandTimeout:20,expandAll:function(_af7){
return this.expandToLevel(_af7,Number.POSITIVE_INFINITY);
},collapseAll:function(_af8){
var _af9=this;
var _afa=function(elem){
return (elem instanceof dojo.widget.Widget)&&elem.isFolder&&elem.isExpanded;
};
if(_af8.isTreeNode){
this.processDescendants(_af8,_afa,this.collapse);
}else{
if(_af8.isTree){
dojo.lang.forEach(_af8.children,function(c){
_af9.processDescendants(c,_afa,_af9.collapse);
});
}
}
},expandToNode:function(node,_afe){
n=_afe?node:node.parent;
s=[];
while(!n.isExpanded){
s.push(n);
n=n.parent;
}
dojo.lang.forEach(s,function(n){
n.expand();
});
},expandToLevel:function(_b00,_b01){
var _b02=this;
var _b03=function(elem){
var res=elem.isFolder||elem.children&&elem.children.length;
return res;
};
var _b06=function(node,_b08){
_b02.expand(node,true);
_b08.forward();
};
var _b09=new dojo.widget.TreeTimeoutIterator(_b00,_b06,this);
_b09.setFilter(_b03);
_b09.timeout=this.batchExpandTimeout;
_b09.setMaxLevel(_b00.isTreeNode?_b01-1:_b01);
return _b09.start(_b00.isTreeNode);
},getWidgetByNode:function(node){
var _b0b;
var _b0c=node;
while(!(_b0b=_b0c.widgetId)){
_b0c=_b0c.parentNode;
if(_b0c==null){
break;
}
}
if(_b0b){
return dojo.widget.byId(_b0b);
}else{
if(node==null){
return null;
}else{
return dojo.widget.manager.byNode(node);
}
}
},expand:function(node){
if(node.isFolder){
node.expand();
}
},collapse:function(node){
if(node.isFolder){
node.collapse();
}
},canEditLabel:function(node){
if(node.actionIsDisabledNow(node.actions.EDIT)){
return false;
}
return true;
},editLabelStart:function(node){
if(!this.canEditLabel(node)){
return false;
}
if(!this.editor.isClosed()){
this.editLabelFinish(this.editor.saveOnBlur);
}
this.doEditLabelStart(node);
},editLabelFinish:function(save){
this.doEditLabelFinish(save);
},doEditLabelStart:function(node){
if(!this.editor){
dojo.raise(this.widgetType+": no editor specified");
}
this.editor.open(node);
},doEditLabelFinish:function(save,_b14){
if(!this.editor){
dojo.raise(this.widgetType+": no editor specified");
}
var node=this.editor.node;
var _b16=this.editor.getContents();
this.editor.close(save);
if(save){
var data={title:_b16};
if(_b14){
dojo.lang.mixin(data,_b14);
}
if(node.isPhantom){
var _b18=node.parent;
var _b19=node.getParentIndex();
node.destroy();
dojo.widget.TreeBasicControllerV3.prototype.doCreateChild.call(this,_b18,_b19,data);
}else{
var _b1a=_b14&&_b14.title?_b14.title:_b16;
node.setTitle(_b1a);
}
}else{
if(node.isPhantom){
node.destroy();
}
}
},makeDefaultNode:function(_b1b,_b1c){
var data={title:_b1b.tree.defaultChildTitle};
return dojo.widget.TreeBasicControllerV3.prototype.doCreateChild.call(this,_b1b,_b1c,data);
},runStages:function(_b1e,_b1f,make,_b21,_b22,args){
if(_b1e&&!_b1e.apply(this,args)){
return false;
}
if(_b1f&&!_b1f.apply(this,args)){
return false;
}
var _b24=make.apply(this,args);
if(_b21){
_b21.apply(this,args);
}
if(!_b24){
return _b24;
}
if(_b22){
_b22.apply(this,args);
}
return _b24;
}});
dojo.lang.extend(dojo.widget.TreeBasicControllerV3,{createAndEdit:function(_b25,_b26){
var data={title:_b25.tree.defaultChildTitle};
if(!this.canCreateChild(_b25,_b26,data)){
return false;
}
var _b28=this.doCreateChild(_b25,_b26,data);
if(!_b28){
return false;
}
this.exposeCreateChild(_b25,_b26,data);
_b28.isPhantom=true;
if(!this.editor.isClosed()){
this.editLabelFinish(this.editor.saveOnBlur);
}
this.doEditLabelStart(_b28);
}});
dojo.lang.extend(dojo.widget.TreeBasicControllerV3,{canClone:function(_b29,_b2a,_b2b,deep){
return true;
},clone:function(_b2d,_b2e,_b2f,deep){
return this.runStages(this.canClone,this.prepareClone,this.doClone,this.finalizeClone,this.exposeClone,arguments);
},exposeClone:function(_b31,_b32){
if(_b32.isTreeNode){
this.expand(_b32);
}
},doClone:function(_b33,_b34,_b35,deep){
var _b37=_b33.clone(deep);
_b34.addChild(_b37,_b35);
return _b37;
}});
dojo.lang.extend(dojo.widget.TreeBasicControllerV3,{canDetach:function(_b38){
if(_b38.actionIsDisabledNow(_b38.actions.DETACH)){
return false;
}
return true;
},detach:function(node){
return this.runStages(this.canDetach,this.prepareDetach,this.doDetach,this.finalizeDetach,this.exposeDetach,arguments);
},doDetach:function(node,_b3b,_b3c){
node.detach();
}});
dojo.lang.extend(dojo.widget.TreeBasicControllerV3,{canDestroyChild:function(_b3d){
if(_b3d.parent&&!this.canDetach(_b3d)){
return false;
}
return true;
},destroyChild:function(node){
return this.runStages(this.canDestroyChild,this.prepareDestroyChild,this.doDestroyChild,this.finalizeDestroyChild,this.exposeDestroyChild,arguments);
},doDestroyChild:function(node){
node.destroy();
}});
dojo.lang.extend(dojo.widget.TreeBasicControllerV3,{canMoveNotANode:function(_b40,_b41){
if(_b40.treeCanMove){
return _b40.treeCanMove(_b41);
}
return true;
},canMove:function(_b42,_b43){
if(!_b42.isTreeNode){
return this.canMoveNotANode(_b42,_b43);
}
if(_b42.actionIsDisabledNow(_b42.actions.MOVE)){
return false;
}
if(_b42.parent!==_b43&&_b43.actionIsDisabledNow(_b43.actions.ADDCHILD)){
return false;
}
var node=_b43;
while(node.isTreeNode){
if(node===_b42){
return false;
}
node=node.parent;
}
return true;
},move:function(_b45,_b46,_b47){
return this.runStages(this.canMove,this.prepareMove,this.doMove,this.finalizeMove,this.exposeMove,arguments);
},doMove:function(_b48,_b49,_b4a){
_b48.tree.move(_b48,_b49,_b4a);
return true;
},exposeMove:function(_b4b,_b4c){
if(_b4c.isTreeNode){
this.expand(_b4c);
}
}});
dojo.lang.extend(dojo.widget.TreeBasicControllerV3,{canCreateChild:function(_b4d,_b4e,data){
if(_b4d.actionIsDisabledNow(_b4d.actions.ADDCHILD)){
return false;
}
return true;
},createChild:function(_b50,_b51,data){
if(!data){
data={title:_b50.tree.defaultChildTitle};
}
return this.runStages(this.canCreateChild,this.prepareCreateChild,this.doCreateChild,this.finalizeCreateChild,this.exposeCreateChild,[_b50,_b51,data]);
},prepareCreateChild:function(){
return true;
},finalizeCreateChild:function(){
},doCreateChild:function(_b53,_b54,data){
var _b56=_b53.tree.createNode(data);
_b53.addChild(_b56,_b54);
return _b56;
},exposeCreateChild:function(_b57){
return this.expand(_b57);
}});
dojo.provide("dojo.widget.TreeExtension");
dojo.widget.defineWidget("dojo.widget.TreeExtension",[dojo.widget.HtmlWidget,dojo.widget.TreeCommon],function(){
this.listenedTrees={};
},{});
dojo.provide("dojo.widget.TreeDocIconExtension");
dojo.widget.defineWidget("dojo.widget.TreeDocIconExtension",[dojo.widget.TreeExtension],{templateCssString:"\r\n/* CSS for TreeDocIconExtension */\r\n\r\n\r\n/* long vertical line under docIcon, connecting w/ children */\r\n.TreeStateChildrenYes-ExpandOpen .TreeIconContent {\r\n    background-image : url('../templates/images/TreeV3/i_long.gif');\r\n    background-repeat : no-repeat;\r\n    background-position: 18px 9px;\r\n}\r\n\r\n/* close has higher priority */\r\n.TreeStateChildrenYes-ExpandClosed .TreeIconContent {\r\n    background-image : url();\r\n}\r\n\r\n/* higher priotity: same length and appear after background-definition */\r\n.TreeStateChildrenNo-ExpandLeaf .TreeIconContent {\r\n    background-image : url();\r\n}\r\n\r\n.TreeStateChildrenNo-ExpandClosed .TreeIconContent {\r\n    background-image : url();\r\n}\r\n\r\n.TreeStateChildrenNo-ExpandOpen .TreeIconContent {\r\n    background-image : url();\r\n}\r\n\r\n\r\n/* highest priority */\r\n.TreeIconDocument {\r\n    background-image: url('../templates/images/TreeV3/document.gif');\r\n}\r\n\r\n.TreeExpandOpen .TreeIconFolder {\r\n    background-image: url('../templates/images/TreeV3/open.gif');\r\n}\r\n\r\n.TreeExpandClosed .TreeIconFolder {\r\n    background-image: url('../templates/images/TreeV3/closed.gif');\r\n}\r\n\r\n/* generic class for docIcon */\r\n.TreeIcon {\r\n    width: 18px;\r\n    height: 18px;\r\n    float: left;\r\n    display: inline;\r\n    background-repeat : no-repeat;\r\n}\r\n\r\ndiv.TreeContent {\r\n    margin-left: 36px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/TreeDocIcon.css"),listenTreeEvents:["afterChangeTree","afterSetFolder","afterUnsetFolder"],listenNodeFilter:function(elem){
return elem instanceof dojo.widget.Widget;
},getnodeDocType:function(node){
var _b5a=node.getnodeDocType();
if(!_b5a){
_b5a=node.isFolder?"Folder":"Document";
}
return _b5a;
},setnodeDocTypeClass:function(node){
var reg=new RegExp("(^|\\s)"+node.tree.classPrefix+"Icon\\w+","g");
var _b5d=dojo.html.getClass(node.iconNode).replace(reg,"")+" "+node.tree.classPrefix+"Icon"+this.getnodeDocType(node);
dojo.html.setClass(node.iconNode,_b5d);
},onAfterSetFolder:function(_b5e){
if(_b5e.source.iconNode){
this.setnodeDocTypeClass(_b5e.source);
}
},onAfterUnsetFolder:function(_b5f){
this.setnodeDocTypeClass(_b5f.source);
},listenNode:function(node){
node.contentIconNode=document.createElement("div");
var _b61=node.tree.classPrefix+"IconContent";
if(dojo.render.html.ie){
_b61=_b61+" "+node.tree.classPrefix+"IEIconContent";
}
dojo.html.setClass(node.contentIconNode,_b61);
node.contentNode.parentNode.replaceChild(node.contentIconNode,node.expandNode);
node.iconNode=document.createElement("div");
dojo.html.setClass(node.iconNode,node.tree.classPrefix+"Icon"+" "+node.tree.classPrefix+"Icon"+this.getnodeDocType(node));
node.contentIconNode.appendChild(node.expandNode);
node.contentIconNode.appendChild(node.iconNode);
dojo.dom.removeNode(node.contentNode);
node.contentIconNode.appendChild(node.contentNode);
},onAfterChangeTree:function(_b62){
var _b63=this;
if(!_b62.oldTree||!this.listenedTrees[_b62.oldTree.widgetId]){
this.processDescendants(_b62.node,this.listenNodeFilter,this.listenNode);
}
}});
dojo.provide("dojo.widget.TreeSelectorV3");
dojo.widget.defineWidget("dojo.widget.TreeSelectorV3",[dojo.widget.HtmlWidget,dojo.widget.TreeCommon],function(){
this.eventNames={};
this.listenedTrees={};
this.selectedNodes=[];
this.lastClicked={};
},{listenTreeEvents:["afterTreeCreate","afterCollapse","afterChangeTree","afterDetach","beforeTreeDestroy"],listenNodeFilter:function(elem){
return elem instanceof dojo.widget.Widget;
},allowedMulti:true,dblselectTimeout:300,eventNamesDefault:{select:"select",deselect:"deselect",dblselect:"dblselect"},onAfterTreeCreate:function(_b65){
var tree=_b65.source;
dojo.event.browser.addListener(tree.domNode,"onclick",dojo.lang.hitch(this,this.onTreeClick));
if(dojo.render.html.ie){
dojo.event.browser.addListener(tree.domNode,"ondblclick",dojo.lang.hitch(this,this.onTreeDblClick));
}
dojo.event.browser.addListener(tree.domNode,"onKey",dojo.lang.hitch(this,this.onKey));
},onKey:function(e){
if(!e.key||e.ctrkKey||e.altKey){
return;
}
switch(e.key){
case e.KEY_ENTER:
var node=this.domElement2TreeNode(e.target);
if(node){
this.processNode(node,e);
}
}
},onAfterChangeTree:function(_b69){
if(!_b69.oldTree&&_b69.node.selected){
this.select(_b69.node);
}
if(!_b69.newTree||!this.listenedTrees[_b69.newTree.widgetId]){
if(this.selectedNode&&_b69.node.children){
this.deselectIfAncestorMatch(_b69.node);
}
}
},initialize:function(args){
for(name in this.eventNamesDefault){
if(dojo.lang.isUndefined(this.eventNames[name])){
this.eventNames[name]=this.widgetId+"/"+this.eventNamesDefault[name];
}
}
},onBeforeTreeDestroy:function(_b6b){
this.unlistenTree(_b6b.source);
},onAfterCollapse:function(_b6c){
this.deselectIfAncestorMatch(_b6c.source);
},onTreeDblClick:function(_b6d){
this.onTreeClick(_b6d);
},checkSpecialEvent:function(_b6e){
return _b6e.shiftKey||_b6e.ctrlKey;
},onTreeClick:function(_b6f){
var node=this.domElement2TreeNode(_b6f.target);
if(!node){
return;
}
var _b71=function(_b72){
return _b72===node.labelNode;
};
if(this.checkPathCondition(_b6f.target,_b71)){
this.processNode(node,_b6f);
}
},processNode:function(node,_b74){
if(node.actionIsDisabled(node.actions.SELECT)){
return;
}
if(dojo.lang.inArray(this.selectedNodes,node)){
if(this.checkSpecialEvent(_b74)){
this.deselect(node);
return;
}
var _b75=this;
var i=0;
var _b77;
while(this.selectedNodes.length>i){
_b77=this.selectedNodes[i];
if(_b77!==node){
this.deselect(_b77);
continue;
}
i++;
}
var _b78=this.checkRecentClick(node);
eventName=_b78?this.eventNames.dblselect:this.eventNames.select;
if(_b78){
eventName=this.eventNames.dblselect;
this.forgetLastClicked();
}else{
eventName=this.eventNames.select;
this.setLastClicked(node);
}
dojo.event.topic.publish(eventName,{node:node});
return;
}
this.deselectIfNoMulti(_b74);
this.setLastClicked(node);
this.select(node);
},forgetLastClicked:function(){
this.lastClicked={};
},setLastClicked:function(node){
this.lastClicked.date=new Date();
this.lastClicked.node=node;
},checkRecentClick:function(node){
var diff=new Date()-this.lastClicked.date;
if(this.lastClicked.node&&diff<this.dblselectTimeout){
return true;
}else{
return false;
}
},deselectIfNoMulti:function(_b7c){
if(!this.checkSpecialEvent(_b7c)||!this.allowedMulti){
this.deselectAll();
}
},deselectIfAncestorMatch:function(_b7d){
var _b7e=this;
dojo.lang.forEach(this.selectedNodes,function(node){
var _b80=node;
node=node.parent;
while(node&&node.isTreeNode){
if(node===_b7d){
_b7e.deselect(_b80);
return;
}
node=node.parent;
}
});
},onAfterDetach:function(_b81){
this.deselectIfAncestorMatch(_b81.child);
},select:function(node){
var _b83=dojo.lang.find(this.selectedNodes,node,true);
if(_b83>=0){
return;
}
this.selectedNodes.push(node);
dojo.event.topic.publish(this.eventNames.select,{node:node});
},deselect:function(node){
var _b85=dojo.lang.find(this.selectedNodes,node,true);
if(_b85<0){
return;
}
this.selectedNodes.splice(_b85,1);
dojo.event.topic.publish(this.eventNames.deselect,{node:node});
},deselectAll:function(){
while(this.selectedNodes.length){
this.deselect(this.selectedNodes[0]);
}
}});
dojo.provide("dojo.widget.TreeEmphasizeOnSelect");
dojo.widget.defineWidget("dojo.widget.TreeEmphasizeOnSelect",dojo.widget.HtmlWidget,{selector:"",initialize:function(){
this.selector=dojo.widget.byId(this.selector);
dojo.event.topic.subscribe(this.selector.eventNames.select,this,"onSelect");
dojo.event.topic.subscribe(this.selector.eventNames.deselect,this,"onDeselect");
},onSelect:function(_b86){
_b86.node.viewEmphasize();
},onDeselect:function(_b87){
_b87.node.viewUnemphasize();
}});
dojo.provide("dojo.widget.TreeDeselectOnDblselect");
dojo.deprecated("Does anyone still need this extension? (TreeDeselectOnDblselect)");
dojo.widget.defineWidget("dojo.widget.TreeDeselectOnDblselect",[dojo.widget.HtmlWidget],{selector:"",initialize:function(){
this.selector=dojo.widget.byId(this.selector);
dojo.event.topic.subscribe(this.selector.eventNames.dblselect,this,"onDblselect");
},onDblselect:function(_b88){
this.selector.deselect(_b88.node);
}});
dojo.provide("dojo.widget.TreeExpandToNodeOnSelect");
dojo.widget.defineWidget("dojo.widget.TreeExpandToNodeOnSelect",dojo.widget.HtmlWidget,{selector:"",controller:"",withSelected:false,initialize:function(){
this.selector=dojo.widget.byId(this.selector);
this.controller=dojo.widget.byId(this.controller);
dojo.event.topic.subscribe(this.selector.eventNames.select,this,"onSelect");
},onSelectEvent:function(_b89){
this.controller.expandToNode(_b89.node,this.withSelected);
}});
dojo.provide("rmc.widget.AccordionContainerEx");
dojo.widget.defineWidget("rmc.widget.AccordionContainerEx",dojo.widget.AccordionContainer,{ns:"rmc",postCreate:function(args,frag,_b8c){
rmc.widget.AccordionContainerEx.superclass.postCreate.apply(this,arguments);
this.duration=10;
},destroy:function(){
rmc.widget.AccordionContainerEx.superclass.destroy.apply(this,arguments);
},_addChild:function(_b8d){
if(_b8d.open){
dojo.deprecated("open parameter deprecated, use 'selected=true' instead will be removed in ","0.5");
dojo.debug(_b8d.widgetId+": open == "+_b8d.open);
_b8d.selected=true;
}
if(_b8d.widgetType!="AccordionPaneEx"){
var _b8e=dojo.widget.createWidget("AccordionPaneEx",{label:_b8d.label,selected:_b8d.selected,labelNodeClass:this.labelNodeClass,containerNodeClass:this.containerNodeClass,allowCollapse:this.allowCollapse,closeButton_text:theApp.res.closeButton_text});
_b8e.addChild(_b8d);
this.addWidgetAsDirectChild(_b8e);
this.registerChild(_b8e,this.children.length);
return _b8e;
}else{
dojo.html.addClass(_b8d.containerNode,this.containerNodeClass);
dojo.html.addClass(_b8d.labelNode,this.labelNodeClass);
this.addWidgetAsDirectChild(_b8d);
this.registerChild(_b8d,this.children.length);
return _b8d;
}
},_isAccordionPane:function(pane){
return pane.widgetType&&(pane.widgetType=="AccordionPane"||pane.widgetType=="AccordionPaneEx");
},showAll:function(){
for(var i=0;i<this.children.length;i++){
var pane=this.children[i];
if(!pane.isShowing()){
pane.show();
}
}
},hideAll:function(){
for(var i=0;i<this.children.length;i++){
var pane=this.children[i];
if(pane.isShowing()){
pane.hide();
}
}
},togglePane:function(pane){
if(dojo.lang.isString(pane)){
pane=dojo.widget.byId(pane);
if(pane!=null){
if(!this._isAccordionPane(pane)){
pane=pane.parent;
}
}
}
if(pane.isShowing()){
pane.hide();
}else{
pane.show();
}
return pane;
},showPane:function(pane){
if(dojo.lang.isString(pane)){
pane=dojo.widget.byId(pane);
if(pane!=null){
if(!this._isAccordionPane(pane)){
pane=pane.parent;
}
}
}
if(!pane.isShowing()){
pane.show();
}
return pane;
},hidePane:function(pane){
if(dojo.lang.isString(pane)){
pane=dojo.widget.byId(pane);
if(pane!=null){
if(!this._isAccordionPane(pane)){
pane=pane.parent;
}
}
}
if(pane.isShowing()){
pane.hide();
}
return pane;
},getShowingCount:function(){
var _b97=0;
for(var i=0;i<this.children.length;i++){
var pane=this.children[i];
if(pane.isShowing()){
_b97++;
}
}
return _b97;
},getChildHeight:function(_b9a){
var _b9b=0;
dojo.lang.forEach(this.children,function(_b9c,idx){
_b9b+=_b9c.getLabelHeight();
});
var _b9e=dojo.html.getContentBox(this.domNode);
var _b9f=_b9a.getLabelHeight();
var y=_b9e.height-_b9b+_b9f;
return y;
},selectChild:function(page){
dojo.lang.forEach(this.children,function(_ba2){
_ba2.setSelected(_ba2==page);
});
var y=0;
var _ba4=[];
dojo.lang.forEach(this.children,function(_ba5,idx){
if(_ba5.domNode.style.top!=(y+"px")){
_ba4.push(dojo.lfx.html.slideTo(_ba5.domNode,{top:y,left:0},this.duration));
}
if(_ba5.selected){
var _ba7=0;
dojo.lang.forEach(this.children,function(_ba8,idx){
_ba7+=_ba8.getLabelHeight();
});
var _baa=dojo.html.getContentBox(this.domNode);
var _bab=_ba5.getLabelHeight();
_ba5.resizeTo(_baa.width,_baa.height-_ba7+_bab);
var _bac=_baa.height-_ba7+_bab;
y+=_bac;
}else{
_ba5.domNode.style["height"]=_ba5.getLabelHeight()+"px";
_ba5.containerNode.style["height"]="0px";
y+=_ba5.getLabelHeight();
}
},this);
dojo.lfx.combine(_ba4).play();
},__END:true});
dojo.widget.defineWidget("rmc.widget.AccordionPaneEx",dojo.widget.AccordionPane,{ns:"rmc",oldSize:null,templateString:"<div dojoattachpoint=\"domNode\">\r\n\t<div dojoattachpoint=\"labelNode\" class=\"${this.labelNodeClass}\">\r\n\t\t<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td width=\"100%\" dojoattachevent=\"onclick: onLabelClick; onkeypress: onLabelKeyPress \">\r\n\t\t\t\t<div class=\"labelText\" tabindex=\"0\" title=\"${this.label}\">\r\n\t\t\t\t\t${this.label}</div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"closeButton\" dojoattachevent=\"onclick: onCloseButtonClick; onkeypress: onCloseButtonKeyPress\" style=\"cursor:hand\" tabindex=\"0\" title=\"${this.closeButton_text}\">\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div dojoattachpoint=\"containerNode\" style=\"overflow: hidden;\" class=\"${this.containerNodeClass}\">\r\n\t</div>\r\n</div>\r\n",templateCssString:"/******************************************************************************\r\n * Copyright (c) 2004, 2007 IBM Corporation.  All Rights Reserved.            * \r\n ******************************************************************************/\r\n\r\ntable, tr, td {\r\n\tborder: 0px;\r\n\tmargin: 0px 0px 0px 0px;\r\n\tpadding: 0px 0px 0px 0px;\r\n}\r\n\r\n.dojoAccordionPane .label {\r\n\tbackground: url(\"../images/bg_draw_closed.gif\") repeat-x;\r\n\tcolor: #666666;\r\n\tcursor: pointer;\r\n\theight: 20px;\r\n\tmargin: 0px 0px 0px 0px;\r\n\tpadding: 0px 0px 0px 0px;\r\n}\r\n\r\n.dojoAccordionPane-selected .label {\r\n\tbackground: url(\"../images/bg_draw_opened.gif\") repeat-x;\r\n\tcolor: #666666;\r\n\tcursor: pointer;\r\n\theight: 20px;\r\n\tmargin: 0px 0px 0px 0px;\r\n\tpadding: 0px 0px 0px 0px;\r\n}\r\n\r\n.dojoAccordionPane .accBody {\r\n\tbackground: #fff;\r\n\toverflow: auto;\r\n\tborder-top: 1px solid #e8e8e8;\r\n\tborder-bottom: 0px solid #e8e8e8;\r\n\tborder-right: 0px solid #e8e8e8;\r\n\tborder-left: 0px solid #e8e8e8;\r\n}\r\n\r\n.dojoAccordionPane .labelText {\r\n\tbackground-image: url(../images/arrow_closed.gif);\r\n\tbackground-position: 0px 3px;\r\n\tbackground-repeat: no-repeat;\t\r\n\tcolor: #666666;\r\n\tcursor: pointer;\r\n\tfont-size: 12px;\r\n\tmargin: 0px 0px 0px 0px;\t\r\n\tpadding: 3px 0px 0px 20px;\r\n}\r\n\r\n.dojoAccordionPane-selected .labelText {\r\n\tbackground-image: url(../images/arrow_opened.gif);\r\n\tbackground-position: 0px 3px;\r\n\tbackground-repeat: no-repeat;\r\n\tcolor: #666666;\r\n\tcursor: pointer;\r\n\tfont-size: 12px;\r\n\tmargin: 0px 0px 0px 0px;\t\r\n\tpadding: 3px 0px 0px 20px;\r\n}\r\n\r\n.dojoAccordionPane-selected .closeButton {\r\n\tbackground-image: url(../images/close_normal.gif);\r\n\tbackground-position: 0px 3px;\t\r\n\tbackground-repeat: no-repeat;\t\r\n\tcursor: pointer;\r\n\tmargin: 0px 0px 0px 0px;\r\n\tpadding: 3px 0px 20px 0px;\r\n}\r\n\r\n.dojoAccordionPane .closeButton {\r\n\tbackground-image: url(../images/close_normal.gif);\r\n\tbackground-position: 0px 3px;\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\tmargin: 0px 0px 0px 0px;\r\n\tpadding: 0px 20px 0px 0px;\r\n}\r\n\r\n.dojoAccordionPane .label:hover {\r\n\tbackground: url(\"../images/bg_draw_hover.gif\") repeat-x;\r\n\tcursor: pointer;\r\n}\r\n\r\n.dojoAccordionPane .labelText:hover {\r\n\tbackground-image: url(../images/arrow_closed_hov.gif);\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n}\r\n\r\n.dojoAccordionPane-selected .labelText:hover {\r\n\tbackground-image: url(../images/arrow_opened_hov.gif);\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../rmc/widget/templates/AccordionPaneEx.css"),postCreate:function(args,frag,_baf){
rmc.widget.AccordionPaneEx.superclass.postCreate.apply(this,arguments);
dojo.html.setVisibility(this.containerNode,false);
},destroy:function(){
rmc.widget.AccordionPaneEx.superclass.destroy.apply(this,arguments);
},setSelected:function(_bb0){
rmc.widget.AccordionPaneEx.superclass.setSelected.apply(this,arguments);
dojo.html.setVisibility(this.containerNode,this.selected);
},resizeTo:function(_bb1,_bb2){
rmc.widget.AccordionPaneEx.superclass.resizeTo.apply(this,arguments);
if(!this.selected){
this.domNode.style["height"]=this.getLabelHeight()+"px";
this.containerNode.style["height"]="0px";
}
},show:function(){
if(!this.isShowing()){
rmc.widget.AccordionPaneEx.superclass.show.apply(this,arguments);
this.parent._setSizes();
}
},hide:function(){
if(this.isShowing()){
rmc.widget.AccordionPaneEx.superclass.hide.apply(this,arguments);
this.parent._setSizes();
}
},minimizeLabel:function(){
},restoreLabel:function(){
},onCloseButtonClick:function(){
this.hide();
theApp.hideShowSplitPane(this.parent);
},onLabelKeyPress:function(evt){
if(evt.keyCode==dojo.event.browser.keys.KEY_ENTER){
this.onLabelClick();
}
},onCloseButtonKeyPress:function(evt){
if(evt.keyCode==dojo.event.browser.keys.KEY_ENTER){
this.onCloseButtonClick();
}
},__END:true});
dojo.provide("rmc.widget.ContentPaneEx");
dojo.widget.defineWidget("rmc.widget.ContentPaneEx",dojo.widget.ContentPane,{history:{},postCreate:function(args,frag,_bb7){
rmc.widget.ContentPaneEx.superclass.postCreate.apply(this,arguments);
},destroy:function(){
rmc.widget.ContentPaneEx.superclass.destroy.apply(this,arguments);
},onLoad:function(e){
rmc.widget.ContentPaneEx.superclass.onLoad.apply(this,arguments);
},onDownloadEnd:function(url,data){
if(!this.adjustPaths){
data=data.replace(/\.\.\//g,"");
}
if((url==theApp.glossaryPaneUrl)||(url==theApp.indexPaneUrl)){
var _bbb;
navigContent="";
if(url==theApp.glossaryPaneUrl){
_bbb=/<\s*a\s+id=\"_GLOSSARY_ITEM_([A-Z])\"\s+name=\".+\"\s*>\s*([A-Z])\s*<\s*\/a\s*>/gi;
while(tag=_bbb.exec(data)){
navigContent=navigContent+"<a href=\"#"+tag[1]+"\">"+tag[2]+"</a><br>";
}
_bbb=/<\s*a\s+id=\"_GLOSSARY_ITEM_(.+)\"\s+name=\"(.+)\"\s*>\s*([^<]*)\s*<\s*\/a\s*>/gi;
while(tag=_bbb.exec(data)){
var _bbc=tag[0].length;
tag[0]="<a id=\"_GLOSSARY_ITEM_"+tag[1]+"\" name=\""+tag[2]+"\">"+"<img src=\"\" height=\"1px\" width=\"20px\"  />"+tag[3]+"</a>";
data=data.substring(0,tag.index)+tag[0]+data.substring(tag.index+_bbc);
}
}else{
if(url==theApp.indexPaneUrl){
_bbb=/<\s*a\s+id=\"(_INDEX_ITEM_[A-Z])\"\s+name=\"([A-Z])\"\s*>\s*([A-Z])\s*<\s*\/a\s*>/gi;
while(tag=_bbb.exec(data)){
var _bbc=tag[0].length;
navigContent=navigContent+"<a alphabet=\"true\" href=\"#"+tag[1]+"\">"+tag[3]+"</a><br>";
tag[0]="<a id=\""+tag[1]+"\" name=\""+tag[2]+"\">"+tag[3]+"</a>";
data=data.substring(0,tag.index)+tag[0]+data.substring(tag.index+_bbc);
}
}
}
var _bbd="<table style=\"left: 0px; top: 0px;\">\n<tr>\n<td width=10%>\n<div style=\"position:absolute ;overflow:auto;width:15px; left: 5px; top: 5px;\">\n<font face=\"Arial, Helvetica, sans-serif\">\n"+navigContent+"</font>\n</div>\n</td>\n<td width=10%><div>&nbsp;&nbsp;&nbsp;</div></td><td  width=85%>\n<div style=\"left: 20px; top: 10px;\">\n";
_bbb=/<\s*body[^>]*>/gi;
_bbb.lastIndex=0;
if(tag=_bbb.exec(data)){
var _bbc=tag[0].length;
data=data.substring(0,tag.index+_bbc)+_bbd+data.substring(tag.index+_bbc);
endStr="</div>\n</td>\n</tr>\n</table>";
_bbb=/<\s*\/body.*[^>]*.*>/gi;
if(tag=_bbb.exec(data)){
data=data.substring(0,tag.index)+endStr+data.substring(tag.index);
}
}
}
rmc.widget.ContentPaneEx.superclass.onDownloadEnd.apply(this,arguments);
},__END:true});
dojo.provide("rmc.widget.DojoTreePane");
dojo.widget.defineWidget("rmc.widget.DojoTreePane",dojo.widget.ContentPane,{treeController:null,selector:null,src:null,objectId:null,showTreeRootNode:false,isLoading:false,deferredCalls:[],currentNode:null,postCreate:function(args,frag,_bc0){
rmc.widget.DojoTreePane.superclass.postCreate.apply(this,arguments);
},fillInTemplate:function(args,frag){
rmc.widget.DojoTreePane.superclass.fillInTemplate.apply(this,arguments);
var div=document.createElement("div");
this.domNode=div;
dojo.html.addClass(this.domNode,"dojoContentPane");
div=document.getElementById("DojoTreeControllerSelectorSection");
if(div==null){
var body=dojo.body();
div=document.createElement("div");
div.setAttribute("id","DojoTreeControllerSelectorSection");
var w=dojo.widget.createWidget("TreeBasicControllerV3",{widgetId:"controller"});
div.appendChild(w.domNode);
w=dojo.widget.createWidget("TreeSelectorV3",{widgetId:"selector"});
div.appendChild(w.domNode);
w=dojo.widget.createWidget("TreeDocIconExtension",{widgetId:"nodeIcons"});
div.appendChild(w.domNode);
dojo.widget.createWidget("TreeEmphasizeOnSelect",{selector:"selector"});
div.appendChild(w.domNode);
dojo.widget.createWidget("TreeDeselectOnDblselect",{selector:"selector"});
div.appendChild(w.domNode);
dojo.widget.createWidget("TreeExpandToNodeOnSelect",{selector:"selector",controller:"controller"});
div.appendChild(w.domNode);
body.appendChild(div);
this.treeController=dojo.widget.byId("controller");
this.selector=dojo.widget.byId("selector");
var self=this;
var _bc7=this.selector;
dojo.event.connect(_bc7,"processNode",function(evt){
if(self._canLoadContent()){
if(_bc7.selectedNodes.length==1){
var node=_bc7.selectedNodes[0];
var url="about:blank";
if(node.url){
url=node.url;
}
theApp.setContentUrl(url);
}
}
});
}
this.treeController=dojo.widget.byId("controller");
this.selector=dojo.widget.byId("selector");
},destroy:function(){
rmc.widget.DojoTreePane.superclass.destroy.apply(this,arguments);
},onLoad:function(e){
rmc.widget.DojoTreePane.superclass.onLoad.apply(this,arguments);
},isTreeLoaded:function(){
return (this.children.length>0);
},loadTree:function(){
if(this.isTreeLoaded()||this.isLoading){
return;
}
this.isLoading=true;
var url=theApp.getBaseUrl()+this.src;
if(url.match(/^http\S/i)){
url=decodeURI(url);
url=encodeURI(url);
}
var _bcd={url:url,encoding:"utf-8",error:function(type,data,evt){
alert(theApp.res.dojoTreePane_error_load_tree);
},mimetype:"text/json"};
var req=dojo.io.bind(_bcd);
dojo.event.connect(req,"load",this,"_populateTree");
},_populateTree:function(type,data,evt){
var _bd5=this.widgetId;
if(data!=null){
if(this.showTreeRootNode){
this._createTree(data);
}else{
for(var i=0;i<data.length;i++){
var td=data[i];
this._createTree(td.children);
}
}
}
this.isLoading=false;
this._processPendingActions();
},_createTree:function(data){
if(data!=null){
var tree=dojo.widget.createWidget("TreeV3",{listeners:["controller","selector","nodeIcons"],selector:"selector",eagerWidgetInstantiation:false});
tree.setChildren(data);
this.addChild(tree);
}
},_processPendingActions:function(){
while(this.deferredCalls.length>0){
var _bda=this.deferredCalls.shift();
try{
this._execute(_bda);
}
catch(e){
}
}
},_test:function(str){
alert("ttest: "+str);
},_execute:function(_bdc){
var fun=_bdc[0];
var args=_bdc[1];
var _bdf=_bdc[2];
var ret=fun(args);
if(_bdf!=null){
_bdf(ret);
}
},selectFirstNode:function(){
var self=this;
var fun=function(){
for(var i in self.children){
var tree=self.children[i];
var node=tree.children[0];
self.currentNode=node;
self._selectTreeNode(node,false);
break;
}
};
if(this.isTreeLoaded()){
fun();
}else{
this.deferredCalls.push([fun,null,null]);
this.loadTree();
}
},_findNode:function(url){
for(var i in this.children){
var tree=this.children[i];
var _be9=[];
var node=this._findTreeNode(tree,url,_be9);
if(node!=null){
if(!this._isTreeNode(node)){
node=this._expandNodes(_be9);
}
return node;
}
}
return null;
},_saveNode:function(node){
this.currentNode=node;
},_findNodeByPath:function(path,_bed){
this._saveNode(null);
if(!dojo.lang.isNumber(_bed)){
_bed=0;
}
var _bee=[];
for(var i in this.children){
_bee[i]=[];
var _bf0=true;
var tree=this.children[i];
var node=tree;
for(var p=_bed;p<path.length;p++){
if(theApp.settings.autoSyncContentWithView==false){
if(node.isFolder&&node.tryLazyInit){
node.setChildren();
node.tryLazyInit=false;
}
}else{
this.treeController.expand(node);
}
node=this._findChildNode(node,path[p]);
if(node==null){
_bf0=false;
break;
}else{
if(theApp.settings.autoSyncContentWithView==true){
this.selector.deselectAll();
this.selector.select(node);
}
}
_bee[i].push(node);
}
if(_bf0){
this._saveNode(node);
return node;
}
}
if(_bee.length==0){
return null;
}
var _bf4=0;
var _bf5=0;
for(var i=0;i<_bee.length;i++){
var len=_bee[i].length;
if(len>_bf5){
_bf5=len;
_bf4=i;
}
}
node=_bee[_bf4].pop();
this._saveNode(node);
return node;
},_findChildNode:function(_bf7,id){
for(var i in _bf7.children){
var _bfa=_bf7.children[i];
if(_bfa.objectId==id){
return _bfa;
}
}
return null;
},_findTreeNode:function(node,_bfc,_bfd){
_bfd.push(node);
if(this._sameUrl(node.url,_bfc)){
return node;
}
for(var i in node.children){
var _bff=node.children[i];
var _c00=this._findTreeNode(_bff,_bfc,_bfd);
if(_c00!=null){
return _c00;
}
}
_bfd.pop();
return null;
},_expandNodes:function(_c01){
if(_c01==null||_c01.length==0){
return null;
}
var node=_c01[_c01.length-1];
if(this._isTreeNode(node)){
return node;
}
var _c03=0;
var i;
while(i<_c01.length){
if(!this._isTreeNode(_c01[i])){
_c03=i-1;
break;
}
}
var _c05=true;
node=_c01[_c03];
while(_c05&&_c03<_c01.length-1){
this.treeController.expand(node);
_c03++;
_c05=false;
for(var x in node.children){
var _c07=node.children[x];
if(this._sameUrl(_c07.url,_c01[_c03].url)){
node=_c07;
_c05=true;
break;
}
}
}
if(_c05){
return node;
}
},_disableContentLoading:function(){
theApp.nav.disableContentLoading();
},_enableContentLoading:function(){
theApp.nav.enableContentLoading();
},_canLoadContent:function(){
return theApp.nav.canLoadContent();
},_getSelectedNode:function(){
if(this.selector.selectedNodes.length==1){
return this.selector.selectedNodes[0];
}
return null;
},isCurrentSelection:function(url){
var node=this._getSelectedNode();
return (node!=null)&&this._sameUrl(url,node.url);
},_sameUrl:function(_c0a,_c0b){
if(_c0a==_c0b){
return true;
}
return this._trimUrl(_c0a)==this._trimUrl(_c0b);
},_trimUrl:function(url){
if(url==null){
return "";
}
var i;
i=url.indexOf("#");
if(i>=0){
url=url.substring(0,i);
}
return url;
},_isTreeNode:function(node){
return (node!=null)&&(node instanceof dojo.widget.TreeNodeV3);
},_selectTreeNode:function(node,_c10){
if(this._getSelectedNode()==node){
return;
}
this.selector.deselectAll();
if(this._isTreeNode(node)){
theApp.setContentUrl(node.url);
this.selector.select(node);
if(_c10){
dojo.html.scrollIntoView(node.domNode);
}
this._focusNode(node);
}
},_focusNode:function(node){
var self=this;
var f=function(){
var s=[];
var n=node.parent;
while(self._isTreeNode(n)){
s.push(n);
n=n.parent;
}
dojo.lang.forEach(s,function(n){
n.expand();
});
self.treeController._focusLabel(node);
};
setTimeout(f,1);
},getBreadcrumbs:function(url,_c18){
var self=this;
var fun=function(url){
var _c1c=theApp.getBookmarkUrl(url);
if(_c1c==null||_c1c==""){
_c1c=theApp.getRelativeUrl(url);
}
self._disableContentLoading();
var node=self._getSelectedNode();
if(node==null||!self._sameUrl(_c1c,node.url)){
node=self._findNode(_c1c);
}
var bcs=[];
if(node!=null){
bcs=self._internalGetBreadcrumbs(node);
}
self._enableContentLoading();
return bcs;
};
if(this.isTreeLoaded()){
var ret=fun(url);
_c18(ret);
}else{
this.deferredCalls.push([fun,url,_c18]);
this.loadTree();
}
},getBreadcrumbsByPath:function(path,_c21){
var _c22=0;
if(!this.showTreeRootNode){
_c22=1;
}
var self=this;
var fun=function(path){
self._disableContentLoading();
var node=self._findNodeByPath(path,_c22);
var bcs=self._internalGetBreadcrumbs(node);
self._enableContentLoading();
return bcs;
};
if(this.isTreeLoaded()){
var ret=fun(path);
_c21(ret);
}else{
this.deferredCalls.push([fun,path,_c21]);
this.loadTree();
}
},getSelectedNodePath:function(){
var node=this._getSelectedNode();
if(node==null){
return null;
}
var path=[];
path.push(node.objectId);
while(((node=node.parent)!=null)&&this._isTreeNode(node)){
path.push(node.objectId);
}
if(!this.showTreeRootNode){
path.push(this.objectId);
}
return path.reverse();
},syncTreeNode:function(){
this._disableContentLoading();
if(this.currentNode!=null){
this._selectTreeNode(this.currentNode,true);
}
this._enableContentLoading();
},_internalGetBreadcrumbs:function(node){
var bcs=[];
if(node==null){
return bcs;
}
var _c2d=0;
while(this._isTreeNode(node)&&node.url!=null){
bcs[_c2d++]=this._constructBreadcrumb(node);
node=node.parent;
}
return bcs.reverse();
},_constructBreadcrumb:function(node){
return {id:node.objectId,url:theApp.getBaseUrl()+node.url,title:node.title};
},__END:true});
dojo.provide("rmc.widget.IFrameContentPane");
dojo.widget.defineWidget("rmc.widget.IFrameContentPane",dojo.widget.HtmlWidget,{title:"IFrameContentPane",ns:"rmc",src:"",frame:null,currentUrl:null,templateString:"<div>\r\n\r\n<iframe class=\"iframeContentPane\" id=\"${this.widgetId}_iframe\" name=\"${this.widgetId}_iframe\" \r\n\tscrolling=\"auto\" \r\n\tmarginwidth=\"0\" \r\n\tmarginheight=\"0\" \r\n\tframeborder=\"0\" \r\n\tvspace=\"0\" \r\n\thspace=\"0\" \r\n\tdojoAttachPoint=\"containerNode\" >\r\n\t\r\n\t<!-- \r\n\tstyle=\"overflow:auto; width:100%; height:100%; display:block\" \r\n\t -->\r\n</iframe>\r\n\r\n  \r\n</div>\r\n",templateCssString:".iframeContentPane {\r\n\tdisplay: block;\r\n\theight: 100%;\r\n\toverflow: auto;\r\n\tmargin: 0px 0px 0px 0px;\r\n\tpadding: 0px 0px 0px 0px;\r\n\twidth :100%;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../rmc/widget/templates/IFrameContentPane.css"),postCreate:function(args,frag,_c31){
rmc.widget.IFrameContentPane.superclass.postCreate.apply(this,arguments);
this.frame=dojo.byId(this.widgetId+"_iframe");
if(this.frame==null){
return;
}
if(this.frame.addEventListener){
this.frame.addEventListener("load",this.onLoad,false);
}else{
if(this.frame.attachEvent){
this.frame.detachEvent("onload",this.onLoad);
this.frame.attachEvent("onload",this.onLoad);
}
}
if(this.src!=null&&this.src!=""){
this.setUrl(this.src);
}
if(this.resizeIframe){
this.resizeIframe();
}
},fillInTemplate:function(args,frag){
rmc.widget.IFrameContentPane.superclass.fillInTemplate.apply(this,arguments);
},destroy:function(){
rmc.widget.IFrameContentPane.superclass.destroy.apply(this,arguments);
},onLoad:function(e){
if(this.resizeIframe){
this.resizeIframe();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
rmc.widget.IFrameContentPane.superclass.onResized.apply(this,arguments);
var wh=dojo.html.getMarginBox(this.domNode);
},beginSizing:function(){
this.frame.style.display="none";
},endSizing:function(){
this.frame.style.display="block";
},_sameUrl:function(url1,url2){
if(url1==url2){
return true;
}
return this._trimUrl(url1)==this._trimUrl(url2);
},_trimUrl:function(url){
if(url==null){
return "";
}
var i;
i=url.indexOf("#");
if(i>=0){
url=url.substring(0,i);
}
return url;
},saveUrl:function(url){
if(!this._sameUrl(this.currentUrl,url)){
this.currentUrl=url;
}
},_isExternalUrl:function(url){
return url.indexOf("http")==0||url.indexOf("file:")==0;
},setUrl:function(url,_c3d){
if(!this._sameUrl(this.currentUrl,url)){
this.currentUrl=url;
var win=frames[this.frame.name];
if(win!=null){
if(!this._isExternalUrl(url)){
url=theApp.getBaseUrl()+url;
}
if(_c3d==true){
win.location.replace(url);
}else{
win.location.href=url;
}
}
}
},getUrl:function(){
return this.currentUrl;
},resizeIframe:function(){
if(this.getUrl()==null){
return;
}
if(this.frame.contentDocument&&this.frame.contentDocument.body.offsetHeight){
this.frame.height=this.frame.contentDocument.body.offsetHeight+FFextraHeight;
}else{
if(this.frame.Document&&this.frame.Document.body.scrollHeight){
this.frame.height=this.frame.Document.body.scrollHeight;
}
}
},_END_:true});
dojo.provide("rmc.widget.ModalFloatingPaneEx");
dojo.widget.defineWidget("rmc.widget.ModalFloatingPaneEx",dojo.widget.ModalFloatingPane,{ns:"rmc",postCreate:function(args,frag,_c41){
rmc.widget.ModalFloatingPaneEx.superclass.postCreate.apply(this,arguments);
},destroy:function(){
rmc.widget.ModalFloatingPaneEx.superclass.destroy.apply(this,arguments);
},closeWindow:function(){
this.hide();
},setTitle:function(_c42){
this.titleBarText.innerHTML=_c42;
},__END:true});
dojo.provide("rmc.widget.SearchResultPane");
dojo.widget.defineWidget("rmc.widget.SearchResultPane",dojo.widget.ContentPane,{ns:"rmc",searchScopeNode:null,templateString:"<div dojoAttachPoint=\"domNode\" class=\"searchResultPane\">\r\n\t<div dojoAttachPoint=\"searchScopeNodeContainer\">\r\n\t</div> \r\n\t<div dojoAttachPoint=\"containerNode\"></div>\r\n</div>\r\n",templateCssString:"\r\n.searchResultPane {\r\n\tfont-family: arial, helvetica, sans-serif, kanji2;\r\n\tfont-size: 9pt;\r\n\toverflow: auto;\r\n}\r\n\r\n.searchHit {\r\n\tpadding-top: 3px;\t\r\n\tpadding-bottom: 3px;\r\n\tbackground-color: #ffffff;\r\n}\r\n\r\nA {\r\n\tcolor: #3366cc;\r\n\tfont-family: arial, helvetica, sans-serif, kanji2;\r\n\tfont-size: 10pt;\r\n\ttext-decoration: none;\r\n}\r\n\r\nTD {\r\n\tfont-family: arial, helvetica, sans-serif, kanji2;\r\n\tfont-size: 9pt;\r\n\tfont-color: #666666;\r\n\tfont-weight: normal;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../rmc/widget/templates/SearchResultPane.css"),postCreate:function(args,frag,_c45){
rmc.widget.SearchResultPane.superclass.postCreate.apply(this,arguments);
},fillInTemplate:function(args,frag){
rmc.widget.SearchResultPane.superclass.fillInTemplate.apply(this,arguments);
},destroy:function(){
rmc.widget.SearchResultPane.superclass.destroy.apply(this,arguments);
},createSearchScope:function(){
this.searchScopeNode=dojo.widget.createWidget("rmc:SearchScopeWidget");
this.searchScopeNodeContainer.appendChild(this.searchScopeNode.domNode);
return this.searchScopeNode;
},__END:true});
dojo.provide("rmc.widget.SplitContainerEx");
dojo.widget.defineWidget("rmc.widget.SplitContainerEx",dojo.widget.HtmlWidget,function(){
this.sizers=[];
},{isContainer:true,ns:"rmc",templateCssString:".dojoSplitContainer {\r\n\tdisplay: block;\r\n\toverflow: hidden;\r\n\tposition: relative;\r\n}\r\n\r\n.dojoSplitPane {\r\n\tposition: absolute;\r\n}\r\n\r\n.dojoSplitContainerSizerH,\r\n.dojoSplitContainerSizerV {\r\n\tborder: 1px solid;\r\n\tcolor: #fcfcfc;\r\n\tcursor: move;\r\n\tcursor: w-resize;\r\n\tfont-size: 10px;\r\n\theight: 100%;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.dojoSplitContainerSizerHx,\r\n.dojoSplitContainerSizerVx {\r\n\tborder: 0px solid;\r\n\tcolor: #cccccc;\r\n\tfont-size: 10px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.dojoSplitContainerSizerHm,\r\n.dojoSplitContainerSizerVm {\r\n\tborder: 0px solid;\r\n\tcursor: hand;\r\n\tfont-size: 10px;\r\n\theight: 0px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.dojoSplitContainerSizerV {\r\n\tcursor: n-resize;\r\n}\r\n\r\n.dojoSplitContainerVirtualSizerH,\r\n.dojoSplitContainerVirtualSizerV {\r\n\tbackground-color: ThreeDShadow;\r\n\tcursor: move;\r\n\tcursor: w-resize;\r\n\tfilter: Alpha(Opacity=50);\t\r\n\tfont-size: 1px;\t\r\n\t-moz-opacity: 0.5;\r\n\topacity: 0.5;\r\n\tmargin: 0;\r\n}\r\n\r\n.dojoSplitContainerVirtualSizerV {\r\n\tcursor: n-resize;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../rmc/widget/templates/SplitContainerEx.css"),activeSizing:false,sizerWidth:6,virtualBarSizerWidth:2,orientation:"horizontal",persist:false,docking:["left","right"],sizerWidgets:[],postMixInProperties:function(){
rmc.widget.SplitContainerEx.superclass.postMixInProperties.apply(this,arguments);
this.isHorizontal=(this.orientation=="horizontal");
},fillInTemplate:function(){
rmc.widget.SplitContainerEx.superclass.fillInTemplate.apply(this,arguments);
dojo.html.addClass(this.domNode,"dojoSplitContainer");
if(dojo.render.html.moz){
this.domNode.style.overflow="-moz-scrollbars-none";
}
var _c48=dojo.html.getContentBox(this.domNode);
this.paneWidth=_c48.width;
this.paneHeight=_c48.height;
},onResized:function(e){
var _c4a=dojo.html.getContentBox(this.domNode);
this.paneWidth=_c4a.width;
this.paneHeight=_c4a.height;
this._layoutPanels();
},postCreate:function(args,_c4c,_c4d){
rmc.widget.SplitContainerEx.superclass.postCreate.apply(this,arguments);
for(var i=0;i<this.children.length;i++){
with(this.children[i].domNode.style){
position="absolute";
}
dojo.html.addClass(this.children[i].domNode,"dojoSplitPane");
if(i==this.children.length-1){
break;
}
this._addSizer();
}
if(typeof this.sizerWidth=="object"){
try{
this.sizerWidth=parseInt(this.sizerWidth.toString());
}
catch(e){
this.sizerWidth=15;
}
}
this.virtualSizer=document.createElement("div");
this.virtualSizer.style.position="absolute";
this.virtualSizer.style.display="none";
this.virtualSizer.style.zIndex=10;
this.virtualSizer.className=this.isHorizontal?"dojoSplitContainerVirtualSizerH":"dojoSplitContainerVirtualSizerV";
this.domNode.appendChild(this.virtualSizer);
dojo.html.disableSelection(this.virtualSizer);
if(this.persist){
this._restoreState();
}
this.resizeSoon();
},_injectChild:function(_c4f){
with(_c4f.domNode.style){
position="absolute";
}
dojo.html.addClass(_c4f.domNode,"dojoSplitPane");
},_addSizer:function(){
var i=this.sizers.length;
var _c51=dojo.widget.createWidget("rmc:SplitSizer");
this.sizerWidgets[i]=_c51;
this._createSizerClickEvent(i,_c51.leftNode);
this._createSizerClickEvent(i,_c51.rightNode);
if(this.docking[i]=="left"){
_c51.left();
}else{
_c51.right();
}
_c51.sizerNode.appendChild(this._createSizer(i));
this.sizers[i]=_c51.domNode;
this.sizers[i].style.position="absolute";
this.sizers[i].className=this.isHorizontal?"dojoSplitContainerSizerHx":"dojoSplitContainerSizerVx";
this.domNode.appendChild(this.sizers[i]);
},_createSizerClickEvent:function(i,node){
node.setAttribute("index",i);
var self=this;
var _c55=(function(){
return function(evt){
var id=evt.target.getAttribute("index");
self.onSizerClick(id);
};
})();
dojo.event.connect(node,"onclick",_c55);
},onSizerClick:function(_c58){
if(dojo.lang.isString(_c58)){
_c58=parseInt(_c58);
}
if(_c58<0||_c58>this.sizers.length-1){
return;
}
var _c59=_c58;
if(this.docking=="right"||this.sizers.length>1&&_c58>0){
_c59=_c59+1;
}
this.togglePane(_c59);
},togglePane:function(_c5a){
if(_c5a<0||_c5a>this.children.length-1){
return;
}
var pane=this.children[_c5a];
if(pane.isShowing()){
this.hidePane(pane);
}else{
this.showPane(pane);
}
},hidePane:function(pane){
if(pane.isShowing()){
this._savePaneSize(this._getPaneIndex(pane));
pane.sizeShare=0;
pane.sizeMin=0;
pane.hide();
this._layoutPanels();
this._switchSizerHandle(pane);
}
},showPane:function(pane){
if(!pane.isShowing()){
pane.show();
this._restorePaneSize(this._getPaneIndex(pane));
this._layoutPanels();
this._switchSizerHandle(pane);
}
},_switchSizerHandle:function(pane){
for(var _c5f=0;_c5f<this.children.length;_c5f++){
if(pane==this.children[_c5f]){
break;
}
}
var _c60=_c5f;
if(_c5f>0){
_c60=_c5f-1;
}
this.sizerWidgets[_c60].switchBack();
},savedStates:[],_restorePaneSize:function(i){
var size=this.savedStates[i];
if(dojo.lang.isNumber(size)&&size>0){
this.children[i].sizeShare=this.savedStates[i];
}
},_savePaneSize:function(i){
var size=this.children[i].sizeShare;
if(dojo.lang.isNumber(size)&&size>0){
this.savedStates[i]=size;
}
},_getPaneIndex:function(pane){
for(var i=0;i<this.children.length;i++){
if(this.children[i]==pane){
return i;
}
}
return -1;
},_createSizer:function(i){
var bar=document.createElement("div");
bar.className=this.isHorizontal?"dojoSplitContainerSizerH":"dojoSplitContainerSizerV";
var self=this;
var _c6a=(function(){
var _c6b=i;
return function(e){
self.beginSizing(e,_c6b);
};
})();
dojo.event.connect(bar,"onmousedown",_c6a);
dojo.html.disableSelection(bar);
return bar;
},removeChild:function(_c6d){
if(this.sizers.length>0){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_c6d){
var i=this.sizers.length-1;
this.domNode.removeChild(this.sizers[i]);
this.sizers.length=i;
break;
}
}
}
rmc.widget.SplitContainerEx.superclass.removeChild.call(this,_c6d,arguments);
this.onResized();
},addChild:function(_c70){
rmc.widget.SplitContainerEx.superclass.addChild.apply(this,arguments);
this._injectChild(_c70);
if(this.children.length>1){
this._addSizer();
}
this._layoutPanels();
},_layoutPanels:function(){
if(this.children.length==0){
return;
}
var _c71=this.isHorizontal?this.paneWidth:this.paneHeight;
if(this.children.length>1){
_c71-=this.sizerWidth*(this.children.length-1);
}
var _c72=0;
for(var i=0;i<this.children.length;i++){
_c72+=this.children[i].sizeShare;
}
var _c74=_c71/_c72;
var _c75=0;
var _c76=-1;
for(var i=0;i<this.children.length;i++){
var size=Math.round(_c74*this.children[i].sizeShare);
this.children[i].sizeActual=size;
_c75+=size;
if(_c76==-1&&this.children[i].isShowing()){
_c76=i;
}
}
this.children[_c76].sizeActual+=_c71-_c75;
this._checkSizes();
var pos=0;
var size=this.children[0].sizeActual;
this._movePanel(this.children[0],pos,size);
this.children[0].position=pos;
pos+=size;
for(var i=1;i<this.children.length;i++){
this._moveSlider(this.sizers[i-1],pos,this.sizerWidth);
this.sizers[i-1].position=pos;
pos+=this.sizerWidth;
size=this.children[i].sizeActual;
this._movePanel(this.children[i],pos,size);
this.children[i].position=pos;
pos+=size;
}
},_movePanel:function(_c79,pos,size){
if(this.isHorizontal){
_c79.domNode.style.left=pos+"px";
_c79.domNode.style.top=0;
_c79.resizeTo(size,this.paneHeight);
}else{
_c79.domNode.style.left=0;
_c79.domNode.style.top=pos+"px";
_c79.resizeTo(this.paneWidth,size);
}
},_moveSlider:function(_c7c,pos,size){
if(this.isHorizontal){
_c7c.style.left=pos+"px";
_c7c.style.top=0;
dojo.html.setMarginBox(_c7c,{width:size,height:this.paneHeight});
}else{
_c7c.style.left=0;
_c7c.style.top=pos+"px";
dojo.html.setMarginBox(_c7c,{width:this.paneWidth,height:size});
}
},_growPane:function(_c7f,pane){
if(_c7f>0){
if(pane.sizeActual>pane.sizeMin){
if((pane.sizeActual-pane.sizeMin)>_c7f){
pane.sizeActual=pane.sizeActual-_c7f;
_c7f=0;
}else{
_c7f-=pane.sizeActual-pane.sizeMin;
pane.sizeActual=pane.sizeMin;
}
}
}
return _c7f;
},_checkSizes:function(){
var _c81=0;
var _c82=0;
for(var i=0;i<this.children.length;i++){
_c82+=this.children[i].sizeActual;
_c81+=this.children[i].sizeMin;
}
if(_c81<=_c82){
var _c84=0;
for(var i=0;i<this.children.length;i++){
if(this.children[i].sizeActual<this.children[i].sizeMin){
_c84+=this.children[i].sizeMin-this.children[i].sizeActual;
this.children[i].sizeActual=this.children[i].sizeMin;
}
}
if(_c84>0){
if(this.isDraggingLeft){
for(var i=this.children.length-1;i>=0;i--){
_c84=this._growPane(_c84,this.children[i]);
}
}else{
for(var i=0;i<this.children.length;i++){
_c84=this._growPane(_c84,this.children[i]);
}
}
}
}else{
for(var i=0;i<this.children.length;i++){
this.children[i].sizeActual=Math.round(_c82*(this.children[i].sizeMin/_c81));
}
}
},beginSizing:function(e,i){
this.paneBefore=this.children[i];
this.paneAfter=this.children[i+1];
this.isSizing=true;
this.sizingSplitter=this.sizers[i];
this.originPos=dojo.html.getAbsolutePosition(this.children[0].domNode,true,dojo.html.boxSizing.MARGIN_BOX);
if(this.isHorizontal){
var _c87=(e.layerX?e.layerX:e.offsetX);
var _c88=e.pageX;
this.originPos=this.originPos.x;
}else{
var _c87=(e.layerY?e.layerY:e.offsetY);
var _c88=e.pageY;
this.originPos=this.originPos.y;
}
this.startPoint=this.lastPoint=_c88;
this.screenToClientOffset=_c88-_c87;
this.dragOffset=this.lastPoint-this.paneBefore.sizeActual-this.originPos-this.paneBefore.position;
if(!this.activeSizing){
this._showSizingLine();
}
dojo.event.connect(document.documentElement,"onmousemove",this,"changeSizing");
dojo.event.connect(document.documentElement,"onmouseup",this,"endSizing");
dojo.event.browser.stopEvent(e);
this._notifyBeginSizing();
},_notifyBeginSizing:function(){
var _c89=theApp.getIframePanes();
for(var i=0;i<_c89.length;i++){
_c89[i].beginSizing();
}
},_notifyEndSizing:function(){
var _c8b=theApp.getIframePanes();
for(var i=0;i<_c8b.length;i++){
_c8b[i].endSizing();
}
},changeSizing:function(e){
this.lastPoint=this.isHorizontal?e.pageX:e.pageY;
if(this.activeSizing){
this.movePoint();
this._updateSize();
}else{
this.movePoint();
this._moveSizingLine();
}
dojo.event.browser.stopEvent(e);
},endSizing:function(e){
if(!this.activeSizing){
this._hideSizingLine();
}
this._updateSize();
this.isSizing=false;
dojo.event.disconnect(document.documentElement,"onmousemove",this,"changeSizing");
dojo.event.disconnect(document.documentElement,"onmouseup",this,"endSizing");
if(this.persist){
this._saveState(this);
}
this._notifyEndSizing();
},movePoint:function(){
var p=this.lastPoint-this.screenToClientOffset;
var a=p-this.dragOffset;
a=this.legaliseSplitPoint(a);
p=a+this.dragOffset;
this.lastPoint=p+this.screenToClientOffset;
},legaliseSplitPoint:function(a){
a+=this.sizingSplitter.position;
this.isDraggingLeft=(a>0)?true:false;
if(!this.activeSizing){
if(a<this.paneBefore.position+this.paneBefore.sizeMin){
a=this.paneBefore.position+this.paneBefore.sizeMin;
}
if(a>this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin))){
a=this.paneAfter.position+(this.paneAfter.sizeActual-(this.sizerWidth+this.paneAfter.sizeMin));
}
}
a-=this.sizingSplitter.position;
this._checkSizes();
return a;
},_updateSize:function(){
var pos=this.lastPoint-this.dragOffset-this.originPos;
var _c93=this.paneBefore.position;
var _c94=this.paneAfter.position+this.paneAfter.sizeActual;
this.paneBefore.sizeActual=pos-_c93;
this.paneAfter.position=pos+this.sizerWidth;
this.paneAfter.sizeActual=_c94-this.paneAfter.position;
for(var i=0;i<this.children.length;i++){
this.children[i].sizeShare=this.children[i].sizeActual;
}
this._layoutPanels();
},_showSizingLine:function(){
this._moveSizingLine();
if(this.isHorizontal){
dojo.html.setMarginBox(this.virtualSizer,{width:this.virtualBarSizerWidth,height:this.paneHeight});
}else{
dojo.html.setMarginBox(this.virtualSizer,{width:this.paneWidth,height:this.virtualBarSizerWidth});
}
this.virtualSizer.style.display="block";
},_hideSizingLine:function(){
this.virtualSizer.style.display="none";
},_moveSizingLine:function(){
var pos=this.lastPoint-this.startPoint+this.sizingSplitter.position;
if(this.isHorizontal){
this.virtualSizer.style.left=pos+"px";
}else{
var pos=(this.lastPoint-this.startPoint)+this.sizingSplitter.position;
this.virtualSizer.style.top=pos+"px";
}
}});
dojo.lang.extend(dojo.widget.Widget,{sizeMin:10,sizeShare:10});
dojo.widget.defineWidget("dojo.widget.SplitContainerPanel",dojo.widget.ContentPane,{});

