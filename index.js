

function URLshortener(url_)
{
	if(checkURL(url_))
	{
		return url_;
	}
	else
	{
		return "error";
	}


};


function checkURL(url_)
{
	var irrelevant;
	var request = $.ajax({
		type: "GET",
		url: url_,
		data: irrelevant,
		success: function(response){
			return true;
		},
		error: function(response){
			return false
		}
	});
	return false;
};

function redirectUser(path_)
{
	var redirectURL_ = getURL(path_);
	if(redirectURL_ == null)
	{
		window.location.replace(window.location.origin);
	}
	else
	{
		window.location.replace(redirectURL_);
	}
};

function getURL(path_)
{
	if(path_ == "abc")
	{
		return "https://www.google.com/";
	}
	else
	{
		return null;
	}

};




