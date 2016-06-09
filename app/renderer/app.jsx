import fs from "fs";
import path from "path";
import process from "process";

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';

import { parseBook } from "parse-epub";

import Explorer from "./components/explorer/Explorer";
import BookList from "./components/book/BookList";

import reducers from "./reducers";
import { explore } from './actions'

import Readium from "readium-js";

function render(currentDirectory, directories, books) {
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

function update() {
  var currentDirectory = store.getState().currentDirectory;
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
        parseBook("http://epub.local" + itemPath).then(data => {
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
    
    render(currentDirectory, directories, books);
  });
}

const engine = createEngine('readium-electron');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(storage.reducer(reducers));
const load = storage.createLoader(engine);

store.subscribe(update);

load(store)
  .then(newState => {
    console.log("Previous state has been loaded");
  })
  .catch(err => {
    console.log('Failed to load previous state', err);
    
    // Explore current directory
    explore(process.cwd());
  });
    
console.log(Readium.version);
