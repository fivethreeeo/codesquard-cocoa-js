'use-strict';

import TodoModel from './model.js';
import TodoView from './view.js';
import TodoController from './controller.js';

const model = new TodoModel('yellow');
const view = new TodoView(model);
const controller = new TodoController(model, view);

view.initializeView();
controller.init();
