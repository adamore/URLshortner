
document.getElementById("submitButton").addEventListener("click", formSubmit, false);

function formSubmit()
{
	$.ajax({
        url:'/submit',
        type:'post',
        async: false,
        data: $("input_url").value.serialize(),
        error : function(jqXhr, textStatus, errorMessage) {
        	window.alert("error");
        },
        success : function(response){
        	window.alert(response);
        }
    });
    return;
}

$(document).ready(function() {
	document.getElementById("submitButton").click(function(){
	});
});




