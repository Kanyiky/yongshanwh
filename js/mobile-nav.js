/* 手机菜单：Esc 关闭，点空白处关闭。换页前先收起，避免过渡把整屏菜单拍进去。 */
(function () {
  var box = document.getElementById("nav-toggle");
  var nav = document.querySelector(".sidebar .nav");
  if (!box || !nav) return;

  function sync() {
    box.setAttribute("aria-expanded", box.checked ? "true" : "false");
  }

  box.addEventListener("change", sync);
  sync();

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && box.checked) {
      box.checked = false;
      sync();
    }
  });

  nav.addEventListener("click", function (event) {
    if (event.target === nav) {
      box.checked = false;
      sync();
    }
  });

  nav.addEventListener("click", function (event) {
    var link = event.target.closest ? event.target.closest("a.nav-item") : null;
    if (!link || !box.checked) return;
    document.documentElement.classList.add("menu-instant");
    box.checked = false;
    sync();
    document.body.offsetWidth;
  }, true);

  var bar = document.querySelector(".sidebar");
  var narrow = window.matchMedia("(max-width: 768px)");
  function onScroll() {
    if (!bar) return;
    if (!narrow.matches || box.checked) {
      bar.classList.remove("is-condensed");
      return;
    }
    bar.classList.toggle("is-condensed", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();
