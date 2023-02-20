import data from './data.js';

class Element {
  constructor(tag, attributes, text = '') {
    this.tag = tag;
    this.attributes = attributes;
    this.text = text;
  }
}

function create(x) {
  const item = document.createElement(x.tag);
  x.text && (item.textContent = x.text);
  for (const [key, value] of Object.entries(x.attributes)) {
    item.setAttribute(key, value);
  }
  return item;
}

function div(attributes) {
  const item = document.createElement('div');
  for (const [key, value] of Object.entries(attributes)) {
    item.setAttribute(key, value);
  }
  return item;
}

function a(attributes) {
  const item = document.createElement('a');
  for (const [key, value] of Object.entries(attributes)) {
    item.setAttribute(key, value);
  }
  return item;
}

function img(attributes) {
  const item = document.createElement('img');
  for (const [key, value] of Object.entries(attributes)) {
    item.setAttribute(key, value);
  }
  return item;
}

function span(text, attributes) {
  const item = document.createElement('span');
  text && (item.textContent = text);
  for (const [key, value] of Object.entries(attributes)) {
    item.setAttribute(key, value);
  }
  return item;
}

function Card1(props) {
  const item = a({
    class: 'Card-1 col-between',
    href: '#',
    title: `${props.title}`,
  });
  item
    .insertAdjacentElement('beforeend', div({ class: 'image-box' }))
    .insertAdjacentElement(
      'beforeend',
      img({ src: `./images/${props.img}`, alt: `${props.title}` })
    )
    .parentNode.insertAdjacentElement(
      'afterend',
      span(`${props.title}`, { class: 'title row-center' })
    );
  return item;
}

export function Сards() {
  const root = document.querySelector('.popular-categories .cards');
  for (const element of data) {
    root.append(Card1(element));
  }
  return root;
}

window.onload = Сards();

function arrow(parent, duration) {
  const item = div({ class: 'arrow' });
  item.insertAdjacentElement('beforeend', img({ src: './images/arrow.svg' }));
  item.addEventListener('click', function () {
    document.querySelectorAll('header .user > *').forEach(function (element) {
      element.animate(
        [{ transform: 'translate(0, 0)' }, { transform: 'translate(400px,0)' }],
        {
          duration: duration,
          fill: 'forwards',
        }
      );
    });
    setTimeout(() => {
      parent.classList.remove('--active');
      this.remove();
      document.querySelector('header .user').style.transform =
        'translateX(-400px)';
    }, duration);
  });
  return item;
}

document
  .querySelector('header .burger-box')
  .addEventListener('click', function () {
    const duration = 300;
    const user = document.querySelector('header .user');
    user.style.transform = 'translateX(0)';
    user.classList.toggle('--active');
    user.insertAdjacentElement('beforeend', arrow(user, duration));
    document.querySelectorAll('header .user > *').forEach(function (element) {
      element.animate(
        [
          { transform: 'translate(400px, 0)' },
          { transform: 'translate(0px,0)' },
        ],
        {
          duration: duration,
          fill: 'forwards',
        }
      );
    });
  });
