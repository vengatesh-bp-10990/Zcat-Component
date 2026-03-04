import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class AvatarComp extends Component {
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

    let typeSelect = node.querySelector('[data-action="changeAvatarType"]');
    let sizeSelect = node.querySelector('[data-action="changeAvatarSize"]');
    let statusSelect = node.querySelector('[data-action="changeAvatarStatus"]');

    if (typeSelect) {
      typeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('avatarObj'), 'add', 'type', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('avatarObj'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (statusSelect) {
      statusSelect.addEventListener('change', function (e) {
        let val = e.target.value;
        comp.$app.objectUtils(comp.getData('avatarObj'), 'add', 'status', val === 'none' ? '' : val);
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let avatarObj = this.getData('avatarObj') || {};

    let slyte_code = '<zcat-avatar\n  self="{{self}}"\n  zcat-prop="{{avatarObj}}"\n></zcat-avatar>';

    let propObj = {};
    propObj.type = avatarObj.type || 'icon';
    if (avatarObj.size) propObj.size = avatarObj.size;
    if (avatarObj.name) propObj.name = avatarObj.name;
    if (avatarObj.status) propObj.status = avatarObj.status;
    if (avatarObj.type === 'img' && avatarObj.src) propObj.src = avatarObj.src;

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    avatarObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-avatar' + (avatarObj.size === 'small' ? ' zcat-avatar-sm' : avatarObj.size === 'large' ? ' zcat-avatar-lg' : avatarObj.size === 'extra-large' ? ' zcat-avatar-xl' : ' zcat-avatar-md') + '">\n';
    if (avatarObj.type === 'letter') {
      html_code += '  <span class="zcat-avatar-letter">A</span>\n';
    } else if (avatarObj.type === 'img') {
      html_code += '  <img class="zcat-avatar-img" src="..." alt="Avatar"/>\n';
    } else {
      html_code += '  <svg class="zcat-avatar-icon" viewBox="0 0 24 24" ...><!-- user icon --></svg>\n';
    }
    if (avatarObj.status) {
      html_code += '  <span class="zcat-avatar-status zcat-avatar-status-' + avatarObj.status + '"></span>\n';
    }
    html_code += '</div>';

    let css_code = '.zcat-avatar {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: var(--zcat-avatar-bg);\n  color: var(--zcat-avatar-text);\n  overflow: hidden;\n}\n\n';
    css_code += '.zcat-avatar-sm { width: 24px; height: 24px; }\n';
    css_code += '.zcat-avatar-md { width: 32px; height: 32px; }\n';
    css_code += '.zcat-avatar-lg { width: 40px; height: 40px; }\n';
    css_code += '.zcat-avatar-xl { width: 56px; height: 56px; }\n\n';
    css_code += '.zcat-avatar-status {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid white;\n}\n\n';
    css_code += '.zcat-avatar-status-online { background: #22c55e; }\n';
    css_code += '.zcat-avatar-status-busy { background: #ef4444; }\n';
    css_code += '.zcat-avatar-status-away { background: #f59e0b; }\n';
    css_code += '.zcat-avatar-status-offline { background: #9ca3af; }';

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
      avatarObj: prop('object', {
        default: {
          type: 'letter',
          name: 'Alex Morgan',
          size: 'medium',
          status: 'online'
        }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'extra-small', callback: { name: 'resetCustomization' } }
      }),
      // Variant demos
      variantIconObj: prop('object', {
        default: { type: 'icon', size: 'medium' }
      }),
      variantLetterObj: prop('object', {
        default: { type: 'letter', name: 'Jane Doe', size: 'medium' }
      }),
      variantImgObj: prop('object', {
        default: { type: 'img', src: 'https://i.pravatar.cc/80?img=5', name: 'Profile', size: 'medium' }
      }),
      variantSmObj: prop('object', {
        default: { type: 'letter', name: 'SM', size: 'small' }
      }),
      variantMdObj: prop('object', {
        default: { type: 'letter', name: 'MD', size: 'medium' }
      }),
      variantLgObj: prop('object', {
        default: { type: 'letter', name: 'LG', size: 'large' }
      }),
      variantXlObj: prop('object', {
        default: { type: 'letter', name: 'XL', size: 'extra-large' }
      }),
      variantOnlineObj: prop('object', {
        default: { type: 'letter', name: 'ON', size: 'large', status: 'online' }
      }),
      variantBusyObj: prop('object', {
        default: { type: 'letter', name: 'BU', size: 'large', status: 'busy' }
      }),
      variantAwayObj: prop('object', {
        default: { type: 'letter', name: 'AW', size: 'large', status: 'away' }
      }),
      variantOfflineObj: prop('object', {
        default: { type: 'letter', name: 'OF', size: 'large', status: 'offline' }
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
        this.setData('avatarObj', {
          type: 'letter',
          name: 'Alex Morgan',
          size: 'medium',
          status: 'online'
        });
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onAvatarClick() {
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

export { AvatarComp };
