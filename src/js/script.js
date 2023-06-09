/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars


{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    book: {
      image: '.book__image',
    },
    form: {
      filters: '.filters',
    },
  };
  const classNames = {
    books: {
      favorite:'favorite',
      hidden: 'hidden',
    },
  };

  const templatesBooks = Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML);
  const favoriteBooks = [];
  const filters = [];

  class BooksList {
    constructor(){
      const thisBooksList = this;
      thisBooksList.getElement();
      thisBooksList.render();
      thisBooksList.init();
    }
    /**
     * The method that references DOM elements
     */
    getElement(){
      const thisBooksList = this;
      thisBooksList.booksContainer = document.querySelector(select.containerOf.books);
      thisBooksList.filter = document.querySelector(select.form.filters);
    }

    /**
     * The method for rendering books on the page.
     * Books are generated from templates.
     * The data for the templates comes from data.js
     */
    render(){
      const thisBooksList = this;
      for(const element of dataSource.books){
        const ratingBgc = thisBooksList.determineRatingBgc(element.rating);
        const ratingWidth = (element.rating / 10) * 100;
        element.ratingBgc = ratingBgc;
        element.ratingWidth = ratingWidth;
        const generatedHTML = templatesBooks(element);
        const elementDOM = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.booksContainer.appendChild(elementDOM);
      }
    }
    
    /**
     * the method to add and remove book from favorites and filtred it
     */
    init(){
      const thisBooksList = this;
      thisBooksList.booksContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');

        if(!favoriteBooks.includes(bookId)){
          event.target.offsetParent.classList.add(classNames.books.favorite);
          favoriteBooks.push(bookId);
        } else {
          event.target.offsetParent.classList.remove(classNames.books.favorite);
          favoriteBooks.pop(bookId);
        }
      });

      thisBooksList.filter.addEventListener('click', function(event){
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          if(event.target.checked){
            filters.push(event.target.value);
          } else {
            filters.pop(event.target.value);
          }
        }
        thisBooksList.filtred();
      });
    }

    /**
     * The method filters the books to be shown, depending on the selected category
     */
    filtred(){
      for(const element of dataSource.books){
        let shouldBeHidden = false;
        for(const filter of filters){
          if(!element.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const bookToHidden = document.querySelector('.book__image[data-id="' + element.id + '"]');
        if(shouldBeHidden == true){
          bookToHidden.classList.add(classNames.books.hidden);
        } else {
          bookToHidden.classList.remove(classNames.books.hidden);
        }
      }
    }
    
    /**
     * The method creates a background color depending on the rating of the book
     * @param {*} rating book rating (0-10)
     * @returns background color
     */
    determineRatingBgc(rating){
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if( rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <=9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  
  const app = new BooksList();
  console.log(app);
}
