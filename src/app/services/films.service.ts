import { Injectable } from '@angular/core';
import { IFilm } from '../interfaces/my-media-data.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private tableName = 'films';
  constructor(private angularFirestore: AngularFirestore) {}

  public getValues(): Promise<IFilm[]> {
    return new Promise((resolve) => {
      const filmsList: IFilm[] = [];
      this.angularFirestore
        .collection(this.tableName)
        .snapshotChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          response.forEach((doc) => {
            const tmpFilm = doc.payload.doc.data() as IFilm;
            tmpFilm.id = doc.payload.doc.id;
            filmsList.push(tmpFilm);
          });
          resolve(filmsList);
        });
    });
  }

  public getValue(id: string): Promise<IFilm> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(id)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          resolve(response as IFilm);
        });
    });
  }

  public createValue(film: IFilm): Promise<string> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .add(film)
        .then((res) => {
          resolve(res.id);
        });
    });
  }

  public deleteValue(film: IFilm): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(film.id)
        .delete()
        .then(() => {
          resolve(true);
        });
    });
  }

  public updateValue(film: IFilm): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(film.id)
        .update(film)
        .then(() => {
          resolve(true);
        });
    });
  }
}
