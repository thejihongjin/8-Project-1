// Initialize Firebase
var config = {
    apiKey: "AIzaSyCOra4qCT4zjgT8Mk2fVi5hysWG9uWQSx4",
    authDomain: "project-1-445cf.firebaseapp.com",
    databaseURL: "https://project-1-445cf.firebaseio.com",
    projectId: "project-1-445cf",
    storageBucket: "project-1-445cf.appspot.com",
    messagingSenderId: "75519416614"
};

firebase.initializeApp(config);

var database = firebase.database();
var connectionsRef = database.ref("/connections"); // stores connections in this directory
var connectedRef = database.ref(".info/connected"); // '.info/connected' is a boolean value, true if the client is connected and false if they are not

connectedRef.on("value", function (snap) { // when the client's connection state changes
    if (snap.val()) { // if they are connected
        var con = connectionsRef.push(true); // adds user to the connections list
        con.onDisconnect().remove(); // removes user from the connection list when they disconnect
    }
});

connectionsRef.on("value", function (snapshot) { // when first loaded or when the connections list changes...
    $("#watchers").text(snapshot.numChildren());
});