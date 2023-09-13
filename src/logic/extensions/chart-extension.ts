// MIT License
//
// Copyright (c) 2023 Jahrim Gabriele Cesario
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
      tension: 0,
    })),
  };
}