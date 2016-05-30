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
			if(current_state[i + dir][j] === undefined) {
				pushIfValid(future_states, movePiece(current_state, i, j, dir, 0), player);
				if(i == home + dir && current_state[i + 2 * dir][j] === undefined) {
					var new_state = movePiece(current_state, i, j, 2 * dir, 0);
					if(new_state[i + 2 * dir][j - 1] !== undefined && new_state[i + 2 * dir][j - 1].player != player)
						new_state[i + 2 * dir][j - 1].en_passant = j;
					if(new_state[i + 2 * dir][j + 1] !== undefined && new_state[i + 2 * dir][j + 1].player != player)
						new_state[i + 2 * dir][j + 1].en_passant = j;
					pushIfValid(future_states, new_state, player);
				}
			}
			if(current_state[i + dir][j + 1] !== undefined && takeable(current_state, i + dir, j + 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, dir, 1), player);
			if(current_state[i + dir][j - 1] !== undefined && takeable(current_state, i + dir, j - 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, dir, -1), player);
			if(current_state[i][j].en_passant !== undefined) {
				var new_state = movePiece(current_state, i, j, dir, current_state[i][j].en_passant - j);
				new_state[i][current_state[i][j].en_passant] = undefined;
				pushIfValid(future_states, new_state, player);
			}

		break;
		case ROOK:
			for(var x = i + 1; x < 8; x++) {
				if(takeable(current_state, x, j, player)) {
					var new_state = movePiece(current_state, i, j, x - i, 0);
					new_state[x][j].can_castle = false;
					pushIfValid(future_states, new_state, player);
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var x = i - 1; x >= 0; x--) {
				if(takeable(current_state, x, j, player)) {
					var new_state = movePiece(current_state, i, j, x - i, 0);
					new_state[x][j].can_castle = false;
					pushIfValid(future_states, new_state, player);
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i + 1; y < 8; y++) {
				if(takeable(current_state, i, y, player)) {
					var new_state = movePiece(current_state, i, j, 0, y - j);
					new_state[i][y].can_castle = false;
					pushIfValid(future_states, new_state, player);
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i - 1; y >= 0; y--) {
				if(takeable(current_state, i, y, player)) {
					var new_state = movePiece(current_state, i, j, 0, y - j);
					new_state[i][y].can_castle = false;
					pushIfValid(future_states, new_state, player);
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}

		break;
		case KNIGHT:
			if(takeable(current_state, i + 2, j + 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 2, 1), player);
			if(takeable(current_state, i + 2, j - 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 2, -1), player);
			if(takeable(current_state, i - 2, j + 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -2, 1), player);
			if(takeable(current_state, i - 2, j - 1, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -2, -1), player);
			if(takeable(current_state, i + 1, j + 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 1, 2), player);
			if(takeable(current_state, i + 1, j - 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, 1, -2), player);
			if(takeable(current_state, i - 1, j + 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -1, 2), player);
			if(takeable(current_state, i - 1, j - 2, player))
				pushIfValid(future_states, movePiece(current_state, i, j, -1, -2), player);
		break;
		case BISHOP:
			for(var z = 1; i + z < 8 && j + z < 8; z++) {
				if(takeable(current_state, i + z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, z), player);
					if(current_state[i + z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i + z < 8 && j - z >= 0; z++) {
				if(takeable(current_state, i + z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, -z), player);
					if(current_state[i + z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j + z < 8; z++) {
				if(takeable(current_state, i - z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, z), player);
					if(current_state[i - z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j - z >= 0; z++) {
				if(takeable(current_state, i - z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, -z), player);
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
					pushIfValid(future_states, movePiece(current_state, i, j, x - i, 0), player);
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var x = i - 1; x >= 0; x--) {
				if(takeable(current_state, x, j, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, x - i, 0), player);
					if(current_state[x][j] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i + 1; y < 8; y++) {
				if(takeable(current_state, i, y, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, 0, y - j), player);
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var y = i - 1; y >= 0; y--) {
				if(takeable(current_state, i, y, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, 0, y - j), player);
					if(current_state[i][y] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i + z < 8 && j + z < 8; z++) {
				if(takeable(current_state, i + z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, z), player);
					if(current_state[i + z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i + z < 8 && j - z >= 0; z++) {
				if(takeable(current_state, i + z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, z, -z), player);
					if(current_state[i + z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j + z < 8; z++) {
				if(takeable(current_state, i - z, j + z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, z), player);
					if(current_state[i - z][j + z] !== undefined)
						break;
				} else {
					break;
				}
			}
			for(var z = 1; i - z >= 0 && j - z >= 0; z++) {
				if(takeable(current_state, i - z, j - z, player)) {
					pushIfValid(future_states, movePiece(current_state, i, j, -z, -z), player);
					if(current_state[i - z][j - z] !== undefined)
						break;
				} else {
					break;
				}
			}
		break;
		case KING:
			if(takeable(current_state, i + 1, j, player)) {
				var new_state = movePiece(current_state, i, j, 1, 0);
				new_state[i + 1][j].can_castle = false;
				pushIfValid(future_states, new_state, player);
			}
			if(takeable(current_state, i - 1, j, player)) {
				var new_state = movePiece(current_state, i, j, -1, 0);
				new_state[i - 1][j].can_castle = false;
				pushIfValid(future_states, new_state, player);
			}
			if(takeable(current_state, i, j + 1, player)) {
				var new_state = movePiece(current_state, i, j, 0, 1);
				new_state[i][j + 1].can_castle = false;
				pushIfValid(future_states, new_state, player);
			}
			if(takeable(current_state, i, j - 1, player)) {
				var new_state = movePiece(current_state, i, j, 0, -1);
				new_state[i][j - 1].can_castle = false;
				pushIfValid(future_states, new_state, player);
			}
			if(current_state[i][j].can_castle) {
				if(current_state[home][0] !== undefined &&
				   current_state[home][0].can_castle == true &&
				   current_state[home][1] === undefined &&
				   current_state[home][2] === undefined) {
					if(pushIfValid(null, movePiece(current_state, i, j, -1, 0), player, true)) {
						var new_state = movePiece(movePiece(current_state, i, j, 0, -2), i, 0, 0, 2);
						new_state[home][1].can_castle = false;
						pushIfValid(future_states, new_state, player);
					}
				}
			}
			if(current_state[i][j].can_castle) {
				if(current_state[home][7] !== undefined &&
				   current_state[home][7].can_castle == true &&
				   current_state[home][6] === undefined &&
				   current_state[home][5] === undefined &&
				   current_state[home][4] === undefined) {
					if(pushIfValid(null, movePiece(current_state, i, j, 1, 0), player, true)) {
						var new_state = movePiece(movePiece(current_state, i, j, 0, 2), i, 0, 0, -3);
						new_state[home][5].can_castle = false;
						pushIfValid(future_states, new_state, player);
					}
				}
			}
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
function pushIfValid(array, element, player, do_not_push) {
	if(element !== undefined) {
		//TODO: Check for exposed King
		if(do_not_push !== undefined)
			return true;
		else
			array.push(element);
	} else
		return false;
}