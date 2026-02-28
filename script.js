// Fungsi untuk mengatur tinggi iframe
function setIframeHeight() {
    const iframe = document.getElementById("sipenaFrame");
    if (iframe) {
        iframe.style.height = window.innerHeight + "px";
    }
}

// Event listener untuk resize window
window.addEventListener("resize", setIframeHeight);
window.addEventListener("load", setIframeHeight);

// Fungsi utama loading screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const typingText = document.getElementById('typingText');
    
    // Set tinggi iframe
    setIframeHeight();
    
    // Typing effect
    const texts = [
        "Menyiapkan halaman...",
        "Memuat data surat...",
        "Hampir selesai..."
    ];
    let textIndex = 0;
    
    function typeText() {
        const text = texts[textIndex];
        let charIndex = 0;
        
        function type() {
            if (charIndex < text.length) {
                typingText.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typingText.textContent = text.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }
        
        type();
    }
    
    // Mulai typing effect
    typeText();
    
    // Progress bar animation
    let progress = 0;
    const progressInterval = setInterval(function() {
        if (progress < 100) {
            progress += 1;
            progressBar.style.width = progress + '%';
            progressPercentage.textContent = progress + '%';
        }
    }, 30); // 30ms * 100 = 3000ms (3 detik)
    
    // Hilangkan loading screen setelah 3 detik
    setTimeout(function() {
        clearInterval(progressInterval);
        
        // Set ke 100%
        progressBar.style.width = '100%';
        progressPercentage.textContent = '100%';
        
        // Sembunyikan loading screen dengan animasi
        loadingScreen.classList.add('hidden');
        
        // Aktifkan scrolling
        setTimeout(function() {
            document.body.style.overflow = 'auto';
        }, 800);
    }, 3000);
});

// Backup jika ada masalah
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(function() {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 4000);
});
