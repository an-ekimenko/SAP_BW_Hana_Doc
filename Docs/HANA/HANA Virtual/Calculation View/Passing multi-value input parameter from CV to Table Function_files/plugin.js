!function(u){var t;function l(){}function f(e){!t&&window&&window.console&&(t=!0,console.log("Deprecated TinyMCE API call: "+e))}function i(i,a,d,s){i=i||this;var c=[];a?(this.add=function(o,r,e){function t(e){var t=[];if("string"==typeof d&&(d=d.split(" ")),d&&"function"!=typeof d)for(var n=0;n<d.length;n++)t.push(e[d[n]]);("function"!=typeof d||(t=d(a,e,i)))&&(d||(t=[e]),t.unshift(s||i),!1===o.apply(r||s||i,t)&&e.stopImmediatePropagation())}f("<target>.on"+a+".add(..)"),i.on(a,t,e);var n={original:o,patched:t};return c.push(n),t},this.addToTop=function(e,t){this.add(e,t,!0)},this.remove=function(n){return c.forEach(function(e,t){if(e.original===n)return c.splice(t,1),i.off(a,e.patched)}),i.off(a,n)},this.dispatch=function(){return i.fire(a),!0}):this.add=this.addToTop=this.remove=this.dispatch=l}function n(s){function e(e,t){u.each(e.split(" "),function(e){s["on"+e]=new i(s,e,t)})}function n(e,t,n){return[t.level,n]}function o(n){return function(e,t){if(!t.selection&&!n||t.selection==n)return[t]}}if(!s.controlManager){s.controlManager={buttons:{},setDisabled:function(e,t){f("controlManager.setDisabled(..)"),this.buttons[e]&&this.buttons[e].disabled(t)},setActive:function(e,t){f("controlManager.setActive(..)"),this.buttons[e]&&this.buttons[e].active(t)},onAdd:new i,onPostRender:new i,add:function(e){return e},createButton:r,createColorSplitButton:r,createControl:r,createDropMenu:r,createListBox:r,createMenuButton:r,createSeparator:r,createSplitButton:r,createToolbar:r,createToolbarGroup:r,destroy:l,get:l,setControlType:r},e("PreInit BeforeRenderUI PostRender Load Init Remove Activate Deactivate","editor"),e("Click MouseUp MouseDown DblClick KeyDown KeyUp KeyPress ContextMenu Paste Submit Reset"),e("BeforeExecCommand ExecCommand","command ui value args"),e("PreProcess PostProcess LoadContent SaveContent Change"),e("BeforeSetContent BeforeGetContent SetContent GetContent",o(!1)),e("SetProgressState","state time"),e("VisualAid","element hasVisual"),e("Undo Redo",n),e("NodeChange",function(e,t){return[s.controlManager,t.element,s.selection.isCollapsed(),t]});var c=s.addButton;s.addButton=function(e,t){var n,o,r,i;function a(){if(s.controlManager.buttons[e]=this,n)return n.apply(this,arguments)}for(var d in t)"onpostrender"===d.toLowerCase()&&(n=t[d],t.onPostRender=a);return n||(t.onPostRender=a),t.title&&(t.title=(o=t.title,r=[s.settings.language||"en",o].join("."),i=u.i18n.translate(r),r!==i?i:u.i18n.translate(o))),c.call(this,e,t)},s.on("init",function(){var e=s.undoManager,t=s.selection;e.onUndo=new i(s,"Undo",n,null,e),e.onRedo=new i(s,"Redo",n,null,e),e.onBeforeAdd=new i(s,"BeforeAddUndo",null,e),e.onAdd=new i(s,"AddUndo",null,e),t.onBeforeGetContent=new i(s,"BeforeGetContent",o(!0),t),t.onGetContent=new i(s,"GetContent",o(!0),t),t.onBeforeSetContent=new i(s,"BeforeSetContent",o(!0),t),t.onSetContent=new i(s,"SetContent",o(!0),t)}),s.on("BeforeRenderUI",function(){var e=s.windowManager;e.onOpen=new i,e.onClose=new i,e.createInstance=function(e,t,n,o,r,i){return f("windowManager.createInstance(..)"),new(u.resolve(e))(t,n,o,r,i)}})}function r(){var t={};function n(){return r()}return f("editor.controlManager.*"),u.each("add addMenu addSeparator collapse createMenu destroy displayColor expand focus getLength hasMenus hideMenu isActive isCollapsed isDisabled isRendered isSelected mark postRender remove removeAll renderHTML renderMenu renderNode renderTo select selectByIndex setActive setAriaProperty setColor setDisabled setSelected setState showMenu update".split(" "),function(e){t[e]=n}),t}}u.util.Dispatcher=i,u.onBeforeUnload=new i(u,"BeforeUnload"),u.onAddEditor=new i(u,"AddEditor","editor"),u.onRemoveEditor=new i(u,"RemoveEditor","editor"),u.util.Cookie={get:l,getHash:l,remove:l,set:l,setHash:l},u.on("SetupEditor",function(e){n(e.editor)}),u.PluginManager.add("compat3x",n),u.addI18n=function(n,e){var r=u.util.I18n,t=u.each;"string"!=typeof n||-1!==n.indexOf(".")?u.is(n,"string")?t(e,function(e,t){r.data[n+"."+t]=e}):t(n,function(e,o){t(e,function(e,n){t(e,function(e,t){"common"===n?r.data[o+"."+t]=e:r.data[o+"."+n+"."+t]=e})})}):r.add(n,e)}}(tinymce);