import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatModal extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }),
      isOpen: prop('boolean', { default: false })
    };
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      openModal() {
        this.setData('isOpen', true);
        document.body.style.overflow = 'hidden';
      },
      closeModal() {
        this.setData('isOpen', false);
        document.body.style.overflow = '';
        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.onClose) {
          self.executeMethod(zcatProp.onClose, zcatProp);
        }
      },
      onOverlayClick(event) {
        if (event.target.classList.contains('zcat-modal-overlay')) {
          let zcatProp = this.getData('zcatProp');
          if (zcatProp.closeOnOverlay !== false) {
            this.exec('closeModal');
          }
        }
      },
      onFooterBtnClick(btn) {
        let self = this.getData('self');
        if (self && btn && btn.callback && btn.callback.name) {
          self.executeMethod(btn.callback.name, btn, this.getData('zcatProp'));
        }
        if (btn.closeOnClick !== false) {
          this.exec('closeModal');
        }
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          let zcatProp = this.getData('zcatProp');
          if (zcatProp && zcatProp.open) {
            this.setData('isOpen', true);
            document.body.style.overflow = 'hidden';
          }
        }
      }
    };
  }
}

export { ZcatModal };
