import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatCodeSnippet extends Component {
  constructor() {
    super();
  }
  data() {
    return {
      zcatProp: prop('object'),
      self: prop('object')
    };
  }
  static methods() { return {}; }
  static actions() { return {}; }
  static observers() { return {}; }
}
export { ZcatCodeSnippet };
