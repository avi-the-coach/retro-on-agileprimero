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
            if (currentPath.startsWith('/en/')) {
                newPath = currentPath.replace('/en/', '/he/');
            } else if (currentPath.startsWith('/he/')) {
                newPath = currentPath.replace('/he/', '/en/');
            } else {
                newPath = `/${newLang}/`;
            }
            
            window.location.href = newPath;
        });
    }
    
    // Auto-redirect from root based on preference
    if (window.location.pathname === '/' && currentLang !== 'selector') {
        // Only redirect if user has a preference and isn't explicitly choosing
        if (localStorage.getItem('preferred-language')) {
            window.location.href = `/${currentLang}/`;
        }
    }
});