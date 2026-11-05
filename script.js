/* ==========================================================================
   Unicorn Studio Background
   --------------------------------------------------------------------------
   Carrega a animacao externa usada no hero/background quando o objeto global
   ainda nao existe.
   ========================================================================== */

(function loadUnicornStudio() {
  if (window.UnicornStudio) return;

  window.UnicornStudio = {
    isInitialized: false
  };

  const script = document.createElement('script');

  script.src =
    'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';

  script.onload = function initUnicornStudio() {
    if (window.UnicornStudio.isInitialized) return;

    UnicornStudio.init();
    window.UnicornStudio.isInitialized = true;
  };

  (document.head || document.body).appendChild(script);
})();

/* ==========================================================================
   Mobile Menu
   --------------------------------------------------------------------------
   Alterna o painel de navegacao em telas pequenas.
   ========================================================================== */

(function setupMobileMenu() {
  const button = document.querySelector('[data-menu-toggle]');
  const panel = document.querySelector('[data-menu-panel]');

  if (!button || !panel) return;

  button.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });
})();

/* ==========================================================================
   Letter Reveal
   --------------------------------------------------------------------------
   Aplica o pequeno atraso visual nas palavras marcadas com data-letter.
   ========================================================================== */

(function setupLetterReveal() {
  const letters = document.querySelectorAll('[data-letter]');

  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.transform = 'translateY(0)';
      letter.style.opacity = '1';
    }, 120 + index * 120);
  });
})();

/* ==========================================================================
   Dynamic Year
   --------------------------------------------------------------------------
   Atualiza automaticamente o ano exibido no rodape/CTA.
   ========================================================================== */

(function setupDynamicYear() {
  const year = document.getElementById('year');

  if (!year) return;

  year.textContent = new Date().getFullYear();
})();

/* ==========================================================================
   Lucide Icons
   --------------------------------------------------------------------------
   Renderiza icones Lucide com espessura de linha consistente.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.lucide || typeof lucide.createIcons !== 'function') return;

  lucide.createIcons({
    attrs: {
      'stroke-width': 1.5
    }
  });
});

/* ==========================================================================
   Image Fallback
   --------------------------------------------------------------------------
   Substitui imagens quebradas por alternativas remotas ja definidas no export.
   ========================================================================== */

(function setupImageFallback() {
  const fallbackImages = [
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp'
  ];

  const replacedSources = new Set();

  function getFallbackImage(source) {
    let hash = 0;

    for (let index = 0; index < source.length; index += 1) {
      hash = ((hash << 5) - hash + source.charCodeAt(index)) | 0;
    }

    return fallbackImages[Math.abs(hash) % fallbackImages.length];
  }

  function replaceBrokenImage(image) {
    const source = image.src;

    if (!source || replacedSources.has(source)) return;

    replacedSources.add(source);
    image.src = getFallbackImage(source);
  }

  function checkLoadedImages() {
    document.querySelectorAll('img').forEach((image) => {
      if (image.complete && !image.naturalWidth && image.src) {
        replaceBrokenImage(image);
      }
    });
  }

  window.addEventListener(
    'error',
    (event) => {
      const target = event.target;

      if (target && target.tagName === 'IMG') {
        replaceBrokenImage(target);
      }
    },
    true
  );

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkLoadedImages);
  } else {
    checkLoadedImages();
  }
})();
