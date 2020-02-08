(function(window) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    }

    window.onpageshow = function(event) {
      if (event.persisted) {
          PageTransition();
            $('.hamburger').removeClass('is-active');
            $('.ms-nav').removeClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').removeClass('active');
            });
      }
    };

    // All Funtions
    PageTransition();
    Menu();
    ms_home_slider();
   // UniteGallery();
    ValidForm();

})(window);

/*--------------------
    Page Transition
---------------------*/
function PageTransition() {
    var preload = anime({
        targets: '.ms-preloader',
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutCubic',
        complete: function(preload) {
            $('.ms-preloader').css('visibility', 'hidden');
        }
    });
    $('.ms-main-container').addClass('loaded');
    var cont = anime({
        targets: '.loaded',
        opacity: [0, 1],
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 300,
        complete: function(preload) {
            $('.ug-thumb-image').css({
                'opacity': '1'
            });
            $('.ms-section__block img').css({
                'opacity': '1'
            });
            $('.ug-thumb-wrapper, .post-item').css({
                'pointer-events': 'auto'
            });
        }
    });
    $(document).on('click', '[data-type="page-transition"]', function(e) {
        var url = $(this).attr('href');
        if (url != '#' && url != '') {
            e.preventDefault();
            $('.ms-preloader').css('visibility', 'visible');
            var url = $(this).attr('href');
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function(preload) {
                    window.location.href = url;
                }
            });
        }
    });
}

/*------------------
    Menu
-------------------*/
function Menu() {
    if ($.exists('.hamburger')) {
        $('.hamburger').on('click', function(e) {
            var burger = $(this);
            $(burger).toggleClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.enter-holder').toggleClass('hide-hold')
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').toggleClass('active');
            });
        });
        $('.height-full-viewport').on({'mousewheel': function(e) {
            if (e.target.id === 'el') return;
            e.preventDefault();
            e.stopPropagation();
        }
})
    }
}

/*------------------
    Home Slider
-------------------*/
    function ms_home_slider() {
        if ($.exists('.swiper-container')) {
            var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',    
            loop: true,
            speed: 300,
            grabCursor: false,
            mousewheel: true,
            keyboard: true,
            simulateTouch: false,
            parallax: true,
            effect: 'slide',
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            });
             $('.expanded-timeline__counter span:first-child').text('4');
            $('.expanded-timeline__counter span:last-child').text('4' /*swiper.slides.length*/);
            swiper.on('slideChange', function () {
                $('.expanded-timeline__counter span:first-child').text(swiper.activeIndex - 1);
            });

            }
    }



/*------------------
 Unite-Gallery
-------------------*/
// function UniteGallery() {
//     if ($.exists('#photos')) {
//         $('#photos').unitegallery({
//             gallery_theme: 'tiles',
//             // tiles_type: "justified",
//              tiles_col_width: 400,
//             // tiles_justified_row_height: 400,
//             // tiles_justified_space_between: 30,
//             // tile_overlay_color: "#000",
//             tiles_min_columns: 3,
//             tiles_space_between_cols: 10,	
//             tile_overlay_opacity: 0.7,
//             tile_enable_icons: false,
//             tile_textpanel_position: "inside_bottom",
//         });
//     }
// }

//CECK FOR MOBILE
if( navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)
){
   

    $('#photos').unitegallery({
        gallery_theme: 'tiles',
         tiles_col_width: 400,
        tiles_min_columns: 1,
        tiles_space_between_cols: 0,	
        tile_overlay_opacity: 0.7,
        tile_enable_icons: false,
        tile_textpanel_position: "inside_bottom",
    });


} else {
    $('#photos').unitegallery({
        gallery_theme: 'tiles',
         tiles_col_width: 400,
        tiles_min_columns: 3,
        tiles_space_between_cols: 10,	
        tile_overlay_opacity: 0.7,
        tile_enable_icons: false,
        tile_textpanel_position: "inside_bottom",
    });
 }



/*------------------
 Form Validation
-------------------*/
function ValidForm() {
    if ($.exists('#validForm')) {
        $('.form-control').focus(function() {
            $(this).prev('.control-label').addClass('active');
        });
        $('.form-control').focusout(function() {
            $(this).prev('.control-label').removeClass('active');
        });
        $("#validForm").validate({
            ignore: ":hidden",
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                },
                email: {
                    required: true,
                    email: true,
                },
                subject: {
                    required: true,
                    minlength: 4,
                    maxlength: 32,
                },
                message: {
                    required: true,
                    minlength: 16,
                },
            },
            messages: {
                name: {
                    required: "<span>Please enter your name</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 24</span>",
                },
                email: {
                    required: "<span>Please enter your email</span>",
                    email: "<span>Please enter a valid email address.</span>",
                },
                subject: {
                    required: "<span>Please enter your subject</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 16</span>",
                },
                message: {
                    required: "<span>Please write me message</span>",
                    minlength: "<span>Your message must consist of at least 16 characters</span>",
                    maxlength: "<span>The maximum number of characters - 100 </span>",
                },
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "contact.php",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        // do something
                    },
                    success: function(data) {
                        if (data == "Email sent!");
                        $('input, textarea').val('');
                        $('.form-group').blur();
                        // do something
                    }
                });
                return false;
            }
        });
    }
}



// CURSOR
var cursor = $(".cursor"),
follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.020, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(cursor, {
        css: {
        left: mouseX,
        top: mouseY
        }
    });
  }
});

$(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
// yellow circle
$(".link").on("mouseenter", function() {
    cursor.addClass("cursor-active");
});
$(".link").on("mouseleave", function() {
    cursor.removeClass("cursor-active");
});
//Change color
$('.blocks').on('mouseenter', function() {
    cursor.addClass('cursor-red');
});
$('.blocks').on('mouseleave', function() {
    cursor.removeClass('cursor-red');
});




//SHOW CATEGORIES

$('.enter-holder').on('click', () => {
    const activeS = $('.swiper-slide-active')
    if (activeS.hasClass('one-o')) {
        $('.narrative-catry').addClass('nat-active')
       
        
    } else if (activeS.hasClass('two-o')) {
        $('.music-catry').addClass('nat-active')
    } else if (activeS.hasClass('zero-o')) {
        $('.reel-catry').addClass('nat-active')
    }else {
        $('.brand-catry').addClass('nat-active')
    }


    TweenMax.staggerFrom('.narrative-catry .blocks', .3, { x: 90, autoAlpha: 0 }, .2)
    TweenMax.staggerFrom('.music-catry .blocks', .3, { x: 90, autoAlpha: 0 }, .2)
    TweenMax.staggerFrom('.brand-catry .blocks', .3, { x: 90, autoAlpha: 0 }, .2)
    TweenMax.from('.reel-catry .blocks', .3, {x: 90, autoAlpha: 0})
     
})


$('.close-cat').on('click', () => {
    $('.narrative-catry').removeClass('nat-active')
    $('.brand-catry').removeClass('nat-active')
    $('.music-catry').removeClass('nat-active')
    $('.reel-catry').removeClass('nat-active')
})


$('.enter-holder').on('mouseenter', () => {
    TweenMax.to('.enter-holder', .3, { scale: 1.20, ease: Expo.easeInOut })
    $('.enter-holder span').addClass('glitcher')
})

$('.enter-holder').on('mouseleave', () => {
    TweenMax.to('.enter-holder', .3, { scale: 1, ease: Expo.easeInOut })
    $('.enter-holder span').removeClass('glitcher')
})


window.addEventListener('load', () => {
    setTimeout(() => {
        TweenMax.to('.start-preloader', .8, { display: 'none', autoAlpha: 0})
     }, 2000)
})
    


//Give video full widht

document.querySelectorAll('.v-video__wrapper').forEach((el) => {
    const closeScreen = document.querySelector('.close-fullscreen')
    const rmHead = document.querySelector('.alt-rm')
    el.addEventListener('click', () => {
        el.classList.add('v-full-width')
        el.querySelector('video').controls = true
        closeScreen.style.display = 'block'
        rmHead.style.display = 'none'
    })

   closeScreen.addEventListener('click', () => {
       el.classList.remove('v-full-width')
       el.querySelector('video').controls = false
       closeScreen.style.display = 'none'
       rmHead.style.display = 'block'
    })
})
