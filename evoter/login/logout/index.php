<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evoter</title>
</head>
<body>
    <h1>Loading.........Please wait</h1>
    <?php
        session_start();
        if (isset($_SESSION["user_data"])) {
            session_unset();
            session_destroy();
        }
    ?>
    <script>
window.location.href = "http://"+window.location.hostname+"/evoter/login/"
    </script>
</body>
</html>