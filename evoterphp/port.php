<?php
header(header: "Access-Control-Allow-Origin:*");
header(header: "Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers:X-Requested-With, Authorization, Content-Type");
header(header: "Access-Control-Max-Age: 86400");
header(header: "Access-Control-Allow-Credentials: 86400");
$dbport = 3306;