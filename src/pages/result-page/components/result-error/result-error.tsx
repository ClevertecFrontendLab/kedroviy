import { FC } from "react";

import styles from './result-error.module.scss';
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const ResultError: FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    return (
        <div className={styles.container}>
            <Result
                status="500"
                title="Что-то пошло не так"
                subTitle="Произошла ошибка, попробуйте отправить форму ещё раз."
                extra={
                    <Button
                        data-test-id='registration-retry-button'
                        type="primary"
                        onClick={goBack}
                    >
                        Назад
                    </Button>
                }
            />
        </div>
    );
};