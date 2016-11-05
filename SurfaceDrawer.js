function SurfaceDrawer(width, height) {
	this.resize(width, height);
	for (var i = 0;i<26;i++) {
		this[String.fromCharCode(65+i)] = {x:-2500, y:-2500};
	}
	this.setPositions(true);
}
function sV(u, v, dist) {
	return bP(u, v, {x: dist, y:dist});
}
function setVector(u, v) {
	u.x = v.x;
	u.y = v.y;
}
function getInclination(u, v) {
	return (u.y-v.y)/(u.x-v.y);
}

function intersect(p1, p2, p3, p4) {
	var x1 = p1.x
	  , x2 = p2.x
	  , x3 = p3.x
	  , x4 = p4.x
	  , y1 = p1.y
	  , y2 = p2.y
	  , y3 = p3.y
	  , y4 = p4.y
	  , denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
	if (denominator == 0) {
		return vec((x1 + x2 + x3 + x4) / 4, (y1 + y2 + y3 + y4) / 4);
	} else {
		var dL1 = (x1 * y2 - y1 * x2)
		  , dL2 = (x3 * y4 - y3 * x4)
		  , dx = dL1 * (x3 - x4) - (x1 - x2) * dL2
		  , dy = dL1 * (y3 - y4) - (y1 - y2) * dL2;
		return vec(dx / denominator, dy / denominator);
	}
}
SurfaceDrawer.prototype = {
	constructor: SurfaceDrawer,
	setPositions: function(setOrigin) {
		if (setOrigin) {
			this.A = {
				x: -400,
				y: 200
			};
			this.B = {
				x: 0,
				y: -400
			};
			this.C = {
				x:500,
				y: 200
			};
			this.O = {
				x: 0,
				y: 0
			};

			this.OE = (0.5+Math.random()*4)*0.05; // Height
			this.OD = (1+Math.random()*2.5)*0.05; // Left
			this.OG = (1+Math.random()*2.5)*0.05; // Right
			if (this.OD > this.OG) {
				let aux = this.OD;
				this.OD = this.OG;
				this.OG = aux;
			}
		}

		setVector(this.E, sV(this.O, this.B, -this.OE));
		setVector(this.D, sV(this.O, this.A, this.OD));
		setVector(this.G, sV(this.O, this.C, this.OG));


		setVector(this.F, intersect(this.A,this.E,this.D,this.B));
		setVector(this.H, intersect(this.C,this.E,this.G,this.B));
		setVector(this.J, intersect(this.A,this.H,this.C,this.F));
		setVector(this.K, intersect(this.A,this.G,this.C,this.D));
		//setVector(this.L, {x: this.O.x, y:(this.O.y + this.K.y)/2 });
		//this.F = bP(this.A, this.E, );
	},
	draw: function(ctx) {
		this.textList = [];
		this.setPositions();
		ctx.save();
		ctx.strokeStyle = "#DDD";
		ctx.fillStyle = "#CCC";
		ctx.lineWidth = 1;
		this.drawPoint(this.A);
		this.drawPoint(this.B);
		this.drawPoint(this.C);
		this.drawPoint(this.D);
		this.drawPoint(this.E);
		this.drawPoint(this.F);
		this.drawPoint(this.G);
		this.drawPoint(this.H);
		this.drawPoint(this.J);
		this.drawPoint(this.K);
		this.drawLine(this.O, this.E);
		this.drawLine(this.O, this.D);
		this.drawLine(this.D, this.F);
		this.drawLine(this.F, this.E);
		this.drawLine(this.O, this.G);
		this.drawLine(this.G, this.H);
		this.drawLine(this.E, this.H);
		this.drawLine(this.E, this.H);
		var v1 = angle(this.F,this.J), v2 = angle(this.F,this.E);
		if (v1 < 0) v1 += Math.PI*2;
		if (v2 < 0) v2 += Math.PI*2;
		var comp = v1 < v2;
		ctx.lineWidth = (this.OG<this.OD?comp:comp)?0.3:1;
		this.drawLine(this.H, this.J);
		this.drawLine(this.J, this.F);
		v1 = angle(this.D,this.K);
		v2 = angle(this.D,this.O);
		if (v1 < 0) v1 += Math.PI*2;
		if (v2 < 0) v2 += Math.PI*2;
		comp = v1 < v2;
		ctx.lineWidth = (this.OG<this.OD?comp:!comp)?0.3:1;
		this.drawLine(this.G, this.K);
		this.drawLine(this.K, this.D);
		ctx.lineWidth = 0.3;
		this.drawLine(this.K,this.J);
		ctx.restore();
	},
	drawLine: function(u, v, r) {
		if (r)
			ctx.lineWidth = r;
		ctx.beginPath();
		ctx.moveTo(u.x, u.y);
		ctx.lineTo(v.x, v.y);
		ctx.stroke();
	},
	drawPoint: function(u, v, text) {
		ctx.beginPath();
		if (typeof u === "object") {
			ctx.moveTo(u.x - 2, u.y);
			ctx.lineTo(u.x + 2, u.y);
			ctx.moveTo(u.x, u.y - 2);
			ctx.lineTo(u.x, u.y + 2);
		} else if (typeof u === "number") {
			ctx.moveTo(u - 4, v);
			ctx.lineTo(u + 4, v);
			ctx.moveTo(u, v - 4);
			ctx.lineTo(u, v + 4);
		}
		ctx.stroke();
	},
	resize: function(width, height) {
		this.width = width;
		this.height = height;
	}
}
