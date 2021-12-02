import stores from '../data/storeData.js';

import AdminModel from './model.js';
import AdminStoreView from './storeView.js';
import AdminOrderView from './orderView.js';
import AdminController from './controller.js';
import OrderGenerator from './orderGenerator.js';

const yellowModel = new AdminModel(stores.yellow);
const yellowStoreView = new AdminStoreView(yellowModel);
const yellowOrderView = new AdminOrderView(yellowModel);
const yellowOrderGenerator = new OrderGenerator(yellowModel);
const yellowController = new AdminController(
  yellowModel,
  yellowOrderGenerator,
  yellowStoreView,
  yellowOrderView
);

function init() {
  yellowStoreView.printNotice(`${yellowModel.name} 어드민 페이지 생성`);
  yellowStoreView.renderClock();
  yellowStoreView.renderStoreName();
  yellowStoreView.renderStoreStatus();
  yellowStoreView.printNotice(`점포 상태: ${yellowModel.status}`, 'important');
  yellowStoreView.renderMenuList();
  yellowOrderView.renderOverallStatusCount();
  yellowController.setEventListener();
  yellowStoreView.printNotice('어드민 준비 완료');
}
init();
