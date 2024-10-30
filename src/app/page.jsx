import Link from 'next/link';
import styles from './page.module.scss';
import Banner from './components/Common/Banner/Banner';

import Name from '@/assets/imgs/name.png';
import { BannerList } from '@/utils/const';

export default async function Home() {
  let list = [
    {
      label: '框架',
      value: 'React + Nextjs'
    },
    {
      label: 'UI库',
      value: 'Ant-Design'
    },
    {
      label: 'CSS预处理',
      value: 'Sass'
    },
    {
      label: '开发语言',
      value: 'JavaScript'
    },
    {
      label: '网络请求',
      value: 'fetch'
    },
    {
      label: '状态管理',
      value: 'redux-toolkit'
    },
    {
      label: '其他',
      value: 'px2rem、Dayjs、wangEditor、……'
    }
  ];
  let imgList = [...BannerList];
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <Link href={'/form'}>Nextjs 模板</Link>
        </h1>
        <p className={styles.description}>
          该模板基于React18和Nextjs14开发，内置Ant-Design和Sass，用px2rem实现自适应效果，可用于构建Nextjs项目（SSR），包括官网，资讯网站，表单交互等
        </p>
        <ul className={styles.list}>
          {list.map((item) => (
            <li className={styles.item} key={item.label}>
              <span className={styles.label}>{item.label}：</span>
              <span className={styles.value}>{item.value}</span>
            </li>
          ))}
        </ul>
        <div className={styles.author}>
          <div className={styles.carousel}>
            <Banner list={imgList}></Banner>
          </div>
          <p className={styles.name}>
            作者：
            <img className={styles.name_img} src={Name.src} alt='Teager' />
          </p>
          <p className={styles.website}>
            主页：
            <Link target='_blank' className={styles.web_content} href='https://github.com/lansdarklauh'>
              https://github.com/lansdarklauh
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
