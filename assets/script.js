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
    
    // Home button functionality
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferred-language') || 'en';
            
            // Get the base path (should be /retro-on-agileprimero)
            const currentPath = window.location.pathname;
            let basePath = '/retro-on-agileprimero';
            
            // If we're in a subdirectory, extract the base
            if (currentPath.includes('/retro-on-agileprimero/')) {
                const parts = currentPath.split('/retro-on-agileprimero/');
                basePath = parts[0] + '/retro-on-agileprimero';
            }
            
            // Navigate to language home
            window.location.href = `${basePath}/${currentLang}/`;
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
            
            // Navigate to same article in different language
            let newPath;
            if (currentPath.includes('/en/')) {
                newPath = currentPath.replace('/en/', '/he/');
            } else if (currentPath.includes('/he/')) {
                newPath = currentPath.replace('/he/', '/en/');
            } else {
                // From root, go to language home
                let basePath = '/retro-on-agileprimero';
                if (currentPath.includes('/retro-on-agileprimero/')) {
                    const parts = currentPath.split('/retro-on-agileprimero/');
                    basePath = parts[0] + '/retro-on-agileprimero';
                }
                newPath = `${basePath}/${newLang}/`;
            }
            
            window.location.href = newPath;
        });
    }
    
    // Auto-redirect from root based on preference
    if (window.location.pathname.endsWith('/retro-on-agileprimero/') || window.location.pathname === '/retro-on-agileprimero') {
        // Only redirect if user has a preference and isn't explicitly choosing
        if (localStorage.getItem('preferred-language')) {
            const basePath = window.location.pathname.replace(/\/$/, '');
            window.location.href = `${basePath}/${currentLang}/`;
        }
    }
});