document.getElementById("submitButton").addEventListener("click", shortenURL, false);
document.getElementById("checkShort").addEventListener("click", checkURL, false);
document.getElementById("copyURL").addEventListener("click", copyShortUrl, false);


function shortenURL()
{
    formURL = $("#input_url").val();
    console.log(`Form URL: ${formURL}`);
    var formData = JSON.stringify({"url_" : formURL});
	//if (urlExists(formURL)) {
    if (true) {
        $.ajax({
            url:'/submit',
            type:'POST',
            async: false,
            data: {"url_": formURL},
            success : function(response){
                document.getElementById('buttonCopyDiv').style.display = 'block';
                document.getElementById('small_url').innerHTML = response;
            },
            error : function(jqXhr, textStatus, errorMessage) {
            	window.alert("Error in shortening url.");
            }
        });
    }
    else {
        window.alert("Website does not exist.");
    }
    return;
}



function urlExists(url_) {
    var http = $.ajax({
        type:"HEAD",
        url: url_,
        async: false
    })
    if (http.status == 200) {
        return true;
    }
    else {
        return true;
    };
}

function checkURL() {
    formURL = $("#input_url").val();
    console.log(`Form URL: ${formURL}`);
    var formData = JSON.stringify({"url_" : formURL});
    $.ajax({
        url:'/check',
        type:'GET',
        async: true,
        data: {"url_": formURL},
        success : function(response){
            document.getElementById('small_url').innerHTML = response;
        },
        error : function(jqXhr, textStatus, errorMessage) {
            document.getElementById('WebsiteDoesNotExist').style.display = "block";
        }
    });
};

function copyShortUrl() {
    const el  = document.createElement('textarea');
    el.value = document.getElementById("small_url").innerHTML;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};



$(document).ready(function() {

});