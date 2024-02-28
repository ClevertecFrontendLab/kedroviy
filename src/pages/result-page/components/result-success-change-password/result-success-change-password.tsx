import { FC } from "react";
import { useDispatch } from "react-redux";

import styles from './result-success-change-password.module.scss';
import { Button, Result } from "antd";
import { revertAll } from "@redux/authSlice";
import { useNavigate } from "react-router-dom";

export const ResultSuccessChangePassword: FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/auth')
    };

    return (
        <div className={styles.container}>
            <Result
                status="success"
                title="Пароль успешно изменен"
                subTitle="Теперь можно войти в аккаунт, используя свой логин и новый пароль"
                extra={
                    <Button
                        data-test-id='change-entry-button'
                        type="primary"
                        onClick={goBack}
                    >
                        Вход
                    </Button>
                }
            />
        </div>
    );
};