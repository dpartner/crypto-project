import { fetchCoins, fetchUser, fetchHistory } from './fakeApi.js';

const domElements = {
  coinsList: document.querySelector('.tokens-list'),
  eye: document.querySelector('.balance-button-eye'),
  balance: document.querySelector('.balance'),
  tokensContainer: document.querySelector('.tokens-list-wrap'),
  historyButton: document.querySelector('.tokens-history-button'),
  balanceSection: document.querySelector('.balance-section'),
  tokensSection: document.querySelector('.tokens-section'),
  historySection: document.querySelector('.history-section'),
  closeHistoryButton: document.querySelector('.close-history'),
  historyListWrap: document.querySelector('.history-list-wrap'),
};

// ------------Add Markup-------------------

addMarkup();
const user = fetchUser();

async function addMarkup() {
  const markup = (await createMarkup()).join('');
  domElements.coinsList.innerHTML = markup;
  domElements.balance.innerHTML = (await user).balance;
}

// ------------Hide balance-------------------

domElements.eye.addEventListener('click', handleHiddenBalance);

// Hiiden user balance (eye button)
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

//------------- Create tokens wrap markup----------------
async function createMarkup() {
  // Передаешь вызову функции api нужный аргумент например UserId
  const data = await fetchCoins();
  // console.log(data);
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
                  <img src="../img/${coin.symbolName}" width="32" height="32" alt="${coin.name}">
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

// Animation tokens wrap
function scroolTokensWrap() {
  setTimeout(() => {
    domElements.tokensContainer.scroll({
      top: 20,
      behavior: 'smooth',
    });
  }, 2000);
  setTimeout(() => {
    domElements.tokensContainer.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, 2500);
}
// Start Animation tokens wrap when window loaded
window.addEventListener('load', () => {
  scroolTokensWrap();
});

// ------------History-------------------

domElements.historyButton.addEventListener('click', handleShowHistory);
domElements.closeHistoryButton.addEventListener('click', handleCloseHistory);

async function handleShowHistory(e) {
  e.preventDefault();
  // LOADER
  const markup = await createhistoryMarkup();
  domElements.historyListWrap.innerHTML = markup;

  toggleHistory();
}

function handleCloseHistory(e) {
  e.preventDefault();
  // LOADER
  toggleHistory();
}

function toggleHistory() {
  domElements.historySection.classList.toggle('hidden');
  domElements.tokensSection.classList.toggle('hidden');
  domElements.balanceSection.classList.toggle('hidden');
}

// Grouping array history transactions from date
async function dataGroupingHistory() {
  const history = await fetchHistory();
  console.log(history);
  const historyGroups = [];
  for (const trans of history) {
    const dateTrans = new Date(trans.date);
    const dateTransWithoutTime = getDateWithoutTime(dateTrans);
    if (historyGroups.length) {
      console.log(historyGroups);
      const findedGroup = historyGroups.find(group => {
        console.log(1);
        const dateGroup = new Date(group.date);
        return (
          dateTrans.getDate() === dateGroup.getDate() &&
          dateTrans.getMonth() === dateGroup.getMonth() &&
          dateTrans.getFullYear() === dateGroup.getFullYear()
        );
      });
      if (findedGroup) {
        console.log(2);
        findedGroup.transactions.push(trans);
      } else {
        historyGroups.push({
          date: dateTransWithoutTime,
          transactions: [trans],
        });
      }
    } else {
      console.log(3);
      historyGroups.push({
        date: dateTransWithoutTime,
        transactions: [trans],
      });
    }
  }

  return historyGroups;
}

function getDateWithoutTime(date) {
  // Create a new date object to avoid modifying the original date
  const dateWithoutTime = new Date(date);

  // Set seconds and milliseconds to zero
  dateWithoutTime.setSeconds(0, 0);

  // Format date components with padding
  const year = dateWithoutTime.getFullYear();
  const month = String(dateWithoutTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateWithoutTime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

async function createhistoryMarkup() {
  const groups = await dataGroupingHistory();
  const groupsSorted = groups.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  console.log(groups);
  const markup = groupsSorted.map(group => {
    const sortedTransactions = group.transactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    const date = new Date(group.date);
    const day = date.getDate();
    const month = '0' + (date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(2);
    return `<h2 class="history-list-date">${day}.${month}.${year}</h2>
    <ul class="history-list">${sortedTransactions
      .map(trans => {
        let valueClass = 'buy';
        let valueSymbol = '+';
        if (trans.operation === 'sold') {
          valueClass = 'sold';
          valueSymbol = '-';
        }
        return `<li class="history-list-item">
                <div>
                  <img src="../img/${trans.symbolName}" width="32" height="32" alt="tonkoin">
                </div>
                <div class="history-item-heading">
                  <h4>${trans.coinName}</h4>
                  <span class="history-item-value ${valueClass}">${valueSymbol}${trans.amount}</span>
                  <span class="history-item-code ${valueClass}">${trans.coinCode}</span>
                </div>
              </li>`;
      })
      .join('')} </ul>
    `;
  });
  return markup.join('');
}
