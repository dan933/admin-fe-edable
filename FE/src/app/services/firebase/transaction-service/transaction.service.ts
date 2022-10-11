import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { Item } from 'src/app/models/Item';
import { ItemDonations } from 'src/app/models/ItemDonations/ItemDonation';
import { GeneralDonations } from 'src/app/models/GeneralDonations/GeneralDonations';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    public storage: AngularFireStorage,
    public fs: AngularFirestore
  ) { }

  //------------------------ Gets a list of donation items for an organisation -------------------\\
  getItemDonations() {
    let itemDonations = this.fs.firestore.collectionGroup("ItemsDonations").get();
    return itemDonations;
  }

  //------------------------ Get Org Item Donations ----------------------------------------------\\
  getOrgItemDonations(orgID: string, itemID: string) {
    let itemDonations = this.fs.firestore.collection('Organisations')
      .doc(orgID)
      .collection("Items")
      .doc(itemID)
      .collection("ItemsDonations").get();
    return itemDonations;
  }

  //------------------------ Get Org General Donations -------------------------------------------\\
  getOrgGeneralDonations(orgID: string) {
    let orgGenDonations = this.fs.firestore.collection('Organisations')
      .doc(orgID)
      .collection("GeneralDonations").get();
    return orgGenDonations;
  }

  //------------------------ Get All General Donations -------------------------------------------\\
  getGeneralDonations() {
    let orgGenDonations = this.fs.firestore.collectionGroup('GeneralDonations').get();
    return orgGenDonations;
  }

  getOrgGeneralDonationsPrivate(orgID: string) {
    this.fs.firestore.collectionGroup('Private')
      // .where('IsAnon', '==', true)
      .get()
      .then((resp) => {
        let privateData: PrivateData[] = [];

        resp.docs.forEach((resp) => {
          
          privateData.push(resp.data() as PrivateData);

        });
        console.log(privateData);

      });

  }
}

interface PrivateData {
  IsAnon: boolean;
  agreeToContact: boolean;
  email: string;
  howHeardOther: string;
  mailingAddress: string;
  name: string;
  paypalTransactionId: string;
  phoneNumber: string;
}