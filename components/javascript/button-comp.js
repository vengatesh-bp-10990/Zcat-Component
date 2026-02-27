import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ButtonComp extends Component {
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

    // Bind select dropdowns
    let variantSelect = node.querySelector('[data-action="changeBtnVariant"]');
    let sizeSelect = node.querySelector('[data-action="changeBtnSize"]');
    let colorSelect = node.querySelector('[data-action="changeBtnColor"]');
    let stateSelect = node.querySelector('[data-action="changeBtnState"]');

    if (variantSelect) {
      variantSelect.addEventListener('change', function (e) {
        let val = e.target.value;
        comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'variant', val);
        if (val === 'grey') {
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'color', 'grey');
        }
        comp.constructCodeSnippet();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (colorSelect) {
      colorSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'color', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (stateSelect) {
      stateSelect.addEventListener('change', function (e) {
        let val = e.target.value;
        if (val === 'disabled') {
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'disabled', true);
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'loading', false);
        } else if (val === 'loading') {
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'loading', true);
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'disabled', false);
        } else {
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'loading', false);
          comp.$app.objectUtils(comp.getData('btnStyles'), 'add', 'disabled', false);
        }
        comp.constructCodeSnippet();
      });
    }

  }

  data() {
    return {
      activeTab: prop('string', { default: 'slyte' }),
      pageTab: prop('string', { default: 'customize' }),
      self: prop('object', { default: this }),
      btnStyles: prop('object', {
        default: {
          "label": "Button Text",
          "variant": "fill",
          "color": "primary",
          "size": "default",
          "disabled": false,
          "loading": false,
          "type": "",
          "callback": { "name": "" }
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
      toggleIconLeftObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleIconLeft' } }
      }),
      toggleIconRightObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleIconRight' } }
      }),
      toggleSplitObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleSplit' } }
      }),
      toggleOnlyIconObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleOnlyIcon' } }
      }),
      jsCodeSnippet: prop('object', { default: { code: "" } }),
      slyteCodeSnippet: prop('object', { default: { code: "" } }),
      newSlyteCodeSnippet: prop('object', { default: { code: "" } }),
      htmlCodeSnippet: prop('object', { default: { code: "" } }),
      cssCodeSnippet: prop('object', { default: { code: "" } })
    };
  }

  constructCodeSnippet() {
    let btnObj = this.getData('btnStyles') || {};
    let defaults = { label: 'Button Text', variant: 'fill', color: 'primary', size: 'default', disabled: false, loading: false, type: '' };

    // --- Build prop lines (shared) ---
    let propLines = [];
    if (btnObj.label) { propLines.push('    "label": "' + btnObj.label + '"'); }
    if (btnObj.variant && btnObj.variant !== defaults.variant) { propLines.push('    "variant": "' + btnObj.variant + '"'); }
    if (btnObj.color && btnObj.color !== defaults.color) { propLines.push('    "color": "' + btnObj.color + '"'); }
    if (btnObj.size && btnObj.size !== defaults.size) { propLines.push('    "size": "' + btnObj.size + '"'); }
    if (btnObj.disabled === true) { propLines.push('    "disabled": true'); }
    if (btnObj.loading === true) { propLines.push('    "loading": true'); }
    if (btnObj.type && btnObj.type !== defaults.type) { propLines.push('    "type": "' + btnObj.type + '"'); }
    if (btnObj.icon) { propLines.push('    "icon": { "position": "' + btnObj.icon.position + '", "name": "' + btnObj.icon.name + '" }'); }
    if (!btnObj.label && !propLines.length) { propLines.push('    "label": "' + defaults.label + '"'); }

    // 1. sLyte tab: template only
    let slyte_code = '<zcat-button\n  self="{{self}}"\n  zcat-prop="{{btnStyles}}"\n></zcat-button>';

    // 2. JS tab: data() code
    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    btnStyles: prop(\'object\', {\n      default: {\n' + propLines.join(',\n') + '\n      }\n    })\n  };\n}';

    // 3. sLyte New tab: attributes + self + inline callback
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    if (btnObj.label) { newSlyteAttrs.push('  zcat-prop-label="' + btnObj.label + '"'); }
    else if (!btnObj.icon) { newSlyteAttrs.push('  zcat-prop-label="' + defaults.label + '"'); }
    if (btnObj.variant && btnObj.variant !== defaults.variant) { newSlyteAttrs.push('  zcat-prop-variant="' + btnObj.variant + '"'); }
    if (btnObj.color && btnObj.color !== defaults.color) { newSlyteAttrs.push('  zcat-prop-color="' + btnObj.color + '"'); }
    if (btnObj.size && btnObj.size !== defaults.size) { newSlyteAttrs.push('  zcat-prop-size="' + btnObj.size + '"'); }
    if (btnObj.disabled === true) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    if (btnObj.loading === true) { newSlyteAttrs.push('  zcat-prop-loading="true"'); }
    if (btnObj.type && btnObj.type !== defaults.type) { newSlyteAttrs.push('  zcat-prop-type="' + btnObj.type + '"'); }
    if (btnObj.icon) { newSlyteAttrs.push('  zcat-prop-icon-position="' + btnObj.icon.position + '"'); newSlyteAttrs.push('  zcat-prop-icon-name="' + btnObj.icon.name + '"'); }
    newSlyteAttrs.push('  zcat-prop-callback-name="onBtnClick"');

    let newSlyte_code = '// Template\n<zcat-button\n' + newSlyteAttrs.join('\n') + '\n></zcat-button>\n\n'
      + '// Inline JS — callback via self\nstatic methods() {\n  return {\n    onBtnClick() {\n      console.log("Button clicked!");\n    }\n  };\n}';

    // 4. HTML tab: plain HTML
    let cssClasses = ['zcat-btn'];
    cssClasses.push(btnObj.variant || 'fill');
    cssClasses.push(btnObj.color || 'primary');
    let size = btnObj.size || 'default';
    if (size === 'small') { cssClasses.push('zcat-btn-sm'); }
    else if (size === 'extra-small') { cssClasses.push('zcat-btn-exsm'); }
    else if (size === 'large') { cssClasses.push('zcat-btn-lg'); }
    if (btnObj.loading) { cssClasses.push('loading'); }
    if (!btnObj.label && btnObj.icon) { cssClasses.push('icon-only'); }
    if (btnObj.type === 'split') { cssClasses.push('split-body'); }

    let htmlAttrs = '';
    if (btnObj.disabled) { htmlAttrs = ' disabled'; }

    let iconSvg = '';
    if (btnObj.icon) {
      iconSvg = '<svg class="zcat-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
    }

    let inner = '';
    if (btnObj.icon && btnObj.icon.position === 'left') { inner += iconSvg; }
    if (btnObj.label) { inner += '<span class="zcat-btn-text">' + btnObj.label + '</span>'; }
    if (btnObj.icon && btnObj.icon.position === 'right') { inner += iconSvg; }
    if (btnObj.loading) {
      inner += '\n  <span class="zcat-btn-loader-wrap"><span class="zcat-btn-loader"></span></span>';
    }

    let html_code = '<button class="' + cssClasses.join(' ') + '"' + htmlAttrs + '>\n  ' + inner + '\n</button>';

    if (btnObj.type === 'split') {
      html_code = '<div class="zcat-split-group">\n  ' + html_code + '\n  <button class="zcat-btn ' + (btnObj.variant || 'fill') + ' ' + (btnObj.color || 'primary') + ' split-arrow"' + htmlAttrs + '>\n    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="0,0 10,5 0,10"/></svg>\n  </button>\n</div>';
    }

    // 5. CSS tab: relevant CSS classes
    let css_code = '.zcat-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-weight: 500;\n  font-size: 14px;\n  padding: 0 14px;\n  height: 36px;\n  border-radius: 6px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s, color 0.15s;\n}\n';
    let v = btnObj.variant || 'fill';
    let c = btnObj.color || 'primary';
    if (v === 'fill') {
      css_code += '.zcat-btn.fill.' + c + ' {\n  background: var(--zcat-btn-fill-bg-' + c + '-default);\n  color: var(--zcat-btn-fill-text-default);\n  border: none;\n}\n';
      css_code += '.zcat-btn.fill.' + c + ':hover {\n  background: var(--zcat-btn-fill-bg-' + c + '-hover);\n}';
    } else if (v === 'outline') {
      css_code += '.zcat-btn.outline.' + c + ' {\n  background: transparent;\n  color: var(--zcat-btn-outline-text-' + c + '-default);\n  border-color: var(--zcat-btn-outline-border-' + c + '-default);\n}\n';
      css_code += '.zcat-btn.outline.' + c + ':hover {\n  background: var(--zcat-btn-outline-bg-' + c + 'Hover);\n}';
    } else if (v === 'ghost') {
      css_code += '.zcat-btn.ghost.' + c + ' {\n  background: transparent;\n  border: none;\n  color: var(--zcat-btn-ghost-text-' + c + '-default);\n}\n';
      css_code += '.zcat-btn.ghost.' + c + ':hover {\n  background: var(--zcat-btn-ghost-bg-' + c + '-hover);\n}';
    } else if (v === 'grey') {
      css_code += '.zcat-btn.grey {\n  background: var(--zcat-btn-grey-bg-default);\n  color: var(--zcat-btn-grey-text-default);\n  border-color: var(--zcat-btn-grey-border-default);\n}\n';
      css_code += '.zcat-btn.grey:hover {\n  background: var(--zcat-btn-grey-bg-hover);\n}';
    }
    if (size !== 'default') {
      let sizeMap = { 'small': { cls: 'zcat-btn-sm', h: '28px', fs: '13px', p: '0 10px' }, 'extra-small': { cls: 'zcat-btn-exsm', h: '24px', fs: '12px', p: '0 8px' }, 'large': { cls: 'zcat-btn-lg', h: '50px', fs: '16px', p: '0 20px' } };
      let s = sizeMap[size];
      if (s) {
        css_code += '\n.' + s.cls + ' {\n  height: ' + s.h + ';\n  font-size: ' + s.fs + ';\n  padding: ' + s.p + ';\n}';
      }
    }

    this.setData('slyteCodeSnippet.code', slyte_code);
    this.setData('jsCodeSnippet.code', js_code);
    this.setData('newSlyteCodeSnippet.code', newSlyte_code);
    this.setData('htmlCodeSnippet.code', html_code);
    this.setData('cssCodeSnippet.code', css_code);
  }

  static methods() {
    return {
      resetCustomization() {
        this.setData('btnStyles', {
          "label": "Button Text",
          "variant": "fill",
          "color": "primary",
          "size": "default",
          "disabled": false,
          "loading": false,
          "type": "",
          "callback": { "name": "" }
        });
        // Reset toggle prop objects
        this.$app.objectUtils(this.getData('toggleIconLeftObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleIconRightObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleSplitObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleOnlyIconObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function(s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleIconLeft(checked) {
        let btnObj = this.getData('btnStyles');
        if (checked) {
          this.$app.objectUtils(btnObj, 'add', 'icon', { position: 'left', name: 'plus', class: 'zcat-btn-icon' });
        } else {
          this.$app.objectUtils(btnObj, 'add', 'icon', null);
        }
        this.constructCodeSnippet();
      },
      onToggleIconRight(checked) {
        let btnObj = this.getData('btnStyles');
        if (checked) {
          this.$app.objectUtils(btnObj, 'add', 'icon', { position: 'right', name: 'plus', class: 'zcat-btn-icon' });
        } else {
          this.$app.objectUtils(btnObj, 'add', 'icon', null);
        }
        this.constructCodeSnippet();
      },
      onToggleSplit(checked) {
        let btnObj = this.getData('btnStyles');
        if (checked) {
          this.$app.objectUtils(btnObj, 'add', 'type', 'split');
        } else {
          this.$app.objectUtils(btnObj, 'add', 'type', '');
        }
        this.constructCodeSnippet();
      },
      onToggleOnlyIcon(checked) {
        let btnObj = this.getData('btnStyles');
        if (checked) {
          this.$app.objectUtils(btnObj, 'delete', 'label');
          this.$app.objectUtils(btnObj, 'add', 'icon', { position: 'right', name: 'plus', class: 'zcat-btn-icon' });
        } else {
          this.$app.objectUtils(btnObj, 'add', 'label', 'Button Text');
          this.$app.objectUtils(btnObj, 'add', 'icon', null);
        }
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
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code);
          if (window.__zcatToast) { window.__zcatToast('Copied to clipboard!', 'success'); }
        }
      }
    };
  }

  static observers() { return {}; }
}

export { ButtonComp };
