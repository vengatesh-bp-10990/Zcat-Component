import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class LinkboxComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('linkboxObj') || {};
    let labelPos = obj.labelPosition || 'top';
    let value = obj.value || 'https://console.catalyst.zoho.com/baas/project/dev';
    let label = obj.label || 'URL';
    let size = obj.size || 'default';
    let disabled = obj.disabled || false;

    let sizeClass = size === 'small' ? ' zcat-link-field-small' : '';
    let disabledClass = disabled ? ' input-field-disabled' : '';

    let topHtml = `<div class="zcat-dF zcat-align-center zcat-gap-2 zcat-mb-2">\n  <p class="zcat-input-label">${label}</p>\n</div>`;
    let leftLabelHtml = `<p class="zcat-input-label" style="min-width:40px;margin-right:8px">${label}</p>`;
    let insideLabelHtml = `<span class="zcat-input-label" style="margin-right:4px;white-space:nowrap">${label}:</span>`;
    let copyBtn = `<button class="zcat-link-copy-btn" onclick="navigator.clipboard&&navigator.clipboard.writeText(this.closest('.zcat-link-field-box').querySelector('.zcat-link-text').textContent)" title="Copy">\n  <zcat-icon name="copy" width="14" height="14" stroke="currentColor" stroke-width="1.3"></zcat-icon>\n</button>`;

    let inner = `<span class="zcat-link-text" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:12px">${value}</span>\n${copyBtn}`;

    let htmlParts = [];
    if (labelPos === 'top') {
      htmlParts = [topHtml, `<div class="zcat-link-field-box${sizeClass}${disabledClass}">\n  ${inner}\n</div>`];
    } else if (labelPos === 'left') {
      htmlParts = [`<div class="zcat-dF zcat-align-center">\n  ${leftLabelHtml}\n  <div class="zcat-link-field-box${sizeClass}${disabledClass}" style="flex:1">\n    ${inner}\n  </div>\n</div>`];
    } else if (labelPos === 'inside') {
      htmlParts = [`<div class="zcat-link-field-box${sizeClass}${disabledClass}">\n  ${insideLabelHtml}${inner}\n</div>`];
    } else {
      htmlParts = [`<div class="zcat-link-field-box${sizeClass}${disabledClass}">\n  ${inner}\n</div>`];
    }

    let slyte_code = `<div class="zcat-link-box-wrapper">\n  <!-- Label (${labelPos}) -->\n${htmlParts.join('\n')}\n</div>`;

    let js_code = `data() {\n  return {\n    linkUrl: '${value}'\n  };\n}`;

    let html_code = htmlParts.join('\n');

    let css_code = `.zcat-link-field-box {\n  border-radius: 6px;\n  border: 1px solid var(--zcat-inputField-border-default);\n  background: var(--zcat-inputField-bg-default);\n  font-family: var(--zcat-font-family-code);\n  padding: 8px 12px;\n  height: 36px;\n  box-sizing: border-box;\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}`;

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
      linkboxObj: prop('object', {
        default: {
          labelPosition: 'top',
          label: 'URL',
          value: 'https://console.catalyst.zoho.com/baas/project/dev',
          size: 'default',
          disabled: false
        }
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
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('linkboxObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      resetCustomise() {
        let obj = this.getData('linkboxObj');
        this.$app.objectUtils(obj, 'add', 'labelPosition', 'top');
        this.$app.objectUtils(obj, 'add', 'label', 'URL');
        this.$app.objectUtils(obj, 'add', 'value', 'https://console.catalyst.zoho.com/baas/project/dev');
        this.$app.objectUtils(obj, 'add', 'size', 'default');
        this.$app.objectUtils(obj, 'add', 'disabled', false);
        this.setData('toggleDisabledObj', { checked: false, size: 'small', callback: { name: 'toggleDisabled' } });
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
      },
      changeLabelPosition(e) {
        this.$app.objectUtils(this.getData('linkboxObj'), 'add', 'labelPosition', e.target.value);
        this.constructCodeSnippet();
      },
      changeSize(e) {
        this.$app.objectUtils(this.getData('linkboxObj'), 'add', 'size', e.target.value);
        this.constructCodeSnippet();
      },
      changeValue(e) {
        this.$app.objectUtils(this.getData('linkboxObj'), 'add', 'value', e.target.value);
        this.constructCodeSnippet();
      }
    };
  }

  static observers() {
    return {};
  }
}

export { LinkboxComp };
