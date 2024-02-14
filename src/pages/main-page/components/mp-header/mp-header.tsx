import React from 'react';
import { Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { headerText } from '../../constants';
import styles from './mp-header.module.scss';

export const MPHeader: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.container__column}>
                <Breadcrumb separator="">
                    <Breadcrumb.Item>Главная</Breadcrumb.Item>
                </Breadcrumb>
                <h1>{headerText}</h1>
            </div>
            <div className={styles.container__settings}>
                <div className={styles.container__controls}>
                    <SettingOutlined />
                    <span>Настройки</span>
                </div>
            </div>
        </div>
    );
};
