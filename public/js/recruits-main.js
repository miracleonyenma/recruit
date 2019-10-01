var light = true;

$(document).ready(function(){
    $('#delete').on('click', function(e){
        $target = $(e.target);
        var id = $target.attr('data-id');

        $.ajax({
            type: 'DELETE',
            url: '/recruitinfo/'+id,
            success: function(response){
                alert('Deleting Recruit'); 
                window.location.href = '/recruits';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
    function setMode(){
        // if(localStorage.getItem('light') === null){
            localStorage.setItem('light', light);
        // };
    };
    function getMode(){
        light = JSON.parse(localStorage.getItem('light'));
        modeSwitch();
    };
    var docStyles = document.documentElement.style;
    var modeBtn = document.querySelector('#mode');
    function modeSwitch(){
        function modeOut(){
            modeBtn.classList.toggle('mode-out');
        };
        if(light){
            setMode();
            modeOut();
            docStyles.setProperty('--bg', '#fff');
            docStyles.setProperty('--logo', '#28282f');
            docStyles.setProperty('--logo-shadow', '#d1dae0');
            docStyles.setProperty('--inverse-bg', '#28282f');
            docStyles.setProperty('--inverse-text', '#f5f8fa');
            docStyles.setProperty('--footer-bg', '#f9fafb');
            docStyles.setProperty('--body-bg', '#f9fafb');
            // docStyles.setProperty('--contact-bg', '#d1d8e4');
            // docStyles.setProperty('--contact-shadow', '8px 6px 32px rgba(209, 216, 228, 0.341)');
            // docStyles.setProperty('--contact-text', '#5e697b');
            // docStyles.setProperty('--link-color', '#7e9ad6');
            // docStyles.setProperty('--link-color-hover', '#a1b9e7');
            docStyles.setProperty('--text', '#5e697b');   
            setTimeout(function(){

                light = false;
                modeOut();

            }, 800);    
        }
        else{
            setMode();
            modeOut();
            docStyles.setProperty('--body-bg', '#232329');
            docStyles.setProperty('--inverse-bg', '#f5f8fa');
            docStyles.setProperty('--inverse-text', '#28282f');
            docStyles.setProperty('--footer-bg', '#3b3b43');
            docStyles.setProperty('--logo', '#1da1f2');
            docStyles.setProperty('--logo-shadow', '#232329');
            docStyles.setProperty('--bg', '#28282f');
            // docStyles.setProperty('--contact-bg', '#d1d8e4');
            // docStyles.setProperty('--contact-shadow', '8px 6px 32px rgba(209, 216, 228, 0.341)');
            // docStyles.setProperty('--contact-text', '#5e697b');
            // docStyles.setProperty('--link-color', '#7e9ad6');
            // docStyles.setProperty('--link-color-hover', '#a1b9e7');
            docStyles.setProperty('--text', '#f9fafb');   
            setTimeout(function(){

                light = true;
                modeOut();
            }, 800);    
        };
    };

    getMode();
    modeBtn.addEventListener('click', modeSwitch);
    
});