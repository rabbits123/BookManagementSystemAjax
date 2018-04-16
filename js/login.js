$(document).ready(function(){
	$('#login_btn').click(function(){
		$.ajax({
		url: "http://localhost:3000/auth/sign_in",
		method: 'POST',
		type: 'JSON',
		data: {
			"email":$('#login_email').val(),
			"password":$('#login_password').val()
		},
		 success: function(data, textStatus, xhr){
            var cookies = {
            	'access-token':xhr.getResponseHeader('access-token'),
            	'client':xhr.getResponseHeader('client'),
            	'expiry':xhr.getResponseHeader('expiry'),
            	'uid':xhr.getResponseHeader('uid'),
            };
            
            localStorage.setItem('cookies',JSON.stringify(cookies));
            window.location.replace("index.html");
        }, error: function(){
        	alert('error');
        }
    	});
		return false;
	});
});