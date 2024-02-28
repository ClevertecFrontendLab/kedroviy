import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Menu, Button } from 'antd';

import styles from './mp-side-bar.module.scss';
import { useNavigate } from 'react-router-dom';

export const MPSideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigation = useNavigate();

    const onLogOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigation('/auth')
    };

    return (
        <div className={collapsed ? styles.menu__collapsed : styles.menu}>
            <div>
                <div className={collapsed ? styles.logotype__collapsed : styles.logotype}>
                    {collapsed ? <img
                        src="../../../assets/logo-collapsed.png"
                        alt="clevertfit logotype"
                        width='28px'
                        height='26px'
                    />
                        : <img
                            src="../../../assets/logoDefault.png"
                            alt="clevertfit logotype"
                            width='133px'
                            height='33px'
                        />}
                </div>
                <div className={styles.logotype__mobile}>
                    {!collapsed ? <img
                        src="../../../assets/logoDefault.png"
                        alt="clevertfit logotype"
                        width='72px'
                        height='18px'
                    /> : null}
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    inlineIndent={0}
                    style={{ cursor: 'pointer' }}
                    className={!collapsed ? styles.menu__container : styles.menu__collapsed__container}
                    items={[
                        {
                            key: '1',
                            icon: <img
                                src="../../../assets/calendar.png"
                                alt="clevertfit logotype"
                                width='16px'
                                height='16px'
                            />,
                            label: collapsed ? null : 'Календарь',
                        },
                        {
                            key: '2',
                            icon: <img
                                src="../../../assets/favorite.png"
                                alt="clevertfit logotype"
                                width='16px'
                                height='16px'
                            />,
                            label: collapsed ? null : 'Тренировки',
                        },
                        {
                            key: '3',
                            icon: <img
                                src="../../../assets/goals.png"
                                alt="clevertfit logotype"
                                width='16px'
                                height='16px'
                            />,
                            label: collapsed ? null : 'Достижения',
                        },
                        {
                            key: '4',
                            icon: <img
                                src="../../../assets/profile.png"
                                alt="clevertfit logotype"
                                width='16px'
                                height='16px'
                            />,
                            label: collapsed ? null : 'Профиль',
                        },
                    ]}
                />
                <div className={styles.exit}>
                        <Button onClick={onLogOut} style={{border: 'none'}}>
                            <img src="../../../assets/exit.png" alt="exit" />
                            {!collapsed ? <span>Выход</span> : null}
                        </Button> 
                </div>
            </div>
            <div>
                <Button
                    data-test-id='sider-switch'
                    type="text"
                    className={!collapsed ? styles.button : styles.button__collapsed}
                    icon={collapsed ?
                        <MenuUnfoldOutlined style={{ color: '#8C8C8C' }} />
                        : <MenuFoldOutlined style={{ color: '#8C8C8C' }} />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                />
                <Button
                    data-test-id='sider-switch-mobile'
                    type="text"
                    className={!collapsed ? styles.button__mobile : styles.button__mobile__collapsed}
                    icon={collapsed ?
                        <MenuUnfoldOutlined style={{ color: '#8C8C8C' }} />
                        : <MenuFoldOutlined style={{ color: '#8C8C8C' }} />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                />
            </div>
        </div>
    );
};
