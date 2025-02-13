document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".swipeable-view-container");
    const slides = document.querySelectorAll(".swipeable-view-container > div");
    const prevBtn = document.querySelector(".MuiButtonBase-root:first-child");
    const nextBtn = document.querySelector(".MuiButtonBase-root:last-child");
    const dots = document.querySelectorAll(".MuiMobileStepper-dot");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    function updateSlidePosition() {    // 更新輪播圖位置
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }
    function updateDots() { // 更新指示點狀態
        dots.forEach((dot, index) => {
            dot.classList.toggle("MuiMobileStepper-dotActive", index === currentIndex);
        });
    }
    function moveToNextSlide() {    // Next
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }
    function moveToPrevSlide() {    // Last
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }
    function startAutoSlide() {    // Start auto slide
        autoSlideInterval = setInterval(moveToNextSlide, 3000);
    }
    function stopAutoSlide() {    // Stop auto slide
        clearInterval(autoSlideInterval);
    }

    // 點擊點點
    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        moveToPrevSlide();
        startAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        moveToNextSlide();
        startAutoSlide();
    });
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopAutoSlide();
            currentIndex = index;
            updateSlidePosition();
            startAutoSlide();
        });
    });

    startAutoSlide();
});