// Fungsi untuk mengatur tinggi iframe
function setIframeHeight() {
    const iframe = document.getElementById("sipenaFrame");
    if (iframe) {
        iframe.style.height = window.innerHeight + "px";
    }
}

// Event listener untuk resize window
window.addEventListener("resize", setIframeHeight);

// Fungsi untuk menangani loading screen
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('sipenaFrame');
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    
    // Set tinggi iframe saat pertama kali load
    setIframeHeight();
    
    // Fungsi untuk menyembunyikan loading screen
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        iframe.classList.add('loaded');
        
        // Memungkinkan scrolling setelah iframe loaded
        document.body.style.overflow = 'auto';
    }
    
    // Progress bar manual
    let progress = 0;
    const interval = setInterval(function() {
        if (progress < 90 && loadingScreen && !loadingScreen.classList.contains('hidden')) {
            progress += 1;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        } else {
            clearInterval(interval);
        }
    }, 100);
    
    // Cek jika iframe sudah siap
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        hideLoadingScreen();
        clearInterval(interval);
    } else {
        // Event listener untuk ketika iframe selesai loading
        iframe.addEventListener('load', function() {
            // Delay kecil untuk memastikan konten benar-benar tampil
            setTimeout(function() {
                hideLoadingScreen();
                clearInterval(interval);
                
                // Set progress ke 100% saat selesai
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            }, 500);
        });
        
        // Fallback: jika iframe tidak kunjung load dalam 10 detik
        setTimeout(function() {
            if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
                hideLoadingScreen();
                clearInterval(interval);
            }
        }, 10000);
    }
});

// Backup: panggil setIframeHeight saat window sudah selesai loading
window.addEventListener("load", function() {
    setIframeHeight();
    
    // Tambahan untuk memastikan iframe terlihat dengan benar
    const iframe = document.getElementById("sipenaFrame");
    if (iframe) {
        // Jika ada masalah dengan loading screen, pastikan iframe tetap muncul
        setTimeout(function() {
            iframe.classList.add('loaded');
        }, 1000);
    }
});
