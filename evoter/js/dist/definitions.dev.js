"use strict";

var evoter_system_login = document.querySelector(".evoter_system_login");
var evoter_system_registration = document.querySelector(".evoter_system_registration");
var login_link = document.getElementById("login_link");
var register_button = document.getElementById("register_button");
var evoter_registration_form = document.querySelector(".evoter_registration_form");
var evoter_login_form = document.querySelector(".evoter_login_form");
var logo_refresh = document.getElementById("logo_refresh");
var registration_form_arithmetic_test = document.getElementById("registration_form_arithmetic_test");
var login_submit_form = document.getElementById("login_submit_form");
var login_verify_email = document.getElementById("login_verify_email");
var login_send_code = document.getElementById("login_send_code");
var login_sumtest_result = document.getElementById("login_sumtest_result");
var login_password = document.getElementById("login_password");
var login_voters_id = document.getElementById("login_voters_id");
var login_arithmetic_test = document.getElementById("login_arithmetic_test");
var male_gender = document.getElementById("male_gender");
var female_gender = document.getElementById("female_gender");
var other_gender = document.getElementById("other_gender");
var submit_registration_form = document.getElementById("submit_registration_form");
var selected_country = document.getElementById("selected_country");
var register_first_name = document.getElementById("register_first_name");
var register_second_name = document.getElementById("register_second_name");
var register_id_number = document.getElementById("register_id_number");
var register_age = document.getElementById("register_age");
var register_county = document.getElementById("register_county");
var register_telephone = document.getElementById("register_telephone");
var register_email = document.getElementById("register_email");
var register_password = document.getElementById("register_password");
var register_confirm_password = document.getElementById("register_confirm_password");
var register_sum_result = document.getElementById("register_sum_result");
var registration_send_code = document.getElementById("registration_send_code");
var register_verification_code = document.getElementById("register_verification_code");
var inputs_ = document.querySelectorAll("input");
var register_file = document.getElementById("register_file");
var register_img_overview = document.getElementById("register_img_overview");
var uploaded_img_name = document.querySelector(".uploaded_img_name");
var caution_sound = document.getElementById("caution_sound");
var registration_form = document.getElementById("registration_form");
var sys_container = document.getElementById("sys_container"); //////////////////////////////////

var confirm_action_container = document.getElementById("confirm_action_container");
inputs_.forEach(function (v) {
  v.autocomplete = "off";
}); //////////////////////////////////