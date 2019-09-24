var navBtn = document.querySelector(".nav-button-cont"),
    mobileNavBar = document.querySelector(".inner"),
    menu = document.querySelector("#menu");


function toggleNav(){
    mobileNavBar.classList.toggle("shownav");
    for(i = 0; i < navBtn.children.length; i++){
        navBtn.children[i].classList.toggle("animatebars");
    }
};

function stickMenu(){
    var sticky = menu.offsetTop + menu.clientHeight / 2 ;
    if (window.pageYOffset >= sticky){
        menu.classList.add("sticky");
    }
    else{
        menu.classList.remove("sticky");
    }
};


navBtn.addEventListener("click", toggleNav);
// window.addEventListener("load", displayPage);
window.addEventListener("scroll", stickMenu);
