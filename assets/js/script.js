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
    var fileToOpen = 'sketches/index.html';
    var windowName = 'CaptchaChallenge';
    var width = 400;
    var height = 300;
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var left = (screenWidth - width) / 2;
    var top = (screenHeight - height) / 2;
    submit.classList.toggle("active");
    var newWindow = window.open('sketches/index.html', 'CaptchaChallenge', 'width=' + width + ', height=' + height + ', left=' + left + ', top=' + top);

    //var newWindow = window.open('sketches/index.html', '_blank');
    if (newWindow) {
        newWindow.focus();
    } else {
        console.log('Pop-up window error');
    }
            
};
