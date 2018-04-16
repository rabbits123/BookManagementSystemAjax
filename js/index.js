$(document).ready(function (){
	var current_page;
	var num_page;
	var cookies = JSON.parse(localStorage.getItem('cookies'));
	if(cookies != null) {
		$('#log_in').hide();
		console.log(cookies['access-token']) ;
	} else{
		$('#log_out').hide();
		$('#new_book').hide();
	}
	$.ajax({
		url: 'http://localhost:3000/api/v1/books',
		type: 'json',
		method: 'GET',
		success: function(books){
			//alert(data[0].id);
			data = books.data
			for(i=0; i< data.length; i++){
				$('#books_contain').append("<a href='show.html?id="+ data[i].id  +"'><div class='col-sm-3' id=" +data[i].id +"><div class='panel panel-success'><div class='panel-heading'>" + data[i].title + "</div><div class='panel-body'><center><img src='/home/phu/Ruby project/BooksManagementSystem/public" + data[i].book_image.url + "' class='img-responsive' style='width:80%; height: 280px'' alt='Image'></center></div><div class='panel-footer'>" + data[i].author+ "</div></div></div></a>");
			}
			current_page = books.current_page;
		}
	});

	$('#delete_all').click(function(){
		var conf = confirm('Are you sure deleting all books?');
		if(conf){
			$.ajax({
				url: 'http://localhost:3000/api/v1/delete_all',
				type: 'JSON',
				method: 'DELETE',
				headers: {
				'access-token': cookies['access-token'],
		    	'uid': cookies['uid'],
		    	'client': cookies['client'],
		    	'expiry': cookies['expiry']
				},
				success: function(data){
					console.log(data);
					if(data.status == "ok"){
						alert("Delete all books successfully");
						location.reload();
					} else{
						alert("Cannot delete all books");
					}
				}, error: function(){
					alert('Cannot delete all books');
				}
			});
		}
	});

	
        

	$.ajax({
		url: 'http://localhost:3000/api/v1/pages',
		method: 'GET',
		type: 'JSON',
		success: function(data){
			$('#paginate').append("<li class='page-item'><a class='page-link'>Previous</a></li>");
			
			for(i = 1; i <= data; i++){
				$('#paginate').append("<li class='page-item'><a class='page-link'>" + i +"</a></li>");
			}
			num_page = data;

			$('#paginate').append("<li class='page-item'><a class='page-link'>Next</a></li>");
		}, error: function(){
			console.log("error");
		}
	});


	function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
	}


	$('#paginate').click(function(){
		var target = getEventTarget(event).innerHTML;
		if(target == "Previous"){
			if(current_page == 1)
				target = 1;
			else
				target = current_page -= 1;
		}
		if(target == "Next"){
			if(current_page == num_page)
				target = num_page;
			else
				target = current_page += 1;
		}

	    $.ajax({
		url: 'http://localhost:3000/api/v1/books?page=' + target,

		type: 'json',
		method: 'GET',
		success: function(books){
			//alert(data[0].id);
			data = books.data
			$('#books_contain').html("");
			for(i=0; i< data.length; i++){
				$('#books_contain').append("<a href='show.html?id="+ data[i].id  +"'><div class='col-sm-3' id=" +data[i].id +"><div class='panel panel-success'><div class='panel-heading'>" + data[i].title + "</div><div class='panel-body'><center><img src='/home/phu/Ruby project/BooksManagementSystem/public" + data[i].book_image.url + "' class='img-responsive' style='width:80%; height: 280px'' alt='Image'></center></div><div class='panel-footer'>" + data[i].author+ "</div></div></div></a>");
			}
		}, error: function(){
			console.log("error");
		}
		});
	});


});
