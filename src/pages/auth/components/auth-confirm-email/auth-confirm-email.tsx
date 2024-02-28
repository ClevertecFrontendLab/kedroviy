import { FC, useState } from "react";
import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VerificationInput from "react-verification-input";

import { confirmEMailStore } from "@redux/authSlice";
import styles from './auth-confirm-email.module.scss';

const { Text } = Typography;

export const AuthConfirmEMail: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.authSlice);
    const [isCodeValid, setIsCodeValid] = useState<boolean>(true);
    const [code, setCode] = useState<any>(null);

    const onSendCode = async (code: any) => {
        if (user?.email) {
            try {
                const userProperty = { email: user?.email, code };
                const actionResult = await dispatch(confirmEMailStore(userProperty));

                if (confirmEMailStore.fulfilled.match(actionResult)) {
                    navigate('/auth/change-password');
                }
            } catch (error) {
                setIsCodeValid(false);
                setCode(null);
            }
        }
    }

    return (
        <div className={styles.container}>
            <Result
                title="Введите код для восстановления аккауанта"
                subTitle='Мы отправили вам на e-mail victorbyden@gmail.com шестизначный код. Введите его в поле ниже.'
            />
            <VerificationInput
                inputProps={{ 'data-test-id': 'verification-input' }}
                onComplete={onSendCode}
                validChars='0-9'
                classNames={isCodeValid ? {
                    container: "input--container",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                    characterFilled: "character--filled",
                } : {
                    container: "input--container",
                    character: "error",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                    characterFilled: "character--filled",
                }}
                placeholder=''
                value={code}
            />
            <Text type="secondary">Не пришло письмо? Проверьте папку Спам.</Text>
        </div>
    );
};