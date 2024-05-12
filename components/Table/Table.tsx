import React from 'react';
import styles from './table.module.css';
import Image from 'next/image';

interface TablePropTypes {
    data: any[]
}

const Table = ({ data }: TablePropTypes) => {

    const tableData = data || [];


    const renderTableRow = () => (
        <>
        {   tableData.map((itm, idx) => (
                <tr key={itm.id}>
                    <td>
                        <Image src={itm.imageUrl} alt={'user_image'} height={25} width={25}/>
                        <p>{itm.createdBy}</p>
                    </td>
                    <td>{itm.title}</td>
                    <td>{itm.createdAt}</td>
                    <td><span className={`${styles.highLight} ${styles.statusCompleted}`}>{itm.status}</span></td>
                    <td><span className={`${styles.highLight} ${styles[itm.priority]}`}>{itm.priority}</span></td>
                </tr>
            ))
        }
        </>
    )
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
                                <th>Created by</th>
                                <th>Title</th>
                                <th>Date Added</th>
                                <th>Status</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? renderTableRow() : <tr><td><span>No Issues</span></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Table