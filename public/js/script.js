//important note to self
//yes you miracle!
//next time youre doing something like this
//consider making the buttons increasing or reducing the position by incrementing or decrementing -bad english-
//the value of `pos` and running a function that changes the position according to the value of `pos`
//same thing for your indicators
// $(document).ready(function(){
//     $('#submit-btn').on('click', function(e){
//         console.log("heyheyhey");
//         $.ajax({
//             type: 'POST',
//             url: '/recruits',
//             headers : {
//             'Content-Type' : 'application/json'
//             },
//             data :  JSON.stringify(obj),
//             success: function(response){
//                 alert('sending'); 
//                 window.location.href = '/recruits';
//             },
//             error: function(err){
//                 console.log(err);
//             }
//         });
//     });
// });

var sections = document.querySelectorAll(".sect-wrapper"),
    submitBtn = document.querySelector("#submit-btn"),
    prevBtn = document.querySelector("#prev"),
    nextBtn = document.querySelector("#next"),
    cntwrpr = document.querySelector(".content-wrapper"),
    form = document.querySelector("#form"),
    inputs = document.querySelectorAll("input"),
    dept_options = document.querySelectorAll(".dept-options input"),
    indicator_cont = document.querySelector("#sect-ind"),
    allBtns = document.querySelectorAll("button"),
    styles = document.documentElement.style, 
    // submitTl = submitTl2 = anime.timeline({
    //     targets: '.controls-cont.submit',
    //     easing: 'easeOutExpo',
    //     duration: 800,
    //     autoplay: false
    // }),
    toPosition,
    indTl,
    formHeight,
    crntPos,
    pos = 0,
    count = sections.length,
    displacement,
    x,
    checked = [],
    err = null,
    obj = [];

var loaderCont = document.querySelector("div#loader-cont"),
    boxCont = document.querySelector(".loader.center"),
    effectEl = document.querySelector(".effect-element");

var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 650,
    delay: 500
});

function displayPage(){
    // tl.add({
    //     targets: effectEl,
    //     scale: 1,
    //     translateX: "-50%",
    //     translateY: "-50%",
    // });
    tl.add({
        targets: loaderCont,
        background: 'rgba(255,255,255, 0)'
    },"-=100");
    tl.add({
        targets: loaderCont,
        scale: 0,
    });
    // tl.add({
    //     targets: boxCont,
    //     scale: 2
    //     // begin: function(){
    //     //     boxCont.style.display = "none";
    //     // }
    // });
    tl.add({
        targets: loaderCont,
        scale: 1
    });
    tl.add({
        targets: loaderCont,
        opacity: 0
    }, "-=1000");
    tl.add({
        targets: loaderCont,
        begin: function(){
        loaderCont.style.display = "none";    
        }
    },"-=200");

}

function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPos = target.getBoundingClientRect().top;
    var startPos = window.pageYOffset;
    var distance = targetPos - startPos;
    var startTime = null;

    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
    } 

    requestAnimationFrame(animation);

    console.log(distance);
}

smoothScroll("#form", 1000);
    
function getSetContHeight(){
    formHeight = window.getComputedStyle(form).height;
    styles.setProperty("--h", formHeight);
}


function resetState(){
    anime({
        targets: sections[0].children[0],
        easing: 'easeOutExpo',
        duration: 800,
        opacity: 1
    });
    //
    getSetContHeight();
};

// function mediaQuery(x){
//     if (x.matches){
//         getSetContHeight();
//     }
//     else{
//         getSetContHeight();
//     }
// }

// x = window.matchMedia("(max-width: 600px)");

// mediaQuery(x);
// x.addEventListener(mediaQuery);

function setIndicators(){
    for(let i = 0; i < sections.length; i++){
        var indicator = document.createElement("button");
        indicator_cont.appendChild(indicator);
        indicator_cont.children[i].setAttribute("id", "i"+i);
        indicator_cont.children[i].setAttribute("class", "indicator");
        indicator_cont.children[i].setAttribute("type", "button");
    };
    //set the first indicator to active
    anime({
        easing: 'easeOutExpo',
        duration: 800,
        targets: indicator_cont.children[pos],
        opacity: 0.5
    });    
};

function indicators(){

    for( let i = 0; i < sections.length + 1; i++){
        indicator_cont.children[i].addEventListener("click", function(){
            toPosition = -sections[i].clientHeight * i;
            pos = i;
            console.log(pos);
            // styles.setProperty("--pos", toPosition + 'px');
            // sections[i].children[0].style.opacity = 1;
            console.log(toPosition);
            var indAnim =  anime.timeline({
                easing: 'easeOutExpo',
                duration: 350,
                autoplay: false
            });
            //reset indicators to default
            indAnim.add({
                targets: indicator_cont.children,
                opacity: 0.1
            });
            indAnim.add({
                targets: '.content-wrapper',
                translateY: toPosition + "px"
            });
            indAnim.add({
                targets: sections[i].children[0],
                opacity: 1
            });
            if(sections[i - 1] >= 0){
                indAnim.add({
                    targets: sections[i - 1].children[0],
                    opacity: 0
                });    
            }

            else if(sections[i + 1] <= sections.length){
                indAnim.add({
                    targets: sections[i + 1].children[0],
                    opacity: 0
                });
            }

            indAnim.play();
            console.log("now " + toPosition);
            indicate();
            hideSubmitBtn();
        });
    };  
};

function indicate(){
    for(crntCount = 0; crntCount < indicator_cont.children.length; crntCount++){
        indicator_cont.children[crntCount].style.opacity = 0.1;
    };
    indicator_cont.children[pos].style.opacity = 0.5;
    if(pos == sections.length - 1){
        nextBtn.style.opacity = 0;
        prevBtn.style.opacity = 1;
    }
    else if(pos == 0){
        prevBtn.style.opacity = 0;
        nextBtn.style.opacity = 1;
    }
    else{
        nextBtn.style.opacity = 1;
        prevBtn.style.opacity = 1;
    }
    console.log("indicator() called")
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

    // if(pos == sections.length - 1){
    //     anime({
    //         targets: '.controls-cont.submit',
    //         easing: 'easeOutExpo',
    //         opacity: 1,
    //         duration: 800,
    //             top: "80%"
    //     });
    // }
    hideSubmitBtn();
    indicate();
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
    hideSubmitBtn();
    indicate();
};

function hideSubmitBtn(){
    if(pos < sections.length - 1){
        anime({
            targets: '.controls-cont.submit',
            easing: 'easeOutExpo',
            duration: 800,
            opacity: 0,
            top: "100%"
        });
    } else{
        anime({
            targets: '.controls-cont.submit',
            easing: 'easeOutExpo',
            duration: 800,
            opacity: 1,
            top: "80%"
        });

    }  
};


// function saveInput(e){
//     if(e.type === 'keypress'){
//         // console.log(e.target.getAttribute('id'));
//         if(e.keycode == 13 || e.keyCode == 9 ){
//             localStorage.setItem(e.target.getAttribute('id'), e.target.value);
//             pos++;
//             console.log("key pressed" + pos);
//             return false        
//         }
//     } else{
//         localStorage.setItem(e.target.getAttribute('id'), e.target.value);
//         console.log("blur pressed");
//     }
// }

// function getInput(){
//     for(iCount = 0; iCount < inputs.length; iCount++){
//         if(localStorage.getItem(inputs[iCount].getAttribute('id')) === null){
//             inputs[iCount].value = null;
//         }else{
//             inputs[iCount].value = localStorage.getItem(inputs[iCount].getAttribute('id'));
//         }
//     };
// }

function checkLimiter(){
    var max = 1;
    // for(x=0; x<dept_options.length; x++){
        // checked[x] = dept_options[x].checked;
        // if(dept_options:checked == true)
    // };
};

var obj = {},
    textObj = {},
    radioObj = {},
    textElements = form.querySelectorAll("input[type='text']"),
    radioElements = form.querySelectorAll("input[type='radio']"),
    elements = form.querySelectorAll("input[type='text'], input[type='radio']"),
    element,
    textName,
    textValue,
    radioName,
    radioValue,
    name,
    req = {},
    value;

function submitAction(){
    for( var i = 0; i < elements.length; ++i ) {
        textElement = textElements[i];
        textName = textElement.id;
        textValue = textElement.value;
        radioElement = radioElements[i];
        if(radioElements[i].checked == true){
            radioName = radioElement.id;
            radioValue = radioElement.value;    

            if(radioName){
                radioObj[radioName] = radioValue;
            }
        }
        if(textName){
            textObj[textName] = textValue;
        }
        obj = Object.assign(textObj, radioObj);
    };

};

$(document).ready(function(){
    $('#submit-btn').on('click', function(e){
        console.log("heyheyhey");
        $.post(
            '/recruits',
            // {
            // 'Content-Type' : 'application/json'
            // },
            JSON.stringify(obj),
            function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
            }
        );
    });
});


function setCookie(name, value, expiry){
    var d = new Date();
    d.setTime(d.getTime() + (expiry*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";" + "path=/";
};

document.addEventListener("keydown", function(e){
    if(e.keyCode == 37){
        prevStep();
        if(prevBtn.disabled === true){
            document.addEventListener("keydown", function(e){
                if(e.keyCode == 37){
                    return false
                }
            });            
        }
    }
    else if(e.keyCode == 39){
        nextStep();
    }
    else{
        console.log("scam");
        console.log(e.keyCode);
    };
});
nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);
submitBtn.addEventListener("click", submitAction);
window.addEventListener("load", resetState);
window.addEventListener("resize", getSetContHeight);
window.addEventListener("load", setIndicators);
for(x=0; x < dept_options.length; x++){
    dept_options[x].addEventListener("click", checkLimiter);
};
// for(count = 0; count <= allBtns.length; count++){
//     // allBtns[count].addEventListener("click", indicate);
// };
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
window.addEventListener("load", indicators);

for(k = 0; k < inputs.length; k++){
    inputs[k].addEventListener("keypress", function(e){
        if(e.type === 'keypress'){
            // console.log(e.target.getAttribute('id'));
            if(e.keyCode == 13){
                localStorage.setItem(e.target.getAttribute('id'), e.target.value);
                pos++;
                console.log("key pressed" + pos);
            }
            else{
                console.log("else")
            }
        }
    });
};
//create cookie
window.addEventListener("load", function(){
    setCookie("name", "visitor", 20);
    //get localStorage
    // getInput();
});

window.addEventListener("load", displayPage);
