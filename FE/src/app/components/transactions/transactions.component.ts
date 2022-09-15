import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/firebase/transaction-service/transaction.service';
import { Subscription } from 'rxjs';
import { ItemDonations } from 'src/app/models/ItemDonations/ItemDonation';


export interface PeriodicElement {
  date: string;
  name: string;
  email: string;
  donationItem: string;
  donationAmount: number;
  organisation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: "08/06/2022", name: "Jeff", email: "test@test.com", donationItem: "Flour", donationAmount: 200, organisation: "Barry's Bakehouse"},
  {date: "08/06/2022", name: "Jeff", email: "test@test.com", donationItem: "Flour", donationAmount: 200, organisation: "Barry's Bakehouse"},
  {date: "08/06/2022", name: "Jeff", email: "test@test.com", donationItem: "Flour", donationAmount: 200, organisation: "Barry's Bakehouse"},
  {date: "08/06/2022", name: "Jeff", email: "test@test.com", donationItem: "Flour", donationAmount: 200, organisation: "Barry's Bakehouse"},
  {date: "08/06/2022", name: "Jeff", email: "test@test.com", donationItem: "Flour", donationAmount: 200, organisation: "Barry's Bakehouse"},
  {date: "08/06/2022", name: "Jeff", email: "test@test.com", donationItem: "Flour", donationAmount: 200, organisation: "Barry's Bakehouse"},
  
  
];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  getItemDonationsSubscription: Subscription;
  itemDonations: ItemDonations[] = [];

  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['date', 'name', 'email', 'donationItem', 'donationAmount', 'organisation'];

  constructor(public ts:TransactionService) { }



  ngOnInit(): void {
   
  }

  //-------------------- Get item donations for singular org --------------------\\
  getOrgItemDonations(orgID:string, ItemID:string) {
        this.ts.getOrgItemDonations(orgID, ItemID).then((resp) => {resp.docs.forEach(resp => resp.data())});
  }

  //-------------------- Get all item donations ---------------------------------\\
  getItemDonations() {
    this.ts.getItemDonations().then((resp) => {resp.docs.forEach(resp => resp.data())});

  }

  //-------------------- Get General Donations for org --------------------------\\
  getOrgGenDonations(orgID:string) {
    this.ts.getOrgGeneralDonations(orgID).then((resp) => {resp.docs.forEach(resp => resp.data())});
  }
  //-------------------- Get All General Donations for --------------------------\\
  getGenDonations() {
    this.ts.getGeneralDonations().then((resp) => {resp.docs.forEach(resp => resp.data())});
  }
}