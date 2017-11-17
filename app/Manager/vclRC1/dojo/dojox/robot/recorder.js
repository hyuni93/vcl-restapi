/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.robot.recorder"]){dojo._hasResource["dojox.robot.recorder"]=true;dojo.provide("dojox.robot.recorder");dojo.experimental("dojox.robot.recorder");(function(){var _1=1000;var _2=500;var _3=10000;var _4=[];var _5=0;var _6=null;var _7=null;var _8=function(){alert("Started recording.");_4=[];_6=new Date();_7=new Date();};var _9=function(_a,_b){if(_6==null||_a=="doh.robot.keyPress"&&_b[0]==dojo.keys.ENTER&&eval("("+_b[2]+")").ctrl&&eval("("+_b[2]+")").alt){return;}var dt=Math.max(Math.min(Math.round((new Date()).getTime()-_7.getTime()),_3),1);if(_a=="doh.robot.mouseMove"){_b[2]=dt;}else{_b[1]=dt;}_4.push({name:_a,args:_b});_7=new Date();};var _c=function(){var c=_4;if(c[0].name=="doh.robot.keyPress"&&(c[0].args[0]==dojo.keys.ENTER||c[0].args[0]==77)){c.splice(0,1);}for(var i=c.length-1;(i>=c.length-2)&&(i>=0);i--){if(c[i].name=="doh.robot.keyPress"&&c[i].args[0]==dojo.keys.ALT||c[i].args[0]==dojo.keys.CTRL){c.splice(i,1);}}for(i=0;i<c.length;i++){var _d,_e;if(c[i+1]&&c[i].name=="doh.robot.mouseMove"&&c[i+1].name==c[i].name&&c[i+1].args[2]<_2){_d=c[i+1];_e=0;while(_d&&_d.name==c[i].name&&_d.args[2]<_2){c.splice(i+1,1);_e+=_d.args[2];c[i].args[0]=_d.args[0];c[i].args[1]=_d.args[1];_d=c[i+1];}c[i].args[3]=_e;}else{if(c[i+1]&&c[i].name=="doh.robot.mouseWheel"&&c[i+1].name==c[i].name&&c[i+1].args[1]<_2){_d=c[i+1];_e=0;while(_d&&_d.name==c[i].name&&_d.args[1]<_2){c.splice(i+1,1);_e+=_d.args[1];c[i].args[0]+=_d.args[0];_d=c[i+1];}c[i].args[2]=_e;}else{if(c[i+2]&&c[i].name=="doh.robot.mouseMoveAt"&&c[i+2].name=="doh.robot.scrollIntoView"){var _f=c.splice(i+2,1)[0];c.splice(i,0,_f);}else{if(c[i+1]&&c[i].name=="doh.robot.mousePress"&&c[i+1].name=="doh.robot.mouseRelease"&&c[i].args[0]==c[i+1].args[0]){c[i].name="doh.robot.mouseClick";c.splice(i+1,1);if(c[i+1]&&c[i+1].name=="doh.robot.mouseClick"&&c[i].args[0]==c[i+1].args[0]){c.splice(i+1,1);}}else{if(c[i+1]&&c[i-1]&&c[i-1].name=="doh.robot.mouseMoveAt"&&c[i].name=="doh.robot.mousePress"&&c[i+1].name=="doh.robot.mouseMove"){var cmd={name:"doh.robot.mouseMoveAt",args:[c[i-1].args[0],1,100,c[i-1].args[3]+1,c[i-1].args[4]]};c.splice(i+1,0,cmd);}else{if(c[i+1]&&((c[i].name=="doh.robot.keyPress"&&typeof c[i].args[0]=="string")||c[i].name=="doh.robot.typeKeys")&&c[i+1].name=="doh.robot.keyPress"&&typeof c[i+1].args[0]=="string"&&c[i+1].args[1]<=_1&&!eval("("+c[i].args[2]+")").ctrl&&!eval("("+c[i].args[2]+")").alt&&!eval("("+c[i+1].args[2]+")").ctrl&&!eval("("+c[i+1].args[2]+")").alt){c[i].name="doh.robot.typeKeys";c[i].args.splice(3,1);_d=c[i+1];var _10=0;while(_d&&_d.name=="doh.robot.keyPress"&&typeof _d.args[0]=="string"&&_d.args[1]<=_1&&!eval("("+_d.args[2]+")").ctrl&&!eval("("+_d.args[2]+")").alt){c.splice(i+1,1);c[i].args[0]+=_d.args[0];_10+=_d.args[1];_d=c[i+1];}c[i].args[2]=_10;c[i].args[0]="'"+c[i].args[0]+"'";}else{if(c[i].name=="doh.robot.keyPress"){if(typeof c[i].args[0]=="string"){c[i].args[0]="'"+c[i].args[0]+"'";}else{if(c[i].args[0]==0){c.splice(i,1);}else{for(var j in dojo.keys){if(dojo.keys[j]==c[i].args[0]){c[i].args[0]="dojo.keys."+j;break;}}}}}}}}}}}}};var _11=function(){if(!_6){_8();}else{_12();}};var _12=function(){var dt=Math.round((new Date()).getTime()-_6.getTime());_6=null;_c();var c=_4;if(c.length){var s="doh.register('dojox.robot.AutoGeneratedTestGroup',{\n";s+="     name: 'autotest"+(_5++)+"',\n";s+="     timeout: "+(dt+2000)+",\n";s+="     runTest: function(){\n";s+="          var d = new doh.Deferred();\n";for(var i=0;i<c.length;i++){s+="          "+c[i].name+"(";for(var j=0;j<c[i].args.length;j++){var arg=c[i].args[j];s+=arg;if(j!=c[i].args.length-1){s+=", ";}}s+=");\n";}s+="          doh.robot.sequence(function(){\n";s+="               if(/*Your condition here*/){\n";s+="                    d.callback(true);\n";s+="               }else{\n";s+="                    d.errback(new Error('We got a failure'));\n";s+="               }\n";s+="          }, 1000);\n";s+="          return d;\n";s+="     }\n";s+="});\n";var div=document.createElement("div");div.id="dojox.robot.recorder";div.style.backgroundColor="white";div.style.position="absolute";var _13={y:(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),x:(window.pageXOffset||(window["dojo"]?dojo._fixIeBiDiScrollLeft(document.documentElement.scrollLeft):undefined)||document.body.scrollLeft||0)};div.style.left=_13.x+"px";div.style.top=_13.y+"px";var h1=document.createElement("h1");h1.innerHTML="Your code:";div.appendChild(h1);var pre=document.createElement("pre");if(pre.innerText!==undefined){pre.innerText=s;}else{pre.textContent=s;}div.appendChild(pre);var _14=document.createElement("button");_14.innerHTML="Close";var _15=dojo.connect(_14,"onmouseup",function(e){dojo.stopEvent(e);document.body.removeChild(div);dojo.disconnect(_15);});div.appendChild(_14);document.body.appendChild(div);_4=[];}};var _16=function(_17){if(typeof _17=="string"){return "'"+_17+"'";}else{if(_17.id){return "'"+_17.id+"'";}else{var _18=document.getElementsByTagName(_17.nodeName);var i;for(i=0;i<_18.length;i++){if(_18[i]==_17){break;}}return "function(){ return document.getElementsByTagName('"+_17.nodeName+"')["+i+"]; }";}}};var _19=function(b){return "{left:"+(b==0)+", middle:"+(b==1)+", right:"+(b==2)+"}";};var _1a=function(e){return "{'shift':"+(e.shiftKey)+", 'ctrl':"+(e.ctrlKey)+", 'alt':"+(e.altKey)+"}";};dojo.connect(document,"onkeydown",function(e){if((e.keyCode==dojo.keys.ENTER||e.keyCode==77)&&e.ctrlKey&&e.altKey){dojo.stopEvent(e);_11();}});var _1b={type:""};var _1c=function(e){if(!e||_1b.type==e.type&&_1b.button==e.button){return;}_1b={type:e.type,button:e.button};var _1d=_16(e.target);var _1e=dojo.coords(e.target);_9("doh.robot.mouseMoveAt",[_1d,0,100,e.clientX-_1e.x,e.clientY-_1e.y]);_9("doh.robot.mousePress",[_19(e.button-(dojo.isIE?1:0)),0]);};var _1f=function(e){if(!e||_1b.type==e.type&&_1b.button==e.button){return;}_1b={type:e.type,button:e.button};var _20=_16(e.target);var _21=dojo.coords(e.target);_9("doh.robot.mouseClick",[_19(e.button-(dojo.isIE?1:0)),0]);};var _22=function(e){if(!e||_1b.type==e.type&&_1b.button==e.button){return;}_1b={type:e.type,button:e.button};var _23=_16(e.target);var _24=dojo.coords(e.target);_9("doh.robot.mouseRelease",[_19(e.button-(dojo.isIE?1:0)),0]);};var _25=function(e){if(!e||_1b.type==e.type&&_1b.pageX==e.pageX&&_1b.pageY==e.pageY){return;}_1b={type:e.type,pageX:e.pageX,pageY:e.pageY};_9("doh.robot.mouseMove",[e.pageX,e.pageY,0,100,true]);};var _26=function(e){if(!e||_1b.type==e.type&&_1b.pageX==e.pageX&&_1b.pageY==e.pageY){return;}_1b={type:e.type,detail:(e.detail?(e.detail):(-e.wheelDelta/120))};_9("doh.robot.mouseWheel",[_1b.detail]);};var _27=function(e){if(!e||_1b.type==e.type&&(_1b.charCode==e.charCode&&_1b.keyCode==e.keyCode)){return;}_1b={type:e.type,charCode:e.charCode,keyCode:e.keyCode};_9("doh.robot.keyPress",[e.charOrCode==dojo.keys.SPACE?" ":e.charOrCode,0,_1a(e)]);};var _28=function(e){if(!e||_1b.type==e.type&&(_1b.charCode==e.charCode&&_1b.keyCode==e.keyCode)){return;}_1b={type:e.type,charCode:e.charCode,keyCode:e.keyCode};};dojo.connect(document,"onmousedown",_1c);dojo.connect(document,"onmouseup",_22);dojo.connect(document,"onclick",_1f);dojo.connect(document,"onkeypress",_27);dojo.connect(document,"onkeyup",_28);dojo.connect(document,"onmousemove",_25);dojo.connect(document,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll",_26);dojo.addOnLoad(function(){if(dojo.window){dojo.connect(dojo.window,"scrollIntoView",function(_29){_9("doh.robot.scrollIntoView",[_16(_29)]);});}});dojo.connect(dojo,"connect",function(_2a,_2b,f){if(_2a&&(!f||!f._mine)){var _2c=null;if(_2b.toLowerCase()=="onmousedown"){_2c=dojo.hitch(this,_1c);}else{if(_2b.toLowerCase()==(!dojo.isMozilla?"onmousewheel":"dommousescroll")){_2c=dojo.hitch(this,_26);}else{if(_2b.toLowerCase()=="onclick"){_2c=dojo.hitch(this,_1f);}else{if(_2b.toLowerCase()=="onmouseup"){_2c=dojo.hitch(this,_22);}else{if(_2b.toLowerCase()=="onkeypress"){_2c=dojo.hitch(this,_27);}else{if(_2b.toLowerCase()=="onkeyup"){_2c=dojo.hitch(this,_28);}}}}}}if(_2c==null){return;}_2c._mine=true;dojo.connect(_2a,_2b,_2c);}});})();}