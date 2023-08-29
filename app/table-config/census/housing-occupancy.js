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
  {
    data: null,
  },
  { data: 'hmownvcrt', title: 'Homeowner vacancy rate (percent)', decimal: 1 },
  { data: 'rntvcrt', title: 'Rental vacancy rate (percent)', decimal: 1 },
];
