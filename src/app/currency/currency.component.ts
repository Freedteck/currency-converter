import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSemanticModule } from 'ngx-semantic';
import { CurrencyApiService } from '../currency-api.service';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [NgxSemanticModule, CommonModule, FormsModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css',
})
export class CurrencyComponent {
  currencies = [
    { text: 'US Dollars', value: 'USD' },
    { text: 'Euros', value: 'EUR' },
    { text: 'British Pounds', value: 'GBP' },
    { text: 'Japanese Yen', value: 'JPY' },
    { text: 'Naira', value: 'NGN' },
  ];

  fromCurrency: string = '';
  toCurrency: string = '';
  amount: string = '';
  conversionRate: string | null = null;
  errorMessage: string | null = null;
  conversionResult: string | null = null;
  isError: boolean = false;

  constructor(private convertCurrency: CurrencyApiService) {}

  isValidConversion(): boolean {
    return this.fromCurrency !== this.toCurrency;
  }

  onSubmit(): void {
    this.clearMessages();

    if (this.isValidConversion()) {
      this.isError = false;
      this.convertCur();
    } else {
      this.isError = true;
      this.errorMessage = 'Please select different currencies to convert.';
    }
    console.log(this.isError);
  }

  convertCur(): void {
    this.convertCurrency
      .convertCurrency(this.fromCurrency, this.toCurrency, Number(this.amount))
      .subscribe(
        (response) => {
          this.conversionRate = `1 ${
            response.base_code
          } = ${response.conversion_rate.toFixed(2)} ${response.target_code}`;
          this.conversionResult = `${this.amount} ${
            this.fromCurrency
          } = ${response.conversion_result.toFixed(2)} ${this.toCurrency}`;
        },
        (error) => {
          console.error('Conversion error:', error);
          this.errorMessage = 'An error occurred while processing the request.';
          this.isError = true;
        }
      );
  }

  clearMessages(): void {
    this.errorMessage = null;
    this.conversionResult = null;
    this.conversionRate = null;
  }

  getDisplayMessage(): string {
    return this.errorMessage || this.conversionRate || '';
  }
}
