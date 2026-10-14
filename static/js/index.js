// Plays videos only while they are in the viewport (keeps 25+ looping clips cheap),
// and wires the "pause all / play all" toggle.
(function () {
  const videos = Array.from(document.querySelectorAll('video[data-autoplay]'));
  let userPaused = false;

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting && !userPaused) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.1 });
    videos.forEach((v) => io.observe(v));
  } else {
    videos.forEach((v) => v.play().catch(() => {}));
  }

  const toggle = document.getElementById('toggle-play');
  if (toggle) {
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      videos.forEach((v) => (userPaused ? v.pause() : v.play().catch(() => {})));
      toggle.textContent = userPaused ? '▶ Play all demos' : '❚❚ Pause all demos';
    });
  }

  // Frame-step controls: clicking a video toggles play/pause for close inspection.
  videos.forEach((v) => {
    v.addEventListener('click', () => (v.paused ? v.play().catch(() => {}) : v.pause()));
  });
})();
