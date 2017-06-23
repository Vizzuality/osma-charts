import { h } from 'preact'
import cx from 'classnames'
import * as _ from 'utils'

import Bars from './bars'
import styles from './histogram.scss'

const shorten = m => (m).substring(0, 3)
const avgToColor = (d, m) => `rgba(0, 0, 255, ${_.avg(m) / 100})`

const Histogram = ({ data, margin = 1, monthNames, className }) => {
  return (
    <div class={cx(className, styles.histogram)}>
      {data.map(([month, max], i) =>
        <div
          class={styles['histogram-month']}
          style={{ width: `calc(100% / ${data.length})` }}
        >
          <Bars data={month} {...{max}} />
          <div
            style={{ borderColor: avgToColor(data, month) }}
            class={styles['histogram-month-label']}
          >
            {shorten(monthNames[i])}
          </div>
        </div>
      )}
    </div>
  )
}
export default Histogram