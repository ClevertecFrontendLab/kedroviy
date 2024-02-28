import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './result-page.module.scss';

export const ResultPage: FC = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.container__blur}>
                
                <Outlet />
               
            </div>
        </div>
    );
};
