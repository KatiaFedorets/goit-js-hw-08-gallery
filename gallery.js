import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const btnEl = document.querySelector('[data-action="close-lightbox"]');
const backDropEl = document.querySelector('.lightbox__overlay');
const lightboxImageEl = document.querySelector(".lightbox__image");
console.log(backDropEl);

const cardsMarkup = createGalleryItemsMarkup(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);


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
        onCloseModal();
    }
};
