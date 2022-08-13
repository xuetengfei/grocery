const defaultoptions = {};

export default class Toast {
  //   #wrapper;
  //   #wrapper;
  //   #wrapper;
  constructor(options) {
    Object.entries({ ...defaultoptions, ...options }).forEach(([k, v]) => {
      this[k] = v;
    });
  }
  set position(position) {
    console.log('positin', position);
  }
  show() {}
  update() {}
  remove() {}
  show() {}
}
