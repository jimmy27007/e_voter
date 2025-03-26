"use strict";

/**
 * 
 * @param {HTMLelement} a 
 * @param {HTMLelement} b 
 * @param {HTMLelement} c
 * @param {HTMLelement} d 
 */
function register(a) {
  a.addEventListener("click", function () {
    window.location.href = "http://" + window.location.host + "/evoter/registration.html";
  });
}

function login() {
  window.location.href = "http://" + window.location.host + "/evoter/login.html";
}