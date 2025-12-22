const scrollBtn = document.getElementById('scroll-to-top');

// Show button when scrolled down
window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

// Scroll to top when clicked
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Function to get system preference
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || getSystemTheme();

    body.classList.remove('light', 'dark');
    body.classList.add(currentTheme);
    updateIcon(currentTheme);

    // Listen for system theme changes (only if user hasn't manually set a preference)
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemThemeQuery.addEventListener('change', function(e) {
        // Only auto-switch if user hasn't saved a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.classList.remove('light', 'dark');
            body.classList.add(newTheme);
            updateIcon(newTheme);
        }
    });

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add('light');
            localStorage.setItem('theme', 'light');
            updateIcon('light');
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateIcon('dark');
        }
    });

    // Update icon based on theme
    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️'; // Show sun when in dark mode
        } else {
            themeIcon.textContent = '🌙'; // Show moon when in light mode
        }
    }
});