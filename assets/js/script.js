const chk = document.querySelector(".chk-box");
const pass = document.querySelector(".pass-inpt");
const submit = document.querySelector(".submit");

chk.addEventListener("click", tglclass);
submit.addEventListener("click", openFile); 
function tglclass(){
    chk.classList.toggle("active");
    if (pass.type == "password"){
        pass.type = "text"
    }
    else{
        pass.type = "password"
    }
};
function openFile(); {
    submit.classList.toggle("active");
    var newWindow = window.open('sketches/index.html', 'width=400, height=300');
    //var newWindow = window.open('sketches/index.html', '_blank');
    if (newWindow) {
        newWindow.focus();
    } else {
        console.log('Pop-up window error');
    }
            
};
