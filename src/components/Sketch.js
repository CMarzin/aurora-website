/* eslint no-undef: 1 */
import Bubble from './Bubble'

let bubObjs = [];
window.bubbles = {
  count: 4
}

export const setup = (force) => {
  if (!force) return document.querySelector('#defaultCanvas0').remove()

  const size = getContainerSize();
  const container = document.querySelector('#app__container');

  createCanvas(size.width, size.height / 2, WEBGL);
  container.appendChild(canvas)

  setBubbles()
}

export const setBubbles = (value = 4) => {
  bubObjs = []
  for (let i = 0; i < value; i++) {
    bubObjs[i] = new Bubble();
  }
}

export const draw = () => {
  background(255);
  for (let i = 0; i < bubObjs.length; i++) {
    bubObjs[i].display();
    bubObjs[i].move();
  }
}

export const windowResized = () => {
  const size = getContainerSize();
  resizeCanvas(size.width, size.height / 2);
}

export const getContainerSize = () => {
  const container = document.querySelector('#app__container');
  const noPx = (str) => parseInt(str.replace('px', ''))

  return {
    width: noPx(getComputedStyle(container).width),
    height: noPx(getComputedStyle(container).height)
  }
}
