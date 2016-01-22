'use strict'

$(document).ready(init);

function init() {
  populateNames();
  $('#newItemBTN').on('click', addName)
}

function addName(){
  var newName = $('#newItem').val();
  var newDueDate = $('#newDue').val();
  var stringy = JSON.stringify("name: "+newName+", dueDate: "+newDueDate)
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
      console.log(data[0].name);
  var $names = data.forEach(function(name){
    var objr = JSON.parse(name.name);
    console.log(objr);
    var $li = $('<li>').append($('<div>').addClass('item').append(newName))
    .append($('<div>').addClass('date').append(newDueDate))
    .append($('<div>').addClass('done').append($('<button>').addClass('complete')
    .text('Complete')).append($('<button>').addClass('delete').text('Delete')));
$('#output').append($li);
  })
  $('#output').append($names)
})
}
