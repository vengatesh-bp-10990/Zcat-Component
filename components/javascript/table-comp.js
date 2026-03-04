import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class TableComp extends Component {
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

    let variantSelect = node.querySelector('[data-action="changeTableVariant"]');
    if (variantSelect) {
      variantSelect.addEventListener('change', function (e) {
        let val = e.target.value;
        let tableObj = comp.getData('tableObj');
        comp.$app.objectUtils(tableObj, 'add', 'striped', val === 'striped');
        comp.$app.objectUtils(tableObj, 'add', 'bordered', val === 'bordered');
        comp.$app.objectUtils(tableObj, 'add', 'compact', val === 'compact');
        comp.constructCodeSnippet();
      });
    }
  }

  constructCodeSnippet() {
    let tableObj = this.getData('tableObj') || {};

    let slyte_code = '<zcat-table\n  self="{{self}}"\n  zcat-prop="{{tableObj}}"\n></zcat-table>';

    let propObj = {};
    if (tableObj.checkbox) propObj.checkbox = true;
    if (tableObj.striped) propObj.striped = true;
    if (tableObj.bordered) propObj.bordered = true;
    if (tableObj.compact) propObj.compact = true;
    if (tableObj.moreOptions) propObj.moreOptions = true;
    propObj.header = [
      { label: 'Name', value: 'name', sortable: true },
      { label: 'Email', value: 'email' },
      { label: 'Status', value: 'status', field_type: 'status' }
    ];
    propObj.body = [
      { name: 'John Doe', email: 'john@example.com', status: 'Active', status_status: 'success' },
      { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', status_status: 'warning' }
    ];

    let js_code = 'data() {\n  return {\n    self: prop(\'object\', { default: this }),\n    tableObj: prop(\'object\', {\n      default: ' + JSON.stringify(propObj, null, 6) + '\n    })\n  };\n}';

    let html_code = '<div class="zcat-table-wrapper' + (tableObj.striped ? ' zcat-table-striped' : '') + (tableObj.bordered ? ' zcat-table-bordered' : '') + (tableObj.compact ? ' zcat-table-compact' : '') + '">\n';
    html_code += '  <table class="zcat-table">\n';
    html_code += '    <thead class="zcat-table-head">\n';
    html_code += '      <tr>\n';
    html_code += '        <th class="zcat-table-th">Name</th>\n';
    html_code += '        <th class="zcat-table-th">Email</th>\n';
    html_code += '        <th class="zcat-table-th">Status</th>\n';
    html_code += '      </tr>\n';
    html_code += '    </thead>\n';
    html_code += '    <tbody class="zcat-table-body">\n';
    html_code += '      <tr class="zcat-table-row">\n';
    html_code += '        <td class="zcat-table-td">John Doe</td>\n';
    html_code += '        <td class="zcat-table-td">john@example.com</td>\n';
    html_code += '        <td class="zcat-table-td"><span class="zcat-table-status zcat-table-status-success">Active</span></td>\n';
    html_code += '      </tr>\n';
    html_code += '    </tbody>\n';
    html_code += '  </table>\n';
    html_code += '</div>';

    let css_code = '.zcat-table-wrapper {\n  width: 100%;\n  overflow-x: auto;\n}\n\n';
    css_code += '.zcat-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n\n';
    css_code += '.zcat-table-th,\n.zcat-table-td {\n  padding: 10px 12px;\n  text-align: left;\n  border-bottom: 1px solid var(--zcat-table-border-color);\n}\n\n';
    css_code += '.zcat-table-status {\n  padding: 2px 8px;\n  border-radius: 10px;\n  font-size: 12px;\n}';

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
      tableObj: prop('object', {
        default: {
          checkbox: true,
          moreOptions: true,
          header: [
            { label: 'Name', value: 'name', sortable: true },
            { label: 'Role', value: 'role' },
            { label: 'Email', value: 'email' },
            { label: 'Status', value: 'status', field_type: 'status' }
          ],
          body: [
            { name: 'Alice Johnson', role: 'Designer', email: 'alice@example.com', status: 'Active', status_status: 'success' },
            { name: 'Bob Smith', role: 'Developer', email: 'bob@example.com', status: 'Active', status_status: 'success' },
            { name: 'Carol White', role: 'Manager', email: 'carol@example.com', status: 'Pending', status_status: 'warning' },
            { name: 'Dave Brown', role: 'QA Lead', email: 'dave@example.com', status: 'Inactive', status_status: 'danger' }
          ]
        }
      }),
      resetButtonObj: prop('object', {
        default: { label: 'Reset', variant: 'outline', color: 'primary', size: 'extra-small', callback: { name: 'resetCustomization' } }
      }),
      toggleCheckboxObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleCheckbox' } }
      }),
      toggleMoreObj: prop('object', {
        default: { checked: true, size: 'small', callback: { name: 'onToggleMore' } }
      }),
      // Variant demos
      variantDefaultObj: prop('object', {
        default: {
          header: [
            { label: 'Product', value: 'product' },
            { label: 'Price', value: 'price' },
            { label: 'Stock', value: 'stock' }
          ],
          body: [
            { product: 'Widget A', price: '$12.00', stock: '120' },
            { product: 'Widget B', price: '$25.50', stock: '85' },
            { product: 'Widget C', price: '$8.99', stock: '200' }
          ]
        }
      }),
      variantStripedObj: prop('object', {
        default: {
          striped: true,
          header: [
            { label: 'City', value: 'city' },
            { label: 'Country', value: 'country' },
            { label: 'Population', value: 'population' }
          ],
          body: [
            { city: 'Tokyo', country: 'Japan', population: '13.96M' },
            { city: 'Paris', country: 'France', population: '2.16M' },
            { city: 'London', country: 'UK', population: '8.98M' },
            { city: 'New York', country: 'USA', population: '8.34M' }
          ]
        }
      }),
      variantBorderedObj: prop('object', {
        default: {
          bordered: true,
          header: [
            { label: 'Module', value: 'module' },
            { label: 'Version', value: 'version' },
            { label: 'License', value: 'license' }
          ],
          body: [
            { module: 'React', version: '18.2', license: 'MIT' },
            { module: 'Vue', version: '3.3', license: 'MIT' },
            { module: 'Angular', version: '17.0', license: 'MIT' }
          ]
        }
      }),
      variantCompactObj: prop('object', {
        default: {
          compact: true,
          header: [
            { label: 'Key', value: 'key' },
            { label: 'Value', value: 'value' },
            { label: 'Type', value: 'type' }
          ],
          body: [
            { key: 'API_URL', value: 'https://api.example.com', type: 'String' },
            { key: 'DEBUG', value: 'true', type: 'Boolean' },
            { key: 'PORT', value: '3000', type: 'Number' },
            { key: 'ENV', value: 'production', type: 'String' }
          ]
        }
      }),
      variantCheckboxObj: prop('object', {
        default: {
          checkbox: true,
          moreOptions: true,
          header: [
            { label: 'Employee', value: 'employee', sortable: true },
            { label: 'Department', value: 'department' },
            { label: 'Status', value: 'status', field_type: 'status' }
          ],
          body: [
            { employee: 'Sarah Connor', department: 'Engineering', status: 'Online', status_status: 'success' },
            { employee: 'John Wick', department: 'Operations', status: 'Away', status_status: 'warning' },
            { employee: 'Ellen Ripley', department: 'Research', status: 'Offline', status_status: 'danger' }
          ]
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
        this.setData('tableObj', {
          checkbox: true,
          moreOptions: true,
          header: [
            { label: 'Name', value: 'name', sortable: true },
            { label: 'Role', value: 'role' },
            { label: 'Email', value: 'email' },
            { label: 'Status', value: 'status', field_type: 'status' }
          ],
          body: [
            { name: 'Alice Johnson', role: 'Designer', email: 'alice@example.com', status: 'Active', status_status: 'success' },
            { name: 'Bob Smith', role: 'Developer', email: 'bob@example.com', status: 'Active', status_status: 'success' },
            { name: 'Carol White', role: 'Manager', email: 'carol@example.com', status: 'Pending', status_status: 'warning' },
            { name: 'Dave Brown', role: 'QA Lead', email: 'dave@example.com', status: 'Inactive', status_status: 'danger' }
          ]
        });
        this.$app.objectUtils(this.getData('toggleCheckboxObj'), 'add', 'checked', true);
        this.$app.objectUtils(this.getData('toggleMoreObj'), 'add', 'checked', true);
        let selects = this.$node.querySelectorAll('.zcat-custom-select');
        if (selects) { selects.forEach(function (s) { s.selectedIndex = 0; }); }
        this.constructCodeSnippet();
      },
      onToggleCheckbox(checked) {
        this.$app.objectUtils(this.getData('tableObj'), 'add', 'checkbox', checked);
        this.constructCodeSnippet();
      },
      onToggleMore(checked) {
        this.$app.objectUtils(this.getData('tableObj'), 'add', 'moreOptions', checked);
        this.constructCodeSnippet();
      },
      onTableSort(column, direction) {
        // demo sort callback
      },
      onTableSelect(selected) {
        // demo select callback
      }
    };
  }

  static actions() {
    return {
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

export { TableComp };
