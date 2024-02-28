import { FC, useState } from 'react';
import { AppDispatch } from '@redux/configure-store';
import { useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Input, Menu, MenuProps } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

import { authUser, checkEmailStore } from '@redux/authSlice';
import styles from './auth-login.module.scss';
import { getServerMessage } from './constants';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

export const AuthLogin: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = useForm();
    const [validateErrors, setValidateErrors] = useState<boolean>(true);

    const onEmailChange = async () => {
        try {
            await form.validateFields(['email']);
            setValidateErrors(true);
        } catch (error: any) {
            setValidateErrors(false);
        }
    };

    const onFinish = async (user: { email: string; password: string }) => {
        const { remember, ...dataToSend } = user;
        const actionResult = await dispatch(authUser(dataToSend));
        const rememberCheckbox = form.getFieldValue('remember');

        if (authUser.fulfilled.match(actionResult)) {
            if (rememberCheckbox) {
                localStorage.setItem('token', actionResult?.payload?.accessToken);
                navigate('/main');
            } else {
                sessionStorage.setItem("sessionToken", actionResult?.payload?.accessToken);
                navigate('/main');
            }

        } else if (authUser.rejected.match(actionResult)) {
            navigate('/result/error-login');
        }
    };

    const onCheckEmail = async (user: { email: string }) => {
        const actionResult = await dispatch(checkEmailStore(user));

        if (checkEmailStore.fulfilled.match(actionResult)) {
            navigate('/auth/confirm-email');
        } else if (checkEmailStore.rejected.match(actionResult)) {
            
            if (actionResult?.payload?.statusCode === 404 && actionResult?.payload?.message !== 'Email не найден') {
                navigate('/result/error-check-email');
            } else {
                switch (actionResult?.payload?.statusCode as number) {
                    case 400:
                        navigate('/result/error-login');
                        break;
                    case 401:
                        navigate('/result/error-login');
                        break;
                    case 404:
                        navigate('/result/error-check-email-no-exist');
                        break;
                    case 409:
                        navigate('/result/error-check-email-no-exist');
                        break;
                    default:
                        navigate('/result/error-check-email-no-exist');
                        break;
                }
            }
        }
    }

    const handleClickEventCheckMail = async () => {
        const email = form.getFieldValue('email');

        if (email) {
            await onCheckEmail({ email });
        }
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
                <Menu selectedKeys={['auth']} mode="horizontal" items={items} />
                <Form
                    name="auth_form"
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 26 }}
                    className={styles.container__form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
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
                        <Input data-test-id='login-email' addonBefore="email:" onChange={onEmailChange} />
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
                    >
                        <Input.Password data-test-id='login-password' placeholder="Пароль" />
                    </Form.Item>
                    <div className={styles.auth__checkarea}>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox data-test-id='login-remember' >Запомнить меня</Checkbox>
                        </Form.Item>
                        <Form.Item<FieldType>>
                            <Button
                                data-test-id='login-forgot-button'
                                type="link"
                                disabled={!validateErrors}
                                onClick={handleClickEventCheckMail}
                            >
                                Забыли пароль?
                            </Button>
                        </Form.Item>
                    </div>
                    <Button
                        data-test-id='login-submit-button'
                        type="primary"
                        className={`${styles.button} ${styles.primary}`}
                        htmlType="submit"
                    >
                        Войти
                    </Button>
                    <Button
                        icon={<GooglePlusOutlined />}
                        className={styles.button}
                    >
                        Войти через Google
                    </Button>
                </Form>
            </div>
        </div>
    );
};
