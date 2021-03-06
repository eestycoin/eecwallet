import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { RatesProvider } from '../../providers/rates/rates';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { environment } from '../../app/environment';


@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  addressTo: string = environment.eth.wallet;
  amount: number = 1;
  max = 1;
  rate: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eth: EthProvider,
    private rates: RatesProvider,
    private db: FirebaseProvider
  ) {
    this.max = this.eth.account.balance;
    this.rate = this.rates.list[environment.coin];
  }

  @HostListener('input', ['$event'])
    onInput(event: Event) {
      const el = <HTMLInputElement>event.srcElement;
      el.value = el.value.replace(/[^0-9]/g, '');
    }

  onClick() {
    window.open('https://www.southxchange.com/', '_system', 'location=yes'); 
    return false;
  }

  onSubmit() {
    if (!this.amount || !this.addressTo)
      return;

    this.navCtrl.push('ConfirmPage', { func: this.onTransfer.bind(this) })
  }

  onChange(e: number) {
    setTimeout(() => {
      // this.amount = (this.amount >= this.max) ? Math.ceil(this.max) : this.amount;
    });
  }

  async onTransfer() {
    return this.eth
      .tranfer(this.addressTo, this.amount)
      .then(tx => this.db.saveItem(tx.transactionHash, this.eth.account.address, this.addressTo, this.amount));
  }

}
