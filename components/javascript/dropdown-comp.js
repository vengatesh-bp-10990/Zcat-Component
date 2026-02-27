import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class DropdownComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  didConnect() {
    this._bindCustomiseEvents();
  }

  _getDefaultOptions(withIcons) {
    if (withIcons) {
      return [
        { "name": "India", "value": "india", "icon": true },
        { "name": "Pakistan", "value": "pakistan", "icon": true },
        { "name": "Gujarat", "value": "gujarat", "icon": true },
        { "name": "Mumbai", "value": "mumbai", "icon": true },
        { "name": "Jammu", "value": "jammu", "icon": true }
      ];
    }
    return [
      { "name": "India", "value": "india" },
      { "name": "Pakistan", "value": "pakistan" },
      { "name": "Gujarat", "value": "gujarat" },
      { "name": "Mumbai", "value": "mumbai" },
      { "name": "Jammu", "value": "jammu" }
    ];
  }

  _bindCustomiseEvents() {
    let comp = this;
    let node = this.$node;

    // Bind select dropdowns
    let variantSelect = node.querySelector('[data-action="changeDropdownVariant"]');
    let sizeSelect = node.querySelector('[data-action="changeDropdownSize"]');
    let stateSelect = node.querySelector('[data-action="changeDropdownState"]');
    let widthSelect = node.querySelector('[data-action="changeDropdownWidth"]');

    if (variantSelect) {
      variantSelect.addEventListener('change', function (e) {
        let ddObj = comp.getData('dropdownStyles');
        let val = e.target.value;
        if (val === 'multiple') {
          comp.$app.objectUtils(ddObj, 'add', 'variant', 'multiple');
          comp.$app.objectUtils(ddObj, 'add', 'selected', ['india', 'pakistan']);
          comp.$app.objectUtils(ddObj, 'add', 'multipleType', 'default');
          comp.$app.objectUtils(ddObj, 'add', 'menuListType', 'checkbox');
          comp._toggleMultiOptions(true);
        } else {
          comp.$app.objectUtils(ddObj, 'add', 'variant', val);
          comp.$app.objectUtils(ddObj, 'add', 'selected', 'india');
          comp.$app.objectUtils(ddObj, 'delete', 'multipleType');
          comp.$app.objectUtils(ddObj, 'delete', 'menuListType');
          comp._toggleMultiOptions(false);
        }
        comp.constructCodeSnippet();
      });
    }
    if (sizeSelect) {
      sizeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('dropdownStyles'), 'add', 'size', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (stateSelect) {
      stateSelect.addEventListener('change', function (e) {
        let val = e.target.value;
        let ddObj = comp.getData('dropdownStyles');
        if (val === 'disabled') {
          comp.$app.objectUtils(ddObj, 'add', 'disabled', true);
          comp.$app.objectUtils(ddObj, 'add', 'errorMessage', '');
        } else if (val === 'error') {
          comp.$app.objectUtils(ddObj, 'add', 'disabled', false);
          comp.$app.objectUtils(ddObj, 'add', 'errorMessage', 'This field is required');
        } else {
          comp.$app.objectUtils(ddObj, 'add', 'disabled', false);
          comp.$app.objectUtils(ddObj, 'add', 'errorMessage', '');
        }
        comp.constructCodeSnippet();
      });
    }
    if (widthSelect) {
      widthSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('dropdownStyles'), 'add', 'width', e.target.value);
        comp.constructCodeSnippet();
      });
    }

    // Bind multi-select specific controls
    let multiTypeSelect = node.querySelector('[data-action="changeMultipleType"]');
    let menuListTypeSelect = node.querySelector('[data-action="changeMenuListType"]');

    if (multiTypeSelect) {
      multiTypeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('dropdownStyles'), 'add', 'multipleType', e.target.value);
        comp.constructCodeSnippet();
      });
    }
    if (menuListTypeSelect) {
      menuListTypeSelect.addEventListener('change', function (e) {
        comp.$app.objectUtils(comp.getData('dropdownStyles'), 'add', 'menuListType', e.target.value);
        comp.constructCodeSnippet();
      });
    }
  }

  _toggleMultiOptions(show) {
    let rows = this.$node.querySelectorAll('[data-section="multipleOptions"]');
    if (rows) {
      rows.forEach(function(r) { r.style.display = show ? '' : 'none'; });
    }
  }

  data() {
    return {
      activeTab: prop('string', { default: 'slyte' }),
      pageTab: prop('string', { default: 'customize' }),
      self: prop('object', { default: this }),
      dropdownStyles: prop('object', {
        default: {
          "placeholder": "Select Option",
          "label": "Label",
          "selected": "india",
          "variant": "default",
          "size": "default",
          "disabled": false,
          "errorMessage": "",
          "isOptional": false,
          "width": "zcat-w200",
          "options": [
            { "name": "India", "value": "india" },
            { "name": "Pakistan", "value": "pakistan" },
            { "name": "Gujarat", "value": "gujarat" },
            { "name": "Mumbai", "value": "mumbai" },
            { "name": "Jammu", "value": "jammu" }
          ],
          "callback": { "name": "onDropdownSelect" }
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
      toggleLabelObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleLabel' } }
      }),
      toggleLabelInfoIconObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleLabelInfoIcon' } }
      }),
      toggleOptionalObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleOptional' } }
      }),
      toggleIconLeftObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleIconLeft' } }
      }),
      toggleMenuHeaderObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleMenuHeader' } }
      }),
      toggleMenuSearchObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleMenuSearch' } }
      }),
      toggleCreateNewObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleCreateNew' } }
      }),
      toggleMenuIconObj: prop('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleMenuIcon' } }
      }),
      jsCodeSnippet: prop('object', { default: { code: "" } }),
      slyteCodeSnippet: prop('object', { default: { code: "" } }),
      newSlyteCodeSnippet: prop('object', { default: { code: "" } }),
      htmlCodeSnippet: prop('object', { default: { code: "" } }),
      cssCodeSnippet: prop('object', { default: { code: "" } })
    };
  }

  constructCodeSnippet() {
    let ddObj = this.getData('dropdownStyles') || {};
    let defaults = {
      placeholder: 'Select Option', label: 'Label', selected: 'india',
      variant: 'default', size: 'default', disabled: false,
      errorMessage: '', isOptional: false, width: 'zcat-w200'
    };
    let hasIcon = ddObj.options && ddObj.options.length > 0 && ddObj.options[0].icon;

    // --- Build prop lines ---
    let propLines = [];
    propLines.push('    "placeholder": "' + (ddObj.placeholder || defaults.placeholder) + '"');
    if (ddObj.label) { propLines.push('    "label": "' + ddObj.label + '"'); }
    if (ddObj.infoIcon) { propLines.push('    "infoIcon": true'); }
    if (ddObj.isOptional) { propLines.push('    "isOptional": true'); }
    if (ddObj.selected) { propLines.push('    "selected": "' + ddObj.selected + '"'); }
    if (ddObj.icon) { propLines.push('    "icon": true'); }
    if (ddObj.variant && ddObj.variant !== defaults.variant) { propLines.push('    "variant": "' + ddObj.variant + '"'); }
    if (ddObj.size && ddObj.size !== defaults.size) { propLines.push('    "size": "' + ddObj.size + '"'); }
    if (ddObj.disabled === true) { propLines.push('    "disabled": true'); }
    if (ddObj.errorMessage) { propLines.push('    "errorMessage": "' + ddObj.errorMessage + '"'); }
    if (ddObj.width && ddObj.width !== defaults.width) { propLines.push('    "width": "' + ddObj.width + '"'); }
    if (ddObj.dropLabel) { propLines.push('    "dropLabel": "' + ddObj.dropLabel + '"'); }
    if (ddObj.isSearchable) { propLines.push('    "isSearchable": true'); }
    if (ddObj.createNewBtn) {
      propLines.push('    "createNewBtn": {\n      "label": "Create New",\n      "callback": { "name": "onCreateNew" }\n    }');
    }

    // Options with or without icons
    let optStrs = [];
    let opts = ddObj.options || [];
    for (let i = 0; i < opts.length; i++) {
      let o = opts[i];
      if (o.icon) {
        optStrs.push('      { "name": "' + o.name + '", "value": "' + o.value + '", "icon": true }');
      } else {
        optStrs.push('      { "name": "' + o.name + '", "value": "' + o.value + '" }');
      }
    }
    propLines.push('    "options": [\n' + optStrs.join(',\n') + '\n    ]');
    propLines.push('    "callback": { "name": "onSelect" }');

    // 1. sLyte tab
    let slyte_code = '<zcat-dropdown\n  self="{{self}}"\n  zcat-prop="{{dropdownStyles}}"\n></zcat-dropdown>';

    // 2. JS tab
    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    dropdownStyles: prop(\'object\', {\n      default: {\n' + propLines.join(',\n') + '\n      }\n    })\n  };\n}';

    // 3. sLyte New tab
    let newSlyteAttrs = [];
    newSlyteAttrs.push('  self="{{self}}"');
    newSlyteAttrs.push('  zcat-prop-placeholder="' + (ddObj.placeholder || defaults.placeholder) + '"');
    if (ddObj.label) { newSlyteAttrs.push('  zcat-prop-label="' + ddObj.label + '"'); }
    if (ddObj.infoIcon) { newSlyteAttrs.push('  zcat-prop-info-icon="true"'); }
    if (ddObj.isOptional) { newSlyteAttrs.push('  zcat-prop-is-optional="true"'); }
    if (ddObj.selected) { newSlyteAttrs.push('  zcat-prop-selected="' + ddObj.selected + '"'); }
    if (ddObj.icon) { newSlyteAttrs.push('  zcat-prop-icon="true"'); }
    if (ddObj.variant && ddObj.variant !== defaults.variant) { newSlyteAttrs.push('  zcat-prop-variant="' + ddObj.variant + '"'); }
    if (ddObj.size && ddObj.size !== defaults.size) { newSlyteAttrs.push('  zcat-prop-size="' + ddObj.size + '"'); }
    if (ddObj.disabled === true) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }
    if (ddObj.errorMessage) { newSlyteAttrs.push('  zcat-prop-error-message="' + ddObj.errorMessage + '"'); }
    if (ddObj.dropLabel) { newSlyteAttrs.push('  zcat-prop-drop-label="' + ddObj.dropLabel + '"'); }
    if (ddObj.isSearchable) { newSlyteAttrs.push('  zcat-prop-is-searchable="true"'); }
    newSlyteAttrs.push('  zcat-prop-callback-name="onSelect"');

    let methodsStr = '// Inline JS — callbacks via self\nstatic methods() {\n  return {\n    onSelect(item) {\n      console.log("Selected:", item.name);\n    }';
    if (ddObj.createNewBtn) {
      methodsStr += ',\n    onCreateNew() {\n      console.log("Create new clicked");\n    }';
    }
    methodsStr += '\n  };\n}';

    let newSlyte_code = '// Template\n<zcat-dropdown\n' + newSlyteAttrs.join('\n') + '\n></zcat-dropdown>\n\n' + methodsStr;

    // 4. HTML tab
    let wrapperClasses = ['zcat-dropdown-wrapper'];
    let variant = ddObj.variant || 'default';
    let size = ddObj.size || 'default';
    if (variant === 'ghost') { wrapperClasses.push('zcat-dropdown-ghost'); }
    if (size === 'small') { wrapperClasses.push('zcat-dropdown-sm'); }
    else if (size === 'extra-small') { wrapperClasses.push('zcat-dropdown-exsm'); }
    if (ddObj.disabled) { wrapperClasses.push('zcat-dropdown-disabled'); }
    if (ddObj.errorMessage) { wrapperClasses.push('zcat-dropdown-error'); }

    let htmlInner = '';
    if (ddObj.label) {
      htmlInner += '  <div class="zcat-dropdown-label-row">\n';
      htmlInner += '    <label class="zcat-dropdown-label">' + ddObj.label;
      if (ddObj.isOptional) { htmlInner += ' <span class="zcat-dropdown-optional">(Optional)</span>'; }
      htmlInner += '</label>\n';
      if (ddObj.infoIcon) {
        htmlInner += '    <svg class="zcat-dropdown-info-icon" width="12" height="12">...</svg>\n';
      }
      htmlInner += '  </div>\n';
    }
    htmlInner += '  <div class="zcat-dropdown-trigger-wrap">\n';
    if (ddObj.icon) {
      htmlInner += '    <svg class="zcat-dropdown-icon-left" width="16" height="16">...</svg>\n';
    }
    let triggerCls = 'zcat-dropdown-trigger' + (ddObj.icon ? ' has-icon-left' : '');
    htmlInner += '    <div class="' + triggerCls + '">\n';
    let val = ddObj.selected ? 'India' : '';
    if (val) {
      htmlInner += '      <span class="zcat-dropdown-value">' + val + '</span>\n';
    } else {
      htmlInner += '      <span class="zcat-dropdown-placeholder">' + (ddObj.placeholder || defaults.placeholder) + '</span>\n';
    }
    htmlInner += '      <span class="zcat-dropdown-arrow"></span>\n';
    htmlInner += '    </div>\n';
    htmlInner += '  </div>\n';

    // Menu HTML
    htmlInner += '  <!-- Menu (opens on click) -->\n';
    htmlInner += '  <div class="zcat-dropdown-menu">\n';
    if (ddObj.isSearchable) {
      htmlInner += '    <div class="zcat-dropdown-search-wrap">\n      <input class="zcat-dropdown-search-input" placeholder="Search"/>\n    </div>\n';
    }
    htmlInner += '    <div class="zcat-dropdown-menu-body">\n';
    if (ddObj.dropLabel) {
      htmlInner += '      <div class="zcat-dropdown-menu-header">' + ddObj.dropLabel + '</div>\n';
    }
    for (let i = 0; i < opts.length; i++) {
      let iconStr = hasIcon ? '<svg class="zcat-dropdown-item-icon">...</svg> ' : '';
      htmlInner += '      <div class="zcat-dropdown-item">' + iconStr + '<span>' + opts[i].name + '</span></div>\n';
    }
    htmlInner += '    </div>\n';
    if (ddObj.createNewBtn) {
      htmlInner += '    <div class="zcat-dropdown-footer">\n      <div class="zcat-dropdown-create-btn">+ Create New</div>\n    </div>\n';
    }
    htmlInner += '  </div>\n';

    if (ddObj.errorMessage) {
      htmlInner += '  <span class="zcat-dropdown-error-msg">' + ddObj.errorMessage + '</span>\n';
    }

    let html_code = '<div class="' + wrapperClasses.join(' ') + '">\n' + htmlInner + '</div>';

    // 5. CSS tab
    let css_code = '/* Dropdown Wrapper */\n';
    css_code += '.zcat-dropdown-wrapper {\n  position: relative;\n  display: inline-block;\n  width: 200px;\n  font-family: var(--zcat-font-family-primary);\n}\n\n';
    css_code += '/* Label */\n';
    css_code += '.zcat-dropdown-label {\n  font-size: 13px;\n  font-weight: 500;\n  color: var(--zcat-inputField-text-label);\n}\n\n';
    css_code += '/* Trigger */\n';
    css_code += '.zcat-dropdown-trigger {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 36px;\n  padding: 0 28px 0 8px;\n  background: var(--zcat-inputField-bg-default);\n  border: var(--zcat-inputField-border-default);\n  border-radius: 6px;\n  color: var(--zcat-inputField-text-active);\n  font-size: 14px;\n  cursor: pointer;\n}\n';
    css_code += '.zcat-dropdown-trigger:hover {\n  border: var(--zcat-inputField-border-hover);\n}\n';
    css_code += '.zcat-dropdown-trigger.active {\n  border: var(--zcat-inputField-border-active);\n}\n\n';

    if (variant === 'ghost') {
      css_code += '/* Ghost */\n';
      css_code += '.zcat-dropdown-ghost .zcat-dropdown-trigger {\n  background: transparent;\n  border-color: transparent;\n  color: var(--zcat-btn-ghost-text-primary-default);\n}\n';
      css_code += '.zcat-dropdown-ghost .zcat-dropdown-trigger:hover {\n  background: var(--zcat-btn-ghost-bg-primary-hover);\n}\n\n';
    }

    css_code += '/* Menu */\n';
    css_code += '.zcat-dropdown-menu {\n  position: absolute;\n  top: calc(100% + 2px);\n  left: 0; right: 0;\n  background: var(--zcat-body-bg);\n  border: 1px solid var(--zcat-body-border);\n  border-radius: 6px;\n  box-shadow: 0 4px 14px -4px rgba(0,0,0,0.12);\n}\n\n';
    css_code += '/* Items */\n';
    css_code += '.zcat-dropdown-item {\n  padding: 8px 28px 8px 4px;\n  font-size: 14px;\n  color: var(--zcat-body-text-primary);\n  cursor: pointer;\n  border-radius: 6px;\n}\n';
    css_code += '.zcat-dropdown-item:hover {\n  background: var(--zcat-btn-grey-bg-hover);\n}\n';
    css_code += '.zcat-dropdown-item.selected {\n  background: var(--zcat-btn-outline-bg-primaryHover);\n  color: var(--zcat-btn-fill-bg-primary-default);\n  font-weight: 500;\n}\n';

    if (ddObj.isSearchable) {
      css_code += '\n/* Search */\n';
      css_code += '.zcat-dropdown-search-input {\n  width: 100%;\n  height: 32px;\n  padding: 0 8px 0 30px;\n  border: var(--zcat-inputField-border-default);\n  border-radius: 6px;\n  font-size: 13px;\n}\n';
    }
    if (ddObj.createNewBtn) {
      css_code += '\n/* Create New Button */\n';
      css_code += '.zcat-dropdown-create-btn {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 4px;\n  font-size: 14px;\n  color: var(--zcat-btn-fill-bg-primary-default);\n  font-weight: 500;\n  cursor: pointer;\n}\n';
    }

    if (size !== 'default') {
      let sizeMap = {
        'small': { cls: 'zcat-dropdown-sm', h: '28px', fs: '13px', p: '0 22px 0 6px' },
        'extra-small': { cls: 'zcat-dropdown-exsm', h: '24px', fs: '12px', p: '0 22px 0 4px' }
      };
      let s = sizeMap[size];
      if (s) {
        css_code += '\n/* Size: ' + size + ' */\n';
        css_code += '.' + s.cls + ' .zcat-dropdown-trigger {\n  min-height: ' + s.h + ';\n  font-size: ' + s.fs + ';\n  padding: ' + s.p + ';\n}\n';
      }
    }

    if (ddObj.disabled) {
      css_code += '\n/* Disabled */\n';
      css_code += '.zcat-dropdown-disabled .zcat-dropdown-trigger {\n  background: var(--zcat-inputField-bg-disabled);\n  color: var(--zcat-inputField-text-disabled);\n  cursor: not-allowed;\n}\n';
    }
    if (ddObj.errorMessage) {
      css_code += '\n/* Error */\n';
      css_code += '.zcat-dropdown-error .zcat-dropdown-trigger {\n  border-color: var(--zcat-inputField-border-error);\n  background: var(--zcat-inputField-bg-error);\n}\n';
      css_code += '.zcat-dropdown-error-msg {\n  font-size: 12px;\n  color: var(--zcat-inputField-text-error);\n}\n';
    }

    if (ddObj.icon) {
      css_code += '\n/* Icon Left */\n';
      css_code += '.zcat-dropdown-icon-left {\n  position: absolute;\n  left: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n}\n';
      css_code += '.zcat-dropdown-trigger.has-icon-left {\n  padding-left: 30px;\n}\n';
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
        this.setData('dropdownStyles', {
          "placeholder": "Select Option",
          "label": "Label",
          "selected": "india",
          "variant": "default",
          "size": "default",
          "disabled": false,
          "errorMessage": "",
          "isOptional": false,
          "width": "zcat-w200",
          "options": [
            { "name": "India", "value": "india" },
            { "name": "Pakistan", "value": "pakistan" },
            { "name": "Gujarat", "value": "gujarat" },
            { "name": "Mumbai", "value": "mumbai" },
            { "name": "Jammu", "value": "jammu" }
          ],
          "callback": { "name": "onDropdownSelect" }
        });
        this._toggleMultiOptions(false);
        // Reset toggle prop objects
        this.$app.objectUtils(this.getData('toggleLabelObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleLabelInfoIconObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleOptionalObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleIconLeftObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleMenuHeaderObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleMenuSearchObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleCreateNewObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleMenuIconObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function(s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleLabel(checked) {
        this.$app.objectUtils(this.getData('dropdownStyles'), 'add', 'label', checked ? 'Label' : '');
        this.constructCodeSnippet();
      },
      onToggleLabelInfoIcon(checked) {
        let ddObj = this.getData('dropdownStyles');
        if (checked) {
          this.$app.objectUtils(ddObj, 'add', 'infoIcon', true);
        } else {
          this.$app.objectUtils(ddObj, 'delete', 'infoIcon');
        }
        this.constructCodeSnippet();
      },
      onToggleOptional(checked) {
        this.$app.objectUtils(this.getData('dropdownStyles'), 'add', 'isOptional', checked);
        this.constructCodeSnippet();
      },
      onToggleIconLeft(checked) {
        let ddObj = this.getData('dropdownStyles');
        if (checked) {
          this.$app.objectUtils(ddObj, 'add', 'icon', true);
        } else {
          this.$app.objectUtils(ddObj, 'delete', 'icon');
        }
        this.constructCodeSnippet();
      },
      onToggleMenuHeader(checked) {
        let ddObj = this.getData('dropdownStyles');
        if (checked) {
          this.$app.objectUtils(ddObj, 'add', 'dropLabel', 'Dropdown header');
        } else {
          this.$app.objectUtils(ddObj, 'delete', 'dropLabel');
        }
        this.constructCodeSnippet();
      },
      onToggleMenuSearch(checked) {
        let ddObj = this.getData('dropdownStyles');
        if (checked) {
          this.$app.objectUtils(ddObj, 'add', 'isSearchable', true);
        } else {
          this.$app.objectUtils(ddObj, 'delete', 'isSearchable');
        }
        this.constructCodeSnippet();
      },
      onToggleCreateNew(checked) {
        let ddObj = this.getData('dropdownStyles');
        if (checked) {
          this.$app.objectUtils(ddObj, 'add', 'createNewBtn', { label: 'Create New', callback: { name: 'dropdownCreateBtnClicked' } });
        } else {
          this.$app.objectUtils(ddObj, 'delete', 'createNewBtn');
        }
        this.constructCodeSnippet();
      },
      onToggleMenuIcon(checked) {
        let ddObj = this.getData('dropdownStyles');
        if (checked) {
          this.$app.objectUtils(ddObj, 'add', 'options', this._getDefaultOptions(true));
        } else {
          this.$app.objectUtils(ddObj, 'add', 'options', this._getDefaultOptions(false));
        }
        this.constructCodeSnippet();
      },
      onDropdownSelect(item) {
        console.log('Dropdown selected:', item);
        if (window.__zcatToast) {
          window.__zcatToast('Selected: ' + item.name, 'success');
        }
      },
      dropdownCreateBtnClicked() {
        console.log('Create new button clicked');
        if (window.__zcatToast) {
          window.__zcatToast('Create New clicked!', 'info');
        }
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

export { DropdownComp };
