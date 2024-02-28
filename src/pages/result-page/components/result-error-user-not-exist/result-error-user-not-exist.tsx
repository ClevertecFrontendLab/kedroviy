import { FC } from "react";
import { useSelector } from "react-redux";

import styles from './result-error-user-not-exist.module.scss';

export const ResultErrorUserNotExist: FC = () => {
    const { status } = useSelector((state: any) => state.authSlice);

    return (
        <div className={styles.container}>
            ErrorUserNotExist
        </div>
    );
};