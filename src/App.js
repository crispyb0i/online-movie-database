import React from 'react';
import './App.css';
import Header from './components/header/Header'
import Search from './components/search/Search'
import Movie from './components/movie/Movie'

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Search/>
    </div>
  );
}

export default App;
