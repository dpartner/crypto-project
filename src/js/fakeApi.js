export async function fetchCoins() {
  // data = await fetch('api'); Запрос на твой api  за данными
  const data = coins;
  return data;
}

export async function fetchUser() {
  // data = await fetch('api'); Запрос на твой api  за данными
  const data = user;
  return data;
}
export async function fetchHistory() {
  // data = await fetch('api'); Запрос на твой api  за данными
  const data = history;
  return data;
}

const coins = [
  {
    id: 1,
    name: 'Toncoin',
    symbolName: 'tonkoin.png',
    haveCoins: '3,47',
    price: '5,74',
    change: '3,65',
    total: '19,98',
  },
  {
    id: 2,
    name: 'USD₮',
    symbolName: 'usdt.png',
    haveCoins: '5,47',
    price: '1',
    change: '-5,3',
    total: '29.37',
  },
  {
    id: 3,
    name: 'DOGS',
    symbolName: 'dogs.png',
    haveCoins: '6,47',
    price: '0,0011',
    change: '10,55',
    total: '13.52',
  },
  {
    id: 1,
    name: 'Toncoin',
    symbolName: 'tonkoin.png',
    haveCoins: '3,47',
    price: '5,74',
    change: '3,65',
    total: '19,98',
  },
  {
    id: 2,
    name: 'USD₮',
    symbolName: 'usdt.png',
    haveCoins: '5,47',
    price: '1',
    change: '-5,3',
    total: '29.37',
  },
  {
    id: 3,
    name: 'DOGS',
    symbolName: 'dogs.png',
    haveCoins: '6,47',
    price: '0,0011',
    change: '10,55',
    total: '13.52',
  },
];

const user = {
  id: 23456,
  name: 'John Doe',
  email: 'john.doe@example.com',
  balance: '23567',
  photoUrl: '../img/user-photo.png',
};

const history = [
  {
    id: 1,
    date: 'Mar 12 2024 10:00:00 AM',
    coinName: 'USD₮',
    coinCode: 'USDT',
    symbolName: 'usdt.png',
    operation: 'buy',
    amount: '3,53',
  },
  {
    id: 2,
    date: 'Mar 13 2024 11:00:00 AM',
    coinName: 'DOGS',
    coinCode: 'DOGS',
    symbolName: 'dogs.png',
    operation: 'sold',
    amount: '5,27',
  },
  {
    id: 3,
    date: 'Mar 12 2024 09:00:00 AM',
    coinName: 'Toncoin',
    coinCode: 'TON',
    symbolName: 'tonkoin.png',
    operation: 'buy',
    amount: '5,65',
  },
  {
    id: 4,
    date: 'Mar 14 2024 10:00:00 AM',
    coinName: 'USD₮',
    coinCode: 'USDT',
    symbolName: 'usdt.png',
    operation: 'buy',
    amount: '7,35',
  },
  {
    id: 5,
    date: 'Mar 13 2024 11:00:00 AM',
    coinName: 'DOGS',
    coinCode: 'DOGS',
    symbolName: 'dogs.png',
    operation: 'buy',
    amount: '2,03',
  },
  {
    id: 6,
    date: 'Mar 15 2024 09:00:00 AM',
    coinName: 'Toncoin',
    coinCode: 'TON',
    symbolName: 'tonkoin.png',
    operation: 'buy',
    amount: '2,65',
  },
  {
    id: 7,
    date: 'Mar 13 2024 10:00:00 AM',
    coinName: 'USD₮',
    coinCode: 'USDT',
    symbolName: 'usdt.png',
    operation: 'sold',
    amount: '3,65',
  },
  {
    id: 8,
    date: 'Mar 15 2024 08:00:00 AM',
    coinName: 'DOGS',
    coinCode: 'DOGS',
    symbolName: 'dogs.png',
    operation: 'sold',
    amount: '3,25',
  },
  {
    id: 9,
    date: 'Mar 14 2024 09:00:00 AM',
    coinName: 'Toncoin',
    coinCode: 'TON',
    symbolName: 'tonkoin.png',
    operation: 'buy',
    amount: '9,65',
  },
];
