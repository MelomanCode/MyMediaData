import { Injectable } from '@angular/core';
import { ICount } from '../interfaces/my-media-data.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CountEntityService {
  constructor(private angularFirestore: AngularFirestore) {}

  public getValues(): Promise<ICount[]> {
    return new Promise((resolve) => {
      const countList: ICount[] = [];
      this.angularFirestore
        .collection('countEntity')
        .snapshotChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          response.forEach((doc) => {
            const tmpCount = doc.payload.doc.data() as ICount;
            tmpCount.id = doc.payload.doc.id;
            countList.push(tmpCount);
          });
          resolve(countList);
        });
    });
  }

  public getValue(id: string): Promise<ICount> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection('countEntity')
        .doc(id)
        .valueChanges()
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          resolve(response as ICount);
        });
    });
  }

  public createValue(count: ICount): Promise<string> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection('countEntity')
        .add(count)
        .then((res) => {
          resolve(res.id);
        });
    });
  }

  public deleteValue(count: ICount): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection('countEntity')
        .doc(count.id)
        .delete()
        .then(() => {
          resolve(true);
        });
    });
  }

  public updateValue(count: ICount): Promise<boolean> {
    return new Promise((resolve) => {
      this.angularFirestore
        .collection('countEntity')
        .doc(count.id)
        .update(count)
        .then(() => {
          resolve(true);
        });
    });
  }
}
