import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatKeyvaluePair extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      rows: prop('array', { default: [] })
    };
  }

  init() {
    this._syncRows();
  }

  _syncRows() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    let initial = zcatProp.rows || [];
    if (initial.length === 0) {
      initial = [this._createEmptyRow()];
    }
    // Clone rows with _id for tracking
    let rows = [];
    for (let i = 0; i < initial.length; i++) {
      let row = Object.assign({}, initial[i]);
      if (!row._id) row._id = Date.now() + '_' + i;
      rows.push(row);
    }
    this.setData('rows', rows);
  }

  _createEmptyRow() {
    let zcatProp = this.getData('zcatProp');
    let fieldDefs = (zcatProp && zcatProp.fieldDefs) || [
      { key: 'key', label: 'Key', type: 'input' },
      { key: 'value', label: 'Value', type: 'input' }
    ];
    let row = { _id: Date.now() + '_' + Math.random().toString(36).slice(2, 6) };
    for (let i = 0; i < fieldDefs.length; i++) {
      row[fieldDefs[i].key] = '';
    }
    return row;
  }

  _fireCallback() {
    let self = this.getData('self');
    let zcatProp = this.getData('zcatProp');
    let rows = this.getData('rows') || [];
    if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
      self.executeMethod(zcatProp.callback.name, rows);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      addRow() {
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) return;
        let maxRows = (zcatProp && zcatProp.maxRows) || 0;
        let rows = (this.getData('rows') || []).slice();
        if (maxRows && rows.length >= maxRows) return;
        rows.push(this._createEmptyRow());
        this.setData('rows', rows);
        this._fireCallback();
      },

      removeRow(row, event) {
        if (event) { event.stopPropagation(); }
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) return;
        let rows = (this.getData('rows') || []).filter(function(r) { return r._id !== row._id; });
        if (rows.length === 0) {
          rows = [this._createEmptyRow()];
        }
        this.setData('rows', rows);
        this._fireCallback();
      },

      onFieldInput(row, fieldKey, event) {
        let val = event.target.value;
        let rows = (this.getData('rows') || []).slice();
        for (let i = 0; i < rows.length; i++) {
          if (rows[i]._id === row._id) {
            rows[i] = Object.assign({}, rows[i]);
            rows[i][fieldKey] = val;
            break;
          }
        }
        this.setData('rows', rows);
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          this._syncRows();
        }
      }
    };
  }
}

export { ZcatKeyvaluePair };
