(window.webpackJsonpGUI=window.webpackJsonpGUI||[]).push([[30],{1632:function(t,e,o){(t.exports=o(9)(!1)).push([t.i,".blocklyFlyout,\n.blocklyFlyoutScrollbar,\n.sa-lock-image {\n  transition-property: transform;\n}\n\n.blocklyFlyout.sa-flyoutClose {\n  transform: translateX(-200px) !important;\n}\n\n.blocklyFlyoutScrollbar.sa-flyoutClose {\n  transform: translateX(35px) !important;\n}\n\n.sa-lock-image.sa-flyoutClose {\n  transform: translateX(-260px);\n}\n\n.sa-flyout-placeHolder {\n  position: absolute;\n  left: 61px;\n  top: 44px;\n  height: 100%;\n  width: 251px;\n}\n\n.sa-lock-image {\n  position: absolute;\n  z-index: 20;\n  width: 20px;\n  cursor: pointer;\n  top: 46px;\n  left: 280px;\n}\n\n.injectionDiv {\n  overflow: hidden !important;\n}\n",""])},1684:function(t,e,o){"use strict";o.r(e),o.d(e,"resources",(function(){return a}));const n=t=>{if("/lock.svg"===t)return"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAxM2ExIDEgMCAwIDAtMSAxdjNhMSAxIDAgMCAwIDIgMHYtM2ExIDEgMCAwIDAtMS0xem01LTRWN0E1IDUgMCAwIDAgNyA3djJhMyAzIDAgMCAwLTMgM3Y3YTMgMyAwIDAgMCAzIDNoMTBhMyAzIDAgMCAwIDMtM3YtN2EzIDMgMCAwIDAtMy0zek05IDdhMyAzIDAgMCAxIDYgMHYySDl6bTkgMTJhMSAxIDAgMCAxLTEgMUg3YTEgMSAwIDAgMS0xLTF2LTdhMSAxIDAgMCAxIDEtMWgxMGExIDEgMCAwIDEgMSAxeiIgZmlsbD0iIzYyNjI2MiIvPjwvc3ZnPg==";if("/unlock.svg"===t)return"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAxM2ExLjQ5IDEuNDkgMCAwIDAtMSAyLjYxVjE3YTEgMSAwIDAgMCAyIDB2LTEuMzlBMS40OSAxLjQ5IDAgMCAwIDEyIDEzem01LTRIOVY3YTMgMyAwIDAgMSA1LjEyLTIuMTMgMy4wOCAzLjA4IDAgMCAxIC43OCAxLjM4IDEgMSAwIDEgMCAxLjk0LS41IDUuMDkgNS4wOSAwIDAgMC0xLjMxLTIuMjlBNSA1IDAgMCAwIDcgN3YyYTMgMyAwIDAgMC0zIDN2N2EzIDMgMCAwIDAgMyAzaDEwYTMgMyAwIDAgMCAzLTN2LTdhMyAzIDAgMCAwLTMtM3ptMSAxMGExIDEgMCAwIDEtMSAxSDdhMSAxIDAgMCAxLTEtMXYtN2ExIDEgMCAwIDEgMS0xaDEwYTEgMSAwIDAgMSAxIDF6IiBmaWxsPSIjNjI2MjYyIi8+PC9zdmc+";throw new Error("Unknown asset: ".concat(t))};var l=o(1632);const a={"userscript.js":async function({addon:t,global:e,console:o}){let l=null,a=null,c=null,s=null,i=!0,r=null,M=t.settings.get("toggle"),u=!1;function y(){return{none:"0",short:"0.25",default:"0.5",long:"1"}[t.settings.get("speed")]}function g(t,e={}){t&&0!==t.buttons&&!document.querySelector(".blocklyToolboxDiv").className.includes("blocklyToolboxDelete")||(e="object"==typeof e?y():e,c.classList.remove("sa-flyoutClose"),c.style.transitionDuration="".concat(e,"s"),s.classList.remove("sa-flyoutClose"),s.style.transitionDuration="".concat(e,"s"),a.classList.remove("sa-flyoutClose"),a.style.transitionDuration="".concat(e,"s"),setTimeout(()=>Blockly.getMainWorkspace().recordCachedAreas(),1e3*e))}function I(t,e=y()){"cathover"!==M&&t&&t.clientX<=s.getBoundingClientRect().left||u||(c.classList.add("sa-flyoutClose"),c.style.transitionDuration="".concat(e,"s"),s.classList.add("sa-flyoutClose"),s.style.transitionDuration="".concat(e,"s"),a.classList.add("sa-flyoutClose"),a.style.transitionDuration="".concat(e,"s"),setTimeout(()=>Blockly.getMainWorkspace().recordCachedAreas(),1e3*e))}let A=!1;for(;;){c=await t.tab.waitForElement(".blocklyFlyout",{markAsSeen:!0,reduxCondition:t=>!t.scratchGui.mode.isPlayerOnly});let e=document.querySelector(".blocklySvg");s=document.querySelector(".blocklyFlyoutScrollbar");const o=document.querySelector('[class^="gui_tabs"]');if(l&&l.remove(),l=document.createElement("div"),"hover"===M&&o.appendChild(l),l.className="sa-flyout-placeHolder",a&&a.remove(),a=document.createElement("img"),a.src=n("/".concat(u?"":"un","lock.svg")),a.className="sa-lock-image",a.onclick=()=>{u=!u,a.src=n("/".concat(u?"":"un","lock.svg"))},"hover"===M&&o.appendChild(a),"hover"===M&&(l.onmouseenter=t=>g(t),l.onmouseup=t=>g(),document.querySelector(".blocklyToolboxDiv").onmouseenter=t=>g(t),e.onmouseenter=t=>I(t)),"cathover"===M){I(null,0);const t=document.querySelector(".blocklyToolboxDiv"),e=document.querySelector("[class^=gui_extension-button-container_]");for(let o of[t,e,c,s])o.onmouseenter=g,o.onmouseleave=I}A||(A=!0,t.tab.redux.initialize(),t.tab.redux.addEventListener("statechanged",t=>{switch(t.detail.action.type){case"scratch-gui/navigation/ACTIVATE_TAB":a.style.display=0===t.detail.action.activeTabIndex?"block":"none",l.style.display=0===t.detail.action.activeTabIndex?"block":"none",0===t.detail.action.activeTabIndex&&(g(null,0),i=!0);break;case"scratch-gui/mode/SET_PLAYER":a.style.display=t.detail.action.isPlayerOnly?"none":"block",l.style.display=0===t.detail.action.activeTabIndex?"block":"none"}}),"category"!==M&&"cathover"!==M||(async()=>{for(;;){let e=await t.tab.waitForElement(".scratchCategoryMenuItem",{markAsSeen:!0,condition:()=>!t.tab.redux.state.scratchGui.mode.isPlayerOnly});e.onclick=()=>{if(i&&r===e&&"category"===M)I(),r=e;else{if(i)return void(r=e);g(),r=e}"category"===M&&(i=!i)}}})())}},"style.css":o.n(l).a}}}]);