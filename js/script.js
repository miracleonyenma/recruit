var sections = document.querySelectorAll(".form-sect"),
    nextBtn = document.querySelector("#next"),
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
            translateY: -displacement + 'px'
        }, "-=600");
        nextTl.add({
            targets: sections[pos + 1],
            opacity: 1
        }, "-=600");
        pos++;
        console.log(pos);

        nextTl.play();
    }
    else{
        pos = 0;
    }

}

nextBtn.addEventListener("click", nextStep);

window.addEventListener("load", resetState);
