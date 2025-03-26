document.body.style.height=window.innerHeight+"px";
const voting_interface = document.getElementById("voting_interface");
const voting_menubar = document.getElementById("voting_menubar");
function displaySideMenu() {
    voting_menubar.style.display="flex";
    voting_interface.style.opacity="0.3"
}
function hideSideMenu() {
    voting_menubar.style.display="none";
    voting_interface.style.opacity="1"
}
var voting_popup_container = document.getElementById("voting_popup_container");
var voters_name_credential = document.getElementById("voters_name_credential");
var voters_id_credential = document.getElementById("voters_id_credential");
var interface_button = document.querySelectorAll(".interface_button");
interface_button.forEach((element)=>{
    element.addEventListener("click",()=>{
        voting_popup_container.style.display="flex";
    })
})
function closePopup(){
    voting_popup_container.style.display="none";
}

var aspirant_details = document.querySelectorAll('.aspirant_details');
var selected=false;
function resetVote() {
    aspirant_details.forEach((el)=>{
        el.classList.remove("selected_element")
    });
}
aspirant_details.forEach((element,index)=>{
    
    element.addEventListener("click",()=>{
        if (!selected) {
            selected=true;
            element.classList.add("selected_element");
        }else{
            resetVote();
            element.classList.add("selected_element");
            selected=true;
        }
       
    })
})