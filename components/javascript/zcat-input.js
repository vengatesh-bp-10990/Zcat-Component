import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatInput extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object'),
      value: prop('string', { default: '' })
    };
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      onInputChange(event) {
        this.setData('value', event.target.value);
      },
      onInputFocus() {}
    };
  }

  static observers() {
    return {};
  }
}

export { ZcatInput };
