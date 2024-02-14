import React, { ReactElement } from 'react';
import { Card } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import { orderText, mainText } from '../../constants';
import styles from './content-container.module.scss';

const { Meta } = Card;
export const ContentContainer: React.FC = () => {

    const stringFormat = (string: string): any => {
        const splitRegex = /(?<=[:;])/g;
        const parts = string.split(splitRegex);

        const formattedText = parts.map((part, index) => (
            <p>
                {part}{index < parts.length - 1 && <br />}
            </p>
        ));

        return formattedText
    };

    return (
        <>
            <div className={styles.content}>
                <div className={styles.content__row}>
                    <div className={`${styles.article} ${styles.order__text}`}>
                        {stringFormat(orderText)}
                    </div>
                </div>

                <div className={styles.content__row}>

                    <div className={styles.content__column}>
                        <div className={`${styles.article} ${styles.main__text}`}>
                            <p>
                                {mainText}
                            </p>
                        </div>
                        <div className={styles.controls}>
                            <div className={styles.card__container}>
                                <div>
                                    <p>Расписать тренировки</p>
                                </div>
                                <div className={styles.card}>
                                    <img
                                        src="../../../assets/favorite.png"
                                        alt="clevertfit logotype"
                                        width='14px'
                                        height='14px'
                                    />
                                    <span>Тренировки</span>
                                </div>
                            </div>

                            <div className={styles.card__container}>
                                <p>Назначить календарь</p>
                                <div className={styles.card}>
                                    <img
                                        src="../../../assets/calendar.png"
                                        alt="clevertfit logotype"
                                        width='14px'
                                        height='14px'
                                    />
                                    <span>Календарь</span>
                                </div>
                            </div>

                            <div className={styles.card__container}>
                                <p>Заполнить профиль</p>
                                <div className={styles.card}>
                                    <img
                                        src="../../../assets/profile.png"
                                        alt="clevertfit logotype"
                                        width='14px'
                                        height='14px'
                                    />
                                    <span>Профиль</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.footer}>
                    <button className={styles.reports}>
                        <a href="#">
                            Смотреть отзывы
                        </a>
                    </button>
                    <div>

                        <div className={styles.card__legasy}>
                            <div className={styles.legasy__header}>
                                <p>Скачать на телефон</p>
                                <p>Доступно в PRO-тарифе</p>
                            </div>
                            <div className={styles.legasy__controls}>
                                <div>
                                    <AndroidFilled key="android" />
                                    <span>Android OS</span>
                                </div>
                                <div>
                                    <AppleFilled key="apple" />
                                    <span>Apple iOS</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div >
        </>
    );
};
