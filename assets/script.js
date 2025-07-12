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
    
    // Home button functionality - using relative paths
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            const currentPath = window.location.pathname;
            
            // Simple relative navigation based on current location
            if (currentPath.includes('/articles/')) {
                // We're in an article, go up two levels then to language
                window.location.href = `../../${currentLang}/`;
            } else if (currentPath.includes('/en/') || currentPath.includes('/he/')) {
                // We're in a language home, stay in same language
                window.location.href = `./`;
            } else {
                // We're at root, go to language home
                window.location.href = `./${currentLang}/`;
            }
        });
    }
    
    // Language management
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    
    // Language toggle functionality
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPath = window.location.pathname;
            const newLang = currentLang === 'en' ? 'he' : 'en';
            
            // Store language preference
            localStorage.setItem('preferred-language', newLang);
            
            // Navigate to same article in different language using relative paths
            if (currentPath.includes('/articles/')) {
                // We're in an article
                if (currentPath.includes('/en/')) {
                    window.location.href = currentPath.replace('/en/', '/he/');
                } else if (currentPath.includes('/he/')) {
                    window.location.href = currentPath.replace('/he/', '/en/');
                }
            } else {
                // We're in language home
                window.location.href = `../${newLang}/`;
            }
        });
    }
    
    // Auto-redirect from root based on preference
    if (window.location.pathname.endsWith('/retro-on-agileprimero/') || window.location.pathname === '/retro-on-agileprimero') {
        // Only redirect if user has a preference and isn't explicitly choosing
        if (localStorage.getItem('preferred-language')) {
            window.location.href = `./${currentLang}/`;
        }
    }
});