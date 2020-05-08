import React from 'react';
import ReactDOM from 'react-dom';
import './Movie.css';

class Movie extends React.Component {
  constructor(props) {
      super(props);
      this.state = {currentMovie:"", displayClass:"display-none", modalClass:"", background:""}
      this.handleClick = this.handleClick.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
    }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick(event){
    let currentMovieID
    let currentMovie

    console.log(event.target)

    if(event.target.className === "moviePoster" || event.target.className === "movieTitle"){
      if (Number.isInteger(parseInt(event.target.id))) {
        currentMovieID = event.target.id;
      } else if(Number.isInteger(parseInt(event.target.parentElement.id))){
        currentMovieID = event.target.parentElement.id;
      }
    }

    if(currentMovieID){
      fetch(`https://api.themoviedb.org/3/movie/`+ currentMovieID + `?api_key=` + process.env.REACT_APP_API_KEY)
      .then(response => {
        response.json()
          .then((data) => {
            this.renderMovie(data)
            let currentMovie = data
              this.setState({currentMovie:currentMovie,background:"https://image.tmdb.org/t/p/w500" + currentMovie["backdrop_path"]}, (data) => console.log("GREEAT",data))
          })
          this.toggleModal()
      })

    }
  }


  toggleModal (e) {
    if(this.state.displayClass==="display-none"){
      this.setState({
        displayClass: "display-block",
        modalClass: "modal"
      });
    }
    else if(this.state.displayClass==="display-block"){
      this.setState({
        displayClass: "display-none",
        modalClass: ""
      });
    }
  }

  renderMovie(movie) {
    console.log(movie)
    let movieDiv = [];
    let image = "http://www.reelviews.net/resources/img/default_poster.jpg"
    let backdrop;
    let genre = "";
    let runtime = "Runtime Unavailable"

    if(movie["post_path"]){
      image = "https://image.tmdb.org/t/p/w500" + movie["poster_path"];
    }

    if(movie["runtime"]){
      runtime = movie["runtime"] + "m"
    }

    backdrop = "background: url('https://image.tmdb.org/t/p/w500" + movie["backdrop_path"] + "')"

    //get genre array
    if(movie["genres"].length>0){
      genre = [];
      for(let i=0;i<movie["genres"].length;i++){
        genre.push(movie["genres"][i]["name"]);
      }
      genre = genre.join(", ") + " •"
    }
      //check backdrop style
      movieDiv.push(
        <div className="modal-main" style={{backdrop}}>
          <div className='flexbox'>
            <div className='column'>
              <img src={image} />
            </div>
            <div className='column'>
              <h1 className="movieTitle">{movie["title"]}</h1>
              <p>{genre} {runtime}</p>
              <h3 className="overview">Overview</h3>
              <content>{movie["overview"]}</content>
            </div>
          </div>
          <button className="toggle-button" onClick={this.toggleModal}>Close</button>
        </div>
      )

    ReactDOM.render(movieDiv,document.getElementById('movieDiv'))
  }

  buttonClose() {

  }


  render(){
    return (
      <div className = {this.state.modalClass}>
        <div className = {this.state.displayClass} id="movieDiv">

        </div>
      </div>

    );
  }
}

export default Movie;
