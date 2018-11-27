
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMX38FysYw9RCw-a7-8pBmZo9t_gOphXc",
    authDomain: "trainactivity-86395.firebaseapp.com",
    databaseURL: "https://trainactivity-86395.firebaseio.com",
    projectId: "trainactivity-86395",
    storageBucket: "",
    messagingSenderId: "425352011237"
  };
  firebase.initializeApp(config);

//   Create variable for the database
    var database = firebase.database();
    
    var inName = "";
    var inDest = "";
    var inFTT = 0;
    var FreqIn = "";

//  Variables for User inputs

//   Add button for Submit
    $("#submit").on("click",function(event) {
        event.preventDefault();
    
        var inName = $("#nameInput").val().trim();
        var inDest = $("#destinationInput").val().trim();
        var inFTT = moment($("#firstTrainTimeInput").val().trim(), "MM/DD/YYYY").format("X");
        var freqIn = $("#frequencyInput").val().trim();


//  Create local Object to store values
        var newTrain = {
            Name: inName,
            Destination: inDest,
            First: inFTT,
            Frequency: freqIn, 
        };

// Upload submitted data to Firebase

        database.ref().push(newTrain);

//  Alert that the train has been sucessfully added

        alert("Train has been added");

// Clear input fields
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    });

// Add Object to a row in Firebase
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

//  Create variables for the inputs from the Object
  
    var inName = (childSnapshot.val().Name);
    var inDest = (childSnapshot.val().Destination);
    var inFTT = (childSnapshot.val().First);
    var freqIn = (childSnapshot.val().Frequency);


 // Convert Train time to Unix time
  var trainTime = moment.unix(inFTT).format("hh-mm-ss");

  // Calculate the minutes away for the next train
  var minAway = moment().diff(moment(trainTime, "X"), "minutes");


  // Calculate the next arrival
  var arriveTime = inFTT + freqIn;
  

  // Create the new row... next arrival and minutes away
  var newRow = $("<tr>").append(
    $("<td>").text(inName),
    $("<td>").text(inDest),
    $("<td>").text(inFTT),
    $("<td>").text(freqIn),
  );

  // Append the new row to the table
  $("#train-schedule > tbody").append(newRow);
});



