const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const galeryListEl = document.querySelector('.gallery');
const lightbox = document.querySelector('div.lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const imgArray = [];
let imgIndx = 0;

for (let i = 0; i < galleryItems.length; i += 1) {
  const { preview, original, description} = galleryItems[i];
  let image = (`
  <li class="gallery__item">
  <a class="gallery__link"
    href='${original}'>
    <img
      class= "gallery__image"
      src= '${preview}'
      data-source = '${original}'
      alt="${description}"
      data-indx = '${i}'/>
  </a>
</li>`);
  imgArray.push(image);
};
galeryListEl.insertAdjacentHTML('afterbegin', imgArray.join(''));


galeryListEl.addEventListener('click', openModal);
function openModal(imgEvent) {
    imgEvent.preventDefault();
  if (imgEvent.target.nodeName !== 'IMG') { return };
  lightbox.classList.add('is-open');
  imgIndx = parseInt(imgEvent.target.dataset.indx);
  document.addEventListener("keydown", keyChek);
     changeImg();
};

const closeButton = document.querySelector('.lightbox__button');
closeButton.addEventListener('click', closeModal);
function closeModal() {
    lightbox.classList.remove('is-open');
  clear();
    document.removeEventListener("keydown", keyChek);
};

function clear() {
  lightboxImg.src = '';
  lightboxImg.alt = '';
}

const modalOverlay = document.querySelector('.lightbox__overlay');
modalOverlay.addEventListener('click', closeModal);

function keyChek(event) {
  if (event.key === 'Escape') {
    console.log('Esc');
    closeModal()
  }
   else if (event.key === 'ArrowRight') {
    if (imgIndx + 1 > galleryItems.length - 1) {
      imgIndx = 0;
    }
    else {
      imgIndx += 1
    };
  }
  else if (event.key === 'ArrowLeft') {
    if (imgIndx - 1 < 0) {
      imgIndx = (galleryItems.length - 1);
    }
    else {
      imgIndx += (-1);
    }
  }
  changeImg()
}

function changeImg() {
  lightboxImg.src = galleryItems[imgIndx].original;
  lightboxImg.alt = galleryItems[imgIndx].description;
}