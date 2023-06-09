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
  };
  /**
   * Function for rendering books on the page.
   * Books are generated from templates.
   * The data for the templates comes from data.js
   */
  const renderBooks = function(){
    const templates = Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML);
    for(const element of dataSource.books){
      const generatedHTML = templates(element);
      const elementDOM = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(elementDOM);
    }
  };

  renderBooks();
}
