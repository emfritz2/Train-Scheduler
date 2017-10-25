

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
    var firstTrain = moment($("#first-train-input").val().trim(), 'HH:mm a').format("");
    var trainFreq = $("#frequency-input").val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDes,
    first: firstTrain,
		frequency: trainFreq,
};

// sends newTrain var to to firebase
database.ref().push(newTrain);

// clear the text boxes after hitting submit
$("#train-input").val("");
$("#dest-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");

});

// console.log(newTrain);

  database.ref().on("child_added", function(child, prevChildKey) {

  //   // Store everything into a variable.
    var trainName = child.val().name;
    var trainDes = child.val().destination;
    var firstTrain = child.val().first;
    var trainFreq = child.val().frequency;


// pretty first time - not working
var fixedFirstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");

// the current time
var currentTime = moment();

// difference between times
var differenceInTime = moment().diff(moment(fixedFirstTrain), "minutes");

// the time apart - % for remainder
var remainder = differenceInTime % trainFreq;


// when the next train arrives
var minutesLeft = trainFreq - remainder;

var nextArrival = moment().add(minutesLeft, "minutes");
var nextTrainConverted = moment(nextArrival).format("HH:mm a");

// calculate the next arrival time
// var nextTrain = firstTrain + trainFreq;

// add the data to the table
$("#train-table").append(
    "<tr><td>" + trainName + "</td>" +
    "<td>" + trainDes + "</td>" +
    "<td>" + "Every " + trainFreq + " minutes" + "</td>" +
 	"<td>" + nextArrival + "</td>" +
  "<td>" + minutesLeft + "</td>" +
    "</tr>");

});
