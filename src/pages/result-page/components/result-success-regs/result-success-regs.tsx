import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

import styles from './result-success-regs.module.scss';

export const ResultSuccessRegistration: FC = () => {
    const navigate = useNavigate()

    const onHandle = () => {
        navigate('/auth')
    }

    return (
        <div className={styles.container}>
            <Result
                status="success"
                title="Регистрация успешна"
                subTitle="Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль."
                extra={
                    <Button
                        data-test-id='registration-enter-button'
                        type="primary"
                        key="console"
                        onClick={onHandle}
                    >
                        Войти
                    </Button>
                }
            />
        </div>
    );
};