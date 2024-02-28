import { FC } from "react";

import styles from './result-error-check-email.module.scss';
import { Button, Result } from "antd";
import { revertAll } from "@redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ResultErrorCheckMail: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goBack = () => {
        dispatch(revertAll())
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
                        data-test-id='check-back-button'
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