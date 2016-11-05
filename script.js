'use strict'
var canvas, ctx, surf, scale, movers, letterer;
var b = ((i,j,t)=>i + (j - i) * t)/* Bezier */
  , ib = ((i,j,t)=>(j == i) ? 0 : (t - i) / (j - i))/* Inverse bezier */
  , bP = ((u,v,t)=>({
	x: b(u.x, v.x, t.x),
	y: b(u.y, v.y, t.y)
}))/* Vectorial Bezier */
  , ibP = ((u,v,t)=>({
	x: ib(u.x, v.x, t.x),
	y: ib(u.y, v.y, t.y)
}))/* Vectorial Inverse Bezier */
  , sqdist = ((u,v)=>(Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2)))/* Vectorial Squared distance */
  , dist = ((u,v)=>Math.sqrt(Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2)))/* Vectorial Distance */
  , angle = ((u,v)=>Math.atan2(u.y - v.y, u.x - v.x))/* Vectorial Distance */
  , vec = ((x,y)=>({
	x: x,
	y: y
}))/* Vector */
;
window.addEventListener("load", function() {
	let lastWidth, lastHeight;
	canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'cnv');
	lastHeight = canvas.height = (lastWidth = canvas.width = 560) / (4 / 3);
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
	scale = 1;
	var lastTime = + new Date();
	function redraw() {
		var delta = (lastTime !== undefined)?(lastTime-(lastTime = + new Date())):16;
		delta = delta / - 20;
		ctx.clearRect(0, 0, lastWidth, lastHeight);
		ctx.save();
		ctx.translate((b(0, lastWidth, 0.5) | 0) + 0.5, (b(0, lastHeight, 0.6) | 0) + 0.5);
		ctx.fillStyle = "#EEE";
		//if (surf.textList.length !== 0)
		//	surf.textList.forEach(tInfo=>ctx.fillText(tInfo.text, tInfo.x, -tInfo.y));
		ctx.scale(scale, -scale);
		movers.forEach(obj=>{
			obj.update(delta);
			obj.draw(ctx);
		});
		surf.draw(ctx);
		ctx.scale(1, -1);
		letterer.draw(ctx);
		ctx.restore();
		window.requestAnimationFrame(redraw);
	}
	surf = new SurfaceDrawer(canvas);
	movers = [new BezierMover(false,surf.A,10,30,250), new BezierMover(false,surf.B,20,15,300), new BezierMover(false,surf.C,15,40,300), new BezierMover(false,surf.O,160,200,600, "O")];
	letterer = new LetterDrawer([
		["K", surf.K],
		["O", surf.O],
		["D", surf.D],
		["E", surf.E],
		["F", surf.F],
		["G", surf.G],
		["H", surf.H],
		["I", surf.I],
		["J", surf.J],
		["L", surf.L]
		],8,"11px Calibri");
	document.addEventListener('resize', redraw);
	window.requestAnimationFrame(redraw);
	//window.setInterval(redraw, 50);
})
