function Image(elementId, markerId, imageWidth, imageHeight) {
  this.id = markerId;
  this.element = document.getElementById(elementId);
  this.hidden = true;
  this.transform = new PerspectiveTransform(this.element, imageWidth, imageHeight, true);
}

Image.prototype.hide = hide;
Image.prototype.show = show;
Image.prototype.updateWarp = updateWarp;

export default Image;

//////

function hide() {
  this.element.style.display = 'none';
  this.hidden = true;
}

function show() {
  this.element.style.display = 'block';
  this.hidden = false;
}

function updateWarp(corners) {
  // TODO how to make this invasive?
  // this keeps the image constrained to the marker
  // perhaps we want it to be YUGE
  this.transform.topLeft.x = corners[0].x;
  this.transform.topLeft.y = corners[0].y;
  this.transform.topRight.x = corners[1].x;
  this.transform.topRight.y = corners[1].y;
  this.transform.bottomRight.x = corners[2].x;
  this.transform.bottomRight.y = corners[2].y;
  this.transform.bottomLeft.x = corners[3].x;
  this.transform.bottomLeft.y = corners[3].y;

  if (this.transform.checkError() === 0) {
    this.transform.update();
    // this.show();
  } else {
    console.log('error with PerspectiveTransform');
    this.hide();
  }
}
