const showBtnEl = document.querySelector('.showBtn');
const rosterWrapEl = document.querySelector('.rosterWrap');
const rosterEl = document.querySelector('.roster');

class rosterController {
  constructor(roster) {
    this.roster = roster;
  }

  showBtnHandler = () => {
    let rosterStatus = false;
    let timeoutId;

    showBtnEl.addEventListener('mouseenter', () => {
      if (!rosterStatus) {
        timeoutId = setTimeout(() => {
          rosterWrapEl.classList.add('show');
          showBtnEl.classList.add('show');
        }, 1000);
      }
    });

    showBtnEl.addEventListener('mouseleave', () => {
      clearTimeout(timeoutId);
    });
  };

  cardHandler = () => {
    rosterEl.addEventListener('mousemove', (event) => {
      const countNode = event.target.parentNode.querySelector('.label');
      let count = Number(countNode.textContent);
      let timeoutId;

      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          timeoutId = null;
          count++;
          countNode.textContent = count;
        }, 500);
      }
    });
  };
}

const laLakersController = new rosterController();
laLakersController.showBtnHandler();
laLakersController.cardHandler();
