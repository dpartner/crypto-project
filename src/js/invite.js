import { fetchDailyUpgrade, fetchDailyTasks } from './fakeApi.js';

const domElements = {
  loader: document.querySelector('.loader-wrap'),
  weBalanceValue: document.querySelector('.we-balance-value'),
  upgradeList: document.querySelector('.up-list'),
  tasksList: document.querySelector('.tsk-list'),
  upgradeNotif: document.querySelector('.up-item-notif'),
  tasksNotif: document.querySelector('.tsk-item-notif'),
  tgSection: document.querySelector('.tg-section'),
  weBalanceSection: document.querySelector('.we-balance-section'),
  tskItems: document.querySelectorAll('.tsk-list-item'),
};
const timeOut = ms => new Promise(resolve => setTimeout(resolve, ms));

addMarkup();

domElements.upgradeList.addEventListener('click', handleUpgrade);
domElements.tasksList.addEventListener('click', handleTasks);

// --------------------Creating Upgrade markup-------------------

async function addMarkup() {
  domElements.loader.classList.remove('hidden');

  // Imitation fetch delay----------------------------------delete this
  const pause = await timeOut(800);
  // LOADER
  try {
    const dataUpgrade = await fetchDailyUpgrade();
    const dataTasks = await fetchDailyTasks();

    const markupUpgrade = createDailyUpgradeMarkup(dataUpgrade);
    const markupTasks = createDailyTasksMarkup(dataTasks);

    domElements.loader.classList.add('hidden');
    domElements.upgradeList.innerHTML = markupUpgrade;
    domElements.tasksList.innerHTML = markupTasks;
    domElements.tgSection.classList.add('shown');
    domElements.weBalanceSection.classList.add('shown');
    domElements.upgradeList.classList.add('shown');
    setTimeout(() => {
      domElements.tasksList.classList.add('shown');
    }, 500);
  } catch (error) {
    domElements.loader.children[1].innerHTML =
      'Something went wrong, please try again...';
  }
}

function createDailyUpgradeMarkup(data) {
  const markup = data.map(({ nameUp, value, lvl }) => {
    return `
    <li class="up-list-item" data-action="${value}" >
              <h4 class="up-item-name">${nameUp}</h4>
              <p class="up-item-value-wrap">
                <span class="up-item-value">-${value}</span>
                WE · Lvl
                <span class="up-item-lvl">${lvl}</span>
              </p>
            </li>
    `;
  });
  return markup.join('');
}

// --------------------Creating Daily Check markup-------------------

function createDailyTasksMarkup(data) {
  const markup = data.map(({ nameTask, buttonName, value }, index) => {
    const delay = index * 100;
    return `
    <li class="tsk-list-item" style="transition-delay: ${delay}ms">
              <p class="tsk-item-name">${nameTask}</p>
                <button type='button' class="tsk-item-btn" data-value='${value}'=>${buttonName}</button>
            </li>
    `;
  });
  return markup.join('');
}

// Animation UPGRADE notification and change WE Balance

function handleUpgrade(e) {
  let left = e.target.getBoundingClientRect().left;
  let top = e.target.getBoundingClientRect().top;
  domElements.upgradeNotif.style.left = left + 'px';
  domElements.upgradeNotif.style.top = top + 'px';
  const targetCoordinateY = -(
    top - domElements.weBalanceValue.getBoundingClientRect().top
  );
  const targetCoordinateX = -(
    left - domElements.weBalanceValue.getBoundingClientRect().left
  );
  domElements.upgradeNotif.classList.add('shown');
  domElements.upgradeNotif.style.transform = `translate(${targetCoordinateX}px, ${targetCoordinateY}px)`;

  const balanceAddValue = Number(
    e.target.dataset.action.replace(',', '.')
  ).toFixed(3);
  const weBalanceValue = Number(
    domElements.weBalanceValue.textContent.replace(',', '.')
  ).toFixed(3);
  const sumBalanceValue = (
    Number(balanceAddValue) + Number(weBalanceValue)
  ).toFixed(3);

  setTimeout(() => {
    domElements.weBalanceValue.textContent = sumBalanceValue;
    domElements.weBalanceValue.classList.add('up');
    setTimeout(() => {
      domElements.weBalanceValue.classList.remove('up');
    }, 500);
    domElements.upgradeNotif.classList.remove('shown');
    domElements.upgradeNotif.style.removeProperty('transform');
    e.target.classList.add('removed');
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 1000);
  }, 1300);
}

// Animation TASKS notification and change WE Balance

function handleTasks(e) {
  console.dir(e.target);
  if (e.target.type === 'button') {
    let left = e.target.getBoundingClientRect().left;
    let top = e.target.getBoundingClientRect().top;
    console.log(left, top);
    domElements.tasksNotif.style.left = left + 'px';
    domElements.tasksNotif.style.top = top + 'px';
    const targetCoordinateY = -(
      top - domElements.weBalanceValue.getBoundingClientRect().top
    );
    const targetCoordinateX = -(
      left - domElements.weBalanceValue.getBoundingClientRect().left
    );
    domElements.tasksNotif.textContent = e.target.textContent + 'ed';
    domElements.tasksNotif.classList.add('shown');
    domElements.tasksNotif.style.transform = `translate(${targetCoordinateX}px, ${targetCoordinateY}px)`;

    const balanceAddValue = Number(
      e.target.dataset.value.replace(',', '.')
    ).toFixed(3);
    const weBalanceValue = Number(
      domElements.weBalanceValue.textContent.replace(',', '.')
    ).toFixed(3);
    const sumBalanceValue = (
      Number(balanceAddValue) + Number(weBalanceValue)
    ).toFixed(3);

    setTimeout(() => {
      domElements.weBalanceValue.textContent = sumBalanceValue;
      domElements.weBalanceValue.classList.add('up');
      setTimeout(() => {
        domElements.weBalanceValue.classList.remove('up');
      }, 500);
      domElements.tasksNotif.classList.remove('shown');
      domElements.tasksNotif.style.removeProperty('transform');
      e.target.parentElement.classList.add('removed');
      setTimeout(() => {
        e.target.parentElement.style.display = 'none';
      }, 1400);
    }, 1400);
  }
}

document.body.addEventListener('click', e => {
  console.log(e.target.getBoundingClientRect().bottom);
});
