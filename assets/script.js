// Theme and language management
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Function to detect current language from URL
    function getCurrentLanguage() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/he/')) {
            return 'he';
        } else if (currentPath.includes('/en/')) {
            return 'en';
        } else {
            // Main page - default to English
            return 'en';
        }
    }
    
    // Function to update logo based on theme and language
    function updateLogo() {
        const logo = document.querySelector('.logo');
        if (logo) {
            const isLightTheme = document.documentElement.hasAttribute('data-theme');
            const language = getCurrentLanguage();
            const isSubpage = logo.src.includes('../assets/');
            const basePath = isSubpage ? '../assets/' : 'assets/';
            
            if (isLightTheme) {
                // Light theme: show black griffin on white background
                logo.src = `${basePath}black_griffin_white_bg_clean_${language}.png?v=16`;
            } else {
                // Dark theme: show white griffin on black background
                logo.src = `${basePath}white_griffin_black_bg_clean_${language}.png?v=16`;
            }
        }
    }
    
    // Apply saved theme and set correct icon
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '🌙'; // Show moon to indicate "click for dark theme"
    } else {
        if (themeToggle) themeToggle.textContent = '☀️'; // Show sun to indicate "click for light theme"
    }
    
    // Update logo on initial load
    updateLogo();
    
    // Theme toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isLightTheme = document.documentElement.hasAttribute('data-theme');
            
            if (isLightTheme) {
                // Currently light, switching to dark
                document.documentElement.removeAttribute('data-theme');
                themeToggle.textContent = '☀️'; // Show sun to indicate "click for light theme"
                localStorage.setItem('theme', 'dark');
            } else {
                // Currently dark, switching to light
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.textContent = '🌙'; // Show moon to indicate "click for dark theme"
                localStorage.setItem('theme', 'light');
            }
            
            // Update logo after theme change
            updateLogo();
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
EOF < /dev/null
