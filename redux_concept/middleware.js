const Redux = require("redux");
const { createStore, applyMiddleware } = Redux;
const saga = require("redux-saga").default;
console.log("saga: ", saga);

// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

const sagaMiddleware = saga();

function logger({ getState }) {
  return next => action => {
    console.log("will dispatch", action);
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    console.log("state after dispatch", getState());
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

function todos(state = [], action) {
  const { type, text } = action;
  switch (type) {
    case "ADD_TODO":
      return state.concat([text]);
    default:
      return state;
  }
}

const store = createStore(
  todos,
  ["Use Redux"],
  applyMiddleware(sagaMiddleware, logger)
);
console.log("init store: ", store.getState());

store.dispatch({
  type: "ADD_TODO",
  text: "Understand the middleware"
});

console.log("then store: ", store.getState());
sagaMiddleware.run();
