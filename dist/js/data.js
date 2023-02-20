class Card1 {
  constructor(id, img, title) {
    this.id = id;
    this.img = img;
    this.title = title;
  }
}
export default [
  new Card1(1, 'rings.png', 'Кольца'),
  new Card1(2, 'earrings.png', 'Серьги'),
  new Card1(3, 'eng-rings.png', 'Помолвочные кольца'),
  new Card1(4, 'bracelet.png', 'Браслеты'),
  new Card1(5, 'necklace.png', 'Колье и подвески'),
  new Card1(6, 'watch.png', 'Часы'),
];
