const calendarMonths = {
  gregorian: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
};

export class Calendar {
  static getMonths(calendarId = 'gregorian') {
    return calendarMonths[calendarId];
  }

  static getCurrentYear(calendarId = 'gregorian') {
    const date = new Date();

    return date.getFullYear();
  }

  static getCurrentMonth(calendarId = 'gregorian') {
    const date = new Date();

    return date.getMonth() + 1;
  }
}
