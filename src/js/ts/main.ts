for (const item of document.querySelectorAll('.icon-heart') as any) {
  item.addEventListener('click', function () {
    this.classList.toggle('--active');
  });
}


