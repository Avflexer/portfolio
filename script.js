  // small JS to add interactivity — no build step required
    function scrollToSection(sel){
      const el = document.querySelector(sel);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }

        async function sendMessage(e){
          e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        alert('Please fill all fields.');
        return;
      }
      try {
    const response = await fetch("https://formspree.io/f/meorgwob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      alert("✅ Thanks! Your message has been sent successfully.");
      e.target.reset();
    } else {
      alert("⚠️ Oops! Something went wrong, please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ Network error. Please check your internet connection.");
  }
}

  function downloadResume(){
      // Change this to point to your resume PDF path in the repo
      const resumeUrl = './resume.pdf';
      window.open(resumeUrl, '_blank');
    }

    // Small accessibility helpers
    (function(){
      // ensure images have alt text where possible (developer should replace with meaningful alts)
      document.querySelectorAll('img').forEach(img=>{
        if(!img.alt || img.alt.trim()==='') img.alt = 'portfolio image';
      })
  })();

  // Generate stars for space background
  function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.insertBefore(starsContainer, document.body.firstChild); // Add at the beginning for z-index

    for (let i = 0; i < 300; i++) { // Increased for more stars
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2 + 1; // 1-3px
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = Math.random() * 0.5 + 0.3; // Vary opacity for depth
      starsContainer.appendChild(star);
    }
  }
  createStars();

  // Fade-in on scroll
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // Unobserve after visible to prevent repeat
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% in view

  document.querySelectorAll('.hero, .skill, main.card, aside.card').forEach(el => {
    fadeObserver.observe(el);
  });
