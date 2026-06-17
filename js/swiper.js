document.addEventListener('DOMContentLoaded', function () {
    // 1. Swiper 초기화
    const swiper = new Swiper('.brand_contents_wrap', {
        allowTouchMove: true, // 드래그 금지
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 40,
        loopedSlides: 7,

        speed: 8000, // 흐르는 속도
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
        },

        freeMode: false,
    });


    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn_more_button')) {

            e.preventDefault();

            console.log('클릭 성공');

            setTimeout(() => {
                swiper.autoplay.run();
                swiper.autoplay.start();
            }, 100);


        }
    });

    var mySwiper = new Swiper('.circulararchive_contents_wrap', {

        slidesPerView: 3.2, 
        spaceBetween: 15, 
        // slidesOffsetAfter: 400, 
        simulateTouch: true,
        grabCursor: true,

        breakpoints:{
            0:{
                slidesPerView: 1.4,
                spaceBetween: 8
            },
            480:{
                slidesPerView: 1.8,
                spaceBetween: 8
            },
            600:{
                slidesPerView: 2.2,
                spaceBetween: 12
            },
            768:{
                slidesPerView: 2.5,
                spaceBetween: 12
            },
            1280:{
                slidesPerView: 2.8, 
                spaceBetween: 14, 
            },
            1440:{
                slidesPerView: 3.2, 
                spaceBetween: 15, 
            }
        }

    });


    var mySwiper = new Swiper('.artisansofbeauty_contents_wrap', {
    slidesPerView: 2.5, 
    spaceBetween: 24, 
    loop: false, 
    simulateTouch: true,
    grabCursor: true,

    pagination: {
        el: '.artisansofbeauty_contents_wrap .swiper-pagination',
        type: 'progressbar' // 기본 점 모양 (또는 'fraction', 'progressbar' 등)
    }
    
});

});