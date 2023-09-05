export default [
  { data: 'hunits', title: 'Total housing units', highlight: true },
  { data: 'ochu_1', title: 'Occupied housing units' },
  { data: 'vachus', title: 'Vacant housing units' },
  { data: 'vhufrnt', title: 'For rent', indent: 1 },
  { data: 'vhurnoc', title: 'Rented, not occupied', indent: 1 },
  { data: 'vhufslo', title: 'For sale only', indent: 1 },
  { data: 'vhusnoc', title: 'Sold, not occupied', indent: 1 },
  {
    data: 'vhufsroou',
    title: 'For seasonal, recreational, or occasional',
    indent: 1,
  },
  { data: 'vhumigwrk', title: 'For migrant workers', indent: 1 },
  { data: 'vhuothvc', title: 'Other vacant', indent: 1 },
  { divider: true,},
  {
    data: 'hmownvcrt',
    title: 'Homeowner vacancy rate (percent)',
    decimal: 1,
    tooltip:
      'Number of vacant units "for sale only," divided by sum of owner-occupied units, vacant units that are "for sale only," and vacant units that have been sold but not yet occupied. Quotient is multiplied by 100.',
  },
  {
    data: 'rntvcrt',
    title: 'Rental vacancy rate (percent)',
    decimal: 1,
    tooltip:
      'Number of vacant units "for rent only" divided by sum of renter-occupied units, vacant units that are "for rent only," and vacant units that have been rented by not yet occupied. Quotient is multiplied by 100.',
  },
];
