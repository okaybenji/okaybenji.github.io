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

const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const areaOfEffect = 1000;

const getColor = distance => {
  const minBrightness = 25;
  const minSaturation = 50;

  let color = 'hsl(';
  color += scale(distance, 0, areaOfEffect, 360, 0, easeOutQuad) + ',';
//  color += scale(distance, 0, areaOfEffect, 100, minSaturation, easeOutQuad) + '%,';
  //color += scale(distance, 0, areaOfEffect, 100, minBrightness, easeOutQuad) + '%)';
//  color += '100%,75%)';
  color += '100%,';
  color += scale(distance, 0, areaOfEffect, minBrightness, 50, easeOutQuad) + '%)';
  return color;
};

document.onmousemove = event => {
  const {pageX, pageY} = event;

  $('.wave div').forEach(ripple => {
    const distance = distFromElement(ripple, pageX, pageY);
    const rotation = scale(distance, 0, areaOfEffect, 180, 0, easeOutQuad);
    ripple.style = `transform: rotate(${rotation}deg); color: ${getColor(distance)}`;
  });
};