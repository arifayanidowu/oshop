import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyFormat"
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    value = +value;
    if (!value) return null;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN"
    }).format(value);
  }
}
