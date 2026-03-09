import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class AttentionComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let attentionObj = this.getData('attentionObj') || {};
    let type = attentionObj.type || 'default';

    // --- sLyte tab ---
    let slyte_code = '<zcat-attention\n  self="{{self}}"\n  zcat-prop="{{attentionObj}}"\n></zcat-attention>';

    // --- JS tab ---
    let propObj = { name: attentionObj.name || 'Notice heading' };
    if (type !== 'default') { propObj.type = type; }
    if (attentionObj.desc) { propObj.desc = attentionObj.desc; }
    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    attentionObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    newSlyteAttrs.push('  zcat-prop-name="' + (attentionObj.name || 'Notice heading') + '"');
    if (type !== 'default') { newSlyteAttrs.push('  zcat-prop-type="' + type + '"'); }
    if (attentionObj.desc) { newSlyteAttrs.push('  zcat-prop-desc="' + attentionObj.desc + '"'); }
    let newSlyte_code = '// Template\n<zcat-attention\n' + newSlyteAttrs.join('\n') + '\n></zcat-attention>';

    // --- HTML tab ---
    let containerClass = 'zcat-attention-container zcat-atten-' + type;
    let headClass = attentionObj.desc ? 'zcat-attention-head zcat-attention-head-bold' : 'zcat-attention-head';
    let descHtml = attentionObj.desc ? '\n    <span class="zcat-attention-desc">' + attentionObj.desc + '</span>' : '';

    let iconName = 'info';
    if (type === 'success') { iconName = 'alert-success'; }
    else if (type === 'danger') { iconName = 'alert-danger'; }
    else if (type === 'warning') { iconName = 'alert-warning'; }

    let html_code = '<div class="' + containerClass + '">\n'
      + '  <div class="zcat-attention-inner">\n'
      + '    <div class="zcat-attention-icon-wrap">\n'
      + '      <zcat-icon name="' + iconName + '" width="14" stroke="currentColor" stroke-width="1.3"></zcat-icon>\n'
      + '    </div>\n'
      + '    <div class="zcat-attention-text">\n'
      + '      <span class="' + headClass + '">' + (attentionObj.name || 'Notice heading') + '</span>'
      + descHtml + '\n'
      + '    </div>\n'
      + '  </div>\n'
      + '</div>';

    // --- CSS tab ---
    let tokenPrefix = type === 'default' ? '--zcat-attention-default' : '--zcat-alerts-' + type;
    let css_code = '.' + containerClass.split(' ').pop() + ' {\n  border: 1px solid var(' + tokenPrefix + '-border);\n  background: var(' + tokenPrefix + '-bg);\n}\n\n';
    css_code += '.zcat-attention-head {\n  font: 400 14px/20px var(--zcat-font-family-primary);\n  color: var(' + tokenPrefix + '-text-primary);\n}\n\n';
    css_code += '.zcat-attention-desc {\n  font: 400 13px/18px var(--zcat-font-family-primary);\n  color: var(' + tokenPrefix + '-text-secondary);\n}';

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
      attentionObj: prop('object', {
        default: {
          name: 'This field is required before submission.',
          type: 'default'
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
      toggleDescObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDesc' } }
      }),
      // --- Type Variant objects ---
      variantDefaultObj: prop('object', {
        default: { type: 'default', name: 'Default notice — general information.', desc: 'This is a neutral attention banner for general guidance.' }
      }),
      variantInfoObj: prop('object', {
        default: { type: 'info', name: 'Info notice — helpful tip.', desc: 'You can use keyboard shortcuts to speed up your workflow.' }
      }),
      variantSuccessObj: prop('object', {
        default: { type: 'success', name: 'Success notice — action completed.', desc: 'Your changes have been saved successfully.' }
      }),
      variantDangerObj: prop('object', {
        default: { type: 'danger', name: 'Danger notice — critical alert.', desc: 'This action is irreversible. Please proceed with caution.' }
      }),
      variantWarningObj: prop('object', {
        default: { type: 'warning', name: 'Warning notice — heads up.', desc: 'Your session will expire in 5 minutes. Save your work.' }
      }),
      // --- Content Variant objects ---
      variantHeadOnlyObj: prop('object', {
        default: { name: 'This field is required before submission.' }
      }),
      variantWithDescObj: prop('object', {
        default: { name: 'Important Notice', desc: 'Please review the changes carefully before saving. Unsaved progress will be lost.' }
      }),
      variantLongObj: prop('object', {
        default: { type: 'info', name: 'System Maintenance', desc: 'The platform will undergo scheduled maintenance on Saturday from 2:00 AM to 6:00 AM UTC. During this time, some features may be unavailable.' }
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
        this.setData('attentionObj', {
          name: 'This field is required before submission.',
          type: 'default'
        });
        this.$app.objectUtils(this.getData('toggleDescObj'), 'add', 'checked', false);
        let typeSelect = this.$node.querySelector('[data-action="changeAttentionType"]');
        if (typeSelect) { typeSelect.selectedIndex = 0; }
        let headingInput = this.$node.querySelector('[data-action="changeAttentionHeading"]');
        if (headingInput) { headingInput.value = 'This field is required before submission.'; }
        this.constructCodeSnippet();
      },
      onToggleDesc(checked) {
        let attentionObj = this.getData('attentionObj');
        if (checked) {
          this.$app.objectUtils(attentionObj, 'add', 'desc', 'Additional context or details about the notice go here.');
        } else {
          this.$app.objectUtils(attentionObj, 'add', 'desc', '');
        }
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
      changeAttentionType(e) {
        this.$app.objectUtils(this.getData('attentionObj'), 'add', 'type', e.target.value);
        this.constructCodeSnippet();
      },
      changeAttentionHeading(e) {
        this.$app.objectUtils(this.getData('attentionObj'), 'add', 'name', e.target.value);
        this.constructCodeSnippet();
      },
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

export { AttentionComp };
