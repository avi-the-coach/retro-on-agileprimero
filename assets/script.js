// Smart State Management System for Retro Site
// Centralized theme + language + logo coordination via HTML data attributes

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing smart state management...');
    
    // === STATE MANAGEMENT ===
    
    // Get saved preferences or defaults
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('language') || 'he'; // Hebrew default
    
    console.log(`Saved preferences: theme=${savedTheme}, lang=${savedLang}`);
    
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
        
        // Update logo immediately
        updateLogo();
        
        console.log(`Initialized: theme=${savedTheme}, lang=${savedLang}`);
    }
    
    // Apply state on page load
    initializeState();
    
    // === SMART LOGO SYSTEM ===
    
    function updateLogo() {
        const html = document.documentElement;
        const theme = html.hasAttribute('data-theme') ? 'light' : 'dark';
        const lang = html.getAttribute('data-lang') || 'he';
        
        const logo = document.querySelector('.logo');
        if (logo) {
            // Determine correct logo file
            let logoFile;
            if (theme === 'dark') {
                logoFile = lang === 'he' 
                    ? 'white_griffin_black_bg_clean_he.png'
                    : 'white_griffin_black_bg_clean_en.png';
            } else {
                logoFile = lang === 'he'
                    ? 'black_griffin_white_bg_clean_he.png' 
                    : 'black_griffin_white_bg_clean_en.png';
            }
            
            // Determine path based on current location
            const currentPath = window.location.pathname;
            let assetPath;
            
            if (currentPath === '/' || currentPath === '/index.html') {
                assetPath = 'assets/';
            } else if (currentPath.includes('/articles/')) {
                assetPath = '../../../assets/';
            } else {
                assetPath = '../assets/';
            }
            
            // Update logo source with cache busting
            const newSrc = `${assetPath}${logoFile}?v=18`;
            if (logo.src \!== newSrc) {
                logo.src = newSrc;
                console.log(`Logo updated: ${logoFile} (theme: ${theme}, lang: ${lang})`);
            }
        } else {
            console.log('No logo element found');
        }
    }
    
    // === THEME TOGGLE ===
    
    const themeToggle = document.getElementById('theme-toggle');
    console.log('Theme toggle element:', themeToggle);
    
    if (themeToggle) {
        console.log('Theme toggle found, adding event listener');
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked\!');
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
            
            // Update logo after theme change
            updateLogo();
        });
    } else {
        console.error('Theme toggle button not found\!');
    }
    
    // === LANGUAGE TOGGLE ===
    
    const languageToggle = document.getElementById('language-toggle');
    console.log('Language toggle element:', languageToggle);
    
    if (languageToggle) {
        console.log('Language toggle found, adding event listener');
        languageToggle.addEventListener('click', function() {
            console.log('Language toggle clicked\!');
            const html = document.documentElement;
            const currentLang = html.getAttribute('data-lang');
            
            if (currentLang === 'he') {
                // Switch to English
                html.setAttribute('data-lang', 'en');
                html.setAttribute('dir', 'ltr');
                localStorage.setItem('language', 'en');
                console.log('Switched to English');
                
                // Update logo immediately
                updateLogo();
                
                // Navigate to English version if available
                setTimeout(() => navigateToLanguage('en'), 100);
                
            } else {
                // Switch to Hebrew
                html.setAttribute('data-lang', 'he');
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('language', 'he');
                console.log('Switched to Hebrew');
                
                // Update logo immediately
                updateLogo();
                
                // Navigate to Hebrew version if available
                setTimeout(() => navigateToLanguage('he'), 100);
            }
        });
    } else {
        console.error('Language toggle button not found\!');
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
    
    // === OBSERVE STATE CHANGES ===
    
    // Watch for manual attribute changes and update logo accordingly
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdateLogo = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-lang')) {
                shouldUpdateLogo = true;
            }
        });
        
        if (shouldUpdateLogo) {
            updateLogo();
        }
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'data-lang']
    });
    
    console.log('Smart state management system initialized successfully');
});
EOF < /dev/null
