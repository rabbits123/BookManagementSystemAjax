$(document).ready(function(){
	$('#signup_btn').click(function(){
		console.log($('#signup_email').val());
		console.log($('#signup_password').val());
		console.log($('#signup_password_confirm').val());
		$.ajax({
		url: "http://localhost:3000/auth",
		method: 'POST',
		type: 'JSON',
		data: {
			"email":$('#signup_email').val(),
			"password":$('#signup_password').val(),
			"password_confirmation":$('#signup_password_confirm').val()
		},
		 success: function(data, textStatus, xhr){
            var cookies = {
            	'accessToken':xhr.getResponseHeader('access-token'),
            	'client':xhr.getResponseHeader('client'),
            	'expiry':xhr.getResponseHeader('expiry'),
            	'uid':xhr.getResponseHeader('uid'),
            };
            
            localStorage.setItem('cookies',JSON.stringify(cookies, function (key, value)));
            console.log(localStorage.getItem('cookies'));
            
            //alert('dsadsa');
        }, error: function(){
        	alert('error');
        }

    	});
		return false;
	});
});