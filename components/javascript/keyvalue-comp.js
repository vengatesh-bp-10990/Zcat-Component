import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class KeyvalueComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('keyvalueObj') || {};

    let slyte_code = '<zcat-keyvalue-pair\n  self="{{self}}"\n  zcat-prop="{{keyvalueObj}}"\n></zcat-keyvalue-pair>';

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    keyvalueObj: prop("object", {\n      default: {\n        label: "Parameters",\n        fieldDefs: [\n          { key: "paramKey", label: "Key", placeholder: "Enter key" },\n          { key: "paramValue", label: "Value", placeholder: "Enter value" }\n        ],\n        rows: [\n          { paramKey: "host", paramValue: "localhost" }\n        ]\n      }\n    })\n  };\n}';

    let html_code = '<div class="zcat-kvp-wrapper">\n  <div class="zcat-kvp-header">\n    <span class="zcat-kvp-header-cell">Key</span>\n    <span class="zcat-kvp-header-cell">Value</span>\n  </div>\n  <div class="zcat-kvp-row">\n    <input class="zcat-kvp-input" placeholder="Key" />\n    <input class="zcat-kvp-input" placeholder="Value" />\n    <span class="zcat-kvp-remove-btn">×</span>\n  </div>\n  <button class="zcat-kvp-add-btn">+ Add Row</button>\n</div>';

    let css_code = '.zcat-kvp-row { display: flex; gap: 8px; align-items: center; }\n.zcat-kvp-input { flex: 1; height: 34px; border: 1px solid var(--zcat-inputField-border-default); border-radius: 6px; }';

    this.setData('slyteCodeSnippet', { code: slyte_code });
    this.setData('jsCodeSnippet', { code: js_code });
    this.setData('htmlCodeSnippet', { code: html_code });
    this.setData('cssCodeSnippet', { code: css_code });
  }

  data() {
    return {
      self: prop('object', { default: this }),
      pageTab: prop('string', { default: 'customize' }),
      activeTab: prop('string', { default: 'slyte' }),
      keyvalueObj: prop('object', {
        default: {
          label: 'Parameters',
          fieldDefs: [
            { key: 'paramKey', label: 'Key', placeholder: 'Enter key' },
            { key: 'paramValue', label: 'Value', placeholder: 'Enter value' }
          ],
          rows: [
            { paramKey: 'host', paramValue: 'localhost', _id: 'row_1' },
            { paramKey: 'port', paramValue: '8080', _id: 'row_2' }
          ],
          addLabel: 'Add Parameter',
          callback: { name: 'onRowsChange' }
        }
      }),
      keyvalueObj2: prop('object', {
        default: {
          label: 'HTTP Headers',
          fieldDefs: [
            { key: 'headerName', label: 'Header', placeholder: 'Header name' },
            { key: 'headerValue', label: 'Value', placeholder: 'Header value' }
          ],
          rows: [
            { headerName: 'Content-Type', headerValue: 'application/json', _id: 'h_1' },
            { headerName: 'Authorization', headerValue: 'Bearer xxx', _id: 'h_2' }
          ],
          addLabel: 'Add Header'
        }
      }),
      toggleLabelObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'toggleLabel' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleDisabled' } }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'small', callback: { name: 'resetCustomise' } }
      }),
      slyteCodeSnippet: prop('object', { default: { code: '' } }),
      jsCodeSnippet: prop('object', { default: { code: '' } }),
      htmlCodeSnippet: prop('object', { default: { code: '' } }),
      cssCodeSnippet: prop('object', { default: { code: '' } })
    };
  }

  static methods() {
    return {
      onRowsChange(rows) {
        console.log('Key-value rows changed:', rows);
      },
      toggleLabel(val) {
        this.$app.objectUtils(this.getData('keyvalueObj'), 'add', 'label', val ? 'Parameters' : '');
        this.constructCodeSnippet();
      },
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('keyvalueObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('keyvalueObj'), 'add', 'label', 'Parameters');
        this.$app.objectUtils(this.getData('keyvalueObj'), 'add', 'disabled', false);
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
      showCustomizeTab() { this.setData('pageTab', 'customize'); },
      showVariantsTab() { this.setData('pageTab', 'variants'); },
      showSlyteTab() { this.setData('activeTab', 'slyte'); },
      showJsTab() { this.setData('activeTab', 'js'); },
      showHtmlTab() { this.setData('activeTab', 'html'); },
      showCssTab() { this.setData('activeTab', 'css'); },
      copyCode() {
        let tab = this.getData('activeTab');
        let snippet = this.getData(tab + 'CodeSnippet') || {};
        if (snippet.code && navigator.clipboard) {
          navigator.clipboard.writeText(snippet.code);
        }
      }
    };
  }

  static observers() {
    return {};
  }
}

export { KeyvalueComp };
