/* eslint no-return-assign: 0 */
import { h } from 'preact'
import cx from 'classnames'
import _meanBy from 'lodash/meanBy'

import { scaleTime, scalePow } from 'd3-scale'

import first from 'lodash/first'
import last from 'lodash/last'

import _maxBy from 'lodash/maxBy'
import _minBy from 'lodash/minBy'
import { rgba, stripUnit } from 'polished'

import { MONTH_NAMES } from 'src/constants'

import Bars from './bars'
import styles from './histogram.scss'
import sassVars from 'variables.scss'

const Histogram = ({ data, className, width = '100%', height = '300px' }) => {
  const percentRange = [0, 100]
  const getValue = d => d.value
  const max = _maxBy(data, getValue).value
  const min = _minBy(data, getValue).value
  const fromDate = first(data).day
  const toDate = last(data).day
  const margin = stripUnit(sassVars.monthMargin)
  const xDomain = [fromDate, toDate]
  const xScale = scaleTime()
    .domain(xDomain)
    .range(percentRange)

  // const valueToHeight = scaleLinear()
  // const valueToHeight = scalePow()
  // .base(0.5)
  const yScale = scalePow()
    .exponent(0.125)
    .domain([min, max])
    .range(percentRange)

  const ticks = [new Date(data[0].day)].concat(xScale.ticks())
  const tickDomain = xDomain
  const tickScale = scaleTime()
    .domain(tickDomain)
    .range(percentRange)

  // const rangeBounds = scaleBand()
  //   .domain(tickDomain)
  //   .range(percentRange)
  //   .paddingOuter(0)
  //   .paddingInner(0)

  const tickOpacity = (data, t) => {
    const month = data.filter(({ day, value }) => {
      const date = new Date(day)
      return date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear()
    })

    const mean = _meanBy(month, getValue)
    const max = getValue(_maxBy(month, getValue))
    return (mean * max) / 100
  }

  return (
    <div class={cx(className, styles.histogram)} style={{width, height}}>
      <Bars {...{data, min, max, xScale, yScale, margin}} />
      <div class={styles.labels}>
        {ticks.map((t, i) =>
          <div
            class={styles['histogram-month-label']}
            style={{
              borderColor: rgba(sassVars.blue, tickOpacity(data, t)),
              left: `${tickScale(t)}%`,
              // width: rangeBounds.bandwidth()
              width: `calc(${tickScale(ticks[i + 1]) - tickScale(ticks[i])}% - ${margin}px)`
            }}
          >
            {`${MONTH_NAMES[t.getMonth()]} ${t.getFullYear()}`}
          </div>
        )}
      </div>
    </div>
  )
}
export default Histogram
