import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

const ICON_OPTIONS = [
  'search','edit','plus','minus','close','tick','delete','copy',
  'eye-open','eye-close','upload-cloud','download-cloud','folder',
  'user','star','refresh','settings','notification','link','filter',
  'calendar','clock','phone','info','alert-circle','globe','edit-pencil'
];

class InputComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let inputObj = this.getData('inputObj') || {};

    // --- sLyte tab ---
    let slyte_code = '<zcat-input\n  self="{{self}}"\n  zcat-prop="{{inputObj}}"\n></zcat-input>';

    // --- JS tab: build minimal inputData showing only non-default values ---
    let inputData = { id: inputObj.id || 'input-id' };
    if (inputObj.type && inputObj.type !== 'text') { inputData.type = inputObj.type; }
    if (inputObj.size && inputObj.size !== 'default') { inputData.size = inputObj.size; }
    if (inputObj.placeholder) { inputData.placeholder = inputObj.placeholder; }
    if (inputObj.label) { inputData.label = inputObj.label; }
    if (inputObj.disabled) { inputData.disabled = true; }
    if (inputObj.readonly) { inputData.readonly = true; }
    if (inputObj.isOptional) { inputData.isOptional = true; }
    if (inputObj.errorMessage) { inputData.errorMessage = inputObj.errorMessage; }
    if (inputObj.iconLeft) { inputData.iconLeft = inputObj.iconLeft; }
    if (inputObj.iconRight) { inputData.iconRight = inputObj.iconRight; }
    if (inputObj.infoIcon) { inputData.infoIcon = inputObj.infoIcon; }

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    inputObj: prop("object", {\n      default: ' + JSON.stringify(inputData, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = ['  self="{{self}}"', '  zcat-prop-id="' + (inputObj.id || 'input-id') + '"'];
    if (inputObj.label) { newSlyteAttrs.push('  zcat-prop-label="' + inputObj.label + '"'); }
    if (inputObj.type && inputObj.type !== 'text') { newSlyteAttrs.push('  zcat-prop-type="' + inputObj.type + '"'); }
    if (inputObj.placeholder) { newSlyteAttrs.push('  zcat-prop-placeholder="' + inputObj.placeholder + '"'); }
    if (inputObj.size && inputObj.size !== 'default') { newSlyteAttrs.push('  zcat-prop-size="' + inputObj.size + '"'); }
    if (inputObj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    if (inputObj.readonly) { newSlyteAttrs.push('  zcat-prop-readonly="true"'); }
    if (inputObj.isOptional) { newSlyteAttrs.push('  zcat-prop-is-optional="true"'); }
    if (inputObj.errorMessage) { newSlyteAttrs.push('  zcat-prop-error-message="' + inputObj.errorMessage + '"'); }
    if (inputObj.iconLeft) { newSlyteAttrs.push('  zcat-prop-icon-left-position="left"\n  zcat-prop-icon-left-name="' + inputObj.iconLeft.name + '"'); }
    if (inputObj.iconRight) { newSlyteAttrs.push('  zcat-prop-icon-right-position="right"\n  zcat-prop-icon-right-name="' + inputObj.iconRight.name + '"'); }
    newSlyteAttrs.push('  zcat-prop-callback-on-value-change="onInputChange"');
    let newSlyte_code = '// Template\n<zcat-input\n' + newSlyteAttrs.join('\n') + '\n></zcat-input>\n\n'
      + '// JS — callback\nstatic methods() {\n  return {\n    onInputChange(value) {\n      console.log("Input changed:", value);\n    }\n  };\n}';

    // --- HTML tab ---
    let isTextarea = (inputObj.type === 'textarea');
    let sizeClass = inputObj.size === 'small' ? ' zcat-input-sm' : inputObj.size === 'extra-small' ? ' zcat-input-exsm' : '';
    let disabledAttr = inputObj.disabled ? ' disabled' : '';
    let readonlyAttr = inputObj.readonly ? ' readonly' : '';
    let htmlParts = [];
    if (inputObj.label) {
      let optLabel = inputObj.isOptional ? ' <span class="optional-label">(Optional)</span>' : '';
      htmlParts.push('<label class="zcat-input-label">' + inputObj.label + optLabel + '</label>');
    }
    if (inputObj.iconLeft || inputObj.iconRight) {
      let iconLeftHtml = inputObj.iconLeft ? '\n  <span class="zcat-input-icon-left"><!-- ' + inputObj.iconLeft.name + ' icon --></span>' : '';
      let iconRightHtml = inputObj.iconRight ? '\n  <span class="zcat-input-icon-right"><!-- ' + inputObj.iconRight.name + ' icon --></span>' : '';
      if (isTextarea) {
        htmlParts.push('<div class="zcat-input-relative-wrapper">' + iconLeftHtml + '\n  <textarea class="zcat-input-el' + sizeClass + '" placeholder="' + (inputObj.placeholder || '') + '"' + disabledAttr + readonlyAttr + '></textarea>' + iconRightHtml + '\n</div>');
      } else {
        htmlParts.push('<div class="zcat-input-relative-wrapper">' + iconLeftHtml + '\n  <input type="' + (inputObj.type || 'text') + '" class="zcat-input-el' + sizeClass + '" placeholder="' + (inputObj.placeholder || '') + '"' + disabledAttr + readonlyAttr + ' />' + iconRightHtml + '\n</div>');
      }
    } else {
      if (isTextarea) {
        htmlParts.push('<textarea class="zcat-input-el' + sizeClass + '" placeholder="' + (inputObj.placeholder || '') + '"' + disabledAttr + readonlyAttr + '></textarea>');
      } else {
        htmlParts.push('<input type="' + (inputObj.type || 'text') + '" class="zcat-input-el' + sizeClass + '" placeholder="' + (inputObj.placeholder || '') + '"' + disabledAttr + readonlyAttr + ' />');
      }
    }
    if (inputObj.errorMessage) { htmlParts.push('<span class="zcat-input-error-msg">' + inputObj.errorMessage + '</span>'); }
    let html_code = '<div class="zcat-input-wrapper">\n  ' + htmlParts.join('\n  ') + '\n</div>';

    // --- CSS tab ---
    let css_code = '.zcat-input-wrapper { display: flex; flex-direction: column; gap: 4px; }\n';
    if (inputObj.label) { css_code += '.zcat-input-label { font-size: 13px; font-weight: 500; color: var(--zcat-inputField-text-label); }\n'; }
    css_code += '.zcat-input-el { height: 36px; padding: 0 12px; font-size: 14px;\n  background: var(--zcat-inputField-bg-default);\n  border: var(--zcat-inputField-border-default);\n  border-radius: 8px;\n  color: var(--zcat-body-text-primary);\n}\n';
    css_code += '.zcat-input-el:hover { background: var(--zcat-inputField-bg-hover); border: var(--zcat-inputField-border-hover); }\n';
    css_code += '.zcat-input-el:focus { background: var(--zcat-inputField-bg-active); border: var(--zcat-inputField-border-active); }\n';
    if (inputObj.errorMessage) { css_code += '.zcat-input-error-msg { font-size: 12px; color: var(--zcat-inputField-text-error); }\n'; }

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
          "width": "100%",
          "label": "Label",
          "type": "text",
          "placeholder": "Enter a text",
          "size": "default"
        }
      }),
      iconOptions: prop('array', { default: ICON_OPTIONS }),
      showInfoIconRow: prop('boolean', { default: false }),
      showIconLeftRow: prop('boolean', { default: false }),
      showIconRightRow: prop('boolean', { default: false }),
      varDefaultObj: prop('object', { default: { id: 'v-default', placeholder: 'Default size', width: '220px' } }),
      varSmallObj: prop('object', { default: { id: 'v-small', placeholder: 'Small size', size: 'small', width: '220px' } }),
      varExsmObj: prop('object', { default: { id: 'v-exsm', placeholder: 'Extra small', size: 'extra-small', width: '220px' } }),
      varLabelledObj: prop('object', { default: { id: 'v-labelled', label: 'Full Name', placeholder: 'Enter your name', width: '220px' } }),
      varTextareaObj: prop('object', { default: { id: 'v-textarea', label: 'Description', type: 'textarea', placeholder: 'Enter description', width: '220px' } }),
      varPasswordObj: prop('object', { default: { id: 'v-password', label: 'Password', type: 'password', placeholder: 'Enter password', width: '220px' } }),
      varDisabledObj: prop('object', { default: { id: 'v-disabled', label: 'Disabled Field', placeholder: 'Cannot edit', disabled: true, width: '220px' } }),
      varErrorObj: prop('object', { default: { id: 'v-error', label: 'Email', placeholder: 'Enter email', errorMessage: 'Invalid email address', width: '220px' } }),
      varReadonlyObj: prop('object', { default: { id: 'v-readonly', label: 'Username', value: 'john.doe', readonly: true, width: '220px' } }),
      varCompletedObj: prop('object', { default: { id: 'v-completed', label: 'Full Name', value: 'John Doe', width: '220px' } }),
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
      toggleInfoIconObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleInfoIcon' } }
      }),
      toggleIconLeftObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleIconLeft' } }
      }),
      toggleIconRightObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleIconRight' } }
      }),
      toggleOptionalObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleOptional' } }
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
          "width": "100%",
          "label": "Label",
          "type": "text",
          "placeholder": "Enter a text",
          "size": "default"
        });
        this.$app.objectUtils(this.getData('toggleLabelObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleInfoIconObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleIconLeftObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleIconRightObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleOptionalObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleErrorObj'), 'add', 'checked', false);
        this.setData('showInfoIconRow', false);
        this.setData('showIconLeftRow', false);
        this.setData('showIconRightRow', false);
        this.$app.objectUtils(this.getData('toggleOptionalObj'), 'add', 'checked', false);
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
      onToggleInfoIcon(checked) {
        let inputObj = this.getData('inputObj');
        this.setData('showInfoIconRow', checked);
        if (checked) {
          this.$app.objectUtils(inputObj, 'add', 'infoIcon', {
            id: inputObj.id + '-info',
            value: 'Field information tooltip',
            placement: 'auto'
          });
        } else {
          this.$app.objectUtils(inputObj, 'delete', 'infoIcon');
        }
        this.constructCodeSnippet();
      },
      onToggleIconLeft(checked) {
        let inputObj = this.getData('inputObj');
        this.setData('showIconLeftRow', checked);
        if (checked) {
          this.$app.objectUtils(inputObj, 'add', 'iconLeft', { position: 'left', name: 'search', strokeWidth: 1.3 });
        } else {
          this.$app.objectUtils(inputObj, 'add', 'iconLeft', null);
        }
        this.constructCodeSnippet();
      },
      onToggleIconRight(checked) {
        let inputObj = this.getData('inputObj');
        this.setData('showIconRightRow', checked);
        if (checked) {
          this.$app.objectUtils(inputObj, 'add', 'iconRight', { position: 'right', name: 'edit', strokeWidth: 1.3 });
        } else {
          this.$app.objectUtils(inputObj, 'delete', 'iconRight');
        }
        this.constructCodeSnippet();
      },
      onToggleOptional(checked) {
        let inputObj = this.getData('inputObj');
        this.$app.objectUtils(inputObj, 'add', 'isOptional', !!checked);
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
      changeInputVariant(e) {
        let inputObj = this.getData('inputObj');
        this.$app.objectUtils(inputObj, 'add', 'type', e.target.value);
        if (e.target.value === 'password') {
          this.$app.objectUtils(inputObj, 'delete', 'iconRight');
          this.setData('showIconRightRow', false);
        }
        this.constructCodeSnippet();
      },
      changeInputSize(e) {
        this.$app.objectUtils(this.getData('inputObj'), 'add', 'size', e.target.value);
        this.constructCodeSnippet();
      },
      changeTooltipPlacement(e) {
        let inputObj = this.getData('inputObj');
        if (inputObj.infoIcon) {
          this.$app.objectUtils(inputObj.infoIcon, 'add', 'placement', e.target.value);
        }
        this.constructCodeSnippet();
      },
      changeIconLeft(e) {
        let inputObj = this.getData('inputObj');
        if (inputObj.iconLeft) {
          this.$app.objectUtils(inputObj, 'add', 'iconLeft.name', e.target.value);
        }
        this.constructCodeSnippet();
      },
      changeIconRight(e) {
        let inputObj = this.getData('inputObj');
        if (inputObj.iconRight) {
          this.$app.objectUtils(inputObj, 'add', 'iconRight.name', e.target.value);
        }
        this.constructCodeSnippet();
      },
      changeInputState(e) {
        let inputObj = this.getData('inputObj');
        let state = e.target.value;
        this.$app.objectUtils(inputObj, 'delete', 'disabled');
        this.$app.objectUtils(inputObj, 'delete', 'readonly');
        if (state === 'disabled') { this.$app.objectUtils(inputObj, 'add', 'disabled', true); }
        else if (state === 'readonly') { this.$app.objectUtils(inputObj, 'add', 'readonly', true); }
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

export { InputComp };