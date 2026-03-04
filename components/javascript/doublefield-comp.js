import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class DoublefieldComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('doublefieldObj') || {};

    let slyte_code = '<zcat-double-field\n  self="{{self}}"\n  zcat-prop="{{doublefieldObj}}"\n></zcat-double-field>';

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    doublefieldObj: prop("object", {\n      default: {\n        label: "Phone Number",\n        fields: [\n          { type: "dropdown", width: "100px", props: { placeholder: "+1", options: [...] } },\n          { type: "input", props: { placeholder: "Phone number" } }\n        ]\n      }\n    })\n  };\n}';

    let html_code = '<div class="zcat-doublefield-wrapper">\n  <label class="zcat-doublefield-label">Phone Number</label>\n  <div class="zcat-doublefield-row">\n    <div class="zcat-doublefield-item zcat-field-first" style="width:100px">\n      <select>...</select>\n    </div>\n    <div class="zcat-doublefield-item zcat-field-last" style="flex:1">\n      <input type="text" placeholder="Phone number" />\n    </div>\n  </div>\n</div>';

    let css_code = '.zcat-doublefield-row { display: flex; }\n.zcat-field-first input { border-radius: 8px 0 0 8px; }\n.zcat-field-last input { border-radius: 0 8px 8px 0; }';

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
      doublefieldObj: prop('object', {
        default: {
          label: 'Phone Number',
          fields: [
            {
              type: 'dropdown',
              width: '110px',
              props: {
                placeholder: '+1',
                options: [
                  { name: '+1 US', value: '+1' },
                  { name: '+44 UK', value: '+44' },
                  { name: '+91 IN', value: '+91' },
                  { name: '+81 JP', value: '+81' }
                ]
              }
            },
            {
              type: 'input',
              props: {
                placeholder: 'Enter phone number'
              }
            }
          ]
        }
      }),
      doublefieldObj2: prop('object', {
        default: {
          label: 'Amount',
          fields: [
            {
              type: 'dropdown',
              width: '100px',
              props: {
                placeholder: 'USD',
                options: [
                  { name: 'USD', value: 'usd' },
                  { name: 'EUR', value: 'eur' },
                  { name: 'GBP', value: 'gbp' },
                  { name: 'INR', value: 'inr' }
                ]
              }
            },
            {
              type: 'input',
              props: {
                placeholder: 'Enter amount'
              }
            }
          ]
        }
      }),
      doublefieldObj3: prop('object', {
        default: {
          label: 'Date Range',
          fields: [
            {
              type: 'input',
              props: { placeholder: 'Start date' }
            },
            {
              type: 'input',
              props: { placeholder: 'End date' }
            }
          ]
        }
      }),
      toggleLabelObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'toggleLabel' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleDisabled' } }
      }),
      toggleErrorObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleError' } }
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
      toggleLabel(val) {
        this.$app.objectUtils(this.getData('doublefieldObj'), 'add', 'label', val ? 'Phone Number' : '');
        this.constructCodeSnippet();
      },
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('doublefieldObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      toggleError(val) {
        this.$app.objectUtils(this.getData('doublefieldObj'), 'add', 'errorMessage', val ? 'This field is required' : '');
        this.constructCodeSnippet();
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('doublefieldObj'), 'add', 'label', 'Phone Number');
        this.$app.objectUtils(this.getData('doublefieldObj'), 'add', 'disabled', false);
        this.$app.objectUtils(this.getData('doublefieldObj'), 'add', 'errorMessage', '');
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

export { DoublefieldComp };
