import { FC } from "react";
import { Result, Button } from "antd";

import styles from './result-user-exist.module.scss';
import { useNavigate } from "react-router-dom";

export const ResultUserExist: FC = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className={styles.container}>
            <Result
                status="error"
                title="Данные не сохранились"
                subTitle="Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail."
                extra={
                    <Button
                        data-test-id='registration-back-button'
                        type="primary"
                        key="console"
                        onClick={goBack}
                    >
                        Назад к регистрации
                    </Button>
                }
            />
        </div>
    );
};