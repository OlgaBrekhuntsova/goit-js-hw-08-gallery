// <li class="gallery__item">
//     <a class="gallery__link" href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg">
//         <img class="gallery__image" src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//             data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg" alt="Tulips" />
//     </a>
// </li>

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
import gallery from './gallery-items.js';
const refs = {
    galleryList: document.querySelector('ul.js-gallery'),
    largeImageOverlay: document.querySelector('div.js-lightbox'),
    largeImage: document.querySelector('img.lightbox__image'),
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    largeImageBackground: document.querySelector('div.lightbox__overlay'),
    largeImageIdx:'',
    galleryItems:[],
};
let i = 0;
refs.galleryItems = gallery.map(array => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const galleryItemLink = document.createElement('a');
    galleryItemLink.classList.add('gallery__link');
    galleryItemLink.href = array.original;
    const galleryItemImg = document.createElement('img');
    galleryItemImg.classList.add('gallery__image');
    galleryItemImg.setAttribute('data-lazy', array.preview);
    galleryItemImg.setAttribute('data-source', array.original);
    galleryItemImg.setAttribute('data-idx', i);
    i+=1;
    galleryItemImg.setAttribute('atl', array.description);
    galleryItem.insertAdjacentElement('afterbegin', galleryItemLink);
    galleryItemLink.insertAdjacentElement('afterbegin', galleryItemImg);
    return galleryItem;
});
refs.galleryList.prepend(...refs.galleryItems);

// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
const onGalleryClick = (event) => {
event.preventDefault();
    if (event.target.nodeName !== 'IMG') { return };
   
      //  3. Открытие модального окна по клику на элементе галереи.
// Для того чтобы открыть, необходимо добавить на div.lightbox CSS-класс is-open
    refs.largeImageOverlay.classList.toggle('is-open');

     // 4. Подмена значения атрибута src элемента img.lightbox__image.
    refs.largeImageIdx = event.target.dataset.idx;
    refs.largeImage.src = event.target.dataset.source;
  };
refs.galleryList.addEventListener('click', onGalleryClick);

// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
const onCloseButtonClick = (event) => {
    refs.largeImageOverlay.classList.toggle('is-open');
    // 6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
    refs.largeImage.src = '';
    // return;
   };

refs.closeBtn.addEventListener('click', onCloseButtonClick);

// Дополнительно:
// Закрытие модального окна по клику на div.lightbox__overlay.
const onLargeImageOverlayClick = (event) => {
    if (event.target.nodeName === 'IMG') { return };
    onCloseButtonClick('click');
    };

refs.largeImageBackground.addEventListener('click', onLargeImageOverlayClick);


// Закрытие модального окна по нажатию клавиши ESC.
const onEscClick = (event) => (event.key === 'Escape') && onCloseButtonClick('click') ;
window.addEventListener('keydown', onEscClick);

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
const onArrowClick = (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        case 'Left':
            if (refs.largeImageIdx > 0) {
                const currentIdx = Number(refs.largeImageIdx);
                const prevImg = refs.galleryItems[currentIdx - 1].querySelector('img');
                refs.largeImage.src = prevImg.dataset.source;
                refs.largeImageIdx = prevImg.dataset.idx;
            }
            // замыкание цикла прокрутки влево:
            else { 
                const lastIdx = refs.galleryItems.length - 1;
                const prevImg = refs.galleryItems[lastIdx].querySelector('img');
              refs.largeImage.src = prevImg.dataset.source;
                refs.largeImageIdx = prevImg.dataset.idx;};
               break;
        case 'ArrowRight':
            case 'Right':
          if (refs.largeImageIdx < refs.galleryItems.length-1) {
              const currentIdx = Number(refs.largeImageIdx);
                const nextImg = refs.galleryItems[currentIdx + 1].querySelector('img');
                refs.largeImage.src = nextImg.dataset.source;
                refs.largeImageIdx = nextImg.dataset.idx;
            }
            // замыкание цикла прокрутки вправо:
            else { 
                const nextIdx = 0;
                const nextImg = refs.galleryItems[nextIdx].querySelector('img');
              refs.largeImage.src = nextImg.dataset.source;
                refs.largeImageIdx = nextImg.dataset.idx;};
               break;
            default:
            return;
   };
};

window.addEventListener('keydown', onArrowClick);

// Ленивая загрузка

const images = document.querySelectorAll('.js-gallery img');
const options = {
  rootMargin: '100px',
};

const onEntry = ((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.lazy;
        image.src = src;
        observer.unobserve(image);
    };
   });
});

const io = new IntersectionObserver(onEntry, options);
images.forEach(image=>io.observe(image));



