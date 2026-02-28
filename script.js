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
    loadingScreen.classList.remove('hidden'); // Pastikan loading screen terlihat
    
    // Sembunyikan iframe dulu
    iframe.classList.remove('loaded');
    
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
        console.log('Hiding loading screen after 3 seconds');
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
    
    // Tunggu tepat 3 detik, lalu sembunyikan loading screen
    setTimeout(hideLoading, 3000); // 3000ms = 3 detik
    
    // Tetap dengarkan event load jika iframe butuh waktu lebih dari 3 detik
    // Tapi kita tetap akan sembunyikan loading setelah 3 detik
    iframe.addEventListener('load', function() {
        console.log('Iframe loaded');
        // Tidak perlu lakukan apa-apa karena loading akan hilang dalam 3 detik
    });
    
    // Handle error
    iframe.addEventListener('error', function() {
        console.log('Iframe error');
    });
});

// Backup saat window load
window.addEventListener("load", function() {
    console.log('Window loaded');
    setIframeHeight();
});

// Handle jika pengguna melakukan refresh
window.addEventListener('beforeunload', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
});
