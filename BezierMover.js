function easeInOutSine(x) { // [0 ... 1]
	return (1-Math.cos(Math.PI*x))/2;
}

function easeInOutQuad(t) { // [0 ... 1]
	t = t*2;
	if (t < 1) return t*t/2;
	t--;
	return - (t*(t-2) - 1)/2;
}

function BezierMover(isShown, object, deviationX, deviationY, timeLimit, letter) {
	if (isShown === false) {
		this.draw = function() {}
	}
	this.letter = letter;
	this.object = object;
	this.timeNow = 0;
	this.timeLimit = timeLimit;
	this.deviationX = deviationX;
	this.deviationY = deviationY;
	this.generatePath(6, true);
}
BezierMover.prototype = {
	constructor: BezierMover,
	generatePath: function(count, fullUpdate) {
		if (fullUpdate) {
			this.path = [];
			for (var i = 0; i < count - 2; i++) {
				var rAng = Math.random() * 2 * Math.PI;
				var px = this.object.x + Math.cos(rAng) * this.deviationX*((i===0)?0.2:1), py = this.object.y + Math.sin(rAng) * this.deviationY*((i===0)?0.2:1);
				this.path.push({
					x: px,
					y: py
				});
			}
			this.path.push({
				x: b(this.path[0].x,this.path[1].x,-1),
				y: b(this.path[0].y,this.path[1].y,-1)
			});
			this.path.push({
				x: this.path[0].x,
				y: this.path[0].y
			});
			if (this.letter == "O") {
				this.path.forEach((pt, j) => {
					if (pt.y < ((j==0||j==5)?-100:-200))
						pt.y+=200;
					else if (pt.y > ((j==0||j==5)?50:100))
						pt.y-=100;
				})
			}
		} else {
			for (var i = 2; i < count - 2; i++) {
				var rAng = Math.random() * 2 * Math.PI;
				var px = this.object.x + Math.cos(rAng) * this.deviationX, py = this.object.y + Math.sin(rAng) * this.deviationY;
				this.path[i].x = px;
				this.path[i].y = py;
			}
		}
	},
	setObjectPosition(t) {
		t = easeInOutQuad(t);
		// all of this could easly be reduced to a recursive function (Casteljau's algorithm)
		// but it's nice to see what kind of math is happening
		var Ax = b(this.path[0].x, this.path[1].x, t)
		  , Bx = b(this.path[1].x, this.path[2].x, t)
		  , Cx = b(this.path[2].x, this.path[3].x, t)
		  , Dx = b(this.path[3].x, this.path[4].x, t)
		  , Ex = b(this.path[4].x, this.path[5].x, t);
		var ABx = b(Ax, Bx, t)
		  , BCx = b(Bx, Cx, t)
		  , CDx = b(Cx, Dx, t)
		  , DEx = b(Dx, Ex, t);
		var ABCx = b(ABx, BCx, t)
		  , BCDx = b(BCx, CDx, t)
		  , CDEx = b(CDx, DEx, t);
		var ABCDx = b(ABCx, BCDx, t)
		  , BCDEx = b(BCDx, CDEx, t);
		var ABCDEx = b(ABCDx, BCDEx, t);
		var Ay = b(this.path[0].y, this.path[1].y, t)
		  , By = b(this.path[1].y, this.path[2].y, t)
		  , Cy = b(this.path[2].y, this.path[3].y, t)
		  , Dy = b(this.path[3].y, this.path[4].y, t)
		  , Ey = b(this.path[4].y, this.path[5].y, t);
		var ABy = b(Ay, By, t)
		  , BCy = b(By, Cy, t)
		  , CDy = b(Cy, Dy, t)
		  , DEy = b(Dy, Ey, t);
		var ABCy = b(ABy, BCy, t)
		  , BCDy = b(BCy, CDy, t)
		  , CDEy = b(CDy, DEy, t);
		var ABCDy = b(ABCy, BCDy, t)
		  , BCDEy = b(BCDy, CDEy, t);
		var ABCDEy = b(ABCDy, BCDEy, t);
		this.object.x = ABCDEx;
		this.object.y = ABCDEy;
	},
	update: function(delta) {
		if (this.timeNow + delta < this.timeLimit) {
			this.timeNow += delta;
			this.setObjectPosition(this.timeNow / this.timeLimit);
		} else {
			this.timeNow = 0;
			this.setObjectPosition(0);
			this.generatePath(6, false);
		}
		
	},
	drawCross(x, y, size) {
		ctx.moveTo(x, y - size);
		ctx.lineTo(x, y + size);
		ctx.moveTo(x - size, y);
		ctx.lineTo(x + size, y);
	},
	draw: function(ctx) {
		ctx.strokeStyle = "#FFF";
		ctx.beginPath();
		this.drawCross(this.object.x, this.object.y, 4);
		ctx.stroke();
		ctx.strokeStyle = "#F00";
		ctx.beginPath();
		this.path.forEach(pt=>this.drawCross(pt.x, pt.y, 2));
		ctx.stroke();
	}
}
