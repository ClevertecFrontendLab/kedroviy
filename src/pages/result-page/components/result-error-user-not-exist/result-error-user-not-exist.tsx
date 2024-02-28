import { FC } from "react";

import styles from './result-error-user-not-exist.module.scss';
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const ResultErrorUserNotExist: FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    return (
        <div className={styles.container}>
            <Result
                status="error"
                title="Данные не сохранились"
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={
                    <Button
                        data-test-id='registration-retry-button'
                        type="primary"
                        key="console"
                        onClick={goBack}
                    >
                        Попробовать снова
                    </Button>
                }
            />
        </div>
    );
};