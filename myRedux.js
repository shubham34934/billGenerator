export function myConfigureStore(reducer) {
  let state = undefined;
  let listeners = [];
  let store = {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => {
        listener();
      });
    },
    subscribe(listener) {
      listeners.push(listener);
      return function () {
        listeners.findIndex((ele) => ele === listener);
        listeners.splice(findIndex, 1);
      };
    },
  };
  store.dispatch({ type: "INIT" });
  return store;
}
