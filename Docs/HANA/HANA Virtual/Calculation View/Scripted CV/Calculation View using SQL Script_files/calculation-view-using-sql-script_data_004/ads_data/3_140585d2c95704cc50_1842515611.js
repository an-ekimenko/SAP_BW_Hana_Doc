var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
 canvas = document.getElementById("canvas");
 anim_container = document.getElementById("animation_container");
 dom_overlay_container = document.getElementById("dom_overlay_container");
 var comp=AdobeAn.getComposition("B30E0E015953924EA5483F2B2FE04BAA");
 var lib=comp.getLibrary();
 var loader = new createjs.LoadQueue(false);
 loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
 loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
 var lib=comp.getLibrary();
 lib.properties = {
 id: 'B30E0E015953924EA5483F2B2FE04BAA',
 width: 300,
 height: 250,
 fps: 60,
 color: "#FFFFFF",
 opacity: 1.00,
 manifest: [
 {src:"https://dsp-media.eskimi.com/upload/rm/upload/1563202882/MTS_Honor_20_300x250/index_300x250_atlas_P_.png?1562916332198", id:"index_300x250_atlas_P_"}
 ],
 preloads: []
 };
 loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
 var images=comp.getImages();
 if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleComplete(evt,comp) {
 var lib=comp.getLibrary();
 var ss=comp.getSpriteSheet();
 var queue = evt.target;
 var ssMetadata = lib.ssMetadata;
 for(i=0; i<ssMetadata.length; i++) {
 ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
 }
 exportRoot = new lib.index_300x250();
 stage = new lib.Stage(canvas);
 fnStartAnimation = function() {
 stage.addChild(exportRoot);
 createjs.Ticker.setFPS(lib.properties.fps);
 createjs.Ticker.addEventListener("tick", stage);
 }
 function makeResponsive(isResp, respDim, isScale, scaleType) {
 var lastW, lastH, lastS=1;
 window.addEventListener('resize', resizeCanvas);
 resizeCanvas();
 function resizeCanvas() {
 var w = lib.properties.width, h = lib.properties.height;
 var iw = window.innerWidth, ih=window.innerHeight;
 var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
 if(isResp) {
 if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
 sRatio = lastS;
 }
 else if(!isScale) {
 if(iw<w || ih<h)
 sRatio = Math.min(xRatio, yRatio);
 }
 else if(scaleType==1) {
 sRatio = Math.min(xRatio, yRatio);
 }
 else if(scaleType==2) {
 sRatio = Math.max(xRatio, yRatio);
 }
 }
 canvas.width = w*pRatio*sRatio;
 canvas.height = h*pRatio*sRatio;
 canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w*sRatio+'px';
 canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
 stage.scaleX = pRatio*sRatio;
 stage.scaleY = pRatio*sRatio;
 lastW = iw; lastH = ih; lastS = sRatio;
 stage.tickOnUpdate = false;
 stage.update();
 stage.tickOnUpdate = true;
 }
 }
 makeResponsive(false,'both',false,1);
 AdobeAn.compositionLoaded(lib.properties.id);
 fnStartAnimation();
}