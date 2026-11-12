/**
 * Main JavaScript for Nav Nirman Yuva Prerna Samiti (NNYPS)
 * Handles:
 * - Bilingual Language Toggle (Hindi default, persisted via localStorage)
 * - Mobile Navigation Menu & Accessibility
 * - Dynamic page state synchronization
 */

(function () {
  'use strict';

  // Storage key for selected language
  const STORAGE_KEY = 'nnyps_lang';
  const DEFAULT_LANG = 'hi';

  // Get current language from localStorage or default to Hindi
  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  // Apply language across all elements with data-hi and data-en attributes
  function setLanguage(lang) {
    const isHindi = lang === 'hi';
    const targetLang = isHindi ? 'hi' : 'en';

    // 1. Update document lang attribute
    document.documentElement.lang = targetLang;

    // 2. Update text content
    const translatableElements = document.querySelectorAll('[data-hi][data-en]');
    translatableElements.forEach((el) => {
      const text = isHindi ? el.getAttribute('data-hi') : el.getAttribute('data-en');
      if (text !== null) {
        // Use innerHTML if text contains markup (like spans), otherwise textContent
        if (text.includes('<') && text.includes('>')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // 3. Update input placeholders
    const placeholderElements = document.querySelectorAll('[data-hi-placeholder][data-en-placeholder]');
    placeholderElements.forEach((el) => {
      const ph = isHindi ? el.getAttribute('data-hi-placeholder') : el.getAttribute('data-en-placeholder');
      if (ph !== null) {
        el.setAttribute('placeholder', ph);
      }
    });

    // 4. Update image alt tags
    const altElements = document.querySelectorAll('[data-hi-alt][data-en-alt]');
    altElements.forEach((el) => {
      const altText = isHindi ? el.getAttribute('data-hi-alt') : el.getAttribute('data-en-alt');
      if (altText !== null) {
        el.setAttribute('alt', altText);
      }
    });

    // 5. Update aria-labels
    const ariaElements = document.querySelectorAll('[data-hi-aria][data-en-aria]');
    ariaElements.forEach((el) => {
      const aria = isHindi ? el.getAttribute('data-hi-aria') : el.getAttribute('data-en-aria');
      if (aria !== null) {
        el.setAttribute('aria-label', aria);
      }
    });

    // 6. Update language toggle buttons visual active indicator
    const btnHiList = document.querySelectorAll('.lang-btn-hi');
    const btnEnList = document.querySelectorAll('.lang-btn-en');

    btnHiList.forEach((btn) => {
      if (isHindi) {
        btn.classList.add('bg-orange-600', 'text-white', 'shadow-sm');
        btn.classList.remove('text-stone-700', 'hover:bg-orange-50');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-orange-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-stone-700', 'hover:bg-orange-50');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    btnEnList.forEach((btn) => {
      if (!isHindi) {
        btn.classList.add('bg-orange-600', 'text-white', 'shadow-sm');
        btn.classList.remove('text-stone-700', 'hover:bg-orange-50');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-orange-600', 'text-white', 'shadow-sm');
        btn.classList.add('text-stone-700', 'hover:bg-orange-50');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Save to storage
    localStorage.setItem(STORAGE_KEY, targetLang);

    // Dispatch global custom event for components like the gallery
    window.dispatchEvent(new CustomEvent('nnyps:lang-changed', { detail: { lang: targetLang } }));
  }

  // Initialize Language Switcher Buttons
  function initLanguageSwitcher() {
    const btnHiList = document.querySelectorAll('.lang-btn-hi');
    const btnEnList = document.querySelectorAll('.lang-btn-en');

    btnHiList.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('hi');
      });
    });

    btnEnList.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage('en');
      });
    });

    // Apply stored or default language on boot
    setLanguage(getCurrentLang());
  }

  // Initialize Mobile Hamburger Navigation Menu
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking navigation links inside mobile menu
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Expose helper on window for external scripts
  window.NNYPS = {
    getLanguage: getCurrentLang,
    setLanguage: setLanguage
  };

  // Run on DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initMobileMenu();
  });
})();

