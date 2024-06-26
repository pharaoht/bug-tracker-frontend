import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './table.module.css';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import Paginator from '../Paginator/Paginator';
import DashboardContext from '@/context/DashboardContext';
import { thLabels } from '@/constants/costants';

interface TablePropTypes {
    data: any[];
    sortApiLoadingState: boolean;
    searchApiLoadingState: boolean;
    sortError: string;
    searchError: string;
    setSelectedIssueData: (...args: any) => void;
    toggleViewIssueForm: (...args: any) => void;
}

const Table = ({ data, sortApiLoadingState, searchApiLoadingState, sortError, searchError, setSelectedIssueData, toggleViewIssueForm }: TablePropTypes) => {

    const tableData = data || [];

    const [ activeThColumn, setActiveThColumn ] = useState<number>(2);
    const [ isAsc, setIsAsc ] = useState<boolean>(false);

    const hasMounted = useRef(false); 

    const dashbaordContext = useContext(DashboardContext);

    const thOnClickHandler = ( columnindex: number ): void => {
    
        hasMounted.current = true;

        if(columnindex == activeThColumn){

            const value = dashbaordContext?.queryParams.sortDirection === 0 ? 1 : 0;
            dashbaordContext?.setQueryParamsFunc('sortDirection', value)
            setIsAsc(!isAsc)
            return undefined;
        }

        dashbaordContext?.setQueryParamsFunc('columnType', columnindex);
        setActiveThColumn(columnindex)

        return undefined;
    
    }

    const renderTableRow = () => tableData?.map((itm, idx) => 

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

    const renderTh = () => thLabels.map((itm, idx) =>
        {
            return (
                <th key={itm.id} 
                    style={{width:itm.width}}
                    className={styles.padTop}
                    onClick={() => thOnClickHandler(idx)}
                >
                    <button className={styles.noButton}>
                        {itm.label}
                        { activeThColumn === idx &&
                            <i className={styles.thIcon}>
                                {
                                    isAsc ?
                                    <ExpandMoreIcon fontSize='small'/>
                                    :
                                    <ExpandLessIcon fontSize='small'/>
                                }
                                
                            </i>
                        }
                    </button>
                </th>
            )
        }
    )
    console.log(tableData)
    
    return (
            <div className={styles.tableData}>
                <div className={styles.order}>
                    <div className={styles.head}>
                        <h3>Issues <span style={{fontSize:'10px'}}><em>(10 per page)</em></span></h3>
                        <Paginator />
                    </div>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                { renderTh() }
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            { (searchError || sortError ) && !searchApiLoadingState && !sortApiLoadingState && <tr><td>{searchError || sortError}</td></tr>}
                            { !searchApiLoadingState && !sortApiLoadingState && tableData?.length > 0 && renderTableRow() }
                            { (searchApiLoadingState || sortApiLoadingState)  && <tr><td><CircularProgress size={'30px'}/></td></tr> }
                            { !searchError && !sortError && !searchApiLoadingState && !sortApiLoadingState && tableData?.length == 0 && <tr><td><span>No Issues</span></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default Table