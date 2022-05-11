export const INVENTORY = [
  {
    sku: 'WL2WDPG080',
    name: 'Wool Lounger Dapple Grey (Cream) W, W8',
    weight: 3,
    length: 10,
    width: 15,
    height: 10,
  },
  {
    sku: 'RI1MNC0110',
    name: 'Runner Insole Natural Grey M11',
    weight: 10,
    length: 15,
    width: 15,
    height: 5,
  },
  {
    sku: 'PCC1HONU302',
    name: 'Trino Cozy Crew Heathered Onyx, M',
    weight: 5,
    length: 25,
    width: 25,
    height: 15,
  },
  {
    sku: 'MATC1SFGU001',
    name: 'The Cap SF Grey',
    weight: 1,
    length: 10,
    width: 10,
    height: 5,
  },
  {
    sku: 'SH1UONX102',
    name: 'Onyx Hiders, M',
    weight: 8,
    length: 15,
    width: 15,
    height: 10,
  },
]

export const SKUS = INVENTORY.map(({ sku }) => sku)

export const REGIONS = [
  {
    id: 'WEST', // San Diego
    latitude: 32.71165305688028,
    longitude: -117.16016672934522,
    zip: 92101,
  },
  {
    id: 'NORTHWEST', // Boise
    latitude: 43.611921648428684,
    longitude: -116.2032074715205,
    zip: 83702,
  },
  {
    id: 'PLAINS', // Bismark
    latitude: 46.80544206755176,
    longitude: -100.78566484057313,
    zip: 58501,
  },
  {
    id: 'ROCKIES', // Denver,
    latitude: 39.747240988104444,
    longitude: -104.99692348203082,
    zip: 80202,
  },
  {
    id: 'SOUTHWEST', // El Paso
    latitude: 31.756208464770566,
    longitude: -106.4868673898995,
    zip: 79901,
  },
  {
    id: 'MIDWEST', // Chicago
    latitude: 41.87921873726596,
    longitude: -87.62443063999633,
    zip: 60604,
  },
  {
    id: 'MIDATLANTIC', // Washington, DC
    latitude: 38.90321888286468,
    longitude: -77.03984610421384,
    zip: 20036,
  },
  {
    id: 'NORTHEAST', // Boston
    latitude: 42.360530377648956,
    longitude: -71.05684914337722,
    zip: '02109',
  },
  {
    id: 'SOUTH', // Memphis
    latitude: 35.144132101407,
    longitude: -90.04855851768812,
    zip: 38103,
  },
  {
    id: 'SOUTHEAST', // Jacksonville
    latitude: 30.327680987740656,
    longitude: -81.65712693037243,
    zip: 32202,
  },
]
