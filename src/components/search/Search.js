import React from 'react';
import ReactDOM from 'react-dom';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
      super(props);
      this.state = {movies:"",trending:""};
      this.handleChange = this.handleChange.bind(this);
    }

  componentDidMount(){
    this.getTrending()
  }

  handleChange(event) {
    console.log(document.getElementById("trending"))
    this.getMovies(document.getElementById("formValue").value)
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  getMovies(movieTitle) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=` + process.env.REACT_APP_API_KEY + `&language=en-US&query=`+movieTitle)
    .then(response => {
      response.json()
        .then((data) => {
          let movies = data["results"]
          console.log("HOLY",movies)
            this.setState({movies: movies}, (movies)=> this.renderMovies(movies))
        })
    })
  }

  getTrending() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=` + process.env.REACT_APP_API_KEY)
    .then(response => {
      response.json()
        .then((data) => {
          let trending = data["results"]
          console.log("trending",trending)
            this.setState({trending:trending}, (trending)=> this.renderTrending(trending))
        })
    })
  }

  renderTrending(movies){
    let moviesList = [];
    let image = "";
    for(var i=0;i<this.state.trending.length;i++){
      if(this.state.trending[i].poster_path===null){
        image = "http://www.reelviews.net/resources/img/default_poster.jpg";
      }else{
        image = "https://image.tmdb.org/t/p/w500"+this.state.trending[i].poster_path;
      }
      moviesList.push(
        <div className="movieDiv" id={i}>
          <img src={image} className="moviePoster"/>
          <h1 className="movieTitle">{this.state.trending[i].title}</h1>
        </div>
      )
    }ReactDOM.render(moviesList,document.getElementById('trendingMoviesContainer'))
  }

  renderMovies(movies){
    let moviesList = [];
    let image = "";
    if(!this.state.movies){
      ReactDOM.render(<div></div>,document.getElementById('movieContainer'))
    }else{
      for(var i=0;i<this.state.movies.length;i++){
        if(this.state.movies[i].poster_path===null){
          image = "http://www.reelviews.net/resources/img/default_poster.jpg";
        }else{
          image = "https://image.tmdb.org/t/p/w500"+this.state.movies[i].poster_path;
        }
        moviesList.push(
          <div className="movieDiv" id={i}>
            <img src={image} className="moviePoster"/>
            <h1 className="movieTitle">{this.state.movies[i].title}</h1>
          </div>
        )
      }
      ReactDOM.render(moviesList,document.getElementById('movieContainer'))
    }
  }

  render(){

    return (
      <div id="searchDiv">
        <div>
          <form className="searchbar" onSubmit={this.handleSubmit}>
            <label>
              <input id="formValue" type="text" placeholder="Enter Movie Title" autocomplete="off" onChange={this.handleChange} />
            </label>
          </form>
        </div>
        <div id='movieContainer'>
        </div>
        <div id="trending">
          <h2>Trending This Week</h2>
          <div id="trendingMoviesContainer">
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
