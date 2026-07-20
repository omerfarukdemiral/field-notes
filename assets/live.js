// Kartları viewport'a sığdırır. Sadece canlı sayfada çalışır —
// PNG export'u file:// üzerinden yapıldığı için orada devre dışı kalır.
//
// Masaüstünde: kart tam boyutuna kadar (max 1200px) sığdırılır.
// Mobilde: kart genişliğe sığar (genel bakış) + karta dokununca okunur
// ölçekte, kaydırılabilir bir okuyucu (lightbox) açılır. Böylece telefonda
// pinch-zoom gerekmeden rahatça okunur.
(function () {
  if (location.protocol === 'file:') return;

  var MOBILE = 720;

  function isMobile() {
    return document.documentElement.clientWidth <= MOBILE;
  }

  function fit() {
    var max = Math.min(document.documentElement.clientWidth - 32, 1200);
    var mobile = isMobile();
    var cards = document.querySelectorAll('.canvas');

    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];

      if (!c.dataset.w) {
        c.dataset.w = c.offsetWidth;
        c.dataset.h = c.offsetHeight;
      }
      var w = +c.dataset.w, h = +c.dataset.h;
      var s = Math.min(1, max / w);

      var wrap = c.parentElement && c.parentElement.classList.contains('scaler')
        ? c.parentElement
        : null;

      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'scaler';
        c.parentNode.insertBefore(wrap, c);
        wrap.appendChild(c);
        (function (idx) {
          wrap.addEventListener('click', function () {
            if (isMobile()) openZoom(idx);
          });
        })(i);
      }

      c.style.transform = 'scale(' + s + ')';
      c.style.transformOrigin = 'top left';
      c.style.margin = '0';

      wrap.style.width = (w * s) + 'px';
      wrap.style.height = (h * s) + 'px';
      wrap.style.margin = '0 auto 28px';
      wrap.classList.toggle('zoomable', mobile);
    }
  }

  // Okunur ölçekte, kaydırılabilir tam ekran görüntüleyici.
  function openZoom(idx) {
    if (document.querySelector('.cardzoom')) return;
    var cards = document.querySelectorAll('.canvas');
    var src = cards[idx];
    if (!src) return;

    var w = +src.dataset.w, h = +src.dataset.h;
    var vw = document.documentElement.clientWidth;
    // metni yaklaşık %80 boyutunda göster — pinch gerekmeden okunur.
    var s = Math.min(1, Math.max(0.8, vw / w));

    var overlay = document.createElement('div');
    overlay.className = 'cardzoom';

    var pan = document.createElement('div');
    pan.className = 'cardzoom-pan';

    var box = document.createElement('div');
    box.className = 'cardzoom-box';
    box.style.width = (w * s) + 'px';
    box.style.height = (h * s) + 'px';

    var clone = src.cloneNode(true);
    clone.style.transform = 'scale(' + s + ')';
    clone.style.transformOrigin = 'top left';
    clone.style.margin = '0';
    box.appendChild(clone);
    pan.appendChild(box);
    overlay.appendChild(pan);

    var close = document.createElement('button');
    close.className = 'cardzoom-x';
    close.setAttribute('aria-label', 'kapat');
    close.innerHTML = '&times;';
    overlay.appendChild(close);

    var hint = document.createElement('div');
    hint.className = 'cardzoom-hint';
    hint.textContent = 'kaydırarak oku · kapatmak için × ';
    overlay.appendChild(hint);

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = 'hidden';

    function shut() {
      overlay.remove();
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') shut(); }

    close.addEventListener('click', function (e) { e.stopPropagation(); shut(); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === pan) shut();
    });
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'complete') fit();
  else window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
