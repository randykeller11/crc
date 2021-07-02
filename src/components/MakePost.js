import React, { useState } from "react";
import "./MakePost.css";

function MakePost() {
  return (
    <div className="makePost">
      <div className="makePost__typeSelect">
        <div className="makePost__typeSelect__option">
          <h3>Today's Hall</h3>
        </div>
        <div className="makePost__typeSelect__option__active">
          <h3>Now Spinning</h3>
        </div>
        <div className="makePost__typeSelect__option">
          <h3>Misc</h3>
        </div>
      </div>
      <div className="makePost__textInput">
        <input type="text" placeholder="Check this out..." />
        <div className="makePost__textInput__submit">
          <h3>Submit</h3>
        </div>
      </div>
      <div className="makePost__bottom">
        <div className="makePost__bottom__option">
          <h3>add album</h3>
        </div>
        <div className="makePost__bottom__option__active">
          <h3>add photos</h3>
        </div>
      </div>
    </div>
  );
}

export default MakePost;
