import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Loader } from '../../shared/ui';
import styles from './auth.module.scss';

export const Auth: FC = () => {
    const { status } = useSelector((state: any) => state.authSlice);

    return (
        <div className={styles.container}>
            <div className={styles.container__blur}>
                <Outlet />
                {status === 'loading' ?
                    <div className={styles.container__loading}>
                        <Loader data-test-id='loader' />
                    </div> : null
                }
            </div>
        </div>
    );
};
