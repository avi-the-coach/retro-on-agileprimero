// Theme and language management
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    
    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = !document.documentElement.hasAttribute('data-theme');
            
            if (isDark) {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Simple home button functionality - hardcoded URLs
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Detect current language from URL
            const currentPath = window.location.pathname;
            let targetLang = 'en'; // default
            
            if (currentPath.includes('/he/')) {
                targetLang = 'he';
            } else if (currentPath.includes('/en/')) {
                targetLang = 'en';
            }
            
            // Always go to the correct base URL
            if (targetLang === 'he') {
                window.location.href = 'https://avi-the-coach.github.io/retro-on-agileprimero/he/';
            } else {
                window.location.href = 'https://avi-the-coach.github.io/retro-on-agileprimero/en/';
            }
        });
    }
    
    // Language toggle functionality - simplified
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPath = window.location.pathname;
            
            if (currentPath.includes('/en/')) {
                // Switch to Hebrew
                if (currentPath.includes('/articles/')) {
                    window.location.href = currentPath.replace('/en/', '/he/');
                } else {
                    window.location.href = 'https://avi-the-coach.github.io/retro-on-agileprimero/he/';
                }
            } else if (currentPath.includes('/he/')) {
                // Switch to English
                if (currentPath.includes('/articles/')) {
                    window.location.href = currentPath.replace('/he/', '/en/');
                } else {
                    window.location.href = 'https://avi-the-coach.github.io/retro-on-agileprimero/en/';
                }
            }
        });
    }
});