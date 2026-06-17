$(document).ready(function () {
const $newsCarousel = $('.tab_content');

$newsCarousel.owlCarousel({
    loop:true,
    margin:24,
    nav:false,
    dots:true,
    dotsEach: 1,
    smartSpeed:600,

    responsive:{
        0:{
            items:1.8
        },
        768:{
            items:2.8
        },
        1024:{
            items:3.8
        },
        1400:{
            items:4
        }
    },

    onInitialized:updateProgress,
    onTranslated:updateProgress
});

function updateProgress(event){

    const owl = event.relatedTarget;
    const count = owl.items().length;

    /*
        loop index 보정
    */
    let index = owl.relative(owl.current());

    const $dots = $(event.target).find('.owl-dot');

    /*
        전체 초기화
    */
    $dots.removeClass('filled');

    /*
        현재 위치까지 누적 채우기
    */
    $dots.each(function(i){

        if(i <= index){
            $(this).addClass('filled');
        }

    });

}

});


$(document).ready(function () {
    const $newsCarousel = $('.globalcommunity_contents_wrap');
    let owlActive = false; 

    function initGlobalCommunityCarousel() {
        const windowWidth = $(window).width();

        // 1280px 이하일 때 캐러셀 활성화
        if (windowWidth <= 1280) {
            if (!owlActive) {
                $newsCarousel.owlCarousel({
                    loop: true,
                    margin: 24,
                    center: true, // 3번째 카드가 정확히 중심에 배치됨
                    nav: false,
                    dots: false,  // 하단 인디케이터 안 보이게 처리
                    smartSpeed: 600,
                    responsive: {
                        0: { items: 1.8 },
                        768: { items: 2.8 },
                        1024: { items: 3.5 }
                    }
                });
                owlActive = true;
            }
        } 
        // 1280px 초과 PC 화면일 때 캐러셀 기능 제거 (기본 5열 배치 복귀)
        else {
            if (owlActive) {
                $newsCarousel.owlCarousel('destroy');
                owlActive = false;
            }
        }
    }

    // 초기 실행 및 브라우저 창 크기 변화 감지 연동
    initGlobalCommunityCarousel();
    $(window).on('resize', function () {
        initGlobalCommunityCarousel();
    });

});