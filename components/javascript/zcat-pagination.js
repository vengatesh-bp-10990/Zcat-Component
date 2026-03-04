import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatPagination extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }),
      currentPage: prop('number', { default: 1 }),
      rowsPerPage: prop('number', { default: 10 })
    };
  }

  init() {
    this._syncState();
  }

  _syncState() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    if (zcatProp.currentPage) this.setData('currentPage', zcatProp.currentPage);
    if (zcatProp.rowsPerPage) this.setData('rowsPerPage', zcatProp.rowsPerPage);
  }

  _getTotalPages() {
    let zcatProp = this.getData('zcatProp');
    let total = zcatProp && zcatProp.totalRecords ? zcatProp.totalRecords : 0;
    let perPage = this.getData('rowsPerPage');
    return Math.max(1, Math.ceil(total / perPage));
  }

  _fireCallback(page) {
    let self = this.getData('self');
    let zcatProp = this.getData('zcatProp');
    if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
      self.executeMethod(zcatProp.callback.name, page, this.getData('rowsPerPage'), zcatProp);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      goToFirst() {
        this.setData('currentPage', 1);
        this._fireCallback(1);
      },
      goToPrev() {
        let page = Math.max(1, this.getData('currentPage') - 1);
        this.setData('currentPage', page);
        this._fireCallback(page);
      },
      goToNext() {
        let total = this._getTotalPages();
        let page = Math.min(total, this.getData('currentPage') + 1);
        this.setData('currentPage', page);
        this._fireCallback(page);
      },
      goToLast() {
        let total = this._getTotalPages();
        this.setData('currentPage', total);
        this._fireCallback(total);
      },
      changeRowsPerPage(event) {
        let val = parseInt(event.target.value, 10);
        this.setData('rowsPerPage', val);
        this.setData('currentPage', 1);
        this._fireCallback(1);
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

export { ZcatPagination };
