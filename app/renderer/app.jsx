import fs from "fs";
import path from "path";
import process from "process";

import React from "react";
import ReactDOM from "react-dom";
import { webFrame } from "electron";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import watch from 'redux-watch'

import { parseBook } from "parse-epub";

import Explorer from "./components/explorer/Explorer";
import BookList from "./components/book/BookList";
import Reader from "./components/book/Reader";

import reducers from "./reducers";
import { explore } from './actions'

import * as ViewType from './constants/ViewType';

webFrame.registerURLSchemeAsPrivileged("epub");

function renderExplorer(currentDirectory, directories, books) {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Explorer directories={directories} currentDirectory={currentDirectory} />
        <BookList books={books} />
      </div>
    </Provider>,
    document.getElementById("react-root")
  );
}

function renderBook(book) {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Reader book={book} />
      </div>
    </Provider>,
    document.getElementById("react-root")
  );
}

function exploreDirectory(currentDirectory) {
  var items = fs.readdirSync(currentDirectory.path);
  var directories = [];
  var bookPromises = [];
  
  items.forEach(function (itemName) {
    var itemPath = path.join(currentDirectory.path, itemName);
    var itemStat = fs.lstatSync(itemPath);
    
    if (itemStat.isDirectory()) { 
      // Remove hidden directories (starting by .)
      if (itemName[0] != ".") {
        directories.push({
          path: itemPath,
          name: itemName
        });
      }
    } else if (path.extname(itemPath) == ".epub") {
      // Store all promises that parse epub
      bookPromises.push(new Promise((resolve, reject) => {
        parseBook("epub://" + itemPath).then(data => {
          resolve({
            path: itemPath,
            metadata: data.metadata
          });
        }).catch(err => {
          resolve(null);
        });
      }));
    }
    
  });
  
  Promise.all(bookPromises).then(bookDataList => {
    var books = [];
    
    bookDataList.forEach(bookData => {
      if (bookData == null) return;
      
      books.push({
        path: bookData.path,
        title: bookData.metadata.title,
        author: bookData.metadata.creator
      });
    });
    
    renderExplorer(currentDirectory, directories, books);
  });
}

const engine = createEngine('readium-electron');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(storage.reducer(reducers));
const load = storage.createLoader(engine);

load(store)
  .then(newState => {
    // Register epub protocols
    console.log("Previous state has been loaded");
    
    if (store.getState().view == ViewType.EXPLORER) {
      exploreDirectory(store.getState().currentDirectory);
    } else if (store.getState().view == ViewType.BOOK) {
      renderBook(store.getState().currentBook);
    }
  })
  .catch(err => {
    console.log('Failed to load previous state', err);
    // Explore current directory
    explore(process.cwd());
  });


// Listener for explorer view
let currentDirectoryWatcher = watch(store.getState, 'currentDirectory');

store.subscribe(currentDirectoryWatcher((newDirectory, oldDirectory, objectPath) => {
  if (store.getState().view == ViewType.EXPLORER) {
    console.log("currentDirectoryWatcher", newDirectory);
    exploreDirectory(newDirectory);
  }
}));

// Listener for view
let currentBookWatcher = watch(store.getState, 'currentBook');

store.subscribe(currentBookWatcher((newBook, oldBook, objectPath) => {
  if (store.getState().view == ViewType.BOOK) {
    console.log("currentBookWatcher", newBook);
    renderBook(newBook);
  }
}));

