//stampare a schermo la todolist
$(document).ready(function(){

  $.ajax(
    {
      "url": "http://157.230.17.132:3020/todos",
      "method": "GET",
      "success": function (data) {
        printList(data);
      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );


});

//FUNZIONI

//funzione che printa a schermo il contenuto della todolist
function printList(lista){
  var source = $("#todo-list-template").html();
  var template = Handlebars.compile(source);

  for(var i = 0; i < lista.length; i++){

    var context = {
      "id": lista[i].id,
      "text": lista[i].text
    };

    var html = template(context);
    $("#todo-list").append(html);
  }
}
