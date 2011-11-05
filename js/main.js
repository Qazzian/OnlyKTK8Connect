OnlyConnect = {

	puzzle: null,
	playing: false,
	selectedBlocks: [],
	groups: [],
	TIME_LIMIT: 3*60*1000,
	startTime: 0,
	LIFE_LIMIT: 3,
	lives: 3,

	// TODO time limit
	
	init: function(){
		OnlyConnect.puzzle = Puzzles.getPuzzle();
		this.showWallSelector();
		var btns = $('#wallSelector').find('a');
		btns.each(function(btn){
			$(this).bind('click',OnlyConnect.selectWall);
		});
		$('.wallOption').live('click', OnlyConnect.onBlockClick);
		$('.revealAnswers').addClass('hidden');
	},

	showWallSelector: function(){
		$('#wallSelector').removeClass('hidden');
	},

	selectWall: function(event){
		event.preventDefault();
		var selectedWall = this.className;
		var selector = $('#wallSelector').addClass('hidden');
		var wallData = OnlyConnect.puzzle.getUnsortedWall(selectedWall);
		OnlyConnect.buildWall(wallData);
		// TODO start the timer
		OnlyConnect.lives = OnlyConnect.LIFE_LIMIT;
		OnlyConnect.playing = true;
		OnlyConnect.startTimer();

	},

	buildWall: function(wallData){
		var wallList = $('#wall ul');
		wallList.empty();
		for (var i=0, l=wallData.length; i<l; i++) {
			wallList.append('<li class="wallOption" id="wo_'+i+'"><div>'+wallData[i]+'</div></li>');
		}
		wallList.append('<li class="spacer" />');
		$('#wall').removeClass('hidden');
	},
	
	onBlockClick: function(event){
		var $this = $(this),
			oc = OnlyConnect;
		if ($this.hasClass('timeout') || $this.hasClass('set')) {
			return;
		}
		else {
			oc.selectWallBlock($this)
		}
		
	},

	selectWallBlock: function($block){
		$block = $block || $(this);
		var oc = OnlyConnect,
			value = oc.getBlockValue($block);
		if ($block.hasClass('selected')) {
			var index = oc.selectedBlocks.indexOf(value);
			oc.selectedBlocks.splice(index, 1);
			$block.removeClass('selected').removeClass('group'+oc.groups.length);
		}
		else {
			$block.addClass('selected').addClass('group'+oc.groups.length);
			oc.selectedBlocks.push(value);
			oc.checkForGroup(oc.selectedBlocks);
		}
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
			// TODO if group 3 then do last group automatically and end the game
			if (oc.groups.length == 3 && oc.playing == true) {
				oc.endGame(true);
			}
		}
		else {
			oc.clearSelectedBlocks();
			oc.looseLife();
		}
	},

	looseLife: function(){
		var oc = OnlyConnect;
		if (oc.groups.length == 2){
			$('#life'+oc.lives).addClass('lost');
			oc.lives--;
		}
		if (oc.lives <= 0) {
			oc.endGame(false);
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
		oc.sortBlocks(groupElmts);
		var targetIndex = (groupId*4);
		var target = wallList.children()[targetIndex];
		groupElmts.insertBefore(target);
	},

	sortBlocks: function(group){
		var oc = OnlyConnect;
		var compare = function(A, B) {
			var a = (oc.getBlockValue($(A))+'').toLowerCase(),
				b = (oc.getBlockValue($(B))+'').toLowerCase();
			return a >= b ? 1 : -1;
		}
		return group.sort(compare);
	},

	startTimer: function(){
		OnlyConnect.startTime = new Date();
		OnlyConnect.checkTime();
	},

	checkTime: function(){
		var oc = OnlyConnect,
			timeUsed = new Date() - oc.startTime;
		
		if (!oc.playing) {
			return;
		}

		if (timeUsed >= oc.TIME_LIMIT) {
			oc.endGame(false);
		}
		else {
			setTimeout(oc.checkTime, 500);
		}
		var time_pc = timeUsed/oc.TIME_LIMIT * 100;
		$('.TimeUsed').css('width', time_pc+'%');
	},

	endGame: function(isWin) {
		OnlyConnect.playing = false;
		OnlyConnect.clearSelectedBlocks();
		if (isWin) {
			$('#wall ul li').not('.set').each(OnlyConnect.selectWallBlock);
			alert("you completed the wall.");
		}
		else {
			var $wall = $('#wall ul'),
				$missedOptions = $wall.find('li').not('.set');
			$missedOptions.removeClass('selected').addClass('timeout');
			$('.revealAnswers').removeClass('hidden');
		}
	},

	revealAnswers: function(){
		var oc = OnlyConnect,
			wallData = oc.puzzle.getActiveWall(),
			wall = $('#wall li');
		
		$('.timeout').removeClass('timeout');
		
		for(var i=0,l=wallData.length; i<l; i++) {
			var firstVal = wallData[i][0],
				firstBlock = oc.findBlock(firstVal);
				
			if (firstBlock.hasClass('set')) {continue;}
			else {oc.selectGroup(wallData[i]);}
			
		}
		
	},
	
	findBlock: function(value){
		var wall = $('#wall li');
		for(var i=0,l=wall.length; i<l; i++) {
			var currValue = OnlyConnect.getBlockValue($(wall[i]));
			if (value == currValue) {
				return $(wall[i]);
			}
		}
		return null;
	},
	
	selectGroup: function(groupValues) {
		var wall = $('#wall li');
		for(var i=0,l=groupValues.length; i<l; i++) {
			var $block = OnlyConnect.findBlock(groupValues[i]);
			OnlyConnect.selectWallBlock($block);
		}
	}
	
}




