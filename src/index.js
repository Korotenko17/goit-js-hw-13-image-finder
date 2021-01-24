import './styles.css';
import apiService from './js/apiService';
import updateCardsMarkup from './js/update-cards-markup';

import getRefs from './js/get-refs';
const refs = getRefs();

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.searchQuery = form.elements.query.value;
  // console.log(inputValue)
  refs.cardContainer.innerHTML = '';

  apiService.resetPage();
  fetchHitsSpinnerVisibility();
  form.reset();
});

refs.loadMoreBtn.addEventListener('click', fetchHitsSpinnerVisibility);

function fetchHitsSpinnerVisibility () {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.spinner.classList.remove('is-hidden');

  apiService
    .fetchCards()
    .then(hits => {
      updateCardsMarkup(hits);
      refs.loadMoreBtn.classList.remove('is-hidden');
      // посмотреть высоту документа:
      // console.log(document.documentElement.offsetHeight);
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
    .finally(() => {
      refs.spinner.classList.add('is-hidden');
    });
}

// function scroll() {
//   const { y } = refs.cardContainer.lastElementChild.getBoundingClientRect();
//   setTimeout(() => {
//     window.scrollTo({
//       top: y + document.documentElement.offsetHeight,
//       behavior: 'smooth',
//     });
//   }, 500);
// }

// пример с Pixabay-api npm:
// import { searchImages } from 'pixabay-api';
// searchImages(AUTH_KEY, 'puppy').then((r) => console.log(r));
