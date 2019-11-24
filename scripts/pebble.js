/*
========= Firestore setup =========
*/
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCafBlZrT5xlsYupGIWrXtWavjA-5AXzPs",
  authDomain: "pebble-d630d.firebaseapp.com",
  databaseURL: "https://pebble-d630d.firebaseio.com",
  projectId: "pebble-d630d",
  storageBucket: "pebble-d630d.appspot.com",
  messagingSenderId: "746469969124",
  appId: "1:746469969124:web:a7beaf01547a414652b0f1",
  measurementId: "G-QYFYP4DRF3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

/*
========= Step count =========
*/

pebble = {};

pebble.init = function() {
	this.stepButton = document.querySelector('.js-right-button');
	this.lightButton = document.querySelector('.js-left-button');
	this.steps = document.querySelector('.js-steps');
	this.display = document.querySelector('.js-display');

	pebble.displayCount();
	pebble.eventHandlers();
	pebble.setTime();
	animations.init();
}

pebble.eventHandlers = function() {
	pebble.stepButton.addEventListener('click', pebble.updateStepCount);
	pebble.lightButton.addEventListener('click', pebble.backlight);
}

pebble.displayCount = function() {
	db.collection('biometrics').get().then((snapshot) => {
		var steps = snapshot.docs[0].data();
		var stepCount = pebble.steps
		stepCount.innerHTML = steps.stepCount;
	})
}

pebble.updateStepCount = function() {
	var count = Math.floor(pebble.steps.innerHTML) + 1;
	console.log(count);
	db.collection('biometrics').doc('K4VA62cri8VVb8oawiXs')
		.set({stepCount: count})
		.then(pebble.displayCount);
}

pebble.backlight = function() {
	pebble.display.classList.add('pebble__display--backlight');
	setTimeout(function() {
		pebble.display.classList.remove('pebble__display--backlight');
	}, 3000);
}


/*
========= Time =========
*/

pebble.setTime = function() {	
	var date = new Date();
	var hour = date.getHours();
	var amPm = hour < 12 ? 'AM' : 'PM';
			hour = hour < 9 ? '0' + hour : hour;
			hour = hour > 12 ? hour - 12 : hour;
	var minutes = date.getMinutes();
			minutes = minutes <= 9 ? '0' + minutes : minutes;
	var time = `${hour}<span>:</span>${minutes}<span>${amPm}</span>`;
	var timeSlot = document.querySelector('.js-time');
	timeSlot.innerHTML = time;
	setInterval(pebble.setTime, 60000);
}

/*
========= Loading Animations =========
*/


// chain reaction of timed animations via adding and removing classes
// each class addition represents an "action"

animations = {};

animations.init = function() {
	setTimeout(this.circuitBoard, 1000);
	setTimeout(this.display, 3000);
}

animations.circuitBoard = function() {
	let body = document.querySelector('body');
	body.classList.add('circuit-animation');
	setTimeout(function() {body.classList.remove('circuit-animation')}, 2000)
}

animations.display = function() {
	let body = document.querySelector('body');
	body.classList.add('display-animation');
	setTimeout(function() {body.classList.remove('display-animation')}, 2000)
}

pebble.init();

















