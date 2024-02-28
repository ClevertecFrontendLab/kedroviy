import { FC, useState } from 'react';
import { Button, Form, Input, Menu, MenuProps } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '@redux/authSlice';
import { AppDispatch } from '@redux/configure-store';
import { helpMessage } from '@pages/auth/constants';
import { getErrorMessage } from './constants';
import styles from './auth-registration.module.scss';

export const AuthRegistration: FC = () => {
    const [form] = useForm();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [validateErrors, setValidateErrors] = useState<boolean>();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const onEmailChange = async () => {
        try {
            await form.validateFields(['email']);
            setValidateErrors(true);
        } catch (error: any) {
            setValidateErrors(false)
        }
    };

    const validatePasswords = (_: any, values: any) => {
        const { password, confirm } = values;
        const isValid = password && confirm && password === confirm;
        setIsDisabled(!isValid);
    };

    const onFinish = async (user: { email: string; password: string }) => {
        const actionResult = await dispatch(registerUser(user));
        if (registerUser.fulfilled.match(actionResult)) {
            navigate('/result/success');
        } else if (registerUser.rejected.match(actionResult)) {
            switch (actionResult.payload?.statusCode as number) {
                case 409:
                    navigate('/result/error-user-exist');
                    break;
                default:
                    navigate('/result/error-user-exist');
                    break;
            }
        }
    };

    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="auth">
                    Вход
                </Link>
            ),
            key: 'auth',
        },
        {
            label: (
                <Link to="registration">
                    Регистрация
                </Link>
            ),
            key: 'registration',
        },
    ];

    return (
        <div className={styles.auth}>
            <div className={styles.auth__logotype}>
                <img src="../../../assets/auth-logo.png" alt="logotype" />
            </div>
            <div className={styles.auth__form}>
                <Menu selectedKeys={['registration']} mode="horizontal" items={items} />
                <Form
                    name="reg_form"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onValuesChange={validatePasswords}
                    scrollToFirstError
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: '',
                            },
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input addonBefore="email:" onChange={onEmailChange} data-test-id='registration-email' />
                    </Form.Item>
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
                        <Input.Password placeholder="Пароль" data-test-id='registration-password' />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
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
                        <Input.Password placeholder="Повторить пароль" data-test-id='registration-confirm-password' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={`${styles.button} ${styles.primary}`}
                            htmlType="submit"
                            disabled={isDisabled}
                            data-test-id='registration-submit-button'
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button icon={<GooglePlusOutlined />} className={styles.button}>
                            Войти через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
