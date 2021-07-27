import db from "../config/firebase";

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
