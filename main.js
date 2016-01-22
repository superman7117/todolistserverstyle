'use strict'

$(document).ready(init);

function init() {
  populateNames();

}

function addName(){
  var newName = $('#newName').val();

  $.post('/names', {name: newName})
  .success( function(data){
    console.log(data);
  })
}

function populateNames(){
$.get('/names', function(data){
  var $names = data.map(function(name){
    return $('<li>').text(name);
  })
  $('#output').append($names);
})
}
