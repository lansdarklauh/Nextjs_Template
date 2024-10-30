import { Carousel } from 'antd';
import styles from '../Common.module.scss';

export default function Banner({ list }) {
  const bannerList = list || [];

  return (
    <>
      {bannerList && bannerList.length ? (
        <Carousel autoplay adaptiveHeight key={'id'} dots={bannerList.length > 1}>
          {bannerList.map((item) => (
            <main className={styles.banner} key={item.id}>
              <img className={styles.banner_img} src={item.imageFile} alt='' />
              <img className={styles.banner_img_mobile} src={item.imageFile2 || item.imageFile} alt='' />
              <div className={styles.banner_main}>
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
