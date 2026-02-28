// Tunggu sampai semua konten siap
document.addEventListener('DOMContentLoaded', function() {
    
    // Ambil elemen yang diperlukan
    const loadingScreen = document.getElementById('loadingScreen');
    const iframe = document.getElementById('sipenaFrame');
    
    // Set tinggi iframe sesuai tinggi window
    function setIframeHeight() {
        iframe.style.height = window.innerHeight + 'px';
    }
    
    // Panggil saat pertama kali
    setIframeHeight();
    
    // Panggil saat window di-resize
    window.addEventListener('resize', setIframeHeight);
    
    // Pastikan loading screen terlihat
    loadingScreen.classList.remove('hide');
    
    console.log('Loading screen dimulai');
    
    // Timer 3 detik untuk menghilangkan loading screen
    setTimeout(function() {
        console.log('3 detik berlalu, menghilangkan loading screen');
        loadingScreen.classList.add('hide');
        
        // Aktifkan scrolling setelah loading hilang
        setTimeout(function() {
            document.body.style.overflow = 'auto';
        }, 500);
        
    }, 3000);
    
    // Backup: jika iframe sudah siap sebelum 3 detik
    iframe.addEventListener('load', function() {
        console.log('Iframe sudah siap');
        // Tidak perlu melakukan apa-apa, tetap tunggu 3 detik
    });
    
});

// Backup tambahan: jika ada masalah dengan DOMContentLoaded
window.addEventListener('load', function() {
    console.log('Window loaded');
    const loadingScreen = document.getElementById('loadingScreen');
    const iframe = document.getElementById('sipenaFrame');
    
    // Set tinggi iframe
    iframe.style.height = window.innerHeight + 'px';
    
    // Jika loading screen masih ada setelah 3.5 detik, paksa hilangkan
    setTimeout(function() {
        if (loadingScreen && !loadingScreen.classList.contains('hide')) {
            console.log('Backup: memaksa loading screen hilang');
            loadingScreen.classList.add('hide');
            document.body.style.overflow = 'auto';
        }
    }, 3500);
});

// Backup terakhir: paksa hilang setelah 5 detik
setTimeout(function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hide')) {
        console.log('Final backup: memaksa loading screen hilang');
        loadingScreen.classList.add('hide');
        document.body.style.overflow = 'auto';
    }
}, 5000);

// Atasi masalah orientation change di mobile
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        const iframe = document.getElementById('sipenaFrame');
        iframe.style.height = window.innerHeight + 'px';
    }, 100);
});
