<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EVOTER | Registration</title>
  <link rel="shortcut icon" href="/evoter/systemimages/votingico.png" type="image/x-icon" />
  <link rel="stylesheet" href="/evoter/css/evoter.css" />
  <script src="/evoter/js/functions.js"></script>
</head>

<body>
  <div class="evoter_system_registration animatable">
    <div class="evoter_title">
      <img src="/evoter/systemimages/votingico.png" />
      <span class="title">Evoter</span>
    </div>
    <div class="evoter_registration_form">
      <span class="r_t">Register to evoter</span>
      <div class="registration_form" id="registration_form">
        <input type="text" placeholder="First name" id="register_first_name" name="register_first_name" />
        <input type="text" placeholder="Second name" id="register_second_name" />
        <input type="number" placeholder="Id number" id="register_id_number" />
        <label for="register_age"><u>Date of birth</u></label><input type="date" placeholder="Age" id="register_age" />
        <select name="register_county" id="register_county"></select>
        <div class="gender_container">
          <label for="male_gender">Male:</label>
          <input type="radio" name="gender" id="male_gender" />
          <label for="female_gender">Female: </label><input type="radio" name="gender" id="female_gender" />
          <label for="other_gender">Other: </label><input type="radio" name="gender" id="other_gender" />
        </div>
        <div class="register_telephone_container">
          <select name="selected_country" id="selected_country"></select>
          <input type="tel" id="register_telephone" placeholder="Telephone" />
        </div>
        <input type="email" id="register_email" placeholder="Email adress" />
        <input type="password" id="register_password" placeholder="Enter password" />
        <input type="password" id="register_confirm_password" placeholder="Confirm password" />
        <div class="login_sumtest">
          <span id="registration_form_arithmetic_test"></span>
          <input type="text" placeholder="Result" id="register_sum_result" />
        </div>
        <button class="registration_send_code" id="registration_send_code">
          Send code
        </button>
        <input type="text" placeholder="Verification code" id="register_verification_code" />
        <div class="upload_cont">
          <input type="file" multiple id="register_file" /><label for="register_file">Upload passport photo</label>
          <div class="uploadede_img_container">
            <img src="/evoter/systemimages/votingico.png" id="register_img_overview" />
          </div>
        </div>
        <span class="uploaded_img_name"></span>
        <button id="submit_registration_form">Register</button>
        Already registered?<button id="login_link">Login</button>
      </div>
    </div>
  </div>
  <!-- <div class="caution_container">
        <div class="caution">
            <span>&#9888;</span>Alert this is a caution ffsf w w2wf2ws2  s22 fss2 t rsfswssrss <button>Close</button>
        </div>
    </div> -->

  <script src="/evoter/js/definitions.js"></script>
  <script src="/evoter/js/registration.js"></script>
</body>

</html>