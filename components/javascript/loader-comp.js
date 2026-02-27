import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class LoaderComp extends Component {
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

    let typeSelect = node.querySelector('[data-action="changeLoaderType"]');
    if (typeSelect) {
      typeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('loaderObj'), 'add', 'type', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let loaderObj = this.getData('loaderObj') || {};
    let type = loaderObj.type || 'progress';

    // --- sLyte tab ---
    let slyte_code = '<zcat-loader\n  self="{{self}}"\n  zcat-prop="{{loaderObj}}"\n></zcat-loader>';

    // --- JS tab ---
    let propObj = { type: type };
    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    loaderObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyte_code = '// Template\n<zcat-loader\n  self="{{self}}"\n  zcat-prop-type="' + type + '"\n></zcat-loader>';

    // --- HTML tab ---
    let html_code = '';
    if (type === 'content') {
      html_code = '<div class="zcat-skeleton-loader">\n  <div class="zcat-skeleton-row">\n    <div class="zcat-skeleton-col"></div>\n    <div class="zcat-skeleton-col"></div>\n    <div class="zcat-skeleton-col"></div>\n    <div class="zcat-skeleton-col"></div>\n  </div>\n  <!-- repeat rows as needed -->\n</div>';
    } else if (type === 'spin') {
      html_code = '<div class="zcat-spin-loader"></div>';
    } else {
      html_code = '<div class="zcat-progress-loader"></div>';
    }

    // --- CSS tab ---
    let css_code = '';
    if (type === 'content') {
      css_code = '.zcat-skeleton-loader { width: 100%; }\n\n';
      css_code += '.zcat-skeleton-row {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n\n';
      css_code += '.zcat-skeleton-col {\n  animation: zcatShimmer 1.25s infinite linear;\n  background: linear-gradient(to right,\n    var(--zcat-loader-content-primary) 8%,\n    var(--zcat-loader-content-secondary) 18%,\n    var(--zcat-loader-content-primary) 33%);\n  background-size: 800px 104px;\n  height: 9px;\n  width: 23%;\n  border-radius: 50px;\n}\n\n';
      css_code += '@keyframes zcatShimmer {\n  0% { background-position: -468px 0; }\n  100% { background-position: 468px 0; }\n}';
    } else if (type === 'spin') {
      css_code = '.zcat-spin-loader {\n  width: 16px;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  background: /* gradient spinner */;\n  animation: zcatSpin 1s infinite steps(12);\n}\n\n';
      css_code += '@keyframes zcatSpin {\n  100% { transform: rotate(1turn); }\n}';
    } else {
      css_code = '.zcat-progress-loader {\n  height: 4px;\n  width: 100%;\n  background: var(--zcat-loader-progress-secondary);\n  border-radius: 40px;\n  animation: zcatProgress 3s infinite;\n}\n\n';
      css_code += '@keyframes zcatProgress {\n  0%   { background-position: -150% 0, -150% 0; }\n  66%  { background-position: 250% 0, -150% 0; }\n  100% { background-position: 250% 0, 250% 0; }\n}';
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
      self: prop('object', { default: this }),
      loaderObj: prop('object', {
        default: { type: 'progress' }
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
      // --- All Variants objects ---
      variantProgressObj: prop('object', {
        default: { type: 'progress' }
      }),
      variantSpinObj: prop('object', {
        default: { type: 'spin' }
      }),
      variantContentObj: prop('object', {
        default: { type: 'content' }
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
        this.setData('loaderObj', { type: 'progress' });
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
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
        if (navigator.clipboard) { navigator.clipboard.writeText(code); }
      }
    };
  }

  static observers() { return {}; }
}

export { LoaderComp };
