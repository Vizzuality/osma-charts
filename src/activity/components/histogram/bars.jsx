import { h } from 'preact'
import cx from 'classnames'
import { scaleTime, scaleLog, scaleLinear, scalePow } from 'd3-scale'
import first from 'lodash/first'
import last from 'lodash/last'

import styles from './histogram.scss'

// const dataToWidth = (data, margin, i) =>
//   `calc((100% / ${data.length} - ${margin}px) + ${
//     data.length > 1
//       ? margin / (data.length - 1)
//       : 0
//   }px)`

// const dataToLeft = (data, margin, i) =>
//   `calc((${dataToWidth(data, margin, i)} * ${i}) + ${i * margin}px)`

const Bars = ({ data, min, max, yScale, xScale, margin = 1 }) => {
  return (
    <div class={styles.bars}>
      {data.map(({ day, value }, i) =>
        <div
          class={cx(styles.bar)}
          style={{
            opacity: `${yScale(value, max) / 100}`,
            height: `${yScale(value, max)}%`,
            // height: '100%',
            left: `${xScale(day)}%`,
            // width: dataToWidth(data, margin, i)
            width: `calc(${xScale((data[i + 1] || data[i]).day) - xScale(day)}% - ${margin / data.length}px)`
          }}
        />
      )}
    </div>
  )
}

export default Bars
