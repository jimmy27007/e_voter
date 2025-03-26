var reset_password_container = document.getElementById("reset_password_container");
var submitter = document.getElementById("submit");
var form = document.getElementById("form");

submitter.onclick = (e) => {
    start_loading(submitter,"Resetting","Processing...",false,3);
    e.preventDefault();
    var formdata = new FormData(form);
    formdata.append("election_id", electionID);
    fetch("http://" + window.location.hostname + "/evoterphp/reset/", {
        method: "POST",
        body: formdata
    }).then(res => {
        if (res.ok) {
            return res.text();
        } else if (!res.ok) {
            caution("Error")
        }
    }).then(data => {
        if (data == "<h1 style='color:green;'>password changed mail sent.</h1><br>") {
            notify("Password changed successfully");
            start_loading(submitter, "Please wait", "Success", true, 7);
            setTimeout(() => {
                window.location.href = "http://" + window.location.host + "/evoter/login/";
            }, 10000);
        }
        else if (data === "<h1 style='color:red;'>password changed mail not sent.</h1><br>") {
            notify("Password was changed successfully but we had a problem veifying it through your email. ");
            start_loading(submitter, "Redirecting in", "Email not sent", true, 7);
            setTimeout(() => {
                window.location.href = "http://" + window.location.host + "/evoter/login/";
            }, 10000);
        } else if (data === "<h1 style='color:black;'>There occured a problem resetting your password. Try again</h1> <br>") {
            caution("There occured a problem resetting your password. Try again");
            window.location.reload();
        }
        else {
            caution(data);
        }
    }).catch((err) => {
        caution(err);
    })

}