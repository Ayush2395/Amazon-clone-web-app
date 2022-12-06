import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

class productServices {
  constructor(collectionRef) {
    this.collectionRef = collectionRef;
  }
  getProducts(collectionPath) {
    this.collectionRef = collection(db, collectionPath);
    return getDocs(this.collectionRef);
  }

  previewProduct(collectionPath, id) {
    this.collectionRef = collection(db, collectionPath);
    const docRef = doc( this.collectionRef,id);
    return getDoc(docRef);
  }
}

export default new productServices();
