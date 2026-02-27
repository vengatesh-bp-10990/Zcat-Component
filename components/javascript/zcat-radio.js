import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatRadio extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      selectedValue: prop('string', { default: '' })
    };
  }

  init() {
    this._syncState();
  }

  _syncState() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    if (zcatProp.selected) {
      this.setData('selectedValue', zcatProp.selected);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      onRadioSelect(item) {
        let zcatProp = this.getData('zcatProp');
        if (!zcatProp || zcatProp.disabled || (item && item.disabled)) return;

        let value = item.value;
        this.setData('selectedValue', value);

        // Callback
        let self = this.getData('self');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          if (zcatProp.callback.arguments && zcatProp.callback.arguments.length) {
            self.executeMethod(zcatProp.callback.name, value, zcatProp.callback.arguments);
          } else {
            self.executeMethod(zcatProp.callback.name, value, zcatProp);
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

export { ZcatRadio };
