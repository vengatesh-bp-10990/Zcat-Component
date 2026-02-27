import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class TopbarComp extends Component {
  constructor() {
    super();
  }
  data() {
    return {
      headTitle: prop('string', { default: '' }),
      headDesc: prop('string', { default: '' })
    };
  }
  static methods() { return {}; }
  static actions() { return {}; }
  static observers() { return {}; }
}
export { TopbarComp };
