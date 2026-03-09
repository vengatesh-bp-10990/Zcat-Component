import { Component } from '@slyte/component';
import { prop } from '@slyte/core';
import '@zoho/lyte-ui-component/components/javascript/lyte-tooltip';
import '@zoho/lyte-ui-component/I18n/en_US.js';

class TooltipComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let placement = this.getData('placement') || '';
    let text = this.getData('tooltipText') || 'Tooltip text';

    let configAttr = placement ? ` lt-prop-tooltip-config='{"position":"${placement}"}'` : '';
    let slyte_code = `<div lt-prop-title="${text}"${configAttr}>\n  <!-- trigger element -->\n</div>`;

    let js_code = `// Import lyte-tooltip once in your app:\nimport '@zoho/lyte-ui-component/components/javascript/lyte-tooltip';\n\n// Then any element with lt-prop-title will show a tooltip on hover.\n// Use lt-prop-tooltip-config='{"position":"top"}' to control placement.`;

    this.setData('slyteCodeSnippet', { code: slyte_code });
    this.setData('jsCodeSnippet', { code: js_code });
  }

  data() {
    return {
      self: prop('object', { default: this }),
      pageTab: prop('string', { default: 'customize' }),
      activeTab: prop('string', { default: 'slyte' }),
      placement: prop('string', { default: '' }),
      tooltipText: prop('string', { default: 'This is a helpful tooltip' }),
      demoTooltipConfig: prop('string', { default: '{}' }),
      resetButtonObj: prop('object', {
        default: {
          "label": "Reset",
          "variant": "outline",
          "color": "primary",
          "size": "extra-small",
          "callback": { "name": "resetCustomization" }
        }
      }),
      slyteCodeSnippet: prop('object', { default: { code: '' } }),
      jsCodeSnippet: prop('object', { default: { code: '' } })
    };
  }

  static methods() {
    return {
      resetCustomization() {
        this.setData('placement', '');
        this.setData('tooltipText', 'This is a helpful tooltip');
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
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
      changePlacement(event) {
        let val = event.target.value;
        this.setData('placement', val);
        this.setData('demoTooltipConfig', val ? JSON.stringify({position: val}) : '{}');
        this.constructCodeSnippet();
      },
      copyCode() {
        let activeTab = this.getData('activeTab');
        let key = activeTab + 'CodeSnippet';
        let code = (this.getData(key) || {}).code || '';
        navigator.clipboard.writeText(code);
      }
    };
  }

  static observers() {
    return {};
  }
}

export { TooltipComp };
