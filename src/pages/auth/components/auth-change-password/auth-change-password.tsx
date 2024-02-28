import { FC, useState } from "react";
import { Button, Input, Form, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@redux/configure-store";
import { changePasswordStore } from "@redux/authSlice";
import styles from './auth-change-password.module.scss';
import { helpMessage } from "@pages/auth/constants";
import { getServerMessage } from "./constants";

const { Title } = Typography;

export const AuthChangePassword: FC = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const validatePasswords = (_: any, values: any) => {
        const { password, confirm } = values;
        const isValid = password && confirm && password === confirm;
        setIsDisabled(!isValid);
    };

    const onFinish = async (data: { password: string; confirmPassword: string }) => {
        const actionResult = await dispatch(changePasswordStore(data));
        if (changePasswordStore.fulfilled.match(actionResult)) {
            navigate('/result/success-change-password');
        } else if (changePasswordStore.rejected.match(actionResult)) {
            navigate(getServerMessage(actionResult?.payload?.statusCode as number));
        }
    };

    return (
        <div className={styles.container}>
            <Title level={3}>Восстановление аккауанта</Title>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onValuesChange={validatePasswords}
                autoComplete="off"
            >
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: '' },
                        { min: 8, message: '' },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: '',
                        }
                    ]}
                    help={helpMessage}
                    className={styles.custom_help_style}
                >
                    <Input.Password data-test-id='change-password' placeholder="Пароль" />
                </Form.Item>
                <Form.Item

                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        })
                    ]}
                >
                    <Input.Password data-test-id='change-confirm-password' placeholder="Повторить пароль" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button data-test-id='change-submit-button' type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};