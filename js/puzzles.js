// data: a 2d array of groups, each with four options
Puzzle = function(data){
	this.data = data;
	// TODO not sorting correctly
	for (var wallName in data) {
		var wall = data[wallName];
		for (var i=0, l=wall.length; i<l; i++) {
			wall[i] = wall[i].sortLowerCase();
		}
	}
	return this;
}
Puzzle.prototype = {
	data: null,
	activeWall: null,
	getWall: function(wallName){
		if (this.data && this.data[wallName]) {
			this.activeWall = wallName;
			return this.data[wallName];
			this.activeWall = wallName;
		}
		return null;
	},
	/** Returns a randomised array of all the wall options. */
	getUnsortedWall: function(wallName){
		var out = [],
			wall = this.getWall(wallName);

		for (var i=0, l=wall.length; i<l; i++) {
			for (var j=0, m=wall[i].length; j<m; j++) {
				out.push(wall[i][j]);
			}
		}
		out.shuffle();
		return out;
	},
  getActiveWall: function(){
    return this.data[this.activeWall];
  },
	// Takes an array of 4 options. Returns true if it is a valid group
	isGroup: function(options) {
		if (!options.length || options.length !== 4) {
			return false;
		}
		var sorted = options.sortLowerCase(),
			wall = this.data[this.activeWall],
			groupMatch;

		// for each group
		// TODO not matching the greek letters
		for (var i=0, l=wall.length; i<l; i++) {
			var group = wall[i];
			groupMatch = true;

			// check each options
			for (var j=0, m=group.length; j<m; j++) {
				if (group[j] != sorted[j]) {
					groupMatch = false;
					break; // break out of inner loop
				}
			}
			if (groupMatch) {
				return true;
			}
		}

		return false;
	}
}

Puzzles = {
	// TODO: if createing more than one puzzle, define id's etc
	getPuzzle: function(){
			return new Puzzle(Puzzles.data);
	},

	data: {
		water: [
			['a', 'b', 'c', 'd'],
			[1, 2, 3, 4],
			['alpha', 'beta', 'gamma', 'delta'],
			['red', 'green', 'blue', 'yellow']
		],
		lion: [
			['a', 'b', 'c', 'd'],
			[1, 2, 3, 4],
			['alpha', 'beta', 'gamma', 'delta'],
			['red', 'green', 'blue', 'yellow']
		]
	}

	/*
		rope
		hurdle
		shark
		broomstick

		shotgun
		forced
		military
		mass

		Let us talk of nothing henceforth but equality
		your poverty is my pride
		my Soul is of equal Importance with the Soul of a Princess
		before I knew what the Matter was, it look’d like Love

		Reader, I married him
		conventionality is not morality
		I scorn your idea of love
		I am no bird

	 */
}