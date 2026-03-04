import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatPopover extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }),
      isOpen: prop('boolean', { default: false }),
      searchQuery: prop('string', { default: '' }),
      activeNested: prop('number', { default: -1 })
    };
  }

  didConnect() {
    let comp = this;
    this._outsideClickHandler = function(e) {
      let node = comp.$node;
      if (node && !node.contains(e.target) && comp.getData('isOpen')) {
        comp.setData('isOpen', false);
        comp.setData('activeNested', -1);
      }
    };
    document.addEventListener('click', this._outsideClickHandler, true);
  }

  didDestroy() {
    if (this._outsideClickHandler) {
      document.removeEventListener('click', this._outsideClickHandler, true);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      togglePopover() {
        this.setData('isOpen', !this.getData('isOpen'));
        if (!this.getData('isOpen')) {
          this.setData('activeNested', -1);
          this.setData('searchQuery', '');
        }
      },
      selectItem(item) {
        if (item.disabled) return;
        if (item.nestedPopover) return; // handled by hover

        this.setData('isOpen', false);
        this.setData('activeNested', -1);
        this.setData('searchQuery', '');

        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, item, zcatProp);
        }
      },
      showNested(index) {
        this.setData('activeNested', index);
      },
      hideNested() {
        this.setData('activeNested', -1);
      },
      onSearchInput(event) {
        this.setData('searchQuery', event.target.value);
      },
      onCreateNew() {
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.onCreateNew) {
          self.executeMethod(zcatProp.onCreateNew, zcatProp);
        }
      }
    };
  }

  static observers() {
    return {};
  }
}

export { ZcatPopover };
