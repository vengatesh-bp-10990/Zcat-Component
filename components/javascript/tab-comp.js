import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class TabComp extends Component {
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

    let variantSelect = node.querySelector('[data-action="changeTabVariant"]');
    let sizeSelect = node.querySelector('[data-action="changeTabSize"]');

    if (variantSelect) {
      variantSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('tabObj'), 'add', 'variant', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('tabObj'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let tabObj = this.getData('tabObj') || {};

    let slyte_code = '<zcat-tab\n  self="{{self}}"\n  zcat-prop="{{tabObj}}"\n></zcat-tab>';

    let propObj = {};
    propObj.variant = tabObj.variant || 'primary';
    if (tabObj.size) propObj.size = tabObj.size;
    propObj.list = [
      { id: 'tab1', title: { name: 'Tab 1' }, body: { content: 'Tab 1 content' } },
      { id: 'tab2', title: { name: 'Tab 2' }, body: { content: 'Tab 2 content' } },
      { id: 'tab3', title: { name: 'Tab 3' }, body: { content: 'Tab 3 content' } }
    ];

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    tabObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-tabs-wrapper zcat-tabs-' + (tabObj.variant || 'primary') + '">\n';
    html_code += '  <div class="zcat-tab-head">\n';
    html_code += '    <div class="zcat-tab-title zcat-tab-active">Tab 1</div>\n';
    html_code += '    <div class="zcat-tab-title">Tab 2</div>\n';
    html_code += '    <div class="zcat-tab-title">Tab 3</div>\n';
    html_code += '  </div>\n';
    html_code += '  <div class="zcat-tab-body">\n';
    html_code += '    <div class="zcat-tab-content zcat-tab-show">Tab 1 content</div>\n';
    html_code += '  </div>\n';
    html_code += '</div>';

    let css_code = '.zcat-tabs-wrapper {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n';
    css_code += '.zcat-tab-head {\n  display: flex;\n  align-items: stretch;\n  border-bottom: 1px solid var(--zcat-tabs-primary-border-default);\n}\n\n';
    css_code += '.zcat-tab-title {\n  padding: 0 8px;\n  height: 32px;\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  color: var(--zcat-tabs-primary-text-default);\n}\n\n';
    css_code += '.zcat-tab-title.zcat-tab-active {\n  color: var(--zcat-tabs-primary-text-active);\n  border-bottom-color: var(--zcat-tabs-primary-border-active);\n  font-weight: 600;\n}';

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
      tabObj: prop('object', {
        default: {
          variant: 'primary',
          list: [
            { id: 'tab1', title: { name: 'General' }, body: { content: 'General settings go here.' } },
            { id: 'tab2', title: { name: 'Profile' }, body: { content: 'Profile configuration content.' } },
            { id: 'tab3', title: { name: 'Security' }, body: { content: 'Security and privacy settings.' } }
          ]
        }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'extra-small', callback: { name: 'resetCustomization' } }
      }),
      toggleCloseObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleClose' } }
      }),
      toggleBadgeObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleBadge' } }
      }),
      // Variant demos
      variantPrimaryObj: prop('object', {
        default: {
          variant: 'primary',
          list: [
            { id: 'vp1', title: { name: 'Overview' }, body: { content: 'Primary tab body content.' } },
            { id: 'vp2', title: { name: 'Details' }, body: { content: 'Details content.' } },
            { id: 'vp3', title: { name: 'Settings' }, body: { content: 'Settings content.' } }
          ]
        }
      }),
      variantSecondaryObj: prop('object', {
        default: {
          variant: 'secondary',
          list: [
            { id: 'vs1', title: { name: 'All' }, body: { content: 'All items.' } },
            { id: 'vs2', title: { name: 'Active' }, body: { content: 'Active items.' } },
            { id: 'vs3', title: { name: 'Archived' }, body: { content: 'Archived items.' } }
          ]
        }
      }),
      variantCodeObj: prop('object', {
        default: {
          variant: 'code', showBody: false,
          list: [
            { id: 'vc1', title: { name: 'index.html' } },
            { id: 'vc2', title: { name: 'style.css' } },
            { id: 'vc3', title: { name: 'app.js' } }
          ]
        }
      }),
      variantBadgeObj: prop('object', {
        default: {
          variant: 'primary',
          list: [
            { id: 'vb1', title: { name: 'Inbox', badge: '12' }, body: { content: 'You have 12 unread messages.' } },
            { id: 'vb2', title: { name: 'Drafts', badge: '3' }, body: { content: 'You have 3 drafts.' } },
            { id: 'vb3', title: { name: 'Sent' }, body: { content: 'Sent messages.' } }
          ]
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
        this.setData('tabObj', {
          variant: 'primary',
          list: [
            { id: 'tab1', title: { name: 'General' }, body: { content: 'General settings go here.' } },
            { id: 'tab2', title: { name: 'Profile' }, body: { content: 'Profile configuration content.' } },
            { id: 'tab3', title: { name: 'Security' }, body: { content: 'Security and privacy settings.' } }
          ]
        });
        this.$app.objectUtils(this.getData('toggleCloseObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleBadgeObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleClose(checked) {
        this.$app.objectUtils(this.getData('tabObj'), 'add', 'closeIcon', checked);
        this.constructCodeSnippet();
      },
      onToggleBadge(checked) {
        let tabObj = this.getData('tabObj');
        let list = tabObj.list;
        if (checked) {
          if (list[0]) this.$app.objectUtils(list[0].title, 'add', 'badge', '5');
          if (list[1]) this.$app.objectUtils(list[1].title, 'add', 'badge', '2');
        } else {
          if (list[0]) this.$app.objectUtils(list[0].title, 'add', 'badge', '');
          if (list[1]) this.$app.objectUtils(list[1].title, 'add', 'badge', '');
        }
        this.constructCodeSnippet();
      },
      onTabChange(item) {
        // demo callback
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

export { TabComp };
