/**
 * Gallery Controller for Nav Nirman Yuva Prerna Samiti (NNYPS)
 * Handles:
 * - Filtering by event (All, Teachers' Day, Gandhi-Shastri Jayanti, Monthly Program)
 * - Deep linking via URL hash (e.g., gallery.html#teachers-day-2013)
 * - Lazy loading & 12-item batch rendering ("Show more")
 * - Keyboard-accessible Lightbox (Next, Prev, Esc, Touch-friendly)
 * - Language synchronization (Hindi / English)
 */

(function () {
  'use strict';

  const BATCH_SIZE = 12;
  let currentFilter = 'all';
  let filteredPhotos = [];
  let visibleCount = 0;
  let currentLightboxIndex = -1;

  // DOM Elements
  const galleryGrid = document.getElementById('gallery-grid');
  const showMoreContainer = document.getElementById('show-more-container');
  const showMoreBtn = document.getElementById('show-more-btn');
  const galleryStatus = document.getElementById('gallery-status');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  // Lightbox DOM Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');

  // Get active language helper
  function getLang() {
    return (window.NNYPS && window.NNYPS.getLanguage) ? window.NNYPS.getLanguage() : (localStorage.getItem('nnyps_lang') || 'hi');
  }

  // Render a batch of photo cards into the grid
  function renderBatch(startIndex, count) {
    if (!galleryGrid) return;

    const endIndex = Math.min(startIndex + count, filteredPhotos.length);
    const lang = getLang();
    const isHindi = lang === 'hi';

    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex; i++) {
      const photo = filteredPhotos[i];

      const card = document.createElement('div');
      card.className = 'group bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', isHindi ? `${photo.eventTitle.hi} (फोटो ${photo.index})` : `${photo.eventTitle.en} (Photo ${photo.index})`);

      const photoAlt = isHindi ? photo.alt.hi : photo.alt.en;
      const eventTitle = isHindi ? photo.eventTitle.hi : photo.eventTitle.en;
      const eventDate = isHindi ? photo.eventDate.hi : photo.eventDate.en;

      card.innerHTML = `
        <div class="photo-frame aspect-[4/3] bg-stone-100 overflow-hidden relative">
          <img 
            src="${photo.src}" 
            alt="${photoAlt}" 
            data-hi-alt="${photo.alt.hi}"
            data-en-alt="${photo.alt.en}"
            loading="lazy" 
            width="400" 
            height="300"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="p-2 rounded-full bg-white/90 text-brand-700 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
              </svg>
            </span>
          </div>
        </div>
        <div class="p-3 text-left">
          <p class="text-xs font-semibold text-brand-600 truncate">${eventTitle}</p>
          <div class="flex items-center justify-between text-[11px] text-stone-500 mt-1">
            <span>${eventDate}</span>
            <span class="font-mono text-stone-400">#${photo.index}</span>
          </div>
        </div>
      `;

      // Click to open lightbox
      card.addEventListener('click', () => openLightbox(i));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });

      fragment.appendChild(card);
    }

    galleryGrid.appendChild(fragment);
    visibleCount = endIndex;
    updateStatusAndShowMore();
  }

  // Update "Show more" button visibility and text indicator
  function updateStatusAndShowMore() {
    const total = filteredPhotos.length;
    const lang = getLang();
    const isHindi = lang === 'hi';

    if (galleryStatus) {
      if (total === 0) {
        galleryStatus.textContent = isHindi ? 'कोई फोटो उपलब्ध नहीं है' : 'No photos available';
      } else {
        galleryStatus.textContent = isHindi
          ? `कुल ${total} में से ${visibleCount} तस्वीरें प्रदर्शित`
          : `Showing ${visibleCount} of ${total} photos`;
      }
    }

    if (showMoreContainer && showMoreBtn) {
      if (visibleCount < total) {
        showMoreContainer.classList.remove('hidden');
        const remaining = total - visibleCount;
        const nextBatch = Math.min(BATCH_SIZE, remaining);
        showMoreBtn.setAttribute('data-hi', `और तस्वीरें देखें (${nextBatch} और)`);
        showMoreBtn.setAttribute('data-en', `Show More Photos (${nextBatch} more)`);
        showMoreBtn.textContent = isHindi ? `और तस्वीरें देखें (${nextBatch} और)` : `Show More Photos (${nextBatch} more)`;
      } else {
        showMoreContainer.classList.add('hidden');
      }
    }
  }

  // Set active filter tab and reset grid
  function applyFilter(filterId) {
    currentFilter = filterId;

    // Update filter buttons styling
    filterBtns.forEach((btn) => {
      const btnFilter = btn.getAttribute('data-filter');
      if (btnFilter === filterId) {
        btn.classList.add('bg-brand-600', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-stone-700', 'hover:bg-stone-100');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-brand-600', 'text-white', 'shadow-sm');
        btn.classList.add('bg-white', 'text-stone-700', 'hover:bg-stone-100');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Fetch filtered photos from gallery config
    if (window.NNYPS_GALLERY_CONFIG) {
      filteredPhotos = window.NNYPS_GALLERY_CONFIG.generatePhotoList(filterId);
    } else {
      filteredPhotos = [];
    }

    // Reset grid
    if (galleryGrid) {
      galleryGrid.innerHTML = '';
    }
    visibleCount = 0;

    // Render initial batch of 12
    renderBatch(0, BATCH_SIZE);
  }

  // ==================== LIGHTBOX IMPLEMENTATION ====================

  function openLightbox(index) {
    if (index < 0 || index >= filteredPhotos.length || !lightboxModal) return;

    currentLightboxIndex = index;
    updateLightboxContent();

    lightboxModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Prevent background scroll
    lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    currentLightboxIndex = -1;
  }

  function nextLightbox() {
    if (filteredPhotos.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredPhotos.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    if (filteredPhotos.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    updateLightboxContent();
  }

  function updateLightboxContent() {
    if (currentLightboxIndex < 0 || currentLightboxIndex >= filteredPhotos.length) return;

    const photo = filteredPhotos[currentLightboxIndex];
    const lang = getLang();
    const isHindi = lang === 'hi';

    const photoAlt = isHindi ? photo.alt.hi : photo.alt.en;
    const eventTitle = isHindi ? photo.eventTitle.hi : photo.eventTitle.en;
    const eventDate = isHindi ? photo.eventDate.hi : photo.eventDate.en;

    lightboxImg.src = photo.src;
    lightboxImg.alt = photoAlt;

    if (lightboxCaption) {
      lightboxCaption.innerHTML = `
        <span class="font-bold text-white text-sm sm:text-base">${eventTitle}</span>
        <span class="block text-xs sm:text-sm text-stone-300 mt-0.5">${eventDate} &bull; ${photo.filename}</span>
      `;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredPhotos.length}`;
    }
  }

  // Handle Hash routing on load (e.g. gallery.html#teachers-day-2013)
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    const validFilters = ['all', 'teachers-day-2013', 'gandhi-shastri-jayanti-2013', 'monthly-program', 'general'];
    if (hash && validFilters.includes(hash)) {
      applyFilter(hash);
    } else {
      applyFilter('all');
    }
  }

  // Initialize Gallery & Lightbox listeners
  function initGallery() {
    // Filter button listeners
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filterId = btn.getAttribute('data-filter');
        // Update hash in address bar without scrolling
        history.replaceState(null, null, `#${filterId}`);
        applyFilter(filterId);
      });
    });

    // "Show More" listener
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        renderBatch(visibleCount, BATCH_SIZE);
      });
    }

    // Lightbox Controls
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

    // Close on backdrop click
    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
          closeLightbox();
        }
      });
    }

    // Keyboard support for Lightbox
    window.addEventListener('keydown', (e) => {
      if (!lightboxModal || lightboxModal.classList.contains('hidden')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      }
    });

    // Listen to language changes
    window.addEventListener('nnyps:lang-changed', () => {
      updateStatusAndShowMore();
      if (currentLightboxIndex >= 0) {
        updateLightboxContent();
      }
    });

    // Initial load from Hash or default 'all'
    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
  }

  // Boot when DOM is ready
  document.addEventListener('DOMContentLoaded', initGallery);
})();

