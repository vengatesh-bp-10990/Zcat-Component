import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class InlineeditComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('inlineeditObj') || {};
    let value = obj.value || 'Rename Headings & Text';

    let slyte_code = `<!-- Inline Edit -->\n<div class="zcat-inline-edit-wrapper">\n  <span class="zcat-inline-edit-text">{{value}}</span>\n  <button class="zcat-inline-edit-trigger" onclick="{{action('startEdit')}}">\n    <zcat-icon name="edit-pencil" width="14" height="14" stroke="currentColor" stroke-width="1.3"></zcat-icon>\n  </button>\n</div>`;

    let js_code = `data() {\n  return {\n    value: '${value}',\n    isEditing: false,\n    editValue: '${value}'\n  };\n}\n\nstatic methods() {\n  return {\n    startEdit() {\n      this.setData('editValue', this.getData('value'));\n      this.setData('isEditing', true);\n    },\n    confirmEdit() {\n      this.setData('value', this.getData('editValue'));\n      this.setData('isEditing', false);\n    },\n    cancelEdit() {\n      this.setData('isEditing', false);\n    }\n  };\n}`;

    let html_code = `<div class="zcat-inline-edit-wrapper">\n  <!-- Display Mode -->\n  <div lyte-if="{{!isEditing}}" class="zcat-inline-display">\n    <span class="zcat-inline-text">{{value}}</span>\n    <button class="zcat-inline-edit-btn" onclick="{{method('startEdit')}}">\n      <zcat-icon name="edit-pencil" width="14" height="14" stroke="currentColor" stroke-width="1.3"></zcat-icon>\n    </button>\n  </div>\n  <!-- Edit Mode -->\n  <div lyte-else class="zcat-inline-editing">\n    <zcat-input zcat-prop="{{editInputObj}}"></zcat-input>\n    <button class="zcat-inline-confirm-btn" onclick="{{method('confirmEdit')}}">\n      <zcat-icon name="tick" width="14" height="14" stroke="currentColor" stroke-width="1.3"></zcat-icon>\n    </button>\n    <button class="zcat-inline-cancel-btn" onclick="{{method('cancelEdit')}}">\n      <zcat-icon name="close" width="14" height="14" stroke="currentColor" stroke-width="1.3"></zcat-icon>\n    </button>\n  </div>\n</div>`;

    let css_code = `.zcat-inline-display { display: flex; align-items: center; gap: 6px; }\n.zcat-inline-edit-btn { background: none; border: none; cursor: pointer; padding: 2px; opacity: 0; transition: opacity 0.15s; }\n.zcat-inline-display:hover .zcat-inline-edit-btn { opacity: 1; }\n.zcat-inline-editing { display: flex; align-items: center; gap: 6px; }\n.zcat-inline-confirm-btn, .zcat-inline-cancel-btn { background: none; border: 1px solid var(--zcat-inputField-border-default); border-radius: 4px; cursor: pointer; padding: 4px; display: flex; align-items: center; }\n.zcat-inline-confirm-btn:hover { background: var(--zcat-btn-primary-bg-default); }\n.zcat-inline-cancel-btn:hover { background: var(--zcat-inputField-bg-hover); }`;

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
      isEditing: prop('boolean', { default: false }),
      editValue: prop('string', { default: 'Rename Headings & Text' }),
      inlineeditObj: prop('object', {
        default: {
          value: 'Rename Headings & Text'
        }
      }),
      editInputObj: prop('object', {
        default: {
          placeholder: 'Enter text...',
          size: 'extra-small',
          width: '220px',
          key: 'inlineEditVal',
          callback: { name: 'onEditChange' }
        }
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
      startEdit() {
        this.setData('editValue', this.getData('inlineeditObj').value || '');
        this.setData('isEditing', true);
      },
      confirmEdit() {
        let newVal = this.getData('editValue');
        this.$app.objectUtils(this.getData('inlineeditObj'), 'add', 'value', newVal);
        this.setData('isEditing', false);
        this.constructCodeSnippet();
      },
      cancelEdit() {
        this.setData('isEditing', false);
      },
      onEditChange(val) {
        this.setData('editValue', val);
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('inlineeditObj'), 'add', 'value', 'Rename Headings & Text');
        this.setData('editValue', 'Rename Headings & Text');
        this.setData('isEditing', false);
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

export { InlineeditComp };
