/** The scale for an axis with {@link Date} values. */
export const timeScale = {
  type: 'time',
  time: {
    displayFormats: {
      'millisecond': 'MMM dd',
      'second': 'MMM dd',
      'minute': 'MMM dd',
      'hour': 'MMM dd',
      'day': 'MMM dd',
      'week': 'MMM dd',
      'month': 'MMM dd',
      'quarter': 'MMM dd',
      'year': 'MMM dd',
    },
  },
}

/**
 * @param xs the specified xs.
 * @param ys the specified ys.
 *           Multiple ys can be specified to plot multiple overlapping charts.
 *           Each ys can be bound to a name and a color.
 * @return the chart data of the chart with the specified xs and ys.
 */
export function getChartData(xs: any, ...ys: { values: any[], name?: string, color?: string, }[]) {
  return {
    labels: xs,
    datasets: ys.map((y, index) => ({
      label: y.name ?? `Graph${index}`,
      data: y.values,
      fill: false,
      borderColor: y.color ?? getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
      tension: 0
    })),
  };
}