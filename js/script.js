document.addEventListener('DOMContentLoaded', () => {
    // 1. 요소 선택 (HTML 아이디와 일치시킴)
    const video = document.getElementById('rni_bgVideo');
    const mainTitle = document.getElementById('rni_main_title');
    const mainDesc = document.getElementById('rni_main_article');
    const cards = document.querySelectorAll('.rni_contents_card');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    // 인디케이터 관련
    const dotContainers = document.querySelectorAll('.dot_container');
    const svgHTML = `
        <svg class="progress_circle" width="30" height="30">
            <circle class="bg" cx="15" cy="15" r="13"></circle>
            <circle class="bar" cx="15" cy="15" r="13"></circle>
        </svg>`;

    let currentIndex = 0; // 현재 활성화된 카드 인덱스 관리

    // 💥 [핵심 기능] 특정 인덱스의 카드를 활성화하는 함수 통합 공정
    function activateCard(index) {
        if (index < 0 || index >= cards.length) return;
        currentIndex = index; // 현재 인덱스 갱신

        const card = cards[index];

        // 모든 카드 비활성화 후 현재 카드만 활성화
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // 비디오 소스 및 텍스트 데이터 매칭
        video.src = card.getAttribute('data-video');
        mainTitle.innerText = card.getAttribute('data-title');
        mainDesc.innerText = card.getAttribute('data-desc');
        
        // 재생 버튼 상태에 따른 처리
        if (!playPauseBtn.classList.contains('is-paused')) {
            video.play().catch(err => console.log("자동 재생 정책 방어:", err));
            playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
        }

        // 인디케이터 초기화 후 해당 위치에 주입
        dotContainers.forEach(container => {
            container.classList.remove('active');
            const oldSvg = container.querySelector('svg');
            if(oldSvg) oldSvg.remove();
        });
        
        dotContainers[index].classList.add('active');
        dotContainers[index].insertAdjacentHTML('beforeend', svgHTML);
    }

    // [기능 1] 카드 마우스 호버(mouseenter) 제어
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // 사용자가 마우스를 올리면 해당 카드로 즉시 스위칭
            activateCard(index);
        });
    });

    // 💥 [기능 2 추가] 현재 비디오 재생이 끝났을 때(ended) 다음 카드로 자동 전환
    video.addEventListener('ended', () => {
        // 다음 카드로 인덱스 증가, 마지막 카드면 0번(처음)으로 순환 연산
        let nextIndex = (currentIndex + 1) % cards.length;
        activateCard(nextIndex);
    });

    // [기능 3] 비디오 재생 시간 연동 (원형 프로그레스 애니메이션)
    video.addEventListener('timeupdate', () => {
        const progressBar = document.querySelector('.dot_container.active .bar');
        if (progressBar) {
            const totalOffset = 82; 
            const progress = video.currentTime / video.duration;
            const offset = totalOffset - (progress * totalOffset);
            progressBar.style.strokeDashoffset = offset ? offset : totalOffset;
        }
    });

    // [기능 4] 일시정지 / 재생 컨트롤러 버튼 제어
    playPauseBtn.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.play().then(() => {
                playPauseBtn.classList.remove('is-paused');
                playPauseBtn.innerHTML = '<i class="ri-pause-line"></i>';
            }).catch(error => {
                console.error("재생 실패:", error);
            });
        } else {
            video.pause();
            playPauseBtn.classList.add('is-paused'); // 일시정지 상태를 기억하기 위한 상태용 클래스 토글
            playPauseBtn.innerHTML = '<i class="ri-play-fill"></i>';
        }
    });

    // 💥 초기 페이지 로드 시 첫 번째(0번) 카드 강제 구동 시발점 선언
    if(cards.length > 0) {
        activateCard(0);
    }

    // =================================================================
    // 🦉 jQuery 영역 (Owl Carousel 및 탭 인터랙션 정석 유지)
    // =================================================================
    $(document).ready(function () {
        $('.beauty_bestseller_tabs a').click(function (e) {
            e.preventDefault();

            // 탭 디자인 변경
            $('.beauty_bestseller_tabs a').removeClass('active');
            $(this).addClass('active');

            // 탭 콘텐츠 변경
            var tab_id = $(this).attr('data-tab');
            $('.tab_content').removeClass('active');
            $("#" + tab_id).addClass('active');
        });

        $('.beauty_bestseller_tabs .tab_link').first().trigger('click');
    });

    $('.globalcommunity_contents_box').on('mouseenter', function () {
        const $thisBox = $(this);
        const video = $thisBox.find('.globalcommunity_video')[0];

        $thisBox.addClass('is-hovered');

        if (video) {
            video.currentTime = 0;
            var playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("자동 재생 정책 방어: ", error);
                });
            }
        }
    });

    $('.globalcommunity_contents_box').on('mouseleave', function () {
        const $thisBox = $(this);
        const video = $thisBox.find('.globalcommunity_video')[0];

        $thisBox.removeClass('is-hovered');

        if (video) {
            video.pause();
        }
    });
});