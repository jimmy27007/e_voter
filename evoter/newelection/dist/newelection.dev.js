"use strict";

var send_verification = document.getElementById("send_election_verification");
var t = 60;

function send_election_verification(admin_id) {
  var _this = this;

  this.disabled = true;
  var c = setInterval(function () {
    t -= 1;
    console.log(t);
    _this.textContent = "Resend in 00:" + t;

    _this.classList.add("loading_element");

    if (t == 0) {
      _this.disabled = false;
      _this.textContent = "Resend the code";
      t = 60;
      clearInterval(c);

      _this.classList.remove("loading_element");
    }
  }, 1000);
}

;
send_verification.addEventListener("click", send_election_verification);
document.body.style.height = window.innerHeight + 'px';
document.body.style.width = window.innerWidth + 'px';
document.getElementById("createElectionBtn").addEventListener("click", createElection);

function createElection() {
  var electionName = document.getElementById("electionName").value;
  var description = document.getElementById("description").value;
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var admin_id = document.getElementById("admin_id").value;
  var election_verification = document.getElementById("election_verification").value;
  var send_election_verification = document.getElementById("send_election_verification");
  var create_election_btn = document.getElementById("create_election_btn");
  this.disabled = true;
  this.textContent = "Creating a new election...";
  this.classList.add("loading_element");

  if (!electionName || !description || !startDate || !endDate) {
    return 0;
  }

  var electionData = {
    electionName: electionName,
    description: description,
    startDate: startDate,
    endDate: endDate
  };
  fetch("https://example.com/api/create-election", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(electionData)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return alert("Election created successfully!");
  })["catch"](function (error) {
    return alert("Error creating election: " + error.message);
  });
}

function create_election(name, description, startdate, enddate, admin_id, code, sendcode_btn, create_btn) {
  var details = {
    name: name.value,
    description: description.value,
    startdate: startdate.value,
    enddate: enddate.value,
    admin_id: admin_id.value,
    code: code.value
  };
  sendcode_btn.addEventListener("click", send_election_verification(details.admin_id));
  create_btn.addEventListener("click", function () {});
}