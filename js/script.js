var sections = document.querySelectorAll(".sect-wrapper"),
    submitBtn = document.querySelector("#submit-btn"),
    prevBtn = document.querySelector("#prev"),
    nextBtn = document.querySelector("#next"),
    cntwrpr = document.querySelector(".content-wrapper"),
    form = document.querySelector("#form"),
    indicator_cont = document.querySelector("#sect-ind"),
    styles = document.documentElement.style, 
    // submitTl = submitTl2 = anime.timeline({
    //     targets: '.controls-cont.submit',
    //     easing: 'easeOutExpo',
    //     duration: 800,
    //     autoplay: false
    // }),
    formHeight,
    crntPos,
    pos = 0,
    count = sections.length,
    i = 0,
    displacement,
    obj = [];

function getSetContHeight(){
    formHeight = window.getComputedStyle(form).height;
    styles.setProperty("--h", formHeight);
}


function resetState(){
    anime({
        targets: sections[0].children[0],
        opacity: 1
    });

    getSetContHeight();
};

function setIndicators(){
    indicator_cont.innerHTML = "";
    for(i = 0; i < sections.length; i++){
        var indicator = document.createElement("div");
        indicator_cont.appendChild(indicator);
        indicator_cont.children[i].setAttribute("id", "i"+i);
        indicator_cont.children[i].setAttribute("class", "indicator");
    
    };
    console.log("hey");
};

function nextStep(){

    var nextTl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800,
        autoplay: false
    });
    
    // nextTl.add({
    //     targets: '.blinds',
    //     backgroundColor: "#2771f3"
    // });
    // nextTl.add({
    //     targets: '.blinds',
    //     // translateY: '0px',
    //     height: 0
    // });
    
    if(pos < count - 1 ){
        displacement = sections[pos + 1].clientHeight;

        nextTl.add({
            targets: '.content-wrapper',
            translateY: -displacement * (pos + 1) + 'px'
        });
        nextTl.add({
            targets: sections[pos].children[0],
            opacity: 0
        }, "-=800");
        nextTl.add({
            targets: sections[pos + 1].children[0],
            opacity: 1
        }, "-=400");
        crntPos = -displacement * (pos + 1);
        pos++;
        console.log(pos);

        nextTl.play();
    }
    else{
        // pos = 0;
    }

    if(pos == sections.length - 1){
        anime({
            targets: '.controls-cont.submit',
            easing: 'easeOutExpo',
            opacity: 1,
            duration: 800,
                top: "80%"
        });
    }
}

function prevStep(){
    var prevTl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800,
        autoplay: false
    });
    // prevTl.add({
    //     targets: '.blinds',
    //     backgroundColor: "#2771f3"
    // });
    // prevTl.add({
    //     targets: '.blinds',
    //     height: "100%"
    // });
    // prevTl.add({
    //     targets: '.blinds',
    //     translateY: '100%',
    //     scaleY: 0
    // })

    if(pos > 0){
        //disable futher clicks
        prevBtn.disabled = true;

        displacement = sections[pos].clientHeight;
        prevTl.add({
            targets: '.content-wrapper',
            translateY: crntPos + (displacement) + 'px'
        });
        prevTl.add({
            targets: sections[pos - 1].children[0],
            opacity: 1
        }, "-=400");
        prevTl.add({
            targets: sections[pos].children[0],
            opacity: 0
        },"-=700");
        cntwrpr.addEventListener("transitionend", function(){
        prevBtn.disabled = false;
        });
        prevTl.play();
        pos--;
        console.log(pos);

    }

    else{
        console.log('else' + pos);
    }

    if(pos < sections.length - 1){
        anime({
            targets: '.controls-cont.submit',
            easing: 'easeOutExpo',
            duration: 800,
            opacity: 0,
            top: "100%"
        });
    };
};

function submitAction(){
    
};

nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);
submitBtn.addEventListener("click", submitAction);
window.addEventListener("load", resetState);
window.addEventListener("load", setIndicators);
cntwrpr.addEventListener("transitionend", function(){
    crntPos = parseInt(window.getComputedStyle(cntwrpr).transform.split(" ")[5].split(")")[0]);
    //     anime({
    //     delay: 750,
    //     targets: '.blinds',
    //     opacity: 0,
    //     scaleY: 1,
    //     translateY: 0
    // });
});