import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sl-tax-calculator';
  salary: number = 0;
  salaryWithoutPersonalTaxes: number = 0;
  personalTaxes: number = 0;
  salaryAfterEpfDeduction: number = 0;

  salaryChanged = (event: any) => {
    this.salary = event.target.value;
  }
  calculate = () => {
    if(!this.validate()) {
      alert("Enter a valid salary amount");
      return;
    }
    let relief = 100000;
    let percentageIncrement = 6;
    let taxableBlockPerYear = 500000;
    let epfPercentage = 8;
    let taxableAmount = this.salary - relief;
    let taxAmount = 0;
    
    if(taxableAmount > 0) {
        for(let x = 1; x <= 5; x++) {
          let currentBlockPercentage = percentageIncrement * x;
          let taxableBlockPerMonth = taxableBlockPerYear / 12;
          let amountToBeTaxed = (taxableAmount - taxableBlockPerMonth) > 0 ? taxableBlockPerMonth: taxableAmount;
          if(amountToBeTaxed > 0) {
            let tax = amountToBeTaxed * (currentBlockPercentage / 100.0);
            taxAmount += tax;
          }
          taxableAmount -= amountToBeTaxed;
        }
        if(taxableAmount > 0) {
          let tax = taxableAmount * (36 / 100.0);
          taxAmount += tax;
        }
      
    }
    this.salaryWithoutPersonalTaxes = this.salary - taxAmount;
    this.personalTaxes = taxAmount;
    this.salaryAfterEpfDeduction = this.salaryWithoutPersonalTaxes - (this.salary * (epfPercentage / 100.0));
  }
  validate = (): boolean => {
    return this.salary > 0;
  }
}
