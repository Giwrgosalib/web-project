
// This script is used to initialize the photo carousel and attach click event listeners to all images with the class 'img-fluid'
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the photo carousel
    const carousel = document.querySelector('.carousel');
    new bootstrap.Carousel(carousel, {
        interval: false
    });

    // Attach click event listener to all images with the class 'img-fluid'
    const images = document.querySelectorAll('.img-fluid');
    images.forEach(function (image) {
        image.addEventListener('click', function () {
            const src = this.getAttribute('src');
            const carouselItem = document.querySelector('.carousel-item:first-of-type');
            carouselItem.querySelector('img').setAttribute('src', src);
            const modal = new bootstrap.Modal(document.querySelector('#myModal'));
            modal.show();
        });
    });
})