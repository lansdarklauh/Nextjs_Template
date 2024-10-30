'use client';

import { Carousel } from 'antd';
import styles from '../Common.module.scss';
import { useState } from 'react';
import { ClickAdvert } from '@/service/common';

export default function Banner({ list }) {
  const bannerList = list || [];
  const [loading, setLoading] = useState(false);

  const handleLink = async (id) => {
    if (loading) return;
    setLoading(true);
    const res = await ClickAdvert({ id: id });
    if (res?.code === 0 && res.data) {
      window.open(res.data);
    }
    setLoading(false);
  };

  return (
    <>
      {bannerList && bannerList.length ? (
        <Carousel autoplay adaptiveHeight dots={bannerList.length > 1}>
          {bannerList.map((item) => (
            <main
              className={styles.banner}
              key={item.id}
              onClick={() => {
                handleLink(item.id);
              }}
            >
              <img className={styles.banner_img_full} src={item.imageFile} alt='' />
              <img className={styles.banner_img_full_mobile} src={item.imageFile2} alt='' />
              <div className={styles.banner_main_full}>
                <h1 className={styles.banner_title}>{item.title}</h1>
                <p className={styles.banner_desc}>{item.desc}</p>
              </div>
            </main>
          ))}
        </Carousel>
      ) : null}
    </>
  );
}
