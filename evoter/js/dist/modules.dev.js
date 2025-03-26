"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start_loading = start_loading;

function start_loading(el, text, newtext, count, time) {
  var t = time;
  el.classList.add("loading_element");
  el.disabled = true;
  var c = setInterval(function () {
    t -= 1;
    console.log(t);

    if (count === true) {
      el.textContent = text + " 00:" + t;
    } else if (count === false) {
      el.textContent = text;
    }

    el.classList.add("loading_element");

    if (t == 0) {
      el.disabled = false;
      el.textContent = newtext;
      t = time;
      clearInterval(c);
      el.classList.remove("loading_element");
    }
  }, 1000);
}