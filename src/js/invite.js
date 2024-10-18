import { fetchFriendList } from './fakeApi.js';

const domElements = {
  loader: document.querySelector('.loader-wrap'),
  friendList: document.querySelector('.fl-list'),
  frienListSection: document.querySelector('.fl-section'),
  headingSection: document.querySelector('.hd-section'),
  inviteButtonWrap: document.querySelector('.button-wrap'),
};
const timeOut = ms => new Promise(resolve => setTimeout(resolve, ms));

addMarkup();

// --------------------Creating Upgrade markup-------------------

async function addMarkup() {
  domElements.loader.classList.remove('hidden');

  // Imitation fetch delay----------------------------------delete this
  const pause = await timeOut(800);
  // LOADER
  try {
    const friendListData = await fetchFriendList();

    const markupFriendList = createFriendListMarkup(friendListData);

    domElements.loader.classList.add('hidden');
    domElements.friendList.innerHTML = markupFriendList;
    domElements.headingSection.classList.add('shown');
    domElements.friendList.classList.add('shown');
    domElements.inviteButtonWrap.classList.add('shown');
    // setTimeout(() => {
    //   domElements.inviteButtonWrap.classList.add('shown');
    // }, 300);
  } catch (error) {
    domElements.loader.children[1].innerHTML =
      'Something went wrong, please try again...';
  }
}

function createFriendListMarkup(data) {
  const markup = data.map(({ id, coins, photoUrl }) => {
    let pictureWrapClass = 'hasPicture';
    if (!photoUrl) {
      photoUrl = '../img/svg/user-icon.svg';
      pictureWrapClass = '';
    }
    console.log(coins);
    return `
              <li class="fl-list-item">
                <div class="user-icon-wrap fl ${pictureWrapClass}">
                  <img src="${photoUrl}" alt="" />
                </div>
                <div class="fl-content">
                  <div class="fl-text-wrap">
                    <h2 class="fl-title">#user_${id}</h2>
                    <p class="fl-balance">${coins[0].value} ${coins[0].code} | ${coins[1].value} ${coins[1].code} </p>
                  </div>
                </div>
              </li>
    `;
  });
  return markup.join('');
}

// --------------------Creating Daily Check markup-------------------
