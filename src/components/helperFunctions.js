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
