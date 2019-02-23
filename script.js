const $ = query => document.querySelectorAll(query);

const dist = (x1, y1, x2, y2) => Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));

const distFromElement = (element, x, y) => dist(x, y, element.offsetLeft + element.offsetWidth / 2, element.offsetTop + element.offsetHeight / 2);

document.onmousemove = event => {
  const {pageX, pageY} = event;

  $('.wave div').forEach(ripple => {
    const rotation = distFromElement(ripple, pageX, pageY);
    ripple.style = `transform: rotate(${rotation}deg)`;
  });
};