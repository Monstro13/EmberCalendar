Ember.Handlebars.helper('formatMonth', function(month){
  var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Oktober',
  'November',
  'December']

  return months[month-1];
});