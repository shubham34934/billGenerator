import { myConfigureStore } from "./myRedux.js";
let initialState = {
  name: "Shubham",
  age: 50,
  post: 0,
};

let DECREASE = "post/decrease";
let INCREASE = "post/increase";

let incrementBtn = document.querySelector(".inc-btn");
let decrementBtn = document.querySelector(".dec-btn");

function reducer(state = initialState, action) {
  switch (action.type) {
    case DECREASE:
      return { ...state, post: state.post - 1 };
    case INCREASE:
      return { ...state, post: state.post + 1 };
    default:
      return state;
  }
}

let myStore = myConfigureStore(reducer);
myStore.subscribe(() => {
  let state = myStore.getState();
  updateCount(state.post);
});

incrementBtn.addEventListener("click", () => {
  myStore.dispatch({ type: INCREASE });
});
decrementBtn.addEventListener("click", () => {
  myStore.dispatch({ type: DECREASE });
});

function updateCount(value) {
  let postSpan = document.querySelector(".post-count");
  postSpan.textContent = value;
}

var getPosts = new Promise((resolve, reject) => {
  // do some stuffs
  //resolve or reject;
  setTimeout(() => {
    resolve("resolved");
  }, 1000);
});

window.getPosts = getPosts;

getPosts
  .then((res) => {
    console.log(res, "res1");
    return res;
  })
  .then((res) => {
    console.log(res, "res2");
  })
  .catch();

let testPromise = Promise.resolve("rejected");

function MyPromise() {
  this.sum = (a, b) => {
    console.log(a + b, "Sum");
    return a + b;
  };
}

let myInstance = new MyPromise();

console.log(myInstance.sum(6, 4));
