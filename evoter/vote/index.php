<?php
header(header: "Access-Control-Allow-Origin:*");
header(header: "Access-Control-Allow-Methods:PUT, GET, POST, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers:X-Requested-With, Authorization, Content-Type");
header(header: "Access-Control-Max-Age: 86400");
header(header: "Access-Control-Allow-Credentials: 86400");
session_start();
if (isset($_SESSION["user_data"])) {
} else {
    header("Location: http://" . $_SERVER['SERVER_ADDR'] . "/evoter/login/");
    header("Access-Control-Allow-Origin:*");
    exit();
}
$user_data = $_SESSION["user_data"];
?>

<?php
require "../vote/votedb.php";
$select_aspirant_sql = "SELECT * FROM aspirants_details WHERE aspirant_county = '$user_data[voters_county]' AND aspirant_position = 'president'";
$select_aspirant_result = $__conn->query(query: $select_aspirant_sql);
$result_json = [];
if ($select_aspirant_result->num_rows > 0) {
    while ($f = $select_aspirant_result->fetch_assoc()) {
        $result_json[] = $f;
    }
} else {
    echo "<h1>No aspirants available in your county<a href='/evoter/login/logout/index.php'>Exit</a></h1>";
    exit();
}
$_SESSION["aspirant_data"] = $result_json;
$aspirant_data = $_SESSION["aspirant_data"];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="/evoter/systemimages/votingico.png" type="image/x-icon" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/evoter/systemimages/votingico.png" type="image/x-icon">
    <link rel="stylesheet" href="/evoter/vote/vote.css">
    <link rel="stylesheet" href="/evoter/vote/popup.css">
    <script src="/evoter/js/functions.js"></script>
    <title>Vote</title>
</head>

<body>
    <div class="voting_container" id="voting_container">
        <div class="voting_title_bar" id="voting_titlebar">
            <div class="voting_logo" id="voting_logo">
                <img src="/evoter/systemimages/votingico.png" title="Click to open the side menu."
                    onclick="displaySideMenu()">
            </div>
            <div class="voters_name" id="voters_name">
                Voters Name: <p class="voter_credential" id="voters_name_credential">
                    <?php echo $user_data["voters_first_name"] . " " . $user_data["voters_second_name"] ?></p>
            </div><br>
            <div class="voters_id" id="voters_id">
                Voters Id: <p class="voter_credential" id="voters_id_credential"><?php echo $user_data["voters_id"] ?>
                </p>
            </div><br>
            <div class="voters_profile" id="voters_profile">
                <img title="Accounts" id="voters_profile_photo">
            </div>
        </div>
        <div class="voting_menubar" id="voting_menubar">
            <button title="Close" onclick="hideSideMenu()">❌</button>
            <ul class="menu_list_container">
                <li class="menu_element">Update details</li>
                <li class="menu_element">Voting Guide</li>
                <a class="menu_element logout" href="/evoter/login/logout/index.php">Log Out</a>
                <li class="menu_element">Report an issue</li>
                <li class="menu_element">Help</li>
                <li class="menu_element" onclick="window.location.reload()">Reload</li>
            </ul>
        </div>
        <div class="voting_interface" id="voting_interface" onclick="hideSideMenu()">
            <button class="interface_button">President <h1><?php echo "Kenya"; ?></h1></button>
            <button class="interface_button">Senator<h1><?php echo $user_data["voters_county"] ?></h1></button>
            <button class="interface_button">Governor <h1><?php echo $user_data["voters_county"] ?></h1></button>
            <button class="interface_button">Women rep<h1><?php echo $user_data["voters_county"] ?></h1></button>
            <button class="interface_button">Member of parliament<h1><?php echo $user_data["voters_county"] ?></h1>
            </button>
            <button class="interface_button">Member of county assembly<h1><?php echo $user_data["voters_county"] ?></h1>
            </button>
            <button class="interface_button">Clear</button>
            <button class="interface_button">Vote</button>
            <button class="interface_button">Submit</button>
        </div>
        <div class="voting_footer" id="voting_footer" onclick="hideSideMenu()">
            <p>For any enquiries, please <a href="/evoter/index.html">Click here</a></p>
            <p>&copy Evoter system.</p>
        </div>
    </div>
    <script>
        var voters_profile_photo = document.getElementById("voters_profile_photo");

        voters_profile_photo.src = "http://" + window.location.hostname +
            "/evoterphp/registration/profiles/<?php echo $user_data["voters_profile_photo"]; ?>"
    </script>
    <!-- /////////////////////////////////////////////////////////// -->
    <div class="voting_popup_container" id="voting_popup_container">
        <div class="voting_popup">
            <div class="voting_popup_title">
                <h1>Vote a candidate of your choice.</h1>
            </div>
            <div class="voting_popup_content">
                <form>
                    <div class="aspirant_details">
                        <label for="aspirant_radio">Select</label>
                        <input type="radio" name="aspirant_radio" id="aspirant_radio" class="aspirant_radio">
                        <img src="/evoterphp/registration/profiles/<?php echo $aspirant_data[0]["aspirant_profile_photo"]; ?>"
                            class="candidate_image">
                        <span
                            id="aspirant_name"><?php echo $aspirant_data[0]["aspirant_first_name"] . " " . $aspirant_data[0]["aspirant_middle_name"] . " " . $aspirant_data[0]["aspirant_sur_name"]; ?></span>
                        </p>
                    </div>
                    <div class="aspirant_details">
                        <label for="aspirant_radio">Select</label>
                        <input type="radio" name="aspirant_radio" id="aspirant_radio" class="aspirant_radio">
                        <img src="/evoterphp/registration/profiles/<?php echo $aspirant_data[1]["aspirant_profile_photo"]; ?>"
                            class="candidate_image">
                        <span
                            id="aspirant_name"><?php echo $aspirant_data[1]["aspirant_first_name"] . " " . $aspirant_data[1]["aspirant_middle_name"] . " " . $aspirant_data[1]["aspirant_sur_name"]; ?></span>
                        </p>
                    </div>
                    <div class="aspirant_details">
                        <label for="aspirant_radio">Select</label>
                        <input type="radio" name="aspirant_radio" id="aspirant_radio" class="aspirant_radio">
                        <img src="/evoterphp/registration/profiles/<?php echo $aspirant_data[2]["aspirant_profile_photo"]; ?>"
                            class="candidate_image">
                        <span
                            id="aspirant_name"><?php echo $aspirant_data[2]["aspirant_first_name"] . " " . $aspirant_data[2]["aspirant_middle_name"] . " " . $aspirant_data[2]["aspirant_sur_name"]; ?></span>
                        </p>
                    </div>
                    <div class="aspirant_details">
                        <label for="aspirant_radio">Select</label>
                        <input type="radio" name="aspirant_radio" id="aspirant_radio" class="aspirant_radio">
                        <img src="/evoterphp/registration/profiles/<?php echo $aspirant_data[3]["aspirant_profile_photo"]; ?>"
                            class="candidate_image">
                        <span
                            id="aspirant_name"><?php echo $aspirant_data[3]["aspirant_first_name"] . " " . $aspirant_data[3]["aspirant_middle_name"] . " " . $aspirant_data[3]["aspirant_sur_name"]; ?></span>
                        </p>
                    </div>
                </form>
            </div>
            <div class="voting_popup_buttons">
                <button class="voting_popup_button yes" id="voting_popup_button_yes" onclick="confirmVote()">Vote
                    candidate</button>
                <button class="voting_popup_button re_set" id="voting_popup_button_reset"
                    onclick="resetVote()">Reset</button>
                <button class="voting_popup_button no" id="voting_popup_button_no"
                    onclick="closePopup()">Cancel</button>
            </div>
        </div>
    </div>
    <!-- ////////////////////////////////////////////////////////////////////////////////// -->
    <script src="/evoter/vote/vote.js"></script>

</body>

</html>