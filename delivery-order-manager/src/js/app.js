import stores from '../data/storeData.js';

import AdminModel from './model.js';
import AdminStoreView from './storeView.js';
import AdminOrderView from './orderView.js';
import AdminController from './controller.js';
import OrderGenerator from './orderGenerator.js';

const yModel = new AdminModel(stores.yellow);
const yStoreView = new AdminStoreView(yModel);
const yOrderView = new AdminOrderView(yModel);
const yOrderGenerator = new OrderGenerator(yModel);
const yController = new AdminController(
  yModel,
  yOrderGenerator,
  yStoreView,
  yOrderView
);

function init() {
  //view
  yStoreView.printNotice(`${yModel.name} 어드민 페이지 생성`);
  yStoreView.renderStoreName();
  yStoreView.renderClock();
  yStoreView.renderStoreStatus();
  yStoreView.renderMenuList();

  //controller
  yController.setEventListener();
}
init();
