$(document).ready(function(){
  var temp = [];

  $.ajax({
            url: 'http://localhost:3000/api/v1/books',
            type: 'json',
            method: 'GET',
            success: function(data){
              //alert(data[0].id);
                for(i=0; i< data.length; i++){
                  temp.push(new Array(data[i].id, data[i].title, data[i].content, data[i].author, data[i].isbn, data[i].user_id, data[i].type_id));
                  
                }
              },
              error: function(){

              }      
          });
  
  var wb = XLSX.utils.book_new();
        wb.Props = {
        Title: "book sheet",
                        Subject: "Test",
                        Author: "Me",
                        CreatedDate: new Date(2018,04,10)
                };
          
          wb.SheetNames.push("Test Sheet");
          var ws_data = temp;
          var ws = XLSX.utils.aoa_to_sheet(ws_data);
          console.log(ws_data);
          wb.Sheets["Test Sheet"] = ws;

          var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
          function s2ab(s) {
                  var buf = new ArrayBuffer(s.length);
                  var view = new Uint8Array(buf);
                  for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                  return buf;
          }
          $("#exportExcel").click(function(){
                  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'books.xlsx');
          });
});