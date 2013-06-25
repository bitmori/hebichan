var g_setting = {
	width: 32,
	height: 24
}

var rowHTML = "";
for (var i=0; i<g_setting.width; i++){
	rowHTML += "<td></td>";
}

var grid = [];
var mainTimer;
var _s;
$(function () {
	for (var i = 0; i < g_setting.height; i++) {
		$("#playgroundt").append("<tr id='r"+i+"'>"+rowHTML+"</tr>");
		grid[i] = $("tr#r"+i+">td").toArray();
		$(grid[i][0]).addClass("wall");
		$(grid[i][g_setting.width-1]).addClass("wall");
	};
	$(grid[0]).addClass("wall");
	$(grid[g_setting.height-1]).addClass("wall");
	setSnake(1,1);
	setSnake(2,1);
	setSnake(3,1);

	$("#splash").width($("#playgroundt").width()).height($("#playgroundt").height());
	$("#startBtn").click(function(){
		$("#splash").hide();
		_s = new Snake();
		generateFood();
		mainTimer = window.setInterval(function (){
			_s.move();
		}, 250);
	});

	$(document).keyup(function(e){
		if(_s==null)return;
		switch(e.keyCode){
			case 65: //this is left! (a)
				_s.turnTo("l");
				break;
			case 87: //this is up! (w)
				_s.turnTo("u");
				break;
			case 68: //this is right (d)
				_s.turnTo("r");
				break;
			case 83: //this is down! (s)
				_s.turnTo("d");
				break;
		}
	});
});

function setSnake(x,y) {
	$(grid[y][x]).addClass("snake");
}

function remSnake(x,y) {
	$(grid[y][x]).removeClass("snake");
}

function generateFood(){
	var x,y;
	while(1){
		x = g_setting.width*Math.random()|0;
		y = g_setting.height*Math.random()|0;
		if(!($(grid[y][x]).hasClass("snake")||$(grid[y][x]).hasClass("wall")))
		{
			return $(grid[y][x]).addClass("food");
		}
	}
}

function Snake(){
	this.body = [
	new Point(3,1),
	new Point(2,1),
	new Point(1,1)
	];
	this.dir = "r";
}

function Point(x,y){
	this.x = x;
	this.y = y;
}

Snake.prototype.turnTo = function(dir) {
	this.dir=dir;
};

Snake.prototype.move = function() {
	var cx = this.body[0].x;
	var cy = this.body[0].y;

	var nextPoint;
	switch(this.dir){
		case "u":
			nextPoint = new Point(cx, cy-1);
		break;
		case "d":
			nextPoint = new Point(cx, cy+1);
		break;
		case "l":
			nextPoint = new Point(cx-1, cy);
		break;
		case "r":
			nextPoint = new Point(cx+1, cy);
		break;
	}
	if($(grid[nextPoint.y][nextPoint.x]).hasClass("wall")||$(grid[nextPoint.y][nextPoint.x]).hasClass("snake")){
		return killSnake();
	}
	this.body.unshift(nextPoint);
	setSnake(nextPoint.x,nextPoint.y);
	if(!$(grid[nextPoint.y][nextPoint.x]).hasClass("food")){
		var p = this.body.pop();
		remSnake(p.x,p.y);
	}else{
		//$(".food").removeClass("food");
		$(grid[nextPoint.y][nextPoint.x]).removeClass("food");
		generateFood();
	}
};

function killSnake () {
	window.clearInterval(mainTimer);
	mainTimer = 0;
	$(".snake").removeClass("snake");
	$(".food").removeClass("food");
	setSnake(1,1);
	setSnake(2,1);
	setSnake(3,1);
	$("#splash").show();
};
