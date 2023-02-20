for (var _i = 0, _a = document.querySelectorAll('.icon-heart'); _i < _a.length; _i++) {
    var item = _a[_i];
    item.addEventListener('click', function () {
        this.classList.toggle('--active');
    });
}
