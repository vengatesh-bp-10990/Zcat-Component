import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatButton extends Component {
  constructor() {
    super();
  }

  data() {
    const defaultProp = {
      menu: {
        id: '',
        list: [
          {
            label: '',
            icon: {
              Position: '',
              name: '',
              class: ''
            },
            callback: {
                name: '',
                arguments: []
              }
          }
        ]
      },
      variant: '',
      color: '',
      disabled: false,
      loading: false,
      size: 'default',
      label: 'SYNC NOW',
      type: '',
      icon: {
        position: 'right',
        name: '',
        class: '' 
      },      
      callback: {
        name: '',
        arguments: []
      },
      ltPropClassCss: "",
      classCss: "",
      width: ""
    };

    return {
      self: prop('object'),
      zcatProp: prop('object')
    };
  }

  static methods() {
    return {
    };
  }

  static actions() {
    return {
      async customLbindForButtonClick(a, b, c, d) {
        const self = this.getData('self');
        const prop = this.getData('zcatProp');
        if (prop.callback.name && prop.callback.type !== 'submit') {
          if(prop.callback?.arguments?.length) {
            await self.executeMethod(prop.callback.name, prop.callback.arguments);
          } else {
            await self.executeMethod(prop.callback.name);
          }
        }
      },
      async customLbindForMenuClick(item) {
        const self = this.getData('self');
        if (item.callback.name) {
          await self.executeMethod(item.callback.name, item);
        }
      },
      buttonClick(a, b, c){
        this.executeMethod('clickAction', a, b, c);
      }
    };
  }

  static observers() {
    return {};
  }
}

export { ZcatButton };
