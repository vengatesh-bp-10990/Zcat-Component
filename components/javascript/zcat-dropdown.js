import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatDropdown extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      isOpen: prop('boolean', { default: false }),
      // Single select
      selectedValue: prop('string', { default: '' }),
      selectedLabel: prop('string', { default: '' }),
      // Multi select
      selectedValues: prop('array', { default: [] }),
      selectedItems: prop('array', { default: [] }),
      multiDisplayLabel: prop('string', { default: '' }),
      // Common
      searchQuery: prop('string', { default: '' }),
      filteredOptions: prop('array', { default: [] })
    };
  }

  init() {
    this._syncSelection();
    this._syncFilteredOptions();
  }

  didConnect() {
    let comp = this;
    this._outsideClickHandler = function(e) {
      let wrapper = comp.$node ? comp.$node.querySelector('.zcat-dropdown-wrapper') : null;
      if (wrapper && !wrapper.contains(e.target)) {
        comp.setData('isOpen', false);
        comp.setData('searchQuery', '');
        comp._syncFilteredOptions();
      }
    };
    document.addEventListener('click', this._outsideClickHandler, true);
  }

  didDestroy() {
    if (this._outsideClickHandler) {
      document.removeEventListener('click', this._outsideClickHandler, true);
    }
  }

  _isMultiMode() {
    let zcatProp = this.getData('zcatProp');
    return zcatProp && zcatProp.variant === 'multiple';
  }

  _syncSelection() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;

    if (this._isMultiMode()) {
      // Multi-select mode
      let selected = zcatProp.selected;
      if (!selected || !Array.isArray(selected)) {
        selected = [];
      }
      let options = zcatProp.options || [];
      let items = [];
      let values = [];
      for (let i = 0; i < selected.length; i++) {
        for (let j = 0; j < options.length; j++) {
          if (options[j].value === selected[i]) {
            items.push(options[j]);
            values.push(options[j].value);
            break;
          }
        }
      }
      this.setData('selectedValues', values);
      this.setData('selectedItems', items);
      this._buildMultiDisplayLabel(items);
      this.setData('selectedValue', '');
      this.setData('selectedLabel', '');
    } else {
      // Single-select mode
      if (zcatProp.selected && typeof zcatProp.selected === 'string') {
        let options = zcatProp.options || [];
        let found = null;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === zcatProp.selected) {
            found = options[i];
            break;
          }
        }
        if (found) {
          this.setData('selectedValue', found.value);
          this.setData('selectedLabel', found.name);
        } else {
          this.setData('selectedValue', '');
          this.setData('selectedLabel', '');
        }
      } else {
        this.setData('selectedValue', '');
        this.setData('selectedLabel', '');
      }
      this.setData('selectedValues', []);
      this.setData('selectedItems', []);
      this.setData('multiDisplayLabel', '');
    }
  }

  _buildMultiDisplayLabel(items) {
    if (!items || items.length === 0) {
      this.setData('multiDisplayLabel', '');
      return;
    }
    let maxShow = 2;
    let names = [];
    for (let i = 0; i < Math.min(items.length, maxShow); i++) {
      names.push(items[i].name);
    }
    let label = names.join(', ');
    if (items.length > maxShow) {
      label += ' +' + (items.length - maxShow);
    }
    this.setData('multiDisplayLabel', label);
  }

  _syncFilteredOptions() {
    let zcatProp = this.getData('zcatProp');
    let options = (zcatProp && zcatProp.options) ? zcatProp.options : [];
    let query = this.getData('searchQuery') || '';
    let isMulti = this._isMultiMode();
    let selectedVals = isMulti ? (this.getData('selectedValues') || []) : [];

    let source;
    if (query) {
      let q = query.toLowerCase();
      source = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].name && options[i].name.toLowerCase().indexOf(q) !== -1) {
          source.push(options[i]);
        }
      }
    } else {
      source = options.slice ? options.slice() : [];
    }

    // For multi mode, clone items and mark _selected + build _checkboxProp
    if (isMulti) {
      let showCheckbox = zcatProp.menuListType === 'checkbox';
      let result = [];
      for (let i = 0; i < source.length; i++) {
        let clone = {};
        for (let key in source[i]) {
          if (source[i].hasOwnProperty(key)) {
            clone[key] = source[i][key];
          }
        }
        clone._selected = selectedVals.indexOf(source[i].value) !== -1;
        if (showCheckbox) {
          clone._checkboxProp = {
            checked: clone._selected,
            size: 'small',
            disabled: clone.disabled || false
          };
        }
        result.push(clone);
      }
      this.setData('filteredOptions', result);
    } else {
      this.setData('filteredOptions', source);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      toggleDropdown(event) {
        if (event) { event.stopPropagation(); }
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) { return; }
        let wasOpen = this.getData('isOpen');
        this.setData('isOpen', !wasOpen);
        if (wasOpen) {
          this.setData('searchQuery', '');
          this._syncFilteredOptions();
        } else {
          this._syncFilteredOptions();
          let comp = this;
          setTimeout(function() {
            let searchInput = comp.$node ? comp.$node.querySelector('.zcat-dropdown-search-input') : null;
            if (searchInput) { searchInput.focus(); }
          }, 50);
        }
      },

      // Single-select: select item and close
      selectItem(item) {
        if (item && item.disabled) { return; }
        this.setData('selectedValue', item.value);
        this.setData('selectedLabel', item.name);
        this.setData('isOpen', false);
        this.setData('searchQuery', '');
        this._syncFilteredOptions();
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, item);
        }
      },

      // Multi-select: toggle item (don't close menu)
      toggleItem(item, event) {
        if (event) { event.stopPropagation(); }
        if (item && item.disabled) { return; }

        let selectedValues = (this.getData('selectedValues') || []).slice();
        let selectedItems = (this.getData('selectedItems') || []).slice();
        let idx = selectedValues.indexOf(item.value);

        if (idx !== -1) {
          // Remove
          selectedValues.splice(idx, 1);
          selectedItems = selectedItems.filter(function(i) { return i.value !== item.value; });
        } else {
          // Add — find original option (not clone)
          selectedValues.push(item.value);
          let zcatProp = this.getData('zcatProp');
          let options = (zcatProp && zcatProp.options) ? zcatProp.options : [];
          for (let i = 0; i < options.length; i++) {
            if (options[i].value === item.value) {
              selectedItems.push(options[i]);
              break;
            }
          }
        }

        this.setData('selectedValues', selectedValues);
        this.setData('selectedItems', selectedItems);
        this._buildMultiDisplayLabel(selectedItems);
        this._syncFilteredOptions();

        // Callback
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, selectedItems);
        }
      },

      // Remove chip in multi-chip mode
      removeChip(chip, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }

        let selectedValues = (this.getData('selectedValues') || []).filter(function(v) { return v !== chip.value; });
        let selectedItems = (this.getData('selectedItems') || []).filter(function(i) { return i.value !== chip.value; });

        this.setData('selectedValues', selectedValues);
        this.setData('selectedItems', selectedItems);
        this._buildMultiDisplayLabel(selectedItems);
        this._syncFilteredOptions();

        // Callback
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          self.executeMethod(zcatProp.callback.name, selectedItems);
        }
      },

      onSearchInput(event) {
        this.setData('searchQuery', event.target.value);
        this._syncFilteredOptions();
      },

      onTriggerKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.exec('toggleDropdown', event);
        } else if (event.key === 'Escape') {
          this.setData('isOpen', false);
          this.setData('searchQuery', '');
          this._syncFilteredOptions();
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

export { ZcatDropdown };
