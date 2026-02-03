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