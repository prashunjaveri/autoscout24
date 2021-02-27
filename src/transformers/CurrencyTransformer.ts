export const  currencyConverter = (avg :any) => {
  avg.dealer = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(avg.dealer);
  avg.private = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(avg.private);
  avg.others = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(avg.others);
  return avg;
};