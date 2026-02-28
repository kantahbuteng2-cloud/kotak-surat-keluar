// Pastikan iframe selalu menyesuaikan tinggi layar
window.addEventListener("resize", setIframeHeight);
window.addEventListener("load", setIframeHeight);

function setIframeHeight() {
    const iframe = document.getElementById("sipenaFrame");
    iframe.style.height = window.innerHeight + "px";
}

// Tambahkan loading sederhana
document.addEventListener('DOMContentLoaded', function() {
    // Buat elemen loading sederhana
    const loading = document.createElement('div');
    loading.id = 'simple-loading';
    loading.style.position = 'fixed';
    loading.style.top = '0';
    loading.style.left = '0';
    loading.style.width = '100%';
    loading.style.height = '100%';
    loading.style.background = '#667eea';
    loading.style.display = 'flex';
    loading.style.justifyContent = 'center';
    loading.style.alignItems = 'center';
    loading.style.zIndex = '9999';
    loading.style.color = 'white';
    loading.style.fontSize = '24px';
    loading.style.fontFamily = 'Arial, sans-serif';
    loading.innerHTML = 'Memuat Surat Keluar...';
    
    // Tambahkan ke body
    document.body.appendChild(loading);
    
    // Hilangkan setelah 3 detik
    setTimeout(function() {
        loading.style.opacity = '0';
        loading.style.transition = 'opacity 0.5s';
        setTimeout(function() {
            loading.remove();
        }, 500);
    }, 3000);
});
