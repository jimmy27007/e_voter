"use strict";

var electionID = 1;

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

function caution(string) {
  var caution_container = document.createElement("div");
  caution_container.setAttribute("class", "caution_container");
  caution_container.style.display = "flex";
  var aud = document.createElement("audio");
  aud.src = "/evoter/js/beep-warning-6387.mp3";
  aud.autoplay = true;
  document.body.append(aud);
  aud.play();
  var caution = document.createElement("div");
  caution.setAttribute("class", "caution");
  var sp = document.createElement("span");
  sp.innerHTML = "&#9888;";
  caution.append(sp);
  caution.innerHTML += string;
  var bt = document.createElement("button");
  bt.setAttribute("id", "close_caution");
  bt.textContent = "Close";

  bt.onclick = function () {
    caution_container.style.display = "none";
  };

  caution.append(bt);
  caution_container.append(caution);
  document.body.append(caution_container);
}

function confirmAction(str) {
  var confirm_action_container = document.createElement("div");
  confirm_action_container.setAttribute("id", "confirm_action_container");
  confirm_action_container.className = "confirm_action_container";
  confirm_action_container.style.display = "flex";
  confirm_action_container.style.background = "rgba(0, 0, 0, 0.8)";
  confirm_action_container.style.height = window.innerHeight + "px";
  var confirm_action = document.createElement("div");
  confirm_action.setAttribute("class", "confirm_action");
  var confirm_icon = document.createElement("div");
  confirm_icon.className = "confirm_icon";
  confirm_icon.innerHTML = "&#10004;";
  confirm_action.append(confirm_icon);
  var about_confirm = document.createElement("p");
  about_confirm.id = "about_confirm";
  about_confirm.className = "about_confirm";
  about_confirm.textContent = str;
  confirm_action.append(about_confirm);
  var action_buttons = document.createElement("div");
  action_buttons.id = "action_buttons";
  action_buttons.className = "action_buttons";
  var continue_action = document.createElement("button");
  continue_action.id = "continue_action";
  continue_action.className = "continue_action";
  continue_action.textContent = "Continue";
  action_buttons.append(continue_action);
  var cancel_action = document.createElement("button");
  cancel_action.id = "cancel_action";
  cancel_action.className = "cancel_action";
  cancel_action.textContent = "Close";
  continue_action.style.display = "none";
  action_buttons.append(cancel_action);
  confirm_action.append(action_buttons);
  confirm_action_container.append(confirm_action);
  document.body.append(confirm_action_container);

  continue_action.onclick = function () {
    localStorage.setItem("confirm_state", true);
    setTimeout(function () {
      localStorage.setItem("confirm_state", false);
    }, 5000);
    confirm_action_container.style.display = "none";
  };

  cancel_action.onclick = function () {
    confirm_state = false;
    localStorage.setItem("confirm_state", false);
    confirm_action_container.style.display = "none";
  };

  var aud = document.createElement("audio");
  aud.src = "/evoter/js/618f3287-new_facebook_ringtone_7.m4a";
  aud.autoplay = true;
  document.body.append(aud);
  aud.play();
}

function notify(string) {
  var notify_container = document.createElement("div");
  notify_container.setAttribute("class", "notify_container");
  notify_container.style.display = "flex";
  var aud = document.createElement("audio");
  aud.src = "/evoter/js/618f3287-new_facebook_ringtone_7.m4a";
  aud.autoplay = true;
  document.body.append(aud);
  aud.play();
  var notify = document.createElement("div");
  notify.setAttribute("class", "notify");
  var sp = document.createElement("span");
  sp.innerHTML = "&#10004;";
  notify.append(sp);
  notify.innerHTML += string;
  var bt = document.createElement("button");
  bt.setAttribute("id", "close_notify");
  bt.textContent = "Ok";

  bt.onclick = function () {
    notify_container.style.display = "none";
  };

  notify.append(bt);
  notify_container.append(notify);
  document.body.append(notify_container);
}

function submitLoginData(data, ur) {
  var xhr = new XMLHttpRequest();
  xhr.open("post", ur);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(data);
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var resJson = JSON.parse(xhr.responseText);

      if (resJson.error_state === true) {
        caution(resJson.error_type);
      } else if (resJson.error_state === false) {
        setTimeout(function () {
          window.location.href = "http://" + window.location.host + "/evoter/vote/";
        }, 2000);
      }
    } else if (xhr.status != 200) {
      caution("Cannot connect to the server.");
    }

    var formdata = new FormData();
    formdata.append("login_ethic", "correct");
    fetch("http://" + window.location.hostname + "/evoter/vote/", {
      method: "POST",
      body: formdata
    }).then(function (res) {
      return res.text;
    }).then(function (data) {})["catch"](function (err) {
      return console.error(err);
    });
  });
}

function submitRegistrationData(data, ur, info) {
  var xhr = new XMLHttpRequest();
  xhr.open("post", ur);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(data);
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      notify(xhr.responseText);
    } else if (xhr.status != 200) {
      caution("Cannot connect to the server.");
    }
  });
}
/**
 *
 * @param {HTMLelement} a
 * @param {HTMLelement} b
 * @param {HTMLelement} c
 * @param {HTMLelement} d
 */


function register(a) {
  a.addEventListener("click", function () {
    window.location.href = "http://" + window.location.host + "/evoter/registration/";
  });
}

function login_page() {
  window.location.href = "http://" + window.location.host + "/evoter/login/";
}

function refresh() {
  window.location.reload();
} //generating random mathematics


var c;
var d;

function generate_rand_math(e) {
  var a = Math.floor(Math.random() * 100);
  var b = Math.floor(Math.random() * 100);

  if (a > b) {
    c = (a - b).toString();
    d = "".concat(a, "-").concat(b, "=");
  } else {
    c = (a + b).toString();
    d = "".concat(a, "+").concat(b, "=");
  }

  e.innerHTML = d;
}

function generateRandomCodeLogin(id) {
  var loginFd = new FormData();
  loginFd.append("login_id", id);
  loginFd.append("election_id", electionID);
  fetch("http://" + location.hostname + "/evoterphp/login/verifylogin.php", {
    method: "POST",
    body: loginFd
  }).then(function (res) {
    return res.json().then(function (data) {
      switch (data.status) {
        case "email_sent":
          notify("Please check your email <h1 style='color:green;'><u>" + data.message + "</u></h1> for verification code.<br> <B><U>NOTE:</U></B> If you dont see it, please refresh or check the spam filter.");
          break;

        case "email_not_sent":
          caution("There was a problem sending the code. Please try again");
          break;

        default:
          caution("An error occurred while trying to send the code");
          break;
      }
    });
  });
}

function generateRandomCodeRegistration(email, username) {
  var fd = new FormData();
  fd.append("email", email);
  fd.append("name", username);
  fd.append("election_id", electionID);
  fetch("http://" + location.hostname + "/evoterphp/registration/verifyreg.php", {
    method: "POST",
    body: fd
  }).then(function (respons) {
    return respons.text();
  }).then(function (dat) {
    if (dat === "email_sent") {
      notify("The code has been sent to the email you entered");
    } else if (dat === "email_not_sent") {
      caution("There was a problem sending the code. Please try again");
    }
  })["catch"](function (err) {
    caution("An error occurred while trying to send the code");
  });
} //function for uploading images


var image_data;
var image_type;

function upload_photo(a, b, c) {
  b.src = localStorage.getItem("uploaded_img");
  c.textContent = localStorage.getItem("uploaded_img_name");
  a.addEventListener("change", function () {
    var reader = new FileReader();
    var input_file = a.files[0];
    reader.readAsDataURL(input_file);

    if (input_file.size > 4000000) {
      caution("Image is too large. The maximum should be 4mbs");
    } else {
      reader.addEventListener("load", function (e) {
        localStorage.setItem("uploaded_img", reader.result);
        c.textContent = input_file.name;
        localStorage.setItem("uploaded_img_name", input_file.name);
        b.src = reader.result;
        console.log(e.target.result);
      });
    }
  });
} // image_data = localStorage.getItem("uploaded_img").split(",")[1];
// image_type = localStorage.getItem("uploaded_img").split(",")[0];
//this is the function that validates the evoter registration form


var gen;
var details;

function validate_registration_details(name, name1, id, age, county, gender1, gender2, gender3, coutrycode, tel, email, password, confirm, sumtest, sendcode, code, submit, file_name) {
  //sending the verification code
  sendcode.addEventListener("click", function () {
    start_loading(sendcode, "Resend in", "Resend the code", true, 60);
    generateRandomCodeRegistration(email.value, name.value);
  });
  submit.addEventListener("click", function () {
    //checking the gender
    if (gender1.checked == true) {
      gen = "Male";
    } else if (gender2.checked == true) {
      gen = "Female";
    } else if (gender3.checked == true) {
      gen = "Other";
    } else {
      gen = "Empty";
    } //details to be uploaded to the server.


    var currentMinutes = new Date().getMinutes();
    var currentHours = new Date().getHours();
    var currentSeconds = new Date().getSeconds();
    var currentMilliseconds = new Date().getMilliseconds();
    var currentDate = new Date().getDate();
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();
    details = {
      election_id: electionID,
      name: name.value,
      name1: name1.value,
      id: id.value,
      age: age.value,
      county: county.value,
      gender: gen,
      country_code: coutrycode.value.toString(),
      mobile_num: tel.value.toString(),
      tel: coutrycode.value.toString() + tel.value.toString(),
      email: email.value,
      password: password.value,
      confirm: confirm.value,
      sumtest: sumtest.value,
      code: code.value,
      file_name: file_name.textContent,
      image_data: localStorage.getItem("uploaded_img").split(",")[1],
      image_type: localStorage.getItem("uploaded_img").split(",")[0],
      time: currentHours + ":" + currentMinutes + ":" + currentSeconds + ":" + currentMilliseconds,
      date: currentDate + "/" + currentMonth + "/" + currentYear
    }; //checking each field in the registration form

    if (details.name.trim() == "") {
      caution("Please input your firstname");
    } else if (details.name1.trim() == "") {
      caution("Please input your second name");
    } else if (details.id.trim() == "" || details.id.length < 6) {
      caution("Id not valid");
    } else if (details.age.trim() == "") {
      caution("Age  invalid");
    } else if (details.county == "") {
      caution("County invalid");
    } else if (details.gender == "Empty") {
      caution("Please select you gender");
    } else if (details.mobile_num.length < 9) {
      caution("Mobile number incomplete");
    } else if (details.mobile_num.startsWith("0")) {
      var new_tel = tel.value.slice(1);
      tel.value = new_tel;
    } else if (details.email == "" || details.email.invalid) {
      caution("Email appears to be irrelevant");
    } else if (details.password == "") {
      caution("Please input your password");
    } else if (details.password.length < 4) {
      caution("Password should contain more than 4 digits eg. (2000 or WRTY)");
    } else if (details.confirm !== details.password) {
      caution("Password not identical");
    } else if (details.sumtest !== c) {
      caution("Arithmetic test incorrect");
    } else if (details.upload == "") {
      caution("Please upload your photo");
    } else {
      start_loading(submit, "Registering", "Register", false, 5);
      var detailsJson = JSON.stringify(details);
      submitRegistrationData(detailsJson, "http://" + location.hostname + "/evoterphp/registration/", "".concat(details.name, ", Please wait for us to handle the data."));
    }
  });
} //this is the function that validates login details


function validate_login_details(voters_id, password, result, send_code, code, submit) {
  send_code.addEventListener("click", function () {
    start_loading(send_code, "Resend in", "Resend the code", true, 60);
    generateRandomCodeLogin(voters_id.value);
    send_code.classList.remove("loading_element");
  });
  submit.addEventListener("click", function () {
    var currentMinutes = new Date().getMinutes();
    var currentHours = new Date().getHours();
    var currentSeconds = new Date().getSeconds();
    var currentMilliseconds = new Date().getMilliseconds();
    var currentDate = new Date().getDate();
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();
    details = {
      election_id: electionID,
      voters_id: voters_id.value,
      password: password.value,
      result: result.value,
      code: code.value,
      time: currentHours + ":" + currentMinutes + ":" + currentSeconds + ":" + currentMilliseconds,
      date: currentDate + "/" + (currentMonth + 1) + "/" + currentYear
    };

    if (details.voters_id.length < 6 || details.voters_id.trim() == "") {
      caution("Voter's id not valid.");
    } else if (details.password.trim() == "") {
      caution("Please provide your password.");
    } else if (details.result !== c) {
      caution("Arithmetic test incorrect.");
    } else if (details.code.trim() == "") {
      caution("The verification code is empty");
    } else {
      start_loading(submit, "Loging in", "Log in", true, 2);
      var detailsJson = JSON.stringify(details);
      submitLoginData(detailsJson, "http://" + window.location.hostname + "/evoterphp/login/", "Welcome back to your account ".concat(details.voters_id, ". Vote a leader of your choice.")); // window.location.href="http://"+window.location.host+"/evoter/vote/";
    }
  });
} //function for displaying the country codes before the telephone inputs


function display_flags(a) {
  fetch("/evoter/json/codes.json", {
    method: "get"
  }).then(function (res) {
    if (!res.ok) {
      console.error("There occured an error while fetching the flags");
    }

    return res.json();
  }).then(function (data) {
    data.countries.map(function (v) {
      var option = document.createElement("option");
      option.innerHTML = v.telephone_code;
      option.title = v.name;
      option.style.color = "black";
      a.append(option);
    });
  });
} //function for fetching the counties


function render_counties(a) {
  fetch("/evoter/json/counties.json", {
    method: "get"
  }).then(function (res) {
    if (!res.ok) {
      console.error("Error retreaving counties");
    }

    return res.json();
  }).then(function (data) {
    var counties_data = data.counties;
    counties_data.sort();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = counties_data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var dat = _step.value;
        a.innerHTML += "<option>".concat(dat, "</option>");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
}

function resetPassword() {
  window.location.href = "http://" + window.location.hostname + "/evoter/login/resetpin";
}

window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
window.addEventListener("dragstart", function (e) {
  e.preventDefault();
});