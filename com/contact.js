function webform_submit(){
	var valid = true;
	if( !$("#email").val().match(/(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})/) ){
		valid = false;
		$("#email").css("border", "2px solid red");
	}
	if( $("#name").val() == "" ){
		valid = false;
		$("#name").css("border", "2px solid red");
	}
	if( $("#body").val() == "" ){
		valid = false;
		$("#body").css("border", "2px solid red");
		$("#body").css("margin-bottom", "13px");
	}
	if(valid){
	
		var dataString = "body=" + $("#body").val() + "&email=" + $("#email").val() + "&name=" + $("#name").val();
	
		$.ajax({
			type:	"POST",
			url:	"data/email.php",
			data:	dataString,
			success:	function(result){
				$("#web_form").css("height", "230px");
				if(result == "success"){
					$("#contact form").html("<h3>Thank you for contacting Axis Maps!</h3><h3>We will return your enquiry as soon as possible</h3>");
				} else {
					$("#contact form").html("<h3>There appears to be a problem with our web form.</h3><h3>Please email your request to info@axismaps.com.</h3><h3>We are sorry for the inconvenience.</h3>");
				}
			}
		});
	}
	return false;
}