import { createVNode, render } from 'vue';

class BaseComponent {
  constructor(vueComponent) {
    this.vueComponent = vueComponent;
    this.targetMap = {};
  }

  show(options = {}) {
    let target = options.target || 'body';
    let targetDom = document.querySelector(target);
    if (this.targetMap[target]) return;
    let parent = document.body;
    let wrapEle = document.createElement("div");

    options.visible = true;

    const vm = createVNode(
      this.vueComponent,
      options,
      options.slots
    );
    render(vm, wrapEle);

    if (targetDom !== document.body) {
      parent = targetDom;
      vm.el.style.position = 'absolute';
    } else {
      vm.el.style.position = 'fixed';
    }
    parent.appendChild(wrapEle.firstElementChild);
    vm.component.proxy.show?.();

    this.targetMap[target] = { vm, wrapEle };
  }

  hidden(options = {}) {
    const target = options.target || 'body';
    if (!this.targetMap[target]) return;
    const { vm, wrapEle } = this.targetMap[target];
    vm.component.proxy.hidden?.();
    render(null, wrapEle);
    this.targetMap[target] = null;
  }

  hiddenAll() {
    for (let key in this.targetMap) {
      if (!this.targetMap[key]) continue;
      const { vm, wrapEle } = this.targetMap[key];
      vm.component.proxy.hidden?.();
      render(null, wrapEle);
      this.targetMap[target] = null;
    }
    this.targetMap = {};
  }
}

export default BaseComponent;