function LetterDrawer(letters_objects, distance, font) {
	this.letters = [];
	this.objects = [];
	this.boxes = [];
	this.font = font;
	this.distance = distance;
	letters_objects.forEach((obj) => {
		if (obj[1] !== undefined) {
			this.letters.push(obj[0]);
			this.objects.push(obj[1]);
			this.boxes.push(new GuiBox(obj[1].x, obj[1].y, 10, 10));
		}
	});
}
LetterDrawer.prototype = {
	constructor: LetterDrawer,
	update: function() {
		var defaultAngle = Math.PI*0.3;
		this.objects.forEach((obj, i) => {
			if (obj !== undefined) {
				this.boxes[i].middle = obj.x + Math.cos(defaultAngle)*this.distance;
				this.boxes[i].center = obj.y + Math.sin(defaultAngle)*this.distance;
			} else {
				this.boxes[i] = undefined;
			}
		});
	},
	drawCross(x, y, size) {
		ctx.moveTo(x, y - size);
		ctx.lineTo(x, y + size);
		ctx.moveTo(x - size, y);
		ctx.lineTo(x + size, y);
	},
	draw: function(ctx) {
		this.update();
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = this.font;
		this.boxes.forEach((obj, i) => {
			if (obj != undefined) {
				ctx.fillStyle = (this.letters[i] === "K")?"#CCCCCC":"#FFFFFF"
				ctx.fillText(this.letters[i], obj.middle, -obj.center);
			}
		});
	}
}
