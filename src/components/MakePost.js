import React, { useState, useEffect, useReducer } from "react";
import "./MakePost.css";
import db from "../config/firebase";
import MakePostBottom from "./MakePostBottom";
import firebase from "firebase";

const initialState = {
  type: 0,
  likes: 0,
  comments: 0,
  albums: [],
  photos: [],
};
const postReducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.location]: action.payload.updateValue,
      };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};

export const postContext = React.createContext();

function MakePost({ uid }) {
  const [post, postDispatch] = useReducer(postReducer, initialState);

  const [postText, setPostText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [componentState, setComponentState] = useState(0);

  //------------------logic to add post when user presses submit----------------------------------------------
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

    //turn this into a custom hook to load user data from "users" collection and make viewers value for post
    postDispatch({
      type: "update",
      payload: { location: "creatorID", updateValue: uid },
    });

    //add text and timestamp to post when user clicks submit
    if (componentState === 1) {
      postDispatch({
        type: "update",
        payload: { location: "text", updateValue: postText },
      });

      postDispatch({
        type: "update",
        payload: {
          location: "created",
          updateValue: firebase.firestore.FieldValue.serverTimestamp(),
        },
      });

      setComponentState(2);
    }

    //send completed post to firestore
    if (componentState === 2) {
      addPostToFirestore(post);

      setPostText("");
      postDispatch({ type: "reset" });
      setComponentState(0);
    }
  }, [componentState]);

  //------------------------jsx for text input--------------------------------
  const postInput = (
    <div className="makePost__textInput">
      <textarea
        placeholder="Check this out..."
        value={postText}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            setComponentState(1);
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
        onClick={() => setComponentState(1)}
      >
        <h3>Submit</h3>
      </div>
    </div>
  );

  //--------------------jsx for post type options on top-----------------
  const postTypeSelect = (
    <div className="makePost__typeSelect">
      <div
        className={
          post.type === 0
            ? "makePost__typeSelect__option__active"
            : "makePost__typeSelect__option"
        }
        onClick={() => {
          postDispatch({
            type: "update",
            payload: { location: "type", updateValue: 0 },
          });
        }}
      >
        <h3>Today's Hall</h3>
      </div>
      <div
        className={
          post.type === 1
            ? "makePost__typeSelect__option__active"
            : "makePost__typeSelect__option"
        }
        onClick={() => {
          postDispatch({
            type: "update",
            payload: { location: "type", updateValue: 1 },
          });
        }}
      >
        <h3>Now Spinning</h3>
      </div>
      <div
        className={
          post.type === 2
            ? "makePost__typeSelect__option__active"
            : "makePost__typeSelect__option"
        }
        onClick={() => {
          postDispatch({
            type: "update",
            payload: { location: "type", updateValue: 2 },
          });
        }}
      >
        <h3>Misc</h3>
      </div>
    </div>
  );

  //-------functions to remove albums and photos when user clicks the red x--------

  const handleAlbumRemove = (_albumID) => {
    let localArray = [...post.albums];
    postDispatch({
      type: "update",
      payload: {
        location: "albums",
        updateValue: localArray.filter((album) => album.id !== _albumID),
      },
    });
  };

  const handlePhotoRemove = (_photoURL) => {
    let localArray = [...post.photos];
    postDispatch({
      type: "update",
      payload: {
        location: "photos",
        updateValue: localArray.filter((photo) => photo !== _photoURL),
      },
    });
  };

  //------------------------primary JSX for component--------------------------
  //---------------------------------------------------------------------------

  return (
    <postContext.Provider value={{ post, postDispatch }}>
      <div className="makePost">
        {postTypeSelect}
        {postInput}
        {post.albums.length > 0 && (
          <div className="makePost__albumTagDisplay">
            {post.albums.map((album) => {
              return (
                <div className="makePost__albumTagDisplay__card">
                  <img src={album.cover} />
                  <div className="makePost__albumTagDisplay__card__info">
                    <h3>{album.title}</h3>
                    <h4>{album.artist}</h4>
                  </div>
                  <h3
                    onClick={() => {
                      handleAlbumRemove(album.id);
                    }}
                  >
                    x
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {post.photos.length > 0 && (
          <div className="makePost__photoTagDisplay">
            {post.photos.map((photo) => {
              return (
                <div className="makePost__photoTagDisplay__card">
                  <img src={photo} alt="" />
                  <h3
                    onClick={() => {
                      handlePhotoRemove(photo);
                    }}
                  >
                    x
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        <MakePostBottom
          isAddingAlbum={isAddingAlbum}
          setIsAddingAlbum={setIsAddingAlbum}
        />
      </div>
    </postContext.Provider>
  );
}

export default MakePost;
