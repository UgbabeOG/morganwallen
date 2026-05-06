document.addEventListener('DOMContentLoaded', function() {
  const navTrigger = document.getElementById('nav-trigger');
  const navMob = document.getElementById('nav-mob');
  const mobileNav = document.getElementById('mobile-nav');
  const videoThumbs = document.querySelectorAll('.video-thumb');
  const epytPlayer = document.getElementById('epyt-player');

  // Mobile nav toggle
  if (navTrigger) {
    navTrigger.addEventListener('click', function() {
      navTrigger.classList.toggle('open');
      navMob.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    const navLinks = navMob.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navTrigger.classList.remove('open');
        navMob.classList.remove('open');
      });
    });
  }

  // Video switching
  videoThumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video');
      if (videoId && epytPlayer) {
        // Update player
        epytPlayer.src = `https://www.youtube.com/embed/${videoId}?rel=0`;

        // Update active state
        videoThumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offset = 120;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
