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
    },
  };

  const templatesBooks = Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML);
  
  const books = {
    container: document.querySelector(select.containerOf.books),
    filter: document.querySelector(select.form.filters),
  };

  const favoriteBooks = [];
  const filters = [];

  /**
   * Function for rendering books on the page.
   * Books are generated from templates.
   * The data for the templates comes from data.js
   */
  const renderBooks = function(){
    for(const element of dataSource.books){
      const generatedHTML = templatesBooks(element);
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      books.container.appendChild(elementDOM);
    }
  };

  /**
   * Function to add and remove book from favorites and filtred it
   */
  const initActions = function(){
    books.container.addEventListener('dblclick', function(event) {
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

    books.filter.addEventListener('click', function(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        if(event.target.checked){
          filters.push(event.target.value);
        } else {
          filters.pop(event.target.value);
        }
      }
    });
  };

  renderBooks();
  initActions();
}
