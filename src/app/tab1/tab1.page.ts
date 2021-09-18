import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lcIdVal: number;
  lcLengthVal: number;
  lcFlowVal: number;
  lcVolBbl: number;
  lcSpeedMph: number;
  lcRunTimeHr: number;
  cardfilled = false;
  idfilled = false;
  flowfilled = false;
  lcIdUnit = 'in';
  lcLengthUnit = 'mi';
  lcFlowUnit = 'bph';

  constructor() {}

  functionVolCal(long: number, diam: number) {
    return ((long * 1609.344) *
      (Math.PI * ((diam / (39.37 * 2)) *
      (diam / (39.37 * 2)))) * 6.2898).toFixed(2);
  }

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

  functionFlowConvert(luniteFlow: string, valeurFlow: number) {
    if (luniteFlow === 'bph') {
      return (valeurFlow);
    } else if (luniteFlow === 'bpd') {
      return (valeurFlow * 24);
    } else if (luniteFlow === 'bpm') {
      return (valeurFlow / 60);
    } else if (luniteFlow === 'gpm') {
      return (valeurFlow / 0.7);
    } else if (luniteFlow === 'gph') {
      return (valeurFlow * 42);
    } else if (luniteFlow === 'm3/h') {
      return (valeurFlow * 6.29);
    } else if (luniteFlow === 'm3/s') {
      return (valeurFlow * 6.29 / 3600);
    } else if (luniteFlow === 'ft3/h') {
      return (valeurFlow * 5.76);
    }
  }

  onClickSubmit() {
    this.cardfilled = true;
    this.idfilled = true;
    this.flowfilled = true;

    const intermIdVal = this.functionIdConvert(this.lcIdUnit, this.lcIdVal);

    const intermLengthVal = this.functionLengthConvert(this.lcLengthUnit, this.lcLengthVal);

    const intermFlowVal = this.functionFlowConvert(this.lcFlowUnit, this.lcFlowVal);

    this.lcVolBbl = parseFloat(this.functionVolCal(intermLengthVal, intermIdVal));

    const SpeedMph = ((intermFlowVal / (intermIdVal * intermIdVal * 5)).toFixed(2)
    );
    this.lcSpeedMph = parseFloat(SpeedMph);

    const RunTimeHr = ((this.lcVolBbl / intermFlowVal).toFixed(2)
    );
    this.lcRunTimeHr = parseFloat(RunTimeHr);
  }

  onClickClear() {
    this.cardfilled = false;
    this.idfilled = false;
    this.flowfilled = false;
    this.lcIdVal = 0;
    this.lcLengthVal = 0;
    this.lcFlowVal = 0;
    this.lcIdUnit = 'in';
    this.lcLengthUnit = 'mi';
    this.lcFlowUnit = 'bph';
  }

  changeLcLengthUnit($event) {
    this.lcLengthUnit = ($event.target.value);
  }

  changelcIdUnit($event) {
    this.lcIdUnit = ($event.target.value);
  }

  changelcFlowUnit($event) {
    this.lcFlowUnit = ($event.target.value);
  }
}
