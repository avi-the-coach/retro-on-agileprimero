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
    
    // Home button functionality - construct absolute URL
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            
            // Build the correct absolute URL
            const baseUrl = 'https://avi-the-coach.github.io/retro-on-agileprimero';
            window.location.href = `${baseUrl}/${currentLang}/`;
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
            
            // Build absolute URL for language switch
            const baseUrl = 'https://avi-the-coach.github.io/retro-on-agileprimero';
            
            if (currentPath.includes('/articles/')) {
                // Extract article path and switch language
                const articleMatch = currentPath.match(/\/articles\/(.+)$/);
                if (articleMatch) {
                    window.location.href = `${baseUrl}/${newLang}/articles/${articleMatch[1]}`;
                } else {
                    window.location.href = `${baseUrl}/${newLang}/`;
                }
            } else {
                // Go to language home
                window.location.href = `${baseUrl}/${newLang}/`;
            }
        });
    }
    
    // Auto-redirect from root based on preference - only if no language preference set yet
    if (window.location.pathname.endsWith('/retro-on-agileprimero/') || 
        window.location.pathname === '/retro-on-agileprimero') {
        if (localStorage.getItem('preferred-language')) {
            const baseUrl = 'https://avi-the-coach.github.io/retro-on-agileprimero';
            window.location.href = `${baseUrl}/${currentLang}/`;
        }
    }
});