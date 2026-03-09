import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class PopoverComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let popoverObj = this.getData('popoverObj') || {};

    let slyte_code = '<zcat-popover\n  self="{{self}}"\n  zcat-prop="{{popoverObj}}"\n></zcat-popover>';

    let propObj = {};
    propObj.position = popoverObj.position || 'bottom';
    if (popoverObj.isSearchable) propObj.isSearchable = true;
    if (popoverObj.heading) propObj.heading = popoverObj.heading;
    propObj.options = [
      { name: 'Edit', icon: 'edit' },
      { name: 'Duplicate', icon: 'copy' },
      { name: 'Delete', icon: 'trash' }
    ];
    propObj.callback = { name: 'onPopoverSelect' };

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    popoverObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-popover-wrapper">\n';
    html_code += '  <div class="zcat-popover-trigger">\n';
    html_code += '    <button class="zcat-popover-default-trigger">⋮</button>\n';
    html_code += '  </div>\n';
    html_code += '  <div class="zcat-popover-menu zcat-popover-' + (popoverObj.position || 'bottom') + '">\n';
    html_code += '    <div class="zcat-popover-options">\n';
    html_code += '      <div class="zcat-popover-item">Edit</div>\n';
    html_code += '      <div class="zcat-popover-item">Duplicate</div>\n';
    html_code += '      <div class="zcat-popover-item">Delete</div>\n';
    html_code += '    </div>\n';
    html_code += '  </div>\n';
    html_code += '</div>';

    let css_code = '.zcat-popover-wrapper {\n  position: relative;\n  display: inline-block;\n}\n\n';
    css_code += '.zcat-popover-menu {\n  position: absolute;\n  background: var(--zcat-popover-bg);\n  border: 1px solid var(--zcat-popover-border);\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n  padding: 4px 0;\n  min-width: 160px;\n  z-index: 100;\n}\n\n';
    css_code += '.zcat-popover-item {\n  padding: 8px 12px;\n  cursor: pointer;\n  font-size: 13px;\n}\n\n';
    css_code += '.zcat-popover-item:hover {\n  background: var(--zcat-popover-item-bg-hover);\n}';

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
      popoverObj: prop('object', {
        default: {
          position: 'bottom',
          heading: 'Actions',
          isSearchable: false,
          trigger: { label: 'Open Menu', variant: 'outline', color: 'primary', size: 'small' },
          options: [
            { name: 'Edit', icon: 'edit' },
            { name: 'Duplicate', icon: 'copy' },
            { name: 'Share', icon: 'share' },
            { name: 'Archive', icon: 'archive' },
            { name: 'Delete', icon: 'trash' }
          ],
          callback: { name: 'onPopoverSelect' }
        }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'extra-small', callback: { name: 'resetCustomization' } }
      }),
      toggleSearchObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleSearch' } }
      }),
      toggleHeadingObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleHeading' } }
      }),
      // Variant demos
      variantBasicObj: prop('object', {
        default: {
          position: 'bottom',
          trigger: { label: 'Basic Menu', variant: 'outline', color: 'primary', size: 'small' },
          options: [
            { name: 'Option A' },
            { name: 'Option B' },
            { name: 'Option C' }
          ],
          callback: { name: 'onPopoverSelect' }
        }
      }),
      variantIconObj: prop('object', {
        default: {
          position: 'bottom',
          heading: 'File Actions',
          trigger: { label: 'With Icons', variant: 'outline', color: 'primary', size: 'small' },
          options: [
            { name: 'New File', icon: 'file-plus' },
            { name: 'Open', icon: 'folder' },
            { name: 'Save', icon: 'save' },
            { name: 'Export', icon: 'download' }
          ],
          callback: { name: 'onPopoverSelect' }
        }
      }),
      variantSearchObj: prop('object', {
        default: {
          position: 'bottom',
          isSearchable: true,
          heading: 'Assign To',
          width: '220px',
          trigger: { label: 'Searchable', variant: 'outline', color: 'primary', size: 'small' },
          options: [
            { name: 'Alice Johnson', icon: 'user' },
            { name: 'Bob Smith', icon: 'user' },
            { name: 'Carol White', icon: 'user' },
            { name: 'Dave Brown', icon: 'user' },
            { name: 'Eve Davis', icon: 'user' }
          ],
          callback: { name: 'onPopoverSelect' }
        }
      }),
      variantNestedObj: prop('object', {
        default: {
          position: 'bottom',
          trigger: { label: 'Nested Menu', variant: 'outline', color: 'primary', size: 'small' },
          options: [
            { name: 'Cut', icon: 'scissors' },
            { name: 'Copy', icon: 'copy' },
            { name: 'Paste', icon: 'clipboard' },
            { name: 'More', icon: 'chevron-right', nestedPopover: true, options: [
              { name: 'Import' },
              { name: 'Export' },
              { name: 'Print' }
            ]}
          ],
          callback: { name: 'onPopoverSelect' }
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
        this.setData('popoverObj', {
          position: 'bottom',
          heading: 'Actions',
          isSearchable: false,
          trigger: { label: 'Open Menu', variant: 'outline', color: 'primary', size: 'small' },
          options: [
            { name: 'Edit', icon: 'edit' },
            { name: 'Duplicate', icon: 'copy' },
            { name: 'Share', icon: 'share' },
            { name: 'Archive', icon: 'archive' },
            { name: 'Delete', icon: 'trash' }
          ],
          callback: { name: 'onPopoverSelect' }
        });
        this.$app.objectUtils(this.getData('toggleSearchObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleHeadingObj'), 'add', 'checked', true);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleSearch(checked) {
        this.$app.objectUtils(this.getData('popoverObj'), 'add', 'isSearchable', checked);
        this.constructCodeSnippet();
      },
      onToggleHeading(checked) {
        this.$app.objectUtils(this.getData('popoverObj'), 'add', 'heading', checked ? 'Actions' : '');
        this.constructCodeSnippet();
      },
      onPopoverSelect(item) {
        // demo callback
      }
    };
  }

  static actions() {
    return {
      changePopoverPosition(e) {
        this.$app.objectUtils(this.getData('popoverObj'), 'add', 'position', e.target.value);
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

export { PopoverComp };
