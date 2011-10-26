Puzzles = {
	getPuzzle: function(id){
		if (id.match(/^(lion|water)$/)) {
			return Puzzles.data[id];
		}
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