import { Injectable } from '@angular/core';
import { IAudiobook } from '../interfaces/my-media-data.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AudiobooksService {
  private tableName = 'audiobooks';
  constructor(private angularFirestore: AngularFirestore) {}

  public getValues(): Promise<IAudiobook[]> {
    return new Promise((resolve) => {
      const audiobooksList: IAudiobook[] = [];
      this.angularFirestore
        .collection(this.tableName)
        .snapshotChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          response.forEach((doc) => {
            const tmpAudiobook = doc.payload.doc.data() as IAudiobook;
            tmpAudiobook.id = doc.payload.doc.id;
            audiobooksList.push(tmpAudiobook);
          });
          resolve(audiobooksList);
        });
    });
  }

  public getValue(id: string): Promise<IAudiobook> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(id)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          resolve(response as IAudiobook);
        });
    });
  }

  public createValue(audiobook: IAudiobook): Promise<string> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .add(audiobook)
        .then((res) => {
          resolve(res.id);
        });
    });
  }

  public deleteValue(audiobook: IAudiobook): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(audiobook.id)
        .delete()
        .then(() => {
          resolve(true);
        });
    });
  }

  public updateValue(audiobook: IAudiobook): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(audiobook.id)
        .update(audiobook)
        .then(() => {
          resolve(true);
        });
    });
  }
}
