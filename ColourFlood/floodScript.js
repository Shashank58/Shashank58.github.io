var MAX_ROWS = 12;
var MAX_COLS = 12;

var MOVES = 0

var colourArray = new Array(MAX_ROWS);
var flushed = new Array(MAX_ROWS);

var all_colours = "violet blue green red orange yellow".split(/ /);

function new_game(){
    clear_table(get_id("game-table"));
    create_table();
}

function clear_table(table){
    while(table.lastChild)
        table.removeChild(table.lastChild);
}

function append_text(parent, text){
    var text_node = document.createTextNode(text);
    clear (parent);
    parent.appendChild(text_node);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array[0];
}

function test_colour_flood (row, col, colour){
    if (flushed[row][col])
        return;
    if (colourArray[row][col] == colour) {
        flushed[row][col] = true;
        /* Recurse to make sure that we get any connected neighbours. */
        flood_neighbours (row, col, colour);
    }
}

function flood_neighbours (row, col, colour){
    if (row < MAX_ROWS - 1)
        test_colour_flood (row + 1, col, colour);
    if (row > 0)
        test_colour_flood (row - 1, col, colour);
    if (col < MAX_COLS - 1)
        test_colour_flood (row, col + 1, colour);
    if (col > 0)
        test_colour_flood (row, col - 1, colour);
}

function change_colour(row, col, colour){
    var changer = get_id("game-table");
    changer.children[row].children[col].className = "piece " + colour;
}

function all_filled(){
    var match = colourArray[0][0];
    for(var row=0; row<MAX_ROWS; row++){
        for(var col=0; col<MAX_COLS; col++){
            if (colourArray[row][col] != match) {
                return false;
            }
        }
    }
    return true;
}

function flood(color){
    flushed[0][0] = true;
    MOVES++;
    var movesLeft = get_id("moves");
    movesLeft.innerHTML = MOVES;
    for(var primaryRow=0; primaryRow<MAX_ROWS; primaryRow++){
        for(var primaryCol=0; primaryCol<MAX_COLS; primaryCol++){
            if(flushed[primaryRow][primaryCol] == true){
                colourArray[primaryRow][primaryCol] = color;
                change_colour(primaryRow, primaryCol, color);
            }
        }
    }
    for(var row=0; row<MAX_ROWS; row++){
        for(var col=0; col<MAX_COLS; col++){
            if (flushed[row][col])
                flood_neighbours(row, col, color);
        }
    }
    if(MOVES === 22){
        alert("Ha Ha Loser!");
        new_game();
    }
    if(all_filled()){
        alert("Congrats you are not a loser :)");
        new_game();
    }
}

function get_id(theId){
    var returned = document.getElementById(theId);
    return returned;
}

function create_element(elem, parent){
    var theElem = document.createElement(elem);
    parent.appendChild(theElem);
    return theElem;
}

function create_table(){
    var table_main = get_id("game-table");
    MOVES = 0;
    //Creating new table with moves left
    for(var row=0; row<MAX_ROWS; row++){
        var tr = create_element("tr", table_main);
        colourArray[row] = new Array(MAX_COLS);
        flushed[row] = new Array(MAX_COLS);
        for(var col=0; col<MAX_COLS; col++){
            var td = create_element("td", tr); 
            var colour = shuffle(all_colours);
            td.className = "piece " + colour;
            colourArray[row][col] = colour;
            flushed[row][col] = false;
        }
    }
    var movesLeft = get_id("moves");
    movesLeft.innerHTML = MOVES;
}