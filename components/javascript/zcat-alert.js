import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatAlert extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }),
      showAlert: prop('boolean', { default: true })
    };
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      closeAlert() {
        this.setData('showAlert', false);
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, 'close', zcatProp);
        }
      }
    };
  }

  static observers() {
    return {};
  }
}

export { ZcatAlert };
