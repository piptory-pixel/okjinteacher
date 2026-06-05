// 웹 페이지의 내용이 모두 불려오고 나면 이 안의 기능을 실행합니다.
document.addEventListener('DOMContentLoaded', () => {
    
    /* ========================================================
       1. 모바일 햄버거 메뉴 기능
       ======================================================== */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // 햄버거 버튼 클릭 시 메뉴 열기
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // 뒤에 스크롤 방지
        });
    }

    // 닫기(X) 버튼 클릭 시 메뉴 닫기
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // 스크롤 원상복구
        });
    }

    // 메뉴 항목 클릭 시 메뉴 자동으로 닫기
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ========================================================
       2. 커리큘럼 아코디언(펼쳐지는 상자) 기능
       ======================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // 클릭된 상자를 찾습니다.
            const item = header.parentElement;
            // 상자 안의 내용물(본문)을 찾습니다.
            const body = item.querySelector('.accordion-body');
            
            // 이미 열려있는 상자를 클릭했다면 닫습니다.
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                body.style.maxHeight = null;
            } else {
                // 다른 상자를 클릭했다면 열려있는 모든 상자를 먼저 닫습니다.
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBody = otherItem.querySelector('.accordion-body');
                    if (otherBody) otherBody.style.maxHeight = null;
                });
                
                // 클릭한 상자를 엽니다.
                item.classList.add('active');
                // 안의 내용물 높이만큼 상자를 펼칩니다.
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 기본적으로 첫 번째 커리큘럼은 열어둡니다.
    if (accordionHeaders.length > 0) {
        const firstItem = accordionHeaders[0].parentElement;
        const firstBody = firstItem.querySelector('.accordion-body');
        firstItem.classList.add('active');
        firstBody.style.maxHeight = firstBody.scrollHeight + "px";
    }

    /* ========================================================
       3. 메인 히어로 섹션 타이핑 효과 (Typewriter Effect)
       ======================================================== */
    const typingTextElement = document.querySelector('.typing-text');
    
    // 타이핑될 3가지 문구 배열
    const textArray = [
        "AI 도구로 내 강의를 브랜드로 만드는 실전 강사",
        "시니어도 소상공인도 누구든 시작할 수 있습니다",
        "함께라면 더 빠르게, AI와 함께 브랜드를 완성하세요"
    ];
    
    let textArrayIndex = 0; 
    let charIndex = 0;      
    let isDeleting = false; 

    function typeEffect() {
        if (!typingTextElement) return;

        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1500; 
            isDeleting = true;  
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false; 
            textArrayIndex++;   
            
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            typingSpeed = 500;  
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typingTextElement) {
        setTimeout(typeEffect, 500);
    }

    /* ========================================================
       4. 시니어 배려용 글씨 크기 조절 (A / A+)
       ======================================================== */
    const btnNormal = document.getElementById('btn-font-normal');
    const btnLarge = document.getElementById('btn-font-large');
    const htmlElement = document.documentElement; // <html> 태그

    if (btnNormal && btnLarge) {
        // 기본 크기 (A) 클릭 시
        btnNormal.addEventListener('click', () => {
            htmlElement.classList.remove('large-text'); // 확대 클래스 제거
            btnNormal.classList.add('active');          // A 버튼을 골드색으로
            btnLarge.classList.remove('active');        // A+ 버튼은 원래 색으로
        });

        // 큰 크기 (A+) 클릭 시
        btnLarge.addEventListener('click', () => {
            htmlElement.classList.add('large-text');    // 확대 클래스 추가
            btnLarge.classList.add('active');           // A+ 버튼을 골드색으로
            btnNormal.classList.remove('active');       // A 버튼은 원래 색으로
        });
    }

});
