import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class PaginationComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let paginationObj = this.getData('paginationObj') || {};

    let slyte_code = '<zcat-pagination\n  self="{{self}}"\n  zcat-prop="{{paginationObj}}"\n></zcat-pagination>';

    let propObj = {};
    propObj.variant = paginationObj.variant || 'primary';
    propObj.totalRecords = paginationObj.totalRecords || 150;
    propObj.rowsPerPage = paginationObj.rowsPerPage || 10;
    propObj.callback = { name: 'onPageChange' };

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    paginationObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-pagination zcat-pagination-' + (paginationObj.variant || 'primary') + '">\n';
    if ((paginationObj.variant || 'primary') !== 'secondary') {
      html_code += '  <div class="zcat-pagination-left">\n';
      html_code += '    <span class="zcat-pagination-label">Rows per page:</span>\n';
      html_code += '    <select class="zcat-pagination-select">\n';
      html_code += '      <option>10</option><option>25</option><option>50</option>\n';
      html_code += '    </select>\n';
      html_code += '  </div>\n';
    }
    html_code += '  <div class="zcat-pagination-right">\n';
    html_code += '    <span class="zcat-pagination-info">1 – 10 of 150</span>\n';
    html_code += '    <div class="zcat-pagination-nav">\n';
    html_code += '      <button class="zcat-pagination-btn">«</button>\n';
    html_code += '      <button class="zcat-pagination-btn">‹</button>\n';
    html_code += '      <button class="zcat-pagination-btn">›</button>\n';
    html_code += '      <button class="zcat-pagination-btn">»</button>\n';
    html_code += '    </div>\n';
    html_code += '  </div>\n';
    html_code += '</div>';

    let css_code = '.zcat-pagination {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  font-size: 13px;\n}\n\n';
    css_code += '.zcat-pagination-nav {\n  display: flex;\n  gap: 4px;\n}\n\n';
    css_code += '.zcat-pagination-btn {\n  width: 28px;\n  height: 28px;\n  border: 1px solid var(--zcat-pagination-border);\n  border-radius: 6px;\n  background: transparent;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}';

    this.setData('slyteCodeSnippet.code', slyte_code);
    this.setData('jsCodeSnippet.code', js_code);
    this.setData('htmlCodeSnippet.code', html_code);
    this.setData('cssCodeSnippet.code', css_code);
  }

  data() {
    return {
      activeTab: prop('string', { default: 'slyte' }),
      pageTab: prop('string', { default: 'customize' }),
      self: prop('object', { default: this }),
      paginationObj: prop('object', {
        default: {
          variant: 'primary',
          totalRecords: 150,
          rowsPerPage: 10,
          currentPage: 1,
          callback: { name: 'onPageChange' }
        }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'extra-small', callback: { name: 'resetCustomization' } }
      }),
      // Variant demos
      variantPrimaryObj: prop('object', {
        default: {
          variant: 'primary',
          totalRecords: 248,
          rowsPerPage: 10,
          currentPage: 1,
          callback: { name: 'onPageChange' }
        }
      }),
      variantSecondaryObj: prop('object', {
        default: {
          variant: 'secondary',
          totalRecords: 85,
          currentPage: 1,
          callback: { name: 'onPageChange' }
        }
      }),
      variantSmallSetObj: prop('object', {
        default: {
          variant: 'primary',
          totalRecords: 25,
          rowsPerPage: 10,
          currentPage: 1,
          callback: { name: 'onPageChange' }
        }
      }),
      variantLargeSetObj: prop('object', {
        default: {
          variant: 'primary',
          totalRecords: 5000,
          rowsPerPage: 50,
          currentPage: 1,
          callback: { name: 'onPageChange' }
        }
      }),
      slyteCodeSnippet: prop('object', { default: { code: '' } }),
      jsCodeSnippet: prop('object', { default: { code: '' } }),
      htmlCodeSnippet: prop('object', { default: { code: '' } }),
      cssCodeSnippet: prop('object', { default: { code: '' } })
    };
  }

  static methods() {
    return {
      resetCustomization() {
        this.setData('paginationObj', {
          variant: 'primary',
          totalRecords: 150,
          rowsPerPage: 10,
          currentPage: 1,
          callback: { name: 'onPageChange' }
        });
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onPageChange(page, rowsPerPage) {
        // demo callback
      }
    };
  }

  static actions() {
    return {
      changePaginationVariant(e) {
        this.$app.objectUtils(this.getData('paginationObj'), 'add', 'variant', e.target.value);
        this.constructCodeSnippet();
      },
      showSlyteTab() { this.setData('activeTab', 'slyte'); },
      showJsTab() { this.setData('activeTab', 'js'); },
      showHtmlTab() { this.setData('activeTab', 'html'); },
      showCssTab() { this.setData('activeTab', 'css'); },
      showCustomizeTab() { this.setData('pageTab', 'customize'); },
      showVariantsTab() { this.setData('pageTab', 'variants'); },
      copyCode() {
        let tab = this.getData('activeTab');
        let code;
        if (tab === 'slyte') code = this.getData('slyteCodeSnippet.code');
        else if (tab === 'js') code = this.getData('jsCodeSnippet.code');
        else if (tab === 'html') code = this.getData('htmlCodeSnippet.code');
        else if (tab === 'css') code = this.getData('cssCodeSnippet.code');
        if (navigator.clipboard) { navigator.clipboard.writeText(code); }
      }
    };
  }

  static observers() { return {}; }
}

export { PaginationComp };
