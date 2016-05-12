/**
 * When passed the current game state and player, this function will
 * return an array of all possible game states that can result from
 * the appropriate player making a legal move.
 */
//TODO: Need to check for self-check conditions
function getLegalMoves(current_state, player) {
	var future_states = [];
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if(current_state[i][j] !== undefined && current_state[i][j].player == player) {
				future_states = future_states.concat(getLegalMovesOfPiece(current_state, i, j));
			} 
		}
	}
	return future_states;
}

/**
 * Returns all game states resulting from moving the selected piece.
 */
function getLegalMovesOfPiece(current_state, i, j) {
	var future_states = [];
	var player = current_state[i][j].player;
	var dir = player == WHITE ? 1 : -1;
	var home = player == WHITE ? 0 : 7;
	switch(current_state[i][j].rank) {
		case PAWN:
			if(current_state[i + dir][j] === undefined) {
				future_states.push(movePiece(current_state, i, j, dir, 0));
				if(i == home + dir && current_state[i + 2 * dir][j] === undefined)
					future_states.push(movePiece(current_state, i, j, 2 * dir, 0));
			}
			if(current_state[i + dir][j + 1] !== undefined)
				future_states.push(movePiece(current_state, i, j, dir, 1));
			if(current_state[i + dir][j - 1] !== undefined)
				future_states.push(movePiece(current_state, i, j, dir, -1));
			// En Passant
		break;
		case ROOK:
			for(var x = i + 1; x < 8; x++) {
				future_states.push(movePiece(current_state, i, j, x - i, 0));
				if(current_state[x][j] !== undefined)
					break;
			}
			for(var x = i - 1; x >= 0; x--) {
				future_states.push(movePiece(current_state, i, j, x - i, 0));
				if(current_state[x][j] !== undefined)
					break;
			}
			for(var y = i + 1; y < 8; y++) {
				future_states.push(movePiece(current_state, i, j, 0, y - j));
				if(current_state[i][y] !== undefined)
					break;
			}
			for(var y = i - 1; y >= 0; y--) {
				future_states.push(movePiece(current_state, i, j, 0, y - j));
				if(current_state[i][y] !== undefined)
					break;
			}
			// Castle
		break;
		case KNIGHT:
		break;
		case BISHOP:
		break;
		case QUEEN:
		break;
		case KING:
		break;
	}
	return future_states;
}

/**
 * Moves a piece to a new relative location taking a piece if necessary.
 */
function movePiece(current_state, i, j, x, y) {
	var new_state = clone_state(current_state);
	new_state[i + x][j + y] = current_state[i][j];
	new_state[i][j] = undefined;
	return new_state;
}