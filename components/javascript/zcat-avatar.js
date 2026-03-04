import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatAvatar extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      _initial: prop('string', { default: '?' }),
      _sizeClass: prop('string', { default: 'zcat-avatar-md' })
    };
  }

  init() {
    this._computeAvatar();
  }

  _computeAvatar() {
    let zcatProp = this.getData('zcatProp');
    // Compute initial
    let initial = '?';
    if (zcatProp && zcatProp.name && zcatProp.name.length > 0) {
      let parts = zcatProp.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        initial = (parts[0][0] + parts[1][0]).toUpperCase();
      } else {
        initial = parts[0][0].toUpperCase();
      }
    }
    this.setData('_initial', initial);
    // Compute size class
    let size = (zcatProp && zcatProp.size) || '';
    let sizeClass = 'zcat-avatar-md';
    if (size === 'small') sizeClass = 'zcat-avatar-sm';
    else if (size === 'large') sizeClass = 'zcat-avatar-lg';
    else if (size === 'extra-large') sizeClass = 'zcat-avatar-xl';
    this.setData('_sizeClass', sizeClass);
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      onAvatarClick() {
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, zcatProp);
        }
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          this._computeAvatar();
        }
      }
    };
  }
}

export { ZcatAvatar };
