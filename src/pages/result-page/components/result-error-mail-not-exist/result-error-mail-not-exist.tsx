import { FC } from "react";
import { Button, Result } from "antd";

import styles from './result-error-mail-not-exist.module.scss';
import { revertAll } from "@redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ResultErrorCheckMailNotExist: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => {
        dispatch(revertAll())
        navigate(-1)
    };
    return (
        <div className={styles.container}>
            <Result
                status="error"
                title="Такой e-mail не зарегистрирован"
                subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
                extra={
                    <Button
                        data-test-id='check-retry-button'
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
