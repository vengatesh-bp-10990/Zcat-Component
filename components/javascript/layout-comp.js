import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class LayoutComp extends Component {
  constructor() {
    super();
  }

  didConnect() {
    let node = this.$node;

    // ---------- Smooth Accordion Toggle ----------
    let groupHeaders = node.querySelectorAll('[data-action="toggleGroup"]');
    groupHeaders.forEach(function(header) {
      header.addEventListener('click', function() {
        let group = header.closest('.zcat-sidebar-group');
        if (!group) { return; }
        let body = group.querySelector('.zcat-sidebar-group-body');
        if (!body) { return; }

        if (group.classList.contains('collapsed')) {
          group.classList.remove('collapsed');
          body.style.maxHeight = body.scrollHeight + 'px';
          setTimeout(function() { body.style.maxHeight = 'none'; }, 300);
        } else {
          body.style.maxHeight = body.scrollHeight + 'px';
          body.offsetHeight;
          body.style.maxHeight = '0px';
          group.classList.add('collapsed');
        }
      });
    });

    // Initialize: set max-height for expanded groups
    node.querySelectorAll('.zcat-sidebar-group:not(.collapsed) .zcat-sidebar-group-body').forEach(function(body) {
      body.style.maxHeight = 'none';
    });

    // ---------- Active Sidebar Item + Breadcrumb ----------
    let breadcrumb = node.querySelector('[data-breadcrumb-title]');
    function updateActiveItem() {
      let hash = window.location.hash || '#/overview';
      let items = node.querySelectorAll('.zcat-sidebar-item');
      items.forEach(function(item) {
        item.classList.remove('active');
        if (item.getAttribute('href') === hash) {
          item.classList.add('active');
          let label = item.querySelector('span:not(.zcat-sidebar-item-dot):not(.zcat-badge-new):not(.zcat-badge-stable):not(.zcat-sidebar-item-icon)');
          if (breadcrumb && label) {
            breadcrumb.textContent = label.textContent;
          }
          let parentGroup = item.closest('.zcat-sidebar-group');
          if (parentGroup && parentGroup.classList.contains('collapsed')) {
            parentGroup.classList.remove('collapsed');
            let body = parentGroup.querySelector('.zcat-sidebar-group-body');
            if (body) { body.style.maxHeight = 'none'; }
          }
        }
      });
    }
    updateActiveItem();
    window.addEventListener('hashchange', updateActiveItem);

    // ---------- Sidebar Search ----------
    let searchInput = node.querySelector('[data-action="sidebarSearch"]');
    let kbdHint = node.querySelector('.zcat-sidebar-search-kbd');
    if (searchInput) {
      // Hide kbd hint on focus, show on blur
      searchInput.addEventListener('focus', function() {
        if (kbdHint) { kbdHint.style.display = 'none'; }
      });
      searchInput.addEventListener('blur', function() {
        if (kbdHint && !searchInput.value) { kbdHint.style.display = ''; }
      });

      searchInput.addEventListener('input', function(e) {
        let query = e.target.value.toLowerCase().trim();
        let allItems = node.querySelectorAll('.zcat-sidebar-item');
        let groups = node.querySelectorAll('.zcat-sidebar-group');

        if (!query) {
          allItems.forEach(function(item) { item.style.display = ''; });
          groups.forEach(function(g) { g.style.display = ''; });
          node.querySelectorAll('.zcat-sidebar-group-title').forEach(function(t) { t.style.display = ''; });
          return;
        }

        allItems.forEach(function(item) {
          let label = (item.getAttribute('data-search-label') || '').toLowerCase();
          let text = (item.textContent || '').toLowerCase();
          if (label.indexOf(query) !== -1 || text.indexOf(query) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });

        groups.forEach(function(g) {
          let visibleItems = g.querySelectorAll('.zcat-sidebar-item:not([style*="display: none"])');
          if (visibleItems.length === 0) {
            g.style.display = 'none';
          } else {
            g.style.display = '';
            if (g.classList.contains('collapsed')) {
              g.classList.remove('collapsed');
              let body = g.querySelector('.zcat-sidebar-group-body');
              if (body) { body.style.maxHeight = 'none'; }
            }
          }
        });
      });

      // Escape to clear search
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
          searchInput.blur();
        }
        // Enter to navigate to first visible item
        if (e.key === 'Enter') {
          let firstVisible = node.querySelector('.zcat-sidebar-item:not([style*="display: none"])');
          if (firstVisible) {
            firstVisible.click();
            window.location.hash = firstVisible.getAttribute('href');
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
          }
        }
      });
    }

    // ---------- Cmd+K Global Shortcut ----------
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    // ---------- Dark / Light Theme Toggle ----------
    let themeToggle = node.querySelector('[data-action="toggleTheme"]');
    if (themeToggle) {
      themeToggle.addEventListener('change', function(e) {
        let isDark = e.target.checked;
        if (isDark) {
          document.documentElement.setAttribute('data-user-color-scheme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-user-color-scheme');
        }
      });
    }

    // ---------- Font Switcher ----------
    let fontSelect = node.querySelector('[data-action="changeFont"]');
    if (fontSelect) {
      fontSelect.addEventListener('change', function(e) {
        let val = e.target.value;
        if (val === 'inter') {
          document.documentElement.style.setProperty('--zcat-font-family-primary', "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
        } else {
          document.documentElement.style.setProperty('--zcat-font-family-primary', "'Zoho Puvi', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
        }
      });
    }

    // ---------- Page transition animation ----------
    let outlet = node.querySelector('#page-outlet');
    if (outlet) {
      window.addEventListener('hashchange', function() {
        outlet.classList.remove('zcat-page-enter');
        void outlet.offsetWidth;
        outlet.classList.add('zcat-page-enter');
      });
      outlet.classList.add('zcat-page-enter');
    }

    // ---------- Global Toast System ----------
    let toastContainer = node.querySelector('[data-toast-container]');
    window.__zcatToast = function(message, type) {
      if (!toastContainer) { return; }
      let toast = document.createElement('div');
      toast.className = 'zcat-toast' + (type ? ' zcat-toast-' + type : '');
      let iconSvg = '';
      if (type === 'success') {
        iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      } else {
        iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      }
      toast.innerHTML = iconSvg + '<span>' + message + '</span>';
      toastContainer.appendChild(toast);
      // Trigger entrance animation
      void toast.offsetWidth;
      toast.classList.add('zcat-toast-show');
      setTimeout(function() {
        toast.classList.remove('zcat-toast-show');
        toast.classList.add('zcat-toast-hide');
        setTimeout(function() { toast.remove(); }, 300);
      }, 2500);
    };
  }

  data() {
    return {};
  }

  static methods() { return {}; }
  static actions() { return {}; }
  static observers() { return {}; }
}

export { LayoutComp };
