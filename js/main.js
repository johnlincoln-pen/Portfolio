// Light / dark theme toggle.
// The chosen theme is saved in the browser so it is remembered next visit.

const root = document.documentElement;
const button = document.getElementById('theme-toggle');
const label = document.getElementById('theme-label');

// Is the page currently dark? Checks the saved choice first, then the device setting.
function isDark() {
  const chosen = root.getAttribute('data-theme');
  if (chosen) return chosen === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// The label always names the theme you will switch TO. The bulb icon stays
// put and just lights up or dims (handled in CSS) to match the current theme.
function updateButtonLabel() {
  label.textContent = isDark() ? 'Light mode' : 'Dark mode';
}

// Restore the saved theme (storage can be blocked, so it is wrapped in try/catch).
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
} catch (error) {}
updateButtonLabel();

// Switch theme when the button is clicked.
button.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (error) {}
  updateButtonLabel();
});
