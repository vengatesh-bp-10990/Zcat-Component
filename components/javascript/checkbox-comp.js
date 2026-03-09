import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class CheckboxComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('checkboxObj') || {};
    let defaults = { size: 'default' };

    // --- sLyte tab ---
    let slyte_code = '<zcat-checkbox\n  self="{{self}}"\n  zcat-prop="{{checkboxObj}}"\n></zcat-checkbox>';

    // --- JS tab ---
    let propObj = {};
    if (obj.label) { propObj.label = obj.label; }
    if (obj.size && obj.size !== defaults.size) { propObj.size = obj.size; }
    if (obj.checked) { propObj.checked = true; }
    if (obj.partial) { propObj.partial = true; }
    if (obj.disabled) { propObj.disabled = true; }
    propObj.callback = { name: 'onCheckboxChange' };

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    checkboxObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    if (obj.label) { newSlyteAttrs.push('  zcat-prop-label="' + obj.label + '"'); }
    if (obj.size && obj.size !== defaults.size) { newSlyteAttrs.push('  zcat-prop-size="' + obj.size + '"'); }
    if (obj.checked) { newSlyteAttrs.push('  zcat-prop-checked="true"'); }
    if (obj.partial) { newSlyteAttrs.push('  zcat-prop-partial="true"'); }
    if (obj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    newSlyteAttrs.push('  zcat-prop-callback-name="onCheckboxChange"');

    let newSlyte_code = '// Template\n<zcat-checkbox\n' + newSlyteAttrs.join('\n') + '\n></zcat-checkbox>\n\n'
      + '// Inline JS — callback via self\nstatic methods() {\n  return {\n    onCheckboxChange(checked, prop) {\n      console.log("Checked:", checked);\n    }\n  };\n}';

    // --- HTML tab ---
    let size = obj.size || 'default';
    let wrapClasses = ['zcat-checkbox-wrap'];
    if (size === 'small') { wrapClasses.push('zcat-checkbox-sm'); }
    else if (size === 'extra-small') { wrapClasses.push('zcat-checkbox-exsm'); }
    if (obj.disabled) { wrapClasses.push('zcat-checkbox-disabled'); }

    let checked = obj.checked ? ' checked' : '';
    let disabled = obj.disabled ? ' disabled' : '';
    let boxChecked = (obj.checked || obj.partial) ? ' checked' : '';
    let boxPartial = obj.partial ? ' partial' : '';

    let html_code = '<label class="' + wrapClasses.join(' ') + '">\n';
    html_code += '  <input type="checkbox" class="zcat-checkbox-input"' + checked + disabled + '/>\n';
    html_code += '  <span class="zcat-checkbox-box' + boxChecked + boxPartial + '">\n';
    if (obj.checked && !obj.partial) {
      html_code += '    <svg class="zcat-checkbox-tick" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="2.5"><polyline points="3.5 8 6.5 11 12.5 5"/></svg>\n';
    } else if (obj.partial) {
      html_code += '    <svg class="zcat-checkbox-partial" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="2.5"><line x1="4" y1="8" x2="12" y2="8"/></svg>\n';
    }
    html_code += '  </span>\n';
    if (obj.label) {
      html_code += '  <span class="zcat-checkbox-label">' + obj.label + '</span>\n';
    }
    html_code += '</label>';

    // --- CSS tab ---
    let css_code = '.zcat-checkbox-wrap {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  user-select: none;\n}\n\n';
    css_code += '.zcat-checkbox-box {\n  width: 14px;\n  height: 14px;\n  border: 1px solid var(--zcat-checkbox-border-default);\n  border-radius: 4px;\n  background: var(--zcat-checkbox-bg-default);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n';
    css_code += '.zcat-checkbox-box.checked {\n  background: var(--zcat-checkbox-bg-clicked);\n  border-color: transparent;\n}\n\n';
    css_code += '.zcat-checkbox-label {\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--zcat-body-text-primary);\n}';

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
      checkboxObj: prop('object', {
        default: {
          variant: 'primary',
          label: 'Accept terms & conditions',
          checked: false,
          size: 'default',
          callback: { name: 'onCheckboxChange' }
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
        default: { checked: true, size: 'small', callback: { name: 'onToggleLabel' } }
      }),
      toggleCheckedObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleChecked' } }
      }),
      togglePartialObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onTogglePartial' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDisabled' } }
      }),
      // All Variants tab objects
      varUncheckedObj: prop('object', {
        default: { variant: 'primary', label: 'Unchecked option', checked: false }
      }),
      varCheckedObj: prop('object', {
        default: { variant: 'primary', label: 'Checked option', checked: true }
      }),
      varPartialObj: prop('object', {
        default: { variant: 'primary', label: 'Partial selection', partial: true }
      }),
      varNoLabelObj: prop('object', {
        default: { variant: 'primary', checked: true }
      }),
      varSizeDefaultObj: prop('object', {
        default: { variant: 'primary', label: 'Default size', checked: true, size: 'default' }
      }),
      varSizeSmallObj: prop('object', {
        default: { variant: 'primary', label: 'Small size', checked: true, size: 'small' }
      }),
      varSizeExsmObj: prop('object', {
        default: { variant: 'primary', label: 'Extra-small', checked: true, size: 'extra-small' }
      }),
      varDisabledObj: prop('object', {
        default: { variant: 'primary', label: 'Disabled', disabled: true }
      }),
      varDisabledCheckedObj: prop('object', {
        default: { variant: 'primary', label: 'Disabled checked', checked: true, disabled: true }
      }),
      varDisabledPartialObj: prop('object', {
        default: { variant: 'primary', label: 'Disabled partial', partial: true, disabled: true }
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
        this.setData('checkboxObj', {
          variant: 'primary',
          label: 'Accept terms & conditions',
          checked: false,
          size: 'default',
          callback: { name: 'onCheckboxChange' }
        });
        this.$app.objectUtils(this.getData('toggleLabelObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleCheckedObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('togglePartialObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleDisabledObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleLabel(checked) {
        let obj = this.getData('checkboxObj');
        if (checked) {
          this.$app.objectUtils(obj, 'add', 'label', 'Accept terms & conditions');
        } else {
          this.$app.objectUtils(obj, 'add', 'label', '');
        }
        this.constructCodeSnippet();
      },
      onToggleChecked(checked) {
        let obj = this.getData('checkboxObj');
        this.$app.objectUtils(obj, 'add', 'checked', checked);
        if (checked) {
          this.$app.objectUtils(obj, 'add', 'partial', false);
          this.$app.objectUtils(this.getData('togglePartialObj'), 'add', 'checked', false);
        }
        this.constructCodeSnippet();
      },
      onTogglePartial(checked) {
        let obj = this.getData('checkboxObj');
        this.$app.objectUtils(obj, 'add', 'partial', checked);
        if (checked) {
          this.$app.objectUtils(obj, 'add', 'checked', false);
          this.$app.objectUtils(this.getData('toggleCheckedObj'), 'add', 'checked', false);
        }
        this.constructCodeSnippet();
      },
      onToggleDisabled(checked) {
        let obj = this.getData('checkboxObj');
        this.$app.objectUtils(obj, 'add', 'disabled', checked);
        this.constructCodeSnippet();
      },
      onCheckboxChange(checked, prop) {
        // Demo callback
      }
    };
  }

  static actions() {
    return {
      changeCheckboxSize(e) {
        this.$app.objectUtils(this.getData('checkboxObj'), 'add', 'size', e.target.value);
        this.constructCodeSnippet();
      },
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

export { CheckboxComp };
