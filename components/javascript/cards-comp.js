import { Component } from "@slyte/component";
import { prop } from '@slyte/core';

class CardsComp extends Component {
  constructor() {
    super();
  }

  init() {
    this.constructCodeSnippet();
  }

  constructCodeSnippet() {
    let obj = this.getData('cardsObj') || {};

    let slyte_code = '<zcat-cards\n  self="{{self}}"\n  zcat-prop="{{cardsObj}}"\n></zcat-cards>';

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    cardsObj: prop("object", {\n      default: {\n        type: "' + (obj.type || 'default') + '",\n        bgVariant: "' + (obj.bgVariant || 'primary') + '",\n        cards: [\n          { title: "Option A", value: "a", description: "Description" },\n          { title: "Option B", value: "b", description: "Description" }\n        ]\n      }\n    })\n  };\n}';

    let html_code = '<div class="zcat-cards-wrapper zcat-cards-horizontal">\n  <div class="zcat-card primary">\n    <div class="zcat-card-body">\n      <div class="zcat-card-title">Option A</div>\n      <div class="zcat-card-desc">Description text</div>\n    </div>\n  </div>\n</div>';

    let css_code = '.zcat-card { padding: 16px; border-radius: 10px; border: 1px solid var(--zcat-card-border-default); cursor: pointer; }\n.zcat-card:hover { border-color: var(--zcat-card-border-hover); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }';

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
      cardsObj: prop('object', {
        default: {
          type: 'single_sel',
          bgVariant: 'primary',
          cards: [
            { title: 'Starter Plan', value: 'starter', description: 'For individuals getting started', icon: 'zap' },
            { title: 'Pro Plan', value: 'pro', description: 'For growing teams', icon: 'star' },
            { title: 'Enterprise', value: 'enterprise', description: 'For large organizations', icon: 'shield' }
          ],
          selected: 'pro',
          callback: { name: 'onCardSelect' }
        }
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
      onCardSelect(item) {
        console.log('Card selected:', item);
      },
      toggleDisabled(val) {
        this.$app.objectUtils(this.getData('cardsObj'), 'add', 'disabled', val);
        this.constructCodeSnippet();
      },
      resetCustomise() {
        this.$app.objectUtils(this.getData('cardsObj'), 'add', 'type', 'single_sel');
        this.$app.objectUtils(this.getData('cardsObj'), 'add', 'bgVariant', 'primary');
        this.$app.objectUtils(this.getData('cardsObj'), 'add', 'disabled', false);
        this.constructCodeSnippet();
      }
    };
  }

  static actions() {
    return {
      changeType(e) {
        this.$app.objectUtils(this.getData('cardsObj'), 'add', 'type', e.target.value);
        this.constructCodeSnippet();
      },
      changeBg(e) {
        this.$app.objectUtils(this.getData('cardsObj'), 'add', 'bgVariant', e.target.value);
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

export { CardsComp };
