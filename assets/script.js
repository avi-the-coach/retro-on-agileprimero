// Smart State Management System for Retro Site
// Centralized theme + language + logo coordination via HTML data attributes

document.addEventListener('DOMContentLoaded', function() {
    
    // === STATE MANAGEMENT ===
    
    // Get saved preferences or defaults
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'he'; // Hebrew default
    
    // Apply initial state to HTML element
    function initializeState() {
        const html = document.documentElement;
        
        // Set theme
        if (savedTheme === 'light') {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme'); // Dark is default
        }
        
        // Set language
        html.setAttribute('data-lang', savedLang);
        
        // Set direction
        if (savedLang === 'he') {
            html.setAttribute('dir', 'rtl');
        } else {
            html.setAttribute('dir', 'ltr');
        }
        
        console.log(`Initialized: theme=${savedTheme}, lang=${savedLang}`);
    }
    
    // Apply state on page load
    initializeState();
    
    // === THEME TOGGLE ===
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const isLight = html.hasAttribute('data-theme');
            
            if (isLight) {
                // Switch to dark
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                console.log('Switched to dark theme');
            } else {
                // Switch to light  
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                console.log('Switched to light theme');
            }
        });
    }
    
    // === LANGUAGE TOGGLE ===
    
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const html = document.documentElement;
            const currentLang = html.getAttribute('data-lang');
            
            if (currentLang === 'he') {
                // Switch to English
                html.setAttribute('data-lang', 'en');
                html.setAttribute('dir', 'ltr');
                localStorage.setItem('language', 'en');
                console.log('Switched to English');
                
                // Navigate to English version if available
                navigateToLanguage('en');
                
            } else {
                // Switch to Hebrew
                html.setAttribute('data-lang', 'he');
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('language', 'he');
                console.log('Switched to Hebrew');
                
                // Navigate to Hebrew version if available
                navigateToLanguage('he');
            }
        });
    }
    
    // === SMART NAVIGATION ===
    
    function navigateToLanguage(targetLang) {
        const currentPath = window.location.pathname;
        
        // If we're on the main language selector page, don't navigate
        if (currentPath === '/' || currentPath === '/index.html') {
            return;
        }
        
        // Detect current language from path
        let newPath;
        if (currentPath.includes('/en/')) {
            newPath = currentPath.replace('/en/', `/${targetLang}/`);
        } else if (currentPath.includes('/he/')) {
            newPath = currentPath.replace('/he/', `/${targetLang}/`);
        } else {
            // We're probably on a language home page, go to target language home
            newPath = `/${targetLang}/`;
        }
        
        // Navigate to new language version
        window.location.href = newPath;
    }
    
    // === HOME BUTTON ===
    
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const html = document.documentElement;
            const currentLang = html.getAttribute('data-lang') || 'he';
            
            // Go to language home page
            window.location.href = `/${currentLang}/`;
        });
    }
    
    // === LOGO UPDATE SYSTEM ===
    
    // The logo updates automatically via CSS custom properties\!
    // No JavaScript needed - CSS handles all combinations:
    // [data-theme="dark"][data-lang="he"] → white_griffin_black_bg_clean_he.png
    // [data-theme="light"][data-lang="en"] → black_griffin_white_bg_clean_en.png
    // etc.
    
    function updateLogo() {
        // This function exists for debugging - CSS handles actual logo switching
        const html = document.documentElement;
        const theme = html.hasAttribute('data-theme') ? 'light' : 'dark';
        const lang = html.getAttribute('data-lang') || 'he';
        
        console.log(`Logo should be: ${theme} theme, ${lang} language`);
        
        // Expected logo file pattern:
        const expectedLogo = theme === 'dark' 
            ? `white_griffin_black_bg_clean_${lang}.png`
            : `black_griffin_white_bg_clean_${lang}.png`;
            
        console.log(`Expected logo file: ${expectedLogo}`);
    }
    
    // Debug logo on state changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-lang')) {
                updateLogo();
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'data-lang']
    });
    
    // Initial logo debug
    updateLogo();
    
    console.log('Smart state management system initialized');
});
EOF < /dev/null
