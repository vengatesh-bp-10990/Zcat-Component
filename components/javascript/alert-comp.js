import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class AlertComp extends Component {
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

    let typeSelect = node.querySelector('[data-action="changeAlertType"]');
    if (typeSelect) {
      typeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('alertObj'), 'add', 'type', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let alertObj = this.getData('alertObj') || {};
    let type = alertObj.type || 'info';

    // --- sLyte tab ---
    let slyte_code = '<zcat-alert\n  self="{{self}}"\n  zcat-prop="{{alertObj}}"\n></zcat-alert>';

    // --- JS tab ---
    let propObj = { type: type, desc: alertObj.desc || 'This is an alert message.' };
    if (alertObj.header) { propObj.header = alertObj.header; }
    if (alertObj.closable === false) { propObj.closable = false; }
    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    alertObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    newSlyteAttrs.push('  zcat-prop-type="' + type + '"');
    newSlyteAttrs.push('  zcat-prop-desc="' + (alertObj.desc || 'This is an alert message.') + '"');
    if (alertObj.header) { newSlyteAttrs.push('  zcat-prop-header="' + alertObj.header + '"'); }
    if (alertObj.closable === false) { newSlyteAttrs.push('  zcat-prop-closable="false"'); }

    let newSlyte_code = '// Template\n<zcat-alert\n' + newSlyteAttrs.join('\n') + '\n></zcat-alert>\n\n'
      + '// Inline JS — callback via self\nstatic methods() {\n  return {\n    onAlertClose(action, prop) {\n      console.log("Alert closed");\n    }\n  };\n}';

    // --- HTML tab ---
    let typeClass = type;
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--zcat-toast-icon-line-success)" stroke-width="1.3"><path d="M14 7.36V8a6 6 0 1 1-3.56-5.48"/><polyline points="14 2.5 8 8.5 6 6.5"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--zcat-toast-icon-line-danger)" stroke-width="1.3"><circle cx="8" cy="8" r="6"/><line x1="10" y1="6" x2="6" y2="10"/><line x1="6" y1="6" x2="10" y2="10"/></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--zcat-toast-icon-line-warning)" stroke-width="1.3"><path d="M6.86 2.57L1.21 12a1.33 1.33 0 0 0 1.15 2h11.28a1.33 1.33 0 0 0 1.15-2L9.14 2.57a1.33 1.33 0 0 0-2.28 0z"/><line x1="8" y1="6" x2="8" y2="9"/><line x1="8" y1="11" x2="8.01" y2="11"/></svg>';
    } else {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--zcat-toast-icon-line-info)" stroke-width="1.3"><circle cx="8" cy="8" r="6"/><line x1="8" y1="11" x2="8" y2="7"/><line x1="8" y1="5" x2="8.01" y2="5"/></svg>';
    }

    let headerHtml = alertObj.header ? '\n    <p class="zcat-alert-header">' + alertObj.header + '</p>' : '';
    let descClass = alertObj.header ? 'zcat-alert-desc' : 'zcat-alert-desc zcat-alert-desc-only';
    let closeHtml = alertObj.closable !== false ? '\n  <div class="zcat-alert-right">\n    <button class="zcat-alert-close">&times;</button>\n  </div>' : '';

    let html_code = '<div class="zcat-alert-banner ' + typeClass + (alertObj.header ? ' zcat-alert-has-header' : '') + '">\n'
      + '  <div class="zcat-alert-left">\n'
      + '    <div class="zcat-alert-icon-wrap">\n      ' + iconSvg + '\n    </div>\n'
      + '    <div class="zcat-alert-text">' + headerHtml + '\n'
      + '      <p class="' + descClass + '">' + (alertObj.desc || 'This is an alert message.') + '</p>\n'
      + '    </div>\n  </div>'
      + closeHtml + '\n</div>';

    // --- CSS tab ---
    let css_code = '.zcat-alert-banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 10px 14px;\n  border-radius: 8px;\n  border: 1px solid transparent;\n}\n\n';
    css_code += '.zcat-alert-banner.' + type + ' {\n  background: var(--zcat-alerts-' + (type === 'error' ? 'danger' : type) + '-bg);\n  border-color: var(--zcat-alerts-' + (type === 'error' ? 'danger' : type) + '-border);\n}\n\n';
    css_code += '.zcat-alert-header {\n  font-weight: 600;\n  color: var(--zcat-alerts-' + (type === 'error' ? 'danger' : type) + '-text-primary);\n}\n\n';
    css_code += '.zcat-alert-desc {\n  color: var(--zcat-alerts-' + (type === 'error' ? 'danger' : type) + '-text-secondary);\n}';

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
      alertObj: prop('object', {
        default: {
          type: 'info',
          desc: 'This is an informational alert for the user.',
          closable: true
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
      toggleHeaderObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleHeader' } }
      }),
      toggleClosableObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleClosable' } }
      }),
      // --- All Variants objects ---
      variantInfoObj: prop('object', {
        default: { type: 'info', desc: 'This is an informational message.', closable: false }
      }),
      variantSuccessObj: prop('object', {
        default: { type: 'success', desc: 'Operation completed successfully.', closable: false }
      }),
      variantWarningObj: prop('object', {
        default: { type: 'warning', desc: 'Please review before proceeding.', closable: false }
      }),
      variantErrorObj: prop('object', {
        default: { type: 'error', desc: 'Something went wrong. Please try again.', closable: false }
      }),
      variantInfoHeaderObj: prop('object', {
        default: { type: 'info', header: 'Information', desc: 'This is an informational message with a header.', closable: false }
      }),
      variantSuccessHeaderObj: prop('object', {
        default: { type: 'success', header: 'Success', desc: 'Your changes have been saved successfully.', closable: false }
      }),
      variantWarningHeaderObj: prop('object', {
        default: { type: 'warning', header: 'Warning', desc: 'This action cannot be undone.', closable: false }
      }),
      variantErrorHeaderObj: prop('object', {
        default: { type: 'error', header: 'Error', desc: 'Failed to load the resource. Please try again later.', closable: false }
      }),
      variantNonClosableObj: prop('object', {
        default: { type: 'info', desc: 'This alert cannot be dismissed by the user.', closable: false }
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
        this.setData('alertObj', {
          type: 'info',
          desc: 'This is an informational alert for the user.',
          closable: true
        });
        this.$app.objectUtils(this.getData('toggleHeaderObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleClosableObj'), 'add', 'checked', true);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleHeader(checked) {
        let alertObj = this.getData('alertObj');
        if (checked) {
          this.$app.objectUtils(alertObj, 'add', 'header', 'Alert Header');
        } else {
          this.$app.objectUtils(alertObj, 'add', 'header', '');
        }
        this.constructCodeSnippet();
      },
      onToggleClosable(checked) {
        let alertObj = this.getData('alertObj');
        this.$app.objectUtils(alertObj, 'add', 'closable', checked);
        this.constructCodeSnippet();
      },
      onAlertClose() {
        // Demo callback — no-op for docs
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
        if (navigator.clipboard) { navigator.clipboard.writeText(code); }
      }
    };
  }

  static observers() { return {}; }
}

export { AlertComp };
