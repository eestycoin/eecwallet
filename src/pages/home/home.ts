import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { BitgoProvider } from '../../providers/bitgo/bitgo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  balance: number = 0;
  account: string = '0x';

  constructor(public navCtrl: NavController, public eth: EthProvider, private bitgo: BitgoProvider) {
    

    console.log('eth.ready.subscribe');

    // this.bitgo.onInit();
  }

  itemSelected(item: string) {
    this.navCtrl.push(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
  }

  async ionViewDidEnter() {
    // await this.eth.onInit();
    console.log(this.account);
  }

  async getBalance() {
    this.balance = await this.eth.getBalance();
    // this.account = this.eth.getAccount();
  }

}
