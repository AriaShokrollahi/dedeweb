let swiperInstance = null;

function initSwiperIfMobile() {
  const isMobile = window.innerWidth < 768;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  if (!isMobile && swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

window.addEventListener('load', initSwiperIfMobile);
window.addEventListener('resize', initSwiperIfMobile);
