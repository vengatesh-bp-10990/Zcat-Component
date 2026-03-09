import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class FileuploadComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('fileuploadObj') || {};

    let slyte_code = '<zcat-fileupload\n  self="{{self}}"\n  zcat-prop="{{fileuploadObj}}"\n></zcat-fileupload>';

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    fileuploadObj: prop("object", {\n      default: {\n        variant: "' + (obj.variant || 'primary') + '",\n        multiple: ' + (obj.multiple || false) + ',\n        label: "' + (obj.label || 'Upload Files') + '",\n        hint: "' + (obj.hint || 'PNG, JPG up to 5MB') + '"\n      }\n    })\n  };\n}';

    let html_code = '<div class="zcat-fileupload-wrapper">\n  <div class="zcat-fileupload-dropzone">\n    <p>Click to upload or drag and drop</p>\n  </div>\n</div>';

    let css_code = '.zcat-fileupload-dropzone { min-height: 140px; border: 2px dashed var(--zcat-inputField-border-default); border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; }';

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
      fileuploadObj: prop('object', {
        default: {
          variant: 'primary',
          multiple: true,
          label: 'Upload Files',
          hint: 'PNG, JPG, PDF up to 5MB',
          accept: '.png,.jpg,.jpeg,.pdf',
          maxFileSize: 5242880,
          callback: { name: 'onFilesChange' }
        }
      }),
      varPrimaryObj: prop('object', { default: { variant: 'primary', label: 'Upload Files', hint: 'PNG, JPG up to 5MB', accept: '.png,.jpg', multiple: true } }),
      varSecondaryObj: prop('object', { default: { variant: 'secondary', label: 'Attach Document', hint: 'PDF, DOCX up to 10MB', accept: '.pdf,.docx', multiple: false } }),
      varMultipleObj: prop('object', { default: { variant: 'primary', label: 'Upload Images', hint: 'Select multiple PNG, JPG files', accept: '.png,.jpg', multiple: true } }),
      varSingleObj: prop('object', { default: { variant: 'primary', label: 'Upload Avatar', hint: 'One image only, up to 2MB', accept: '.png,.jpg', multiple: false } }),
      varDisabledObj: prop('object', { default: { variant: 'primary', label: 'Upload (Disabled)', hint: 'Uploading is disabled', multiple: true, disabled: true } }),
      toggleLabelObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'toggleLabel' } }
      }),
      toggleMultipleObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'toggleMultiple' } }
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
      onFilesChange(files) {
        console.log('Files changed:', files);
      },
      toggleLabel(val) {
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'label', val ? 'Upload Files' : '');
        this.constructCodeSnippet();
      },
      toggleMultiple(val) {
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'multiple', val);
        this.constructCodeSnippet();
      },
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'variant', 'primary');
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'label', 'Upload Files');
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'multiple', true);
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'disabled', false);
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
      changeVariant(e) {
        this.$app.objectUtils(this.getData('fileuploadObj'), 'add', 'variant', e.target.value);
        this.constructCodeSnippet();
      },
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

export { FileuploadComp };
