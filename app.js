// =============================== UTILITY FUNCTIONS ====================================
// Hiding or displaying a node(div) =>
function dispNode(node, setting) {
    node.style.display = setting;
}

// Setting the text(innerHTML) of a node(div) =>
function setTextNode(node, text) {
    node.innerHTML = text;
}

// ================================= MAIN FUNCTIONS ========================================

// Selecting nodes(divs) that will be changed often =>
var result = document.getElementById("result");
var list = document.getElementById("list");
var title = document.getElementById("title");
var speech = document.getElementById("partOfSpeech");
var noRes = document.getElementsByClassName("noRes")[0];

// Hide result div initially when window loaded =>
window.onload = function() {
    // ## use dispNode to hide the result initially
};

// On search button click, getData() called =>
async function getData() {
    // Hide result div initially =>
    dispNode(result,"none");

    // ## Clear previous results, by setting text(innerHTML) of divs =>
    setTextNode(list, "");
    // ## clear the title node using setTextNode
    setTextNode(speech, "");
    setTextNode(noRes, "");

    // Getting value typed in by the user =>
    var word = ;// ## assign the value of the input element with id "searchBox"

    // CASE 1: Nothing has been typed by the user
    if (word == "" || word == null) {
        setTextNode(
            // ## select the node with classname errorMsg !note: it will return an array, 
            // ## enter your error message here
        );
    } else {
        // Build API URL =>
        var baseUrl = "https://dictionaryapi.com/api/v3/references/learners/json/";
        var apikey = "6b5f2059-92e7-4761-b787-d7ff3514ae73";
        var query = word;
        var url = baseUrl + query + "?key=" + apikey;
        console.log(url); // ## try it out in browser both for valid word and invalid word !note it returns a list
        // ## use this to inspect better if needed https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc
        
        // Fetch data from the built URL =>
        const def = await fetch(url);

        // Parse the data to JSON, jsonObj(camelCasing) =>
        const jsonObj = await def.json();

        //  Logging Json object to console, to check result =>
        console.log(jsonObj[0]);

        // CASE 2: No such word exists, fetch closest ones, also provided by the API =>
        if (typeof jsonObj[0] == "string") {
            // Suggested words is passed =>
            var sugg = jsonObj[0];
            var len = ; //assign length of the jsonObj returned 
            // Iterate through the jsonObj, and build suggested words list =>
            for (var i = 1; i < len; i++) {
                sugg = sugg + ", " + jsonObj[i];
            }

            // Logging the suggested list =>
            console.log(sugg);

			// Set the results and reflect on page =>
			setTextNode( noRes, "Sorry! No results found. Did you mean any of " + sugg + "?");
			
        } else {
            // CASE 3: Legit word searched, and API returns data, parse JSON =>
            // Access part of speech =>
            var partOfSpeech = jsonObj[0].fl;
            console.log(typeof jsonObj[0]);

            // Access definitons =>
            var defs = [];
            defs = jsonObj[0].shortdef;

			// Build definition output string =>
            var output = "";
            for (var i = 0; i < defs.length; i++) {
                output = output + '<li class="define">' + defs[i] + "</li>";
			}
			
			// Set the results and reflect on page =>
			setTextNode(speech,partOfSpeech);
			setTextNode(list,output);
        }

		setTextNode(title,word);
		dispNode(result,"flex");
    }
}

window.addEventListener("", async e => { // ## trigger on load
    if ('serviceWorker' in navigator) { // show other serviceworker in application tabs
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
});
