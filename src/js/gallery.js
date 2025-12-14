// ================== FPS OPTIMIZED GALLERY ==================
(function () {

  function initGallery() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    const modalImg = document.getElementById('modalImage');
    const counter = document.getElementById('imageCounter');
    const thumbsBox = document.getElementById('modalThumbnails');

    const btnClose = document.getElementById('modalClose');
    const btnPrev = document.getElementById('modalPrev');
    const btnNext = document.getElementById('modalNext');

    let images = [];
    let index = 0;
    let thumbsBuilt = false;

    const isMobile = window.innerWidth < 768;

    // ---------- helpers ----------
    function update() {
      if (!images.length) return;

      const img = images[index];
      modalImg.src = isMobile ? img.mobile : img.full;
      modalImg.alt = img.alt;

      counter.textContent = `${index + 1} / ${images.length}`;

      thumbsBox.querySelectorAll('img').forEach((t, i) => {
        t.classList.toggle('active', i === index);
      });
    }

    function buildThumbs() {
      if (thumbsBuilt) return;
      thumbsBuilt = true;

      thumbsBox.innerHTML = '';

      images.forEach((img, i) => {
        const t = document.createElement('img');
        t.src = img.mobile;
        t.alt = img.alt;
        t.decoding = 'async';
        t.loading = 'lazy';

        t.addEventListener('click', () => {
          index = i;
          update();
        });

        thumbsBox.appendChild(t);
      });
    }

    function openGallery(startIndex) {
      index = startIndex || 0;

      buildThumbs();
      update();

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // ---------- open handler (PC + mobile) ----------
    document.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumbnails img');
      const main = e.target.closest('.main-image img');

      if (!thumb && !main) return;

      const container = (thumb || main).closest('.gallery-container');
      if (!container) return;

      const allThumbs = container.querySelectorAll('.thumbnails img');
      if (!allThumbs.length) return;

      images = Array.from(allThumbs).map(img => ({
        mobile: img.dataset.mobile || img.src,
        full: img.dataset.full || img.src,
        alt: img.alt || ''
      }));

      thumbsBuilt = false;

      if (thumb) {
        openGallery(Array.from(allThumbs).indexOf(thumb));
      } else {
        openGallery(0);
      }
    });

    // ---------- controls ----------
    btnClose && btnClose.addEventListener('click', closeGallery);

    modal.querySelector('.modal-overlay')?.addEventListener('click', closeGallery);

    btnPrev && btnPrev.addEventListener('click', () => {
      index = index > 0 ? index - 1 : images.length - 1;
      update();
    });

    btnNext && btnNext.addEventListener('click', () => {
      index = index < images.length - 1 ? index + 1 : 0;
      update();
    });

    // ---------- keyboard ----------
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;

      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') btnPrev.click();
      if (e.key === 'ArrowRight') btnNext.click();
    });
  }

  // ---------- init ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

})();
