//CRUD
$(document).ready(function(){
  //read
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

  //al click sul cestino invoco la funzione per eliminare l'elemento
  $(document).on("click", ".fa-trash-alt", function(){
    var thisElement = $(this).parent();
    var id = thisElement.attr("id");
    //delete
    deleteElement(thisElement, id);
  });

  //create
  $(".add-button").click(function(){
    var valInput = $(".input").val();

    $.ajax(
      {
        "url": "http://157.230.17.132:3020/todos",
        "method": "POST",
        //IMPORTANTE!!!!! sarò quello che scriveremo all'interno del server come chiave
        "data": {
          "text": valInput
        },
        "success": function (data) {
          printElement(valInput, data);
          valInput = $(".input").val("");
        },
        "error": function (richiesta, stato, errori) {
          alert("E' avvenuto un errore. " + errori);
        }
      }
    );
  });

  //update
  $(document).on("click", ".modified-button", function(){
    var valModInput = $(this).siblings(".modified-input").val();
    var id = $(this).parent().attr("id");
    var elementToDelete = $(this).parent();

    $.ajax(
      {
        "url": "http://157.230.17.132:3020/todos/" + id,
        "method": "PATCH",
        "data": {
          "text": valModInput
        },
        "success": function (data) {
          elementToDelete.remove();
          printElement(valModInput, data)
        },
        "error": function (richiesta, stato, errori) {
          alert("E' avvenuto un errore. " + errori);
        }
      }
    );
  });

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

//funzione per eliminare l'elemento al click sull'icona cestino
function deleteElement(thisElement, id){
  $.ajax(
    {
      "url": "http://157.230.17.132:3020/todos/" + id,
      "method": "DELETE",
      "success": function (data) {
        thisElement.remove();
      },
      "error": function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errori);
      }
    }
  );
}

//funzione che stampa a schermo il singolo elemento appena creato
function printElement(text, data){
  var source = $("#todo-list-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "id": data.id,
    "text": text
  }

  var html = template(context);
  $("#todo-list").append(html);
}
