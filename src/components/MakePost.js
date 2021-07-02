import React, { useState, useEffect } from "react";
import "./MakePost.css";
import db from "../config/firebase";

function MakePost({ uid }) {
  const [postType, setPostType] = useState(0);
  const [postText, setPostText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previousPosts, setPreviousPosts] = useState(null);

  useEffect(() => {
    async function loadPreviousPosts() {
      var docRef = db.collection("test").doc(`${uid}`);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setPreviousPosts(doc.data());
            console.log("Document data:", doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }

    async function addPostToFirestore(_newPost) {
      db.collection("test")
        .doc(`${uid}`)
        .set({ ...previousPosts, posts: [...previousPosts.posts, _newPost] })
        .then(function () {
          setIsSubmitted(false);
          console.log("Value successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing Value: ", error);
        });
    }

    if (!isSubmitted && uid) {
      loadPreviousPosts();
    }
    if (isSubmitted && previousPosts) {
      let newPost = { type: postType, text: postText, timeStamp: Date() };
      addPostToFirestore(newPost);
      setPostText("");
      setIsSubmitted(false);
    }
  }, [isSubmitted, uid]);

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
          className="makePost__textInput__submit"
          onClick={() => setIsSubmitted(true)}
        >
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
