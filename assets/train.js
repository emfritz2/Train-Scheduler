

// Firebase
var config = {
	apiKey: "AIzaSyA2SDZkoSUqKTiPgLMXcVXoAXrl-Yq75Xc",
    authDomain: "train-scheduler-9fddb.firebaseapp.com",
    databaseURL: "https://train-scheduler-9fddb.firebaseio.com",
    storageBucket: "train-scheduler-9fddb.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

// click function for submit
$("#submit-btn").on("click", function(ev) {
	event.preventDefault();
	// console.log("submit-btn")

	var trainName = $("#train-input").val().trim();
    var trainDes = $("#dest-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), 'h:mm:ss a').format("LT");
    var trainFreq = $("#frequency-input").val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDes,
		frequency: trainFreq,
};

// sends newTrain var to to firebase
database.ref().push(newTrain);


// clear the text boxes after hitting submit
$("#train-input").val("");
$("#dest-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");

console.log(newTrain);

});
