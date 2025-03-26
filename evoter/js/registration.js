login_link.onclick = () => {
  login_page();
};
generate_rand_math(registration_form_arithmetic_test);
upload_photo(register_file, register_img_overview, uploaded_img_name);
validate_registration_details(
  register_first_name,
  register_second_name,
  register_id_number,
  register_age,
  register_county,
  male_gender,
  female_gender,
  other_gender,
  selected_country,
  register_telephone,
  register_email,
  register_password,
  register_confirm_password,
  register_sum_result,
  registration_send_code,
  register_verification_code,
  submit_registration_form,
  uploaded_img_name
);
display_flags(selected_country);

// document.addEventListener('DOMContentLoaded',()=>{
//     notify("Welcome to the largest online voting platform. Feel free to register or if you already have an account you can continue to and click sign in. Registration is free and report anyone who tries to ask for fee.")
// });
render_counties(register_county);
evoter_system_registration.style.height = window.innerHeight + "px";
