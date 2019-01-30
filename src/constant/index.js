import moment from 'moment';

/**
 * 生成时间快捷范围
 * @param { Number } startOffset start date 偏移
 * @param { Number } endOffset end date 偏移
 * @param { Number } period 时间维度：day or month
 */
function getRange (startOffset = 0, endOffset = 0, period = 'day') {
  return [
    moment().subtract(startOffset, period).startOf(period),
    moment().subtract(endOffset, period).endOf(period),
  ];
}

export const defaultPresets = [
  {
    label: 'Today',
    range: getRange(0, 0),
  },
  {
    label: 'Yesterday',
    range: getRange(1, 0),
  },
  {
    label: 'Last 7 Days',
    range: getRange(6, 0),
  },
  {
    label: 'Last 30 Days',
    range: getRange(29, 0),
  },
  {
    label: 'This Month',
    range: getRange(0, 0, 'month'),
  },
  {
    label: 'Last Month',
    range: getRange(1, 1, 'month'),
  },
];
