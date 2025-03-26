

const send_verification = document.getElementById("send_election_verification");

var t = 60;
function send_election_verification(admin_id) {
    this.disabled=true;
    let c=setInterval(() => {
        t-=1;
        console.log(t);
    this.textContent = "Resend in 00:" + t;
    this.classList.add("loading_element");
    if(t==0){
        this.disabled = false;
        this.textContent = "Resend the code";
        t = 60;
        clearInterval(c);
        this.classList.remove("loading_element");
    }
    }, 1000);
};
send_verification.addEventListener("click", send_election_verification);
document.body.style.height = window.innerHeight + 'px';
document.body.style.width = window.innerWidth + 'px';
document.getElementById("createElectionBtn").addEventListener("click", createElection);

function createElection() {
    const electionName = document.getElementById("electionName").value;
    const description = document.getElementById("description").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const admin_id = document.getElementById("admin_id").value;
    const election_verification = document.getElementById("election_verification").value;
    const send_election_verification = document.getElementById("send_election_verification");
    const create_election_btn = document.getElementById("create_election_btn");
    this.disabled = true;
    this.textContent = "Creating a new election..."
    this.classList.add("loading_element");
    if (!electionName || !description || !startDate || !endDate) {
        return 0;
    }

    const electionData = {
        electionName,
        description,
        startDate,
        endDate
    };

    fetch("https://example.com/api/create-election", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(electionData)
    })
    .then(response => response.json())
    .then(data => alert("Election created successfully!"))
    .catch(error => alert("Error creating election: " + error.message));
}
function create_election(name,description,startdate,enddate,admin_id,code,sendcode_btn,create_btn){
    const details = {
        name:name.value,
        description:description.value,
        startdate:startdate.value,
        enddate:enddate.value,
        admin_id:admin_id.value,
        code:code.value
    }
    sendcode_btn.addEventListener("click",send_election_verification(details.admin_id));
    create_btn.addEventListener("click",()=>{
        
    })
}