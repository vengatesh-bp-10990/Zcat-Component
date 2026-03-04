import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatCards extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      selectedValue: prop('string', { default: '' }),
      selectedValues: prop('array', { default: [] }),
      _renderCards: prop('array', { default: [] }),
      _wrapperTypeClass: prop('string', { default: 'zcat-cards-default' }),
      _wrapperLayoutClass: prop('string', { default: 'zcat-cards-horizontal' })
    };
  }

  init() {
    this._syncSelection();
    this._buildRenderCards();
  }

  _syncSelection() {
    let zcatProp = this.getData('zcatProp');
    if (!zcatProp) return;
    let type = zcatProp.type || 'default';

    if (type === 'single_sel') {
      this.setData('selectedValue', zcatProp.selected || '');
      this.setData('selectedValues', []);
    } else if (type === 'multi_sel') {
      this.setData('selectedValues', (zcatProp.selected && Array.isArray(zcatProp.selected)) ? zcatProp.selected.slice() : []);
      this.setData('selectedValue', '');
    }
  }

  _buildRenderCards() {
    let zcatProp = this.getData('zcatProp') || {};
    let type = zcatProp.type || 'default';
    let selVal = this.getData('selectedValue');
    let selVals = this.getData('selectedValues') || [];
    let cards = zcatProp.cards || [];
    let bgVariant = zcatProp.bgVariant || 'primary';

    let rendered = [];
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      let isSelected = false;
      if (type === 'single_sel') {
        isSelected = card.value === selVal;
      } else if (type === 'multi_sel') {
        isSelected = selVals.indexOf(card.value) !== -1;
      }
      rendered.push({
        title: card.title || '',
        description: card.description || '',
        icon: card.icon || '',
        value: card.value || '',
        disabled: card.disabled || false,
        _bgVariant: bgVariant,
        _isSelected: isSelected,
        _selectedClass: isSelected ? 'selected' : '',
        _radioCheckedClass: (type === 'single_sel' && isSelected) ? 'checked' : '',
        _checkboxCheckedClass: (type === 'multi_sel' && isSelected) ? 'checked' : ''
      });
    }
    this.setData('_renderCards', rendered);

    // Wrapper classes
    let typeClass = 'zcat-cards-default';
    if (type === 'single_sel') typeClass = 'zcat-cards-single';
    else if (type === 'multi_sel') typeClass = 'zcat-cards-multi';
    this.setData('_wrapperTypeClass', typeClass);
    this.setData('_wrapperLayoutClass', zcatProp.layout === 'vertical' ? 'zcat-cards-vertical' : 'zcat-cards-horizontal');
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      selectCard(card) {
        if (card.disabled) return;
        let zcatProp = this.getData('zcatProp');
        let type = (zcatProp && zcatProp.type) || 'default';

        if (type === 'default') {
          let self = this.getData('self');
          if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
            self.executeMethod(zcatProp.callback.name, card);
          }
          return;
        }

        if (type === 'single_sel') {
          this.setData('selectedValue', card.value);
          this._buildRenderCards();
          let self = this.getData('self');
          if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
            self.executeMethod(zcatProp.callback.name, card);
          }
        }

        if (type === 'multi_sel') {
          let vals = (this.getData('selectedValues') || []).slice();
          let idx = vals.indexOf(card.value);
          if (idx !== -1) {
            vals.splice(idx, 1);
          } else {
            vals.push(card.value);
          }
          this.setData('selectedValues', vals);
          this._buildRenderCards();
          let self = this.getData('self');
          if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
            self.executeMethod(zcatProp.callback.name, vals);
          }
        }
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          this._syncSelection();
          this._buildRenderCards();
        }
      }
    };
  }
}

export { ZcatCards };
