"use strict";
(self["webpackChunkzcat_app"] = self["webpackChunkzcat_app"] || []).push([["components/javascript/label-comp"],{

/***/ 90606451:
/*!*********************************************!*\
  !*** ./components/javascript/label-comp.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelComp": () => (/* binding */ LabelComp)
/* harmony export */ });
/* harmony import */ var _node_modules_zcat_ui_components_javascript_zcat_icon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/zcat-ui/components/javascript/zcat-icon.js */ 35554276);
/* harmony import */ var _node_modules_zcat_ui_components_javascript_zcat_button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/zcat-ui/components/javascript/zcat-button.js */ 43360219);
/* harmony import */ var _node_modules_zcat_ui_components_javascript_zcat_toggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/zcat-ui/components/javascript/zcat-toggle.js */ 85465283);
/* harmony import */ var _node_modules_zcat_ui_components_javascript_zcat_label_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/zcat-ui/components/javascript/zcat-label.js */ 18903058);
/* harmony import */ var _node_modules_slyte_component_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/@slyte/component/index.js */ 93132498);
/* harmony import */ var _node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../node_modules/@slyte/core/index.js */ 60469700);








class LabelComp extends _node_modules_slyte_component_index_js__WEBPACK_IMPORTED_MODULE_4__.Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('labelObj') || {};

    // --- sLyte tab ---
    let slyte_code = '<zcat-label\n  zcat-prop="{{labelObj}}"\n></zcat-label>';

    // --- JS tab ---
    let propObj = {};
    if (obj.text) { propObj.text = obj.text; }
    if (obj.size && obj.size !== 'default') { propObj.size = obj.size; }
    if (obj.required) { propObj.required = true; }
    if (obj.isOptional) { propObj.isOptional = true; }
    if (obj.disabled) { propObj.disabled = true; }

    let js_code = 'data() {\n  return {\n    labelObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    // --- sLyte New tab ---
    let newSlyteAttrs = [];
    if (obj.text) { newSlyteAttrs.push('  zcat-prop-text="' + obj.text + '"'); }
    if (obj.size && obj.size !== 'default') { newSlyteAttrs.push('  zcat-prop-size="' + obj.size + '"'); }
    if (obj.required) { newSlyteAttrs.push('  zcat-prop-required="true"'); }
    if (obj.isOptional) { newSlyteAttrs.push('  zcat-prop-is-optional="true"'); }
    if (obj.disabled) { newSlyteAttrs.push('  zcat-prop-disabled="true"'); }

    let newSlyte_code = '// Template\n<zcat-label\n' + (newSlyteAttrs.length ? newSlyteAttrs.join('\n') + '\n' : '') + '></zcat-label>';

    // --- HTML tab ---
    let wrapClasses = ['zcat-label-wrap'];
    if (obj.size === 'small') { wrapClasses.push('zcat-label-sm'); }
    else if (obj.size === 'large') { wrapClasses.push('zcat-label-lg'); }
    if (obj.disabled) { wrapClasses.push('zcat-label-disabled'); }

    let labelClasses = ['zcat-label'];
    if (obj.required) { labelClasses.push('zcat-label-required'); }

    let html_code = '<div class="' + wrapClasses.join(' ') + '">\n';
    html_code += '  <label class="' + labelClasses.join(' ') + '">' + (obj.text || 'Label text');
    if (obj.isOptional) {
      html_code += '<span class="zcat-label-optional"> (Optional)</span>';
    }
    html_code += '</label>\n</div>';

    // --- CSS tab ---
    let css_code = '.zcat-label-wrap {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n';
    css_code += '.zcat-label {\n  color: var(--zcat-inputField-text-label);\n  font: var(--zcat-input-label-font-weight) var(--zcat-input-label-font) var(--zcat-font-family-primary);\n  margin: 0;\n}\n\n';
    css_code += '/* Required asterisk */\n.zcat-label-required::after {\n  content: \' *\';\n  color: var(--zcat-danger-1);\n}\n\n';
    css_code += '/* Optional text */\n.zcat-label-optional {\n  color: var(--zcat-text-secondary);\n  font-weight: 400;\n}\n\n';
    css_code += '/* Sizes */\n.zcat-label-sm .zcat-label { font-size: 11px; line-height: 14px; }\n.zcat-label-lg .zcat-label { font-size: 14px; line-height: 20px; }';

    this.setData('slyteCodeSnippet.code', slyte_code);
    this.setData('jsCodeSnippet.code', js_code);
    this.setData('newSlyteCodeSnippet.code', newSlyte_code);
    this.setData('htmlCodeSnippet.code', html_code);
    this.setData('cssCodeSnippet.code', css_code);
  }

  data(arg1) {
    return Object.assign(super.data({
      activeTab: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('string', { default: 'slyte' }),
      pageTab: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('string', { default: 'customize' }),
      self: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: this }),
      labelObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', {
        default: {
          text: 'Email address',
          size: 'default'
        }
      }),
      resetButtonObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', {
        default: {
          label: 'Reset',
          variant: 'outline',
          color: 'primary',
          size: 'extra-small',
          callback: { name: 'resetCustomization' }
        }
      }),
      toggleRequiredObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleRequired' } }
      }),
      toggleOptionalObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleOptional' } }
      }),
      toggleDisabledObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', {
        default: { checked: false, size: 'small', callback: { name: 'onToggleDisabled' } }
      }),
      // All Variants
      varDefaultObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Full name' } }),
      varRequiredObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Email address', required: true } }),
      varOptionalObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Phone number', isOptional: true } }),
      varDisabledObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Username', disabled: true } }),
      varSizeDefaultObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Default size label', size: 'default' } }),
      varSizeSmallObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Small size label', size: 'small' } }),
      varSizeLargeObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Large size label', size: 'large' } }),
      varInfoObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'Project name', infoIcon: { value: 'This is the project identifier shown in reports' } } }),
      varRequiredInfoObj: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { text: 'API key', required: true, infoIcon: { value: 'Your unique API access key' } } }),
      jsCodeSnippet: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { code: '' } }),
      slyteCodeSnippet: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { code: '' } }),
      newSlyteCodeSnippet: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { code: '' } }),
      htmlCodeSnippet: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { code: '' } }),
      cssCodeSnippet: (0,_node_modules_slyte_core_index_js__WEBPACK_IMPORTED_MODULE_5__.prop)('object', { default: { code: '' } })
    }), arg1);
  }

  static methods(arg1) {
    return Object.assign(super.methods({
      resetCustomization() {
        this.setData('labelObj', { text: 'Email address', size: 'default' });
        this.$app.objectUtils(this.getData('toggleRequiredObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleOptionalObj'), 'add', 'checked', false);
        this.$app.objectUtils(this.getData('toggleDisabledObj'), 'add', 'checked', false);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        let inputs = this.$node.querySelectorAll('.zcat-custom-input');
        if (inputs) { inputs.forEach(function (i) { i.value = 'Email address'; }); }
        this.constructCodeSnippet();
      },
      onToggleRequired(checked) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'required', checked);
        this.constructCodeSnippet();
      },
      onToggleOptional(checked) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'isOptional', checked);
        this.constructCodeSnippet();
      },
      onToggleDisabled(checked) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'disabled', checked);
        this.constructCodeSnippet();
      }
    }), arg1);
  }

  static actions(arg1) {
    return Object.assign(super.actions({
      changeLabelText(e) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'text', e.target.value);
        this.constructCodeSnippet();
      },
      changeLabelSize(e) {
        this.$app.objectUtils(this.getData('labelObj'), 'add', 'size', e.target.value);
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
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code);
          if (window.__zcatToast) { window.__zcatToast('Copied to clipboard!', 'success'); }
        }
      }
    }), arg1);
  }

  static observers(arg1) { return Object.assign(super.observers({}), arg1); }

  _() {
    _;
  }
}

LabelComp._template = "<template tag-name=\"label-comp\"> <div class=\"zcat-page-wrapper\"> <!-- Header --> <div class=\"zcat-page-header\"> <h1 class=\"zcat-page-title\">Label</h1> <p class=\"zcat-page-desc\">Labels are short descriptive text placed above or beside form fields to identify their purpose. They support required, optional, and disabled states.</p> <div class=\"zcat-page-tabs\"> <span class=\"zcat-page-tab {{expHandlers(expHandlers(pageTab,'===','customize'),'?:','active','')}}\" onclick=\"{{action('showCustomizeTab')}}\">Customize</span> <span class=\"zcat-page-tab {{expHandlers(expHandlers(pageTab,'===','variants'),'?:','active','')}}\" onclick=\"{{action('showVariantsTab')}}\">All Variants</span> <span class=\"zcat-page-tab\">Change Logs</span> </div> </div> <!-- Body: Customize Tab --> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(pageTab,'===','customize')}}\" is=\"case\" lc-id=\"lc_id_0\"><div class=\"zcat-page-body\"> <!-- Left: Preview + Code --> <div class=\"zcat-page-left\"> <h3 class=\"zcat-section-label\">preview</h3> <div class=\"zcat-preview-box\"> <div class=\"zcat-preview-area\"> <zcat-label zcat-prop=\"{{labelObj}}\"></zcat-label> </div> </div> <!-- Code Tabs --> <div class=\"zcat-code-tabs\"> <span class=\"zcat-code-tab {{expHandlers(expHandlers(activeTab,'===','slyte'),'?:','active','')}}\" onclick=\"{{action('showSlyteTab')}}\">sLyte</span> <span class=\"zcat-code-tab {{expHandlers(expHandlers(activeTab,'===','js'),'?:','active','')}}\" onclick=\"{{action('showJsTab')}}\">JS</span> <span class=\"zcat-code-tab {{expHandlers(expHandlers(activeTab,'===','newslyte'),'?:','active','')}}\" onclick=\"{{action('showNewSlyteTab')}}\">sLyte New</span> <span class=\"zcat-code-tab {{expHandlers(expHandlers(activeTab,'===','html'),'?:','active','')}}\" onclick=\"{{action('showHtmlTab')}}\">HTML</span> <span class=\"zcat-code-tab {{expHandlers(expHandlers(activeTab,'===','css'),'?:','active','')}}\" onclick=\"{{action('showCssTab')}}\">CSS</span> </div> <div class=\"zcat-code-panel\"> <div class=\"zcat-code-lines\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(activeTab,'===','slyte')}}\" is=\"case\" lc-id=\"lc_id_0\"><pre>{{slyteCodeSnippet.code}}</pre></template></template><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(activeTab,'===','js')}}\" is=\"case\" lc-id=\"lc_id_0\"><pre>{{jsCodeSnippet.code}}</pre></template></template><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(activeTab,'===','newslyte')}}\" is=\"case\" lc-id=\"lc_id_0\"><pre>{{newSlyteCodeSnippet.code}}</pre></template></template><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(activeTab,'===','html')}}\" is=\"case\" lc-id=\"lc_id_0\"><pre>{{htmlCodeSnippet.code}}</pre></template></template><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(activeTab,'===','css')}}\" is=\"case\" lc-id=\"lc_id_0\"><pre>{{cssCodeSnippet.code}}</pre></template></template></div> <span class=\"zcat-code-copy\" onclick=\"{{action('copyCode')}}\" title=\"Copy code\"> <zcat-icon name=\"copy\" width=\"16\" height=\"16\" stroke=\"currentColor\" stroke-width=\"1.3\"></zcat-icon> </span> </div> </div> <!-- Right: Customise --> <div class=\"zcat-page-right\"> <div class=\"zcat-custom-header\"> <h3 class=\"zcat-custom-title\">Customise</h3> <zcat-button self=\"{{self}}\" zcat-prop=\"{{resetButtonObj}}\"></zcat-button> </div> <div class=\"zcat-custom-body\"> <!-- Label text --> <div class=\"zcat-custom-row\"> <span class=\"zcat-custom-label\">Label text</span> <input class=\"zcat-custom-input\" type=\"text\" value=\"{{labelObj.text}}\" onchange=\"{{action('changeLabelText',event)}}\"> </div> <!-- Size --> <div class=\"zcat-custom-row\"> <span class=\"zcat-custom-label\">Size</span> <select onchange=\"{{action('changeLabelSize',event)}}\" class=\"zcat-custom-select\"> <option value=\"default\">Default</option> <option value=\"small\">Small</option> <option value=\"large\">Large</option> </select> </div> <!-- Required toggle --> <div class=\"zcat-custom-row\"> <span class=\"zcat-custom-label\">Required</span> <zcat-toggle self=\"{{self}}\" zcat-prop=\"{{toggleRequiredObj}}\"></zcat-toggle> </div> <!-- Optional toggle --> <div class=\"zcat-custom-row\"> <span class=\"zcat-custom-label\">Optional</span> <zcat-toggle self=\"{{self}}\" zcat-prop=\"{{toggleOptionalObj}}\"></zcat-toggle> </div> <!-- Disabled toggle --> <div class=\"zcat-custom-row\"> <span class=\"zcat-custom-label\">Disabled</span> <zcat-toggle self=\"{{self}}\" zcat-prop=\"{{toggleDisabledObj}}\"></zcat-toggle> </div> </div> </div> </div></template></template><!-- Body: All Variants Tab --> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(pageTab,'===','variants')}}\" is=\"case\" lc-id=\"lc_id_0\"><div class=\"zcat-page-left\" style=\"flex:1\"> <h3 class=\"zcat-section-label\" style=\"margin-top:4px\">States</h3> <div class=\"zcat-variants-grid\"> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Default</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varDefaultObj}}\"></zcat-label> </div> </div> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Required</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varRequiredObj}}\"></zcat-label> </div> </div> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Optional</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varOptionalObj}}\"></zcat-label> </div> </div> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Disabled</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varDisabledObj}}\"></zcat-label> </div> </div> </div> <h3 class=\"zcat-section-label\" style=\"margin-top:24px\">Sizes</h3> <div class=\"zcat-variants-grid\"> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Default</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varSizeDefaultObj}}\"></zcat-label> </div> </div> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Small</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varSizeSmallObj}}\"></zcat-label> </div> </div> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Large</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varSizeLargeObj}}\"></zcat-label> </div> </div> </div> <h3 class=\"zcat-section-label\" style=\"margin-top:24px\">With Info Icon</h3> <div class=\"zcat-variants-grid\"> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Default + Info</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varInfoObj}}\"></zcat-label> </div> </div> <div class=\"zcat-variant-card\"> <div class=\"zcat-variant-card-head\"><span class=\"zcat-variant-card-title\">Required + Info</span></div> <div class=\"zcat-variant-card-preview\"> <zcat-label zcat-prop=\"{{varRequiredInfoObj}}\"></zcat-label> </div> </div> </div> </div></template></template></div> </template>";;
LabelComp._dynamicNodes = [{"t":"a","p":[1,3,5,1]},{"t":"a","p":[1,3,5,3]},{"t":"s","p":[1,7],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0,3,3,1,1],"cn":"lc_id_0"},{"t":"cD","p":[0,3,3,1,1],"in":10,"sibl":[9],"cn":"lc_id_0"},{"t":"a","p":[0,3,7,1],"cn":"lc_id_0"},{"t":"a","p":[0,3,7,3],"cn":"lc_id_0"},{"t":"a","p":[0,3,7,5],"cn":"lc_id_0"},{"t":"a","p":[0,3,7,7],"cn":"lc_id_0"},{"t":"a","p":[0,3,7,9],"cn":"lc_id_0"},{"t":"s","p":[0,3,9,1,1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":9,"sibl":[8],"cn":"lc_id_0"},{"t":"s","p":[0,3,9,1,2],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":8,"sibl":[7],"cn":"lc_id_0"},{"t":"s","p":[0,3,9,1,3],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":7,"sibl":[6],"cn":"lc_id_0"},{"t":"s","p":[0,3,9,1,4],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":6,"sibl":[5],"cn":"lc_id_0"},{"t":"s","p":[0,3,9,1,5],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[0,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":5,"sibl":[4],"cn":"lc_id_0"},{"t":"a","p":[0,3,9,3],"cn":"lc_id_0"},{"t":"cD","p":[0,3,9,3,1],"in":4,"sibl":[3],"cn":"lc_id_0"},{"t":"a","p":[0,7,1,3],"cn":"lc_id_0"},{"t":"cD","p":[0,7,1,3],"in":3,"sibl":[2],"cn":"lc_id_0"},{"t":"a","p":[0,7,3,3,3],"cn":"lc_id_0"},{"t":"a","p":[0,7,3,7,3],"cn":"lc_id_0"},{"t":"a","p":[0,7,3,11,3],"cn":"lc_id_0"},{"t":"cD","p":[0,7,3,11,3],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[0,7,3,15,3],"cn":"lc_id_0"},{"t":"cD","p":[0,7,3,15,3],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"a","p":[0,7,3,19,3],"cn":"lc_id_0"},{"t":"cD","p":[0,7,3,19,3],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[10,4,3,2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"s","p":[1,10],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0,3,1,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,3,1,3,1],"in":8,"sibl":[7],"cn":"lc_id_0"},{"t":"a","p":[0,3,3,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,3,3,3,1],"in":7,"sibl":[6],"cn":"lc_id_0"},{"t":"a","p":[0,3,5,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,3,5,3,1],"in":6,"sibl":[5],"cn":"lc_id_0"},{"t":"a","p":[0,3,7,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,3,7,3,1],"in":5,"sibl":[4],"cn":"lc_id_0"},{"t":"a","p":[0,7,1,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,7,1,3,1],"in":4,"sibl":[3],"cn":"lc_id_0"},{"t":"a","p":[0,7,3,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,7,3,3,1],"in":3,"sibl":[2],"cn":"lc_id_0"},{"t":"a","p":[0,7,5,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,7,5,3,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[0,11,1,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,11,1,3,1],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"a","p":[0,11,3,3,1],"cn":"lc_id_0"},{"t":"cD","p":[0,11,3,3,1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[8,7,6,5,4,3,2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[1,0]}];;

LabelComp._observedAttributes = [
  "activeTab",
  "pageTab",
  "self",
  "labelObj",
  "resetButtonObj",
  "toggleRequiredObj",
  "toggleOptionalObj",
  "toggleDisabledObj",
  "varDefaultObj",
  "varRequiredObj",
  "varOptionalObj",
  "varDisabledObj",
  "varSizeDefaultObj",
  "varSizeSmallObj",
  "varSizeLargeObj",
  "varInfoObj",
  "varRequiredInfoObj",
  "jsCodeSnippet",
  "slyteCodeSnippet",
  "newSlyteCodeSnippet",
  "htmlCodeSnippet",
  "cssCodeSnippet"
];



LabelComp.register("label-comp", {
  hash: "LabelComp_6",
  refHash: "C_zcat-app_app_0"
});


/***/ })

}]);
//# sourceMappingURL=label-comp.js.map