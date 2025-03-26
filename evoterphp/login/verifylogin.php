<?php
header(header: "Access-Control-Allow-Origin:*");
header(header: "Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers:X-Requested-With, Authorization, Content-Type");
header(header: "Access-Control-Max-Age: 86400");
header(header: "Access-Control-Allow-Credentials: 86400");
include("../login/db.php");
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login_id = $_POST["login_id"];
    $election_id = $_POST["election_id"];
    $login_code =random_int(min: 100000,max: 999999);
    $_SESSION["login_code"] = $login_code;
    
    require_once "../evoter/headers.php";
    $message = "<html>
                        <head>
                            <meta charset='UTF-8'>
                            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                            <title>Evoter</title>
                        </head>
                        <body style='align-items:center; display:flex; justify-content:center; flex-direction: column;'>
                            <h1 style='color:green;'>Welcome back to evoter.</h1><br>
                            <h1>Your verification code is $login_code<br> </h1><br>
                                <img src='https://democracy-technologies.org/wp-content/uploads/2024/05/Online-Voting-1024x574.png'>
                        </body>
                </html>";
    $loginSql3 = "SELECT voters_email FROM users_credentials WHERE voters_id='$login_id' AND election_id='$election_id'";
    $result3 = $dbconn->query(query: $loginSql3);
    if ($result3->num_rows == 0) {
        echo json_encode(value: ["error_state" => true, "error_type" => "error fetching email"]);
        exit();
    } else {
        $selectedvoters_email;
        while ($email = $result3->fetch_assoc()) {
            $selectedvoters_email = $email["voters_email"];
        }
        if (mail(to: $selectedvoters_email, subject: "User logged in successfully", message: $message, additional_headers: $headers)) {
            echo json_encode(value: ['status' => 'email_sent', 'message' =>"$selectedvoters_email"]);
        } else {
            echo json_encode(value: ['status' => 'email_not_sent', 'message' =>"error_sending_email"]);
        }
    }
}
