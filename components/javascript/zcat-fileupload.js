import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatFileupload extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      files: prop('array', { default: [] }),
      isDragging: prop('boolean', { default: false }),
      errorMessage: prop('string', { default: '' })
    };
  }

  _getAcceptTypes() {
    let zcatProp = this.getData('zcatProp');
    if (zcatProp && zcatProp.accept) return zcatProp.accept;
    return '';
  }

  _getMaxSize() {
    let zcatProp = this.getData('zcatProp');
    if (zcatProp && zcatProp.maxFileSize) return zcatProp.maxFileSize;
    return 0; // 0 = no limit
  }

  _isMultiple() {
    let zcatProp = this.getData('zcatProp');
    return zcatProp && zcatProp.multiple === true;
  }

  _getMaxFiles() {
    let zcatProp = this.getData('zcatProp');
    if (zcatProp && zcatProp.maxFiles) return zcatProp.maxFiles;
    return 0; // 0 = no limit
  }

  _validateFile(file) {
    let accept = this._getAcceptTypes();
    if (accept) {
      let types = accept.split(',').map(function(t) { return t.trim().toLowerCase(); });
      let ext = '.' + file.name.split('.').pop().toLowerCase();
      let mime = file.type.toLowerCase();
      let valid = false;
      for (let i = 0; i < types.length; i++) {
        if (types[i] === ext || types[i] === mime || (types[i].endsWith('/*') && mime.startsWith(types[i].replace('/*', '/')))) {
          valid = true;
          break;
        }
      }
      if (!valid) return 'File type not allowed: ' + file.name;
    }
    let maxSize = this._getMaxSize();
    if (maxSize && file.size > maxSize) {
      return 'File too large: ' + file.name + ' (max ' + this._formatSize(maxSize) + ')';
    }
    return null;
  }

  _formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  _getFileIcon(file) {
    let ext = file.name.split('.').pop().toLowerCase();
    let iconMap = {
      pdf: 'file-text', doc: 'file-text', docx: 'file-text', txt: 'file-text',
      xls: 'file-text', xlsx: 'file-text', csv: 'file-text',
      png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', svg: 'image', webp: 'image',
      zip: 'archive', rar: 'archive', '7z': 'archive',
      mp4: 'video', mov: 'video', avi: 'video',
      mp3: 'music', wav: 'music'
    };
    return iconMap[ext] || 'file';
  }

  _addFiles(fileList) {
    let files = (this.getData('files') || []).slice();
    let isMulti = this._isMultiple();
    let maxFiles = this._getMaxFiles();
    let errors = [];

    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i];
      let err = this._validateFile(file);
      if (err) {
        errors.push(err);
        continue;
      }
      if (!isMulti) {
        files = [];
      }
      if (maxFiles && files.length >= maxFiles) {
        errors.push('Maximum ' + maxFiles + ' files allowed');
        break;
      }
      files.push({
        id: Date.now() + '_' + i,
        name: file.name,
        size: file.size,
        _sizeLabel: this._formatSize(file.size),
        type: file.type,
        icon: this._getFileIcon(file),
        status: 'complete',
        _raw: file
      });
    }

    this.setData('files', files);
    this.setData('errorMessage', errors.length ? errors.join('; ') : '');

    let self = this.getData('self');
    let zcatProp = this.getData('zcatProp');
    if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
      self.executeMethod(zcatProp.callback.name, files);
    }
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      onFileInputChange(event) {
        let input = event.target;
        if (input.files && input.files.length) {
          this._addFiles(input.files);
        }
        input.value = '';
      },

      triggerFileInput(event) {
        if (event) event.stopPropagation();
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) return;
        let input = this.$node ? this.$node.querySelector('.zcat-fileupload-hidden-input') : null;
        if (input) input.click();
      },

      onDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setData('isDragging', true);
      },

      onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setData('isDragging', true);
      },

      onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setData('isDragging', false);
      },

      onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setData('isDragging', false);
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) return;
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
          this._addFiles(event.dataTransfer.files);
        }
      },

      removeFile(file, event) {
        if (event) { event.stopPropagation(); event.preventDefault(); }
        let files = (this.getData('files') || []).filter(function(f) { return f.id !== file.id; });
        this.setData('files', files);
        this.setData('errorMessage', '');

        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.onRemove && zcatProp.onRemove.name) {
          self.executeMethod(zcatProp.onRemove.name, file, files);
        }
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          // reset if prop changes entirely
        }
      }
    };
  }
}

export { ZcatFileupload };
