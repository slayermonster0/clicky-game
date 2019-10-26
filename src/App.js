import React, { Component } from "react";
import ImageFileNames from "./ImageFileNames";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ImageBlockListing from "./components/ImageBlockListing";
import Footer from "./components/Footer";

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}
class App extends Component {
	state = {
    imageFileNames: ImageFileNames,
    clickedImages: [],
    score: 0,
    topScore: 0,
    feedback: "Click an image to begin!",
    gameStatus: 0 
  };

  componentDidMount() {
    this.setState({
      imageFileNames: this.shuffle(this.state.imageFileNames)
    }, () => {
      console.log("Shuffled the images on game start");
    });
  }

  handleClick = event => {
    const clickedImageFileName = event.target.alt;
    
    const wasImageClickedBefore = this.imageClickedBefore(clickedImageFileName);
    if (wasImageClickedBefore) {
      this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        
        clickedImages: [],
        score: 0,
        feedback: "Game Over! You Guessed The Same Image Twice!",
        gameStatus: 2
      }, () => {
       
      });
    } else {
      let newScore = this.state.score + 1;
      if (newScore === this.state.imageFileNames.length) {
        this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        
          clickedImages: [],
          score: 0,
          topScore: newScore,
          feedback: "Congrats! You Have Guessed All Of The Images Correctly!",
          gameStatus: 1
          });
      } else {
        const clickedImagesCopy = this.state.clickedImages.slice();
        clickedImagesCopy.push(clickedImageFileName);
        const newTopScore = (newScore > this.state.topScore) ? newScore : this.state.topScore;
        this.setState({
        imageFileNames: this.shuffle(this.state.imageFileNames),
        
          clickedImages: clickedImagesCopy,
          score: newScore,
          topScore: newTopScore,
          feedback: "Yes! You Guessed The Image Correctly!",
          gameStatus: 0
          }, () => {
          
        });
      }
    }
  };

  imageClickedBefore = (clickedImageFileName) => {
  	for (let index=0; index<this.state.clickedImages.length; index++) {
  		if (this.state.clickedImages[index] === clickedImageFileName) {
        return true;
      }
    }
    return false;
  };

  
  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
     
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
 
  render() {
   return (
    <div>
      <Navbar score={this.state.score} topScore={this.state.topScore} feedback={this.state.feedback} gameStatus={this.state.gameStatus} />
      <Banner />
      <ImageBlockListing imageFileNames={this.state.imageFileNames} clickHandler={this.handleClick} gameStatus={this.state.gameStatus} />
      <Footer />
    </div>
    );
  }
}

export default App;
