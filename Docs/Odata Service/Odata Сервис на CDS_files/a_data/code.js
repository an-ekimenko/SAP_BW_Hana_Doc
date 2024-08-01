var def = {
	w: 300,
	h: 250,
	cube: {
		amm: 4,
		toDo: 4,
		r: 75,
		w: 0,
		h: 0,
		data: [],
		container: null,
	},
	box: {
		texPos: {
			x: 300,
			y: 250
		},
	},
};

var o = {};

var playbrepeat;

var oNames = {
    id: 'adArea mainCont dragEl grades preloader',
}

function init(){

// =====================================PB====================================

    Promise.resolve(prepareData())
    .then(()=>{

        Promise.resolve(createCubes()).then(()=>{

            Promise.resolve(adjustCube());
        });
    });


// =========================================================================

    activateButtons();

    initDrag();
    primaryMove();
    mouseEvents();
}

function prepareData(){

    def.cube.w = def.w;
    def.cube.h = def.h;

    for(var i=0; i<def.cube.amm; i++){
        var angle = 360*(i/def.cube.amm);
        var x = def.cube.r * Math.sin(Math.PI * 2 * angle / 360)*2;
        var y = def.cube.r * Math.cos(Math.PI * 2 * angle / 360)*2;

        def.cube.data.push({
            x: x,
            y: y,
            angle: angle,
        });
    }
}


function createCubes(){

// ====================================PB=====================================

    Promise.resolve(createContainer()).then(()=>{

        for(var i=0; i<def.cube.amm; i++){

            if(i < def.cube.toDo){

                createSide(i);
            }
        }
    });

// =========================================================================

}

function createContainer(){
    def.cube.container = document.createElement("div");
    def.cube.container.classList.add("cube");
    def.cube.container.style.width = def.w + "px";
    def.cube.container.style.height = def.h + "px";
    def.cube.container.style.position = "absolute";
    def.cube.container.style.left = 0 + "px";
    def.cube.container.style.top = 0 + "px";
    TweenMax.set(def.cube.container, { z: 0, rotationY: -1800})
    o.mainCont.appendChild(def.cube.container);
}

function createSide(i){
    var data = def.cube.data[i];

    var x = data.x;
    var y = data.y;
    var face = document.createElement("div");

    face.classList.add("face");
    face.setAttribute("id", "face_" + (i + 1));
    face.classList.add("bg_" + (i + 1));

    face.style.left = def.w/2 - def.cube.w/2 + "px";

    face.style.width = def.cube.w + "px";
    face.style.height = def.cube.h + "px";
	setBg(face, slideImages[i]);
    // setBg(face, assets_url+(i+1)+".jpg");

    TweenMax.set(face, {
        x: x,
        z: y,
    })

    TweenMax.set(face, {
        rotationY: data.angle,
    })

    def.cube.container.appendChild(face);
}

function adjustCube(){
   
    var sx = 0.7;
    var sy = 0.7;
    
    TweenMax.set(def.cube.container, {scaleX: sx, scaleY: sy, scaleZ: sx})
}

function getTransforms(el) {

}

function rn(){
    return 20 + (0.5 - Math.random() * 40);
}

/////////////////// D R A G ////////////////////////
var startX, startY, aniTl, dragIcon;
var dragFt = false;
var clickFt = false;
var myDraggable = [];

var d = {
    cur: 0,
    sum: 0,
    del: 0,
    last: 0,
    screen: 1,
    curX: 0,
    curY: 0,
    dx: 0,
    move: 0,
    dir: "",
    f1: false,
    f2: false,
    f3: false,
    f4: false,
    mouseOver: false,
    touch: false,
    frameSeen: 1
}



// ====================================PB=====================================

var animactive = false;

var degree = -1800;

var paused = false;

var oldX = 0;

var newDegree = 0;

var fps = 35, elapsed, then, now, startTime, fpsInterval;


function moveCube(){



    if(!paused){

        requestAnimationFrame(moveCube);
    }

    now = Date.now();

    elapsed = now - then;


    if (elapsed > fpsInterval) {

        then = now - (elapsed % fpsInterval);

        degree--;
    
        TweenMax.to(def.cube.container, 0.1, { rotationY: degree, ease: Power0.easeNone});

    }

}

// =========================================================================


function initDrag(){
    myDraggable.push( addDraggable(o.dragEl) );
}

function addDraggable(dragObj){

    return Draggable.create(dragObj, {

        type: "x",
        bounds: o.adArea,
        edgeResistance: 0.5,
		allowEventDefault: false,
        onPress:function() {
            onPress(this);
        },
        onDrag: function(e) {
            onDrag(this);
        },
        onRelease: function (e) {
			//onRelease(this);
		},
		onDragEnd:function(e){
            onRelease(this);
        }
    })
}

function setBg(el, url) {
	el.style.backgroundImage = "url('" + url + "')";
}

function onPress(el){

    TweenMax.to(def.cube, 0.5, {rotYInc: 0, ease: Power1.easeInOut});
    
    if( !clickFt ){
        clickFt = true;
        dragIcon.kill();
        TweenMax.set('.drag-icon', { opacity: 0 });

        startedFunction();
    }

    paused = true;

}

function onDrag(el, hit, endPos, midEndPos, z, rot, endScale){




    // =================================PB========================================

    clearTimeout(playbrepeat);

    newDegree = degree + el.x - oldX;

    TweenMax.to(def.cube.container, 0.3, {rotationY: newDegree});

     // =========================================================================





     if (d.dir == "right") {
        d.cur = d.sum + d.curX;
        d.dx = d.cur - d.del;

    } else {
        d.cur = d.sum - Math.abs(d.curX);
        d.dx = d.cur - d.del;
    }

    if (!dragFt) {
        dragFt = true;
        
        dragIcon.kill();
        TweenMax.set('.drag-icon', {
            opacity: 0
        });
    }

    d.curX = el.x;
    d.curY = el.y;
    d.dir = el.getDirection();

    d.del += d.dx / 8;
    def.cube.rotYSum += def.cube.rotYInc;
    def.cube.rotY = d.del + def.cube.rotYSum;

}

function onRelease(el, endPos){



    // ====================================PB=====================================

     oldX = el.x;
     degree = newDegree;

     var sideGuess = Math.abs(newDegree % 360);
     var cycle = newDegree + sideGuess;

     if(sideGuess > 50 && sideGuess < 140){
 
        //  console.log('side_2');
         d.screen = 2;
     }
     else if(sideGuess > 140 && sideGuess < 230){
 
        //  console.log('side_3');
         d.screen = 3;
     }
     else if(sideGuess > 230 && sideGuess < 320){
 
        // console.log('side_4');
        d.screen = 4;
    }
     else{
 
        //  console.log('side_1');
         d.screen = 1;
     }
 
     var magnetizer = cycle - 90 * (d.screen - 1);

     if(d.screen === 1 && newDegree < cycle - 315){

        magnetizer -= 360;
     }

     TweenMax.to(def.cube.container, 0.5, {rotationY: magnetizer});

     degree = magnetizer;

     playbrepeat = setTimeout(()=>{
 
         paused = false;
         window.requestAnimationFrame(moveCube);
 
     }, 2000);
     
      // =========================================================================


    whenReleased(el);

}

function whenReleased(el) {
    d.sum = d.cur;

    if (d.dir == "right") {
        startEvent("Swipe_Right");
    }

    if (d.dir == "left") {
        startEvent("Swipe_Left");
    }

    //when slide changed
    if (d.frameSeen != d.screen) {
        startEvent("Seen_Frame_" + d.screen);
        d.frameSeen = d.screen;
    }

    switch (d.screen) {
        case 1:
            d.f1 = true;
            break;
        case 2:
            d.f2 = true;
            break;
        case 3:
            d.f3 = true;
            break;
        case 4:
            d.f4 = true;
            break;
        default:
            break;
    }

    if(d.f2 && d.f3 && d.f4){
        finishedFunction()
    }
}

function mouseEvents() {
	//mouse over
	o.adArea.addEventListener("mouseover", function(){
		if(!d.mouseOver) {
			d.mouseOver = true;
			startEvent("Mouse_Over");
		}
	});
	

	//touch
	o.adArea.addEventListener('touchstart', function(){
		if(!d.touch) {
			d.touch = true;
			startEvent("Touch");
		}
	});
}

function R(max, min) {
    return Math.random() * (max - min) + min
}

function primaryMove() {



    
// ===================================PB======================================

    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    moveCube();

// =========================================================================


    dragIcon = new TimelineMax({ repeat: -1, ease: Power0.easeNone, })
    .to('.drag-icon', 0.7, { delay: 0.4, x: -50})
    .to('.drag-icon', 0.3, { x: 0})
    .to('.drag-icon', 0.7, { delay: 0.4, x: -50})
    .to('.drag-icon', 0.3, { x: 0});

    function animItemInner() {
        TweenMax.to(o.mainCont, 0.8, { 
            //x: R(-4, 4),
            y: R(-4, 4),
            scale: R(1, 0.95),
            //rotation: R(-2, 2),
            ease: Sine.easeInOut, 
            // repeat: -1,
            // yoyo: true,
            onComplete: animItemInner,
        });
    };
    animItemInner();
}


function activateButtons() {
    o.adArea.addEventListener("click", function () {
        ctaFunction()
        startEvent("Click_Frame_" + d.screen);
    });
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();


var assetsCur = 0;
var assetsTotal = 0;
var allLoaded = false;
var kaspinasImg;
var swipe_allowed = false;

function initLoad(){
    prepareElements();
    assetSetLoaded();
}

function prepareElements(){
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
                    var el;
                    if (type == "class"){
                        el = o[this.myCustomData.name][j];
                        el.style.backgroundImage = "url(" + this.src + ")";
                    } else if (type == "id") {
                        el = o[this.myCustomData.name];
                        el.style.backgroundImage = "url(" + this.src + ")";
                    } else if (type == "src") {
                        el = o[this.myCustomData.name];
                        o[this.myCustomData.name].src = this.src;
                    }

                    el.style.position = "absolute";
                    el.style.width = this.width + "px";
                    el.style.height = this.height + "px";

                    if(this.myCustomData.a[this.myCustomData.numb].scale != 1){
                        var scale = 1/this.myCustomData.a[this.myCustomData.numb].scale;
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
    assetsCur++;
    if(assetsCur == 1){
        init();
        TweenMax.to(o.preloader, 0.1, {opacity: 0, display: 'none'});
        TweenMax.to(o.adArea, 0.3, {delay: 0.05, opacity: 1});
        loadOther();
    } else if(assetsCur == assetsTotal){
        allLoaded = true;
    }
}


Object.size = function(obj) {
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