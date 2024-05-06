import React from 'react';
import styles from './table.module.css';

const Table = () => {
  return (
        <div className={styles.tableData}>
            <div className={styles.order}>
                <div className={styles.head}>
                    <h3>Recent Tickets</h3>
                    <i className={styles.bx} >v</i>
                    <i className={styles.bx}>x</i>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Date Added</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                photo
                                <p>John Doe</p>
                            </td>
                            <td>01-10-2021</td>
                            <td><span className={styles.statusCompleted}>Completed</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Table