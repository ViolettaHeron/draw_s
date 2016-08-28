var options = [
	'single'
	, 'mirror2'
	, 'mirror4'
	, 'dot_symetrie'
]


function init(){
	var can = document.getElementById('drawing_zone');
	var ctx=can.getContext("2d");
	putSize(can);
	addEvents(can)
}

function putSize(can){
	can.height = window.innerHeight;
	can.width = window.innerWidth;
}

function putSquareSize(can){
	var l = window.innerHeight>window.innerWidth ? window.innerWidth : window.innerHeight;
	can.height = l;
	can.width = l;
}

function drawSingle(can,t,e){
	var context = can.getContext('2d')
	var gap = ( t % 50 )+50*(Math.random()*0.1+0.5);
	context.lineWidth = 1.5;

	context.beginPath();
	context.moveTo(lastmx, lastmy);
	context.lineTo(Math.cos(e.x*Math.PI*2+t)*gap+e.x, Math.sin(e.y*Math.PI*2+t)*gap+e.y);
	//context.lineTo(e.x, e.y);
	context.stroke();

	lastmx = Math.cos(e.x*Math.PI*2+t)*gap+e.x;
	lastmy = Math.sin(e.y*Math.PI*2+t)*gap+e.y;

	context.lineWidth = 0.5;

	context.beginPath();
	context.moveTo(e.x, e.y);
	context.lineTo(lastmx, lastmy);
	context.lineTo(lastx, lasty);
	context.lineTo(e.x, e.y);
	context.stroke();

	lastx = e.x;
	lasty = e.y;7
}

function drawMirror2(can,t,e){

}


/**
* EVENTS
*/

var mouse = 0;
var lastx,lasty;
var lastmx,lastmy;
function addEvents(can){
	var context=can.getContext('2d');
	context.strokeStyle = "hsl("+Math.floor(Math.random()*45+173)+", "+Math.floor(Math.random()*10+56)+"%, "+Math.floor(Math.random()*20+80)+"%)";
	var t=1;
	window.addEventListener('resize', function(){
		putSize(can);
	}
	, true);

	can.addEventListener('mousedown', function(e){
		mouse = 1;
		t=1;
		lastx = e.x;
		lasty = e.y;
		lastmx = e.x;
		lastmy = e.y;
	},true);

	window.addEventListener('mouseup', function(e){
		mouse = 0;
	},true);

	var t=0;
	can.addEventListener('mousemove', function(e){
		if(e.isTrusted && mouse == 1){
			drawSingle(can,t,e)
			t+=0.3;
		}
	}
	, true);
}


/*

AJOUTER FEATURES
	choisir couleur
	miroir et point de symétrie
	choisir couleur arrière plan
	tester mobile <3
*/