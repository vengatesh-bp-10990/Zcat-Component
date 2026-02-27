import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatToggle extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      isChecked: prop('boolean', { default: false })
    };
  }

  init() {
    this._syncState();
  }

  _syncState() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    this.setData('isChecked', !!zcatProp.checked);
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      onToggleChange(event) {
        if (event) { event.stopPropagation(); }
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) { return; }

        let newChecked = !this.getData('isChecked');
        this.setData('isChecked', newChecked);

        // Callback
        let self = this.getData('self');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          if (zcatProp.callback.arguments && zcatProp.callback.arguments.length) {
            self.executeMethod(zcatProp.callback.name, newChecked, zcatProp.callback.arguments);
          } else {
            self.executeMethod(zcatProp.callback.name, newChecked, zcatProp);
          }
        }
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          this._syncState();
        }
      }
    };
  }
}

export { ZcatToggle };
