import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class AutocompleteComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('autocompleteObj') || {};

    let slyte_code = '<zcat-autocomplete\n  self="{{self}}"\n  zcat-prop="{{autocompleteObj}}"\n></zcat-autocomplete>';

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    autocompleteObj: prop("object", {\n      default: ' + JSON.stringify({
      placeholder: obj.placeholder || 'Search fruits...',
      label: obj.label || 'Autocomplete',
      options: (obj.options || []).slice(0, 3)
    }, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-autocomplete-wrapper">\n  <label class="zcat-autocomplete-label">' + (obj.label || 'Autocomplete') + '</label>\n  <input type="text" class="zcat-autocomplete-input" placeholder="' + (obj.placeholder || 'Search...') + '" />\n</div>';

    let css_code = '.zcat-autocomplete-wrapper { position: relative; width: 280px; }\n.zcat-autocomplete-input { width: 100%; height: 36px; padding: 0 32px; border: 1px solid var(--zcat-inputField-border-default); border-radius: 8px; }';

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
      autocompleteObj: prop('object', {
        default: {
          placeholder: 'Search fruits...',
          label: 'Autocomplete',
          options: [
            { name: 'Apple', value: 'apple' },
            { name: 'Apricot', value: 'apricot' },
            { name: 'Banana', value: 'banana' },
            { name: 'Blueberry', value: 'blueberry' },
            { name: 'Cherry', value: 'cherry' },
            { name: 'Coconut', value: 'coconut' },
            { name: 'Dragon Fruit', value: 'dragonfruit' },
            { name: 'Grape', value: 'grape' },
            { name: 'Kiwi', value: 'kiwi' },
            { name: 'Mango', value: 'mango' },
            { name: 'Orange', value: 'orange' },
            { name: 'Peach', value: 'peach' },
            { name: 'Strawberry', value: 'strawberry' }
          ],
          callback: { name: 'onAutocompleteSelect' }
        }
      }),
      varDefaultObj: prop('object', { default: { placeholder: 'Search fruits...', options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }, { name: 'Cherry', value: 'cherry' }, { name: 'Mango', value: 'mango' }] } }),
      varSmallObj: prop('object', { default: { placeholder: 'Search...', size: 'small', options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }, { name: 'Cherry', value: 'cherry' }, { name: 'Mango', value: 'mango' }] } }),
      varExsmObj: prop('object', { default: { placeholder: 'Search...', size: 'extra-small', options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }, { name: 'Cherry', value: 'cherry' }, { name: 'Mango', value: 'mango' }] } }),
      varLabelledObj: prop('object', { default: { placeholder: 'Search fruits...', label: 'Fruit', options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }, { name: 'Cherry', value: 'cherry' }, { name: 'Mango', value: 'mango' }] } }),
      varDisabledObj: prop('object', { default: { placeholder: 'Search...', label: 'Disabled', disabled: true, options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }] } }),
      varErrorObj: prop('object', { default: { placeholder: 'Search...', label: 'Fruit', errorMessage: 'Please select a fruit', options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }, { name: 'Cherry', value: 'cherry' }] } }),
      varCreateNewObj: prop('object', { default: { placeholder: 'Search or create...', label: 'Tag', createNew: true, createNewLabel: 'Create', options: [{ name: 'Apple', value: 'apple' }, { name: 'Banana', value: 'banana' }, { name: 'Cherry', value: 'cherry' }] } }),
      toggleLabelObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'toggleLabel' } }
      }),
      toggleDisabledObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleDisabled' } }
      }),
      toggleErrorObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleError' } }
      }),
      toggleCreateNewObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'toggleCreateNew' } }
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
      onAutocompleteSelect(item) {
        console.log('Autocomplete selected:', item);
      },
      toggleLabel(val) {
        if (val) {
          this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'label', 'Autocomplete');
        } else {
          this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'label', '');
        }
        this.constructCodeSnippet();
      },
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      toggleError(val) {
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'errorMessage', val ? 'This field is required' : '');
        this.constructCodeSnippet();
      },
      toggleCreateNew(val) {
        if (val) {
          this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'createNewBtn', { label: 'Create New Fruit' });
        } else {
          this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'createNewBtn', undefined);
        }
        this.constructCodeSnippet();
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'label', 'Autocomplete');
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'disabled', false);
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'errorMessage', '');
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'size', 'default');
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'createNewBtn', undefined);
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
      changeSize(e) {
        this.$app.objectUtils(this.getData('autocompleteObj'), 'add', 'size', e.target.value);
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

export { AutocompleteComp };
