var dark_color = '#4F2822';
var light_color = '#DED3CC';
var white_color = '#FFFFFF';
var black_color = '#000000';

var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');

function drawBoard() {
	var width = canvas.width;
	var height = canvas.height;
	var square_size = parseInt(width < height ? width / 8 : height / 8);
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			ctx.fillStyle = (i + j) % 2 == 0 ? dark_color : light_color;
			ctx.fillRect(j * square_size + 1, i * square_size + 1, square_size - 2, square_size - 2);
		}
	}
}
drawBoard();

var board_state = init_state();

function drawPieces(state) {
	var width = canvas.width;
	var height = canvas.height;
	var square_size = parseInt(width < height ? width / 8 : height / 8);
	var center_size = parseInt(square_size / 2);
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if(state[i][j] !== undefined) {
				ctx.fillStyle = state[i][j].player == WHITE ? white_color : black_color;
				ctx.beginPath();
				ctx.arc(j * square_size + center_size, i * square_size + center_size, center_size - 5, 0, 2 * Math.PI);
				ctx.fill();
				ctx.fillStyle = state[i][j].player == WHITE ? black_color : white_color;
				ctx.fillText(state[i][j].rank, j * square_size + center_size, i * square_size + center_size);
			}
		}
	}
}
drawPieces(board_state);

var future_states = getLegalMoves(board_state, BLACK);

for(var i = 0; i < future_states.length; i++) {
	var $div = $("<div>", {	id : i,
							text : "State " + i,
							class : "alt_state"});
	$div.click(function() {
		drawBoard();
		drawPieces(future_states[this.id]);
	});
	$("#state_list").append($div);
}