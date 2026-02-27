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
    }

    didConnect() {
        this._bindEvents();
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

        // Stroke Width
        var strokeSelect = node.querySelector('[data-action="changeStrokeWidth"]');
        if (strokeSelect) {
            strokeSelect.addEventListener('change', function (e) {
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
            copiedText: prop('string', { default: '' })
        };
    }

    static methods() {
        return {};
    }

    static actions() {
        return {
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
