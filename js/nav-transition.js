/* 侧栏当前项的竖线。浏览器若支持跨页过渡，由 CSS 接手；否则点击后淡出再打开。 */
(function () {
  var nav = document.querySelector(".sidebar .nav");
  if (!nav) return;
  var items = Array.prototype.slice.call(nav.querySelectorAll("a.nav-item"));
  if (!items.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var crossDoc = !reduce && (typeof window.PageRevealEvent === "function" || typeof window.PageSwapEvent === "function");

  var rail = nav.querySelector(".nav-rail");
  if (!rail) {
    rail = document.createElement("span");
    rail.className = "nav-rail";
    rail.setAttribute("aria-hidden", "true");
    nav.insertBefore(rail, nav.firstChild);
  }
  nav.classList.add("has-rail");
  if (!document.getElementById("compass")) document.documentElement.classList.add("nav-page");

  function activeIndex() {
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains("active")) return i;
    }
    return 0;
  }

  function place(index) {
    var item = items[index];
    if (!item) return;
    rail.style.height = item.offsetHeight + "px";
    rail.style.transform = "translate(" + item.offsetLeft + "px, " + item.offsetTop + "px)";
  }

  var here = activeIndex();
  var stored = null;
  try { stored = sessionStorage.getItem("ys-nav-from"); } catch (e) {}
  try { sessionStorage.removeItem("ys-nav-from"); } catch (e2) {}
  var fromIndex = stored === null ? here : parseInt(stored, 10);
  if (isNaN(fromIndex) || fromIndex < 0 || fromIndex >= items.length) fromIndex = here;

  if (!crossDoc && !reduce && stored !== null && fromIndex !== here) {
    place(fromIndex);
    rail.getBoundingClientRect();
    document.documentElement.classList.add("nav-fallback");
    document.documentElement.classList.add("nav-enter");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { place(here); });
    });
  } else {
    place(here);
    if (!crossDoc && !reduce && stored !== null) document.documentElement.classList.add("nav-enter");
  }

  window.addEventListener("resize", function () {
    rail.style.transition = "none";
    place(activeIndex());
    rail.getBoundingClientRect();
    rail.style.transition = "";
  });

  window.addEventListener("pageshow", function () {
    document.documentElement.classList.remove("nav-leave");
  });

  nav.addEventListener("click", function (event) {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    var link = event.target.closest("a.nav-item");
    if (!link || !nav.contains(link)) return;
    if (link.target && link.target !== "_self") return;
    var url;
    try { url = new URL(link.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;
    var path = function (value) { return value.replace(/\/index\.html$/, "/"); };
    if (path(url.pathname) === path(location.pathname) && url.search === location.search) return;

    try { sessionStorage.setItem("ys-nav-from", String(activeIndex())); } catch (e) {}
    if (crossDoc || reduce) return;

    event.preventDefault();
    document.documentElement.classList.add("nav-fallback");
    document.documentElement.classList.remove("nav-enter");
    document.documentElement.classList.add("nav-leave");
    var dest = items.indexOf(link);
    if (dest >= 0) place(dest);
    var href = link.href;
    window.setTimeout(function () { location.href = href; }, 280);
  });
})();
