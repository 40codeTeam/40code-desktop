(window.webpackJsonpGUI=window.webpackJsonpGUI||[]).push([[15],{1659:function(t,o,e){(t.exports=e(9)(!1)).push([t.i,".sa-custom-zoom-area {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 60px;\n  height: 148px;\n  pointer-events: none;\n}\n.blocklyZoom > * {\n  transition: transform var(--sa-custom-zoom-speed, 0) ease-in-out;\n}\n.sa-custom-zoom-hidden > * {\n  transform: translateX(80px);\n}\n",""])},1710:function(t,o,e){"use strict";e.r(o),e.d(o,"resources",(function(){return s}));var n=e(1659);const s={"userscript.js":async function({addon:t,global:o,console:e}){let n;await t.tab.traps.getBlockly();let s=!1;const i={none:"0s",short:"0.25s",default:"0.5s",long:"1s"},a=document.createElement("div");function c(){if(document.removeEventListener("mousemove",l),"editor"!==t.tab.editorMode)return;Blockly.getMainWorkspace().options.zoomOptions.maxScale=t.settings.get("maxZoom")/100,Blockly.getMainWorkspace().options.zoomOptions.minScale=t.settings.get("minZoom")/100,Blockly.getMainWorkspace().options.zoomOptions.startScale=t.settings.get("startZoom")/100,Blockly.getMainWorkspace().options.zoomOptions.scaleSpeed=1+t.settings.get("zoomSpeed")/100*.2;const o=r(),e=t.settings.get("autohide");if(o&&o.classList.toggle("sa-custom-zoom-hidden",e),e){document.querySelector(".injectionDiv").appendChild(a),m(),document.addEventListener("mousemove",l)}}function r(){const t=Blockly.getMainWorkspace().zoomControls_;return t?t.svgGroup_:null}function l(o){const e=o.x>n.left&&o.x<n.right&&o.y>n.top&&o.y<n.bottom;if(e!==s){s=e;const o=r();o&&(o.style.setProperty("--sa-custom-zoom-speed",i[t.settings.get("speed")]),o.classList.toggle("sa-custom-zoom-hidden",!e))}}function m(){n=a.getBoundingClientRect()}a.className="sa-custom-zoom-area",await t.tab.waitForElement(".blocklyZoom"),c(),t.tab.addEventListener("urlChange",c),t.settings.addEventListener("change",c),window.addEventListener("resize",(function(){"editor"===t.tab.editorMode&&t.settings.get("autohide")&&m()}))},"style.css":e.n(n).a}}}]);