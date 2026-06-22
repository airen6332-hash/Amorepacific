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

})


// 변수 중복 선언으로 인한 에러 차단을 위해 변수명 명확히 분리
var artisansSwiper = undefined;

function handleArtisansSwiper() {
    // 💡 window.innerWidth를 직접 체크하여 768px 초과 영역인지 정밀 판정
    var screenWidth = window.innerWidth;

    if (screenWidth > 768) {
        // 768px 초과(PC)인데 아직 스와이퍼가 생성 안 된 상태라면 실행
        if (artisansSwiper === undefined) {
            artisansSwiper = new Swiper('.artisansofbeauty_contents_wrap', {
                slidesPerView: 2.5, 
                spaceBetween: 24, 
                loop: false, 
                simulateTouch: true,
                grabCursor: true,

                pagination: {
                    el: '.artisansofbeauty_contents_wrap .swiper-pagination',
                    type: 'progressbar' 
                },

                breakpoints:{
                    1024:{ slidesPer: 2.6, spaceBetween: 12 },
                    1280:{ slidesPer: 2.6, spaceBetween: 12 },
                    1440:{ slidesPer: 2.6, spaceBetween: 12 },
                }
            }); // 👈 Swiper 설정 중괄호 끝
        }
    } 
    // 💡 768px 이하 모바일 영역으로 들어왔을 때
    else {
        // 스와이퍼가 작동 중인 상태라면 완전히 파괴(기능 해제)
        if (artisansSwiper !== undefined) {
            artisansSwiper.destroy(true, true);
            artisansSwiper = undefined; // 변수 초기화로 다음 재생성 대기
        }
    }
}

// HTML 구조 및 이미지 등 모든 리소스가 로드된 시점에 최초 1회 실행 보장
window.onload = function() {
    handleArtisansSwiper();
    
    // 화면 크기가 변할 때마다 즉각적으로 768px 경계선 체크
    window.addEventListener('resize', handleArtisansSwiper);
};









    /* var mySwiper = new Swiper('.artisansofbeauty_contents_wrap', {
        slidesPerView: 2.5, 
        spaceBetween: 24, 
        loop: false, 
        simulateTouch: true,
        grabCursor: true,

        pagination: {
            el: '.artisansofbeauty_contents_wrap .swiper-pagination',
            type: 'progressbar' // 기본 점 모양 (또는 'fraction', 'progressbar' 등)
        },

        breakpoints:{

            1024:{
                slidesPerView: 2.6, 
                spaceBetween: 12 
            },
            1280:{
                slidesPerView: 2.6,
                spaceBetween: 12
            },
            1440:{
                slidesPerView: 2.6,
                spaceBetween: 12
            },
            
        },
        
    
    
    
    
    });




 }); */