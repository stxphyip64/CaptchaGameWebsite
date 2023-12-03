const chk = document.querySelector(".chk-box");
const pass = document.querySelector(".pass-inpt");
const submit = document.querySelector(".submit");

chk.addEventListener("click", tglclass);
submit.addEventListener("submit", openFile); 
function tglclass(){
    chk.classList.toggle("active");
    if (pass.type == "password"){
        pass.type = "text"
    }
    else{
        pass.type = "password"
    }
};
function openFile('sketch.js') {
    submit.classList.toggle("active");
    window.open('sketch.js', '_blank');
};
