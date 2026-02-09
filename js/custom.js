AOS.init({
    once: true,
    offset: 100,
    duration: 800
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Get Year for Copyright
document.addEventListener('DOMContentLoaded', function () {
  let d = new Date();
  let n = d.getFullYear();
  document.getElementById('year').innerHTML = n;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});