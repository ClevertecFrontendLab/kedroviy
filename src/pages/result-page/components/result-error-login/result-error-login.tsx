import { FC } from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

import styles from './result-error-login.module.scss';

export const ResultErrorLogin: FC = () => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1)
    };

    return (
        <div className={styles.container}>
            <Result
                status="warning"
                title="Вход не выполнен"
                subTitle="Что-то пошло не так"
                extra={
                    <Button
                        data-test-id='login-retry-button'
                        type="primary"
                        key="console"
                        onClick={goBack}
                    >
                        Повторить
                    </Button>
                }
            />
        </div>
    );
};