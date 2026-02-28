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
    
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    
    // Set tinggi iframe
    setIframeHeight();
    
    // Pastikan loading screen terlihat di atas
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('hidden');
    loadingScreen.style.opacity = '1';
    loadingScreen.style.visibility = 'visible';
    
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
        
        // Sembunyikan loading screen dengan animasi
        loadingScreen.classList.add('hidden');
        
        // Setelah loading screen hilang, iframe sudah siap di belakang
        setTimeout(function() {
            document.body.style.overflow = 'auto';
        }, 500);
    }
    
    // Tunggu tepat 3 detik, lalu sembunyikan loading screen
    setTimeout(hideLoading, 3000);
    
    // Optional: Jika iframe sudah siap sebelum 3 detik, 
    // kita tetap tunggu sampai 3 detik untuk pengalaman yang konsisten
    iframe.addEventListener('load', function() {
        console.log('Iframe loaded early');
        // Tidak perlu melakukan apa-apa, loading tetap akan hilang dalam 3 detik
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
        loadingScreen.style.opacity = '1';
        loadingScreen.style.visibility = 'visible';
    }
});
