import { addDays, format, isAfter, isBefore, isEqual, isValid, parse, startOfDay, startOfMonth, startOfWeek, startOfYear } from 'date-fns';

class AdapterDateFns {
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  date(value) {
    if (value === null) {
      return null;
    }

    return new Date(value);
  }

  addDays(date, amount) {
    return addDays(date, amount);
  }

  format(date, formatString) {
    return format(date, formatString, { locale: this.locale });
  }

  isAfter(date, comparing) {
    return isAfter(date, comparing);
  }

  isBefore(date, comparing) {
    return isBefore(date, comparing);
  }

  isEqual(date, comparing) {
    return isEqual(date, comparing);
  }

  isValid(date) {
    return isValid(date);
  }

  parse(value, formatString) {
    if (value === '') {
      return null;
    }

    return parse(value, formatString, new Date(), { locale: this.locale });
  }

  startOfDay(date) {
    return startOfDay(date);
  }

  startOfMonth(date) {
    return startOfMonth(date);
  }

  startOfWeek(date) {
    return startOfWeek(date, { locale: this.locale });
  }

  startOfYear(date) {
    return startOfYear(date);
  }
}

export default AdapterDateFns;