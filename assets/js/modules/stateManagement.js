window.addEventListener('load',(e)=>{
    loading.style.display = 'none';
    const ctx = gCanvas.getContext('2d');
    gCanvas.width = window.innerWidth;
    gCanvas.height = window.innerHeight;
});