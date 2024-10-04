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
