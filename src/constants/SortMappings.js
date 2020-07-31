const captureDate = 'captureDate';
const createdAt = 'createdAt';
const splitter = ':';
const asc = 'asc';
const desc = 'desc';

const SortMappings = {
  captureDateDesc: {
    id: 'sBjLNIspgkaoQEno77NO2w',
    query: `${captureDate}${splitter}${desc}`,
    value: 'Capture Date: New to Old',
  },
  captureDateAsc: {
    id: 'aZd9o8TR4Eehn2xmD1wicg',
    query: `${captureDate}${splitter}${asc}`,
    value: 'Capture Date: Old to New',
  },
  createdAtDesc: {
    id: 'xSa5aE5p10m0sOZNkRgaMA',
    query: `${createdAt}${splitter}${desc}`,
    value: 'Creation Date: New to Old',
  },
  createdAtAsc: {
    id: 'zHvcq0Og80aCUsrThIZjWA',
    query: `${createdAt}${splitter}${asc}`,
    value: 'Creation Date: Old to New',
  },
};

export default SortMappings;
