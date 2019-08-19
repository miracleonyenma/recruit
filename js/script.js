var sections = document.querySelectorAll(".form-sect"),
    prevBtn = document.querySelector("#prev"),
    nextBtn = document.querySelector("#next"),
    cntwrpr = document.querySelector(".content-wrapper"),
    crntPos,
    pos = 0,
    count = sections.length,
    i = 0,
    displacement;

function resetState(){
    anime({
        targets: sections[0],
        opacity: 1
    })
};

function nextStep(){
    var nextTl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750,
        autoplay: false
    });
    
    nextTl.add({
        targets: '.blinds',
        backgroundColor: "#2771f3"
    });
    nextTl.add({
        targets: '.blinds',
        // translateY: '0px',
        height: 0
    });
    
    if(pos < count - 1 ){
        displacement = sections[pos].clientHeight;

        nextTl.add({
            targets: sections[pos],
            opacity: 0
        }, "-=600");
        nextTl.add({
            targets: '.content-wrapper',
            translateY: -displacement * (pos + 1) + 'px'
        }, "-=600");
        nextTl.add({
            targets: sections[pos + 1],
            opacity: 1
        }, "-=600");
        crntPos = -displacement * (pos + 1);
        pos++;
        console.log(pos);

        nextTl.play();
    }
    else{
        pos = 0;
    }
    crntPos = parseInt(window.getComputedStyle(cntwrpr).transform.split(" ")[5].split(")")[0]);

}

function prevStep(){
    var prevTl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750,
        autoplay: false
    });
    prevTl.add({
        targets: '.blinds',
        backgroundColor: "#2771f3"
    });
    prevTl.add({
        targets: '.blinds',
        height: "100%"
    });
    prevTl.add({
        targets: '.blinds',
        translateY: '100%',
        scaleY: 0
    })

    if(pos > 0){
        displacement = sections[pos].clientHeight;
        pos--;
        console.log(pos);
        prevTl.add({
            targets: '.content-wrapper',
            translateY: crntPos + (displacement) + 'px'
        });
        prevTl.add({
            targets: sections[pos],
            opacity: 1
        });

        prevTl.play();

    }

    else{
        console.log('else' + pos);
    }
}

nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);
window.addEventListener("load", resetState);
