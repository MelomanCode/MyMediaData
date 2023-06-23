import { Injectable } from '@angular/core';
import { IAnime } from '../interfaces/my-media-data.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private tableName = 'anime';
  constructor(private angularFirestore: AngularFirestore) {}

  public getValues(): Promise<IAnime[]> {
    return new Promise((resolve) => {
      const animeList: IAnime[] = [];
      this.angularFirestore
        .collection(this.tableName)
        .snapshotChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          response.forEach((doc) => {
            const tmpAnime = doc.payload.doc.data() as IAnime;
            tmpAnime.id = doc.payload.doc.id;
            animeList.push(tmpAnime);
          });
          resolve(animeList);
        });
    });
  }

  public getValue(id: string): Promise<IAnime> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(id)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          resolve(response as IAnime);
        });
    });
  }

  public createValue(anime: IAnime): Promise<string> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .add(anime)
        .then((res) => {
          resolve(res.id);
        });
    });
  }

  public deleteValue(anime: IAnime): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(anime.id)
        .delete()
        .then(() => {
          resolve(true);
        });
    });
  }

  public updateValue(anime: IAnime): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(anime.id)
        .update(anime)
        .then(() => {
          resolve(true);
        });
    });
  }
}
