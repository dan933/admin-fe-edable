import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { GeneralDonations } from 'src/app/models/GeneralDonations/GeneralDonations';
import { retry } from 'rxjs';
import { ItemDonations } from 'src/app/models/ItemDonations/ItemDonation';


@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(
    public storage: AngularFireStorage,
    public fs: AngularFirestore
  ) { }


  getGeneralDonations(orgID: string) {
    let generalDonations = this.fs
      .collection('Organisations')
      .doc(orgID)
      .collection('GeneralDonations')
      .valueChanges({ idField: 'id' });
    return generalDonations;
  }

  async getAllGeneralDonations() {
    let generalDonations: GeneralDonations[] = [];
    await this.fs.firestore
      .collectionGroup('GeneralDonations')
      .get().then((resp) => {
        resp.forEach((resp) => {
          generalDonations.push(resp.data() as GeneralDonations);
        });
      });
    return generalDonations;
  }

  getItemsDonations(orgID: string, itemID: string) {
    let itemDonations = this.fs
      .collection('Organisations')
      .doc(orgID)
      .collection('Items')
      .doc(itemID)
      .collection('ItemsDonations')
      .valueChanges({ idField: 'id' });
    return itemDonations;
  }

  async getAllItemsDonations() {
    let itemsDonations: ItemDonations[] = [];
    await this.fs.firestore
      .collectionGroup('ItemsDonations')
      .get().then((resp) => {
        resp.forEach((resp) => {
          itemsDonations.push(resp.data() as ItemDonations);
        });
      });
    return itemsDonations;
  }

  getAllGD() {
    let gd = this.fs
    .collectionGroup('Organisations')
      .valueChanges({ idField: 'id' });
    return gd;
  }

  getPrivateDetails(orgID: string, itemID: string, donationID: string) {
    let privateDetails = this.fs
      .collection('Organisations')
      .doc(orgID)
      .collection('Items')
      .doc(itemID)
      .collection('ItemsDonations')
      .doc(donationID)
      .collection('Private')
      .doc('Private')
      .valueChanges({ idField: 'id' });
    return privateDetails;
  }

  updateDonation(orgID: string, itemID: string, donationID: string, updatedDonation: any) {
    const donationDocument = this.fs
      .collection('Organisations')
      .doc(orgID)
      .collection('Items')
      .doc(itemID)
      .collection('ItemsDonations')
      .doc(donationID)
      .update(updatedDonation);
    return donationDocument;
  }
}
