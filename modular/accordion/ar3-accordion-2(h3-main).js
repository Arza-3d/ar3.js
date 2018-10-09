$('main > div > h3').on('click touch', function(){
    if (this.classList.contains("r3-active") !== true) {
        this.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
        this.style.setProperty('transition','background-color 0.3s ease-in-out 0.6s, border-radius 0.2s 0.6s, color 0.3s ease-in-out 0.6s');
        $(this).next().slideToggle(600);
    } else {
        this.style.setProperty('-webkit-transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
        this.style.setProperty('transition','background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out, color 0.3s ease-in-out');
        $(this).next().delay(300).slideToggle(600);
    }
    this.classList.toggle("r3-active");
});
