document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("multiCarousel");
    const carouselInner = document.getElementById("carouselInner");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const originalItems = Array.from(document.querySelectorAll(".multi-carousel-item:not(.clone)"));
    const totalItems = originalItems.length;
    let itemsPerSlide = 3;
    let slideBy = 1;
    function updateConfig() {
        const width = window.innerWidth;
        if (width < 768) { itemsPerSlide = 1; } else if (width < 992) { itemsPerSlide = 2; } else { itemsPerSlide = 3; }
    }
    function initializeClones() {
        document.querySelectorAll(".clone").forEach((clone) => clone.remove());
        const lastClones = originalItems.slice(-itemsPerSlide).map((item) => {
            const clone = item.cloneNode(true); clone.classList.add("clone"); return clone;
        }).reverse();
        lastClones.forEach((clone) => carouselInner.prepend(clone));
        const firstClones = originalItems.slice(0, itemsPerSlide).map((item) => {
            const clone = item.cloneNode(true); clone.classList.add("clone"); return clone;
        });
        firstClones.forEach((clone) => carouselInner.append(clone));
    }
    updateConfig();
    initializeClones();
    let currentIndex = 0;
    let position = itemsPerSlide;
    let isAnimating = false;
    function updateCarouselPosition(animate = true) {
        if (animate) { carouselInner.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; }
        else { carouselInner.style.transition = "none"; }
        const translateX = (position * -100) / itemsPerSlide;
        carouselInner.style.transform = `translateX(${translateX}%)`;
    }
    updateCarouselPosition(false);
    carouselInner.addEventListener("transitionend", function () {
        isAnimating = false;
        if (position >= totalItems + itemsPerSlide) {
            position = itemsPerSlide + (position - (totalItems + itemsPerSlide));
            updateCarouselPosition(false);
        } else if (position < itemsPerSlide) {
            position = totalItems + position;
            updateCarouselPosition(false);
        }
    });
    function next() {
        if (isAnimating) return;
        isAnimating = true;
        position += slideBy;
        updateCarouselPosition();
    }
    function prev() {
        if (isAnimating) return;
        isAnimating = true;
        position -= slideBy;
        updateCarouselPosition();
    }
    nextBtn.addEventListener("click", () => { next(); resetAutoAdvanceTimer(); });
    prevBtn.addEventListener("click", () => { prev(); resetAutoAdvanceTimer(); });
    let isDragging = false; let startX = 0; let startPosition = 0;
    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("touchstart", startDrag, { passive: true });
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag, { passive: true });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
    function startDrag(e) {
        if (isAnimating) return;
        isDragging = true;
        startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
        startPosition = position;
        carousel.classList.add("dragging");
        carouselInner.style.transition = "none";
    }
    function drag(e) {
        if (!isDragging) return;
        const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
        const dist = (startX - x);
        const carouselWidth = carousel.offsetWidth;
        const moveInPercent = (dist / carouselWidth) * itemsPerSlide;
        const currentTranslate = ((startPosition + moveInPercent) * -100) / itemsPerSlide;
        carouselInner.style.transform = `translateX(${currentTranslate}%)`;
    }
    function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove("dragging");
        const x = e.type?.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
        const dist = startX - x;
        if (dist > 50) { next(); } else if (dist < -50) { prev(); } else { updateCarouselPosition(true); }
    }
    let autoAdvanceInterval;
    function startAutoAdvance() { clearInterval(autoAdvanceInterval); autoAdvanceInterval = setInterval(next, 5000); }
    function resetAutoAdvanceTimer() { clearInterval(autoAdvanceInterval); startAutoAdvance(); }
    startAutoAdvance();
    carousel.addEventListener("mouseenter", () => clearInterval(autoAdvanceInterval));
    carousel.addEventListener("mouseleave", startAutoAdvance);
    window.addEventListener("resize", function () {
        updateConfig(); initializeClones(); position = itemsPerSlide; updateCarouselPosition(false);
    });
});