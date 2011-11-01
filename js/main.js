OnlyConnect = {

	puzzle: null,
	selectedBlocks: [],
	groups: [],
	
	init: function(){
		OnlyConnect.puzzle = Puzzles.getPuzzle();
		this.showWallSelector();
		var btns = $('#wallSelector').find('a');
		btns.each(function(btn){
			$(this).bind('click',OnlyConnect.selectWall);
		});
		$('.wallOption').live('click', OnlyConnect.selectWallBlock);
	},

	showWallSelector: function(){
		$('#wallSelector').removeClass('hidden');
	},

	selectWall: function(event){
		event.preventDefault();
		console.log("Selected wall: ", this, event);
		var selectedWall = this.className;
		var selector = $('#wallSelector').addClass('hidden');
		var wallData = OnlyConnect.puzzle.getUnsortedWall(selectedWall);
		console.log(wallData);
		OnlyConnect.buildWall(wallData);
	},

	buildWall: function(wallData){
		var wallList = $('#wall>ul');
		wallList.empty();
		for (var i=0, l=wallData.length; i<l; i++) {
			wallList.append('<li class="wallOption" id="wo_'+i+'"><div>'+wallData[i]+'</div></li>');
		}
		wallList.append('<li class="spacer" />');
		$('#wall').removeClass('hidden');
	},

	selectWallBlock: function(event){
		var $this = $(this),
			oc = OnlyConnect;
		if ($this.hasClass('selected') || $this.hasClass('set')) {
			return;
		}
		$this.addClass('selected').addClass('group'+oc.groups.length);
		OnlyConnect.selectedBlocks.push(OnlyConnect.getBlockValue($this));
		OnlyConnect.checkForGroup(OnlyConnect.selectedBlocks);
	},

	getBlockValue: function($elmt){
		return $elmt.find('div').html();
	},

	checkForGroup: function(group){
		var oc = OnlyConnect;
		if (group.length < 4) {
			return;
		}

		if (oc.puzzle.isGroup(group)) {
			oc.storeSavedBlocks(group);
			oc.selectedBlocks = [];
			// TODO if group 2 then activate 3 lives.
			// TODO if group 3 then do last group automatically and end the game
		}
		else {
			oc.clearSelectedBlocks();
		}
	},

	clearSelectedBlocks: function() {
		var oc = OnlyConnect;
		$('#wall .selected').removeClass('selected').removeClass('group'+oc.groups.length).addClass('wrong');
		oc.selectedBlocks = [];
		oc.flashBlocks();
	},

	flashBlocks: function(){
		setTimeout( function(){
			$('#wall .wrong').removeClass('wrong');
		}, 500);
	},

	storeSavedBlocks: function(group) {
		var oc = OnlyConnect,
			groupId = oc.groups.length,
			wallList = $('#wall ul');

		oc.groups.push(group);
		var groupElmts = wallList.find('.selected')
				.removeClass('selected')
				.addClass('set')
				.remove();
		// TODO sort the groupElmts
		var targetIndex = (groupId*4);
		var target = wallList.children()[targetIndex];
		groupElmts.insertBefore(target);
	},

	sortBlocks: function(group){
		// TODO
	},

	moveBlock: function(block, row, col){
		var $this = $(block),
			blockId = $this.attr('id'),
			$wall = $('#wall ul'),
			$allOptions = wall.find('li'),
			newPos = row*4 + col,
			newTop = blockHeight * row,
			newLeft = blockWidth * col,
			currPos, currTop, currLeft;

		// find the current pos
		$wall.each(function(index){
			if (this.id == blockId) {
				currPos = index;
				return false;
			}
		});

		// Now to do the move ???
			


	}
	
}




