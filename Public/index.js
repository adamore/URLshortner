document.getElementById("submitButton").addEventListener("click", shortenURL, false);
document.getElementById("checkShort").addEventListener("click", checkURL, false);
document.getElementById("copyURL").addEventListener("click", copyShortUrl, false);


function shortenURL() {
    var currentURL = window.location.href;
    var formURL = $("#input_url").val();
    console.log(`Form URL: ${formURL}`);
    var formatedURL = formatURL(formURL);
    console.log(`Formated url ${formatedURL}`);
    $.ajax({
        url: '/submit',
        type: 'POST',
        async: false,
        data: { "url_": formatedURL },
        success: function(response) {
            document.getElementById('buttonCopyDiv').style.display = 'block';
            document.getElementById('small_url').innerHTML = currentURL + response;
        },
        error: function(jqXhr, textStatus, errorMessage) {
            window.alert("Error in shortening url.");
        }
    });
    if (!urlExists(formatedURL)) {
        window.alert("Warning the website url you entered may not be valid");
    }
    return;
}


function urlExists(url_) {
    console.log("Checking if website exists");
    var request = false;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHttp");
    }
    if (request) {
        console.log("Checking website.");
        request.open("GET", url_);
        request.send();
        if (request.status == 200) {
            return true;
        } else if (request.status == 404) {
            return false;
        } else {
            return true;
        }

    }
    return false;
}

function formatURL(adr_) {

    if (adr_.substring(0, 4) != "http") {
        var formated = "http://" + adr_;
        console.log(`Reformated url to ${formated}`);
        return formated;
    } else {
        console.log(`Url already formated properly ${adr_}`);
        return adr_;
    }
}

function checkURL() {
    formURL = $("#input_url").val();
    console.log(`Form URL: ${formURL}`);
    var formData = JSON.stringify({ "url_": formURL });
    $.ajax({
        url: '/check',
        type: 'GET',
        async: true,
        data: { "url_": formURL },
        success: function(response) {
            document.getElementById('small_url').innerHTML = response;
        },
        error: function(jqXhr, textStatus, errorMessage) {
            document.getElementById('WebsiteDoesNotExist').style.display = "block";
        }
    });
};

function copyShortUrl() {
    const el = document.createElement('textarea');
    el.value = document.getElementById("small_url").innerHTML;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};



$(document).ready(function() {

});