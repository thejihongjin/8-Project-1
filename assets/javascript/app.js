var queryURL = '';
var userInput = '';
generateAPIs();

function generateAPIs() { // generate api divs & buttons
    var apiArr = [
        {
            name: 'bored',
            url: 'http://www.boredapi.com/api/activity/',
            text: 'Bored? Click Here',
            input: 'n'
        },
        {
            name: 'chucknorris',
            url: 'http://api.icndb.com/jokes/random',
            text: 'Chuck Norris Facts',
            input: 'n'
        },
        {
            name: 'dogimg',
            url: 'https://dog.ceo/api/breeds/image/random',
            text: 'Puppy Love',
            input: 'n'
        },
        {
            name: 'fortunecookie',
            url: 'https://bad-fortune-cookie.herokuapp.com/fortunes/',
            text: 'What is your destiny?',
            input: 'n'
        },
        {
            name: 'geek',
            url: 'https://geek-jokes.sameerkumar.website/api',
            text: 'Geek out',
            input: 'n'
        },
        {
            name: 'giphy',
            url: 'https://api.giphy.com/v1/gifs/random?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I',
            text: 'Give me a random GIF',
            input: 'y',
        },
        {
            name: 'icanhazdadjoke',
            url: 'https://icanhazdadjoke.com/',
            text: 'Click me for HAHAs',
            input: 'n'
        },
        {
            name: 'jokes',
            url: 'https://official-joke-api.appspot.com/random_joke',
            text: 'Click for Jokes',
            input: 'n'
        },
        {
            name: 'kanye',
            url: 'https://api.kanye.rest',
            text: 'Kanye',
            input: 'n'
        },
        {
            name: 'memegenerator',
            url: 'https://meme-api.herokuapp.com/gimme',
            text: 'Meme Me Up, Scotty',
            input: 'n'
        },
        {
            name: 'randomcats',
            url: 'https://api.thecatapi.com/v1/images/search',
            text: 'Kitties To Brighten Your Day',
            input: 'n'
        },
        {
            name: 'ronswanson',
            url: 'http://ron-swanson-quotes.herokuapp.com/v2/quotes',
            text: 'Hit me with that wisdom!',
            input: 'n'
        },
        {
            name: 'translateminion',
            url: 'https://api.funtranslations.com/translate/minion.json?text=',
            text: 'BANANAS!',
            input: 'n' // using modal
        },
        {
            name: 'translateyoda',
            url: 'https://api.funtranslations.com/translate/yoda.json?text=',
            text: 'Yoda, You Are!',
            input: 'n' // using modal
        }
    ];

    for (var i = 0; i < apiArr.length; i++) {
        var apiDiv = $("<div>");
        apiDiv.addClass("api-div")
        if (apiArr[i].input === 'y') {
            var form = $("<form>");
            form.addClass("api-form");
            form.attr("id", apiArr[i].name + "-form");
            var input = $("<input>");
            input.attr("type", "text");
            input.attr("id", apiArr[i].name + "-input");
            input.attr("placeholder", "cats are awesome")
            form.append(input);

            var submit = $("<button>");
            submit.addClass("api-btn btn-info");
            submit.attr("data-name", apiArr[i].name);
            submit.attr("data-url", apiArr[i].url);
            submit.text(apiArr[i].text);
            form.append(submit);

            apiDiv.append(form);
            $("#api-list").append(apiDiv);
        } else {
            var btn = $("<button>");
            btn.addClass("btn btn-dark api-btn z-depth-0");
            btn.attr("data-name", apiArr[i].name);
            btn.attr("data-url", apiArr[i].url);
            btn.text(apiArr[i].text);
            apiDiv.append(btn);
            $("#api-list").append(apiDiv);
        }
    };
}

$(document).on("click", ".icon-btn", function () {
    event.preventDefault();
    $(".instruct-title").hide();
    $(".instruct-body").css("display", "block");
    $(".icon-btn").hide();
});

$(document).on("click", ".api-btn", function () {
    event.preventDefault();

    apiName = $(this).attr("data-name");
    queryURL = $(this).attr("data-url");

    if (apiName === 'giphy') {
        userInput = $('#giphy-input').val().trim();
        if (userInput !== '') {
            apiName += '-input';
            queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I&q="' + userInput + '"&limit=100';
        }
        mainAPIrequest();  
    } else if (apiName === 'translateminion' || apiName === 'translateyoda') {
        inputField();
    } else {
        mainAPIrequest();  
    }
});

$(document).on("click", ".giphy-img", function () {
    var state = $(this).attr("data-state");

    if (state === 'animate') {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
});

function inputField() {
    console.log(apiName)
    $('#translate-modal').modal('show');
    
    $(document).on('click', '#modal-submit', function(){
        userInput = $('#modal-input').val().trim()
        $("#api-result").empty();
        $.getJSON(queryURL + userInput, function(data) {
            console.log(data)   
            $('#api-result').html('<p>' + data.contents.translated + '</p>');       
        })
        $('#translate-modal').modal('hide')
    })
}

function mainAPIrequest() {
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
                $("#api-result").html("<p>" + response.activity + "</p>")
                break;

            case 'chucknorris':
                $("#api-result").html("<p>" + response.value.joke + "</p>")
                queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I&q="Chuck+Norris"&limit=100';
                secondAPIrequest();
                break;

            case 'dogimg':
                $("#api-result").append('<img src=' + response.message + '>')
                break;

            case 'fortunecookie':
                var fortuneIndex = parseInt(Math.floor(Math.random() * response.length));
                var results = response[fortuneIndex];
                $("#api-result").html("<p>" + results.fortune + "</p>");
                break;

            case 'geek':
                if (response.toLowerCase().includes("chuck norris")) {
                    mainAPIrequest();
                } else {
                    $("#api-result").html("<p>" + response + "</p>");
                }
                break;

            case 'giphy':
                var results = response.data;
                var giphyImg = $("<img>");
                giphyImg.attr("src", results.images.fixed_height.url);
                giphyImg.addClass("giphy-img");
                giphyImg.attr("data-state", "animate");
                giphyImg.attr("data-still", results.images.fixed_height_still.url);
                giphyImg.attr("data-animate", results.images.fixed_height.url);
                $("#api-result").append(giphyImg);
                break;

            case 'giphy-input':
                var giphyIndex = parseInt(Math.floor(Math.random() * response.data.length));
                var results = response.data[giphyIndex];
                var giphyImg = $("<img>");
                giphyImg.attr("src", results.images.fixed_height.url);
                giphyImg.addClass("giphy-img");
                giphyImg.attr("data-state", "animate");
                giphyImg.attr("data-still", results.images.fixed_height_still.url);
                giphyImg.attr("data-animate", results.images.fixed_height.url);
                $("#api-result").append(giphyImg);
                break;

            case 'icanhazdadjoke':
                $("#api-result").html("<p>" + response.joke + "</p>");
                break;

            case 'jokes':
                $("#api-result").html("<p>" + response.setup + "<br>" + response.punchline + "</p>");
                break;

            case 'kanye':
                $("#api-result").html('<p>Kanye says:<br>"' + response.quote + '"</p>');
                queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I&q="Kanye+West"&limit=100';
                secondAPIrequest();
                break;

            case 'memegenerator':
                $("#api-result").append('<img src=' + response.url + ' class="meme-img">');
                break;

            case 'randomcats':
                $("#api-result").append('<img src=' + response[0].url + '>')
                break;

            case 'ronswanson':
                $("#api-result").html('<p>Ron Swanson says:<br>"' + response[0] + '"</p>');
                queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=2D9ZWdGSO6zZOnd7dqwMAxdeeDM0Bp1I&q="Ron+Swanson"&limit=100';
                secondAPIrequest();
                break;

            case 'translateminion': //done in inputField function
                break;

            case 'translateyoda': //done in inputField function
                break;

            case '':
                // $("#api-result").text();
                break;

            default:
                break;
        }
    });
}

function secondAPIrequest() {
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then(function (response) {
        // console.log(response);
    
        var randomIndex = parseInt(Math.floor(Math.random() * response.data.length));
        // console.log(randomIndex);
        var results = response.data[randomIndex];
        var giphyImg = $("<img>");
        giphyImg.attr("src", results.images.fixed_height.url);
        giphyImg.addClass("giphy-img");
        giphyImg.attr("data-state", "animate");
        giphyImg.attr("data-still", results.images.fixed_height_still.url);
        giphyImg.attr("data-animate", results.images.fixed_height.url);
        $("#api-result").append("<br>");
        $("#api-result").append(giphyImg);
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
    $("#watchers").html(snapshot.numChildren());
});