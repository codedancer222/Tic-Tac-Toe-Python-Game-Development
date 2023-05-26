// ----------------------------------------------------------------------------
// GAME DATA
// ----------------------------------------------------------------------------
let GAME_DATA

function getData() {
    var deferredData = new jQuery.Deferred();
    $.ajax({
        type: "GET",
        url: "/get_ajax",
        dataType: "json",
        success: function(data) { 
            deferredData.resolve(data);
            },
        complete: function(xhr, textStatus) {
          // console.log("AJAX Request complete -> ", xhr, " -> ", textStatus);
          // console.log('Data Updated')
            }
    });

    return deferredData; // contains the passed data
};

// ----------------------------------------------------------------------------
// Game Level - Function to select level
// ----------------------------------------------------------------------------

$(document).ready(function () {
  $('.game-level .menu-level .item-level').one('click', function (e) {
    e.preventDefault();
    
    //1.Get selected html item value
    let level_selected = $(this).text().trim();
    
    //2.Send variable to flask function
    let request = new XMLHttpRequest();
    request.open("POST", `/update_level/${level_selected}`, false);
    request.send();
    
    //3.Get game data, & Change html button value of dropdown as selected, 
    //  and make the html button disable
    let btn =  $(this)
    // $(".level-btn").text($(this).text());
    // $(".level-btn").val($(this).text());
    // $(".level-btn").addClass('disabled');
    
    let get_game_data = getData();
    $.when( get_game_data  ).done( function( data ) {
      btn.text(btn.text());
      btn.val(btn.text());
      btn.addClass('disabled');
      console.log(btn)
      // GAME_DATA = data
      // console.log(GAME_DATA)
    });
    
  });
});

// ----------------------------------------------------------------------------
// Player Role - Function to select User Role
// ----------------------------------------------------------------------------

// ------------------------------------------------------------
// Role X
// ------------------------------------------------------------
$(document).ready(function () {
  $('.game-role .btn-role-X').one('click', function (e) {
    e.preventDefault();
    
    //1.Get selected html item value
    let role_selected = $('.role-X').text();

    //2.Send variable to flask function
    let request = new XMLHttpRequest();
    request.open("POST", `/update_role/${role_selected}`, false);
    request.send();
    
    //3.Get data, & disabled O button
    let btnX = $(this)
    let btnO = $(".btn-role-O")
    let get_game_data = getData();
    $.when( get_game_data  ).done( function( data ) {
      btnX.addClass('disabled-color');
      btnO.addClass('disabled');
      console.log(btnX)
      // GAME_DATA = data
      // console.log(GAME_DATA)
    });
    
  });
});

// ------------------------------------------------------------
// Role O
// ------------------------------------------------------------
$(document).ready(function () {
  $('.game-role .btn-role-O').one('click', function (e) {
    e.preventDefault();
    
    //1.Get selected html item value
    let role_selected = $('.role-O').text();

    //2.Send variable to flask function
    let request = new XMLHttpRequest();
    request.open("POST", `/update_role/${role_selected}`, false);
    request.send();
    
    //3.Get data, & disabled X button
    let get_game_data = getData();
    let btnX = $(".btn-role-X")
    let btnO = $(this)
    $.when( get_game_data  ).done( function( data ) {
      btnX.addClass('disabled');
      btnO.addClass('disabled-color');
      console.log(btnO)
      // GAME_DATA = data
      // console.log(GAME_DATA)
    });
    
  });
});

// ----------------------------------------------------------------------------
// Game Board
// ----------------------------------------------------------------------------
$(document).ready(function () {
  $('.game-board .squares .square').one('click', function (e) {
    e.preventDefault();
    
    //1.Get selected html item value
    cell = $(this).text().trim();
    // let turn_mark = $(this).val();
    
    //2.Send variable to flask function
    let request = new XMLHttpRequest();
    request.open("POST", `/update_cells/${cell}`, false);
    request.send()
    
    //3Get data, change html button value of square cell, and make the square cell disable
    // $(this).addClass('disabled');
    let btn = $(this)
    
    let get_game_data = getData();
    $.when( get_game_data  ).done( function( data ) {
      btn.addClass('disabled');
      console.log(btn)
      // GAME_DATA = data
      // console.log(GAME_DATA)
    });
    
  });
});
