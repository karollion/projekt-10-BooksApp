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
  };

  const classNames = {
    books: {
      favorite:'favorite',
    },
  };

  const templatesBooks = Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML);
  const booksContainer = document.querySelector(select.containerOf.books);

  const favoriteBooks = [];

  /**
   * Function for rendering books on the page.
   * Books are generated from templates.
   * The data for the templates comes from data.js
   */
  const renderBooks = function(){
    for(const element of dataSource.books){
      const generatedHTML = templatesBooks(element);
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      booksContainer.appendChild(elementDOM);
    }
  };

  /**
   * Function to add and remove book from favorites
   */
  const initActions = function(){
    const books = booksContainer.getElementsByTagName('li');
    for(let i = 0; i < books.length; ++i){
      books[i].addEventListener('dblclick', function(event) {
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
    }
      
  };

  renderBooks();
  initActions();
  console.log(favoriteBooks);
}
