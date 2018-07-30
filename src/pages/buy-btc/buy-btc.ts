import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController } from 'ionic-angular';

import { EthProvider } from '../../providers/eth/eth';
import { BitgoProvider } from '../../providers/bitgo/bitgo';


/**
 * Generated class for the BuyBtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-btc',
  templateUrl: 'buy-btc.html',
})
export class BuyBtcPage {

  addressBtc = '...';
  error = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private bitgo: BitgoProvider,
    private eth: EthProvider
  ) { }

  async ionViewDidLoad() {

    const ethReady = await this.eth.onInit();
    const label = ethReady ? this.eth.account.address : 'test';

    this.error += label + '\n';

    this.bitgo.onInit().then(() => {
      return this.bitgo.getTopUpAddress(label);
    }).then(r => {
      this.addressBtc = r.address;
      console.log(r);
    }).catch(e => {
      console.log(e);
      this.error += e;
    });
  }

  copy() {
    window['Clipboard'].copy(this.addressBtc);
    const toast = this.toastCtrl.create({
      message: 'Address copied successfully',
      duration: 250
    });
    toast.present();
  }
}



window['Clipboard'] = (function (window, document, navigator) {
  var textArea,
    copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range,
      selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy
  };
})(window, document, navigator);