// Fungsi untuk mengatur tinggi iframe
function setIframeHeight() {
    const iframe = document.getElementById("sipenaFrame");
    if (iframe) {
        iframe.style.height = window.innerHeight + "px";
    }
}

// Event listener untuk resize window
window.addEventListener("resize", setIframeHeight);

// Fungsi utama untuk menangani loading
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const iframe = document.getElementById('sipenaFrame');
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    
    // Set tinggi iframe
    setIframeHeight();
    
    // Tampilkan loading screen
    loadingScreen.style.display = 'flex';
    
    // Progress bar animation
    let progress = 0;
    const progressInterval = setInterval(function() {
        if (progress < 90) {
            progress += 1;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }
    }, 50);
    
    // Fungsi untuk menyembunyikan loading
    function hideLoading() {
        console.log('Hiding loading screen');
        clearInterval(progressInterval);
        
        // Set progress ke 100%
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Sembunyikan loading screen
        loadingScreen.classList.add('hidden');
        iframe.classList.add('loaded');
        
        // Setelah animasi selesai, pastikan iframe terlihat
        setTimeout(function() {
            document.body.style.overflow = 'auto';
        }, 500);
    }
    
    // Cek apakah iframe sudah siap
    function checkIframe() {
        try {
            // Coba akses contentWindow
            if (iframe.contentWindow) {
                // Cek apakah konten sudah dimuat
                if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                    hideLoading();
                    return true;
                }
            }
        } catch (e) {
            console.log('Cannot access iframe content (cross-origin), using load event');
        }
        return false;
    }
    
    // Coba cek langsung
    if (!checkIframe()) {
        // Jika belum siap, tunggu event load
        iframe.addEventListener('load', function() {
            console.log('Iframe loaded');
            setTimeout(hideLoading, 500); // Delay kecil untuk memastikan rendering
        });
        
        // Tambahkan event untuk error
        iframe.addEventListener('error', function() {
            console.log('Iframe error');
            setTimeout(hideLoading, 2000); // Tetap sembunyikan meskipun error
        });
    }
    
    // Fallback: jika terlalu lama, tetap sembunyikan loading
    setTimeout(function() {
        if (!loadingScreen.classList.contains('hidden')) {
            console.log('Fallback: forcing hide loading');
            hideLoading();
        }
    }, 8000); // 8 detik fallback
    
    // Tambahan: cek setiap 500ms untuk iframe yang sudah siap
    const checkInterval = setInterval(function() {
        if (!loadingScreen.classList.contains('hidden')) {
            if (checkIframe()) {
                clearInterval(checkInterval);
            }
        } else {
            clearInterval(checkInterval);
        }
    }, 500);
});

// Backup saat window load
window.addEventListener("load", function() {
    console.log('Window loaded');
    setIframeHeight();
    
    // Pastikan iframe memiliki class loaded jika loading screen sudah hidden
    const iframe = document.getElementById("sipenaFrame");
    const loadingScreen = document.getElementById("loadingScreen");
    
    if (loadingScreen && loadingScreen.classList.contains('hidden')) {
        iframe.classList.add('loaded');
    }
});

// Handle jika pengguna melakukan refresh
window.addEventListener('beforeunload', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
});
