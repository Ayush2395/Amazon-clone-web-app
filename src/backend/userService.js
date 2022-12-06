import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase.config";

class userService {
  constructor(collectionRef) {
    this.collectionRef = collectionRef;
  }

  createProfile(collectionPath, profile) {
    this.collectionRef = collection(db, collectionPath);
    return addDoc(this.collectionRef, profile);
  }

  displayProfile(collectionPath) {
    this.collectionRef = collection(db, collectionPath);
    return getDocs(this.collectionRef);
  }

  displayCart(collectionPath) {
    this.collectionRef = collection(db, collectionPath);
    return getDocs(this.collectionRef);
  }

  addToCart(collectionPath, product) {
    this.collectionRef = collection(db, collectionPath);
    return addDoc(this.collectionRef, product);
  }

  removeFromCart(collectionPath, id) {
    this.collectionRef = collection(db, collectionPath);
    const docRef = doc(this.collectionRef, id);
    return deleteDoc(docRef);
  }
}

export default new userService();
