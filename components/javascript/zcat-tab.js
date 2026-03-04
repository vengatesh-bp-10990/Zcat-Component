import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatTab extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }),
      activeTabId: prop('string', { default: '' })
    };
  }

  init() {
    this._syncState();
  }

  _syncState() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    if (zcatProp.activeTab) {
      this.setData('activeTabId', zcatProp.activeTab);
    } else if (zcatProp.list && zcatProp.list.length > 0) {
      this.setData('activeTabId', zcatProp.list[0].id);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      selectTab(item) {
        if (!item || item.disabled) return;
        this.setData('activeTabId', item.id);

        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, item, zcatProp);
        }
      },
      closeTab(item, event) {
        if (event) { event.stopPropagation(); }
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.onClose) {
          self.executeMethod(zcatProp.onClose, item, zcatProp);
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

export { ZcatTab };
