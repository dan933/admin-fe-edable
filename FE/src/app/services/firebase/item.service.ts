import { Injectable, Type } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { noSQLData } from './no-sql-data';
import { doc, limit, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { getType } from '@angular/flex-layout/extended/style/style-transforms';
import { EventType } from '@angular/router';
import { throwError, timeout } from 'rxjs';
import { Organisation } from 'src/app/models/Organisation/Organisation';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    public storage: AngularFireStorage,
    public fs: AngularFirestore
  ) { }

  //------------------------ DONATION ITEMS ------------------------\\

  //------------------------ READ DONATION ITEMS -------------------\\

  getItems(orgID) {
    let items = this.fs
      .collection('Organisations').doc(orgID).collection('Items')
      .valueChanges({ idField: "id" })
    return items

  }

  //------------------------ DELETE DONATION ITEMS -------------------\\

  async deleteItem(orgID: string, itemID: string) {

    //Get item
    const itemDocument = this.fs
      .collection('Organisations')
      .doc(orgID).collection('Items')
      .doc(itemID);

    //Get item donations collection
    const itemDonationColl = itemDocument.collection('ItemsDonations', query => query.limit(1));

    let donations: any;

    itemDonationColl.valueChanges().subscribe(data => {
      donations = data;

      if (donations.length > 0) {
        console.log("item has donations records. it cannot be deleted");
        return;
      }
      console.log("item can be deleted");
      itemDocument.delete();

      return;
    });

  }
}
