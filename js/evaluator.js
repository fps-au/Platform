// ########################################################################## //

// Online FPS Evaluation Applcation
// Luke Thorburn, 2018
// www.lukethorburn.com
// All rights reserved.

// To start local server:
// python -m http.server 8888


// Use Sisyphus (http://sisyphus-js.herokuapp.com/) save interim form data. 

// -------------------------------------------------------------------------- //

var pageNames = {
	"1a": "0001.jpg",
	"1b": "0002.jpg",
	"1c": "0003.jpg",
	"1d": "0004.jpg",
	"2":  "0005.jpg",
	"3a": "0006.jpg",
	"3b": "0007.jpg",
	"3c": "0008.jpg",
	"3d": "0009.jpg",
	"4":  "0010.jpg",
	"5":  "0010.jpg",
	"6a":  "0011.jpg",
	"6b":  "0012.jpg"
};

var states = [
	{page: 1, step: "1a", index: 0, pos: 360, formbox: "form-s1-1"},
	{page: 1, step: "1a", index: 0, pos: 670, formbox: "form-s1-2"},
	{page: 1, step: "1a", index: 0, pos: 1000, formbox: "form-s1-3"},
	{page: 1, step: "1a", index: 0, pos: 1350, formbox: "form-s1-4"},
	{page: 2, step: "1b", index: 1, pos: 250, formbox: "form-s1-5"},
	{page: 2, step: "1b", index: 1, pos: 560, formbox: "form-s1-6"},
	{page: 2, step: "1b", index: 1, pos: 910, formbox: "form-s1-7"},
	{page: 2, step: "1b", index: 1, pos: 1260, formbox: "form-s1-8"},
	{page: 3, step: "1c", index: 2, pos: 250, formbox: "form-s1-9"},
	{page: 3, step: "1c", index: 2, pos: 580, formbox: "form-s1-10"},
	{page: 3, step: "1c", index: 2, pos: 930, formbox: "form-s1-11"},
	{page: 3, step: "1c", index: 2, pos: 1260, formbox: "form-s1-12"},
	{page: 4, step: "1d", index: 3, pos: 180, formbox: "form-s1-13"},
	{page: 4, step: "1d", index: 3, pos: 510, formbox: "form-s1-14"},
	{page: 4, step: "1d", index: 3, pos: 900, formbox: "form-s1-15"},
	{page: 4, step: "1d", index: 3, pos: 1250, formbox: "form-s1-16"},
	{page: 5, step: "2",  index: 4, pos: 310, formbox: "form-s2"},
	{page: 6, step: "3a", index: 5, pos: 280, formbox: "form-s3-1"},
	{page: 6, step: "3a", index: 5, pos: 600, formbox: "form-s3-2"},
	{page: 6, step: "3a", index: 5, pos: 880, formbox: "form-s3-3"},
	{page: 6, step: "3a", index: 5, pos: 1230, formbox: "form-s3-4"},
	{page: 7, step: "3b", index: 6, pos: 190, formbox: "form-s3-5"},
	{page: 7, step: "3b", index: 6, pos: 510, formbox: "form-s3-6"},
	{page: 7, step: "3b", index: 6, pos: 890, formbox: "form-s3-7"},
	{page: 7, step: "3b", index: 6, pos: 1210, formbox: "form-s3-8"},
	{page: 8, step: "3c", index: 7, pos: 190, formbox: "form-s3-9"},
	{page: 8, step: "3c", index: 7, pos: 510, formbox: "form-s3-10"},
	{page: 8, step: "3c", index: 7, pos: 860, formbox: "form-s3-11"},
	{page: 8, step: "3c", index: 7, pos: 1210, formbox: "form-s3-12"},
	{page: 9, step: "3d", index: 8, pos: 180, formbox: "form-s3-13"},
	{page: 9, step: "3d", index: 8, pos: 520, formbox: "form-s3-14"},
	{page: 9, step: "3d", index: 8, pos: 890, formbox: "form-s3-15"},
	{page: 9, step: "3d", index: 8, pos: 1240, formbox: "form-s3-16"},
	{page: 10, step: "4", index: 9, pos: 300, formbox: "form-s4"},
	{page: 10, step: "5", index: 10, pos: 930, formbox: "form-s5"},
	{page: 11, step: "6a", index: 11, pos: 520, formbox: "form-s6"},
	{page: 12, step: "6b", index: 11, pos: 40, formbox: "form-s6"}
]

var imgpath = "img/",
	currentState = 0;
	currentStep = "1a",
	nstates = states.length;

function step_state(step) {
	var state = 0, found = false;
	states.forEach(function(d,i) {
		if (!found & d.step == step) {
			found = true;
			state = i;
		}
	});
	return(state);
}

// Utilities ------------------------------------------------------ Utilities //

function toggleStep() {
	var steps = document.getElementById("steps");
	currentStep = steps.value;

	document.getElementById("bookletpage").src = imgpath + pageNames[currentStep];
	currentState = step_state(currentStep);

	$("#bookletbox").scrollTo(states[currentState].pos);
	$(".formbox").removeClass("show");
	$("#" + states[currentState].formbox).addClass("show");
};

function updateState(increment) {
	$(".formbox").removeClass("show");

	if (currentState + increment >= 0 & currentState + increment <= nstates - 1) {
		currentState = currentState + increment;
	}
	
	if (states[currentState].step != currentStep) {
		currentStep = states[currentState].step;
		document.getElementById("bookletpage").src = imgpath + pageNames[currentStep];
		document.getElementById("steps").selectedIndex = states[currentState].index;
	}
	
	$("#bookletbox").scrollTo(states[currentState].pos, 300);
	console.log("#" + states[currentState].formbox);
	$("#" + states[currentState].formbox).addClass("show");
};

function next_state() {
	updateState(1);
};

function previous_state() {
	updateState(-1);
};

Mousetrap.bind('left', previous_state);
Mousetrap.bind('right', next_state);

updateState(0);


// Resizing ------------------------------------------------------------ Resizing //

var isResizing = false,
	start_position = 0;

$(function () {
	var booklet = $('#bookletbox'),
		inputs = $('#inputs'),
		handle = $('#drag'),
		arrows = $('nav.arrow'),
		prevArr = $('.fa-chevron-left.fa-vc'),
		nextArr = $('.fa-chevron-right.fa-vc'),
		bookletHeight = 0,
		inputsHeight = 0;

	handle.on('mousedown', function (e) {
		isResizing = true;
		start_position = e.clientY;
		bookletHeight = booklet.height();
		inputsHeight = inputs.height();
	});

	$(document).on('mousemove', function (e) {
		if (!isResizing) 
			return;
		
		var offset = e.clientY - start_position;

		booklet.css('height', bookletHeight + offset);
		inputs.css('height', inputsHeight - offset);
		arrows.css('height', inputsHeight - offset);
		prevArr[0].style.setProperty('line-height', (inputsHeight - offset) + 'px', 'important');
		nextArr[0].style.setProperty('line-height', (inputsHeight - offset) + 'px', 'important');
		booklet.scrollTo(states[currentState].pos, 20);

	}).on('mouseup', function (e) {
		isResizing = false;
	});
});

$(".supplementary_button").click(function(){
    $(this).toggleClass("on");
});