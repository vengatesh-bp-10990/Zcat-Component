import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ModalComp extends Component {
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

    let sizeSelect = node.querySelector('[data-action="changeModalSize"]');
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('modalObj'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let modalObj = this.getData('modalObj') || {};

    let slyte_code = '<zcat-modal\n  self="{{self}}"\n  zcat-prop="{{modalObj}}"\n></zcat-modal>';

    let propObj = { header: { title: 'Modal Title', desc: 'An optional description.' } };
    if (modalObj.size) propObj.size = modalObj.size;
    propObj.footer = {
      right: [
        { label: 'Cancel', variant: 'outline', color: 'primary', callback: { name: 'onModalCancel' } },
        { label: 'Save', variant: 'fill', color: 'primary', callback: { name: 'onModalSave' } }
      ]
    };

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    modalObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-modal-overlay">\n';
    html_code += '  <div class="zcat-modal-container">\n';
    html_code += '    <div class="zcat-modal-header">\n';
    html_code += '      <h2 class="zcat-modal-title">Modal Title</h2>\n';
    html_code += '      <button class="zcat-modal-close">&times;</button>\n';
    html_code += '    </div>\n';
    html_code += '    <div class="zcat-modal-body">Content goes here.</div>\n';
    html_code += '    <div class="zcat-modal-footer">\n';
    html_code += '      <button class="zcat-btn-outline">Cancel</button>\n';
    html_code += '      <button class="zcat-btn-primary">Save</button>\n';
    html_code += '    </div>\n';
    html_code += '  </div>\n';
    html_code += '</div>';

    let css_code = '.zcat-modal-overlay {\n  position: fixed; inset: 0;\n  background: rgba(0,0,0,0.5);\n  display: flex; align-items: center; justify-content: center;\n}\n\n';
    css_code += '.zcat-modal-container {\n  width: 520px; max-width: 90vw;\n  background: var(--zcat-popup-bg);\n  border-radius: 12px;\n  box-shadow: var(--zcat-shadow-dark-all);\n}';

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
      demoModalOpen: prop('boolean', { default: false }),
      modalObj: prop('object', {
        default: {
          header: { title: 'Confirm Action', desc: 'Are you sure you want to proceed?' },
          footer: {
            right: [
              { label: 'Cancel', variant: 'outline', color: 'primary', callback: { name: 'onModalCancel' } },
              { label: 'Confirm', variant: 'fill', color: 'primary', callback: { name: 'onModalSave' } }
            ]
          }
        }
      }),
      openBtnObj: prop('object', {
        default: { label: 'Open Modal', variant: 'fill', color: 'primary', callback: { name: 'openDemoModal' } }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'extra-small', callback: { name: 'resetCustomization' } }
      }),
      toggleDescObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleDesc' } }
      }),
      toggleBackObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleBack' } }
      }),
      // Variants
      variantDefaultObj: prop('object', {
        default: {
          header: { title: 'Default Modal' },
          footer: { right: [{ label: 'Close', variant: 'ghost', color: 'primary' }] }
        }
      }),
      variantWithDescObj: prop('object', {
        default: {
          header: { title: 'Modal with Description', desc: 'This modal includes supporting text below the title.' },
          footer: { right: [{ label: 'Cancel', variant: 'outline', color: 'primary' }, { label: 'Save', variant: 'fill', color: 'primary' }] }
        }
      }),
      variantLargeObj: prop('object', {
        default: {
          size: 'large',
          header: { title: 'Large Modal' },
          footer: { right: [{ label: 'Done', variant: 'fill', color: 'primary' }] }
        }
      }),
      variantSmallObj: prop('object', {
        default: {
          size: 'small',
          header: { title: 'Small Modal' },
          footer: { right: [{ label: 'OK', variant: 'fill', color: 'primary' }] }
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
      openDemoModal() {
        let modalNode = this.$node.querySelector('zcat-modal');
        if (modalNode && modalNode.component) {
          modalNode.component.exec('openModal');
        }
      },
      onModalCancel() {
        // close handled automatically
      },
      onModalSave() {
        // demo save callback
      },
      resetCustomization() {
        this.setData('modalObj', {
          header: { title: 'Confirm Action', desc: 'Are you sure you want to proceed?' },
          footer: {
            right: [
              { label: 'Cancel', variant: 'outline', color: 'primary', callback: { name: 'onModalCancel' } },
              { label: 'Confirm', variant: 'fill', color: 'primary', callback: { name: 'onModalSave' } }
            ]
          }
        });
        this.$app.objectUtils(this.getData('toggleDescObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleBackObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleDesc(checked) {
        if (checked) {
          this.$app.objectUtils(this.getData('modalObj').header, 'add', 'desc', 'Are you sure you want to proceed?');
        } else {
          this.$app.objectUtils(this.getData('modalObj').header, 'add', 'desc', '');
        }
        this.constructCodeSnippet();
      },
      onToggleBack(checked) {
        this.$app.objectUtils(this.getData('modalObj').header, 'add', 'backArrow', checked);
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
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

export { ModalComp };
