<?php
header(header: "Access-Control-Allow-Origin:*");
header(header: "Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers:X-Requested-With, Authorization, Content-Type");
header(header: "Access-Control-Max-Age: 86400");
header(header: "Access-Control-Allow-Credentials: 86400");

session_start();

$receivedData = file_get_contents(filename: "php://input");
$decodedReceivedData = json_decode(json: $receivedData);
$votersFirstName = $decodedReceivedData->name;
$votersSecondName = $decodedReceivedData->name1;
$votersId = $decodedReceivedData->id;
$votersAge = date(format: "Y") - substr(string: $decodedReceivedData->age, offset: 0, length: 4);
if ($votersAge < 18) {
    echo "<h1 style='color:red;'>You are below 18 years of age and you are not allowed to vote</h1>";
    die();
}
$election_id = $decodedReceivedData->election_id;
$votersCounty = $decodedReceivedData->county;
$votersGender = $decodedReceivedData->gender;
$votersCountryCode = $decodedReceivedData->country_code;
$votersMobileNumber = $decodedReceivedData->mobile_num;
$votersTel = $decodedReceivedData->tel;
$votersEmail = $decodedReceivedData->email;
$votersPassword = password_hash(password: $decodedReceivedData->password,algo: PASSWORD_DEFAULT);
$votersConfirmPassword =$decodedReceivedData->confirm;
$votersSumtest = $decodedReceivedData->sumtest;
$votersVerifyCode = $decodedReceivedData->code;
$votersFileName = $decodedReceivedData->file_name;
$votersImageData = $decodedReceivedData->image_data;
$votersDecodedImageData = base64_decode(string: $votersImageData);
$votersImageType = $decodedReceivedData->image_type;
$votersRegisteredTime = $decodedReceivedData->time;
$votersRegisteredDate = $decodedReceivedData->date;
$serverName = "localhost";
$userName = "root";
$password = "41826900";
$dbName = "evoter";
if ($votersVerifyCode!== $_SESSION['reg_code']) {
    echo "<h1 style='color:red;'>The verification code is incorrect.</h1>";
    die();
}
require "../port.php";
$conn = new mysqli(hostname: $serverName, username: $userName, password: $password, database: $dbName, port: $dbport);


$sqlSelect1 = "SELECT voters_id FROM users_credentials WHERE voters_id='$votersId' AND election_id='$election_id'";
$sqlSelect2 = "SELECT voters_telephone FROM users_credentials WHERE voters_telephone='$votersTel' AND election_id ='$election_id'";
$sqlSelect3 = "SELECT voters_id FROM users_personal_details WHERE voters_id='$votersId' AND election_id='$election_id'";
$res1 = $conn->query(query: $sqlSelect1);
$res2 = $conn->query(query: $sqlSelect2);
$res3 = $conn->query(query: $sqlSelect3);
if ($res1->num_rows > 0) {
    echo "<h1 style='color:red;'>The Voter's id already exists in our records.<br>Please enter a unique id or click login to sign in to your account</h1> ";
    die();
} else if ($res2->num_rows > 0) {
    echo "<h1 style='color:red;'>The telephone number already exists.<br>Please enter a unique telephone or click login to sign in to your account</h1>";
    die();
} else if ($res3->num_rows > 0) {
    echo "<h1 style='color:red;'>The Voter's id already exists in our records.<br>Please enter a unique id or click login to sign in to your account</h1> ";
    die();
} else if ($res1->num_rows > 0 && $res2->num_rows > 0) {
    echo "The voter's id and telephone number already exists in the records.<br>Please enter a unique id or click login to sign in to your account";
    die();
} else {
    $fileRename = "evoter" . date(format: 'YmdHis') . "_" . uniqid();
    $fileExtension = '';
    switch ($votersImageType) {
        case 'data:image/jpeg;base64':
            $fileExtension = ".jpg";
            break;
        case 'data:image/png;base64':
            $fileExtension = ".png";
            break;
        case 'data:image/gif;base64':
            $fileExtension = ".gif";
            break;
        case 'data:image/x-icon;base64':
            $fileExtension = '.ico';
            break;
        default:
            echo json_encode(value: ["error" => "true", "parameters" => "fyle type unsupported"]);
            exit();
    }

    $filePathToSaveToDb = $fileRename . $fileExtension;
    $sql1 = "INSERT INTO users_personal_details(voters_id,voters_first_name,voters_second_name,voters_age,voters_gender,voters_county,voters_profile_photo,election_id)
values('$votersId','$votersFirstName','$votersSecondName','$votersAge','$votersGender','$votersCounty','$filePathToSaveToDb', '$election_id')";
    $sql2 = "INSERT INTO users_credentials(voters_telephone,voters_password,voters_email,voters_id,election_id)
VALUES('$votersTel','$votersPassword','$votersEmail','$votersId','$election_id')";
    $uploadDirectory = "profiles/";
    if (!is_dir(filename: $uploadDirectory)) {
        mkdir(directory: $uploadDirectory, permissions: 0755, recursive: true);
    };
    $filePath = $uploadDirectory . basename(path: $fileRename) . $fileExtension;
    if ($conn->connect_error) {
        exit();
    } else {
        if (file_put_contents(filename: $filePath, data: $votersDecodedImageData) && $conn->query(query: $sql1) === true && $conn->query(query: $sql2) === true) {

            echo "<h1 style='color:green;'>All the data saved succesfully</h1><br>";
        } else {
            echo json_encode(value: ["error" => "true", "parameters" => "content not saved"]);
            exit();
        }
    }
    echo "The data is unique";
    $conn->close();
    exit();
}
