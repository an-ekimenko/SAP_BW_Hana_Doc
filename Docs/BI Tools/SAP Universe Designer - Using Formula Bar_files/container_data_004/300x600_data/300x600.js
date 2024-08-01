(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"300x600_atlas_1", frames: [[0,0,400,737],[252,739,100,198],[0,739,250,250]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Магнелэнд1020q = function() {
	this.initialize(ss["300x600_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.icon = function() {
	this.initialize(ss["300x600_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.pack = function() {
	this.initialize(ss["300x600_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4D2E67").s().p("A3bQXMAAAggtMAu3AAAMAAAAgtg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-104.7,300,209.4);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.pack();
	this.instance.setTransform(-70,-70,0.56,0.56);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-70,140,140);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.icon();
	this.instance.setTransform(-150,-268);

	this.instance_1 = new lib.Магнелэнд1020q();
	this.instance_1.setTransform(-150,-277,0.815,0.8176);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-277,326,602.6);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBCC90").s().p("AhAByIgGgCIAAgRQAKgBAFgEQAGgDADgKIAIgbQAEgQAHgIQAHgKAGgCIAAgBQgHgCgIgDQgIgEgGgHQgHgIgEgKQgFgMAAgOQAAghASgSQASgQAmAAIAfABQANABAMAEIAADcIgmAAIAAhZIgIAAIgGABIgGAEIgHAIIgFAOIgHAbQgGATgJAKQgKAJgRAAQgJAAgHgBgAgLhQQgJAKAAAXQAAAYAJALQAJAKARAAIASAAIAAhYIgSAAQgRAAgJAKg");
	this.shape.setTransform(98.475,24.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBCC90").s().p("AAgBwIAAiVIgCAAIg7CVIgnAAIAAjfIAlAAIAACSIACAAIA6iSIAoAAIAADfg");
	this.shape_1.setTransform(82.925,24.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FBCC90").s().p("AAdBwIAAhlIg5AAIAABlIgmAAIAAjfIAmAAIAABhIA5AAIAAhhIAmAAIAADfg");
	this.shape_2.setTransform(65.875,24.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBCC90").s().p("Ag2BwIAAjfIBtAAIAAAZIhHAAIAADGg");
	this.shape_3.setTransform(51.775,24.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FBCC90").s().p("AApBwIgOg4Ig2AAIgNA4IgpAAIA6jfIAvAAIA5DfgAgVAeIArAAIgWhaIAAAAg");
	this.shape_4.setTransform(36.35,24.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FBCC90").s().p("ABFBwIgJiWIgBAAIgqB7IgiAAIgph7IgBAAIgICWIglAAIAMjfIAqAAIAyCXIAAAAIAziXIAqAAIAMDfg");
	this.shape_5.setTransform(16.55,24.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FBCC90").s().p("AApBwIgNg4Ig2AAIgPA4IgnAAIA5jfIAvAAIA6DfgAgWAeIAsAAIgVhaIgBAAg");
	this.shape_6.setTransform(-10.25,24.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FBCC90").s().p("AgSBwIAAjGIgyAAIAAgZICJAAIAAAZIgyAAIAADGg");
	this.shape_7.setTransform(-25.075,24.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FBCC90").s().p("AAgBwIAAiVIgCAAIg7CVIgnAAIAAjfIAlAAIAACSIACAAIA6iSIAoAAIAADfg");
	this.shape_8.setTransform(-40.425,24.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FBCC90").s().p("AA0CIQgFgJgDgNQgEgLgBgPIhyAAIAAjfIAnAAIAADGIA1AAIAAjGIAmAAIAADGIAVAAIAABJg");
	this.shape_9.setTransform(-56.95,26.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FBCC90").s().p("AAgBwIAAiVIgCAAIg7CVIgnAAIAAjfIAlAAIAACSIACAAIA6iSIAoAAIAADfg");
	this.shape_10.setTransform(-74.925,24.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FBCC90").s().p("AgSB2IAAgUQgUgCgQgIQgQgHgLgNQgMgMgFgSQgHgRABgVQgBgVAHgQQAFgRAMgNQALgMAQgIQAQgHAUgDIAAgUIAmAAIAAAUQATADAQAHQAQAIAMAMQAKANAHARQAFAQAAAVQAAAVgFARQgHASgKAMQgMANgQAHQgQAIgTACIAAAUgAAUBJQAHAAAJgFQAJgFAHgKQAGgJAFgNQAEgOAAgRQAAgQgEgNQgFgOgGgKQgHgJgJgFQgJgFgHAAgAgjhDQgJAFgGAJQgIAKgDAOQgFANAAAQQAAARAFAOQADANAIAJQAGAKAJAFQAIAFAJAAIAAiRQgJAAgIAFg");
	this.shape_11.setTransform(-94.4,24.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FBCC90").s().p("Ag5BwIAAjfIBzAAIAAAZIhNAAIAABFIBEAAIAAAZIhEAAIAABPIBNAAIAAAZg");
	this.shape_12.setTransform(-111.875,24.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FBCC90").s().p("AA/CIQgFgJgDgNQgDgLgBgPIhkAAQgBAPgEALQgEANgEAJIgYAAIAAhJIAPAAQAEgGAEgJIAGgUQACgMABgQIAGiHIBzAAIAADGIAUAAIAABJgAgQAAQAAAQgDAMIgGAUQgDAJgEAGIA8AAIAAiwIgnAAg");
	this.shape_13.setTransform(-128.45,26.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FBCC90").s().p("AAgBwIAAiVIgCAAIg7CVIgnAAIAAjfIAlAAIAACSIACAAIA6iSIAoAAIAADfg");
	this.shape_14.setTransform(35.525,-6.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FBCC90").s().p("ABFBwIgJiWIgBAAIgpB7IgjAAIgph7IgBAAIgJCWIglAAIAOjfIApAAIAyCXIABAAIAziXIApAAIANDfg");
	this.shape_15.setTransform(15.25,-6.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FBCC90").s().p("AAqBwIgPg4Ig1AAIgPA4IgnAAIA5jfIAvAAIA5DfgAgWAfIAsAAIgWhbIAAAAg");
	this.shape_16.setTransform(-4.55,-6.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FBCC90").s().p("ABFBwIgJiWIgBAAIgpB7IgjAAIgph7IgBAAIgJCWIglAAIAOjfIApAAIAyCXIAAAAIA0iXIApAAIANDfg");
	this.shape_17.setTransform(-24.35,-6.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FBCC90").s().p("AgdBtQgOgGgKgNQgKgNgEgXQgGgVAAghQAAggAGgWQAEgWAKgNQAKgNAOgGQANgGAQAAQARAAAOAGQANAGAJANQAKANAGAWQAEAWAAAgQAAAhgEAVQgGAXgKANQgJANgNAGQgOAGgRAAQgQAAgNgGgAgMhYQgGAFgFAKQgFALgDARQgDASAAAbQAAAcADARQADATAFAKQAFALAGAEQAGAEAGAAQAGAAAHgEQAGgEAFgLQAFgKADgTQADgRAAgcQAAgbgDgSQgDgRgFgLQgFgKgGgFQgHgEgGAAQgGAAgGAEg");
	this.shape_18.setTransform(-44.3,-6.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FBCC90").s().p("AgSBwIAAjFIgyAAIAAgaICJAAIAAAaIgyAAIAADFg");
	this.shape_19.setTransform(-59.275,-6.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FBCC90").s().p("AAdBwIAAjFIg5AAIAADFIgmAAIAAjfICFAAIAADfg");
	this.shape_20.setTransform(-74.425,-6.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FBCC90").s().p("ABFBwIgJiWIgBAAIgpB7IgjAAIgph7IgBAAIgJCWIglAAIAOjfIApAAIAyCXIAAAAIA0iXIApAAIANDfg");
	this.shape_21.setTransform(-94.55,-6.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FBCC90").s().p("AAgBwIAAiVIgCAAIg7CVIgnAAIAAjfIAlAAIAACSIACAAIA6iSIAoAAIAADfg");
	this.shape_22.setTransform(-114.825,-6.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FBCC90").s().p("AgUBtQgOgFgJgNQgKgNgFgWQgEgXAAghQAAghAEgWQAFgWAJgNQAJgNAOgGQANgFARAAQARAAANACQAOABAHADIAAASIgnAAQgKAAgIAEQgIAEgGAKQgGALgDARQgEASAAAaQAAAbAEARQADASAHAKQAGALAIAEQAJAEAMAAIAmAAIAAARIgVAGQgNABgRAAQgSAAgOgGg");
	this.shape_23.setTransform(-129.725,-6.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FBCC90").s().p("AgoBwQgMgBgMgEIAAjcIAmAAIAABaIAHgBIAIgBIAGgBIAFAAQAhAAAQARQAQARAAAlQAAAigRASQgSARgmAAQgTAAgNgCgAgaBaIASAAQARAAAJgKQAJgLAAgYQAAgNgCgKQgCgIgFgFQgFgGgHgDQgGAAgIAAIgSAAg");
	this.shape_24.setTransform(10.75,-37.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FBCC90").s().p("AgSBwIAAjFIgyAAIAAgaICJAAIAAAaIgyAAIAADFg");
	this.shape_25.setTransform(-4.225,-37.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FBCC90").s().p("AhFBwQgNgBgMgEIAAjcIAmAAIAABaIAHgBIAIgBIAHgBIAFAAQAfAAAQARQAQARAAAlQAAAigRASQgRARgmAAQgTAAgMgCgAg4BaIASAAQARAAAJgKQAJgLAAgYQAAgNgCgKQgDgIgEgFQgFgGgGgDQgHAAgIAAIgSAAgAA5BuIAAjfIAmAAIAADfg");
	this.shape_26.setTransform(-22.175,-37.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FBCC90").s().p("AgoBwQgNgBgLgEIAAjcIB3AAIAAAaIhRAAIAAA9IASAAQAmAAASASQARAQAAAlQAAAigRASQgSARgmAAQgTAAgNgCgAgaBaIASAAQARAAAJgKQAJgLAAgYQAAgZgJgLQgJgJgRAAIgSAAg");
	this.shape_27.setTransform(-40.65,-37.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FBCC90").s().p("AgSBwIAAjFIgyAAIAAgaICJAAIAAAaIgyAAIAADFg");
	this.shape_28.setTransform(-62.625,-37.55);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FBCC90").s().p("AghBwIgRgFIAAgRIAXAAQAGgBAFgBQAFgCAEgFQAEgEADgJQADgJACgNQgRABgNgLQgMgLgFgRIghh5IAnAAIAgB2QACAHADAFQAFAEAEAAIAbiGIAnAAIgjCtQgLA2gsAAIgTgCg");
	this.shape_29.setTransform(-77.1,-37.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FBCC90").s().p("Ag2BwIAAjfIBtAAIAAAaIhHAAIAADFg");
	this.shape_30.setTransform(-89.825,-37.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FBCC90").s().p("AgeBtQgNgGgKgNQgKgNgEgXQgGgVAAghQAAggAGgWQAEgVAKgOQAKgOANgFQAOgGAQAAQARAAAOAGQANAFAJAOQAKAOAFAVQAFAWABAgQgBAhgFAVQgFAXgKANQgJANgNAGQgOAGgRAAQgQAAgOgGgAgMhYQgGAFgFAKQgFAKgDASQgDATAAAaQAAAcADARQADATAFAKQAFALAGADQAGAFAGAAQAGAAAHgFQAGgDAFgLQAFgKADgTQADgRAAgcQAAgagDgTQgDgSgFgKQgFgKgGgFQgHgEgGAAQgGAAgGAEg");
	this.shape_31.setTransform(-105.4,-37.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FBCC90").s().p("ABFBwIgJiWIgBAAIgpB7IgiAAIgqh7IgBAAIgJCWIglAAIANjfIAqAAIAyCXIABAAIAyiXIAqAAIAMDfg");
	this.shape_32.setTransform(-125.35,-37.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-139.5,-57,248.6,102.9);


(lib.name = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4D2E67").s().p("ABvDuQgJgRgGgVQgFgVgDgZIivAAQgCAZgGAVQgGAVgIARIgrAAIAAiBIAcAAQAHgKAGgQQAFgOAFgUQAEgVACgcIALjtIDIAAIAAFaIAlAAIAACBgAgcAAQgCAcgEAVIgJAiQgHAQgGAKIBpAAIAAkzIhEAAg");
	this.shape.setTransform(124.725,-4.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4D2E67").s().p("AAzDEIAAixIhkAAIAACxIhEAAIAAmHIBEAAIAACrIBkAAIAAirIBDAAIAAGHg");
	this.shape_1.setTransform(92.225,-8.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4D2E67").s().p("AhJDGQgYgDgMgFIAAgeIBCAAQATgBAQgGQAOgHAMgQQALgQAGgcQAHgbABgqIhxAAIAAgsIBxAAQgCgmgGgaQgHgagKgPQgLgPgNgGQgOgFgRgBIhDAAIAAgeQANgEAXgFQAYgCAdAAQAeAAAXAJQAYAKAQAWQAQAXAIAnQAIAnAAA6QAAA6gIAoQgIAngRAXQgQAWgZAKQgYAKgggBQgdAAgYgDg");
	this.shape_2.setTransform(61.95,-8.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4D2E67").s().p("Ah+DEIgKgDIAAgfQAKAAAJgEQAJgFAIgKQAHgKAEgRQAFgQABgYIAOkSIDOAAIAAGHIhDAAIAAlaIhKAAIgMDlQgCAhgGAYQgHAXgKAPQgLAOgOAHQgOAHgRAAQgSAAgLgDg");
	this.shape_3.setTransform(31.425,-8.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4D2E67").s().p("AhlDEIAAmHIDLAAIAAAsIiIAAIAAB5IB3AAIAAAsIh3AAIAACJICIAAIAAAtg");
	this.shape_4.setTransform(4.225,-8.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4D2E67").s().p("AAzDEIAAixIhkAAIAACxIhEAAIAAmHIBEAAIAACrIBkAAIAAirIBDAAIAAGHg");
	this.shape_5.setTransform(-26.575,-8.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4D2E67").s().p("AhgDEIAAmHIDBAAIAAAsIh9AAIAAFbg");
	this.shape_6.setTransform(-54.025,-8.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4D2E67").s().p("ABJDEIgZhiIhfAAIgZBiIhGAAIBlmHIBTAAIBlGHgAgmA1IBNAAIgmifIgBAAg");
	this.shape_7.setTransform(-83.725,-8.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#4D2E67").s().p("AB5DEIgQkJIgCAAIhIDaIg9AAIhIjaIgCAAIgPEJIhBAAIAXmHIBJAAIBYEJIABAAIBZkJIBIAAIAXGHg");
	this.shape_8.setTransform(-121.125,-8.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("A3bHnIAAvNMAu3AAAIAAPNg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.name, new cjs.Rectangle(-150,-48.7,300,97.4), null);


(lib.li6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBdIAAgeIAeAAIAAAegAgUArQAAgMACgIQADgJAEgHIAJgLIAHgLQAFgGACgGQADgHAAgJQAAgPgHgHQgIgIgLAAIgiAAIAAgPQAGgCALgBQALgBANAAQAYAAANAMQANANAAAYQAAALgDAIQgDAIgEAHIgKALIgJAMQgFAFgDAHQgEAIAAAJg");
	this.shape.setTransform(252.775,-0.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AguBCIgEgBIAAgNQAGAAAEgDIAEgFIAGgQQAEgKAEgDQAEgEAGgBIAAgBQgHgBgGgCQgGgDgEgDQgFgEgCgGQgEgHAAgIQAAgNAFgHQADgJAHgFQAHgEAKgCQAJgCALAAIAZACQAKABAKACIAAB/IgfAAIAAgxIgFAAQgKAAgEAMIgHATQgEAJgGAGQgHAGgKgBIgNgBgAgBgvQgDABgDACQgEADgBAFQgCAEAAAHQAAAGACAEQABAFAEACQADADADABIAHABIAOAAIAAguIgOAAIgHACg");
	this.shape_1.setTransform(242.1,1.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AATBBIAAhRIgBAAIgkBRIgeAAIAAiBIAdAAIAABPIABAAIAhhPIAjAAIAACBg");
	this.shape_2.setTransform(231.1,1.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_3.setTransform(218.875,1.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWBCQgIgCgFgEQgGgFgDgJQgDgHAAgNQAAgNADgIQADgHAGgFQAGgEAIgCQAIgBAJgBIAKABIALACIAAgLQAAgPgIgFQgGgGgNAAIgaAAIAAgNIAQgDIAQgCQAMAAAKACQAKACAGAFQAIAEACAKQAEAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgKAAQgIAAgHgBgAgDADQgDACgEADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQAEACADABIAGABQAFAAADgBIAGgEIAAgqIgOAAIgGABg");
	this.shape_4.setTransform(206.8,1.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgdBCQgLgBgKgCIAAh9QAKgCAKgBIAYgCQAMAAAKACQAJACAHAEQAHAEADAHQADAHAAALQAAAGgCAFIgFAIIgGAEIgHADIAAACIAJACQAEACAEAFQAEAEACAFQADAGAAAGQAAAMgEAHQgDAJgHAEQgHAEgKACQgLABgMAAIgagBgAgTAxIAQAAIAHgBQAEgBADgCQADgDACgEQACgFAAgFQAAgNgHgEQgGgFgIABIgQAAgAgTgKIANAAIAHgBIAGgEIAEgFQACgEAAgFQAAgGgCgDIgEgGQgDgCgEgBIgGgCIgNAAg");
	this.shape_5.setTransform(195.975,1.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgyBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIALgBQAKAAAHACQAHACAGAFQAGAEADAIQADAIAAANQAAAOgDAIQgDAIgHAFQgGAFgJACQgJABgMAAIgagBgAgnAwIAPAAIAHgBIAGgEIAEgHQACgFAAgIQAAgGgCgFIgEgHIgGgEIgHgBIgPAAgAAoBAIAAiBIAfAAIAACBg");
	this.shape_6.setTransform(181.425,1.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBBIgGgBIAAgNQAHAAAGgHQAGgGABgQIAFhXIBYAAIAACBIggAAIAAhuIgaAAIgEBEQgBAWgKALQgJALgNAAIgMgBg");
	this.shape_7.setTransform(166.3,1.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgWBCQgIgCgFgEQgGgFgDgJQgDgHAAgNQAAgNADgIQADgHAGgFQAGgEAIgCQAHgBAKgBIAKABIALACIAAgLQAAgPgIgFQgGgGgNAAIgaAAIAAgNIAQgDIAQgCQAMAAAKACQAKACAGAFQAIAEACAKQAEAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgJAAQgJAAgHgBgAgDADQgEACgDADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQADACAEABIAGABQAFAAADgBIAGgEIAAgqIgOAAIgGABg");
	this.shape_8.setTransform(155.15,1.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAOA+QgHgHgCgKIgGgYQgCgHgEgEQgDgDgFAAIgEAAIAAA6IgfAAIAAiBIAfAAIAAA0IAEAAQADAAACgDQADgCADgJIAHgUQAEgJAHgGQAGgGAMAAIAGABIAGABIAFABIAAANQgHAAgDACIgFAGIgGARQgEALgFAFQgFAFgGABIAAACQAHABAHAEQAGAGADAMIAFAVQABAEAEADQAEADAGAAIAAANIgFABIgMABQgMAAgIgFg");
	this.shape_9.setTransform(144.925,1.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgWBAQgJgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAMAAAKAEQAKAEAHAIQAGAIADAMQAEANAAASQAAASgEANQgDANgGAIQgHAIgKAEQgKADgMAAQgMAAgKgDgAgHgvQgEACgDAFQgCAGgDAKQgBAKAAAOQAAAPABAKQADAKACAFQADAGAEACQAEACADABQAEgBAEgCQAEgCACgGQADgFACgKQABgKABgPQgBgOgBgKQgCgKgDgGQgCgFgEgCQgEgDgEAAQgDAAgEADg");
	this.shape_10.setTransform(132.85,1.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AARBBIAAhtIgiAAIAABtIgfAAIAAiBIBhAAIAACBg");
	this.shape_11.setTransform(121.025,1.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_12.setTransform(103.975,1.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AATBBIAAhRIgBAAIgkBRIgeAAIAAiBIAdAAIAABPIABAAIAihPIAiAAIAACBg");
	this.shape_13.setTransform(92.4,1.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_14.setTransform(80.175,1.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_15.setTransform(68.625,1.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("ABABUQgEgHgDgJQgDgKgBgMIiHAAIAAiBIAfAAIAABuIAcAAIAAhuIAfAAIAABuIAcAAIAAhuIAfAAIAABuIAQAAIAAA5g");
	this.shape_16.setTransform(54.675,3.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgeBbIgLgEIAAgNIARAAQAFAAAEgBQAEgCADgDQADgEACgHIAEgRQgLAAgJgIQgJgJgDgOIgXhkIAeAAIAXBkIABAFIACADIADABIAVhtIAdAAIgYCDQgFAcgMAMQgLAMgSAAQgIAAgHgBg");
	this.shape_17.setTransform(39.325,4.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("ABABUQgEgHgDgJQgDgKgBgMIiHAAIAAiBIAfAAIAABuIAcAAIAAhuIAfAAIAABuIAcAAIAAhuIAfAAIAABuIAQAAIAAA5g");
	this.shape_18.setTransform(25.325,3.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgYBZQgLgFgIgLQgHgLgFgSQgEgRAAgbQAAgZAEgSQAFgSAHgLQAIgLALgFQALgFANABQAOgBALAFQAKAFAJALQAHALAEASQAFASAAAZQAAAbgFARQgEASgHALQgJALgKAFQgLAEgOAAQgNAAgLgEgAgKhHQgEADgFAJQgDAJgDAOQgCAPgBAVQABAWACAPQADAPADAIQAFAIAEAEQAFADAFAAQAFAAAFgDQAGgEADgIQAEgIADgPQACgPAAgWQAAgVgCgPQgDgOgEgJQgDgJgGgDQgFgEgFABQgFgBgFAEg");
	this.shape_19.setTransform(9.15,-0.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.li6, new cjs.Rectangle(0,-17,259.4,34), null);


(lib.li5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBdIAAgeIAeAAIAAAegAgUArQAAgMACgIQADgJAEgHIAJgLIAHgLQAFgGACgGQADgHAAgJQAAgPgHgHQgIgIgLAAIgiAAIAAgPQAGgCALgBQALgBANAAQAYAAANAMQANANAAAYQAAALgDAIQgDAIgEAHIgKALIgJAMQgFAFgDAHQgEAIAAAJg");
	this.shape.setTransform(216.775,-0.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAUBBIAAhRIgCAAIgjBRIggAAIAAiBIAfAAIAABPIABAAIAghPIAiAAIAACBg");
	this.shape_1.setTransform(206.3,1.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgoBBIAAiBIBRAAIAAAUIgyAAIAABtg");
	this.shape_2.setTransform(196.3,1.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgWBAQgJgEgHgIQgGgIgEgNQgDgNAAgSQAAgSADgNQAEgMAGgIQAHgIAJgEQAKgEAMAAQANAAAJAEQAKAEAGAIQAHAIADAMQAEANAAASQAAASgEANQgDANgHAIQgGAIgKAEQgJADgNAAQgMAAgKgDgAgHgvQgEACgDAFQgDAGgBAKQgCAKAAAOQAAAPACAKQABAKADAFQADAGAEACQADACAEABQAFgBADgCQAEgCACgGQAEgFABgKQACgKgBgPQABgOgCgKQgBgKgEgGQgCgFgEgCQgDgDgFAAQgEAAgDADg");
	this.shape_3.setTransform(185.25,1.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgxBcIAAi1IAWAAIAEAIIABAAIALgHQAHgDAKAAQAJAAAJADQAIAEAFAIQAHAIADANQADANAAASQAAATgDAMQgDAMgHAIQgGAJgIADQgJAEgLAAQgFAAgGgCIgKgFIAAA4gAgMhIIgGAEIAABXIAGAEQAEACAFAAQADAAAFgDQAEgCADgFQADgGACgJQACgJAAgPQAAgOgCgKQgCgKgDgFQgDgGgEgCQgFgCgDAAQgFAAgEABg");
	this.shape_4.setTransform(173.95,4.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgWBAQgJgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAMAAALAEQAJAEAHAIQAGAIAEAMQADANAAASQAAASgDANQgEANgGAIQgHAIgJAEQgLADgMAAQgMAAgKgDgAgHgvQgEACgDAFQgDAGgCAKQgBAKAAAOQAAAPABAKQACAKADAFQADAGAEACQAEACADABQAFgBADgCQAEgCACgGQADgFACgKQABgKABgPQgBgOgBgKQgCgKgDgGQgCgFgEgCQgDgDgFAAQgDAAgEADg");
	this.shape_5.setTransform(162,1.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAsBUQgDgHgDgJQgCgKgCgMIhEAAQgBAMgCAKQgDAJgEAHIgUAAIAAg5IAMAAQAEgFADgIQAEgJABgMIAEhMIBVAAIAABuIAPAAIAAA5gAgJgHQgBAMgDAJQgEAIgDAFIAlAAIAAhaIgXAAg");
	this.shape_6.setTransform(149.65,3.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeBbIgLgEIAAgNIARAAQAFAAAEgBQAEgCADgDQADgEACgHIAEgRQgLAAgJgIQgJgJgDgOIgXhkIAeAAIAXBkIABAFIACADIADABIAVhtIAdAAIgYCDQgFAcgMAMQgLAMgSAAQgIAAgHgBg");
	this.shape_7.setTransform(137.625,4.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgNBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAKAAAJACIAOADIAAANIgcAAQgGAAgFADQgDACgEAGQgDAFgCAKQgCAJAAAOQAAAPACAJQACAKADAFQAEAGAEACQAGACAGAAIAdAAIAAAOIgPADQgJABgKAAQgMAAgLgDg");
	this.shape_8.setTransform(127.825,1.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_9.setTransform(111.875,1.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgyBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIALgBQAKAAAHACQAHACAGAFQAGAEADAIQADAIAAANQAAAOgDAIQgDAIgHAFQgGAFgJACQgJABgMAAIgagBgAgnAwIAPAAIAHgBIAGgEIAEgHQACgFAAgIQAAgGgCgFIgEgHIgGgEIgHgBIgPAAgAAoBAIAAiBIAfAAIAACBg");
	this.shape_10.setTransform(98.125,1.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_11.setTransform(83.775,1.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AARBBIAAgvIgMACIgNABQgIAAgHgCQgHgCgGgEQgFgEgEgJQgDgGAAgMIAAguIAfAAIAAAuQAAAGACAEQACAFADACIAHACIAHABIANAAIAAhCIAgAAIAACBg");
	this.shape_12.setTransform(71.625,1.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_13.setTransform(60.725,1.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhKBBIAAiBIAfAAIAABtIAcAAIAAhtIAfAAIAABtIAcAAIAAhtIAfAAIAACBg");
	this.shape_14.setTransform(46.525,1.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgyBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIALgBQAKAAAHACQAHACAGAFQAGAEADAIQADAIAAANQAAAOgDAIQgDAIgHAFQgGAFgJACQgJABgMAAIgagBgAgnAwIAPAAIAHgBIAGgEIAEgHQACgFAAgIQAAgGgCgFIgEgHIgGgEIgHgBIgPAAgAAoBAIAAiBIAfAAIAACBg");
	this.shape_15.setTransform(29.525,1.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AA4BbIgHh7IgBAAIgiBlIgbAAIgihlIgBAAIgHB7IgeAAIALi1IAiAAIAoB7IABAAIAph7IAhAAIALC1g");
	this.shape_16.setTransform(11.875,-0.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.li5, new cjs.Rectangle(0,-17,223.4,34), null);


(lib.li4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBdIAAgeIAeAAIAAAegAgUArQAAgMACgIQADgJAEgHIAJgLIAHgLQAFgGACgGQADgHAAgJQAAgPgHgHQgIgIgLAAIgiAAIAAgPQAGgCALgBQALgBANAAQAYAAANAMQANANAAAYQAAALgDAIQgDAIgEAHIgKALIgJAMQgFAFgDAHQgEAIAAAJg");
	this.shape.setTransform(273.075,-0.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgWBCQgIgCgFgEQgGgFgDgJQgDgHAAgNQAAgNADgIQADgHAGgFQAGgEAIgCQAHgBAKgBIAKABIALACIAAgLQAAgPgIgFQgGgGgNAAIgaAAIAAgNIAPgDIARgCQAMAAAKACQAKACAGAFQAIAEACAKQAEAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgJAAQgJAAgHgBgAgDADQgEACgDADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQADACAEABIAGABQAFAAADgBIAGgEIAAgqIgOAAIgGABg");
	this.shape_1.setTransform(262.7,1.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_2.setTransform(251.275,1.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAKAAAJACIAOADIAAANIgcAAQgGAAgFADQgDACgEAGQgDAFgCAKQgCAJAAAOQAAAPACAJQACAKADAFQAEAGAEACQAGACAGAAIAdAAIAAAOIgPADQgJABgKAAQgMAAgLgDg");
	this.shape_3.setTransform(240.925,1.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgtBCIgGgBIAAgNQAIAAACgDIAFgFIAHgQQADgKADgDQAFgEAGgBIAAgBQgHgBgGgCQgGgDgEgDQgFgEgDgGQgCgHAAgIQAAgNADgHQAEgJAHgFQAHgEAJgCQAKgCALAAIAZACQALABAKACIAAB/IggAAIAAgxIgFAAQgJAAgGAMIgGATQgEAJgHAGQgFAGgMgBIgLgBgAgBgvQgEABgDACQgDADgBAFQgCAEAAAHQAAAGACAEQABAFADACQADADAEABIAHABIAOAAIAAguIgOAAIgHACg");
	this.shape_4.setTransform(224.15,1.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AATBBIAAhRIgBAAIgjBRIggAAIAAiBIAfAAIAABPIABAAIAhhPIAhAAIAACBg");
	this.shape_5.setTransform(213.15,1.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_6.setTransform(200.925,1.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_7.setTransform(189.375,1.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhKBBIAAiBIAfAAIAABtIAcAAIAAhtIAfAAIAABtIAcAAIAAhtIAfAAIAACBg");
	this.shape_8.setTransform(175.175,1.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgeBbIgLgEIAAgNIARAAQAFAAAEgBQAEgCADgDQADgEACgHIAEgRQgLAAgJgIQgJgJgDgOIgXhkIAeAAIAXBkIABAFIACADIADABIAVhtIAdAAIgYCDQgFAcgMAMQgLAMgSAAQgIAAgHgBg");
	this.shape_9.setTransform(160.625,4.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgxBcIAAi1IAWAAIAEAIIABAAIALgHQAHgDAKAAQAJAAAJADQAIAEAFAIQAHAIADANQADANAAASQAAATgDAMQgDAMgHAIQgGAJgIADQgJAEgLAAQgFAAgGgCIgKgFIAAA4gAgMhIIgGAEIAABXIAGAEQADACAGAAQADAAAFgDQAEgCADgFQADgGACgJQACgJAAgPQAAgOgCgKQgCgKgDgFQgDgGgEgCQgFgCgDAAQgGAAgDABg");
	this.shape_10.setTransform(149.55,4.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgXBCQgGgCgGgEQgGgFgDgJQgDgHAAgNQAAgNADgIQADgHAGgFQAGgEAHgCQAJgBAJgBIAKABIALACIAAgLQAAgPgHgFQgIgGgMAAIgZAAIAAgNIAOgDIARgCQAMAAAKACQAKACAGAFQAHAEAEAKQADAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgJAAQgJAAgIgBgAgEADQgCACgEADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQAEACACABIAHABQAEAAAEgBIAGgEIAAgqIgOAAIgHABg");
	this.shape_11.setTransform(137.35,1.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_12.setTransform(125.925,1.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_13.setTransform(108.875,1.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAUBBIAAhRIgCAAIgjBRIggAAIAAiBIAeAAIAABPIACAAIAghPIAiAAIAACBg");
	this.shape_14.setTransform(97.3,1.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhKBBIAAiBIAfAAIAABtIAcAAIAAhtIAfAAIAABtIAcAAIAAhtIAfAAIAACBg");
	this.shape_15.setTransform(82.425,1.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgcBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIAKgBQAKAAAIACQAIACAGAFQAGAEADAIQAEAIAAANQAAAOgEAIQgDAIgHAFQgGAFgKACQgKABgLAAIgagBgAgRAwIAPAAQADAAADgBQAEgBADgDQADgDACgEQABgFAAgIQAAgGgBgFQgCgEgDgDQgDgDgEgBIgGgBIgPAAg");
	this.shape_16.setTransform(68.425,1.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgzBBIgEgBIAAgNQAGAAAGgHQAGgGABgQIAFhXIBXAAIAACBIgfAAIAAhuIgaAAIgEBEQgBAWgKALQgJALgNAAIgNgBg");
	this.shape_17.setTransform(55.5,1.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgVBAQgKgEgHgIQgGgIgDgNQgEgNAAgSQAAgSAEgNQADgMAGgIQAHgIAKgEQAJgEAMAAQAMAAALAEQAJAEAGAIQAHAIADAMQAEANAAASQAAASgEANQgDANgHAIQgGAIgJAEQgLADgMAAQgMAAgJgDgAgIgvQgDACgDAFQgCAGgCAKQgCAKAAAOQAAAPACAKQACAKACAFQADAGADACQAEACAEABQAEgBAEgCQAEgCADgGQADgFABgKQABgKAAgPQAAgOgBgKQgBgKgDgGQgDgFgEgCQgEgDgEAAQgEAAgEADg");
	this.shape_18.setTransform(44.6,1.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AglBPQgOgPAAgiIAAgqQAAgWAEgPQADgPAIgJQAJgJANgEQANgEASgBIAfgBIACAMQgHAEgJACIgVADQgJACgFACQgGACgFAGQgEAFgCAIQgCAIAAALIAKgEQAGgCAGAAQAYAAANAPQANAPAAAhQAAAigOAPQgNAOgZAAQgYAAgNgOgAgOgNIgGAEIAAAnQAAANACAKQACAJADAFQADAFADACQAEACADABQAEgBAEgCQAEgCADgFQACgFACgJQACgKAAgNQAAgNgCgJQgCgIgDgFQgEgFgEgCQgFgDgFAAQgGAAgEACg");
	this.shape_19.setTransform(33,-0.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_20.setTransform(21.525,1.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAXBbIAAhSIgtAAIAABSIggAAIAAi1IAgAAIAABQIAtAAIAAhQIAgAAIAAC1g");
	this.shape_21.setTransform(9.275,-0.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.li4, new cjs.Rectangle(0,-17,279.7,34), null);


(lib.li3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBdIAAgeIAeAAIAAAegAgUArQAAgMACgIQADgJAEgHIAJgLIAHgLQAFgGACgGQADgHAAgJQAAgPgHgHQgIgIgLAAIgiAAIAAgPQAGgCALgBQALgBANAAQAYAAANAMQANANAAAYQAAALgDAIQgDAIgEAHIgKALIgJAMQgFAFgDAHQgEAIAAAJg");
	this.shape.setTransform(229.475,-0.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgcBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIAKgBQAKAAAIACQAIACAGAFQAGAEADAIQAEAIAAANQAAAOgEAIQgDAIgHAFQgGAFgKACQgKABgLAAIgagBgAgRAwIAPAAQADAAADgBQAEgBADgDQADgDACgEQABgFAAgIQAAgGgBgFQgCgEgDgDQgDgDgEgBIgGgBIgPAAg");
	this.shape_1.setTransform(219.825,1.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgPBBIAAhtIggAAIAAgUIBfAAIAAAUIggAAIAABtg");
	this.shape_2.setTransform(209.175,1.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAKAAAJACIAOADIAAANIgcAAQgGAAgFADQgDACgEAGQgDAFgCAKQgCAJAAAOQAAAPACAJQACAKADAFQAEAGAEACQAGACAGAAIAdAAIAAAOIgPADQgJABgKAAQgMAAgLgDg");
	this.shape_3.setTransform(200.325,1.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVBAQgKgEgHgIQgGgIgDgNQgEgNAAgSQAAgSAEgNQADgMAGgIQAHgIAKgEQAJgEAMAAQANAAAKAEQAJAEAGAIQAHAIAEAMQADANAAASQAAASgDANQgEANgHAIQgGAIgJAEQgKADgNAAQgMAAgJgDgAgIgvQgDACgDAFQgCAGgDAKQgBAKAAAOQAAAPABAKQADAKACAFQADAGADACQAFACADABQAEgBAEgCQAEgCADgGQADgFABgKQABgKAAgPQAAgOgBgKQgBgKgDgGQgDgFgEgCQgEgDgEAAQgDAAgFADg");
	this.shape_4.setTransform(189.6,1.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgzBBIgEgBIAAgNQAGAAAGgHQAGgGABgQIAFhXIBXAAIAACBIgeAAIAAhuIgbAAIgEBEQgBAWgKALQgJALgNAAIgNgBg");
	this.shape_5.setTransform(177,1.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgWBCQgIgCgFgEQgGgFgDgJQgDgHAAgNQAAgNADgIQADgHAGgFQAGgEAIgCQAIgBAJgBIAKABIALACIAAgLQAAgPgIgFQgGgGgNAAIgaAAIAAgNIAQgDIAQgCQAMAAAKACQAKACAGAFQAIAEACAKQAEAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgKAAQgIAAgHgBgAgDADQgDACgEADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQAEACADABIAGABQAFAAADgBIAGgEIAAgqIgOAAIgGABg");
	this.shape_6.setTransform(165.85,1.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgPBBIAAhtIggAAIAAgUIBfAAIAAAUIggAAIAABtg");
	this.shape_7.setTransform(155.925,1.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgNBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAKAAAJACIAOADIAAANIgcAAQgGAAgFADQgDACgEAGQgDAFgCAKQgCAJAAAOQAAAPACAJQACAKADAFQAEAGAEACQAGACAGAAIAdAAIAAAOIgPADQgJABgKAAQgMAAgLgDg");
	this.shape_8.setTransform(147.075,1.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgeBbIgLgEIAAgNIARAAQAFAAAEgBQAEgCADgDQADgEACgHIAEgRQgLAAgJgIQgJgJgDgOIgXhkIAeAAIAXBkIABAFIACADIADABIAVhtIAdAAIgYCDQgFAcgMAMQgLAMgSAAQgIAAgHgBg");
	this.shape_9.setTransform(136.275,4.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AguBCIgFgBIAAgNQAHAAAEgDIAEgFIAHgQQADgKAEgDQADgEAHgBIAAgBQgHgBgGgCQgGgDgEgDQgFgEgDgGQgDgHAAgIQAAgNAEgHQAEgJAHgFQAHgEAJgCQAKgCALAAIAZACQAKABALACIAAB/IggAAIAAgxIgFAAQgJAAgGAMIgGATQgEAJgHAGQgFAGgMgBIgMgBgAgBgvQgEABgDACQgDADgBAFQgCAEAAAHQAAAGACAEQABAFADACQADADAEABIAHABIAOAAIAAguIgOAAIgHACg");
	this.shape_10.setTransform(118.95,1.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgXBCQgGgCgGgEQgGgFgDgJQgDgHAAgNQAAgNADgIQADgHAGgFQAGgEAIgCQAHgBAKgBIALABIAKACIAAgLQAAgPgIgFQgGgGgMAAIgaAAIAAgNIAPgDIAQgCQAMAAAKACQAKACAHAFQAGAEAEAKQADAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgKAAQgIAAgIgBgAgDADQgEACgCADQgDACgCAFQgCAEAAAHQAAAHACAEQACAFADADQACACAEABIAFABQAGAAADgBIAGgEIAAgqIgPAAIgFABg");
	this.shape_11.setTransform(108.05,1.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABABUQgEgHgDgJQgDgKgBgMIiHAAIAAiBIAfAAIAABuIAcAAIAAhuIAfAAIAABuIAcAAIAAhuIAfAAIAABuIAQAAIAAA5g");
	this.shape_12.setTransform(94.225,3.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AguBCIgEgBIAAgNQAGAAADgDIAFgFIAGgQQAEgKADgDQAFgEAFgBIAAgBQgGgBgGgCQgGgDgEgDQgFgEgCgGQgDgHgBgIQABgNAEgHQADgJAHgFQAHgEAKgCQAJgCALAAIAZACQALABAJACIAAB/IgfAAIAAgxIgFAAQgKAAgEAMIgHATQgEAJgGAGQgGAGgLgBIgNgBgAgBgvQgDABgDACQgEADgBAFQgCAEAAAHQAAAGACAEQABAFAEACQADADADABIAHABIAOAAIAAguIgOAAIgHACg");
	this.shape_13.setTransform(78.4,1.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAtBUQgEgHgDgJQgDgKAAgMIhEAAQgBAMgDAKQgDAJgEAHIgTAAIAAg5IALAAQAEgFAEgIQADgJABgMIAEhMIBUAAIAABuIAQAAIAAA5gAgJgHQgBAMgDAJQgDAIgFAFIAnAAIAAhaIgYAAg");
	this.shape_14.setTransform(66.9,3.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgVBAQgKgEgHgIQgGgIgDgNQgEgNAAgSQAAgSAEgNQADgMAGgIQAHgIAKgEQAJgEAMAAQAMAAALAEQAJAEAGAIQAHAIADAMQAEANAAASQAAASgEANQgDANgHAIQgGAIgJAEQgLADgMAAQgMAAgJgDgAgIgvQgDACgDAFQgCAGgCAKQgCAKAAAOQAAAPACAKQACAKACAFQADAGADACQAEACAEABQAEgBAEgCQAEgCADgGQADgFABgKQABgKAAgPQAAgOgBgKQgBgKgDgGQgDgFgEgCQgEgDgEAAQgEAAgEADg");
	this.shape_15.setTransform(54.95,1.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAVBBIgVgwIgUAwIggAAIAfhBIgehAIAgAAIATAuIATguIAhAAIgeBAIAfBBg");
	this.shape_16.setTransform(43.975,1.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_17.setTransform(33.275,1.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgxBcIAAi1IAWAAIAEAIIABAAIALgHQAHgDAKAAQAKAAAHADQAJAEAGAIQAFAIAEANQADANAAASQAAATgDAMQgEAMgFAIQgHAJgJADQgIAEgLAAQgFAAgGgCIgKgFIAAA4gAgMhIIgGAEIAABXIAGAEQAEACAEAAQAFAAADgDQAFgCADgFQADgGACgJQACgJAAgPQAAgOgCgKQgCgKgDgFQgDgGgFgCQgDgCgFAAQgEAAgEABg");
	this.shape_18.setTransform(22.25,4.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAXBbIAAigIgtAAIAACgIggAAIAAi1IBtAAIAAC1g");
	this.shape_19.setTransform(9.275,-0.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.li3, new cjs.Rectangle(0,-17,236.1,34), null);


(lib.li2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBdIAAgeIAeAAIAAAegAgUArQAAgMACgIQADgJAEgHIAJgLIAHgLQAFgGACgGQADgHAAgJQAAgPgHgHQgIgIgLAAIgiAAIAAgPQAGgCALgBQALgBANAAQAYAAANAMQANANAAAYQAAALgDAIQgDAIgEAHIgKALIgJAMQgFAFgDAHQgEAIAAAJg");
	this.shape.setTransform(201.575,-0.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgcBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIAKgBQAKAAAIACQAIACAGAFQAGAEADAIQAEAIAAANQAAAOgEAIQgDAIgHAFQgGAFgKACQgKABgLAAIgagBgAgRAwIAPAAQADAAADgBQAEgBADgDQADgDACgEQABgFAAgIQAAgGgBgFQgCgEgDgDQgDgDgEgBIgGgBIgPAAg");
	this.shape_1.setTransform(191.925,1.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgPBBIAAhtIggAAIAAgUIBfAAIAAAUIggAAIAABtg");
	this.shape_2.setTransform(181.275,1.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAKAAAJACIAOADIAAANIgcAAQgGAAgFADQgDACgEAGQgDAFgCAKQgCAJAAAOQAAAPACAJQACAKADAFQAEAGAEACQAGACAGAAIAdAAIAAAOIgPADQgJABgKAAQgMAAgLgDg");
	this.shape_3.setTransform(172.425,1.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVBAQgKgEgHgIQgGgIgDgNQgEgNAAgSQAAgSAEgNQADgMAGgIQAHgIAKgEQAJgEAMAAQANAAAKAEQAJAEAGAIQAHAIAEAMQADANAAASQAAASgDANQgEANgHAIQgGAIgJAEQgKADgNAAQgMAAgJgDgAgIgvQgDACgDAFQgCAGgCAKQgCAKAAAOQAAAPACAKQACAKACAFQADAGADACQAFACADABQAEgBAEgCQAEgCADgGQADgFABgKQABgKAAgPQAAgOgBgKQgBgKgDgGQgDgFgEgCQgEgDgEAAQgDAAgFADg");
	this.shape_4.setTransform(161.7,1.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_5.setTransform(149.875,1.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgcBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIAKgBQAKAAAIACQAIACAGAFQAGAEADAIQAEAIAAANQAAAOgEAIQgDAIgHAFQgGAFgKACQgKABgLAAIgagBgAgRAwIAPAAQADAAADgBQAEgBADgDQADgDACgEQABgFAAgIQAAgGgBgFQgCgEgDgDQgDgDgEgBIgGgBIgPAAg");
	this.shape_6.setTransform(138.525,1.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgzBBIgEgBIAAgNQAGAAAGgHQAGgGABgQIAFhXIBXAAIAACBIgeAAIAAhuIgaAAIgFBEQgBAWgKALQgJALgNAAIgNgBg");
	this.shape_7.setTransform(125.6,1.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_8.setTransform(114.975,1.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPBBIAAhtIggAAIAAgUIBfAAIAAAUIggAAIAABtg");
	this.shape_9.setTransform(104.925,1.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAUBBIAAhRIgCAAIgjBRIggAAIAAiBIAfAAIAABPIABAAIAghPIAiAAIAACBg");
	this.shape_10.setTransform(94.25,1.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAwA+QgIgHgCgKIgGgYQgDgHgEgEQgDgDgFAAIgCAAIAAA6IgdAAIAAg6IgCAAQgEAAgFADQgEAEgBAHIgHAYQgCAKgHAHQgIAFgMAAIgNgBIgEgBIAAgNQAGAAAEgDQAEgDABgEIAFgVQADgMAGgGQAHgEAHgBIAAgCQgHgBgEgFQgFgFgEgLIgGgRIgFgGQgDgCgHAAIAAgNIAFgBIAFgBIAHgBQAMAAAGAGQAGAGAEAJIAIAUQAEAJADACQADADACAAIACAAIAAg0IAdAAIAAA0IACAAQADAAADgDQACgCADgJIAIgUQAFgJAGgGQAGgGAMAAIAGABIAGABIAFABIAAANQgHAAgDACQgDADgBADIgHARQgEALgFAFQgFAFgFABIAAACQAGABAGAEQAHAGADAMIAFAVQABAEAEADQAEADAHAAIAAANIgGABIgLABQgNAAgHgFg");
	this.shape_11.setTransform(79.9,1.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgWBCQgIgCgFgEQgFgFgEgJQgDgHAAgNQAAgNADgIQAEgHAFgFQAGgEAIgCQAIgBAJgBIAKABIALACIAAgLQAAgPgHgFQgIgGgMAAIgaAAIAAgNIAPgDIARgCQAMAAAKACQAKACAGAFQAIAEACAKQAEAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgJAAQgJAAgHgBgAgEADQgCACgEADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQAEACACABIAHABQAEAAAEgBIAGgEIAAgqIgOAAIgHABg");
	this.shape_12.setTransform(65.7,1.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgxBcIAAi1IAWAAIAEAIIABAAIALgHQAHgDAKAAQAJAAAIADQAJAEAGAIQAGAIADANQADANAAASQAAATgDAMQgDAMgGAIQgGAJgJADQgJAEgLAAQgGAAgFgCIgKgFIAAA4gAgMhIIgGAEIAABXIAGAEQAEACAFAAQAEAAAEgDQAEgCADgFQADgGACgJQACgJAAgPQAAgOgCgKQgCgKgDgFQgDgGgEgCQgEgCgEAAQgFAAgEABg");
	this.shape_13.setTransform(54.8,4.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAsBUQgDgHgDgJQgCgKgBgMIhFAAQgBAMgCAKQgDAJgEAHIgUAAIAAg5IAMAAQAEgFADgIQAEgJABgMIAEhMIBVAAIAABuIAPAAIAAA5gAgJgHQgBAMgDAJQgDAIgEAFIAlAAIAAhaIgXAAg");
	this.shape_14.setTransform(42,3.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgeBCIgPgDIAAgOIAiAAQALAAAHgEQAGgFABgMQAAgNgHgEQgHgFgGABIgWAAIAAgRIATAAQAIAAAGgFQAGgFAAgKQAAgKgHgEQgGgFgMAAIgdAAIAAgNIAPgDQAKgCAJAAQANAAAKACQAJACAHAEQAHAEADAGQADAIAAAJQAAAHgBAFQgDAFgDADQgDADgFACIgIADIAAACIAJACQAEACAEAFQAFAEABAFQADAGAAAGQAAAMgDAHQgEAJgHAEQgHAEgLACQgMABgNAAQgKAAgJgBg");
	this.shape_15.setTransform(30.75,1.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgWBCQgIgCgFgEQgFgFgEgJQgDgHAAgNQAAgNADgIQAEgHAFgFQAGgEAHgCQAJgBAJgBIAKABIALACIAAgLQAAgPgHgFQgIgGgMAAIgaAAIAAgNIAPgDIARgCQAMAAAKACQAKACAGAFQAIAEACAKQAEAIAAANIAABYIgWAAIgEgIIgBAAIgLAHQgHADgJAAQgJAAgHgBgAgEADQgCACgEADQgCACgCAFQgCAEAAAHQAAAHACAEQACAFACADQAEACACABIAHABQAEAAAEgBIAGgEIAAgqIgOAAIgHABg");
	this.shape_16.setTransform(20.25,1.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Ag1BcIAAiyQAKgDALgBIAZgBQAPAAAMADQALAEAIAIQAHAIAEAMQADAMAAASQAAASgDAMQgEANgGAIQgHAIgKAEQgJADgOAAIgDAAIgGgBIgHAAIgFgBIAAA2gAgVATIAOAAQAHAAAFgCQAFgCAFgFQADgGACgIQACgJAAgNQAAgOgCgIQgCgJgDgFQgFgFgFgDQgFgCgHAAIgOAAg");
	this.shape_17.setTransform(9.15,-0.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.li2, new cjs.Rectangle(0,-17,208.2,34), null);


(lib.li1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBdIAAgeIAeAAIAAAegAgUArQAAgMACgIQADgJAEgHIAJgLIAHgLQAFgGACgGQADgHAAgJQAAgPgHgHQgIgIgLAAIgiAAIAAgPIARgDQALgBANAAQAYAAANAMQANANAAAYQAAALgDAIQgDAIgEAHIgKALIgJAMQgFAFgDAHQgEAIAAAJg");
	this.shape.setTransform(129.325,-0.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgcBBQgKgBgKgDIAAh+IAfAAIAAAxIALgCIAKgBQAKAAAIACQAIACAGAFQAGAEADAIQAEAIAAANQAAAOgEAIQgDAIgHAFQgGAFgKACQgKABgLAAIgagBgAgRAwIAPAAQADAAADgBQAEgBADgDQADgDACgEQABgFAAgIQAAgGgBgFQgCgEgDgDQgDgDgEgBIgGgBIgPAAg");
	this.shape_1.setTransform(119.675,1.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgPBBIAAhtIggAAIAAgUIBfAAIAAAUIggAAIAABtg");
	this.shape_2.setTransform(109.025,1.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAKAAAJACIAOADIAAANIgcAAQgGAAgFADQgDACgEAGQgDAFgCAKQgCAJAAAOQAAAPACAJQACAKADAFQAEAGAEACQAGACAGAAIAdAAIAAAOIgPADQgJABgKAAQgMAAgLgDg");
	this.shape_3.setTransform(100.175,1.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVBAQgKgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAKgEQAJgEAMAAQAMAAALAEQAJAEAHAIQAGAIAEAMQADANAAASQAAASgDANQgEANgGAIQgHAIgJAEQgLADgMAAQgMAAgJgDgAgIgvQgDACgDAFQgDAGgCAKQgBAKAAAOQAAAPABAKQACAKADAFQADAGADACQAFACADABQAFgBADgCQAEgCADgGQACgFACgKQACgKAAgPQAAgOgCgKQgCgKgCgGQgDgFgEgCQgDgDgFAAQgDAAgFADg");
	this.shape_4.setTransform(89.45,1.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AARBBIAAg4IgiAAIAAA4IgfAAIAAiBIAfAAIAAA3IAiAAIAAg3IAgAAIAACBg");
	this.shape_5.setTransform(77.625,1.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgeBCIgPgDIAAgOIAhAAQAMAAAGgEQAIgFAAgMQgBgNgGgEQgGgFgHABIgWAAIAAgRIATAAQAIAAAGgFQAGgFAAgKQAAgKgHgEQgGgFgMAAIgcAAIAAgNIAOgDQAKgCAJAAQAMAAALACQAKACAGAEQAHAEADAGQAEAIgBAJQAAAHgBAFQgCAFgEADQgDADgEACIgJADIAAACIAJACQAEACAFAFQADAEACAFQADAGAAAGQAAAMgEAHQgDAJgHAEQgHAEgLACQgLABgPAAQgJAAgJgBg");
	this.shape_6.setTransform(66.5,1.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWBAQgJgEgHgIQgHgIgDgNQgDgNAAgSQAAgSADgNQADgMAHgIQAHgIAJgEQAKgEAMAAQAMAAALAEQAJAEAHAIQAGAIAEAMQADANAAASQAAASgDANQgEANgGAIQgHAIgJAEQgLADgMAAQgMAAgKgDgAgHgvQgEACgDAFQgDAGgCAKQgBAKAAAOQAAAPABAKQACAKADAFQADAGAEACQAEACADABQAEgBAEgCQAEgCACgGQADgFACgKQABgKABgPQgBgOgBgKQgCgKgDgGQgCgFgEgCQgEgDgEAAQgDAAgEADg");
	this.shape_7.setTransform(56.25,1.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgdBCQgLgBgKgCIAAh9QAKgCAKgBIAYgCQAMAAAKACQAJACAHAEQAHAEADAHQADAHAAALQAAAGgCAFIgFAIIgGAEIgHADIAAACIAJACQAEACAEAFQAEAEACAFQADAGAAAGQAAAMgEAHQgDAJgHAEQgHAEgKACQgLABgMAAIgagBgAgTAxIAQAAIAHgBQAEgBADgCQADgDACgEQACgFAAgFQAAgNgHgEQgGgFgIABIgQAAgAgTgKIANAAIAHgBIAGgEIAEgFQACgEAAgFQAAgGgCgDIgEgGQgDgCgEgBIgGgCIgNAAg");
	this.shape_8.setTransform(45.025,1.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgxBcIAAi1IAWAAIAEAIIABAAIALgHQAHgDAKAAQAJAAAIADQAJAEAGAIQAGAIADANQADANAAASQAAATgDAMQgDAMgGAIQgGAJgJADQgJAEgLAAQgGAAgFgCIgKgFIAAA4gAgMhIIgGAEIAABXIAGAEQAEACAFAAQAEAAAEgDQAEgCADgFQADgGACgJQACgJAAgPQAAgOgCgKQgCgKgDgFQgDgGgEgCQgEgCgEAAQgFAAgEABg");
	this.shape_9.setTransform(33.2,4.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgQBAQgLgEgHgIQgHgIgEgNQgDgNAAgSQAAgSADgNQADgMAHgIQAGgIAJgEQAJgEALAAQAMAAAJAEQAJAEAGAIQAHAIADANQADANAAARIAAAJIhCAAQAAAXAIAIQAIAJAPAAIAdAAIAAAOIgPADQgJABgKAAQgOAAgLgDgAgGgwQgEACgCAEQgCAFgCAIQgBAJAAAMIAjAAQAAgMgBgJQgCgIgCgFQgCgEgEgCIgHgCQgDAAgDACg");
	this.shape_10.setTransform(21.525,1.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAXBbIAAhSIgtAAIAABSIggAAIAAi1IAgAAIAABQIAtAAIAAhQIAgAAIAAC1g");
	this.shape_11.setTransform(9.275,-0.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.li1, new cjs.Rectangle(0,-17,135.9,34), null);


(lib.law_text = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape.setTransform(124.2,47.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.737)").s().p("AAAAaIAMgaIgMgZIAJAAIANAZIgNAagAgVAaIANgaIgNgZIAKAAIANAZIgNAag");
	this.shape_1.setTransform(120.375,44.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.737)").s().p("AAPArIAAgRIgdAAIAAARIgKAAIAAgZIAEgCIACgDIACgEIABgGIABgIIABglIAhAAIAAA6IAEAAIAAAbgAgFgFIgBAMIgCAJIASAAIAAgwIgNAAg");
	this.shape_2.setTransform(114.95,45.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgKAAIAAhDIAKAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_3.setTransform(109.9,44.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.737)").s().p("AgMAfQgFgFAAgIIAKgCQAAAEACADQACACADAAQADAAACgCQACgBAAgDIABgHIAAgIIgRAAIAAgJIARAAIAAgIIgBgGQgBgDgCgBIgEgBQgDAAgCACQgCACAAAFIgKgCQAAgIAFgFQAEgEAIAAQAHAAAEADQADADACAFIABAEIABAGIAAAHIAAAHIAAAFIAAAGIAAAGIgBAEIgCAFIgDAEIgFADIgHABQgIAAgEgEg");
	this.shape_4.setTransform(105.275,44.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.737)").s().p("AgUAbIAEgDIADgFIABgFIABgIIAAgpIAgAAIAABEIgKAAIAAg6IgNAAIAAAfIgBALQAAAFgCADIgEAGIgHAEg");
	this.shape_5.setTransform(100.675,44.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAgtIgBAAIgFANIgIAQIgEAAIgHgPIgFgNIgBAAIAAAsIgKAAIAAhDIAKAAIAJAVIAGANIAGgNIAKgVIAKAAIAABDg");
	this.shape_6.setTransform(95.4,44.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIALAAIAAAFIAEgEQACgCAEAAIAEABIAFACIAEAEIADAJIAAAJIAAAJIAAANIgDALQgBAFgDAEQgDACgGAAQgEAAgCgCQgDgBgBgCIAAAfgAgFgiQgDAEAAAFIAAAaQAAAFACADQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIAAgNIAAgLIgBgHQgBgDgCgBQgBgBgDAAQgEAAgBACg");
	this.shape_7.setTransform(90,45.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_8.setTransform(85.375,44.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAwIAAgHIgIgCIgGgDIgFgIQgCgEAAgFIAAgmQAAgGACgEIAFgHQACgDAEgBIAIgCIAAgGIAJAAIAAAGIAIACQADABADADIAFAHQACAEAAAGIAAAmQAAAFgCAEIgFAIIgGADIgIACIAAAHgAAFAfQAFABADgEQAEgEAAgFIAAgmQAAgGgEgDQgDgEgFgBgAgMgcQgDADAAAGIAAAmQAAAFACAEQADADAGAAIAAhAQgFABgDAEg");
	this.shape_9.setTransform(80.125,43.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0.737)").s().p("AAMAaIgMgaIAMgZIAKAAIgNAZIANAagAgIAaIgNgaIANgZIAJAAIgMAZIAMAag");
	this.shape_10.setTransform(74.275,44.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,255,0.737)").s().p("AgPArQgEgHgBgLIAAguIABgKQABgFADgEQACgEADgCQAFgCAFAAQAGAAAFACQAEACACADQACAEABAFIABAKIAAAsQAAANgGAHQgEAHgLAAQgKAAgFgGgAgFgkIgDAEIgCAGIAAAGIAAAuIABAEIACAEQAAABAAAAQAAABABAAQAAABABAAQAAABABAAQACABACAAQADAAACgBIADgEIACgFIAAgFIAAgvIAAgGIgCgEQAAgBAAAAQAAgBgBAAQAAgBgBAAQAAAAgBgBQgCgBgDAAQgDAAgCACg");
	this.shape_11.setTransform(66.6,43.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,255,255,0.737)").s().p("AgPArQgEgHgBgLIAAguIABgKQABgFACgEQADgEADgCQAEgCAGAAQAGAAAEACQAEACADADQACAEAAAFIACAKIAAAsQgBANgFAHQgEAHgLAAQgKAAgFgGgAgFgkIgDAEIgCAGIAAAGIAAAuIABAEIABAEQABABAAAAQAAABABAAQAAABABAAQAAABABAAQACABACAAQADAAACgBIADgEIACgFIAAgFIAAgvIAAgGIgCgEQAAgBAAAAQAAgBgBAAQAAgBgBAAQAAAAAAgBQgCgBgEAAQgDAAgCACg");
	this.shape_12.setTransform(61.45,43.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,255,0.737)").s().p("AgPArQgFgHABgLIAAguIABgKQAAgFACgEQADgEAEgCQADgCAGAAQAGAAAEACQAFACACADQACAEAAAFIABAKIAAAsQAAANgEAHQgFAHgLAAQgKAAgFgGgAgFgkIgDAEIgBAGIAAAGIAAAuIAAAEIABAEQABABAAAAQAAABABAAQAAABABAAQAAABAAAAQADABACAAQADAAACgBIADgEIACgFIAAgFIAAgvIAAgGIgCgEQAAgBAAAAQAAgBgBAAQAAgBgBAAQAAAAAAgBQgCgBgEAAQgDAAgCACg");
	this.shape_13.setTransform(56.3,43.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAwIAAhVIgSAAIAABVIgKAAIAAhgIAmAAIAABgg");
	this.shape_14.setTransform(48.75,43.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,255,0.737)").s().p("AgOArQgFgGAAgLIAAgvIABgKQAAgFADgEQACgEAEgCQAEgCAFAAQALAAAEAGQAEAGABAKIgKACQAAgHgCgDQgDgEgFAAQgCAAgCABIgDAEIgBAFIgBAFIAAAwIABAFIABAEIADAEQAAAAABAAQAAABABAAQAAAAABAAQABAAAAAAQAFAAACgDQACgEABgHIAKACQAAAKgGAGQgEAGgKAAQgJAAgFgGg");
	this.shape_15.setTransform(43.85,43.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgDgEIgDgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFADgDQAEgDAGAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_16.setTransform(36.7,44.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_17.setTransform(32.225,44.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,255,0.737)").s().p("AALAiIgFgTIgBgFIgDgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAgBAAIgDAAIgGAAIAAAdIgKAAIAAhDIAKAAIAAAdIAFAAIADAAIACgBIADgDIACgGIAFgTIAKAAIgFAUIgDAIQgCADgEACQAEAAACADIADAJIAGAWg");
	this.shape_18.setTransform(27.8,44.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAJAAAEAFQAEAGAAAJIgKABQAAgGgCgDQgCgCgDAAIgEABQgCABgBADIgBAIIAAAOIAAAJIABAHIACAEQACACADAAQAEAAABgDQACgDAAgFIAKACQAAAJgEAFQgFAFgJAAIgGgBg");
	this.shape_19.setTransform(23.275,44.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,255,0.737)").s().p("AAPArIAAgRIgdAAIAAARIgJAAIAAgZIADgCIACgDIACgEIABgGIABgIIABglIAhAAIAAA6IAEAAIAAAbgAgEgFIgBAMIgDAJIASAAIAAgwIgNAAg");
	this.shape_20.setTransform(18.45,45.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgQAAIAAAeIgKAAIAAhDIAKAAIAAAcIAQAAIAAgcIAKAAIAABDg");
	this.shape_21.setTransform(13.4,44.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_22.setTransform(8.675,44.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(255,255,255,0.737)").s().p("AgUAbIAEgDIADgFIABgFIABgIIAAgpIAgAAIAABEIgKAAIAAg6IgNAAIAAAfIgBALQAAAFgCADIgEAGIgHAEg");
	this.shape_23.setTransform(3.975,44.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,255,255,0.737)").s().p("AgUAbIAEgDIADgFIABgFIABgIIAAgpIAgAAIAABEIgKAAIAAg6IgNAAIAAAfIgBALQAAAFgCADIgEAGIgHAEg");
	this.shape_24.setTransform(-0.725,44.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_25.setTransform(-5.075,44.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(255,255,255,0.737)").s().p("AgPAiIAAhDIAfAAIAAAJIgVAAIAAA6g");
	this.shape_26.setTransform(-9.175,44.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,255,255,0.737)").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_27.setTransform(-13.425,43.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_28.setTransform(-17.925,44.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(255,255,255,0.737)").s().p("AALAiIgEgTIgCgFIgDgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAgBAAIgDAAIgGAAIAAAdIgKAAIAAhDIAKAAIAAAdIAEAAIAEAAIACgBIADgDIACgGIAFgTIAKAAIgFAUIgEAIQgBADgEACQAEAAACADIAEAJIAFAWg");
	this.shape_29.setTransform(-22.35,44.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAJAAAEAFQAEAGAAAJIgKABQAAgGgCgDQgCgCgDAAIgEABQgCABgBADIgBAIIAAAOIAAAJIABAHIACAEQACACADAAQAEAAABgDQACgDAAgFIAKACQAAAJgEAFQgFAFgJAAIgGgBg");
	this.shape_30.setTransform(-26.875,44.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAJAAAEAFQAEAGAAAJIgKABQAAgGgCgDQgCgCgDAAIgEABQgCABgBADIgBAIIAAAOIAAAJIABAHIACAEQACACADAAQAEAAABgDQACgDAAgFIAKACQAAAJgEAFQgFAFgJAAIgGgBg");
	this.shape_31.setTransform(-31.025,44.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(255,255,255,0.737)").s().p("AgPAwIAAgKIADAAQADAAACgCIADgKIABgFIgRhEIALAAIAFAaIAEAXIAGgXIAEgaIALAAIgSBPQgBAHgDAEQgEAFgGAAg");
	this.shape_32.setTransform(-35.3,45.825);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIAKAAIAAAFIAFgEQACgCAEAAIAEABIAFACIAEAEIACAJIABAJIAAAJIgBANIgCALQgBAFgDAEQgEACgFAAQgDAAgDgCQgCgBgDgCIAAAfgAgFgiQgDAEAAAFIAAAaQAAAFACADQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIAAgNIAAgLIgBgHQgBgDgBgBQgCgBgDAAQgDAAgCACg");
	this.shape_33.setTransform(-39.7,45.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_34.setTransform(-44.175,44.475);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(255,255,255,0.737)").s().p("AgUAbIAEgDIADgFIABgFIABgIIAAgpIAgAAIAABEIgKAAIAAg6IgNAAIAAAfIgBALQAAAFgCADIgEAGIgHAEg");
	this.shape_35.setTransform(-48.975,44.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgGgDIgDgEIgBgFIgBgEIAAgGIAAgGIAAgFIAAgGIAAgHIABgGIABgFQABgFAFgDQADgDAHAAQAJAAAEAFQAFAGAAAKIAAAQIgaAAIAAAJIABAHQABAGAGAAQADAAACgDQACgCAAgFIALACQgBAJgFAEQgEAFgJAAIgGgBgAgDgXQgCABgBAEIgBAFIAAAIIAQAAIAAgGIgBgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_36.setTransform(-53.35,44.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(255,255,255,0.737)").s().p("AgTAwIAAhgIAjAAIAAALIgZAAIAAAdIAHAAQAGAAAFABQAEADADAEQACACABAGIABALIgBAMQgBAFgCAEQgDAFgEACQgEABgGAAgAgJAmIAHAAQADAAADgBIAEgFIACgFIAAgIIAAgHIgCgFIgEgFQgDgBgDAAIgHAAg");
	this.shape_37.setTransform(-57.875,43.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(255,255,255,0.737)").s().p("AgFAbIAAgMIAKAAIAAAMgAgFgOIAAgMIAKAAIAAAMg");
	this.shape_38.setTransform(-64.05,45.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(255,255,255,0.737)").s().p("AgRAiIAAhDIAKAAIAAAaIAFAAQAGAAAEABQAEACACADQADACABAEIABAHIgBAJQgBAEgDADQgCADgEACQgEABgFAAgAgHAYIAFAAIAFgBIADgDIACgDIABgEIgBgEIgCgEIgDgCIgFgBIgFAAg");
	this.shape_39.setTransform(-67.3,44.475);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(255,255,255,0.737)").s().p("AgUAbIAEgDIADgFIABgFIABgIIAAgpIAgAAIAABEIgKAAIAAg6IgNAAIAAAfIgBALQAAAFgCADIgEAGIgHAEg");
	this.shape_40.setTransform(-72.175,44.6);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgEgEIgCgFIAAgEIAAgGIAAgGIAAgFIAAgGIAAgHIAAgGIABgFQACgFAFgDQADgDAGAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgFAEQgEAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIARAAIAAgGIgBgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_41.setTransform(-76.55,44.475);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAiIAAg6IgNAAIAAgJIAjAAIAAAJIgNAAIAAA6g");
	this.shape_42.setTransform(-80.575,44.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAgsIAAAAIgSAsIgKAAIAAhDIAKAAIAAArIABAAIARgrIAKAAIAABDg");
	this.shape_43.setTransform(-84.8,44.475);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(255,255,255,0.737)").s().p("AAQArIAAgRIgeAAIAAARIgKAAIAAgZIAEgCIACgDIACgEIABgGIABgIIABglIAhAAIAAA6IAFAAIAAAbgAgFgFIgBAMIgCAJIASAAIAAgwIgNAAg");
	this.shape_44.setTransform(-89.95,45.325);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_45.setTransform(-94.825,44.475);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAiIAAhDIARAAQAJAAAFAEQAFAFAAAJQAAAFgBADQgCADgDADQAEABABAEQACAEAAAFQAAALgFAFQgGAFgKAAgAgIAYIAIAAIAEgBIADgCIACgEIAAgEQAAgFgCgDQgCgCgGAAIgHAAgAgIgFIAGAAQAFAAACgDQADgCAAgFQAAgEgDgDQgCgCgFAAIgGAAg");
	this.shape_46.setTransform(-99.425,44.475);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(255,255,255,0.737)").s().p("AgMAfQgFgEgBgKIAKgBQAAAFADACQACADADgBQADABADgDQADgDAAgGQAAgEgCgDQgBgEgEABIgFAAIAAgJIAFAAQAEAAABgDQACgCAAgEQAAgFgCgCQgCgDgFAAQgHAAAAAKIgKgDQABgIAFgFQAFgEAGAAQAJAAAFAEQAFAFAAAKIAAAEIgCAFIgCADIgDADQAFABABAEIABAJQAAAGgCAEQgBAEgDADQgDACgDABIgHABQgHAAgFgEg");
	this.shape_47.setTransform(-104.175,44.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgRAsIgKAAIAAhDIAKAAIAAArIAAAAIASgrIAJAAIAABDg");
	this.shape_48.setTransform(-108.6,44.475);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_49.setTransform(-113.275,44.475);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIALAAIAAAFIAEgEQACgCAEAAIAEABIAFACIAEAEIADAJIAAAJIAAAJIAAANIgDALQgBAFgDAEQgEACgFAAQgDAAgDgCQgDgBgBgCIAAAfgAgFgiQgDAEAAAFIAAAaQAAAFACADQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQABAAAAgBQAAAAABgBQAAAAAAgBQABAAAAgBIABgGIABgNIAAgLIgCgHQgBgDgCgBQgBgBgDAAQgEAAgBACg");
	this.shape_50.setTransform(-117.8,45.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAwIAAhVIgSAAIAABVIgKAAIAAhgIAmAAIAABgg");
	this.shape_51.setTransform(-122.65,43.05);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_52.setTransform(131.4,34.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_53.setTransform(127.875,31.975);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAgtIAAAAIgHANIgHAQIgDAAIgIgPIgGgNIAAAAIAAAsIgLAAIAAhDIAKAAIAKAVIAGANIAHgNIAJgVIAKAAIAABDg");
	this.shape_54.setTransform(122.55,31.975);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_55.setTransform(117.075,31.975);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(255,255,255,0.737)").s().p("AgUAbIAEgDIADgFIABgFIABgIIAAgpIAgAAIAABEIgKAAIAAg6IgNAAIAAAfIgBALQAAAEgCAEIgEAGIgHAEg");
	this.shape_56.setTransform(112.375,32.1);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(255,255,255,0.737)").s().p("AALAiIgEgTIgCgFIgDgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAIgEAAIgGAAIAAAdIgKAAIAAhDIAKAAIAAAdIAEAAIAEAAIACgBIADgDIACgGIAFgTIAKAAIgFAUIgEAIQgCADgDACQAEAAACADIAEAJIAFAWg");
	this.shape_57.setTransform(108.05,31.975);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgDgEIgDgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFADgDQAEgDAGAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_58.setTransform(103.3,31.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(255,255,255,0.737)").s().p("AgTAwIAAhfIASAAQAFAAAFACQAEABADAEQACAEABAFIABANIgBALQgBAFgCADQgDAEgEADQgFABgGABIgHAAIAAAmgAgJAAIAGAAQAEAAADgBQADgCABgDIACgFIAAgHIAAgIIgCgGQgBgCgDgBQgDgCgDAAIgHAAg");
	this.shape_59.setTransform(98.875,30.55);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAGIAAgLIAKAAIAAALg");
	this.shape_60.setTransform(92.6,34.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_61.setTransform(89.125,31.975);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgdQgGAEgFAAQgHAAgEgEQgDgEgBgIIAAgaIAKAAIAAAXQABAKAHAAIAEgBIAEgDIAAgdIAKAAIAABDg");
	this.shape_62.setTransform(84.65,31.975);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_63.setTransform(80.175,31.975);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIALAAIAAAFIAEgEQACgCAEAAIAEABIAFACIAEAEIADAJIAAAJIAAAJIAAANIgDALQgBAGgDACQgEADgFAAQgDAAgDgCQgDgBgBgCIAAAfgAgFgiQgDAEAAAFIAAAZQAAAFACAEQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIABgNIAAgLIgCgHQgBgDgCgBQgBgCgDABQgEAAgBACg");
	this.shape_64.setTransform(75.7,33.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAiIAAhDIARAAQAJAAAFAEQAFAFAAAJQAAAFgBADQgCADgDADQAEABABAEQACAEAAAFQAAALgFAFQgGAFgKAAgAgIAYIAIAAIAEgBIADgCIACgEIAAgEQAAgFgCgDQgCgCgGAAIgHAAgAgIgFIAGAAQAFAAACgDQADgCAAgFQAAgEgDgDQgCgCgFAAIgGAAg");
	this.shape_65.setTransform(71.175,31.975);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(255,255,255,0.737)").s().p("AABAiIgDgDIgDgEIgCgFIgBgIIAAgKIgIAAIAAAeIgKAAIAAhDIAKAAIAAAcIAIAAIAAgKIACgIQABgFAEgDQADgDAHAAQAFAAADACQAEABACADIACAGIACAIIAAAJIAAAHIAAAIIgBAIQAAAFgCADQgCAEgDACIgFADIgGAAIgHgBgAAFgXQgCABgBAEQgBACAAAGIgBANIAAAJIABAHQACAGAGAAQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBQACgBABgDIABgDIAAgEIAAgGIAAgFIAAgFIAAgGIAAgEIgBgEQgBgGgGAAIgEABg");
	this.shape_66.setTransform(63.325,31.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgRAsIgLAAIAAhDIALAAIAAArIAAAAIASgrIAKAAIAABDg");
	this.shape_67.setTransform(57.7,31.975);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgKAAIAAhDIAKAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_68.setTransform(52.85,31.975);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgEgEIgCgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFAEgDQAEgDAFAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_69.setTransform(48.2,31.975);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgdQgGAEgFAAQgHAAgEgEQgDgEgBgIIAAgaIAKAAIAAAXQABAKAHAAIAEgBIAEgDIAAgdIAKAAIAABDg");
	this.shape_70.setTransform(43.7,31.975);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_71.setTransform(39.225,31.975);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgLAAIAAhDIALAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_72.setTransform(34.65,31.975);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(255,255,255,0.737)").s().p("AgMAfQgFgEgBgKIAKgBQAAAFADACQACACADAAQADAAADgCQADgDAAgGQAAgEgCgDQgBgDgEAAIgFAAIAAgJIAFAAQAEAAABgCQACgDAAgEQAAgFgCgDQgCgCgFAAQgHAAAAAKIgKgDQABgIAFgFQAFgEAGAAQAJAAAFAEQAFAGAAAJIAAAEIgCAFIgCADIgDADQAFAAABAFIABAJQAAAHgCADQgBAFgDACQgDACgDABIgHABQgHAAgFgEg");
	this.shape_73.setTransform(29.925,31.95);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_74.setTransform(25.675,31.975);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgQAAIAAAeIgKAAIAAhDIAKAAIAAAcIAQAAIAAgcIAKAAIAABDg");
	this.shape_75.setTransform(21.05,31.975);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_76.setTransform(14.075,31.975);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAg6IgRAAIAAA6IgKAAIAAhDIAlAAIAABDg");
	this.shape_77.setTransform(9.375,31.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgRAsIgKAAIAAhDIAKAAIAAArIAAAAIASgrIAJAAIAABDg");
	this.shape_78.setTransform(2.1,31.975);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAiIAAg6IgNAAIAAgJIAjAAIAAAJIgNAAIAAA6g");
	this.shape_79.setTransform(-2.175,31.975);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAJAAAEAFQAEAGAAAJIgKABQAAgGgCgDQgCgCgDAAIgEABQgCABgBADIgBAIIAAAOIAAAJIABAHIACAEQACACADAAQAEAAABgDQACgDAAgFIAKACQAAAJgEAFQgFAFgJAAIgGgBg");
	this.shape_80.setTransform(-5.925,31.975);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_81.setTransform(-10.325,31.975);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgKAAIAAhDIAKAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_82.setTransform(-15,31.975);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgLAAIAAhDIALAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_83.setTransform(-19.8,31.975);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgDgEIgDgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFADgDQAEgDAGAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_84.setTransform(-24.5,31.975);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAgtIAAAAIgGANIgIAQIgDAAIgIgPIgGgNIAAAAIAAAsIgKAAIAAhDIAJAAIAKAVIAGANIAHgNIAKgVIAKAAIAABDg");
	this.shape_85.setTransform(-29.85,31.975);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgBgFIgBgEIAAgGIAAgGIAAgFIAAgGIAAgHIABgGIAAgFQACgFAFgDQADgDAHAAQAJAAAEAFQAFAGAAAKIAAAQIgaAAIAAAJIAAAHQACAGAGAAQADAAACgDQACgCAAgFIALACQgBAJgFAEQgEAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIAAAIIAQAAIAAgGIgBgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_86.setTransform(-35.25,31.975);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIAKAAIAAAFIAFgEQACgCAEAAIAEABIAFACIAEAEIACAJIABAJIAAAJIgBANIgCALQgBAGgDACQgEADgFAAQgDAAgDgCQgCgBgDgCIAAAfgAgFgiQgDAEAAAFIAAAZQAAAFACAEQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIAAgNIAAgLIgBgHQgBgDgBgBQgCgCgDABQgDAAgCACg");
	this.shape_87.setTransform(-39.7,33.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgBgFIgBgEIAAgGIAAgGIAAgFIAAgGIAAgHIABgGIAAgFQACgFAFgDQADgDAHAAQAJAAAEAFQAFAGAAAKIAAAQIgaAAIAAAJIAAAHQACAGAGAAQADAAACgDQACgCAAgFIALACQgBAJgFAEQgEAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIAAAIIAQAAIAAgGIgBgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_88.setTransform(-44.25,31.975);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAxIgFgDIgDgEIgCgFIgBgJIAAgLIAAgOIABgRIACgNQACgFADgEQADgDAEgCIAEgCIAEgCIAEgCIAFgCIAEAHIgFADIgEACIgEACIgFADQgEACgCAGQgCAGAAAHQADgDADgBIAEgCIAGABIAFADIACADIACAFIABAFIABAFIAAAHIAAAHIAAAHIgBAGQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgFQgDABgBADIgBAHIAAAOIAAAIIABAGQABADACABQACACACAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIABgGIAAgLIAAgEIAAgFIAAgFIgBgDQgCgHgGAAQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAABg");
	this.shape_89.setTransform(-48.675,30.475);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAgdIgFAAQgDAAgCADQgCACgCAGIgEASIgJAAIAEgVIADgGQABgDADgCQgGgCgCgDQgCgFAAgFQAAgKAFgFQAFgFAJAAIARAAIAABDgAgEgVQgCADgBAGQABAEACADQADACADAAIAHAAIAAgVIgGAAQgFAAgCADg");
	this.shape_90.setTransform(-55.75,31.975);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAgtIgBAAIgFANIgIAQIgEAAIgHgPIgFgNIgBAAIAAAsIgKAAIAAhDIAKAAIAJAVIAGANIAGgNIAKgVIAKAAIAABDg");
	this.shape_91.setTransform(-61.2,31.975);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgGgDIgCgEIgCgFIgBgEIgBgGIAAgGIAAgFIAAgGIABgHIABgGIABgFQACgFADgDQAFgDAGAAQAJAAAEAFQAEAGABAKIAAAQIgaAAIAAAJIABAHQABAGAGAAQADAAACgDQACgCAAgFIALACQgBAJgFAEQgEAFgJAAIgGgBgAgDgXQgCABgBAEIgBAFIAAAIIAPAAIAAgGIAAgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_92.setTransform(-66.6,31.975);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIALAAIAAAFIAEgEQACgCAEAAIAEABIAFACIAEAEIADAJIAAAJIAAAJIAAANIgDALQgBAGgDACQgDADgGAAQgEAAgCgCQgDgBgBgCIAAAfgAgFgiQgDAEAAAFIAAAZQAAAFACAEQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIAAgNIAAgLIgBgHQgBgDgCgBQgBgCgDABQgEAAgBACg");
	this.shape_93.setTransform(-71.1,33.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAiIAAhDIARAAQAJAAAFAEQAFAFAAAJQAAAFgBADQgCADgDADQAEABABAEQACAEAAAFQAAALgFAFQgGAFgKAAgAgIAYIAIAAIAEgBIADgCIACgEIAAgEQAAgFgCgDQgCgCgGAAIgHAAgAgIgFIAGAAQAFAAACgDQADgCAAgFQAAgEgDgDQgCgCgFAAIgGAAg");
	this.shape_94.setTransform(-75.675,31.975);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAgBABAAQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_95.setTransform(-82.675,31.975);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAiIAAhDIARAAQAJAAAFAEQAFAFAAAJQAAAFgBADQgCADgDADQAEABABAEQACAEAAAFQAAALgFAFQgGAFgKAAgAgIAYIAIAAIAEgBIADgCIACgEIAAgEQAAgFgCgDQgCgCgGAAIgHAAgAgIgFIAGAAQAFAAACgDQADgCAAgFQAAgEgDgDQgCgCgFAAIgGAAg");
	this.shape_96.setTransform(-87.275,31.975);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_97.setTransform(-94.425,31.975);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAiIAAg6IgNAAIAAgJIAjAAIAAAJIgNAAIAAA6g");
	this.shape_98.setTransform(-98.375,31.975);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_99.setTransform(-102.525,31.975);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIAKAAIAAAFIAFgEQACgCAEAAIAEABIAFACIAEAEIACAJIABAJIAAAJIgBANIgCALQgBAGgEACQgCADgHAAQgDAAgCgCQgDgBgCgCIAAAfgAgGgiQgCAEAAAFIAAAZQAAAFACAEQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIAAgNIAAgLIgBgHQAAgDgCgBQgCgCgDABQgDAAgDACg");
	this.shape_100.setTransform(-106.95,33.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_101.setTransform(-111.525,31.975);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAg6IgRAAIAAA6IgKAAIAAhDIAlAAIAABDg");
	this.shape_102.setTransform(-116.125,31.975);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgDgEIgDgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFADgDQAEgDAGAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_103.setTransform(-120.8,31.975);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAheIAKAAIAAAFIAFgEQACgCAEAAIAEABIAFACIAEAEIACAJIABAJIAAAJIgBANIgCALQgBAGgDACQgEADgFAAQgDAAgDgCQgDgBgCgCIAAAfgAgFgiQgDAEAAAFIAAAZQAAAFACAEQACACAEAAQAAAAABAAQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgGIAAgNIAAgLIgBgHQgBgDgBgBQgCgCgDABQgDAAgCACg");
	this.shape_104.setTransform(-125.3,33.25);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAg6IgRAAIAAA6IgKAAIAAhDIAlAAIAABDg");
	this.shape_105.setTransform(-129.975,31.975);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgEgEIgCgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFAEgDQAEgDAFAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIARAAIAAgGIgBgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_106.setTransform(121.55,19.425);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAgsIAAAAIgSAsIgKAAIAAhDIAKAAIAAArIABAAIARgrIALAAIAABDg");
	this.shape_107.setTransform(116.9,19.425);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgLAAIAAhDIALAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_108.setTransform(112.05,19.425);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgGgDIgDgEIgBgFIgBgEIAAgGIAAgGIAAgFIAAgGIAAgHIABgGIAAgFQACgFAFgDQADgDAHAAQAJAAAEAFQAFAGAAAKIAAAQIgaAAIAAAJIABAHQABAGAGAAQADAAACgDQACgCAAgFIALACQgBAJgFAEQgEAFgJAAIgGgBgAgDgXQgCABgBAEIgBAFIAAAIIAQAAIAAgGIgBgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_109.setTransform(107.4,19.425);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgQAAIAAAeIgKAAIAAhDIAKAAIAAAcIAQAAIAAgcIAKAAIAABDg");
	this.shape_110.setTransform(102.75,19.425);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgGgDIgCgEIgCgFIgBgEIgBgGIAAgGIAAgFIAAgGIABgHIABgGIABgFQACgFADgDQAFgDAGAAQAJAAAEAFQAEAGABAKIAAAQIgaAAIAAAJIABAHQABAGAGAAQADAAACgDQACgCAAgFIALACQgBAJgFAEQgEAFgJAAIgGgBgAgDgXQgCABgBAEIgBAFIAAAIIAPAAIAAgGIAAgFIgBgEIgDgDIgEgBIgDABg");
	this.shape_111.setTransform(98.1,19.425);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAgtIAAAAIgHANIgHAQIgDAAIgIgPIgGgNIAAAAIAAAsIgLAAIAAhDIAKAAIAKAVIAGANIAHgNIAKgVIAKAAIAABDg");
	this.shape_112.setTransform(92.75,19.425);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgRAsIgKAAIAAhDIAKAAIAAArIAAAAIASgrIAJAAIAABDg");
	this.shape_113.setTransform(87.15,19.425);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAhfIAKAAIAAAGIAFgFQACgBAEAAIAEAAIAFACIAEAFIACAJIABAJIAAAJIgBANIgBAMQgCAEgEAEQgCACgHAAQgDAAgCgBQgDgBgCgEIAAAggAgGghQgCACAAAGIAAAaQAAAEACADQACAEAEAAQAAAAABgBQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAgBAAgBQABAAAAgBIABgHIAAgLIAAgLIAAgIQgBgBAAAAQAAgBgBgBQAAAAgBAAQAAgBAAAAQgCgCgDAAQgEAAgCAEg");
	this.shape_114.setTransform(82.4,20.7);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAxIAAhWIgSAAIAABWIgKAAIAAhhIAmAAIAABhg");
	this.shape_115.setTransform(77.6,18);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("rgba(255,255,255,0.737)").s().p("AgFAGIAAgLIAKAAIAAALg");
	this.shape_116.setTransform(71.4,22.225);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAgsIAAAAIgSAsIgKAAIAAhDIAKAAIAAArIABAAIARgrIAKAAIAABDg");
	this.shape_117.setTransform(67.75,19.425);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgRAsIgKAAIAAhDIAKAAIAAArIAAAAIASgrIAJAAIAABDg");
	this.shape_118.setTransform(62.85,19.425);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("rgba(255,255,255,0.737)").s().p("AALArIAAgRIgeAAIAAhEIAJAAIAAA5IAQAAIAAg5IAKAAIAAA5IAEAAIAAAcg");
	this.shape_119.setTransform(58.2,20.275);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("rgba(255,255,255,0.737)").s().p("AALAiIgEgTIgDgFIgCgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAIgEAAIgGAAIAAAdIgKAAIAAhDIAKAAIAAAdIAEAAIAEAAIACgBIADgDIACgGIAFgTIAKAAIgFAUIgEAIQgCADgDACQAEAAACADIAEAJIAFAWg");
	this.shape_120.setTransform(53.4,19.425);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_121.setTransform(48.575,19.425);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgEgEIgCgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFAEgDQAEgDAFAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIARAAIAAgGIgBgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_122.setTransform(44.15,19.425);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAhfIAKAAIAAAGIAFgFQACgBAEAAIAEAAIAFACIAEAFIACAJIABAJIAAAJIgBANIgBAMQgCAEgEAEQgCACgHAAQgDAAgCgBQgDgBgCgEIAAAggAgGghQgCACAAAGIAAAaQAAAEACADQACAEAEAAQAAAAABgBQABAAAAAAQABAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAgBAAgBQABAAAAgBIABgHIABgLIAAgLIgBgIQgBgBAAAAQAAgBgBgBQAAAAgBAAQAAgBAAAAQgCgCgDAAQgEAAgCAEg");
	this.shape_123.setTransform(39.65,20.7);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgGgDIgCgEIgDgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIACgFQACgFADgDQAFgDAFAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIACAHQACAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgGgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_124.setTransform(32.75,19.425);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAhDIAKAAIAABDgAgaAiIAAhDIALAAIAAAaIAFAAQAHAAADABQAEACACADQADACABAEIABAHIgCAJQAAAEgDADQgCADgEACQgCABgHAAgAgPAYIAFAAIAHgBIACgDIABgDIAAgEIAAgEIgBgEIgDgCIgGgBIgFAAg");
	this.shape_125.setTransform(27.35,19.425);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgPAAIAAAeIgKAAIAAhDIAKAAIAAAcIAPAAIAAgcIALAAIAABDg");
	this.shape_126.setTransform(21.8,19.425);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgdQgGAEgGAAQgGAAgEgEQgEgEAAgIIAAgaIALAAIAAAXQgBAKAIAAIAEgBIAEgDIAAgdIALAAIAABDg");
	this.shape_127.setTransform(17.1,19.425);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_128.setTransform(12.725,19.425);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAxIgFgDIgDgEIgCgFIgBgJIAAgLIAAgOIABgRIACgNQACgFADgEQADgDAEgCIAEgCIAEgCIAEgCIAFgCIAEAHIgFADIgEACIgEACIgFADQgEACgCAGQgCAGAAAHQADgDADgBIAEgCIAGABIAFADIACADIACAFIABAFIABAFIAAAHIAAAHIAAAHIgBAGQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgFQgDABgBADIgBAHIAAAOIAAAIIABAGQABADACABQACACACAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAABgBQACgBABgDQABgCAAgEIAAgLIAAgEIAAgFIAAgFIgBgDQgCgHgGAAQAAAAAAAAQgBAAAAABQgBAAAAAAQgBAAAAABg");
	this.shape_129.setTransform(8.175,17.925);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_130.setTransform(3.675,19.425);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAg6IgRAAIAAA6IgKAAIAAhDIAlAAIAABDg");
	this.shape_131.setTransform(-0.975,19.425);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgRAsIgKAAIAAhDIAKAAIAAArIAAAAIASgrIAJAAIAABDg");
	this.shape_132.setTransform(-8.25,19.425);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgdIgGAAQgEAAgBADQgCACgCAGIgDASIgKAAIAEgVIADgGQABgDADgCQgFgCgDgDQgCgFAAgFQAAgKAFgFQAFgFAJAAIASAAIAABDgAgEgVQgDADABAGQgBAEADADQADACADAAIAIAAIAAgVIgHAAQgEAAgDADg");
	this.shape_133.setTransform(-15.55,19.425);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAgsIAAAAIgRAsIgKAAIAAhDIAKAAIAAArIAAAAIARgrIAKAAIAABDg");
	this.shape_134.setTransform(-20.3,19.425);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("rgba(255,255,255,0.737)").s().p("AAIAiIAAgeIgQAAIAAAeIgKAAIAAhDIAKAAIAAAcIAQAAIAAgcIAKAAIAABDg");
	this.shape_135.setTransform(-25.15,19.425);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_136.setTransform(-29.875,19.425);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("rgba(255,255,255,0.737)").s().p("AgMAfQgFgEgBgKIAKgBQAAAFADACQACACADABQADgBADgCQADgDAAgFQAAgFgCgDQgBgEgEAAIgFAAIAAgIIAFAAQAEAAABgDQACgCAAgFQAAgDgCgDQgCgDgFAAQgHAAAAAJIgKgCQABgIAFgEQAFgFAGAAQAJAAAFAFQAFAEAAAKIAAAFIgCAEIgCAEIgDACQAFABABAEIABAKQAAAFgCAFQgBADgDACQgDADgDABIgHABQgHAAgFgEg");
	this.shape_137.setTransform(-34.425,19.4);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("rgba(255,255,255,0.737)").s().p("AgLAhQgCgBgCgDIgCgHIgBgHIABgIIADgHQACgCADgCQADgCAFAAIAJAAIAAgJQAAgEgBgDQgCgCgFAAIgEACQgCABgBAEIgKgDQACgHAFgEQAEgDAHAAQAIAAAFAEQAFAEAAALIAAAxIgLAAIAAgGQgCAEgEACQgCABgEAAQgEAAgDgCgAgFAFQgDADAAAGQAAAFACADQACACAEAAQAEAAACgDQACgDAAgFIAAgKIgHAAQgDAAgDACg");
	this.shape_138.setTransform(-38.675,19.425);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("rgba(255,255,255,0.737)").s().p("AALAiIgEgTIgCgFIgDgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAgBAAIgDAAIgGAAIAAAdIgKAAIAAhDIAKAAIAAAdIAEAAIAEAAIACgBIADgDIACgGIAFgTIAKAAIgFAUIgEAIQgBADgEACQAEAAACADIAEAJIAFAWg");
	this.shape_139.setTransform(-43.05,19.425);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_140.setTransform(-47.775,19.425);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAg6IgRAAIAAA6IgKAAIAAhDIAlAAIAABDg");
	this.shape_141.setTransform(-52.425,19.425);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_142.setTransform(-57.125,19.425);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAiIAAhDIARAAQAJAAAFAEQAFAFAAAJQAAAFgBADQgCADgDADQAEABABAEQACAEAAAFQAAALgFAFQgGAFgKAAgAgIAYIAIAAIAEgBIADgCIACgEIAAgEQAAgFgCgDQgCgCgGAAIgHAAgAgIgFIAGAAQAFAAACgDQADgCAAgFQAAgEgDgDQgCgCgFAAIgGAAg");
	this.shape_143.setTransform(-61.675,19.425);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("rgba(255,255,255,0.737)").s().p("AAKAiIAAgsIgBAAIgSAsIgKAAIAAhDIAKAAIAAArIABAAIASgrIAKAAIAABDg");
	this.shape_144.setTransform(-66.6,19.425);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAiIAAg6IgNAAIAAgJIAjAAIAAAJIgNAAIAAA6g");
	this.shape_145.setTransform(-70.825,19.425);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAGAAADABQAEACACACIADAHIABAIIAAAIIAAAIIgBAPQAAAGgCADIgFAGIgGADIgFAAIgHgBgAgDgXQgDABgBADIgBAIIAAAOIAAAJIABAHQACAGAFAAQABAAAAAAQABAAABAAQAAAAABgBQAAAAABgBQACgBABgDIAAgDIABgEIAAgGIAAgGIAAgEIAAgGIAAgFIgBgDQgCgGgGAAIgDABg");
	this.shape_146.setTransform(-74.875,19.425);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("rgba(255,255,255,0.737)").s().p("AgSAwIAAhfIAKAAIAAAGIAFgFQACgBAEAAIAEAAIAFACIAEAFIACAJIABAJIAAAJIgBANIgCAMQgBAEgDAEQgEACgFAAQgDAAgDgBQgDgBgCgEIAAAggAgFghQgDACAAAGIAAAaQAAAEACADQACAEAEAAQAAAAABgBQABAAAAAAQABAAAAAAQABgBAAAAQACgBABgDIABgHIAAgLIAAgLIgBgIQAAgBAAAAQAAgBgBgBQAAAAgBAAQAAgBAAAAQgCgCgDAAQgDAAgCAEg");
	this.shape_147.setTransform(-79.4,20.7);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAg6IgRAAIAAA6IgKAAIAAhDIAlAAIAABDg");
	this.shape_148.setTransform(-84.075,19.425);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("rgba(255,255,255,0.737)").s().p("AAJAiIAAgdIgFAAQgDAAgCADQgCACgCAGIgEASIgJAAIAEgVIADgGQABgDADgCQgGgCgCgDQgCgFAAgFQAAgKAFgFQAFgFAJAAIARAAIAABDgAgEgVQgCADgBAGQABAEACADQADACADAAIAHAAIAAgVIgGAAQgFAAgCADg");
	this.shape_149.setTransform(-91.3,19.425);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("rgba(255,255,255,0.737)").s().p("AgGAiIgFgDIgDgEIgCgFIgBgEIAAgGIAAgGIAAgFIAAgHIAAgHIABgGIABgEQACgFAEgDQAEgDAGAAQAJAAAEAFQAEAGAAAJIgKABQAAgGgCgDQgCgCgDAAIgEABQgCABgBADQgBACAAAGIAAAOIAAAJIABAHIACAEQACACADAAQAEAAABgDQACgDAAgFIAKACQAAAJgEAFQgFAFgJAAIgGgBg");
	this.shape_150.setTransform(-95.575,19.425);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("rgba(255,255,255,0.737)").s().p("AgEAiIAAg6IgNAAIAAgJIAjAAIAAAJIgNAAIAAA6g");
	this.shape_151.setTransform(-99.575,19.425);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("rgba(255,255,255,0.737)").s().p("AABAiIgDgDIgDgEIgCgFIgBgIIAAgKIgIAAIAAAeIgKAAIAAhDIAKAAIAAAcIAIAAIAAgKIACgIQABgFAEgDQADgDAHAAQAFAAADACQAEABACADIACAGIACAIIAAAJIAAAHIAAAIIgBAIQAAAFgCADQgCAEgDACIgFADIgGAAIgHgBgAAFgXQgCABgBAEIgBAIIgBANIAAAJIABAHQACAGAGAAQAAAAABAAQABAAAAAAQABAAAAgBQABAAAAgBQACgBABgDIABgDIAAgEIAAgGIAAgFIAAgFIAAgGIAAgEIgBgEQgBgGgGAAIgEABg");
	this.shape_152.setTransform(-104.375,19.425);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("rgba(255,255,255,0.737)").s().p("AgHAiIgEgDIgEgEIgCgFIAAgEIgBgGIAAgGIAAgFIAAgGIABgHIAAgGIABgFQADgFAEgDQAEgDAFAAQAKAAAFAFQADAGAAAKIAAAQIgaAAIAAAJIABAHQADAGAEAAQAEAAACgDQACgCAAgFIAKACQAAAJgEAEQgFAFgJAAIgHgBgAgDgXQgCABgBAEIgBAFIgBAIIAQAAIAAgGIAAgFIgBgEIgCgDIgFgBIgDABg");
	this.shape_153.setTransform(-109.75,19.425);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("rgba(255,255,255,0.737)").s().p("AAQAiIAAgtIgBAAIgFANIgIAQIgEAAIgHgPIgFgNIgBAAIAAAsIgKAAIAAhDIAKAAIAJAVIAGANIAGgNIAKgVIALAAIAABDg");
	this.shape_154.setTransform(-115.1,19.425);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("rgba(255,255,255,0.737)").s().p("AALAxIAAhEIgWBEIgJAAIAAhhIAJAAIAABEIABAAIAWhEIAJAAIAABhg");
	this.shape_155.setTransform(-120.95,18);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("rgba(255,255,255,0.737)").s().p("AAXCBIAAipIAAAAIguCpIgNAAIAAjXIAOAAIAACpIABABIAtiqIANAAIAADXgAgNhfQgGgEgDgFQgEgFgCgHIgBgMIALAAQABAIAFAHQAFAHAGAAQAGAAAFgHQAEgGACgJIAKAAIgBAMQgCAHgEAFQgDAFgGAEQgFADgGAAQgHAAgFgDg");
	this.shape_156.setTransform(144.6,-4.475);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAtAAIAAARIgtAAIAABUIAzAAIAAARg");
	this.shape_157.setTransform(136.1,-2.375);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("rgba(255,255,255,0.737)").s().p("AAXBsIAAipIgBAAIgtCpIgNAAIAAjXIANAAIAACpIABABIAtiqIAOAAIAADXg");
	this.shape_158.setTransform(126.75,-2.375);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("rgba(255,255,255,0.737)").s().p("AAbCBIAAgpIhBAAIAAjYIAOAAIAADGIApAAIAAjGIAOAAIAADGIAIAAIAAA7g");
	this.shape_159.setTransform(117.575,-0.35);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("rgba(255,255,255,0.737)").s().p("AAaBsIgLhEIgEgRQgDgHgEgEQgDgDgDgCIgJgBIgOAAIAABmIgOAAIAAjXIAOAAIAABgIAMAAIAIgBQAEgBADgEQADgDADgHQAEgGABgLIALg/IANAAIgKA/QgDAQgFAKQgFALgHAEQAJADAFALQAFALADAQIALBGg");
	this.shape_160.setTransform(108.225,-2.375);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("rgba(255,255,255,0.737)").s().p("AgdBtIAAgQIAGAAQAFABAFgHQAEgGADgQIADgMIgkigIAOAAIAaCEIABAAIAYiFIAOAAIghCpQgDAQgEAKQgCAJgEAFQgEAFgEACIgIABg");
	this.shape_161.setTransform(98.825,-2.3);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAgAAQAKAAAIAEQAIAFAEAIQAFAIACAMQACALAAAPQAAANgCAMQgCAMgFAHQgEAJgIAFQgIAFgLAAIgRAAIAABZgAgVABIAQAAQAIAAAFgCQAFgEAEgGQADgGABgIIABgTIgBgSQgBgIgDgGQgDgGgGgEQgFgEgIAAIgQAAg");
	this.shape_162.setTransform(90.525,-2.375);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("rgba(255,255,255,0.737)").s().p("AgGBsIAAjGIgcAAIAAgRIBGAAIAAARIgdAAIAADGg");
	this.shape_163.setTransform(82.1,-2.375);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("rgba(255,255,255,0.737)").s().p("AgZBhQgJgMAAgZIAAhxQAAgLACgLQACgKAEgHQAEgIAGgFQAHgEAJAAQAQAAAKANQAJAMAAAXIgOAEQAAgRgFgJQgGgIgKAAQgFAAgEADQgEADgDAFQgCAFgBAHIgBANIAAByIABANQABAGACAEQADAFAEADQAEADAFAAQAJAAAGgIQAGgIAAgSIAOADQAAAYgKAMQgJAMgQAAQgQAAgJgNg");
	this.shape_164.setTransform(74.4,-2.375);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("rgba(255,255,255,0.737)").s().p("AAWBsIAAhmIgqAAIAABmIgPAAIAAjXIAPAAIAABhIAqAAIAAhhIANAAIAADXg");
	this.shape_165.setTransform(65.05,-2.375);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("rgba(255,255,255,0.737)").s().p("AAXBsIAAipIAAAAIguCpIgNAAIAAjXIAOAAIAACpIABABIAtiqIANAAIAADXg");
	this.shape_166.setTransform(55.5,-2.375);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("rgba(255,255,255,0.737)").s().p("AgZBhQgJgMAAgZIAAhxQAAgLACgLQACgKAEgHQAEgIAHgFQAGgEAJAAQAQAAAKANQAJAMAAAXIgOAEQAAgRgGgJQgFgIgKAAQgFAAgEADQgEADgCAFQgDAFgBAHIgBANIAAByIABANQABAGADAEQACAFAEADQAEADAFAAQAJAAAGgIQAFgIABgSIAOADQAAAYgKAMQgJAMgQAAQgQAAgJgNg");
	this.shape_167.setTransform(42.4,-2.375);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("rgba(255,255,255,0.737)").s().p("AgiBsIAAjXIANAAIAABbIAQAAQAMAAAIAFQAIAEAFAHQAEAJACALQACALAAANQAAAOgCAMQgCAMgEAIQgFAJgIAFQgHAEgLAAgAgVBaIAQAAQAIAAAGgDQAFgEADgGQADgGABgIIABgSIgBgSQgCgIgCgGQgDgFgGgEQgFgDgIAAIgQAAg");
	this.shape_168.setTransform(29.45,-2.375);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("rgba(255,255,255,0.737)").s().p("AgZBhQgJgMAAgZIAAhxQAAgLACgLQACgKAEgHQAEgIAHgFQAGgEAJAAQAQAAAKANQAJAMAAAXIgOAEQAAgRgGgJQgFgIgKAAQgFAAgEADQgEADgCAFQgDAFgBAHIgBANIAAByIABANQABAGADAEQACAFAEADQAEADAFAAQAJAAAGgIQAFgIABgSIAOADQgBAYgJAMQgJAMgQAAQgQAAgJgNg");
	this.shape_169.setTransform(20.7,-2.375);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAsAAIAAARIgsAAIAABUIAzAAIAAARg");
	this.shape_170.setTransform(12.5,-2.375);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("rgba(255,255,255,0.737)").s().p("AgGBsIAAjGIgcAAIAAgRIBGAAIAAARIgdAAIAADGg");
	this.shape_171.setTransform(4.35,-2.375);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("rgba(255,255,255,0.737)").s().p("AgiBsIAAjXIANAAIAABbIAQAAQAMAAAIAFQAIAEAFAHQAEAJACALQACALAAANQAAAOgCAMQgCAMgEAIQgFAJgIAFQgHAEgLAAgAgVBaIAQAAQAIAAAGgDQAFgEADgGQADgGABgIIABgSIgBgSQgBgIgEgGQgDgFgFgEQgFgDgIAAIgQAAg");
	this.shape_172.setTransform(-3.5,-2.375);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("rgba(255,255,255,0.737)").s().p("AAkBsIAAiiIgBAAIgCALIgFAPIgEAPIgDAMIgCAEIgCALIgFANIgEAOIgCAKIgDAGIgGAAIgEgNIgEgRIgGgRIgDgLIgPg1IgBAAIAACiIgNAAIAAjXIAOAAIAEAOIAFAVIAGAUIAEAOIAQA8IAAAAIADgNIAFgRIAGgSIADgNIABgGIAEgMIAEgQIAFgPIAEgNIABgGIAOAAIAADXg");
	this.shape_173.setTransform(-14.35,-2.375);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("rgba(255,255,255,0.737)").s().p("AgaBhQgJgNAAgYIAAhxQAAgMACgKQACgKAEgIQAEgHAHgFQAHgEAJAAQAKAAAHAEQAHAEAEAHQAEAHACAKQACALAAAMIAABtQAAAbgJAOQgJAOgSAAQgRAAgJgNgAgKhYQgEAEgDAGQgCAGgBAHIgBANIAABwQAAAGABAGQABAGADAFQADAEAEADQAEADAFAAQAMAAAFgLQAFgKAAgPIAAhyIgBgNQgBgGgDgFQgCgFgFgDQgEgDgGAAQgFAAgFAEg");
	this.shape_174.setTransform(-25.125,-2.375);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("rgba(255,255,255,0.737)").s().p("AAaBsIgLhEIgEgRQgDgHgEgEQgDgDgDgCIgJgBIgOAAIAABmIgOAAIAAjXIAOAAIAABgIAMAAIAIgBQAEgBADgEQADgDADgHQAEgGABgLIALg/IANAAIgKA/QgDAQgFAKQgFALgHAEQAJADAFALQAFALADAQIALBGg");
	this.shape_175.setTransform(-33.975,-2.375);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("rgba(255,255,255,0.737)").s().p("AAbBsIgIg0IgmAAIgIA0IgNAAIAhjXIANAAIAjDXgAgHgXIgKA9IAhAAIgJg+IgHg0IAAAAg");
	this.shape_176.setTransform(-43.425,-2.375);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("rgba(255,255,255,0.737)").s().p("AAWBsIAAhmIgrAAIAABmIgNAAIAAjXIANAAIAABhIArAAIAAhhIANAAIAADXg");
	this.shape_177.setTransform(-52.65,-2.375);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("rgba(255,255,255,0.737)").s().p("AgNBsQgGgDgFgGQgEgFgDgJQgDgJAAgMIAAgBIANgEQABATAFAHQAGAIAJAAQAFAAADgCQAEgCADgFQADgFACgIQABgIAAgLIAAgKQAAgmgVAAIgHAAIAAgQIAIAAQAIAAAEgEQADgDADgGQABgGABgIIABgRQgBgJgBgHQgCgHgDgEQgCgFgFgBQgEgCgEAAQgJAAgGAJQgFAJgBAQIgNgFQABgMACgIQADgJAFgGQAFgGAGgDQAGgDAHAAQAOAAAJAKQAJAKABAXIABAGIAAAHIgBANIgCAOIgDANQgEAGgEACIAAABQAFADACAEQADAEABAGIACALIABAMIAAAMIAAAHIAAAHQgBAYgKAMQgJAMgPAAQgGAAgHgCg");
	this.shape_178.setTransform(-62.1,-2.375);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("rgba(255,255,255,0.737)").s().p("AgaBhQgJgNAAgYIAAhxQAAgMACgKQACgKAEgIQAEgHAHgFQAHgEAJAAQAKAAAHAEQAHAEAEAHQAEAHACAKQACALAAAMIAABtQAAAbgJAOQgJAOgSAAQgRAAgJgNgAgKhYQgEAEgDAGQgCAGgBAHIgBANIAABwQAAAGABAGQABAGADAFQADAEAEADQAEADAFAAQAMAAAFgLQAFgKAAgPIAAhyIgBgNQgBgGgDgFQgCgFgFgDQgEgDgGAAQgFAAgFAEg");
	this.shape_179.setTransform(-70.525,-2.375);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("rgba(255,255,255,0.737)").s().p("AAbBsIgIg0IgmAAIgIA0IgNAAIAhjXIANAAIAjDXgAgHgXIgKA9IAhAAIgJg+IgHg0IAAAAg");
	this.shape_180.setTransform(-83.575,-2.375);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAhAAQAJAAAIAEQAHADAEAHQAFAIACAKQABALAAAMQAAARgDAMQgEALgJAHIAAABQAKAEAEANQAEANAAATQAAAigKAPQgKAOgTAAgAgVBbIATAAQAHAAAFgEQAFgEADgGQACgHABgIIABgTQAAgTgFgLQgGgKgMAAIgUAAgAgVgNIATAAQAMAAAFgKQAGgKAAgTQAAgSgGgKQgGgKgNAAIgRAAg");
	this.shape_181.setTransform(-92.575,-2.375);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("rgba(255,255,255,0.737)").s().p("AgGBsIAAjGIgdAAIAAgRIBGAAIAAARIgcAAIAADGg");
	this.shape_182.setTransform(-101,-2.375);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("rgba(255,255,255,0.737)").s().p("AgZBhQgJgMAAgZIAAhxQAAgLACgLQACgKAEgHQAEgIAGgFQAHgEAJAAQAQAAAKANQAJAMAAAXIgOAEQAAgRgFgJQgGgIgKAAQgFAAgEADQgEADgDAFQgCAFgBAHIgBANIAAByIABANQABAGACAEQADAFAEADQAEADAFAAQAJAAAGgIQAGgIAAgSIAOADQAAAYgKAMQgJAMgQAAQgQAAgJgNg");
	this.shape_183.setTransform(-108.75,-2.375);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("rgba(255,255,255,0.737)").s().p("AAlCBIAAgpIhJAAIAAApIgNAAIAAg5IAIgCIAGgKQACgFACgJIACgUIABgeIADh8IBCAAIAADHIAJAAIAAA6gAgPgEQAAAagCASQgCASgGANIA0AAIAAi1IgoAAg");
	this.shape_184.setTransform(-118.575,-0.325);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAsAAIAAARIgsAAIAABUIAzAAIAAARg");
	this.shape_185.setTransform(-127.3,-2.375);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAgAAQAKAAAIAEQAIAFAEAIQAFAIACAMQACALAAAPQAAANgCAMQgCAMgFAHQgEAJgIAFQgIAFgLAAIgRAAIAABZgAgVABIAQAAQAIAAAFgCQAFgEAEgGQADgGABgIIABgTIgBgSQgBgIgDgGQgDgGgGgEQgFgEgIAAIgQAAg");
	this.shape_186.setTransform(-135.925,-2.375);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("rgba(255,255,255,0.737)").s().p("AgZBhQgJgMAAgZIAAhxQAAgLACgLQACgKAEgHQAEgIAHgFQAGgEAJAAQAQAAAKANQAJAMAAAXIgOAEQAAgRgGgJQgFgIgKAAQgFAAgEADQgEADgCAFQgDAFgBAHIgBANIAAByIABANQABAGADAEQACAFAEADQAEADAFAAQAJAAAGgIQAFgIABgSIAOADQAAAYgKAMQgJAMgQAAQgQAAgJgNg");
	this.shape_187.setTransform(-144.8,-2.375);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("rgba(255,255,255,0.737)").s().p("AgaBhQgJgNAAgYIAAhxQAAgMACgKQACgKAEgIQAEgHAHgFQAHgEAJAAQAKAAAHAEQAHAEAEAHQAEAHACAKQACALAAAMIAABtQAAAbgJAOQgJAOgSAAQgRAAgJgNgAgKhYQgEAEgDAGQgCAGgBAHIgBANIAABwQAAAGABAGQABAGADAFQADAEAEADQAEADAFAAQAMAAAFgLQAFgKAAgPIAAhyIgBgNQgBgGgDgFQgCgFgFgDQgEgDgGAAQgFAAgFAEg");
	this.shape_188.setTransform(136.775,-31.025);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("rgba(255,255,255,0.737)").s().p("AgfBsIAAjXIA/AAIAAASIgxAAIAADFg");
	this.shape_189.setTransform(128.525,-31.025);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("rgba(255,255,255,0.737)").s().p("AgaBhQgJgNAAgYIAAhxQAAgMACgKQACgKAEgIQAEgHAHgFQAHgEAJAAQAKAAAHAEQAHAEAEAHQAEAHACAKQACALAAAMIAABtQAAAbgJAOQgJAOgSAAQgRAAgJgNgAgKhYQgEAEgDAGQgCAGgBAHIgBANIAABwQAAAGABAGQABAGADAFQADAEAEADQAEADAFAAQAMAAAFgLQAFgKAAgPIAAhyIgBgNQgBgGgDgFQgCgFgFgDQgEgDgGAAQgFAAgFAEg");
	this.shape_190.setTransform(119.525,-31.025);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("rgba(255,255,255,0.737)").s().p("AAVBsIAAhmIgqAAIAABmIgNAAIAAjXIANAAIAABhIAqAAIAAhhIAPAAIAADXg");
	this.shape_191.setTransform(110.1,-31.025);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("rgba(255,255,255,0.737)").s().p("AAWBsIAAhmIgqAAIAABmIgPAAIAAjXIAPAAIAABhIAqAAIAAhhIANAAIAADXg");
	this.shape_192.setTransform(100.6,-31.025);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAtAAIAAARIgtAAIAABUIAzAAIAAARg");
	this.shape_193.setTransform(92.2,-31.025);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAhAAQAJAAAIAEQAHADAEAHQAFAIACAKQABALAAAMQAAARgDAMQgEALgJAHIAAABQAKAEAEANQAEANAAATQAAAigKAPQgKAOgTAAgAgVBbIATAAQAHAAAFgEQAFgEADgGQACgHABgIIABgTQAAgTgFgLQgGgKgMAAIgUAAgAgVgNIATAAQAMAAAFgKQAGgKAAgTQAAgSgGgKQgGgKgNAAIgRAAg");
	this.shape_194.setTransform(83.125,-31.025);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("rgba(255,255,255,0.737)").s().p("AgGBsIAAjGIgcAAIAAgRIBFAAIAAARIgcAAIAADGg");
	this.shape_195.setTransform(74.7,-31.025);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("rgba(255,255,255,0.737)").s().p("AgZBhQgJgMAAgZIAAhxQAAgLACgLQACgKAEgHQAEgIAGgFQAHgEAJAAQARAAAJANQAJAMAAAXIgOAEQAAgRgFgJQgGgIgKAAQgFAAgEADQgEADgDAFQgCAFgBAHIgBANIAAByIABANQABAGACAEQADAFAEADQAEADAFAAQAKAAAFgIQAGgIAAgSIAOADQgBAYgJAMQgJAMgQAAQgQAAgJgNg");
	this.shape_196.setTransform(67,-31.025);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAgAAQAKAAAIAEQAIAFAEAIQAFAIACAMQACALAAAPQAAANgCAMQgCAMgFAHQgEAJgIAFQgIAFgLAAIgRAAIAABZgAgVABIAQAAQAIAAAFgCQAFgEAEgGQADgGABgIIABgTIgBgSQgBgIgDgGQgDgGgGgEQgFgEgIAAIgQAAg");
	this.shape_197.setTransform(58.325,-31.025);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("rgba(255,255,255,0.737)").s().p("AAbBsIgIg0IgmAAIgIA0IgNAAIAhjXIANAAIAjDXgAgHgXIgKA9IAhAAIgJg+IgHg0IAAAAg");
	this.shape_198.setTransform(49.275,-31.025);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("rgba(255,255,255,0.737)").s().p("AAaBsIgLhEIgEgRQgDgHgEgEQgDgDgDgCIgJgBIgOAAIAABmIgOAAIAAjXIAOAAIAABgIAMAAIAIgBQAEgBADgEQADgDADgHQAEgGABgLIALg/IANAAIgKA/QgDAQgFAKQgFALgHAEQAJADAFALQAFALADAQIALBGg");
	this.shape_199.setTransform(40.625,-31.025);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAtAAIAAARIgtAAIAABUIAzAAIAAARg");
	this.shape_200.setTransform(31.8,-31.025);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("rgba(255,255,255,0.737)").s().p("AgpBhIAIgKQAEgFACgKQADgJABgPIABgnIAAh3IBAAAIAADXIgOAAIAAjFIglAAIAABbQAAAcgBATQgCATgCAMQgDANgFAHQgGAIgHAGg");
	this.shape_201.setTransform(21.875,-30.725);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("rgba(255,255,255,0.737)").s().p("AAlBsIAAiiIgCAAIgDALIgEAPIgEAPIgDAMIgBAEIgEALIgDANIgFAOIgDAKIgBAGIgHAAIgDgNIgGgRIgEgRIgEgLIgOg1IgCAAIAACiIgNAAIAAjXIAOAAIAEAOIAGAVIAFAUIAEAOIAQA8IABAAIADgNIAEgRIAGgSIADgNIACgGIADgMIAEgQIAFgPIADgNIACgGIAOAAIAADXg");
	this.shape_202.setTransform(7.2,-31.025);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAtAAIAAARIgtAAIAABUIAzAAIAAARg");
	this.shape_203.setTransform(-2.65,-31.025);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("rgba(255,255,255,0.737)").s().p("AAXBsIAAipIgBAAIgtCpIgNAAIAAjXIANAAIAACpIABABIAtiqIAOAAIAADXg");
	this.shape_204.setTransform(-11.95,-31.025);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("rgba(255,255,255,0.737)").s().p("AAVBsIAAhmIgpAAIAABmIgPAAIAAjXIAPAAIAABhIApAAIAAhhIAOAAIAADXg");
	this.shape_205.setTransform(-21.55,-31.025);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAsAAIAAARIgsAAIAABUIAzAAIAAARg");
	this.shape_206.setTransform(-30,-31.025);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("rgba(255,255,255,0.737)").s().p("AAWBsIAAhmIgrAAIAABmIgOAAIAAjXIAOAAIAABhIArAAIAAhhIANAAIAADXg");
	this.shape_207.setTransform(-39.25,-31.025);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAsAAIAAARIgsAAIAABUIAzAAIAAARg");
	this.shape_208.setTransform(-47.65,-31.025);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("rgba(255,255,255,0.737)").s().p("AAkBsIAAiiIgBAAIgCALIgFAPIgEAPIgDAMIgCAEIgDALIgDANIgFAOIgCAKIgCAGIgHAAIgEgNIgEgRIgGgRIgDgLIgPg1IgBAAIAACiIgNAAIAAjXIAOAAIAEAOIAFAVIAGAUIAEAOIAQA8IAAAAIAEgNIAEgRIAGgSIADgNIABgGIAEgMIAEgQIAFgPIADgNIACgGIAOAAIAADXg");
	this.shape_209.setTransform(-58.35,-31.025);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("rgba(255,255,255,0.737)").s().p("AAXBsIAAipIgBAAIgtCpIgNAAIAAjXIANAAIAACpIABABIAuiqIANAAIAADXg");
	this.shape_210.setTransform(-69.35,-31.025);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAgAAQAKAAAIAEQAIAFAEAIQAFAIACAMQACALAAAPQAAANgCAMQgCAMgFAHQgEAJgIAFQgIAFgLAAIgRAAIAABZgAgVABIAQAAQAIAAAFgCQAFgEAEgGQADgGABgIIABgTIgBgSQgBgIgDgGQgDgGgGgEQgFgEgIAAIgQAAg");
	this.shape_211.setTransform(-78.275,-31.025);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("rgba(255,255,255,0.737)").s().p("AAUBsIAAjFIgnAAIAADFIgPAAIAAjXIBFAAIAADXg");
	this.shape_212.setTransform(-87.7,-31.025);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("rgba(255,255,255,0.737)").s().p("AAlCBIAAgpIhJAAIAAApIgNAAIAAg5IAIgCIAGgKQACgFACgJIACgUIABgeIADh8IBCAAIAADHIAJAAIAAA6gAgPgEQAAAagCASQgCASgGANIA0AAIAAi1IgoAAg");
	this.shape_213.setTransform(-101.825,-28.975);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAsAAIAAARIgsAAIAABUIAzAAIAAARg");
	this.shape_214.setTransform(-110.55,-31.025);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("rgba(255,255,255,0.737)").s().p("AgjBsIAAjXIAgAAQAKAAAIAEQAIAFAEAIQAFAIACAMQACALAAAPQAAANgCAMQgCAMgFAHQgEAJgIAFQgIAFgLAAIgRAAIAABZgAgVABIAQAAQAIAAAFgCQAFgEAEgGQADgGABgIIABgTIgBgSQgBgIgDgGQgDgGgGgEQgFgEgIAAIgQAAg");
	this.shape_215.setTransform(-119.125,-31.025);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("rgba(255,255,255,0.737)").s().p("AggBsIAAjXIBBAAIAAASIgzAAIAABPIAsAAIAAARIgsAAIAABUIAzAAIAAARg");
	this.shape_216.setTransform(-127.55,-31.025);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("rgba(255,255,255,0.737)").s().p("AAVBsIAAjFIgpAAIAADFIgNAAIAAjXIBDAAIAADXg");
	this.shape_217.setTransform(-136.7,-31.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.law_text, new cjs.Rectangle(-151.2,-50.3,302.7,102.19999999999999), null);


(lib.description = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgxBHIgFgBIAAgOQAHAAADgDIAFgFIAHgSQAEgKAEgEQAEgEAGgBIAAgBQgHgBgGgDQgGgCgFgEQgFgFgCgGQgDgHAAgJQAAgNADgJQAEgJAIgFQAHgFAKgCQALgCAMAAIAbACQALAAAKAEIAACIIghAAIAAg1IgFAAQgLAAgFANIgIAUQgEALgHAGQgHAGgLAAIgNgCgAgBgzQgEABgDADQgDADgCAFQgCAEAAAIQAAAGACAGQACAEADADQADACAEACQADABAFAAIAPAAIAAgxIgPAAIgIABg");
	this.shape.setTransform(7.7,41.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAVBGIAAhXIgBAAIgmBXIgiAAIAAiLIAgAAIAABUIACAAIAjhUIAkAAIAACLg");
	this.shape_1.setTransform(-4.275,41.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AATBGIAAg8IglAAIAAA8IgiAAIAAiLIAiAAIAAA7IAlAAIAAg7IAiAAIAACLg");
	this.shape_2.setTransform(-17.5,41.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgrBGIAAiLIBXAAIAAAVIg1AAIAAB2g");
	this.shape_3.setTransform(-28.225,41.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgYBHQgIgCgGgFQgGgFgDgJQgEgJAAgNQAAgOAEgJQADgHAHgFQAFgFAJgCQAJgCAJAAIAMABIALACIAAgLQAAgRgIgGQgHgFgNAAIgcAAIAAgOQAGgDAJgBIASgCQANAAALACQALACAHAFQAHAGAEAJQAEAJAAAPIAABeIgYAAIgEgJIgBAAQgFAFgIADQgGADgMABQgJAAgHgCgAgDAEQgFABgCADIgFAHQgCAGAAAHQAAAIACAEIAFAIQACADAFABIAGABQAFAAAEgCQAEgBACgCIAAgtIgPAAQgDgBgDACg");
	this.shape_4.setTransform(-40.45,41.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAuBGIgGhXIgBAAIgZBCIgbAAIgZhCIgBAAIgHBXIgfAAIAKiLIAkAAIAfBUIAAAAIAghUIAkAAIAKCLg");
	this.shape_5.setTransform(-55,41.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQBGIAAh2IgjAAIAAgVIBnAAIAAAVIgjAAIAAB2g");
	this.shape_6.setTransform(23.45,15.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAVBGIAAhXIgBAAIgmBXIgiAAIAAiLIAgAAIAABUIACAAIAjhUIAkAAIAACLg");
	this.shape_7.setTransform(11.825,15.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAnBaQgEgHgDgKQgDgLgBgMIhXAAIAAiLIAiAAIAAB2IAjAAIAAh2IAiAAIAAB2IAQAAIAAA9g");
	this.shape_8.setTransform(-1.025,17.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAVBGIAAhXIgBAAIgmBXIgiAAIAAiLIAgAAIAABUIACAAIAjhUIAkAAIAACLg");
	this.shape_9.setTransform(-15.025,15.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgQB+IAAg2QgdgEgPgRQgQgRAAgiQAAggAQgSQAPgSAdgCIAAg3IAgAAIAAA3QAdACAQASQAQASAAAgQAAAigQARQgQARgdAEIAAA2gAAQA0QAHgCAEgDQAFgCADgGQAEgGACgKQACgJAAgOQAAgNgCgKQgCgJgEgGQgDgGgFgDQgEgCgHgCgAgbgvQgFADgDAGQgDAGgCAJQgCAKAAANQAAAOACAJQACAKADAGQADAGAFACQAFADAGACIAAhnQgGACgFACg");
	this.shape_10.setTransform(-29.8,15.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgRBFQgMgEgIgJQgIgIgDgOQgEgOAAgUQAAgTAEgOQADgNAHgJQAHgJAKgEQAKgEALABQANgBAKAEQAKAEAGAJQAHAJAEANQADAOAAATIAAAKIhHAAQAAAYAIAKQAJAJARAAIAeAAIAAAOQgGADgKABQgJABgLABQgPgBgMgDgAgHg0QgDACgDAFQgCAFgCAJQgBAIAAAPIAmAAQAAgPgCgIQgBgJgDgFQgCgFgEgCQgEgBgEAAQgDAAgEABg");
	this.shape_11.setTransform(-43.975,15.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAwBaQgEgHgDgKIgEgXIhJAAQgBAMgDALQgDAKgEAHIgVAAIAAg9IAMAAIAIgOQAEgJABgOIAEhRIBbAAIAAB2IARAAIAAA9gAgKgIQAAAOgEAJIgIAOIApAAIAAhhIgZAAg");
	this.shape_12.setTransform(-57.05,17.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQBGIAAh2IgjAAIAAgVIBnAAIAAAVIgjAAIAAB2g");
	this.shape_13.setTransform(35.65,-11.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRBFQgMgEgIgJQgIgJgDgNQgEgOAAgUQAAgTAEgOQADgNAHgJQAHgJAKgEQAKgDALAAQANAAAKADQAKAEAGAJQAHAJAEANQADAOAAATIAAAKIhHAAQAAAYAIAKQAJAJARAAIAeAAIAAAOQgGACgKACQgJABgLAAQgPAAgMgDgAgHg0QgDACgDAFQgCAFgCAJQgBAJAAAOIAmAAQAAgOgCgJQgBgJgDgFQgCgFgEgCQgEgCgEABQgDgBgEACg");
	this.shape_14.setTransform(24.725,-11.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgxBIIgGgCIAAgOQAIAAADgCIAFgHIAHgSQAEgJAEgEQAEgEAHgCIAAgBQgHAAgHgCQgGgDgFgEQgFgEgDgHQgCgHAAgJQAAgOADgJQAFgIAHgFQAHgFAKgCQALgCALABIAcAAQALACAKADIAACIIghAAIAAg1IgGAAQgKAAgFAMIgIAWQgEAKgHAGQgGAFgMAAIgNAAgAgBgzQgEABgDADQgDADgCAFQgCAEAAAIQAAAHACAEQACAFADADQADADAEAAQADACAEAAIAQAAIAAgxIgQAAIgHABg");
	this.shape_15.setTransform(11.95,-11.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AATBGIAAg8IglAAIAAA8IgiAAIAAiLIAiAAIAAA7IAlAAIAAg7IAiAAIAACLg");
	this.shape_16.setTransform(0.05,-11.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgYBHQgIgCgGgFQgGgFgDgIQgEgJAAgOQAAgOAEgIQADgIAHgFQAFgFAJgCQAJgCAJAAIAMABIALACIAAgLQAAgRgIgFQgHgGgNAAIgcAAIAAgOQAGgCAJgCIASgBQANgBALACQALACAHAGQAHAEAEAKQAEAKAAAOIAABeIgYAAIgEgIIgBAAQgFAEgIAEQgGACgMAAQgJAAgHgBgAgDAEQgFABgCADIgFAIQgCAEAAAIQAAAIACAEIAFAIQACADAFABIAGABQAFAAAEgBQAEgCACgDIAAgtIgPAAQgDABgDABg");
	this.shape_17.setTransform(-13,-11.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag1BjIAAjDIAYAAIAEAJIABAAQAFgFAIgDQAGgDAMAAQAJAAAKADQAIAEAHAJQAGAJAEANQADAOAAAUQAAAUgDANQgEAOgHAIQgGAJgJAEQgKAEgMAAQgGAAgFgCQgGgCgFgDIAAA8gAgNhNIgGAEIAABeQACACAEACQAEABAFAAQAFAAAEgCQAFgCADgGQADgGACgKQACgKAAgQQAAgPgCgLQgCgKgDgGQgDgGgFgDQgEgCgFAAQgFAAgEACg");
	this.shape_18.setTransform(-24.8,-8.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgQBGIAAh2IgjAAIAAgVIBnAAIAAAVIgjAAIAAB2g");
	this.shape_19.setTransform(-36.45,-11.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgNBFQgLgEgIgJQgHgJgEgNQgEgOAAgUQAAgTAEgOQAEgNAHgJQAHgJAKgEQALgDANAAQAKgBAKACQAJACAHACIAAAOIgfAAQgGAAgFACQgEADgEAFQgEAHgCAKQgCAKAAAPQAAAQACAKQACAKAEAHQAEAFAFADQAGACAHAAIAfAAIAAAOQgHACgJACQgKABgLAAQgOAAgKgDg");
	this.shape_20.setTransform(-46.075,-11.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AggBiIgMgFIAAgNIASAAQAFAAAFgCQADgBAEgEIAGgLIAEgTQgMAAgKgJQgJgKgDgOIgahsIAhAAIAZBsIABAFIACADIADACIAXh2IAfAAIgaCNQgFAegNANQgMAOgTAAQgJAAgHgCg");
	this.shape_21.setTransform(-57.75,-8.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgXBFQgKgEgHgJQgIgJgDgNQgEgOAAgUQAAgTAEgOQADgNAIgJQAHgJAKgEQAKgDANgBQAOABALADQAKAEAHAJQAHAJADANQAEAOAAATQAAAUgEAOQgDANgHAJQgHAJgKAEQgLAEgOgBQgNABgKgEgAgIgzQgDACgDAGQgEAHgBAKQgCAKAAAQQAAAQACALQABAKAEAGQADAHADACQAFADADgBQAFABAEgDQAEgCADgHQADgGACgKQABgLABgQQgBgQgBgKQgCgKgDgHQgDgGgEgCQgEgCgFgBQgDABgFACg");
	this.shape_22.setTransform(58.3,-37.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AATBGIAAg8IglAAIAAA8IgiAAIAAiLIAiAAIAAA7IAlAAIAAg7IAiAAIAACLg");
	this.shape_23.setTransform(45.5,-37.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgfBHQgMgBgLgDIAAiFQALgEALgBIAagBQANABAKABQAKACAIAEQAHAFADAHQAEAIAAALQAAAHgCAFIgFAJIgIAFIgHADIAAACIAJACQAFACAEAFQAEAEADAGQADAGAAAIQAAAMgEAJQgEAHgHAFQgHAFgMACQgLACgNgBIgcgBgAgUA1IARAAIAIgBQAEgBAEgDQADgCACgFQACgFAAgHQAAgMgHgFQgIgFgIAAIgRAAgAgUgLIAOAAIAHgBIAHgEIAEgGQACgEAAgFQAAgGgCgEQgCgEgDgCQgDgDgDgBIgHgBIgOAAg");
	this.shape_24.setTransform(33.025,-37.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAVBGIAAhXIgBAAIgmBXIgiAAIAAiLIAgAAIAABVIACAAIAjhVIAkAAIAACLg");
	this.shape_25.setTransform(19.575,-37.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgQBGIAAh2IgjAAIAAgVIBnAAIAAAVIgjAAIAAB2g");
	this.shape_26.setTransform(8,-37.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAPBCQgHgGgDgLIgGgaQgCgIgEgEQgEgEgFAAIgFAAIAAA/IgiAAIAAiLIAiAAIAAA4IAFAAQADAAACgDQADgDAEgJIAIgVQAEgLAGgGQAIgFAMgBIAHAAIAGABIAFACIAAAOQgHAAgDACQgEADgBAEIgHASQgFAMgEAFQgGAGgGABIAAACQAIABAGAFQAHAGADANIAGAWQABAEAEADQAEAEAIAAIAAAOIgGABIgNABQgNAAgJgGg");
	this.shape_27.setTransform(-2.25,-37.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRBFQgMgEgIgJQgIgJgDgNQgEgOAAgUQAAgTAEgOQADgNAHgJQAHgJAKgEQAKgDALgBQANABAKADQAKAEAGAJQAHAIAEAOQADAOAAATIAAAKIhHAAQAAAYAIAJQAJAKARAAIAeAAIAAAOQgGACgKACQgJACgLgBQgPABgMgEgAgHg0QgDACgDAFQgCAFgCAJQgBAJAAANIAmAAQAAgNgCgJQgBgJgDgFQgCgFgEgCQgEgBgEgBQgDABgEABg");
	this.shape_28.setTransform(-15.075,-37.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgQB+IAAg3QgdgCgPgSQgQgSAAghQAAghAQgRQAPgSAdgDIAAg2IAgAAIAAA2QAdADAQASQAQARAAAhQAAAhgQASQgQASgdACIAAA3gAAQA0QAGgBAGgEQAEgCAEgGQADgGACgJQACgKAAgOQAAgNgCgJQgCgKgDgGQgEgGgEgCQgGgDgGgCgAgaguQgGACgDAGQgDAGgDAKQgBAJAAANQAAAOABAKQADAJADAGQADAGAGACQAEAEAGABIAAhnQgGACgEADg");
	this.shape_29.setTransform(-29.15,-37.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgQB+IAAg3QgdgCgPgSQgQgSAAghQAAghAQgRQAPgSAdgDIAAg2IAhAAIAAA2QAcADAQASQAQARAAAhQAAAhgQASQgQASgcACIAAA3gAARA0QAGgBAEgEQAFgCAEgGQADgGACgJQACgKAAgOQAAgNgCgJQgCgKgDgGQgEgGgFgCQgEgDgGgCgAgaguQgFACgEAGQgEAGgCAKQgCAJAAANQAAAOACAKQACAJAEAGQAEAGAFACQAEAEAGABIAAhnQgGACgEADg");
	this.shape_30.setTransform(-45.5,-37.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgfBHQgJgCgHgCIAAgOIAfAAQAHAAAGgCQAFgCAEgFQADgFACgJQACgJABgNIgpAAIAAgTIApAAQgBgXgHgKQgGgIgNAAIgfAAIAAgOQAHgCAJgCQAKgBALgBQAMABALADQAKAEAHAJQAHAJAEANQAEAOAAATQAAAUgEAOQgEANgHAJQgIAJgLAEQgLAEgNgBQgLABgKgCg");
	this.shape_31.setTransform(-59.075,-37.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.description, new cjs.Rectangle(-66.2,-57.7,132.5,115.4), null);


(lib.bg2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#999999").ss(4,1,1).p("EgXbAnEMAAAhOHMAu3AAAMAAABOH");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EgXbAu4IAAvoMAAAhOHMAu3AAAMAAABOHIAAPog");
	this.shape_1.setTransform(0,50);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg2, new cjs.Rectangle(-152,-252,304,602), null);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#19A1DC").s().p("EgXbAu4MAAAhdvMAu3AAAMAAABdvg");
	this.shape.setTransform(0,50);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-150,-250,300,600), null);


(lib.arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AEQiHIkQEPIkPkP");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arrow, new cjs.Rectangle(-28.1,-14.5,56.3,29.1), null);


(lib.Символ25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D92E81").s().p("AhBANIAAgZICDAAIAAAZg");
	this.shape.setTransform(42.5424,19.0762,1.3984,1.3984);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D92E81").s().p("AhBANIAAgZICDAAIAAAZg");
	this.shape_1.setTransform(42.5424,11.6645,1.3984,1.3984);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D92E81").s().p("AhBANIAAgZICDAAIAAAZg");
	this.shape_2.setTransform(42.5424,4.2529,1.3984,1.3984);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#513770").s().p("AgHAoIAAgIQgLgBgGgHQgMgLAAgQQAAgQAMgLQAIgJAQAAQARAAAIAJQAMALAAAQQAAAQgMALQgHAHgKABIAAAIgAAIASQAHgBADgHQACgGAAgHQAAgHgCgGQgEgIgGgBgAgRgQQgCAGAAAHQAAAHACAGQADAHAHABIAAgrQgGABgEAIg");
	this.shape_3.setTransform(9.8892,33.8995,1.3984,1.3984);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#513770").s().p("AgrA2IAAgWIAGAAIAUhWIAiAAIAUBWIAHAAIAAAWgAgNAgIAbAAIgNhAIgCAAg");
	this.shape_4.setTransform(75.975,34);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#513770").s().p("AgUAnIAAgPIARAAQADAAADgDQABgBABgHIAAgGIgYAAIAAgOIAYAAIAAgGIAAAAIgBgEIgBgDQgDgDgDAAIgRAAIAAgPIASAAQAFAAAEABIAGAEIABABQAHAGAAAMIAAAaQAAAJgDAHIgEAFQgEAEgFABIgHABg");
	this.shape_5.setTransform(57.3656,34.0043,1.3984,1.3984);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#513770").s().p("AAIAnIAAghIgQAAIAAAhIgQAAIAAhNIAQAAIAAAdIAQAAIAAgdIARAAIAABNg");
	this.shape_6.setTransform(66.1407,34.0043,1.3984,1.3984);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#513770").s().p("AALAnIgKg+IgBAAIgKA+IgRAAIAPhNIAZAAIAPBNg");
	this.shape_7.setTransform(48.6255,34.0043,1.3984,1.3984);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#513770").s().p("AANAnIAAg3IgNAVIgMgVIAAA3IgQAAIAAhNIARAAIALAVIAMgVIARAAIAABNg");
	this.shape_8.setTransform(38.8016,34.0043,1.3984,1.3984);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#513770").s().p("AgWAnIAAhNIAVAAQALAAAFAGQAIAGAAAOQAAAOgIAHQgFAFgLAAIgFAAIAAAZgAgGAAIAEAAQADAAADgCQACgDAAgGQAAgHgCgCQgDgDgDAAIgEAAg");
	this.shape_9.setTransform(29.4322,34.0043,1.3984,1.3984);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#513770").s().p("AAMAnIgDgRIgRAAIgDARIgRAAIAQhNIAYAAIARBNgAgFAGIALAAIgFgdIgBAAg");
	this.shape_10.setTransform(20.3074,34.0043,1.3984,1.3984);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#513770").s().p("AhBBCIAAiDICDAAIAACDg");
	this.shape_11.setTransform(42.5424,56.0645,1.3984,1.3984);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ25, new cjs.Rectangle(4.8,2.4,75.60000000000001,63.00000000000001), null);


(lib.Символ4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D6097B").s().p("AghBeIAGggIAeAAIgEAggAgWArIATiIIAlAAIgeCIg");
	this.shape.setTransform(159.6,49.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D6097B").s().p("AApBEIAQhcQABgHgBgFIgDgHQgDgDgDgBQgDgBgEAAQgFAAgEABIgIADIABAIIgBAMIgRBcIgeAAIAQhcQABgHgBgFQgBgEgCgDQgCgDgEgBIgGgBQgFAAgEACIgGADIgUBvIggAAIAYiEIAWAAIADAIIABAAIANgHQAIgEAMAAQAJAAAGADQAHADAEAFQAHgFAJgDQAIgDAMAAQAIAAAHACQAHACAFAFQAEAEACAJQACAIgCANIgRBcg");
	this.shape_1.setTransform(145.4444,51.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D6097B").s().p("AgfBCQgLgFgGgIQgGgIgBgNQgBgNADgTQADgRAGgOQAGgNAIgIQAJgJALgDQAKgEAOAAQAXAAALALQALALgDATQgEAUgPAJQgPAKgYAAIgVAAQgEAVAHAIQAGAKAQAAIAdAAIgCANIgQAEQgJABgJAAQgQAAgKgDgAAAgxQgEACgEAFQgDAFgEAJQgDAJgCAOIAUAAQAJAAAHgGQAGgGACgKQACgMgEgGQgFgFgHAAQgGAAgEABg");
	this.shape_2.setTransform(130.0297,51.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D6097B").s().p("AgnBCQgHgFgFgIQgEgIgBgNQgBgNADgTQADgRAGgOQAGgNAJgIQAIgJAMgDQALgEAOAAQAOAAAKACQAKACAJAEIgWB/IgXAAIgDgIIgBAAQgFADgHAEQgHADgLAAQgKAAgIgDgAABgvQgEADgFAFQgEAGgEAKQgDAJgDAOQgDAPAAAKQAAAJADAHQACAFAEADQAEACAFAAQAFgBADgBQAEgCACgCIARheIgMAAQgGgBgFADg");
	this.shape_3.setTransform(117.1389,51.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D6097B").s().p("AApBEIAQhcQABgHgBgFIgDgHQgDgDgDgBQgDgBgEAAQgFAAgEABIgIADIABAIIgBAMIgRBcIgeAAIAQhcQABgHgBgFQgBgEgCgDQgCgDgEgBIgGgBQgFAAgEACIgGADIgUBvIggAAIAYiEIAWAAIADAIIABAAIANgHQAIgEAMAAQAJAAAGADQAHADAEAFQAHgFAJgDQAIgDAMAAQAIAAAHACQAHACAFAFQAEAEACAJQACAIgCANIgRBcg");
	this.shape_4.setTransform(100.4444,51.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#D6097B").s().p("AghBCQgKgFgFgIQgFgIgBgNQgBgNADgTQADgRAGgOQAGgNAIgIQAIgJALgDQAKgEAMAAQANAAAJAEQAKADAFAJQAFAIABANQABAOgDARQgDATgGANQgGANgIAIQgIAIgLAFQgKADgMAAQgNAAgJgDgAAAgwQgDACgEAGQgDAGgEAKQgDAJgDAPQgDAPAAAKQAAALACAFQABAGAEADQADACAFAAQAEAAAEgCQAEgDAEgGQAEgFADgLIAGgZQADgPAAgJQAAgKgCgGQgBgGgEgCQgDgCgFAAQgEAAgFACg");
	this.shape_5.setTransform(84.5264,51.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D6097B").s().p("Ag3BRQgLgPAGgkIAIgqQAEgXAGgPQAGgPAKgJQAKgKAOgEQAOgFATAAIAggCIgBAOQgHADgKACQgKADgLABQgKABgHADQgGADgFAEQgFAGgDAIQgEAIgCAMIALgFQAGgCAHAAQAMABAJADQAJADAFAJQAFAHABALQABANgDARQgGAkgQAPQgRAPgYAAQgaAAgLgPgAgOgOIgHAFIgHAnQgDAPABAJQAAAJACAGQACAFADACQAEADADAAQAEAAAFgDQAEgCADgFQAEgGADgJQAEgJACgPQADgNgBgJQAAgIgDgFQgCgFgFgDQgEgCgFAAQgGAAgEABg");
	this.shape_6.setTransform(72.3691,49);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#D6097B").s().p("AgnBCQgHgFgFgIQgEgIgBgNQgBgNADgTQADgRAGgOQAGgNAJgIQAIgJAMgDQALgEAOAAQAOAAAKACQAKACAJAEIgWB/IgXAAIgDgIIgBAAQgFADgHAEQgHADgLAAQgKAAgIgDgAABgvQgEADgFAFQgEAGgEAKQgDAJgDAOQgDAPAAAKQAAAJADAHQACAFAEADQAEACAFAAQAFgBADgBQAEgCACgCIARheIgMAAQgGgBgFADg");
	this.shape_7.setTransform(58.5389,51.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D6097B").s().p("Ag+BeIAhi4IAWAAIADAHIABAAIAMgHQAHgDALAAQAKAAAIAEQAHADAFAJQAFAIABANQABANgEATQgDATgGAMQgFANgIAIQgIAIgJAEQgKAEgLAAQgFAAgGgCQgFgCgEgDIgKA5gAAFhJIgGAEIgQBZQACACADACQAEABAFAAQAEAAAEgCQAFgCAEgGQAFgGADgJQAEgJADgPQACgPAAgKQAAgKgCgFQgDgGgEgCQgEgDgFAAQgFAAgDACg");
	this.shape_8.setTransform(44.8611,54.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D6097B").s().p("AghBCQgKgFgFgIQgFgIgBgNQgBgNADgTQADgRAGgOQAGgNAIgIQAIgJALgDQAKgEAMAAQANAAAJAEQAKADAFAJQAFAIABANQABAOgDARQgDATgGANQgGANgIAIQgIAIgLAFQgKADgMAAQgNAAgJgDgAAAgwQgDACgEAGQgDAGgEAKQgDAJgDAPQgDAPAAAKQAAALACAFQABAGAEADQADACAFAAQAEAAAEgCQAEgDAEgGQAEgFADgLIAGgZQADgPAAgJQAAgKgCgGQgBgGgEgCQgDgCgFAAQgEAAgFACg");
	this.shape_9.setTransform(25.9264,51.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D6097B").s().p("AApBEIAQhcQABgHgBgFIgDgHQgDgDgDgBQgDgBgEAAQgFAAgEABIgIADIABAIIgBAMIgRBcIgeAAIAQhcQABgHgBgFQgBgEgCgDQgCgDgEgBIgGgBQgFAAgEACIgGADIgUBvIggAAIAYiEIAWAAIADAIIABAAIANgHQAIgEAMAAQAJAAAGADQAHADAEAFQAHgFAJgDQAIgDAMAAQAIAAAHACQAHACAFAFQAEAEACAJQACAIgCANIgRBcg");
	this.shape_10.setTransform(9.4444,51.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#D6097B").s().p("AgtBeQgLgBgGgDIADgPIAgAAQAJAAAHgCQAIgDAGgIQAHgIAFgNQAFgNAEgUIg1AAIAEgUIA1AAQACgSgBgNQAAgMgEgHQgEgHgGgDQgGgCgIAAIgfAAIADgPIARgEQALgCAOAAQAOAAALAFQAKAFAGALQAFAKABATQABASgFAbQgFAcgHASQgIATgJAKQgKALgNAFQgLAFgPAAQgOAAgLgCg");
	this.shape_11.setTransform(-6.6477,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ4, new cjs.Rectangle(-15.9,32,180.70000000000002,35.8), null);


// stage content:
(lib._300x600 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(244));

	// bg_copy
	this.instance = new lib.bg1();
	this.instance.setTransform(150,250,1,1,0,0,0,0.1,0.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(238).to({_off:false},0).to({alpha:1},5,cjs.Ease.quartOut).wait(1));

	// slogan
	this.instance_1 = new lib.Символ4();
	this.instance_1.setTransform(419.3,338.7,1,1,0,0,0,75.4,14.6);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(194).to({_off:false},0).to({regX:75.5,x:151.4},8,cjs.Ease.backOut).wait(42));

	// logo
	this.instance_2 = new lib.Символ25();
	this.instance_2.setTransform(416.95,251.85,2.1801,2.1801,0,0,0,41.3,34.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(192).to({_off:false},0).to({x:148.95},8,cjs.Ease.backOut).wait(44));

	// bg_copy
	this.instance_3 = new lib.bg2();
	this.instance_3.setTransform(150,250,1,1,0,0,0,0.1,0.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(186).to({_off:false},0).to({alpha:1},6).wait(52));

	// main_text
	this.instance_4 = new lib.description();
	this.instance_4.setTransform(222.2,440.4,1,1,0,0,0,0.1,0.1);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(113).to({_off:false},0).to({alpha:1},8,cjs.Ease.quartOut).to({_off:true},72).wait(51));

	// law_text
	this.instance_5 = new lib.law_text();
	this.instance_5.setTransform(150.4,543.2,1,1,0,0,0,0.1,0.1);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(113).to({_off:false},0).to({alpha:1},8,cjs.Ease.quartOut).to({_off:true},72).wait(51));

	// pack
	this.instance_6 = new lib.Tween4("synched",0);
	this.instance_6.setTransform(80.9,583.9);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(101).to({_off:false},0).to({y:424.5},12,cjs.Ease.backOut).to({_off:true},80).wait(51));

	// bg2
	this.instance_7 = new lib.Tween5("synched",0);
	this.instance_7.setTransform(150,610,1,1.1976,0,0,0,0.1,0.1);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(103).to({_off:false},0).to({regY:0,y:509.8},10,cjs.Ease.backOut).to({_off:true},80).wait(51));

	// Layer_2
	this.instance_8 = new lib.name();
	this.instance_8.setTransform(150,351.95,1,1,0,0,0,0.1,0.1);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(121).to({_off:false},0).to({alpha:1},9,cjs.Ease.quartOut).to({_off:true},63).wait(51));

	// girl
	this.instance_9 = new lib.Tween3("synched",0);
	this.instance_9.setTransform(450,277.2,1,1,0,0,0,0.1,0.1);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(88).to({_off:false},0).to({x:150},13,cjs.Ease.cubicOut).to({_off:true},92).wait(51));

	// h1
	this.instance_10 = new lib.Tween1("synched",0);
	this.instance_10.setTransform(151.5,462.4,1,1,0,0,0,0.1,0.1);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(54).to({_off:false},0).to({regY:0,y:493.8,alpha:1},6,cjs.Ease.backOut).to({_off:true},114).wait(70));

	// arrow
	this.instance_11 = new lib.arrow();
	this.instance_11.setTransform(57.25,366.5,1,1,0,0,0,0.1,0.1);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(48).to({_off:false},0).to({y:378.75,alpha:1},7,cjs.Ease.backOut).to({_off:true},119).wait(70));

	// li6
	this.instance_12 = new lib.li6();
	this.instance_12.setTransform(79.9,276.15,1,1,0,0,0,68,0.1);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(40).to({_off:false},0).to({y:301.15,alpha:1},9,cjs.Ease.backOut).to({_off:true},125).wait(70));

	// li5
	this.instance_13 = new lib.li5();
	this.instance_13.setTransform(79.9,234.65,1,1,0,0,0,68,0.1);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(32).to({_off:false},0).to({y:249.65,alpha:1},9,cjs.Ease.backOut).to({_off:true},133).wait(70));

	// li4
	this.instance_14 = new lib.li4();
	this.instance_14.setTransform(79.9,173.15,1,1,0,0,0,68,0.1);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(24).to({_off:false},0).to({y:198.15,alpha:1},9,cjs.Ease.backOut).to({_off:true},141).wait(70));

	// li3
	this.instance_15 = new lib.li3();
	this.instance_15.setTransform(79.9,131.65,1,1,0,0,0,68,0.1);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(16).to({_off:false},0).to({y:146.65,alpha:1},9,cjs.Ease.backOut).to({_off:true},149).wait(70));

	// li2
	this.instance_16 = new lib.li2();
	this.instance_16.setTransform(79.9,80.15,1,1,0,0,0,68,0.1);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(8).to({_off:false},0).to({y:95.15,alpha:1},9,cjs.Ease.backOut).to({_off:true},157).wait(70));

	// li1
	this.instance_17 = new lib.li1();
	this.instance_17.setTransform(79.9,28.65,1,1,0,0,0,68,0.1);
	this.instance_17.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).to({y:43.65,alpha:1},9,cjs.Ease.backOut).to({_off:true},165).wait(70));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#19A1DC").s().p("EgXbAnEMAAAhOHMAu3AAAMAAABOHg");
	this.shape.setTransform(150,299.9992,1,1.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},174).wait(70));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(147.9,297.9,478,437.4);
// library properties:
lib.properties = {
	id: 'A6AD0BDDFFB9E84E973458C0E845987F',
	width: 300,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/300x600_atlas_1.png", id:"300x600_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A6AD0BDDFFB9E84E973458C0E845987F'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
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
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;