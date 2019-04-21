import Component from '@ember/component';

let rect = {drawOn: false};

function mouseDown(e) {
	rect.startX = e.pageX - this.offsetLeft;
	rect.startY = e.pageY - this.offsetTop;
	rect.drawOn = true;
}

function mouseUp(e) {
	let target = e.target;

	rect.drawOn = false;
  	target.getContext('2d').clearRect(0, 0, canvas.width,canvas.height);
}

function mouseMove(e) {
	let target = e.target;

	if (rect.drawOn) {
		rect.w = (e.pageX - this.offsetLeft) - rect.startX;
		rect.h = (e.pageY - this.offsetTop) - rect.startY ;
		target.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		draw(target.getContext('2d'));
  }
}

function draw(ctx) {
    ctx.setLineDash([6]);
  	ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
}

export default Component.extend({
	tagName: 'canvas',
	attributeBindings:["id", "width", "height", "onMouseUp", "onMouseMove", "onMouseDown"],
	"id": "canvas",
	"width": "800",
	"height": "650",
	"onMouseMove": mouseMove,
	"onMouseUp": mouseUp,
	"onMouseDown" : mouseDown
});
