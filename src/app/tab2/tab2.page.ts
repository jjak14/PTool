import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  gcIdVal: number;
  gcIdUnit = 'in';
  gcLengthVal: number;
  gcLengthUnit = 'mi';
  gcPresVal: number;
  gcPresUnit = 'psig';
  gcFlowVal: number;
  gcFlowUnit = 'mmscfd';
  gcSpeedMph: number;
  gcRunTimeHr: number;
  gccardfilled = false;
  gcidfilled = false;
  gcTempSpeedMph: string;

  constructor() {}

  functionIdConvert(luniteId: string, valeurId: number) {
    if (luniteId === 'in') {
      return (valeurId);
    } else if (luniteId === 'mm') {
      return (valeurId / 25.4);
    }
  }

  functionLengthConvert(luniteLength: string, valeurLength: number) {
    if (luniteLength === 'mi') {
      return (valeurLength);
    } else if (luniteLength === 'ft') {
      return (valeurLength / 5280);
    } else if (luniteLength === 'm') {
      return (valeurLength / 1609.344);
    } else if (luniteLength === 'km') {
      return (valeurLength / 1.609344);
    }
  }

  functionPresConvert(lunitePress: string, valeurPress: number) {
    if (lunitePress === 'psig') {
      return (valeurPress);
    } else if (lunitePress === 'MPa') {
      return (valeurPress / 130.34178860722002);
    } else if (lunitePress === 'bar') {
      return (valeurPress / 14.50377);
    } else if (lunitePress === 'atm') {
      return (valeurPress / 14.69595);
    }
  }

  functionFlowConvert(luniteFlow: string, valeurFlow: number) {
    if (luniteFlow === 'mmscfd') {
      return (valeurFlow);
    } else if (luniteFlow === 'scfd') {
      return (valeurFlow / 1000000);
    } else if (luniteFlow === 'scfm') {
      return (valeurFlow / 694.44);
    }
  }

  functionSpeedCal(diam: number, Press: number, Debit: number) {
    return ((Debit
      / (24 *
        (1.965 * Press * Math.pow(diam, 2)))).toFixed(2));
  }

  functionRunTimeCal(long: number, Vite: number) {
    return (long / Vite).toFixed(2);
  }

  changegcLengthUnit($event) {
    this.gcLengthUnit = ($event.target.value);
  }

  changegcIdUnit($event) {
    this.gcIdUnit = ($event.target.value);
  }

  changegcPresUnit($event) {
    this.gcPresUnit = ($event.target.value);
  }

  changegcFlowUnit($event) {
    this.gcFlowUnit = ($event.target.value);
  }

  onClickSubmit() {
    this.gccardfilled = true;
    this.gcidfilled = true;


    const intermIdVal = this.functionIdConvert(this.gcIdUnit, this.gcIdVal);

    const intermLengthVal = this.functionLengthConvert(this.gcLengthUnit, this.gcLengthVal);

    const intermFlowVal = this.functionFlowConvert(this.gcFlowUnit, this.gcFlowVal);

    const intermPresVal = this.functionPresConvert(this.gcPresUnit, this.gcPresVal);

    this.gcSpeedMph = parseFloat(this.functionSpeedCal(intermIdVal, intermPresVal, intermFlowVal));

    this.gcRunTimeHr = parseFloat(this.functionRunTimeCal(intermLengthVal, this.gcSpeedMph));
  }

  onClickClear() {
    this.gccardfilled = false;
    this.gcidfilled = false;
    this.gcIdVal = 0;
    this.gcLengthVal = 0;
    this.gcPresVal = 0;
    this.gcFlowVal = 0;
  }

}
