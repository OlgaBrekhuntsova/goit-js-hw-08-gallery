
// <li class="gallery__item">
//     <a class="gallery__link" href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg">
//         <img class="gallery__image" src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//             data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg" alt="Tulips" />
//     </a>
// </li>
// import { default as Array } from './gallery-items.js';
import gallery from './gallery-items.js';
console.log(gallery);
const refs = {
    galleryList: document.querySelector('ul.js-gallery'),
    
    //     largeImage: document.querySelector('ul .js-large-image'),
};

const galleryItems = gallery.map( array => {
    for (const element of array) {
        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery__item');
        const galleryItemLink = document.createElement('a');
        galleryItemLink.classList.add('gallery__link');
        galleryItemLink.setAttribute('href', element.original);
        const galleryItemImg = document.createElement('img');
        galleryItemImg.classList.add('gallery__image');
        galleryItem.insertAdjacentElement('afterbegin', galleryItemLink);
        galleryItemLink.insertAdjacentElement('afterbegin', galleryItemImg);
        return galleryItems;
    };
});
refs.galleryList.prepend(...galleryItems);

// const ingredientsList = document.querySelector('ul#ingredients');
// const ingredientsItemsList = ingredients.map(array => {
//   const ingredientItem = document.createElement('li');
//   ingredientItem.textContent = array;
//   return ingredientItem; })
// ingredientsList.prepend(...ingredientsItemsList);


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





// refs.galleryList.addEventListener('click', onGalleryClick);
// const onGalleryClick = (event) => {
//     event.preventDefault();
//     if (event.target.nodeName !== 'IMG') { return };
//     const largeImageURL = event.target.dataset.source;
//     refs.largeImage.src = largeImageURL;
//  };


