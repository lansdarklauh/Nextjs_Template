import Link from 'next/link';
import styles from './extra.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound_main}>
        <img className={styles.notFound_img} src='/imgs/confused.png' alt='404' />
        <div className={styles.notFound_info}>
          <p className={styles.notFound_text}>抱歉，您访问的页面不存在</p>
          <Link href={'/'} className={styles.notFound_back}>
            返回首页&gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
