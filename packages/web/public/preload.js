// @ts-check

/**
 * @typedef {{
 *  theme?: Theme,
 * }} Preferences
 */

(function () {
  window.__setTheme = function (theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove'](
      'bp3-dark'
    );
  };

  /** @type {Preferences}} */
  var preferences = {};

  window.__setTheme(preferences['theme'] || 'dark');

  function setViewHeightVariable() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }
  setViewHeightVariable();
  window.addEventListener('resize', setViewHeightVariable);

  // https://stackoverflow.com/a/13382873
  function getScrollbarWidth() {
    // Creating invisible container
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    var inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode && outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  window.addEventListener('load', function () {
    if (getScrollbarWidth()) {
      document.documentElement.setAttribute('custom-scrollbar', '');
    }
  });
})();
