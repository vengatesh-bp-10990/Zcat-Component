import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatTable extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }),
      selectedRows: prop('array', { default: [] }),
      selectAll: prop('boolean', { default: false }),
      sortColumn: prop('string', { default: '' }),
      sortDirection: prop('string', { default: 'asc' }),
      _bodyRows: prop('array', { default: [] })
    };
  }

  init() {
    this._buildBodyRows();
  }

  _buildBodyRows() {
    let zcatProp = this.getData('zcatProp') || {};
    let body = zcatProp.body || [];
    let selectedRows = this.getData('selectedRows') || [];
    let rows = [];
    for (let i = 0; i < body.length; i++) {
      let isSelected = selectedRows.indexOf(i) > -1;
      let rowObj = { _rowIdx: i, _selectedClass: isSelected ? 'zcat-table-row-selected' : '', _isChecked: isSelected };
      // Copy all original row data properties
      let keys = Object.keys(body[i]);
      for (let k = 0; k < keys.length; k++) {
        rowObj[keys[k]] = body[i][keys[k]];
      }
      rows.push(rowObj);
    }
    this.setData('_bodyRows', rows);
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      toggleSelectAll() {
        let selectAll = !this.getData('selectAll');
        this.setData('selectAll', selectAll);

        let zcatProp = this.getData('zcatProp');
        let body = zcatProp && zcatProp.body ? zcatProp.body : [];
        if (selectAll) {
          this.setData('selectedRows', body.map(function(_, i) { return i; }));
        } else {
          this.setData('selectedRows', []);
        }
        this._buildBodyRows();

        let self = this.getData('self');
        if (self && zcatProp && zcatProp.onSelect) {
          self.executeMethod(zcatProp.onSelect, this.getData('selectedRows'), zcatProp);
        }
      },

      toggleRowSelect(rowIndex) {
        let selected = this.getData('selectedRows').slice();
        let idx = selected.indexOf(rowIndex);
        if (idx > -1) {
          selected.splice(idx, 1);
        } else {
          selected.push(rowIndex);
        }
        this.setData('selectedRows', selected);

        let zcatProp = this.getData('zcatProp');
        let body = zcatProp && zcatProp.body ? zcatProp.body : [];
        this.setData('selectAll', selected.length === body.length);
        this._buildBodyRows();

        let self = this.getData('self');
        if (self && zcatProp && zcatProp.onSelect) {
          self.executeMethod(zcatProp.onSelect, selected, zcatProp);
        }
      },

      sortBy(col) {
        let zcatProp = this.getData('zcatProp');
        if (!col.sortable) return;

        let direction = this.getData('sortDirection');
        let currentCol = this.getData('sortColumn');

        if (currentCol === col.value) {
          direction = direction === 'asc' ? 'desc' : 'asc';
        } else {
          direction = 'asc';
        }

        this.setData('sortColumn', col.value);
        this.setData('sortDirection', direction);

        let self = this.getData('self');
        if (self && zcatProp && zcatProp.onSort) {
          self.executeMethod(zcatProp.onSort, col.value, direction, zcatProp);
        }
      },

      onRowClick(row, index) {
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.onRowClick) {
          self.executeMethod(zcatProp.onRowClick, row, index, zcatProp);
        }
      },

      onMoreClick(row, index, event) {
        if (event) event.stopPropagation();
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.onMoreClick) {
          self.executeMethod(zcatProp.onMoreClick, row, index, event, zcatProp);
        }
      }
    };
  }

  static observers() {
    return {};
  }
}

export { ZcatTable };
