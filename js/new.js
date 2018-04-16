$(document).ready(function(){
	var cookies = JSON.parse(localStorage.getItem('cookies'));
	$.ajax({
		url: 'http://localhost:3000/api/v1/types/index',
		type: 'json',
		method: 'GET',
		success: function(data){
			$('#bookType').append("<option disabled selected=true></option>");
			for(i=0; i< data.length; i++){
				$('#bookType').append("<option value= " +data[i].id+ "> " + data[i].typeofbook+ "</option>");
			}
		}
	});

	$('#createNew').click(function(){
		var title = $('#bookTitle').val();
		var author = $('#bookAuthor').val();
		var content = $('#bookContent').val();
		var type = $('#bookType').val();
		var isbn = $('#bookISBN').val();
		var image = $('#bookImage').val();

		var form = $('#new_book')[0];
		var formData = new FormData();
		formData.append("title",title);
		formData.append("author", author);
		formData.append("content", content);
		formData.append("type_id", type);
		formData.append("isbn", isbn);
		formData.append("book_image", $('input[type=file]')[0].files[0]);

		 $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://localhost:3000/api/v1/books",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
	    	'access-token': cookies['access-token'],
	    	'uid': cookies['uid'],
	    	'client': cookies['client'],
	    	'expiry': cookies['expiry']
	    	},
            success: function (data) {
            	alert("successfully");
            	$('#book_image').attr("src", "/home/phu/Ruby project/BooksManagementSystem/public" + data.book_image.url);
            	location.reload();
            },
            error: function (e) {
                console.log("Error");
            }
        });

		return false;
	});
});

