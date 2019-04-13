// generate api divs & buttons
var queryURL = '';
generateAPIs();

function generateAPIs() {
    // var apiObj = {}
    var apiArr = [
        {
            name: 'miniontranslate',
            url: 'https://api.funtranslations.com/translate/minion.json?text=',
            text: 'BANANAS!'
        },
        {
            name: 'bored',
            url: 'http://www.boredapi.com/api/activity/',
            text: 'Bored? Click Here'
        },
        {
            name: 'chucknorris',
            url: 'http://api.icndb.com/jokes/random',
            text: 'Chuck Norris Facts'
        },
        {
            name: 'chucknorrisio',
            url: 'https://api.chucknorris.io/jokes/random',
            text: 'Chuck Norris Facts 2'
        },
        {
            name: 'dogimg',
            url: 'https://dog.ceo/api/breeds/image/random',
            text: 'Puppy Love'
        },
        {
            name: 'fortunecookie',
            url: 'https://bad-fortune-cookie.herokuapp.com/fortunes/',
            text: 'What is your destiny?'
        },
        {
            name: 'geek',
            url: 'https://geek-jokes.sameerkumar.website/api', // has a lot of chuck norris jokes though...
            text: 'Geek out'
        },
        {
            name: 'giphy',
            url: 'https://api.giphy.com/v1/gifs/random?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I', // /search?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I&limit=10' //&q=',
            text: 'Give me a random GIF'
        },
        {
            name: 'icanhazdadjoke', // for switch case later
            url: 'https://icanhazdadjoke.com/', // for ajax call
            text: 'Click me for HAHAs'
        },
        {
            name: 'jokes',
            url: 'https://official-joke-api.appspot.com/random_joke',
            text: 'Click for Jokes'
        },
        {
            name: 'kanye',
            url: 'https://api.kanye.rest',
            text: 'Kanye'
        },
        {
            name: 'memegenerator',
            url: 'https://www.reddit.com/r/memes.json?sort=top', //not quite working yet
            text: 'Memerator'
        },
        {
            name: 'randomcats',
            url: 'https://api.thecatapi.com/v1/images/search',
            text: 'Kitties To Brighten Your Day'
        },
        {
            name: 'ronswanson',
            url: 'http://ron-swanson-quotes.herokuapp.com/v2/quotes',
            text: 'Hit me with that wisdom!'
        },
        {
            name: 'yodatranslate',
            url: 'https://api.funtranslations.com/translate/yoda.json?text=', // requires input box
            text: 'Yoda, You Are!'
        }
    ];

    for (var i = 0; i < apiArr.length; i++) {
        var apiDiv = $("<div>");
        var btn = $("<button>");
        btn.addClass("api-btn btn btn-dark");
        btn.attr("data-name", apiArr[i].name);
        btn.attr("data-url", apiArr[i].url);
        btn.text(apiArr[i].text);
        apiDiv.append(btn);
        $("#api-list").append(apiDiv);
    };
}


$(document).on("click", ".api-btn", function () {

    apiName = $(this).attr("data-name");
    queryURL = $(this).attr("data-url");
    if (apiName === 'miniontranslate' || apiName === 'yodatranslate') {
        inputField()
    } else {
        testAPI();  
    }
});

$(document).on("click", ".giphy-img", function () {
    var state = $(this).attr("data-state");

    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if (state === 'animate') {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function inputField() {

    console.log(apiName)
    $('#exampleModal').modal('show')    //wont pop up after first time
    
    $(document).on('click', '#input-submit', function(){
        userInput = $('#message-text').val().trim()
        $("#api-result").empty()
        $.getJSON(queryURL + userInput, function(data) {
            console.log(data)   
            $('#api-result').append('<p>' + data.contents.translated + '</p>')          
        })
        $('#exampleModal').modal('hide')
    })
}

function testAPI() {
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then(function (response) {
        console.log(response);

        $("#api-result").empty();
        switch (apiName) {
            case 'bored':
                $("#api-result").html('<p>' + response.activity + "." + '</p>')
                break;

            case 'chucknorris':
                $("#api-result").html('<p>' + response.value.joke + '</p>')
                break;

            case 'chucknorrisio':
                $("#api-result").html('<p>' + response.value + '</p>')
                break;

            case 'dogimg':
                $("#api-result").html('<img src=' + response.message + '>')
                break;

            case 'fortunecookie':
                // $("#api-result").text();
                break;

            case 'geek':
                // $("#api-result").text();
                break;

            case 'giphy':
                var results = response.data;
                var giphyImg = $("<img>");
                giphyImg.attr("src", results.images.fixed_height_still.url);
                giphyImg.addClass("giphy-img");
                giphyImg.attr("data-state", "still");
                giphyImg.attr("data-still", results.images.fixed_height_still.url);
                giphyImg.attr("data-animate", results.images.fixed_height.url);
                $("#api-result").append(giphyImg);
                break;

            case 'icanhazdadjoke':
                $("#api-result").html('<p>' + response.joke + '</p>');
                break;

            case 'jokes':
                $("#api-result").html('<p>' + response.setup + " " + response.punchline + '</p>');
                break;

            case 'kanye':
                $("#api-result").html('<p>' + response.quote + '</p>');
                break;

            case 'memegenerator':
                // $("#api-result").text();
                break;

            case 'randomcats':
                $("#api-result").html('<img src=' + response[0].url + '</p>')
                break;

            case 'ronswanson':
                $("#api-result").html('<p>' + response[0] + '</p>');
                break;

            case 'opinions':
               $("#api-result").html(`<input>`);
                break;

            case '':
                $("#api-result").text();
                break;

            default:
                break;
        }
    });
}

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
