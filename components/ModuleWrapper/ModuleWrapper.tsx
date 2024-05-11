import React, { Suspense } from 'react';
import styles from './moduleWrapper.module.css';

interface ModuleWrapperProps {
    children: React.ReactNode
}

const ModuleWrapper = ({ children }: ModuleWrapperProps) => (
    <Suspense>
        <div className={styles.container}>{children}</div>
    </Suspense>
)

export default ModuleWrapper