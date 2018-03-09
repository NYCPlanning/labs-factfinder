export default [
  {
    title: 'Total households',
    highlight: true,
    data: 'hh2',
  },
  {
    title: 'Household income of less than $10,000',
    data: 'hhiu10',
  },
  {
    title: '$10,000 to $14,999',
    data: 'hhi10t14',
  },
  {
    title: '$15,000 to $24,999',
    data: 'hhi15t24',
  },
  {
    title: '$25,000 to $34,999',
    data: 'hhi25t34',
  },
  {
    title: '$35,000 to $49,999',
    data: 'hhi35t49',
  },
  {
    title: '$50,000 to $74,999',
    data: 'hhi50t74',
  },
  {
    title: '$75,000 to $99,999',
    data: 'hhi75t99',
  },
  {
    title: '$100,000 to $149,999',
    data: 'hi100t149',
  },
  {
    title: '$150,000 to $199,999',
    data: 'hi150t199',
  },
  {
    title: '$200,000 or more',
    data: 'hhi200pl',
  },
  {
    title: 'Median household income (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top- and bottom-coded values',
    data: 'mdhhinc',
    special: true,
  },
  {
    title: 'Mean household income (dollars)',
    tooltip: 'Aggregate household income in the past 12 months, divided by total households',
    data: 'mnhhinc',
    special: true,
  },
  {
    divider: true,
  },
  {
    title: 'Households with Social Security',
    data: 'inc_sosec',
  },
  {
    title: 'Households with retirement income',
    data: 'inc_rtrmt',
  },
  {
    title: 'Households with Supplemental Security Income',
    data: 'inc_spsec',
  },
  {
    title: 'Households with cash public assistance income',
    data: 'inc_cpba',
  },
  {
    title: 'Households with Food Stamp/SNAP benefits in the past 12 months',
    data: 'inc_snap',
  },
  {
    divider: true,
  },
  {
    title: 'Family households',
    highlight: true,
    data: 'fam2',
  },
  {
    title: 'Family income of less than $10,000',
    data: 'famiu10',
  },
  {
    title: '$10,000 to $14,999',
    data: 'fami10t14',
  },
  {
    title: '$15,000 to $24,999',
    data: 'fami15t24',
  },
  {
    title: '$25,000 to $34,999',
    data: 'fami25t34',
  },
  {
    title: '$35,000 to $49,999',
    data: 'fami35t49',
  },
  {
    title: '$50,000 to $74,999',
    data: 'fami50t74',
  },
  {
    title: '$75,000 to $99,999',
    data: 'fami75t99',
  },
  {
    title: '$100,000 to $149,999',
    data: 'fi100t149',
  },
  {
    title: '$150,000 to $199,999',
    data: 'fi150t199',
  },
  {
    title: '$200,000 or more',
    data: 'fami200pl',
  },
  {
    title: 'Median family income (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top- and bottom-coded values',
    data: 'mdfaminc',
    special: true,
  },
  {
    divider: true,
  },
  {
    title: 'Nonfamily households',
    highlight: true,
    data: 'nfam2',
  },
  {
    title: 'Median nonfamily income (dollars)',
    tooltip: 'Medians are calculated using linear interpolation, which may result in top- and bottom-coded values',
    data: 'mdnfinc',
    special: true,
  },
  {
    divider: true,
  },
  {
    title: 'Per capita income (dollars)',
    tooltip: 'Aggregate income in the past 12 months, divided by total population',
    data: 'percapinc',
    special: true,
  },
];
