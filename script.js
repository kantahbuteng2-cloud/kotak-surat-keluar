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
    loadingScreen.classList.remove('hidden');
    
    // Sembunyikan iframe dulu
    iframe.classList.remove('loaded');
    iframe.classList.remove('show');
    iframe.style.opacity = '0';
    
    // Force reload iframe untuk memastikan konten fresh
    const iframeSrc = iframe.src;
    iframe.src = 'about:blank'; // Reset iframe
    setTimeout(function() {
        iframe.src = iframeSrc; // Set kembali ke URL asli
    }, 100);
    
    // Progress bar animation (akan mencapai 100% dalam 3 detik)
    let progress = 0;
    const progressInterval = setInterval(function() {
        if (progress < 100) {
            progress += 1;
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }
    }, 30); // 30ms * 100 = 3000ms (3 detik)
    
    // Fungsi untuk menyembunyikan loading
    function hideLoading() {
        console.log('Hiding loading screen');
        clearInterval(progressInterval);
        
        // Set progress ke 100%
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Pastikan iframe memiliki src yang benar
        if (iframe.src === 'about:blank' || iframe.src === '') {
            iframe.src = 'https://script.google.com/macros/s/AKfycbxFKpZmja9bELcLfD0WXZuIwQ2jKoEoCAwulet4EYyOvOtRjvd-_vSuAwlwXVsaPgBZ6Q/exec';
        }
        
        // Beri sedikit waktu untuk iframe memuat konten
        setTimeout(function() {
            // Tampilkan iframe
            iframe.classList.add('loaded');
            iframe.classList.add('show');
            iframe.style.opacity = '1';
            
            // Sembunyikan loading screen
            loadingScreen.classList.add('hidden');
            
            // Setelah animasi selesai, pastikan iframe terlihat
            setTimeout(function() {
                document.body.style.overflow = 'auto';
                
                // Force repaint untuk memastikan iframe tampil
                iframe.style.display = 'none';
                iframe.offsetHeight; // Trigger reflow
                iframe.style.display = 'block';
            }, 500);
        }, 200);
    }
    
    // Tunggu 3 detik, lalu sembunyikan loading screen
    setTimeout(hideLoading, 3000);
    
    // Event listener untuk iframe load
    iframe.addEventListener('load', function() {
        console.log('Iframe loaded event fired');
        
        // Jika iframe sudah siap sebelum 3 detik, tetap tunggu sampai 3 detik
        // Tapi pastikan iframe siap ditampilkan
        iframe.setAttribute('data-loaded', 'true');
    });
    
    // Handle error
    iframe.addEventListener('error', function() {
        console.log('Iframe error');
    });
    
    // Cek secara berkala apakah iframe memiliki konten
    const contentCheckInterval = setInterval(function() {
        try {
            // Coba cek apakah iframe sudah memiliki konten
            if (iframe.contentDocument && iframe.contentDocument.body) {
                const bodyContent = iframe.contentDocument.body.innerHTML;
                if (bodyContent && bodyContent.length > 0) {
                    console.log('Iframe has content');
                    
                    // Jika iframe sudah memiliki konten dan loading masih tampil
                    if (!loadingScreen.classList.contains('hidden')) {
                        // Tandai bahwa iframe sudah siap
                        iframe.setAttribute('data-ready', 'true');
                    }
                    
                    clearInterval(contentCheckInterval);
                }
            }
        } catch (e) {
            // Cross-origin error, ignore
            console.log('Cannot access iframe content (cross-origin)');
        }
    }, 500);
});

// Backup saat window load
window.addEventListener("load", function() {
    console.log('Window loaded');
    setIframeHeight();
    
    const iframe = document.getElementById("sipenaFrame");
    const loadingScreen = document.getElementById("loadingScreen");
    
    // Jika loading screen masih ada setelah window load, sembunyikan
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        setTimeout(function() {
            iframe.classList.add('loaded');
            iframe.classList.add('show');
            iframe.style.opacity = '1';
            loadingScreen.classList.add('hidden');
        }, 3000);
    }
});

// Handle jika pengguna melakukan refresh
window.addEventListener('beforeunload', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
});

// Tambahan: Pastikan iframe tampil setelah semua resource dimuat
window.addEventListener('pageshow', function() {
    const iframe = document.getElementById("sipenaFrame");
    const loadingScreen = document.getElementById("loadingScreen");
    
    if (loadingScreen && loadingScreen.classList.contains('hidden')) {
        iframe.classList.add('loaded');
        iframe.classList.add('show');
        iframe.style.opacity = '1';
    }
});
