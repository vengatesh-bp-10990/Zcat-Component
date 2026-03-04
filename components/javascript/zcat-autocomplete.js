import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatAutocomplete extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      isOpen: prop('boolean', { default: false }),
      searchQuery: prop('string', { default: '' }),
      filteredOptions: prop('array', { default: [] }),
      selectedValue: prop('string', { default: '' }),
      selectedLabel: prop('string', { default: '' }),
      highlightIndex: prop('number', { default: -1 })
    };
  }

  init() {
    this._syncSelection();
    this._syncFilteredOptions();
  }

  didConnect() {
    let comp = this;
    this._outsideClickHandler = function (e) {
      let wrapper = comp.$node ? comp.$node.querySelector('.zcat-autocomplete-wrapper') : null;
      if (wrapper && !wrapper.contains(e.target)) {
        comp.setData('isOpen', false);
      }
    };
    document.addEventListener('click', this._outsideClickHandler, true);
  }

  didDestroy() {
    if (this._outsideClickHandler) {
      document.removeEventListener('click', this._outsideClickHandler, true);
    }
  }

  _syncSelection() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    if (zcatProp.selected) {
      let options = zcatProp.options || [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === zcatProp.selected) {
          this.setData('selectedValue', options[i].value);
          this.setData('selectedLabel', options[i].name);
          this.setData('searchQuery', options[i].name);
          return;
        }
      }
    }
    this.setData('selectedValue', '');
    this.setData('selectedLabel', '');
  }

  _syncFilteredOptions() {
    let zcatProp = this.getData('zcatProp');
    let options = (zcatProp && zcatProp.options) ? zcatProp.options : [];
    let query = this.getData('searchQuery') || '';
    let filtered;

    if (query) {
      let q = query.toLowerCase();
      filtered = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].name && options[i].name.toLowerCase().indexOf(q) !== -1) {
          // clone with highlight info
          let clone = {};
          for (let key in options[i]) {
            if (options[i].hasOwnProperty(key)) {
              clone[key] = options[i][key];
            }
          }
          // Build highlighted name
          let name = options[i].name;
          let lowerName = name.toLowerCase();
          let idx = lowerName.indexOf(q);
          if (idx !== -1) {
            clone._highlightBefore = name.substring(0, idx);
            clone._highlightMatch = name.substring(idx, idx + q.length);
            clone._highlightAfter = name.substring(idx + q.length);
          } else {
            clone._highlightBefore = name;
            clone._highlightMatch = '';
            clone._highlightAfter = '';
          }
          filtered.push(clone);
        }
      }
    } else {
      filtered = options.slice ? options.slice() : [];
      for (let i = 0; i < filtered.length; i++) {
        filtered[i] = Object.assign({}, filtered[i]);
        filtered[i]._highlightBefore = filtered[i].name;
        filtered[i]._highlightMatch = '';
        filtered[i]._highlightAfter = '';
      }
    }

    this.setData('filteredOptions', filtered);
    this.setData('highlightIndex', -1);
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      onSearchInput(event) {
        let val = event.target.value;
        this.setData('searchQuery', val);
        this.setData('isOpen', true);
        this._syncFilteredOptions();
        // Clear selection if user is typing
        if (val !== this.getData('selectedLabel')) {
          this.setData('selectedValue', '');
          this.setData('selectedLabel', '');
        }
      },

      onSearchFocus() {
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) return;
        this.setData('isOpen', true);
        this._syncFilteredOptions();
      },

      onSearchKeydown(event) {
        let filteredOptions = this.getData('filteredOptions') || [];
        let highlightIndex = this.getData('highlightIndex');

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          let next = highlightIndex + 1;
          if (next >= filteredOptions.length) next = 0;
          this.setData('highlightIndex', next);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          let prev = highlightIndex - 1;
          if (prev < 0) prev = filteredOptions.length - 1;
          this.setData('highlightIndex', prev);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          if (highlightIndex >= 0 && highlightIndex < filteredOptions.length) {
            this.exec('selectItem', filteredOptions[highlightIndex]);
          }
        } else if (event.key === 'Escape') {
          this.setData('isOpen', false);
        }
      },

      selectItem(item) {
        if (item && item.disabled) return;
        this.setData('selectedValue', item.value);
        this.setData('selectedLabel', item.name);
        this.setData('searchQuery', item.name);
        this.setData('isOpen', false);
        this.setData('highlightIndex', -1);

        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, item);
        }
      },

      clearSearch(event) {
        if (event) { event.stopPropagation(); }
        this.setData('searchQuery', '');
        this.setData('selectedValue', '');
        this.setData('selectedLabel', '');
        this.setData('isOpen', false);
        this._syncFilteredOptions();

        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, null);
        }
      },

      createNewClicked() {
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.createNewBtn && zcatProp.createNewBtn.callback && zcatProp.createNewBtn.callback.name) {
          self.executeMethod(zcatProp.createNewBtn.callback.name);
        }
        this.setData('isOpen', false);
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          this._syncSelection();
          this._syncFilteredOptions();
        }
      }
    };
  }
}

export { ZcatAutocomplete };
