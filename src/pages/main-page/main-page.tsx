import React from 'react';

import styles from './main-page.module.scss';
import { ContentContainer, MPHeader, MPSideBar } from './components';


export const MainPage: React.FC = () => {

    return (
        <div className={styles.container}>
            <MPSideBar />
            <div className={styles.content}>
                <div className={styles.content__header}>
                    <MPHeader />
                </div>
                <div className={styles.content__main}>
                    <ContentContainer />
                </div>
            </div>
        </div>
    );
};
