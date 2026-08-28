(function () {
  'use strict';

  const contentEl = document.getElementById('content');

  marked.use({ gfm: true, breaks: false, pedantic: false });

  async function loadContent() {
    try {
      const response = await fetch('content/en.md');
      if (!response.ok) throw new Error('HTTP ' + response.status);

      contentEl.innerHTML = marked.parse(await response.text());
      decoratePaperLinks();
      decorateSectionHeadings();
    } catch (error) {
      console.error('[homepage] Failed to load content:', error);
      contentEl.innerHTML =
        '<p class="content__error">The page content could not be loaded. ' +
        'Please open this site through a web server.</p>';
    }
  }

  function decoratePaperLinks() {
    contentEl.querySelectorAll('a').forEach(function (link) {
      if (link.textContent.trim() === 'Paper') {
        link.classList.add('paper-link');
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  function decorateSectionHeadings() {
    const icons = {
      Publications: '<svg viewBox="0 0 24 24"><path d="M6 3.5h8l4 4V20.5H6z"></path><path d="M14 3.5v4h4M9 12h6M9 16h6"></path></svg>',
      'Professional Experience': '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="1"></rect><path d="M8 7V5h8v2M3 12h18M10 12v2h4v-2"></path></svg>',
      Services: '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"></circle><path d="M6.5 20c.6-4 2.4-6 5.5-6s4.9 2 5.5 6M5.5 9.5a2.5 2.5 0 1 1 0-5M18.5 9.5a2.5 2.5 0 1 0 0-5M3 18c.2-2.5 1.1-4.2 2.9-5M21 18c-.2-2.5-1.1-4.2-2.9-5"></path></svg>',
      Awards: '<svg viewBox="0 0 24 24"><path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a4 4 0 0 0 3 3.9M17 6h3v1a4 4 0 0 1-3 3.9M12 14v4M8.5 21h7M9 18h6"></path></svg>',
    };

    contentEl.querySelectorAll('h2').forEach(function (heading) {
      const icon = icons[heading.textContent.trim()];
      if (icon) heading.insertAdjacentHTML('afterbegin', '<span class="section-icon" aria-hidden="true">' + icon + '</span>');
    });
  }

  loadContent();
})();
