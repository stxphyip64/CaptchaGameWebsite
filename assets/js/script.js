const chk = document.querySelector(".chk-box");
const pass = document.querySelector(".pass-inpt");
const submit = document.querySelector("");

chk.addEventListener("click", tglclass);
submit.addEventListener("submit", opensketch); 
function tglclass(){
    chk.classList.toggle("active");
    if (pass.type == "password"){
        pass.type = "text"
    }
    else{
        pass.type = "password"
    }
};
function opensketch('sketch.js') {
    window.open('sketch.js', '_blank');
}
