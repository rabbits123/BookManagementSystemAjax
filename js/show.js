$(document).ready(function(){
	var book_id = window.top.location.href.replace('file:///home/phu/Ajax%20Project/BooksManagementAjax/show.html?id=', '');
	var cookies = JSON.parse(localStorage.getItem('cookies'));
	if(localStorage.getItem('cookies') == null){
		$('#deleteBook').hide();
		$('#updateBook').hide();
		$('#log_out').hide();
	} else{
		$('#log_in').hide();
	}

	$.ajax({
		url: 'http://localhost:3000/api/v1/books/' +book_id,
		type: 'JSON',
		method: 'GET',
		success: function(data){
			$('#bookTitle').val(data.title);
			$('#bookAuthor').val(data.author);
			$('#bookContent').val(data.content);
			$('#bookType').val(data.type_id);
			console.log(data.type_id);
			$('#book_image').attr("src", "/home/phu/Ruby project/BooksManagementSystem/public" + data.book_image.url);;
			$('#bookISBN').val(data.isbn);
		}, error: function(){
			
		}

	});

	$('#deleteBook').click(function(){
		var conf = confirm("Are you sure you want to delete this book?");
		if(conf == true){
			$.ajax({
			url: 'http://localhost:3000/api/v1/books/' + book_id,
			type: 'JSON',
			method: 'DELETE',
			headers: {
				'access-token': cookies['access-token'],
		    	'uid': cookies['uid'],
		    	'client': cookies['client'],
		    	'expiry': cookies['expiry']
			},
			success: function(data){
				if(data.status == "ok"){
				alert('Delete book successfully');
			} else{
				alert('You cannot delete this book');
			}
			}, error: function(){
				alert('Cannot delete book');
			}
			});
		}
	});

	$('#updateBook').click(function(){
		var conf = confirm("Are you sure you want to update this book?");

		var title = $('#bookTitle').val();
		var author = $('#bookAuthor').val();
		var content = $('#bookContent').val();
		var type = $('#bookType').val();
		var isbn = $('#bookISBN').val();
		var image = $('#bookImage').val();

		var formData = new FormData();
		formData.append("title",title);
		formData.append("author", author);
		formData.append("content", content);
		formData.append("type_id", type);
		formData.append("isbn", isbn);
		formData.append("book_image", $('input[type=file]')[0].files[0]);

		if(conf){
			$.ajax({
				url: 'http://localhost:3000/api/v1/books/' + book_id,
				type: 'JSON',
				method: 'PUT',
				processData: false,
            	contentType: false,
				headers: {
				'access-token': cookies['access-token'],
		    	'uid': cookies['uid'],
		    	'client': cookies['client'],
		    	'expiry': cookies['expiry']
				}, data: formData,
				success: function(data){
					if(data.status == "ok"){
						alert('Update book successfully');
					} else{
						alert('You can not update this book');
					}
				}, error: function(){
					alert('Can not update book');
				}
			});
		}
	});
	
});