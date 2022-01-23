const { createStore } = require("redux");

// init reducer
function todos(state = [], action) {
  const { type, text } = action;
  switch (type) {
    case "ADD_TODO":
      return state.concat([text]);
    default:
      return state;
  }
}

const store = createStore(todos, ["Use Redux"]);

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs"
});

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
