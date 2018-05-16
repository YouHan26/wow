'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxObservable = require('redux-observable');

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _index = require('redux/index');

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _createAction = require('./createAction');

var _createAction2 = _interopRequireDefault(_createAction);

var _getEpicMiddleware = require('./getEpicMiddleware');

var _getEpicMiddleware2 = _interopRequireDefault(_getEpicMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _epics = [];
var _reducersObj = {};
var _store = void 0;
var _plugins = void 0;

function _addPlugins(plugin) {}

function _addEpic(epics) {
  if (epics) {
    _epics.push(Object.values(epics));
  }
}

function _addReducer(namespace, initState, handles) {
  _reducersObj[namespace] = (0, _createReducer2.default)(initState, handles);
}

function _addModel(model) {
  var namespace = model.namespace,
      state = model.state,
      epics = model.epics,
      reducers = model.reducers;


  _addEpic(epics);
  _addReducer(namespace, state, reducers);
}

function _start(Root, domId) {
  //start to create store
  var rootEpic = _reduxObservable.combineEpics.apply(null, _epics);
  var _trueReducers = (0, _index.combineReducers)(_reducersObj);

  //TODO extra epic inject plugin
  var epicMiddleware = (0, _getEpicMiddleware2.default)(rootEpic, {});

  _store = (0, _configureStore2.default)(_trueReducers, epicMiddleware);

  var App = function App() {
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: _store },
      _react2.default.createElement(Root, null)
    );
  };

  _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById(domId));
}

exports.default = {
  getStore: function getStore() {
    return _store;
  },
  addModel: _addModel,
  start: _start,
  createAction: _createAction2.default
};