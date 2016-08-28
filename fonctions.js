/*
* variables
*/
var options = [
	'single'
	, 'mirror2'
	, 'mirror4'
	, 'dot_symetrie'
]

var opened_menu = false;

var default_back_color="#040812";
var default_brush_color="#D6F5F2";

/*
* Fonctions
*/
function init(){
	var can = document.getElementById('drawing_zone');
	var ctx=can.getContext("2d");
	putSize(can);
	addEvents(can);
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

function toggleMenu(){
	var droppedMenu = document.getElementById('menu_overlay');
	if(opened_menu){
		droppedMenu.style.display='none';
		opened_menu=false;
	}else{
		droppedMenu.style.display='block';
		opened_menu=true;
	}
		
	}


/**
* EVENTS
*/

var mouse = 0;
var lastx,lasty;
var lastmx,lastmy;
function addEvents(can){
	var context=can.getContext('2d');
	var t=0;

	//affichage au resize de la fenêtre
	window.addEventListener('resize', function(){
		putSize(can);
	}
	, true);

	//Quand on clique sans relever une première fois
	can.addEventListener('mousedown', function(e){
		//Affichage
		if(opened_menu) toggleMenu();
		document.getElementById('indic_draw').style.display='none'

		// paramètres pour dessiner
		mouse = 1;
		lastx = e.x;
		lasty = e.y;
		lastmx = e.x;
		lastmy = e.y;
	},true);

	//Quand on arrête de cliquer
	window.addEventListener('mouseup', function(e){
		mouse = 0;
	},true);

	// Quand on dessine
	can.addEventListener('mousemove', function(e){
		if(e.isTrusted && mouse == 1){
			context.strokeStyle = default_brush_color;
			drawSingle(can,t,e)
			t+=0.3;
		}
	}
	, true);

	// ouvrir et fermer le menu du côté
	var dropdownButton = document.getElementById('dropdown_menu');
	dropdownButton.addEventListener('click', function(){
		toggleMenu();
	}
	, true);

	// Changement de couleur
	//background-color
	var back_colorpicker = document.getElementById('background-color');
	back_colorpicker.addEventListener('change', function(){
		default_back_color = back_colorpicker.value
		can.style.backgroundColor=default_back_color
	}
	, true);

	//brush-color
	var brush_colorpicker = document.getElementById('brush-color');
	brush_colorpicker.addEventListener('change', function(){
		default_brush_color = brush_colorpicker.value;
	}
	, true);
}


/*

AJOUTER FEATURES
	choisir couleur 	pinceau
						background
	miroir ou point de symétrie
*/

//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>