import React from 'react'
import styles from './widget.module.css';

const Widget = () => {
  return (
        <ul className={styles.boxInfo}>
            <li>
                <i className={styles.bx} ></i>
                <span className={styles.text}>
                    <h3>1020</h3>
                    <p>New Order</p>
                </span>
            </li>
            <li>
                <i className={styles.bx} ></i>
                <span className={styles.text}>
                    <h3>2834</h3>
                    <p>Visitors</p>
                </span>
            </li>
            <li>
                <i className={styles.bx} ></i>
                <span className={styles.text}>
                    <h3>$2543</h3>
                    <p>Total Sales</p>
                </span>
            </li>
        </ul>

  )
}

export default Widget;