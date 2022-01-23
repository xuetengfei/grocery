const number = 12345.6789;

console.log(
  number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  }),
);
// $12,345.68

console.log(
  number.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }),
);
// 12.345,68 €

console.log(
  number.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }),
);
// ￥12,346
console.log(
  number.toLocaleString('en-US', {
    maximumSignificantDigits: 1,
  }),
);
// 10,000

console.log(
  number.toLocaleString('fr-FR', {
    maximumSignificantDigits: 3,
  }),
);
// 12 300

console.log(
  number.toLocaleString('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }),
);
// 12K

{
  const number = 0.1234;

  console.log(
    number.toLocaleString('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
    }),
  );
  // 12.34%
}

{
  const date = new Date();

  console.log(date.toLocaleTimeString('en-US'));

  const timeOptions = {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  };

  console.log(date.toLocaleTimeString('en-US', timeOptions));

  console.log(
    date.toLocaleTimeString('en-US', {
      timeZone: 'America/Los_Angeles',
    }),
  );
}
