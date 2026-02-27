import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class InputComp extends Component {
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

    let typeSelect = node.querySelector('[data-action="changeInputType"]');
    let sizeSelect = node.querySelector('[data-action="changeInputSize"]');

    if (typeSelect) {
      typeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('inputObj'), 'add', 'type', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('inputObj'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let inputObj = this.getData('inputObj') || {};
    let defaults = { id: 'input-id', type: 'text', width: '300px', size: 'default', placeholder: 'Enter a text', label: 'Label' };

    // --- sLyte tab: template + JS combined ---
    let inputData = {};
    inputData.id = inputObj.id || defaults.id;
    if (inputObj.type && inputObj.type !== defaults.type) { inputData.type = inputObj.type; }
    if (inputObj.width && inputObj.width !== defaults.width) { inputData.width = inputObj.width; }
    if (inputObj.size && inputObj.size !== defaults.size) { inputData.size = inputObj.size; }
    if (inputObj.placeholder && inputObj.placeholder !== defaults.placeholder) { inputData.placeholder = inputObj.placeholder; }
    if (inputObj.label) { inputData.label = inputObj.label; }
    if (inputObj.disabled) { inputData.disabled = true; }
    if (inputObj.errorMessage) { inputData.errorMessage = inputObj.errorMessage; }

    let slyte_code = '<zcat-input\n  self="{{self}}"\n  zcat-prop="{{inputObj}}"\n></zcat-input>';

    // 2. JS tab: data() code
    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    inputObj: prop("object", {\n      default: ' + JSON.stringify(inputData, null, 6) + '\n    })\n  };\n}';

    // 3. sLyte New tab: attributes + self + inline callback
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    newSlyteAttrs.push('  zcat-prop-id="' + (inputObj.id || defaults.id) + '"');
    if (inputObj.label) { newSlyteAttrs.push('  zcat-prop-label="' + inputObj.label + '"'); }
    if (inputObj.type && inputObj.type !== defaults.type) { newSlyteAttrs.push('  zcat-prop-type="' + inputObj.type + '"'); }
    if (inputObj.placeholder) { newSlyteAttrs.push('  zcat-prop-placeholder="' + inputObj.placeholder + '"'); }
    if (inputObj.size && inputObj.size !== defaults.size) { newSlyteAttrs.push('  zcat-prop-size="' + inputObj.size + '"'); }
    if (inputObj.width && inputObj.width !== defaults.width) { newSlyteAttrs.push('  zcat-prop-width="' + inputObj.width + '"'); }
    if (inputObj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    if (inputObj.errorMessage) { newSlyteAttrs.push('  zcat-prop-errorMessage="' + inputObj.errorMessage + '"'); }
    newSlyteAttrs.push('  zcat-prop-callback-onValueChange="onInputChange"');

    let newSlyte_code = '// Template\n<zcat-input\n' + newSlyteAttrs.join('\n') + '\n></zcat-input>\n\n'
      + '// Inline JS — callback via self\nstatic methods() {\n  return {\n    onInputChange(value) {\n      console.log("Input changed:", value);\n    }\n  };\n}';

    // 4. HTML tab: plain HTML
    let isTextarea = (inputObj.type === 'textarea');
    let sizeClass = '';
    let size = inputObj.size || 'default';
    if (size === 'small') { sizeClass = ' zcat-input-sm'; }
    else if (size === 'extra-small') { sizeClass = ' zcat-input-exsm'; }

    let htmlParts = [];
    if (inputObj.label) {
      htmlParts.push('<label class="zcat-input-label">' + inputObj.label + '</label>');
    }
    let disabledAttr = inputObj.disabled ? ' disabled' : '';
    if (isTextarea) {
      htmlParts.push('<textarea class="zcat-input-el' + sizeClass + '"' +
        ' placeholder="' + (inputObj.placeholder || '') + '"' +
        ' style="width: ' + (inputObj.width || '300px') + '"' +
        disabledAttr + '></textarea>');
    } else {
      htmlParts.push('<input type="text" class="zcat-input-el' + sizeClass + '"' +
        ' placeholder="' + (inputObj.placeholder || '') + '"' +
        ' style="width: ' + (inputObj.width || '300px') + '"' +
        disabledAttr + ' />');
    }
    if (inputObj.errorMessage) {
      htmlParts.push('<span class="zcat-input-error">' + inputObj.errorMessage + '</span>');
    }
    let html_code = '<div class="zcat-input-wrapper">\n  ' + htmlParts.join('\n  ') + '\n</div>';

    // 5. CSS tab: relevant CSS classes
    let css_code = '.zcat-input-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n';
    if (inputObj.label) {
      css_code += '.zcat-input-label {\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--zcat-inputField-text-label);\n  margin-bottom: 6px;\n}\n';
    }
    if (isTextarea) {
      css_code += 'textarea.zcat-input-el {\n  height: 80px;\n  padding: 10px 12px;\n  resize: vertical;\n  font-size: 14px;\n  background: var(--zcat-inputField-bg-default);\n  border: var(--zcat-inputField-border-default);\n  border-radius: 8px;\n  color: var(--zcat-body-text-primary);\n}\n';
    } else {
      css_code += '.zcat-input-el {\n  height: 36px;\n  padding: 0 12px;\n  font-size: 14px;\n  background: var(--zcat-inputField-bg-default);\n  border: var(--zcat-inputField-border-default);\n  border-radius: 8px;\n  color: var(--zcat-body-text-primary);\n}\n';
    }
    css_code += '.zcat-input-el:hover {\n  background: var(--zcat-inputField-bg-hover);\n  border: var(--zcat-inputField-border-hover);\n}\n';
    css_code += '.zcat-input-el:focus {\n  background: var(--zcat-inputField-bg-active);\n  border: var(--zcat-inputField-border-active);\n}\n';
    if (sizeClass) {
      let sizeMap = { ' zcat-input-sm': { h: '30px', fs: '13px', p: '0 10px' }, ' zcat-input-exsm': { h: '24px', fs: '12px', p: '0 8px' } };
      let s = sizeMap[sizeClass];
      if (s) { css_code += sizeClass.trim() + ' {\n  height: ' + s.h + ';\n  font-size: ' + s.fs + ';\n  padding: ' + s.p + ';\n}\n'; }
    }
    if (inputObj.errorMessage) {
      css_code += '.zcat-input-error-msg {\n  font-size: 12px;\n  color: var(--zcat-inputField-text-error);\n  margin-top: 4px;\n}';
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
      self: prop("object", { default: this }),
      inputObj: prop("object", { 
        default: {
          "id": "input-id", 
          "width": "300px",
          "label": "Label",
          "type": "text",
          "placeholder": "Enter a text",
          "size": "default"
        }
      }),
      resetButtonObj: prop('object', {
        default: {
          "label": "Reset",
          "variant": "outline",
          "color": "primary",
          "size": "extra-small",
          "callback": { "name": "resetInputCustomization" }
        }
      }),
      toggleLabelObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleLabel' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDisabled' } }
      }),
      toggleErrorObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleError' } }
      }),
      jsCodeSnippet: prop('object', { default: { code: "" } }),
      slyteCodeSnippet: prop('object', { default: { code: "" } }),
      newSlyteCodeSnippet: prop('object', { default: { code: "" } }),
      htmlCodeSnippet: prop('object', { default: { code: "" } }),
      cssCodeSnippet: prop('object', { default: { code: "" } })
    };
  }

  static methods() {
    return {
      resetInputCustomization() {
        this.setData('inputObj', {
          "id": "input-id",
          "width": "300px",
          "label": "Label",
          "type": "text",
          "placeholder": "Enter a text",
          "size": "default"
        });
        // Reset toggle prop objects
        this.$app.objectUtils(this.getData('toggleLabelObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleDisabledObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleErrorObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function(s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleLabel(checked) {
        let inputObj = this.getData('inputObj');
        if (checked) {
          this.$app.objectUtils(inputObj, 'add', 'label', 'Label');
        } else {
          this.$app.objectUtils(inputObj, 'delete', 'label');
        }
        this.constructCodeSnippet();
      },
      onToggleDisabled(checked) {
        let inputObj = this.getData('inputObj');
        if (checked) {
          this.$app.objectUtils(inputObj, 'add', 'disabled', true);
        } else {
          this.$app.objectUtils(inputObj, 'delete', 'disabled');
        }
        this.constructCodeSnippet();
      },
      onToggleError(checked) {
        let inputObj = this.getData('inputObj');
        if (checked) {
          this.$app.objectUtils(inputObj, 'add', 'errorMessage', 'Sample error message');
        } else {
          this.$app.objectUtils(inputObj, 'delete', 'errorMessage');
        }
        this.constructCodeSnippet();
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

export { InputComp };