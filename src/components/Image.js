function Image(elementId, markerId) {
  this.id = markerId;
  this.element = document.getElementById(elementId);
  this.hidden = true;
  this.transform = new PerspectiveTransform(this.element, this.element.naturalWidth, this.element.naturalHeight, true);
}

Image.prototype.hide = () => {
  this.element.style = 'none';
  this.hidden = true;
};

Image.prototype.show = () => {
  this.element.style = 'block';
  this.hidden = false;
};

Image.prototype.updateWarp = (corners) => {
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
    this.element.show();
  } else {
    console.log('error with PerspectiveTransform');
    this.element.hide();
  }
};

export default Image;
