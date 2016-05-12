/**
 * When passed the current game state and player, this function will
 * return an array of all possible game states that can result from
 * the appropriate player making a legal move.
 */
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
			if(takeable(current_state, i + dir, j, player)) {
				pushIfValid(future_states, movePiece(current_state, i, j, dir, 0));
				if(i == home + dir && takeable(current_state, i + 2 * dir, j, player))
					pushIfValid(future_states, movePiece(current_state, i, j, 2 * dir, 0));
			}
			if(current_state[i + dir][j + 1] !== undefined && current_state[i + dir][j + 1].player != player)
				pushIfValid(future_states, movePiece(current_state, i, j, dir, 1));
			if(current_state[i + dir][j - 1] !== undefined && current_state[i + dir][j - 1].player != player)
				pushIfValid(future_states, movePiece(current_state, i, j, dir, -1));
			// TODO:En Passant
		break;
		case ROOK:
			for(var x = i + 1; x < 8; x++) {
				if(takeable(current_state, x, j, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, x - i, 0));
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var x = i - 1; x >= 0; x--) {
				if(takeable(current_state, x, j, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, x - i, 0));
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i + 1; y < 8; y++) {
				if(takeable(current_state, i, y, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, 0, y - j));
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i - 1; y >= 0; y--) {
				if(takeable(current_state, i, y, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, 0, y - j));
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
		break;
		case KNIGHT:
			if(takeable(current_state, i + 2, j + 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 2, 1));
			if(takeable(current_state, i + 2, j - 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 2, -1));
			if(takeable(current_state, i - 2, j + 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -2, 1));
			if(takeable(current_state, i - 2, j - 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -2, -1));
			if(takeable(current_state, i + 1, j + 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 1, 2));
			if(takeable(current_state, i + 1, j - 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 1, -2));
			if(takeable(current_state, i - 1, j + 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -1, 2));
			if(takeable(current_state, i - 1, j - 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -1, -2));
		break;
		case BISHOP:
			for(var z = 1; i + z < 8 && j + z < 8; z++) {
				if(takeable(current_state, i + z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, z));
					if(current_state[i + z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i + z < 8 && j - z >= 0; z++) {
				if(takeable(current_state, i + z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, -z));
					if(current_state[i + z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j + z < 8; z++) {
				if(takeable(current_state, i - z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, z));
					if(current_state[i - z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j - z >= 0; z++) {
				if(takeable(current_state, i - z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, -z));
					if(current_state[i - z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
		break;
		case QUEEN:
			for(var x = i + 1; x < 8; x++) {
				if(takeable(current_state, x, j, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, x - i, 0));
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var x = i - 1; x >= 0; x--) {
				if(takeable(current_state, x, j, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, x - i, 0));
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i + 1; y < 8; y++) {
				if(takeable(current_state, i, y, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, 0, y - j));
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i - 1; y >= 0; y--) {
				if(takeable(current_state, i, y, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, 0, y - j));
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i + z < 8 && j + z < 8; z++) {
				if(takeable(current_state, i + z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, z));
					if(current_state[i + z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i + z < 8 && j - z >= 0; z++) {
				if(takeable(current_state, i + z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, -z));
					if(current_state[i + z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j + z < 8; z++) {
				if(takeable(current_state, i - z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, z));
					if(current_state[i - z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j - z >= 0; z++) {
				if(takeable(current_state, i - z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, -z));
					if(current_state[i - z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
		break;
		case KING:
			if(takeable(current_state, i + 1, j, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 1, 0));
			if(takeable(current_state, i - 1, j, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -1, 0));
			if(takeable(current_state, i, j + 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 0, 1));
			if(takeable(current_state, i, j - 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 0, -1));
			// TODO: Castling
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

/**
 * Returns true if the given piece can be taken by the player.
 */
function takeable(state, i, j, player) {
	if(i >= 8 || i < 0 || j >= 8 || j < 0)
		return false;
	if(state[i][j] === undefined || state[i][j].player != player)
		return true;
	return false;
}

/**
 * Pushes element onto array if it is not undefined and does
 * not expose the King.
 */
//TODO: Check for exposed King.
function pushIfValid(array, element) {
	if(element !== undefined)
		array.push(element);
}