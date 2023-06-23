import { Injectable } from '@angular/core';
import { IManga } from '../interfaces/my-media-data.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private tableName = 'manga';
  constructor(private angularFirestore: AngularFirestore) {}

  public getValues(): Promise<IManga[]> {
    return new Promise((resolve) => {
      const mangaList: IManga[] = [];
      this.angularFirestore
        .collection(this.tableName)
        .snapshotChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          response.forEach((doc) => {
            const tmpManga = doc.payload.doc.data() as IManga;
            tmpManga.id = doc.payload.doc.id;
            mangaList.push(tmpManga);
          });
          resolve(mangaList);
        });
    });
  }

  public getValue(id: string): Promise<IManga> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(id)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          resolve(response as IManga);
        });
    });
  }

  public createValue(manga: IManga): Promise<string> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .add(manga)
        .then((res) => {
          resolve(res.id);
        });
    });
  }

  public deleteValue(manga: IManga): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(manga.id)
        .delete()
        .then(() => {
          resolve(true);
        });
    });
  }

  public updateValue(manga: IManga): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(manga.id)
        .update(manga)
        .then(() => {
          resolve(true);
        });
    });
  }
}
