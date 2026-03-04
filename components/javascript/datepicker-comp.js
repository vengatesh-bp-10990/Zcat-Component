import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class DatepickerComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('datepickerObj') || {};

    let slyte_code = '<zcat-datepicker\n  self="{{self}}"\n  zcat-prop="{{datepickerObj}}"\n></zcat-datepicker>';

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    datepickerObj: prop("object", {\n      default: ' + JSON.stringify({
      label: obj.label || 'Date',
      placeholder: obj.placeholder || 'Select date',
      format: obj.format || 'MM/DD/YYYY',
      showTime: obj.showTime || false
    }, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-datepicker-wrapper">\n  <label class="zcat-datepicker-label">' + (obj.label || 'Date') + '</label>\n  <div class="zcat-datepicker-trigger">\n    <span class="zcat-datepicker-display">' + (obj.placeholder || 'Select date') + '</span>\n    <span class="zcat-datepicker-icon">&#x1F4C5;</span>\n  </div>\n</div>';

    let css_code = '.zcat-datepicker-wrapper { position: relative; width: 260px; }\n.zcat-datepicker-trigger { display: flex; align-items: center; height: 36px; padding: 0 12px; border: 1px solid var(--zcat-inputField-border-default); border-radius: 8px; cursor: pointer; }';

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
      datepickerObj: prop('object', {
        default: {
          label: 'Date',
          placeholder: 'Select date',
          format: 'MM/DD/YYYY',
          callback: { name: 'onDateSelect' }
        }
      }),
      datepickerTimeObj: prop('object', {
        default: {
          label: 'Date & Time',
          placeholder: 'Select date and time',
          format: 'MM/DD/YYYY',
          showTime: true,
          callback: { name: 'onDateSelect' }
        }
      }),
      datepickerMinMaxObj: prop('object', {
        default: {
          label: 'Restricted Range',
          placeholder: 'Pick a date',
          format: 'MM/DD/YYYY',
          minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
          maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0],
          callback: { name: 'onDateSelect' }
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
      toggleShowTimeObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleShowTime' } }
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
      onDateSelect(result) {
        console.log('Datepicker selected:', result);
      },
      toggleLabel(val) {
        if (val) {
          this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'label', 'Date');
        } else {
          this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'label', '');
        }
        this.constructCodeSnippet();
      },
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      toggleError(val) {
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'errorMessage', val ? 'Please select a valid date' : '');
        this.constructCodeSnippet();
      },
      toggleShowTime(val) {
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'showTime', val);
        this.constructCodeSnippet();
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'label', 'Date');
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'disabled', false);
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'errorMessage', '');
        this.$app.objectUtils(this.getData('datepickerObj'), 'add', 'showTime', false);
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

export default DatepickerComp;
