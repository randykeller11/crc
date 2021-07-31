import db from "../config/firebase";
const axios = require("axios");

export async function getData(_collection, _uid, _stateUpdate) {
  var docRef = db.collection(_collection).doc(_uid);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        _stateUpdate(doc.data());
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

export async function writeToDb(_collection, _payload, _id) {
  // Add a new document in collection "users" with ID of userID
  const res = await db.collection(_collection).doc(`${_id}`).set(_payload);
}

export const whatRow = (_index) => {
  if (_index < 5) {
    return 0;
  } else if (_index >= 5 && _index < 10) {
    return 1;
  } else if (_index >= 10 && _index < 15) {
    return 2;
  }
};

export const initialPlaceholders = (_array, _isTopFive) => {
  let localArray = [];
  if (_isTopFive) {
    for (let i = 0; i < 5; i++) {
      if (i < _array.length) {
        localArray.push({ value: _array[i], index: i, row: whatRow(i) });
      } else {
        localArray.push({ value: 0, index: i, row: whatRow(i) });
      }
    }
  } else {
    for (let i = 0; i < 15; i++) {
      if (i < _array.length) {
        localArray.push({ value: _array[i], index: i, row: whatRow(i) });
      } else {
        localArray.push({ value: 0, index: i, row: whatRow(i) });
      }
    }
  }

  return localArray;
};

export const addPlaceholders = (_array, _isTopFive) => {
  let localArray = [];
  if (_isTopFive) {
    for (let i = 0; i < 5; i++) {
      if (i < _array.length) {
        let updatedAlbum = _array[i].hasOwnProperty("row");
        updatedAlbum
          ? localArray.push(_array[i])
          : localArray.push({ value: _array[i], index: i, row: whatRow(i) });
      } else {
        localArray.push({ value: 0, index: i, row: whatRow(i) });
      }
    }
  } else {
    for (let i = 0; i < 15; i++) {
      if (i < _array.length) {
        let updatedAlbum = _array[i].hasOwnProperty("row");
        updatedAlbum
          ? localArray.push(_array[i])
          : localArray.push({ value: _array[i], index: i, row: whatRow(i) });
      } else {
        localArray.push({ value: 0, index: i, row: whatRow(i) });
      }
    }
  }
  return localArray;
};

export async function getSearchData(url, _dispatch, _location) {
  try {
    const response = await axios.get(url);
    _dispatch({
      type: "update",
      payload: {
        location: _location,
        updateValue: response.data,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
