(this["webpackJsonpreact-use-pip-example"]=this["webpackJsonpreact-use-pip-example"]||[]).push([[0],{378:function(e,t,n){},379:function(e,t,n){"use strict";n.r(t);n(64),n(65);var r=n(0),c=n.n(r),i=n(56),a=n.n(i),u=n(6),o=n.n(u),s=n(10),l=n(15),p=n(57),f=n.n(p);function P(e){return e.disablePictureInPicture}function m(e){return e.webkitSupportsPresentationMode&&"function"===typeof e.webkitSetPresentationMode}function b(){return document.pictureInPictureEnabled}function d(){return(d=Object(l.a)(o.a.mark((function e(t,n,r,c){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t.current){e.next=2;break}return e.abrupt("return");case 2:if(!n){e.next=17;break}if(e.prev=3,!m(t.current)){e.next=9;break}t.current.webkitSetPresentationMode("picture-in-picture"),e.next=11;break;case 9:return e.next=11,t.current.requestPictureInPicture();case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),r&&"function"===typeof r&&r(e.t0),console.error("Video failed to enter Picture-in-Picture mode.");case 17:if(n||!document.pictureInPictureElement){e.next=32;break}if(e.prev=18,!m(t.current)){e.next=24;break}t.current.webkitSetPresentationMode("inline"),e.next=26;break;case 24:return e.next=26,document.exitPictureInPicture();case 26:e.next=32;break;case 28:e.prev=28,e.t1=e.catch(18),c&&"function"===typeof c&&c(e.t1),console.error("Video failed to leave Picture-in-Picture mode.");case 32:case"end":return e.stop()}}),e,null,[[3,13],[18,28]])})))).apply(this,arguments)}var v=function(e,t){var n=t||{},c=n.onEnterPictureInPicture,i=n.onLeavePictureInPicture,a=n.onRequestPictureInPictureError,u=n.onExitPictureInPictureError,o=Object(r.useState)(!1),l=Object(s.a)(o,2),p=l[0],f=l[1],v=Object(r.useState)(!1),E=Object(s.a)(v,2),h=E[0],w=E[1];return Object(r.useEffect)((function(){!function(e,t,n,r){d.apply(this,arguments)}(e,p,a,u)}),[e,p,a,u]),Object(r.useEffect)((function(){if(function(e){null===e&&console.warn("vieoRef is not referencing to an element. Please pass the videoRef as ref in a video element.");e&&"video"!==e.nodeName.toLocaleLowerCase()&&console.warn("videoRef is currently referencing to a ".concat(e.nodeName," element. Plese pass it as ref in a video element."));!e||b()||m(e)||console.warn("Picture in picture is not supported in your browser.");e&&P(e)&&console.warn("Picture in picture is disabled in your browser. If you want to activate the feature, please enable it in the browser settings.");e&&m(e)&&console.warn("Your browser supports a none-standard Picture in picture API.")}(e.current),null!==e.current)return w((m(e.current)||b())&&!P(e.current)),c&&"function"===typeof c&&e.current.addEventListener("enterpictureinpicture",c),i&&"function"===typeof i&&e.current.addEventListener("leavepictureinpicture",i),function(){null!==e.current&&(c&&"function"===typeof c&&e.current.removeEventListener("enterpictureinpicture",c),i&&"function"===typeof i&&e.current.removeEventListener("leavepictureinpicture",i))}}),[]),{isPictureInPictureActive:p,isPictureInPictureAvailable:h,togglePictureInPicture:f}},E=n(382),h=n(61),w=function(e){var t=e.language,n=e.value;return c.a.createElement(E.a,{language:t,style:h.a},n)},g=n(62);n(378);function x(){return(x=Object(l.a)(o.a.mark((function e(t){var n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(".","/DOC.md"));case 2:return n=e.sent,e.next=5,n.text();case 5:r=e.sent,t(r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=function(){var e=Object(r.useRef)(null),t=v(e,{onEnterPictureInPicture:function(e){return console.log("enter picture in picture",e)},onLeavePictureInPicture:function(e){return console.log("leave picture in picture",e)}}),n=t.isPictureInPictureActive,i=t.isPictureInPictureAvailable,a=t.togglePictureInPicture,u=Object(r.useState)(),o=Object(s.a)(u,2),l=o[0],p=o[1];return Object(r.useEffect)((function(){!function(e){x.apply(this,arguments)}(p)}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement("nav",{className:"nav"},c.a.createElement("a",{href:"/"},c.a.createElement("img",{className:"logo",src:"".concat(".","/logo-light-64x64.png"),alt:"react-use-pip-logo"})),c.a.createElement("a",{href:"/",className:"title"},c.a.createElement("h3",null,"react-use-pip")),c.a.createElement("a",{href:"https://github.com/DawChihLiou/react-use-pip"},c.a.createElement(g.a,{size:24}))),c.a.createElement("div",{className:"app"},c.a.createElement("video",{ref:e,autoPlay:!0,muted:!0,controls:!0,loop:!0,width:"100%"},c.a.createElement("source",{src:"video-sample.mp4"})),c.a.createElement("div",{className:"action-row"},i&&c.a.createElement("button",{onClick:function(){return a(!n)},className:"control-button"},n?"Disable":"Enable"," Picture in Picture"),!i&&c.a.createElement("p",null,"Picture in Picture feature API is not available in your browser.")),c.a.createElement(f.a,{source:l,renderers:{code:w}})))};a.a.render(c.a.createElement(I,null),document.getElementById("root"))},63:function(e,t,n){e.exports=n(379)},65:function(e,t,n){}},[[63,1,2]]]);
//# sourceMappingURL=main.a8e44448.chunk.js.map