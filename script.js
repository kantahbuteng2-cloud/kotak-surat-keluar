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
    console.log('DOM loaded - Memulai loading screen');
    
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Set tinggi iframe
    setIframeHeight();
    
    // Pastikan loading screen terlihat
    loadingScreen.classList.remove('hidden');
    loadingScreen.style.opacity = '1';
    loadingScreen.style.visibility = 'visible';
    
    console.log('Loading screen akan hilang dalam 3 detik');
    
    // Tunggu 3 detik, lalu sembunyikan loading screen
    setTimeout(function() {
        console.log('3 detik berlalu - Menyembunyikan loading screen');
        loadingScreen.classList.add('hidden');
        
        // Setelah loading screen hilang, aktifkan scrolling
        setTimeout(function() {
            document.body.style.overflow = 'auto';
            console.log('Loading screen berhasil disembunyikan');
        }, 500);
    }, 3000); // 3000ms = 3 detik
});

// Backup dengan multiple cara untuk memastikan loading hilang
window.addEventListener("load", function() {
    console.log('Window load event - Memastikan loading screen hilang');
    setIframeHeight();
    
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Backup: jika loading screen masih ada setelah window load, hilangkan setelah 1 detik
    setTimeout(function() {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            console.log('Backup: Memaksa loading screen hilang');
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 1000);
});

// Backup lagi dengan timer independen
setTimeout(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        console.log('Backup timer: Memaksa loading screen hilang setelah 5 detik');
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}, 5000); // 5 detik sebagai fallback terakhir

// Handle jika pengguna melakukan refresh
window.addEventListener('beforeunload', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.opacity = '1';
        loadingScreen.style.visibility = 'visible';
    }
});

// Untuk memastikan iframe tetap proporsional saat orientasi layar berubah
window.addEventListener('orientationchange', function() {
    setTimeout(setIframeHeight, 100);
});
