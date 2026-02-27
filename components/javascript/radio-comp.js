import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class RadioComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  didConnect() {
    this._bindCustomiseEvents();
  }

  _bindCustomiseEvents() {
    let comp = this;
    let node = this.$node;

    let variantSelect = node.querySelector('[data-action="changeRadioVariant"]');
    let sizeSelect = node.querySelector('[data-action="changeRadioSize"]');
    let directionSelect = node.querySelector('[data-action="changeRadioDirection"]');

    if (variantSelect) {
      variantSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('radioObj'), 'add', 'variant', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('radioObj'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (directionSelect) {
      directionSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('radioObj'), 'add', 'direction', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let radioObj = this.getData('radioObj') || {};
    let defaults = { variant: 'primary', size: 'default', direction: 'vertical', name: 'demo-radio' };

    // --- sLyte tab ---
    let slyte_code = '<zcat-radio\n  self="{{self}}"\n  zcat-prop="{{radioObj}}"\n></zcat-radio>';

    // --- JS tab ---
    let propObj = {};
    propObj.name = radioObj.name || defaults.name;
    if (radioObj.variant && radioObj.variant !== defaults.variant) { propObj.variant = radioObj.variant; }
    if (radioObj.size && radioObj.size !== defaults.size) { propObj.size = radioObj.size; }
    if (radioObj.direction && radioObj.direction !== defaults.direction) { propObj.direction = radioObj.direction; }
    if (radioObj.label) { propObj.label = radioObj.label; }
    if (radioObj.disabled) { propObj.disabled = true; }
    if (radioObj.selected) { propObj.selected = radioObj.selected; }
    propObj.options = radioObj.options || [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' }
    ];

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    radioObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    if (radioObj.name) { newSlyteAttrs.push('  zcat-prop-name="' + radioObj.name + '"'); }
    if (radioObj.variant && radioObj.variant !== defaults.variant) { newSlyteAttrs.push('  zcat-prop-variant="' + radioObj.variant + '"'); }
    if (radioObj.size && radioObj.size !== defaults.size) { newSlyteAttrs.push('  zcat-prop-size="' + radioObj.size + '"'); }
    if (radioObj.direction && radioObj.direction !== defaults.direction) { newSlyteAttrs.push('  zcat-prop-direction="' + radioObj.direction + '"'); }
    if (radioObj.label) { newSlyteAttrs.push('  zcat-prop-label="' + radioObj.label + '"'); }
    if (radioObj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    newSlyteAttrs.push('  zcat-prop-callback-name="onRadioChange"');

    let newSlyte_code = '// Template\n<zcat-radio\n' + newSlyteAttrs.join('\n') + '\n></zcat-radio>\n\n'
      + '// Inline JS — callback via self\nstatic methods() {\n  return {\n    onRadioChange(value, prop) {\n      console.log("Selected:", value);\n    }\n  };\n}';

    // --- HTML tab ---
    let variant = radioObj.variant || 'primary';
    let size = radioObj.size || 'default';
    let direction = radioObj.direction || 'vertical';
    let options = radioObj.options || [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' }
    ];

    let groupClasses = ['zcat-radio-group', 'zcat-radio-' + variant];
    if (size === 'small') { groupClasses.push('zcat-radio-sm'); }
    else if (size === 'extra-small') { groupClasses.push('zcat-radio-exsm'); }
    if (direction === 'horizontal') { groupClasses.push('zcat-radio-horizontal'); }

    let labelHtml = '';
    if (radioObj.label) {
      labelHtml = '  <span class="zcat-radio-group-label">' + radioObj.label + '</span>\n';
    }

    let optionsHtml = options.map(function(opt) {
      let checked = radioObj.selected === opt.value ? ' checked' : '';
      let disabled = opt.disabled ? ' disabled' : '';
      let itemHtml = '    <label class="zcat-radio-wrap">\n';
      itemHtml += '      <input type="radio" name="' + (radioObj.name || 'demo-radio') + '" value="' + opt.value + '"' + checked + disabled + '/>\n';
      itemHtml += '      <span class="zcat-radio-circle"><span class="zcat-radio-dot"></span></span>\n';
      if (variant === 'secondary' && opt.desc) {
        itemHtml += '      <div class="zcat-radio-content">\n';
        itemHtml += '        <span class="zcat-radio-label">' + opt.label + '</span>\n';
        itemHtml += '        <span class="zcat-radio-desc">' + opt.desc + '</span>\n';
        itemHtml += '      </div>\n';
      } else {
        itemHtml += '      <span class="zcat-radio-label">' + opt.label + '</span>\n';
      }
      itemHtml += '    </label>';
      return itemHtml;
    }).join('\n');

    let html_code = '<div class="' + groupClasses.join(' ') + '">\n' + labelHtml + '  <div class="zcat-radio-options">\n' + optionsHtml + '\n  </div>\n</div>';

    // --- CSS tab ---
    let css_code = '.zcat-radio-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  font-family: var(--zcat-font-family-primary);\n}\n\n';
    css_code += '.zcat-radio-wrap {\n  display: inline-flex;\n  align-items: flex-start;\n  gap: 8px;\n  cursor: pointer;\n  user-select: none;\n}\n\n';
    css_code += '.zcat-radio-circle {\n  width: 18px;\n  height: 18px;\n  border: 1.5px solid var(--zcat-body-border);\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n';
    css_code += '.zcat-radio-circle.checked {\n  border-color: var(--zcat-btn-fill-bg-primary-default);\n}\n\n';
    css_code += '.zcat-radio-circle.checked .zcat-radio-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--zcat-btn-fill-bg-primary-default);\n}';

    if (variant === 'secondary') {
      css_code += '\n\n/* Secondary (card) variant */\n';
      css_code += '.zcat-radio-secondary .zcat-radio-wrap {\n  padding: 12px 14px;\n  border: 1px solid var(--zcat-body-border);\n  border-radius: 8px;\n  background: var(--zcat-inputField-bg-default);\n}\n';
      css_code += '.zcat-radio-secondary .zcat-radio-wrap.zcat-radio-selected {\n  border-color: var(--zcat-btn-fill-bg-primary-default);\n  box-shadow: 0 0 0 1px var(--zcat-btn-fill-bg-primary-default);\n}';
    }

    this.setData('slyteCodeSnippet.code', slyte_code);
    this.setData('jsCodeSnippet.code', js_code);
    this.setData('newSlyteCodeSnippet.code', newSlyte_code);
    this.setData('htmlCodeSnippet.code', html_code);
    this.setData('cssCodeSnippet.code', css_code);
  }

  data() {
    return {
      activeTab: prop('string', { default: 'slyte' }),
      pageTab: prop('string', { default: 'customize' }),
      self: prop('object', { default: this }),
      radioObj: prop('object', {
        default: {
          name: 'demo-radio',
          variant: 'primary',
          size: 'default',
          direction: 'vertical',
          selected: 'a',
          options: [
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' }
          ]
        }
      }),
      resetButtonObj: prop('object', {
        default: {
          "label": "Reset",
          "variant": "outline",
          "color": "primary",
          "size": "extra-small",
          "callback": { "name": "resetCustomization" }
        }
      }),
      toggleLabelObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleLabel' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDisabled' } }
      }),
      // All Variants tab objects
      variantPrimaryObj: prop('object', {
        default: {
          name: 'v-primary', variant: 'primary', selected: 'a',
          options: [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }, { label: 'Option C', value: 'c' }]
        }
      }),
      variantHorizontalObj: prop('object', {
        default: {
          name: 'v-horizontal', variant: 'primary', direction: 'horizontal', selected: 'b',
          options: [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }, { label: 'Option C', value: 'c' }]
        }
      }),
      variantLabelObj: prop('object', {
        default: {
          name: 'v-label', variant: 'primary', label: 'Choose an option', selected: 'a',
          options: [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }, { label: 'Option C', value: 'c' }]
        }
      }),
      variantSecondaryObj: prop('object', {
        default: {
          name: 'v-secondary', variant: 'secondary', selected: 'basic',
          options: [{ label: 'Basic Plan', value: 'basic' }, { label: 'Pro Plan', value: 'pro' }, { label: 'Enterprise', value: 'enterprise' }]
        }
      }),
      variantSecondaryDescObj: prop('object', {
        default: {
          name: 'v-secondary-desc', variant: 'secondary', selected: 'standard',
          options: [
            { label: 'Standard', value: 'standard', desc: 'Best for small teams and startups' },
            { label: 'Professional', value: 'professional', desc: 'Advanced features for growing businesses' },
            { label: 'Enterprise', value: 'enterprise', desc: 'Custom solutions for large organizations' }
          ]
        }
      }),
      variantSizeDefaultObj: prop('object', {
        default: {
          name: 'v-size-default', selected: 'a',
          options: [{ label: 'Default size', value: 'a' }, { label: 'Option B', value: 'b' }]
        }
      }),
      variantSizeSmallObj: prop('object', {
        default: {
          name: 'v-size-sm', size: 'small', selected: 'a',
          options: [{ label: 'Small size', value: 'a' }, { label: 'Option B', value: 'b' }]
        }
      }),
      variantSizeExsmObj: prop('object', {
        default: {
          name: 'v-size-exsm', size: 'extra-small', selected: 'a',
          options: [{ label: 'Extra-small', value: 'a' }, { label: 'Option B', value: 'b' }]
        }
      }),
      variantDisabledObj: prop('object', {
        default: {
          name: 'v-disabled', disabled: true, selected: 'a',
          options: [{ label: 'Disabled A', value: 'a' }, { label: 'Disabled B', value: 'b' }]
        }
      }),
      variantPreselectedObj: prop('object', {
        default: {
          name: 'v-preselected', selected: 'b',
          options: [{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }, { label: 'Option C', value: 'c' }]
        }
      }),
      jsCodeSnippet: prop('object', { default: { code: '' } }),
      slyteCodeSnippet: prop('object', { default: { code: '' } }),
      newSlyteCodeSnippet: prop('object', { default: { code: '' } }),
      htmlCodeSnippet: prop('object', { default: { code: '' } }),
      cssCodeSnippet: prop('object', { default: { code: '' } })
    };
  }

  static methods() {
    return {
      resetCustomization() {
        this.setData('radioObj', {
          name: 'demo-radio',
          variant: 'primary',
          size: 'default',
          direction: 'vertical',
          selected: 'a',
          options: [
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' }
          ]
        });
        this.$app.objectUtils(this.getData('toggleLabelObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleDisabledObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleLabel(checked) {
        let radioObj = this.getData('radioObj');
        if (checked) {
          this.$app.objectUtils(radioObj, 'add', 'label', 'Choose an option');
        } else {
          this.$app.objectUtils(radioObj, 'add', 'label', '');
        }
        this.constructCodeSnippet();
      },
      onToggleDisabled(checked) {
        let radioObj = this.getData('radioObj');
        this.$app.objectUtils(radioObj, 'add', 'disabled', checked);
        this.constructCodeSnippet();
      },
      onRadioChange(value, prop) {
        // Demo callback - no-op for docs
      }
    };
  }

  static actions() {
    return {
      showSlyteTab() { this.setData('activeTab', 'slyte'); },
      showJsTab() { this.setData('activeTab', 'js'); },
      showNewSlyteTab() { this.setData('activeTab', 'newslyte'); },
      showHtmlTab() { this.setData('activeTab', 'html'); },
      showCssTab() { this.setData('activeTab', 'css'); },
      showCustomizeTab() { this.setData('pageTab', 'customize'); },
      showVariantsTab() { this.setData('pageTab', 'variants'); },
      copyCode() {
        let tab = this.getData('activeTab');
        let code;
        if (tab === 'slyte') { code = this.getData('slyteCodeSnippet.code'); }
        else if (tab === 'js') { code = this.getData('jsCodeSnippet.code'); }
        else if (tab === 'newslyte') { code = this.getData('newSlyteCodeSnippet.code'); }
        else if (tab === 'html') { code = this.getData('htmlCodeSnippet.code'); }
        else if (tab === 'css') { code = this.getData('cssCodeSnippet.code'); }
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code);
          if (window.__zcatToast) { window.__zcatToast('Copied to clipboard!', 'success'); }
        }
      }
    };
  }

  static observers() { return {}; }
}

export { RadioComp };
