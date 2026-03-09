import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ToggleComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('toggleObj') || {};
    let defaults = { size: 'default' };

    // --- sLyte tab ---
    let slyte_code = '<zcat-toggle\n  self="{{self}}"\n  zcat-prop="{{toggleObj}}"\n></zcat-toggle>';

    // --- JS tab ---
    let propObj = {};
    if (obj.label) { propObj.label = obj.label; }
    if (obj.size && obj.size !== defaults.size) { propObj.size = obj.size; }
    if (obj.checked) { propObj.checked = true; }
    if (obj.disabled) { propObj.disabled = true; }
    propObj.callback = { name: 'onToggleChange' };

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    toggleObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    if (obj.label) { newSlyteAttrs.push('  zcat-prop-label="' + obj.label + '"'); }
    if (obj.size && obj.size !== defaults.size) { newSlyteAttrs.push('  zcat-prop-size="' + obj.size + '"'); }
    if (obj.checked) { newSlyteAttrs.push('  zcat-prop-checked="true"'); }
    if (obj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    newSlyteAttrs.push('  zcat-prop-callback-name="onToggleChange"');

    let newSlyte_code = '// Template\n<zcat-toggle\n' + newSlyteAttrs.join('\n') + '\n></zcat-toggle>\n\n'
      + '// Inline JS — callback via self\nstatic methods() {\n  return {\n    onToggleChange(checked, prop) {\n      console.log("Toggled:", checked);\n    }\n  };\n}';

    // --- HTML tab ---
    let size = obj.size || 'default';
    let wrapClasses = ['zcat-toggle-wrap'];
    if (size === 'small') { wrapClasses.push('zcat-toggle-sm'); }
    else if (size === 'extra-small') { wrapClasses.push('zcat-toggle-exsm'); }
    if (obj.disabled) { wrapClasses.push('zcat-toggle-disabled'); }

    let trackChecked = obj.checked ? ' checked' : '';

    let html_code = '<label class="' + wrapClasses.join(' ') + '">\n';
    html_code += '  <span class="zcat-toggle-track' + trackChecked + '">\n';
    html_code += '    <span class="zcat-toggle-thumb"></span>\n';
    html_code += '  </span>\n';
    if (obj.label) {
      html_code += '  <span class="zcat-toggle-label">' + obj.label + '</span>\n';
    }
    html_code += '  <input type="checkbox" class="zcat-toggle-input"' + (obj.checked ? ' checked' : '') + (obj.disabled ? ' disabled' : '') + '/>\n';
    html_code += '</label>';

    // --- CSS tab ---
    let css_code = '.zcat-toggle-wrap {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  cursor: pointer;\n  user-select: none;\n}\n\n';
    css_code += '.zcat-toggle-track {\n  width: 28px;\n  height: 18px;\n  border: 1px solid var(--zcat-checkbox-border-default);\n  border-radius: 25px;\n  background: var(--zcat-toggle-bg-default);\n  position: relative;\n}\n\n';
    css_code += '.zcat-toggle-thumb {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: var(--zcat-toggle-inner-default);\n  position: absolute;\n  left: 1px;\n  top: 0; bottom: 0;\n  margin: auto;\n  transition: left 150ms ease-in-out;\n}\n\n';
    css_code += '.zcat-toggle-track.checked {\n  background: var(--zcat-checkbox-bg-clicked);\n  border-color: transparent;\n}\n\n';
    css_code += '.zcat-toggle-track.checked .zcat-toggle-thumb {\n  left: calc(100% - 15px);\n  background: var(--zcat-toggle-inner-active);\n}';

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
      toggleObj: prop('object', {
        default: {
          label: 'Enable notifications',
          checked: false,
          size: 'default',
          callback: { name: 'onToggleDemo' }
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
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDisabled' } }
      }),
      // All Variants tab objects
      varOffObj: prop('object', {
        default: { label: 'Off state', checked: false }
      }),
      varOnObj: prop('object', {
        default: { label: 'On state', checked: true }
      }),
      varLabelObj: prop('object', {
        default: { label: 'With label text', checked: true }
      }),
      varNoLabelObj: prop('object', {
        default: { checked: true }
      }),
      varSizeDefaultObj: prop('object', {
        default: { label: 'Default', checked: true, size: 'default' }
      }),
      varSizeSmallObj: prop('object', {
        default: { label: 'Small', checked: true, size: 'small' }
      }),
      varSizeExsmObj: prop('object', {
        default: { label: 'Extra-small', checked: true, size: 'extra-small' }
      }),
      varDisabledOffObj: prop('object', {
        default: { label: 'Disabled off', disabled: true }
      }),
      varDisabledOnObj: prop('object', {
        default: { label: 'Disabled on', checked: true, disabled: true }
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
        this.setData('toggleObj', {
          label: 'Enable notifications',
          checked: false,
          size: 'default',
          callback: { name: 'onToggleDemo' }
        });
        this.$app.objectUtils(this.getData('toggleLabelObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleDisabledObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleLabel(checked) {
        let obj = this.getData('toggleObj');
        if (checked) {
          this.$app.objectUtils(obj, 'add', 'label', 'Enable notifications');
        } else {
          this.$app.objectUtils(obj, 'add', 'label', '');
        }
        this.constructCodeSnippet();
      },
      onToggleDisabled(checked) {
        let obj = this.getData('toggleObj');
        this.$app.objectUtils(obj, 'add', 'disabled', checked);
        this.constructCodeSnippet();
      },
      onToggleDemo(checked, prop) {
        // Demo callback
      }
    };
  }

  static actions() {
    return {
      changeToggleSize(e) {
        this.$app.objectUtils(this.getData('toggleObj'), 'add', 'size', e.target.value);
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

export { ToggleComp };
