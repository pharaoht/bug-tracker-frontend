import React from 'react';
import styles from './table.module.css';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';

interface TablePropTypes {
    data: any[];
    loadingState:boolean;
    setSelectedIssueData: (...args: any) => void;
    toggleViewIssueForm: (...args: any) => void;
}

const Table = ({ data, loadingState, setSelectedIssueData, toggleViewIssueForm }: TablePropTypes) => {

    const tableData = data || [];

    const renderTableRow = () => tableData.map((itm, idx) => 

        {
            const cssStatusName = itm.status.includes(' ') ? itm.status.replace(/ /, '_') : itm.status

            return (
                <tr key={itm.id} 
                    onClick={
                        () => {
                            setSelectedIssueData(itm);
                            toggleViewIssueForm(true);
                        }
                    }>
                    <td>
                        <Image src={itm.imageUrl} alt={'user_image'} height={25} width={25}/>
                        <p>{itm.createdBy}</p>
                    </td>
                    <td>{itm.title}</td>
                    <td>{itm.createdAt}</td>
                    <td><span className={`${styles.highLight} ${styles[cssStatusName]}`}>{itm.status}</span></td>
                    <td><span className={`${styles.highLight} ${styles[itm.priority]}`}>{itm.priority}</span></td>
                </tr>
            )
        }
    )
    
    return (
            <div className={styles.tableData}>
                <div className={styles.order}>
                    <div className={styles.head}>
                        <h3>Recent Tickets</h3>
                        <i className={styles.bx} >v</i>
                        <i className={styles.bx}>x</i>
                    </div>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th className={styles.padTop}>Created by</th>
                                <th className={styles.padTop}>Title</th>
                                <th className={styles.padTop}>Date Added</th>
                                <th className={styles.padTop}>Status</th>
                                <th className={styles.padTop}>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.length > 0 ? 
                                renderTableRow() 
                            : 
                                ( loadingState ? <tr><td><CircularProgress/></td></tr> : <tr><td><span>No Issues</span></td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Table