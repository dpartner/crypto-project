import { fetchCoins, fetchUser } from './fakeApi.js';

const domElements = {
  coinsList: document.querySelector('.tokens-list'),
  eye: document.querySelector('.balance-button-eye'),
  balance: document.querySelector('.balance'),
};

const user = fetchUser();

async function addMarkup() {
  const markup = (await createMarkup()).join('');
  domElements.coinsList.innerHTML = markup;
  domElements.balance.innerHTML = (await user).balance;
}

addMarkup();

domElements.eye.addEventListener('click', handleHiddenBalance);

async function handleHiddenBalance(e) {
  e.preventDefault();
  if (domElements.eye.classList.contains('hidden')) {
    domElements.eye.classList.remove('hidden');
    domElements.balance.innerHTML = (await user).balance;
    return;
  }
  domElements.eye.classList.add('hidden');
  domElements.balance.innerHTML = '😎😎😎';
}

async function createMarkup() {
  // Передаешь вызову функции api нужный аргумент например UserId
  const data = await fetchCoins();
  console.log(data);
  const markup = data.map(coin => {
    const change = parseFloat(coin.change.replace(/,/g, '.'));
    let changeSymbol = '';
    let upOrDownClass = '';
    if (change > 0) {
      changeSymbol = '+';
      upOrDownClass = 'up';
    }
    if (change < 0) {
      upOrDownClass = 'down';
    }
    return `
              <li class="tokens-list-item">
                <div>
                  <img src="../img/${coin.symbolName}" width="32" height="32" alt="tonkoin">
                </div>
                <div class="tokens-list-item-values-wrap">
                  <div class="tokens-item-heading">
                    <h4>${coin.name}</h4>
                    <span>${coin.haveCoins}</span>
                  </div>
                  <div class="tokens-item-summary">
                    <span class="tokens-item-summary-price">${coin.price}</span> 
                    <span class="tokens-item-summary-status ${upOrDownClass}">${changeSymbol}${coin.change}%</span> 
                    <span class="tokens-item-summary-sum">$ ${coin.total}</span>
                  </div>
                </div>
              </li>
    `;
  });
  return markup;
}
