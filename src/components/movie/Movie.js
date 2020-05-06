import React from 'react';
import './Movie.css';

class Movie extends React.Component {
  constructor(props) {
      super(props);
      this.state = {currentMovie:""};
      this.handleClick = this.handleClick.bind(this);
    }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick(event){

  }


  render(){
    return (
      <div>
        <img src="http://www.reelviews.net/resources/img/default_poster.jpg"/>
      </div>
    );
  }
}

export default Movie;
