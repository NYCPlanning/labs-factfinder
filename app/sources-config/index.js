export default [
  {
    id: 'decennial-current',
    label: '2020',
    type: 'census',
    year: '2020',
    mode: 'current',
    selected: true,
  },
  {
    id: 'decennial-previous',
    label: '2010',
    type: 'census',
    year: '2010',
    mode: 'previous',
    selected: false,
  },
  {
    id: 'decennial-change',
    label: 'Change Over Time (2010 to 2020)',
    type: 'census',
    year: null,
    mode: 'change',
    selected: false,
  },
  {
    id: 'acs-current',
    label: '2018 - 2022',
    type: 'acs',
    year: '2018-2022',
    mode: 'current',
    selected: false,
  },
  {
    id: 'acs-previous',
    label: '2006 - 2010',
    type: 'acs',
    year: '2006-2010',
    mode: 'previous',
    selected: false,
  },
  {
    id: 'acs-change',
    label: 'Change Over Time (2006-2010 to 2018-2022)',
    type: 'acs',
    year: null,
    mode: 'change',
    selected: false,
  },
];
