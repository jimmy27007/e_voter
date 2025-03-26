
<?php
session_start();
?>



<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EVOTER | login</title>
    <link
      rel="shortcut icon"
      href="/evoter/systemimages/votingico.png"
      type="image/x-icon"
    />
    <link rel="stylesheet" href="/evoter/css/evoter.css" />
    <script src="/evoter/js/functions.js"></script>
  </head>
  <body>
    <script>
      document.body.style.height = window.innerHeight + "px";
    </script>
    <div class="admin_login_container">
      <form id="admin_login_form" action="/evoterphp/login/db.php" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Username" autocomplete="off"/>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password" autocomplete="off"/>
        <input type="submit" value="Login" />
        <span id="error_message"><?php echo $_SESSION["username"];?></span>
      </form>
    </div>
    <style>
      .admin_login_container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.548);
      }
      #admin_login_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 50%;
        background: skyblue;
        width: 50%;
        border-radius: 20px;
      }
    </style>
  </body>
</html>
