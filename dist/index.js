!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).LightWeb={})}(this,(function(e){"use strict";function t(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var o=function(e,t){var n={};for(var a in t)t.hasOwnProperty(a)&&e!==a&&(n[a]=t[a]);return n},r="lightWeb_",l={init:r+"init",pageConfig:r+"page_config",router:r+"router_config",vibrate:r+"vibrate",setClipboard:r+"set_clipboard",getClipboard:r+"get_clipboard"},c={active:r+"appActive",backGround:r+"appBackGround",show:r+"viewShow",hide:r+"viewHide",sceneMode:r+"sceneMode"},s=null,u=function(){function e(t,n,a){var o,r,c,u,f=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.info=null,this.appInfo=null,this.routerInfo=null,this.extra=null,this.callBackCollection={},this.listenEvent={},this.callBackID=0,null!=s)return s;this.info=(o=navigator.userAgent.split("/"),r=!1,c="web",u="",o.length>=3&&"webApp"===o[0]&&(r=!0,c=o[1],u=o[2]),{isInApp:r,device:c,version:u});var v=(new Date).getTime().toString();v&&(window[v]=this,s=this,this.addCallBack({name:l.init,value:i(i({},t),{},{global:v}),success:function(e){if(e&&e.data){var t=e.data;t.appInfo&&(f.appInfo=t.appInfo),t.routerInfo&&(f.routerInfo=t.routerInfo),t.extra&&(f.extra=t.extra)}n(e)},fail:a}))}var n,a,r;return n=e,(a=[{key:"changePageConfig",value:function(e,t,n){var a=this;this.addCallBack({name:l.pageConfig,value:i({},e),success:function(e){if(e&&e.data){var n=e.data,i=n.screenWidth,o=n.screenHeight;a.appInfo.screenWidth=i,a.appInfo.screenHeight=o}t(e)},fail:n})}},{key:"setClipboard",value:function(e,t,n){this.addCallBack({name:l.setClipboard,value:{text:e},success:t,fail:n})}},{key:"getClipboard",value:function(e,t){this.addCallBack({name:l.getClipboard,value:null,success:e,fail:t})}},{key:"vibrate",value:function(e,t,n){this.addCallBack({name:l.vibrate,value:{isLong:void 0===e||e},success:t,fail:n})}},{key:"router",value:function(e,t,n){this.addCallBack({name:l.router,value:e,success:t,fail:n})}},{key:"sub",value:function(e,t){var n=this;this.callBackID+=1;var a=this.callBackID.toString();return this.listenEvent.hasOwnProperty(e)||(this.listenEvent[e]={}),this.listenEvent[e][a]=t,function(){n.listenEvent.hasOwnProperty(e)&&(n.listenEvent[e]=o(a,n.listenEvent[e]))}}},{key:"removeSubKey",value:function(e){this.listenEvent.hasOwnProperty(e)&&(this.listenEvent[e]=null)}},{key:"pub",value:function(e,t,n){if(this.listenEvent.hasOwnProperty(e)){var a=this.listenEvent[e];for(var i in a)a.hasOwnProperty(i)&&a[i](t,n,!1)}}},{key:"exec",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(this.callBackCollection[e]&&e>0){var i=this.callBackCollection[e];i(e,t,n,a)}}},{key:"addCallBack",value:function(e){var t=this,n=e.name,a=e.value,i=e.success,r=e.fail;if(null==this.info)return null;var l=0;(i||r)&&(this.callBackID+=1,l=this.callBackID.toString(),this.callBackCollection[l]=function(e,n,a,l){n&&i&&i(n),a&&r&&r(a),!l&&null!=e&&t.callBackCollection[e]&&(t.callBackCollection=o(e,t.callBackCollection))}),this.navtiveFunc(n,a,l)}},{key:"navtiveFunc",value:function(e,t,n){var a=function(e){var t={};for(var n in e)if(e.hasOwnProperty(n)){var a=e[n];t[n]="boolean"==typeof a?a?1:0:a}return t}(t);try{switch(this.info.device){case"ios":window.webkit.messageHandlers[e].postMessage({data:a,id:n});break;case"android":AndroidNative.postMessage(JSON.stringify({name:e,data:{data:a,id:n}}));break;case"dev":window.require("electron").ipcRenderer.send("nativeEvent",JSON.stringify({name:e,data:{data:a,id:n}}));break;default:console.log("==== name ===="),console.log(e),console.log("==== data ===="),console.log(a),console.log("==== id ===="),console.log(n),console.log("==== End ====")}}catch(e){console.log(e)}}}])&&t(n.prototype,a),r&&t(n,r),e}();e.BridgeEvents=c,e.LightWebCore=u,e.RouterActions={push:0,pop:1,replace:2,setPopExtra:3,close:4,restart:5},e.StyleTypes={light:0,dark:1},Object.defineProperty(e,"__esModule",{value:!0})}));
