<?php
header(header: "Access-Control-Allow-Origin:*");
header(header: "Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers:X-Requested-With, Authorization, Content-Type");
header(header: "Access-Control-Max-Age: 86400");
header(header: "Access-Control-Allow-Credentials: 86400");
$dbserverName = "localhost";
$dbuserName = "root";
$dbpassword = "41826900";
$DBName = "evoter";
require "../port.php";
$dbconn = new mysqli(hostname: $dbserverName, username: $dbuserName, password: $dbpassword, database: $DBName, port: $dbport);
if ($_SERVER["REQUEST_METHOD"] == "post") {
    session_start();
    $_SESSION["username"]=$_GET["username"];
  }