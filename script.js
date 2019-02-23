const $ = query => document.querySelectorAll(query);

const scale = (value, fromMin, fromMax, toMin, toMax, easing) => {
  let val;
  if (fromMin > fromMax) {
    val = Math.min(Math.max(value, fromMax), fromMin);
  } else {
    val = Math.max(Math.min(value, fromMax), fromMin);
  }
  val = (val - fromMin) / (fromMax - fromMin);
  if (easing) {
    val = easing(val);
  }
  return ((val) * (toMax - toMin)) + toMin;
};

const easeOutQuad = v => v * (2-v);

const dist = (x1, y1, x2, y2) => Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));

const distFromElement = (element, x, y) => dist(x, y, element.offsetLeft + element.offsetWidth / 2, element.offsetTop + element.offsetHeight / 2);

let lastMousePos = {pageX: -1, pageX: -1};
let posUpdate = Date.now();

document.onmousemove = event => {
  const {pageX, pageY} = event;
    const velocity = dist(lastMousePos.pageX, lastMousePos.pageY, pageX, pageY);
    lastMousePos = {pageX, pageY};

  $('.wave div').forEach(ripple => {
    const distance = distFromElement(ripple, pageX, pageY);
    // Increase the area of effect with mouse velocity.
    const areaOfEffect = Math.max(velocity * 5, 30);
    const rotation = scale(distance, 0, areaOfEffect, 180, 0, easeOutQuad);
    ripple.style = `transform: rotate(${rotation}deg)`;
  });
};