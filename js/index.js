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
};

const galleryItems = gallery.map(array => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const galleryItemLink = document.createElement('a');
    galleryItemLink.classList.add('gallery__link');
    galleryItemLink.href = array.original;
    const galleryItemImg = document.createElement('img');
    galleryItemImg.classList.add('gallery__image');
    galleryItemImg.src= array.preview;
    galleryItemImg.setAttribute('data-source', array.original);
    galleryItemImg.setAttribute('atl', array.description);
    galleryItem.insertAdjacentElement('afterbegin', galleryItemLink);
    galleryItemLink.insertAdjacentElement('afterbegin', galleryItemImg);
    return galleryItem;
});
refs.galleryList.prepend(...galleryItems);

// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
const onGalleryClick = (event) => {
event.preventDefault();
    if (event.target.nodeName !== 'IMG') { return };
   
      //  3. Открытие модального окна по клику на элементе галереи.
// Для того чтобы открыть, необходимо добавить на div.lightbox CSS-класс is-open
    refs.largeImageOverlay.classList.toggle('is-open');

     // 4. Подмена значения атрибута src элемента img.lightbox__image.
    const largeImageURL = event.target.dataset.source;
    refs.largeImage.src = largeImageURL;
  };
refs.galleryList.addEventListener('click', onGalleryClick);

// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
const onCloseButtonClick = (event) => {
    refs.largeImageOverlay.classList.toggle('is-open');
    // 6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
    refs.largeImage.src = '';
    event.stopPropagation();
    return;
   };

refs.closeBtn.addEventListener('click', onCloseButtonClick);

// Дополнительно:
// Закрытие модального окна по клику на div.lightbox__overlay.
const onLargeImageOverlayClick = (event) => {
    if (event.target.nodeName === 'IMG') { return };
    onCloseButtonClick('click');
    };

refs.largeImageOverlay.addEventListener('click', onLargeImageOverlayClick);


// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

// Доп: Ленивая загрузка
// const options ={
//   rootMargins: '20px',
// };
// const io = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target
//       observer.disconnect();
//     };
//    });
// }, options);
// io.observe(galleryItem);


// 


