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
      <textarea
        placeholder="Check this out..."
        value={postText}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            setIsSubmitted(true);
          }
        }}
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

  const postTypeSelect = (
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
  );

  const handleRemove = () => {
    console.log("time to remove an album");
  };

  return (
    <div className="makePost">
      {postTypeSelect}
      {postInput}
      {taggedAlbums.length > 0 && (
        <div className="makePost__albumTagDisplay">
          {taggedAlbums.map((album) => {
            return (
              <div className="makePost__albumTagDisplay__card">
                <img src={album.cover} />
                <div className="makePost__albumTagDisplay__card__info">
                  <h3>{album.title}</h3>
                  <h4>{album.artist}</h4>
                </div>
                <h3 onClick={handleRemove}>x</h3>
              </div>
            );
          })}
        </div>
      )}

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
