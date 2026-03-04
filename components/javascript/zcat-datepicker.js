import { Component } from '@slyte/component';
import { prop } from '@slyte/core';

class ZcatDatepicker extends Component {
  constructor() {
    super();
  }

  data() {
    return {
      self: prop('object'),
      zcatProp: prop('object', { default: {} }, { watch: true }),
      isOpen: prop('boolean', { default: false }),
      selectedDate: prop('string', { default: '' }),
      displayValue: prop('string', { default: '' }),
      // Calendar state
      viewYear: prop('number', { default: new Date().getFullYear() }),
      viewMonth: prop('number', { default: new Date().getMonth() }),
      calendarDays: prop('array', { default: [] }),
      monthLabel: prop('string', { default: '' }),
      // Time state
      hours: prop('string', { default: '12' }),
      minutes: prop('string', { default: '00' }),
      seconds: prop('string', { default: '00' }),
      ampm: prop('string', { default: 'AM' }),
      // Temp selection (applied on Apply click)
      tempDate: prop('string', { default: '' })
    };
  }

  init() {
    this._syncFromProp();
    this._buildCalendar();
  }

  didConnect() {
    let comp = this;
    this._outsideClickHandler = function(e) {
      let wrapper = comp.$node ? comp.$node.querySelector('.zcat-datepicker-wrapper') : null;
      if (wrapper && !wrapper.contains(e.target)) {
        comp.setData('isOpen', false);
      }
    };
    document.addEventListener('click', this._outsideClickHandler, true);
  }

  didDestroy() {
    if (this._outsideClickHandler) {
      document.removeEventListener('click', this._outsideClickHandler, true);
    }
  }

  _syncFromProp() {
    let zcatProp = this.getData('zcatProp');
    if (zcatProp && zcatProp.value) {
      this.setData('selectedDate', zcatProp.value);
      this.setData('tempDate', zcatProp.value);
      this._updateDisplayValue(zcatProp.value);
      // Parse date to set view
      let d = new Date(zcatProp.value);
      if (!isNaN(d.getTime())) {
        this.setData('viewYear', d.getFullYear());
        this.setData('viewMonth', d.getMonth());
      }
    }
  }

  _updateDisplayValue(dateStr) {
    if (!dateStr) {
      this.setData('displayValue', '');
      return;
    }
    let zcatProp = this.getData('zcatProp');
    let format = (zcatProp && zcatProp.format) || 'MM/DD/YYYY';
    let d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      this.setData('displayValue', dateStr);
      return;
    }
    let mm = String(d.getMonth() + 1).padStart(2, '0');
    let dd = String(d.getDate()).padStart(2, '0');
    let yyyy = d.getFullYear();
    let result = format
      .replace('YYYY', yyyy)
      .replace('MM', mm)
      .replace('DD', dd);
    if (zcatProp && zcatProp.showTime) {
      result += ' ' + this.getData('hours') + ':' + this.getData('minutes') + ':' + this.getData('seconds') + ' ' + this.getData('ampm');
    }
    this.setData('displayValue', result);
  }

  _buildCalendar() {
    let year = this.getData('viewYear');
    let month = this.getData('viewMonth');
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.setData('monthLabel', months[month] + ' ' + year);

    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let daysInPrevMonth = new Date(year, month, 0).getDate();

    let days = [];
    let zcatProp = this.getData('zcatProp');
    let minDate = zcatProp && zcatProp.minDate ? new Date(zcatProp.minDate) : null;
    let maxDate = zcatProp && zcatProp.maxDate ? new Date(zcatProp.maxDate) : null;
    let tempDate = this.getData('tempDate');
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month fill
    for (let i = firstDay - 1; i >= 0; i--) {
      let dayNum = daysInPrevMonth - i;
      days.push({ day: dayNum, current: false, disabled: true, selected: false, today: false, _dateStr: '' });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      let date = new Date(year, month, d);
      date.setHours(0, 0, 0, 0);
      let dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      let disabled = false;
      if (minDate && date < minDate) disabled = true;
      if (maxDate && date > maxDate) disabled = true;
      days.push({
        day: d,
        current: true,
        disabled: disabled,
        selected: tempDate === dateStr,
        today: date.getTime() === today.getTime(),
        _dateStr: dateStr
      });
    }

    // Next month fill (to complete 6 rows)
    let remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, current: false, disabled: true, selected: false, today: false, _dateStr: '' });
    }

    this.setData('calendarDays', days);
  }

  static methods() {
    return {};
  }

  static actions() {
    return {
      togglePicker(event) {
        if (event) event.stopPropagation();
        let zcatProp = this.getData('zcatProp');
        if (zcatProp && zcatProp.disabled) return;
        let isOpen = this.getData('isOpen');
        if (!isOpen) {
          // Opening — sync temp from selected
          let sel = this.getData('selectedDate');
          this.setData('tempDate', sel);
          if (sel) {
            let d = new Date(sel);
            if (!isNaN(d.getTime())) {
              this.setData('viewYear', d.getFullYear());
              this.setData('viewMonth', d.getMonth());
            }
          }
          this._buildCalendar();
        }
        this.setData('isOpen', !isOpen);
      },

      prevMonth() {
        let m = this.getData('viewMonth');
        let y = this.getData('viewYear');
        if (m === 0) { m = 11; y--; } else { m--; }
        this.setData('viewMonth', m);
        this.setData('viewYear', y);
        this._buildCalendar();
      },

      nextMonth() {
        let m = this.getData('viewMonth');
        let y = this.getData('viewYear');
        if (m === 11) { m = 0; y++; } else { m++; }
        this.setData('viewMonth', m);
        this.setData('viewYear', y);
        this._buildCalendar();
      },

      selectDay(dayObj) {
        if (dayObj.disabled || !dayObj.current) return;
        this.setData('tempDate', dayObj._dateStr);
        this._buildCalendar();
      },

      onHoursChange(event) {
        let v = event.target.value.replace(/\D/g, '').slice(0, 2);
        let num = parseInt(v, 10);
        if (num > 12) v = '12';
        if (num < 1 && v.length === 2) v = '01';
        this.setData('hours', v || '');
      },

      onMinutesChange(event) {
        let v = event.target.value.replace(/\D/g, '').slice(0, 2);
        let num = parseInt(v, 10);
        if (num > 59) v = '59';
        this.setData('minutes', v || '');
      },

      onSecondsChange(event) {
        let v = event.target.value.replace(/\D/g, '').slice(0, 2);
        let num = parseInt(v, 10);
        if (num > 59) v = '59';
        this.setData('seconds', v || '');
      },

      toggleAmPm() {
        this.setData('ampm', this.getData('ampm') === 'AM' ? 'PM' : 'AM');
      },

      applyDate() {
        let tempDate = this.getData('tempDate');
        this.setData('selectedDate', tempDate);
        this._updateDisplayValue(tempDate);
        this.setData('isOpen', false);

        let self = this.getData('self');
        let zcatProp = this.getData('zcatProp');
        if (self && zcatProp && zcatProp.callback && zcatProp.callback.name) {
          let result = { date: tempDate };
          if (zcatProp.showTime) {
            result.time = this.getData('hours') + ':' + this.getData('minutes') + ':' + this.getData('seconds') + ' ' + this.getData('ampm');
          }
          self.executeMethod(zcatProp.callback.name, result);
        }
      },

      resetDate() {
        this.setData('tempDate', '');
        this.setData('selectedDate', '');
        this.setData('displayValue', '');
        this.setData('hours', '12');
        this.setData('minutes', '00');
        this.setData('seconds', '00');
        this.setData('ampm', 'AM');
        let now = new Date();
        this.setData('viewYear', now.getFullYear());
        this.setData('viewMonth', now.getMonth());
        this._buildCalendar();
      },

      closePicker() {
        this.setData('isOpen', false);
      }
    };
  }

  static observers() {
    return {
      zcatPropChanged: {
        watch: ['zcatProp'],
        handler() {
          this._syncFromProp();
          this._buildCalendar();
        }
      }
    };
  }
}

export { ZcatDatepicker };
