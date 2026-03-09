import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class LabelComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('labelObj') || {};

    // --- sLyte tab ---
    let slyte_code = '<zcat-label\n  zcat-prop="{{labelObj}}"\n></zcat-label>';

    // --- JS tab ---
    let propObj = {};
    if (obj.text) { propObj.text = obj.text; }
    if (obj.size && obj.size !== 'default') { propObj.size = obj.size; }
    if (obj.required) { propObj.required = true; }
    if (obj.isOptional) { propObj.isOptional = true; }
    if (obj.disabled) { propObj.disabled = true; }

    let js_code = 'data() {\n  return {\n    labelObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    if (obj.text) { newSlyteAttrs.push('  zcat-prop-text="' + obj.text + '"'); }
    if (obj.size && obj.size !== 'default') { newSlyteAttrs.push('  zcat-prop-size="' + obj.size + '"'); }
    if (obj.required) { newSlyteAttrs.push('  zcat-prop-required="true"'); }
    if (obj.isOptional) { newSlyteAttrs.push('  zcat-prop-is-optional="true"'); }
    if (obj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }

    let newSlyte_code = '// Template\n<zcat-label\n' + (newSlyteAttrs.length ? newSlyteAttrs.join('\n') + '\n' : '') + '></zcat-label>';

    // --- HTML tab ---
    let wrapClasses = ['zcat-label-wrap'];
    if (obj.size === 'small') { wrapClasses.push('zcat-label-sm'); }
    else if (obj.size === 'large') { wrapClasses.push('zcat-label-lg'); }
    if (obj.disabled) { wrapClasses.push('zcat-label-disabled'); }

    let labelClasses = ['zcat-label'];
    if (obj.required) { labelClasses.push('zcat-label-required'); }

    let html_code = '<div class="' + wrapClasses.join(' ') + '">\n';
    html_code += '  <label class="' + labelClasses.join(' ') + '">' + (obj.text || 'Label text');
    if (obj.isOptional) {
      html_code += '<span class="zcat-label-optional"> (Optional)</span>';
    }
    html_code += '</label>\n</div>';

    // --- CSS tab ---
    let css_code = '.zcat-label-wrap {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n';
    css_code += '.zcat-label {\n  color: var(--zcat-inputField-text-label);\n  font: var(--zcat-input-label-font-weight) var(--zcat-input-label-font) var(--zcat-font-family-primary);\n  margin: 0;\n}\n\n';
    css_code += '/* Required asterisk */\n.zcat-label-required::after {\n  content: \' *\';\n  color: var(--zcat-danger-1);\n}\n\n';
    css_code += '/* Optional text */\n.zcat-label-optional {\n  color: var(--zcat-text-secondary);\n  font-weight: 400;\n}\n\n';
    css_code += '/* Sizes */\n.zcat-label-sm .zcat-label { font-size: 11px; line-height: 14px; }\n.zcat-label-lg .zcat-label { font-size: 14px; line-height: 20px; }';

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
      labelObj: prop('object', {
        default: {
          text: 'Email address',
          size: 'default'
        }
      }),
      resetButtonObj: prop('object', {
        default: {
          label: 'Reset',
          variant: 'outline',
          color: 'primary',
          size: 'extra-small',
          callback: { name: 'resetCustomization' }
        }
      }),
      toggleRequiredObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleRequired' } }
      }),
      toggleOptionalObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleOptional' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDisabled' } }
      }),
      // All Variants
      varDefaultObj: prop('object', { default: { text: 'Full name' } }),
      varRequiredObj: prop('object', { default: { text: 'Email address', required: true } }),
      varOptionalObj: prop('object', { default: { text: 'Phone number', isOptional: true } }),
      varDisabledObj: prop('object', { default: { text: 'Username', disabled: true } }),
      varSizeDefaultObj: prop('object', { default: { text: 'Default size label', size: 'default' } }),
      varSizeSmallObj: prop('object', { default: { text: 'Small size label', size: 'small' } }),
      varSizeLargeObj: prop('object', { default: { text: 'Large size label', size: 'large' } }),
      varInfoObj: prop('object', { default: { text: 'Project name', infoIcon: { value: 'This is the project identifier shown in reports' } } }),
      varRequiredInfoObj: prop('object', { default: { text: 'API key', required: true, infoIcon: { value: 'Your unique API access key' } } }),
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
        this.setData('labelObj', { text: 'Email address', size: 'default' });
        this.$app.objectUtils(this.getData('toggleRequiredObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleOptionalObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleDisabledObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        let inputs = this.$node.querySelectorAll('.zcat-custom-input');
        if (inputs) { inputs.forEach(function (i) { i.value = 'Email address'; }); }
        this.constructCodeSnippet();
      },
      onToggleRequired(checked) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'required', checked);
        this.constructCodeSnippet();
      },
      onToggleOptional(checked) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'isOptional', checked);
        this.constructCodeSnippet();
      },
      onToggleDisabled(checked) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'disabled', checked);
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
      changeLabelText(e) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'text', e.target.value);
        this.constructCodeSnippet();
      },
      changeLabelSize(e) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'size', e.target.value);
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

export { LabelComp };
