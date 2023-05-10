import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { firebaseconfig } from '../../firebaseconfig';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private db = getFirestore(initializeApp(firebaseconfig));

  public getData() {
    return new Promise((resolve, reject) => {
      // try {
      //   addDoc(collection(this.db, "users"), {
      //     first: "Ada", last: "Lovelace", born: 1815
      //   }).then((res) => {
      //     console.log("Document written with ID: ", res.id);
      //   })
      //
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }

      getDocs(collection(this.db, 'users')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {});
        resolve(true);
      });
    });
  }
}
