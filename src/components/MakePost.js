import React, { useState, useEffect } from "react";
import "./MakePost.css";
import db from "../config/firebase";
import MakePostBottom from "./MakePostBottom";

function MakePost({ uid }) {
  const [postType, setPostType] = useState(0);
  const [postText, setPostText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [taggedAlbums, setTaggedAlbums] = useState([]);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);

  //logic to add post when user presses submit
  useEffect(() => {
    async function addPostToFirestore(_newPost) {
      db.collection("posts")
        .add(_newPost)
        .then(function () {
          setIsSubmitted(false);
          console.log("Value successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing Value: ", error);
        });
    }

    if (isSubmitted) {
      let newPost = {
        creatorID: uid,
        type: postType,
        text: postText,
        timeStamp: Date(),
        followers: ["XlyJbOBWdlbHil6anHybSDyFJC12"],
        taggedAlbums: taggedAlbums,
      };
      addPostToFirestore(newPost);
      setPostText("");
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  const postInput = (
    <div className="makePost__textInput">
      <input
        type="text"
        placeholder="Check this out..."
        value={postText}
        onChange={(e) => {
          setPostText(e.target.value);
        }}
      />
      <div
        className={
          isSubmitted
            ? "makePost__textInput__submit__active"
            : "makePost__textInput__submit"
        }
        onClick={() => setIsSubmitted(true)}
      >
        <h3>Submit</h3>
      </div>
    </div>
  );

  return (
    <div className="makePost">
      <div className="makePost__typeSelect">
        <div
          className={
            postType === 0
              ? "makePost__typeSelect__option__active"
              : "makePost__typeSelect__option"
          }
          onClick={() => {
            setPostType(0);
          }}
        >
          <h3>Today's Hall</h3>
        </div>
        <div
          className={
            postType === 1
              ? "makePost__typeSelect__option__active"
              : "makePost__typeSelect__option"
          }
          onClick={() => {
            setPostType(1);
          }}
        >
          <h3>Now Spinning</h3>
        </div>
        <div
          className={
            postType === 2
              ? "makePost__typeSelect__option__active"
              : "makePost__typeSelect__option"
          }
          onClick={() => {
            setPostType(2);
          }}
        >
          <h3>Misc</h3>
        </div>
      </div>
      {!isAddingAlbum && postInput}

      <MakePostBottom
        setTaggedAlbums={setTaggedAlbums}
        taggedAlbums={taggedAlbums}
        isAddingAlbum={isAddingAlbum}
        setIsAddingAlbum={setIsAddingAlbum}
      />
    </div>
  );
}

export default MakePost;
