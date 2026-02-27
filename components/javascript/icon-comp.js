import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

var allIcons = [
    'plus','minus','arrow-right','arrow-left','arrow-up','arrow-down',
    'arrow-forward','arrow-backward','arrow-upward','arrow-downward',
    'alert-triangle','alert-circle','loading-sun','three-dots','tick',
    'external-link','rocket','info','close','search','question-round',
    'home','file','eye-open','eye-close','upload-cloud','download-cloud',
    'folder','user','star','nine-dots','refresh','edit','delete','copy',
    'globe','clock','tick-circle','settings','notification','edit-pencil',
    'moon','sun','calendar','logout','phone','expand-collapse','filter',
    'link','help','image','alert-success','alert-info','alert-danger','alert-warning'
];

class IconComp extends Component {
    constructor() {
        super();
    }

    init() {
        var iconList = [];
        for (var i = 0; i < allIcons.length; i++) {
            iconList.push({ name: allIcons[i], hidden: false });
        }
        this.setData('iconList', iconList);
        this.setData('filteredCount', allIcons.length);
        this.constructCodeSnippet();
    }

    didConnect() {
        this._bindEvents();
    }

    constructCodeSnippet() {
        // sLyte tab
        var slyte_code = '<zcat-icon\n  name="icon-name"\n  width="16"\n  height="16"\n  stroke="var(--token)"\n  stroke-width="1.3"\n></zcat-icon>';

        // JS tab — props table
        var js_code = '// Props\n// name       : string  (default: \'\')\n// width      : string  (default: \'14\')\n// height     : string  (default: \'14\')\n// stroke     : string  (default: \'\')\n// strokeWidth: string  (default: \'1.3\')\n// fill       : string  (default: \'\')';

        // sLyte New tab
        var newSlyte_code = '<zcat-icon\n  name="icon-name"\n  zcat-prop-width="16"\n  zcat-prop-height="16"\n  zcat-prop-stroke="var(--token)"\n  zcat-prop-stroke-width="1.3"\n></zcat-icon>';

        // HTML tab
        var html_code = '<!-- Using the zcat-icon component -->\n<zcat-icon name="search" width="16" height="16"\n  stroke="currentColor" stroke-width="1.3">\n</zcat-icon>\n\n<!-- Available Icons (' + allIcons.length + ') -->\n' + allIcons.join(', ');

        // CSS tab
        var css_code = '/* Icon component has no required CSS.\n   Use stroke/fill props or CSS tokens to control color. */\n\nzcat-icon svg {\n  display: block;\n}';

        this.setData('slyteCodeSnippet.code', slyte_code);
        this.setData('jsCodeSnippet.code', js_code);
        this.setData('newSlyteCodeSnippet.code', newSlyte_code);
        this.setData('htmlCodeSnippet.code', html_code);
        this.setData('cssCodeSnippet.code', css_code);
    }

    _bindEvents() {
        var comp = this;
        var node = this.$node;

        // Search
        var searchInput = node.querySelector('[data-action="searchIcons"]');
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                comp._filterIcons(e.target.value.toLowerCase().trim());
            });
        }

        // Icon Size
        var sizeSelect = node.querySelector('[data-action="changeIconSize"]');
        if (sizeSelect) {
            sizeSelect.addEventListener('change', function (e) {
                comp.setData('iconSize', e.target.value);
            });
        }

        // Stroke Width — range slider
        var strokeSlider = node.querySelector('[data-action="changeStrokeWidth"]');
        if (strokeSlider) {
            strokeSlider.addEventListener('input', function (e) {
                comp.setData('iconStrokeWidth', e.target.value);
            });
        }

        // Color picker
        var colorPicker = node.querySelector('[data-action="changeIconColor"]');
        if (colorPicker) {
            colorPicker.addEventListener('input', function (e) {
                comp.setData('iconColor', e.target.value);
                var textInput = node.querySelector('[data-action="changeIconColorText"]');
                if (textInput) { textInput.value = e.target.value; }
            });
        }

        // Color text input
        var colorText = node.querySelector('[data-action="changeIconColorText"]');
        if (colorText) {
            colorText.addEventListener('change', function (e) {
                comp.setData('iconColor', e.target.value);
                if (colorPicker) { colorPicker.value = e.target.value; }
            });
        }
    }

    _filterIcons(query) {
        var iconList = this.getData('iconList');
        var count = 0;
        for (var i = 0; i < iconList.length; i++) {
            var hidden = query ? iconList[i].name.indexOf(query) === -1 : false;
            this.$app.objectUtils(iconList[i], 'add', 'hidden', hidden);
            if (!hidden) { count++; }
        }
        this.setData('filteredCount', count);
    }

    data() {
        return {
            self: prop('object', { default: this }),
            iconList: prop('array', { default: [] }),
            filteredCount: prop('number', { default: 0 }),
            iconSize: prop('string', { default: '16' }),
            iconStrokeWidth: prop('string', { default: '1.3' }),
            iconColor: prop('string', { default: '#555555' }),
            showCopied: prop('boolean', { default: false }),
            copiedText: prop('string', { default: '' }),
            activeTab: prop('string', { default: 'slyte' }),
            slyteCodeSnippet: prop('object', { default: { code: '' } }),
            jsCodeSnippet: prop('object', { default: { code: '' } }),
            newSlyteCodeSnippet: prop('object', { default: { code: '' } }),
            htmlCodeSnippet: prop('object', { default: { code: '' } }),
            cssCodeSnippet: prop('object', { default: { code: '' } })
        };
    }

    static methods() {
        return {};
    }

    static actions() {
        return {
            showSlyteTab() { this.setData('activeTab', 'slyte'); },
            showJsTab() { this.setData('activeTab', 'js'); },
            showNewSlyteTab() { this.setData('activeTab', 'newslyte'); },
            showHtmlTab() { this.setData('activeTab', 'html'); },
            showCssTab() { this.setData('activeTab', 'css'); },
            copyCode() {
                var tab = this.getData('activeTab');
                var code;
                if (tab === 'slyte') { code = this.getData('slyteCodeSnippet.code'); }
                else if (tab === 'js') { code = this.getData('jsCodeSnippet.code'); }
                else if (tab === 'newslyte') { code = this.getData('newSlyteCodeSnippet.code'); }
                else if (tab === 'html') { code = this.getData('htmlCodeSnippet.code'); }
                else if (tab === 'css') { code = this.getData('cssCodeSnippet.code'); }
                if (navigator.clipboard) { navigator.clipboard.writeText(code); }
            },
            copyIconTag(iconItem) {
                var name = iconItem.name;
                var tag = '<zcat-icon name="' + name + '" width="16" height="16" stroke="currentColor" stroke-width="1.3"></zcat-icon>';
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(tag);
                }
                this.setData('copiedText', 'Copied: ' + name);
                this.setData('showCopied', true);
                var comp = this;
                setTimeout(function () {
                    comp.setData('showCopied', false);
                }, 1800);
            }
        };
    }

    static observers() { return {}; }
}

export { IconComp };
