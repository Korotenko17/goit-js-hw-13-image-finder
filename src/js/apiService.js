const apiKey = '19320063-cda7f2d635216fb573107b42d';

export default {
  searchQuery: '',
  page: 1,

  fetchCards (searchQuery) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(url)
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log(error));
  },

  resetPage () {
    this.page = 1;
  },

  incrementPage () {
    this.page += 1;
  },

  get query () {
    return this.searchQuery;
  },

  set query (value) {
    this.searchQuery = value;
  },
};
