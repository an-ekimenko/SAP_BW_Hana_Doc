
// vars
var def = {
  c: 1,
  r: 1,
  w: 300,
  h: 250,
  cube: {
    amm: 0,
    w: 0,
    h: 0,
    z: 300,
    list: [],
  },
  speed: 4,
}

var o = {};

var oNames = {
  id: 'adArea mainCont',
}

function init(){
  prepareData();
  createCubes();
  adjustCube();
  // setTimeout( function(){
    rotateCubes( -1 )
  // }
  // , 1500 );
  activateButtons();
}

function prepareData(){
  def.cube.w = Math.round( def.w / def.c );
  def.cube.h = Math.round( def.h / def.r );
  def.cube.amm = def.r * def.c;

  console.log(def.cube)
}

function createCubes(){
  for(var r=0; r<def.r; r++){
    for(var c=0; c<def.c; c++){
      createCube(r, c);
    }
  }
}

function adjustCube(){
  var cube = document.createElement("div");
  var s = 0.92;
  TweenMax.set(def.cube.list[0], {scaleX: s, scaleY: s, scaleZ: s})
}

function createCube(r, c){
  var add = {x: 1, y: 1};
  if( r == def.r-1 ){
    add.y += -1;
  }
  if( c == def.c-1 ){
    add.x += -1;
  }

  // Vars
  var w = def.cube.w;
  var h = def.cube.h;
  var z = def.cube.z;
  var ats = 0.999 * 0.5 * w * Math.tan(30 * Math.PI/180);

  console.log( w, ats )

  var d = ats * Math.cos(60 * Math.PI/180);
  var f = ats * Math.cos(30 * Math.PI/180);

  var sideCol = "#034b93";
  var sideGrad = "radial-gradient(rgba(227,227,227,1) 0%, rgba(1,1,1,1) 300%)"; 

  // Container
  var cube = document.createElement("div");
  cube.classList.add("cube");
  setCubeSize(cube, {x: 0, y: 0});
  cube.style.left = c * w + "px";
  cube.style.top = r * h + "px";

  TweenMax.set(cube, { z: -ats, })

  // frontFace
  var frontFace = document.createElement("div");
  frontFace.classList.add("face");
  frontFace.classList.add("bg1");
  setCubeSize(frontFace, add);
  var picUrl = assets_url + "bg1.jpg";
  frontFace.style.backgroundImage = "url( "+picUrl+" )";
  frontFace.style.backgroundPosition = (-c * w) + "px " + (-r * h) + "px"; 
  frontFace.style.backgroundRepeat = "no-repeat";
  TweenMax.set(frontFace, { z: ats })
  cube.appendChild(frontFace);

  // leftFace
  var leftFace = document.createElement("div");
  leftFace.classList.add("face");

  var picUrl = assets_url + "bg3.jpg";
  leftFace.style.backgroundImage = "url( "+picUrl+" )";
  leftFace.style.backgroundPosition = (-c * w) + "px " + (-r * h) + "px"; 
  leftFace.style.backgroundRepeat = "no-repeat";

  setSideSize(leftFace, add);
  TweenMax.set(leftFace, { rotationY: -120, z: -d, x: -f, transformOrigin: "50% 50%" })
  setBgImage(leftFace, sideCol, sideGrad);
  cube.appendChild(leftFace);  



  // rightFace
  var rightFace = document.createElement("div");
  rightFace.classList.add("face");
  setSideSize(rightFace, add);
  TweenMax.set(rightFace, { rotationY: 120, z: -d, x: f, transformOrigin: "50% 50%" })
  // setBgImage(rightFace, sideCol, sideGrad);
  var picUrl = assets_url + "bg2.jpg";
  rightFace.style.backgroundImage = "url( "+picUrl+" )";
  rightFace.style.backgroundPosition = (-c * w) + "px " + (-r * h) + "px"; 
  rightFace.style.backgroundRepeat = "no-repeat";
  cube.appendChild(rightFace); 

  // center point
  var cp = document.createElement("div");
  TweenMax.set(cp, { rotationY: 80, x: w/2, transformOrigin: "50% 50%" })
  cp.style.width = 10 + "px";
  cp.style.height = h + "px";
  setBgImage(cp, "red")
  cube.appendChild(cp);  

  // // backFace
  // var backFace = document.createElement("div");
  // backFace.classList.add("face");
  // setCubeSize(backFace, add);
  // TweenMax.set(backFace, { scaleX: -1, rotationY: 0, z: -z-1+z/2 })
  // setBgImage(backFace, sideCol, sideGrad);
  // cube.appendChild(backFace);

  // // topFace
  // var topFace = document.createElement("div");
  // topFace.classList.add("face");
  // setFloorSize(topFace, add);
  // TweenMax.set(topFace, { rotationX: 90, rotationY: 90, z: z/2, transformOrigin: "0% 0%" })
  // setBgImage(topFace, sideCol, sideGrad);
  // cube.appendChild(topFace);  

  // // bottomFace
  // var bottomFace = document.createElement("div");
  // bottomFace.classList.add("face");
  // setFloorSize(bottomFace, add);
  // TweenMax.set(bottomFace, { rotationX: 90, rotationY: 90, z: z/2, y: h+1, transformOrigin: "0% 0%" })
  // setBgImage(bottomFace, sideCol, sideGrad);
  // cube.appendChild(bottomFace);  

  o.mainCont.appendChild(cube);
  def.cube.list.push( cube );
}

function setBgImage(el, color, gradient){
  el.style.backgroundColor = color;
}

function setCubeSize(el, add){
  el.style.width = def.cube.w + add.x + "px";
  el.style.height = def.cube.h + add.y + "px";
}
function setSideSize(el, add){
  el.style.width = def.cube.z + add.x + "px";
  el.style.height = def.cube.h + add.y + "px";
}
function setFloorSize(el, add){
  el.style.width = def.cube.z + add.x + "px";
  el.style.height = def.cube.w + add.y + "px";
}

var a = {
  s1: 0.5,
  s2: 1,
  delAdd: 0.06,
  d0: 0.6,
  d1: 2,
  d2: 1.2,
  dist: 1500,
  dist2: -30000,
  e1: Power2.easeIn,
  e2: Power2.easeOut,
  e3: Back.easeOut.config(0.35),
  to: "50% 50% 50%",
}

var time = 0;

function rotateCubes(side){
  requestAnimFrame(rotateCubes);

  var rot = time;
  var cube = def.cube.list[0];
  TweenMax.set(cube, { rotationY: rot});

  time-= 0.5;
}

function rotateCubes2(side){
  // if( side == 3) side = 0;
  // var side = side % 3;
  // if(sideLast < 0) sideLast = 2;

  // console.log( side, sideLast )

  for(var c=0; c<def.cube.amm; c++){
    var cube = def.cube.list[c];
    // var delay = 0 + c*a.delAdd;

    // var curRot = (side) ? 0 : -90 ;
    // var endRot = (side) ? -90 : 0 ;
    // var curRot = side * 120;
    var endRot = side * 120;
    // var midRot = (curRot + endRot) / 2;

    // TweenMax.to(cube, a.d0, {delay: delay, scaleX: a.s1, scaleY: a.s1, scaleZ: a.s1, ease: Power1.easeInOut, onComplete: function(){
      // TweenMax.to(cube, a.d0, {scaleX: 1, scaleY: 1, scaleZ: 1, ease: Power1.easeInOut});
    // }});

    // TweenMax.to(cube, a.d0, {delay: delay, rotationY: midRot, ease: a.e1, onComplete: function(){
      TweenMax.to(cube, def.speed, { rotationY: endRot, ease: Linear.easeNone});
    // }});
  }
  side -= 1;
  setTimeout( function(){
    rotateCubes( side );
  }, def.speed*1000);

}


function getTransforms(el) {
  console.log( "scaleX: " + el._gsTransform.scaleX + " <br> rotation: " + el._gsTransform.rotation + " <br> x: " + el._gsTransform.x );
}


function rn(){
  return 20 + (0.5 - Math.random() * 40);
}

// function continueAnim(cube){
  // TweenMax.set(cube, {rotationY: 0, z: a.dist2, scaleX: a.s2, scaleY: a.s2, x: 0, y: 0});

  // TweenMax.to(cube, a.d2, {delay: 0, z: 0, ease: a.e3, onComplete: function(){

  //   // cloned :: changed delay to 2.5
  //   TweenMax.to(cube, a.d0, {delay: 2.5, scaleX: a.s1, scaleY: a.s1, x: rn(), y: rn(), z: rn(), transformOrigin: a.to, ease: a.e1, onComplete: function(){
  //     TweenMax.to(this.target, a.d2, {delay: 0.0, z: a.dist, ease: a.e2, onComplete: function(){
  //       TweenMax.set(this.target, {rotationY: 180, z: a.dist2, x: 0, y: 0});
  //       TweenMax.to(this.target, a.d2, {delay: 0.0, z: -def.cube.z -def.cube.z/10 , scaleX: a.s2, scaleY: a.s2, ease: a.e3, onComplete: function(){

  //         TweenMax.to(this.target, a.d1, {delay: 2.5, scaleX: a.s1, scaleY: a.s1, x: rn(), y: rn(), z: -def.cube.z -def.cube.z/10 + rn(), ease: Back.easeOut, ease: a.e1, onComplete: function(){
  //           TweenMax.to(this.target, a.d2, {delay: 0.0, z: a.dist, ease: Power1.easeInOut, ease: a.e2, onComplete: function(){
  //             continueAnim( this.target );
  //           }});
  //         }});
  //       }});
  //     }});
  //   }})
  //   //

  // }});

// }

////////////////// F U N C T I O N S //////////////////////
///////////////////////////

function activateButtons(){
  o.adArea.addEventListener("click", ctaFunction);
}

/////////////////////////////

window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();


var assetsCur = 0;
var assetsTotal = 0;
var allLoaded = false;
var kaspinasImg;
var swipe_allowed = false;

//

function initLoad(){
prepareElements();
loadAsset(assets.init);
}

function prepareElements(){
// id
var names = oNames.id.split(' ');
for(var i=0; i<names.length; i++){
  var name = names[i];
  o[name] = document.getElementById(name);
};
}


function loadOther(){
  assetsTotal =  Object.size(assets);
  for (var prop in assets) {
  	if(prop != "init"){
  		loadAsset(assets[prop]);
  	}
  }
}

function loadMid(){
  loadAsset(assets.mid);
}

function loadEnd(){
  loadAsset(assets.end);
}

function loadAsset(a){
  a.cur_asset_pack = 0;
  a.asset_packs = a.length;

for(var k=0; k<a.asset_packs; k++){
    var names = a[k].names.split(" ");
    a[k].curLoad = 0;

    for (var i=0; i<names.length; i++){
        var img = new Image();
        img.myCustomData = {total: names.length, a:a, name:names[i], numb: k};
        img.onload = function() {
          o[this.myCustomData.name] = document.getElementById(this.myCustomData.name);
          
          var type = this.myCustomData.a[this.myCustomData.numb].type;
          var elAmm = 1;
          if (type == "class"){
            o[this.myCustomData.name] = document.getElementsByClassName(this.myCustomData.name);
            elAmm = o[this.myCustomData.name].length;
          }

          for(var j=0;j<elAmm;j++){
            // console.log(this.myCustomData.name);
            var el;
            if (type == "class"){
              el = o[this.myCustomData.name][j];
              el.style.backgroundImage = "url(" + this.src + ")";
            } else if (type == "id") {
              el = o[this.myCustomData.name];
              el.style.backgroundImage = "url(" + this.src + ")";
            } else if (type == "src") {
              console.log( this.src );
              el = o[this.myCustomData.name];
              o[this.myCustomData.name].src = this.src;
            }

            el.style.position = "absolute";
            el.style.width = this.width + "px";
            el.style.height = this.height + "px";

            if(this.myCustomData.a[this.myCustomData.numb].scale != 1){
              var scale = 1/this.myCustomData.a[this.myCustomData.numb].scale;
              // TweenMax.set(el, {scale: scale, transformOrigin: '0% 0%'});
            }
          }

          countAsset( this.myCustomData.a, this.myCustomData.numb, this.myCustomData.total );
        };
        img.src = assets_url + names[i] + "." + a[k].format;
    }
}
}

function countAsset(asset, o, total){
asset[o].curLoad++;
if(asset[o].curLoad == total) {
	asset.cur_asset_pack++;
	if(asset.cur_asset_pack == asset.asset_packs){
		assetSetLoaded();
	}
}
}

function assetSetLoaded(){
  // console.log("assetSetLoaded");
  assetsCur++;
  if(assetsCur == 1){
  	// adArea.style.opacity = 1;
    init();
  	TweenMax.to(adArea, 0.3, {delay: 0.05, opacity: 1});
    // loadMid();
  	loadOther();
  // } else if(assetsCur == 2) {
    // loadEnd();

    // initDrag();
    // swipe_allowed = true;
  } else if(assetsCur == assetsTotal){
    allLoaded = true;
  }
}

//

Object.size = function(obj) { // get objects ammount in var
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};


if (window.addEventListener) {
  window.addEventListener('load', initLoad(), false);
} else if (window.attachEvent) {
  window.attachEvent('onload', initLoad());
}
