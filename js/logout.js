$(document).ready(function(){
	$('#log_out').click(function(){
		var cookies = JSON.parse(localStorage.getItem('cookies'));
		$.ajax({
	    url: 'http://localhost:3000/auth/sign_out',
	    type: 'DELETE',
	    headers: {
	    	'access-token': cookies['access-token'],
	    	'uid': cookies['uid'],
	    	'client': cookies['client'],
	    	'expiry': cookies['expiry']
	    },
	    success: function() {
	       alert('success');
	       localStorage.removeItem('cookies');
	       window.location.reload();
	    }, error: function(){
	    	alert('fail');
	    }
});
	});
});