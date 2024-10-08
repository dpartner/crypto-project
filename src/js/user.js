import { fetchUser } from './fakeApi.js';

const domElements = {
  headerUserId: document.querySelector('.header-user-id > span'),
  userIcon: document.querySelector('.user-icon-wrap > img'),
};
console.log(domElements.userIcon);

async function renderHeader() {
  const userInfo = await fetchUser();
  console.log(userInfo);
  domElements.headerUserId.textContent = userInfo.id;
  domElements.userIcon.src = userInfo.photoUrl;
  domElements.userIcon.style.width = 'auto';
  domElements.userIcon.style.height = '100%';
}

renderHeader();
