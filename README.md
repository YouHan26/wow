# wow
Inspired by Dva.  
basic package based on reudx, redux-observable.
support react and react-native.

#### compared to dva：
##### G：
* 没有侵入性
* 预留default reducer处理，支持高阶reducer
* 对旧项目友好，改造成本极低
* 能够使用rx 方法，对异步有强处理能力

##### NG:
* 强依赖rxjs，比较笨重


### Install
```js
npm install inori   // for react web
npm install inori-native // for react native
```

### peer dependency
```js
    "react",
    "react-dom",
    "react-redux",
    "redux",
    "redux-observable",
    "rxjs",

    // option    
    "redux-devtools-extension": for web debug
    "remote-redux-devtools": for react-native debug
    "remotedev-rn-debugger": for react-native debug
```


### Usage

write model:
```js
const model = {
  namespace: 'coupon',
  state: {
    details: {},
    records: [],
  },
  epics:{
    loadCopon: (action$, store) => {
      return action$.ofType('coupon/loadCoupon')
        .map((action) => {
          return {type: 1}
        });
    },
  },
  reducers: {
    showLoading(state, action){
      return {...state, loading: true};
    },
    // handle high order reducer
    default(state, action){
      return state;
    }
  }
};


export default model;
```

write page:
```js
import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import inori from 'inori';

const {createAction} = inori;

class Page extends PureComponent{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.loadCoupon();
  }


  render(){
    console.log(this.props);

    return (
      <div>
        this is page super
      </div>
    );
  }
}


export default connect((state) => {
  return {state};
}, {
  loadCoupon: createAction('coupon/loadCoupon')
})(Page);
```

write entry file:
```js
import inori from 'inori';
import model from './activity/demo/model';
import Page from "./activity/demo/Page";

inori.addModel(model);

inori.start(Page, 'root');

```

### API

```js
addModel(model) // add model for inori
```
```js
start(Root, 'domId') //start inori
```
```js
startNative(Root): App // start inori for react-native
```

```js
createAction(actionName)   // simple action create for connect view
```

```js
addReducer(reducerKey, reducerHandle) // push origin reducer handle to inori control
```

```js
addEpic(epic or epic Array)    //push origin epic to inori control
```

```js
addPlugin(pluginKey, plugin)   // inject dependency to redux-observable
```

```js
addMiddleware(middlewares or middleware)   // redux middleware
```

### TODO
* [x] support react native
* [ ] replece reducer
* [ ] reducer version conflict
* [ ] epic replace
* [ ] plugin system(doing)
* [ ] subsription feature
