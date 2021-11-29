import stores from '../data/storeData.js';

import AdminModel from './model.js';
import AdminStoreView from './storeView.js';
import AdminOrderView from './orderView.js';
//import AdminController from './adminController.js';

const Model = new AdminModel(stores.yellow);
const StoreView = new AdminStoreView(Model);
//const OrderView = new AdminOrderView(Model);

function viewInit() {
  StoreView.renderStoreName();
  StoreView.renderClock();
}
viewInit();
