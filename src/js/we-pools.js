import { fetchPools } from './fakeApi.js';

const domElements = {
  loader: document.querySelector('.loader-wrap'),
  poolsList: document.querySelector('.pools-list'),
  poolsListImg: document.querySelector('.we-img-wrap img'),
};

const timeOut = ms => new Promise(resolve => setTimeout(resolve, ms));

addMarkup();

async function addMarkup() {
  domElements.loader.classList.remove('hidden');

  // Imitation fetch delay----------------------------------delete this
  const pause = await timeOut(800);
  // LOADER

  try {
    const markup = await createMarkup();
    domElements.poolsList.innerHTML = markup;
    domElements.loader.classList.add('hidden');
    domElements.poolsListImg.classList.add('shown');
    domElements.poolsList.classList.add('shown');
  } catch (error) {
    domElements.loader.children[1].innerHTML =
      'Something went wrong, please try again...';
  }
}

domElements.poolsList.addEventListener('click', handlePoolsChanger);

function handlePoolsChanger(e) {
  e.preventDefault();
  if (e.target.dataset.action === 'open-input') {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      'shown'
    );
    e.target.classList.toggle('open');
    setTimeout(() => {
      e.target.parentElement.parentElement.parentElement.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }, 1100);
  }
  if (e.target.dataset.action === 'max-value') {
    const value = e.target.dataset.maxvalue;
    console.log(value);
    e.target.previousElementSibling.value = value;
  }
  if (e.target.type === 'submit') {
    const value = e.target.parentElement.parentElement.children[0].value;
    e.target.parentElement.parentElement.children[0].value = '';
    // Write code below this, for sending data
    console.log(value);
  }
}

async function createMarkup() {
  const data = await fetchPools();
  const markup = data
    .map(pool => {
      let poolStatusCode = '';
      let poolStatusClass = '';
      if (pool.status === 'approve') {
        poolStatusCode = 'APR';
        poolStatusClass = 'aprove';
      } else {
        poolStatusCode = 'DIS';
        poolStatusClass = 'dis';
      }
      return `
      <li class="pools-list-item">
                <div class="pools-list-item-values-wrap">
                  <div class="pools-list-icon-wrap">
                    <img
                      src="../img/${pool.symbolName}"
                      width="32"
                      height="32"
                      alt="tonkoin"
                    />
                  </div>
                  <div class="pools-item-heading">
                    <h4>${pool.coinCode}</h4>
                    <span class="pools-item-heading-apr ${poolStatusClass}">${pool.value}% ${poolStatusCode}</span>
                    <span class="pools-item-heading-days">${pool.days} d</span>
                    <button type="button" class="pools-item-heading-button" data-action='open-input'>
                      <svg width="9" height="9">
                        <use
                          href="../img/svg/symbol-defs.svg#icon-down-arrow"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="pools-item-details-wrap">
                  <div class="pools-item-details-heading">
                    <p>Your Balance:</p>
                    <span class="pools-item-details-value">${pool.balance}</span>
                    <span class="pools-item-details-code"> ${pool.coinCode}</span>
                  </div>
                  <form class="pools-input-form" action="">
                    <input
                      class="pools-item-details-input"
                      type="number"
                      placeholder="Enter Amount"
                    />
                    <button type="button" class="pools-item-details-input-max-button" data-action='max-value' data-maxvalue='${pool.balance}'>
                      Max
                    </button>
                    <div class="pools-item-details-button-wrap">
                      <button
                        class="primary-button deactive pools-item-details-button"
                        disabled
                      >
                        Info
                      </button>
                      <button type='submit' class="primary-button pools-item-details-button">
                        Invest
                      </button>
                    </div>
                  </form>
                </div>
              </li>
    `;
    })
    .join('');
  return markup;
}
