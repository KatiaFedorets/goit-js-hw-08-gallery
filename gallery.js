import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const btnEl = document.querySelector('[data-action="close-lightbox"]');
const backDropEl = document.querySelector('.lightbox__overlay');
const lightboxImageEl = document.querySelector(".lightbox__image");
console.log(backDropEl);

const cardsMarkup = createGalleryItemsMarkup(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);

// // Создание и рендер разметки по массиву данных и предоставленному шаблону.
function createGalleryItemsMarkup(galleryIts) {
    return galleryIts.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
          <a
               class="gallery__link"
                href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                   data-source="${original}"
                    alt="${description}"/>
             </a>
       </li>`;

    }).join('');
};

// // Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.

galleryEl.addEventListener("click", onGalleryClick);
btnEl.addEventListener("click", onCloseModal);
backDropEl.addEventListener("click", onClickBackDrop);


function onGalleryClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    lightboxImageEl.src = event.target.getAttribute("data-source");
    lightboxImageEl.alt = event.target.alt;
    window.addEventListener('keydown', onEscapeKeyClose);
    event.preventDefault();
    modalEl.classList.add('is-open');

};

function onCloseModal(event) {
    window.removeEventListener('keydown', onEscapeKeyClose);
    event.preventDefault();
    modalEl.classList.remove("is-open");
    lightboxImageEl.src = '';
    lightboxImageEl.alt = '';
};

function onClickBackDrop(event) {
    if (event.target === event.currentTarget) {
        modalEl.classList.remove("is-open");
    }

};

function onEscapeKeyClose(event) {
    if (event.code === "Escape") {
        onClickHandlerClose();
    }
}

// Открытие модального окна по клику на элементе галереи.

// Подмена значения атрибута src элемента img.lightbox__image.

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].

// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.



// import images from "./gallery-items.js";
// const refs = {
//     gallery: document.querySelector(".js-gallery"),
//     image: document.createElement("img"),
//     lightbox: document.querySelector(".lightbox"),
//     btn: document.querySelector('[data-action="close-lightbox"]'),
//     modal: document.querySelector(".lightbox__content"),
//     lightbox__image: document.querySelector(".lightbox__image"),
// };

// const createGalleryItem = ({ preview, original, description }) =>
//     `<li class="gallery__item">
// <a
//   class="gallery__link"
//   href=${original}
// >
//   <img
//     class="gallery__image"
//     src=${preview}
//     data-source=${original}
//     alt=${description}
//   />
// </a>
// </li>`;
// const galleryMarkup = images.reduce(
//     (acc, item) => acc + createGalleryItem(item),
//     ""
// );
// refs.gallery.insertAdjacentHTML("afterbegin", galleryMarkup);
// refs.image.classList.add("gallery__image");

// refs.gallery.addEventListener("click", onGalleryClick);
// refs.btn.addEventListener("click", onClickHandlerClose);
// refs.modal.addEventListener("click", closeLightbox);

// function onGalleryClick(e) {
//     e.preventDefault();
//     if (e.target.nodeName !== 'IMG') {
//         return;
//     }
//     if (e.target.nodeName === "IMG") {
//         refs.lightbox.classList.add("is-open");
//         refs.lightbox__image.src = e.target.getAttribute("data-source");
//         refs.lightbox__image.alt = e.target.alt;
//     }
//     window.addEventListener("keyup", clickKey);
// }

// function onClickHandlerClose(e) {
//     e.preventDefault();
//     refs.lightbox.classList.remove("is-open");
//     refs.lightbox__image.src = '';
//     refs.lightbox__image.alt = '';
//     window.removeEventListener("keyup", clickKey);
// }

// function closeLightbox(event) {
//     if (event.target === event.currentTarget) {
//         onClickHandlerClose();
//     }
// }

// function clickKey(event) {
//     if (event.code === "Escape") {
//         onClickHandlerClose();
//     }
// }