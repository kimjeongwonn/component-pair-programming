const DURATION = 500;

let currentSlide = 1;
let slideLength = 0;

const setCurrentSlide = _currentSlide => {
  const $carouselSlides = document.querySelector('.carousel-slides');
  $carouselSlides.style.setProperty('--duration', DURATION);

  currentSlide = _currentSlide;
  $carouselSlides.style.setProperty('--currentSlide', currentSlide + '');

  if (currentSlide === 0 || currentSlide === slideLength - 1) {
    $carouselSlides.addEventListener('transitionend', function loopBack() {
      $carouselSlides.style.setProperty('--duration', '0');
      currentSlide = currentSlide ? 1 : slideLength - 2;
      $carouselSlides.style.setProperty('--currentSlide', currentSlide + '');
      $carouselSlides.removeEventListener('transitionend', loopBack);
    });
  }
};

const throttle = (() => {
  let timerId = null;
  return (callback, ...args) => {
    if (timerId) return;
    callback(...args);
    timerId = setTimeout(() => {
      timerId = null;
    }, DURATION + 50);
  };
})();

const createCarouselSlides = _images => {
  const images = [_images[_images.length - 1], ..._images, _images[0]];
  slideLength = images.length;
  const $fragment = document.createDocumentFragment();

  const $carouselSlides = document.createElement('div');
  $carouselSlides.classList.add('carousel-slides');
  $carouselSlides.style.setProperty('--currentSlide', '1');
  $carouselSlides.style.setProperty('--duration', DURATION + '');

  const $prevButton = document.createElement('button');
  $prevButton.classList.add('carousel-control');
  $prevButton.classList.add('prev');
  $prevButton.innerHTML = '&laquo;';

  $prevButton.addEventListener('click', () => {
    throttle(setCurrentSlide, currentSlide - 1);
  });

  const $nextButton = document.createElement('button');
  $nextButton.classList.add('carousel-control');
  $nextButton.classList.add('next');
  $nextButton.innerHTML = '&raquo;';

  $nextButton.addEventListener('click', () => {
    throttle(setCurrentSlide, currentSlide + 1);
  });

  images.forEach(url => {
    const $carouselImage = document.createElement('img');
    $carouselImage.setAttribute('src', url);
    $carouselSlides.append($carouselImage);
  });

  $fragment.append($carouselSlides, $prevButton, $nextButton);
  return $fragment;
};

const setCarouselSize = $container => {
  const $firstImage = $container.querySelector('img');
  $firstImage.addEventListener('load', () => {
    $container.style.width = $firstImage.clientWidth + 'px';
    $container.style.opacity = 1;
  });
};

const initialCarousel = ($container, images) => {
  $container.append(createCarouselSlides(images));
  setCarouselSize($container);
};

initialCarousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
