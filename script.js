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

  // Ticket Modal Logic
  const modal = document.getElementById('ticket-modal');
  const closeBtn = document.querySelector('.close-modal');
  const ticketTriggers = document.querySelectorAll('.ticket-trigger');
  const ticketForm = document.getElementById('ticket-form');
  const formSuccess = document.getElementById('form-success');
  const eventNameInput = document.getElementById('event-name');
  const modalEventDetails = document.getElementById('modal-event-details');

  ticketTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const eventDetails = this.getAttribute('data-event');
      eventNameInput.value = eventDetails;
      modalEventDetails.textContent = eventDetails;
      modal.style.display = 'block';
      ticketForm.classList.remove('hidden');
      formSuccess.classList.add('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  if (ticketForm) {
    ticketForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const event = formData.get('event-name');
      const tickets = formData.get('tickets');
      const message = formData.get('message');

      // Construct mailto link
      const subject = encodeURIComponent(`Ticket Inquiry: ${event}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nEvent: ${event}\nTickets: ${tickets}\nMessage: ${message}`);
      
      // Open default email client
      window.location.href = ` mailto:Morganwallentourmanagement01@gmail.com?subject=${subject}&body=${body}`;

      // Show success message
      ticketForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');

      // Close modal after a delay
      setTimeout(() => {
        modal.style.display = 'none';
      }, 3000);
    });
  }
});
