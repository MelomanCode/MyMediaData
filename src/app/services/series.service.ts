import { Injectable } from '@angular/core';
import { ISeries } from '../interfaces/my-media-data.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private tableName = 'series';
  constructor(private angularFirestore: AngularFirestore) {}

  public getValues(): Promise<ISeries[]> {
    return new Promise((resolve) => {
      const seriesList: ISeries[] = [];
      this.angularFirestore
        .collection(this.tableName)
        .snapshotChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          response.forEach((doc) => {
            const tmpSeries = doc.payload.doc.data() as ISeries;
            tmpSeries.id = doc.payload.doc.id;
            seriesList.push(tmpSeries);
          });
          resolve(seriesList);
        });
    });
  }

  public getValue(id: string): Promise<ISeries> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(id)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          resolve(response as ISeries);
        });
    });
  }

  public createValue(series: ISeries): Promise<string> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .add(series)
        .then((res) => {
          resolve(res.id);
        });
    });
  }

  public deleteValue(series: ISeries): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(series.id)
        .delete()
        .then(() => {
          resolve(true);
        });
    });
  }

  public updateValue(series: ISeries): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection(this.tableName)
        .doc(series.id)
        .update(series)
        .then(() => {
          resolve(true);
        });
    });
  }
}
