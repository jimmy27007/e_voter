<?php
header(header: "Access-Control-Allow-Origin:*");
header(header: "Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers:X-Requested-With, Authorization, Content-Type");
header(header: "Access-Control-Max-Age: 86400");
header(header: "Access-Control-Allow-Credentials: 86400");


$data = file_get_contents(filename: "php://input");
$decodedLoginData = json_decode(json: $data);
$votersLoginId = $decodedLoginData->voters_id;
$election_id = $decodedLoginData->election_id;
$loginPassword=$decodedLoginData->password;
$loginCode = $decodedLoginData->code;
$loginTime = $decodedLoginData->time;
$host = "localhost";
$user = "root";
$pin = "41826900";
$db = "evoter";
session_start();
$code_token = strval($_SESSION["login_code"]);
require "../port.php";
$connection = new mysqli(hostname: $host,username: $user,password: $pin,database: $db,port: $dbport);
if ($connection->connect_error) {
    echo "error connecting to the database";
    exit();
}elseif ($loginCode!==$code_token) {
    echo json_encode(value: ["error_state"=>true,"error_type"=>"Verification code incorrect"]);
    exit();
}
$loginSql1 = "SELECT voters_id FROM users_credentials WHERE voters_id='$votersLoginId' AND election_id='$election_id'";
$loginSql2 = "SELECT voters_password FROM users_credentials WHERE voters_id='$votersLoginId' AND election_id='$election_id'";
$loginSelectData = "SELECT voters_id, voters_first_name, voters_second_name, voters_age, voters_gender ,voters_county, voters_profile_photo FROM users_personal_details WHERE voters_id='$votersLoginId' AND election_id='$election_id'";
$result1 = $connection->query(query: $loginSql1);
$result2 = $connection->query(query: $loginSql2);
if ($result1->num_rows==0) {
    echo json_encode(value: ["error_state"=>true,"error_type"=>"id does not exist"]);
    exit();
}else if ($result1->num_rows>0) {
    
    while ($pass=$result2->fetch_assoc()) {
        $pas = $pass['voters_password'];
        if (password_verify(password: $loginPassword,hash: $pas)) {
            $loginSelectDataRes = $connection->query(query: $loginSelectData);
            if ($loginSelectDataRes->num_rows>0) {
                while ($row = $loginSelectDataRes->fetch_assoc()) {
                    $selectedvoters_id = $row["voters_id"];
                    $selectedvoters_first_name = $row["voters_first_name"];
                    $selectedvoters_second_name = $row["voters_second_name"];
                    $selectedvoters_age = $row["voters_age"];
                    $selectedvoters_gender = $row["voters_gender"];
                    $selectedvoters_county = $row["voters_county"];
                    $selectedvoters_profile_photo = $row["voters_profile_photo"];
                        $resJson = ['error_state'=>false,
                        'voters_id'=>$selectedvoters_id,
                        'voters_first_name'=>$selectedvoters_first_name,
                        'voters_second_name'=>$selectedvoters_second_name,
                        'voters_age'=>$selectedvoters_age,
                        'voters_gender'=>$selectedvoters_gender,
                        'voters_county'=>$selectedvoters_county,
                        'voters_profile_photo'=>$selectedvoters_profile_photo];
                        echo json_encode(value: $resJson);
                        $_SESSION["user_data"] = $resJson;
                        
                }
                
            }
        }else if ($loginPassword!==$pas) {
                   echo json_encode(value: ["error_state"=>true,"error_type"=>"password incorrect"]);
            die();
        }
        
    }
}
$connection->close();