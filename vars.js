var KING 	= 1;
var QUEEN 	= 2;
var BISHOP 	= 3;
var KNIGHT 	= 4;
var ROOK 	= 5;
var PAWN 	= 6;

var WHITE = 100;
var BLACK = 101;

function Piece(rank, player) {
	this.rank = rank;
	this.player = player;
}

function init_state() {
	var state = [];
	for(var i = 0; i < 8; i++)
		state[i] = [];

	state[0][0] = new Piece(ROOK, 	WHITE);
	state[0][1] = new Piece(KNIGHT, WHITE);
	state[0][2] = new Piece(BISHOP, WHITE);
	state[0][3] = new Piece(KING, 	WHITE);
	state[0][4] = new Piece(QUEEN, 	WHITE);
	state[0][5] = new Piece(BISHOP, WHITE);
	state[0][6] = new Piece(KNIGHT, WHITE);
	state[0][7] = new Piece(ROOK, 	WHITE);
	state[1][0] = new Piece(PAWN, 	WHITE);
	state[1][1] = new Piece(PAWN, 	WHITE);
	state[1][2] = new Piece(PAWN, 	WHITE);
	state[1][3] = new Piece(PAWN, 	WHITE);
	state[1][4] = new Piece(PAWN, 	WHITE);
	state[1][5] = new Piece(PAWN, 	WHITE);
	state[1][6] = new Piece(PAWN, 	WHITE);
	state[1][7] = new Piece(PAWN, 	WHITE);

	state[6][0] = new Piece(PAWN, 	BLACK);
	state[6][1] = new Piece(PAWN, 	BLACK);
	state[6][2] = new Piece(PAWN, 	BLACK);
	state[6][3] = new Piece(PAWN, 	BLACK);
	state[6][4] = new Piece(PAWN, 	BLACK);
	state[6][5] = new Piece(PAWN, 	BLACK);
	state[6][6] = new Piece(PAWN, 	BLACK);
	state[6][7] = new Piece(PAWN, 	BLACK);
	state[7][0] = new Piece(ROOK, 	BLACK);
	state[7][1] = new Piece(KNIGHT, BLACK);
	state[7][2] = new Piece(BISHOP, BLACK);
	state[7][3] = new Piece(KING, 	BLACK);
	state[7][4] = new Piece(QUEEN, 	BLACK);
	state[7][5] = new Piece(BISHOP, BLACK);
	state[7][6] = new Piece(KNIGHT, BLACK);
	state[7][7] = new Piece(ROOK, 	BLACK);

	return state;
}

/**
 * Return a deep copy of a game state.
 */
function clone_state(source_state) {
	var clone = [];
	for(var i = 0; i < 8; i++) {
		clone[i] = [];
		for(var j = 0; j < 8; j++)
			if(source_state[i][j] !== undefined)
				clone[i][j] = new Piece(source_state[i][j].rank, source_state[i][j].player);
	}
	return clone;
}