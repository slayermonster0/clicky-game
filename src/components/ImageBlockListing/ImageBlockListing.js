import React from "react";
import "./ImageBlockListing.css";
import ImageBlock from "../ImageBlock";

const ImageBlockListing = (props) => (
	<div className="container">
		<div className="row">
	    {props.imageFileNames.map((imageFileName, index) => {
	      return <ImageBlock key={index} imageFileName={imageFileName} alt={imageFileName} clickHandler={props.clickHandler} gameStatus={props.gameStatus} />
	    })}
	  </div>
  </div>
);

export default ImageBlockListing;