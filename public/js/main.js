'use strict'

$(document).ready(init);

function init() {
  populateNames();
  $('#newItemBTN').on('click', addName)
  $('ul').on('click', ".delete", removeItem)
}

function removeItem(){
    var index = $(this).closest('.item').index()
    console.log(index);
}

function addName(){
  var newName = $('#newItem').val();
  var newDueDate = $('#newDue').val();
  var stringy = JSON.stringify({name: newName, dueDate: newDueDate})
  $.post('/names', {name: stringy})
  .success( function(data){
    var $li = $('<li>').append($('<div>').addClass('item').append(newName))
    .append($('<div>').addClass('date').append(newDueDate))
    .append($('<div>').addClass('done').append($('<button>').addClass('complete')
    .text('Complete')).append($('<button>').addClass('delete').text('Delete')));
$('#output').append($li);
  })
  .fail(function(err) {
   alert('something went wrong :(')
 });
}

function populateNames(){
$.get('/names', function(data){
      console.log(data);
  var $names = data.forEach(function(name){
    var objr = JSON.parse(name.name);
    console.log(objr.name, 'name')
    console.log(objr.dueDate, 'date');;
    var $li = $('<li>').append($('<div>').addClass('item').append(objr.name))
    .append($('<div>').addClass('date').append(objr.dueDate))
    .append($('<div>').addClass('done').append($('<button>').addClass('complete')
    .text('Complete')).append($('<button>').addClass('delete').text('Delete')));

$('#output').append($li)
  })
})
}
