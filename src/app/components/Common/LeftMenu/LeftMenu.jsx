'use client';

import styles from '../Common.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { personMenuList } from '@/utils/const';

export default function LeftMenu(props) {
  const pathname = usePathname();
  const router = useRouter();

  const menuList = personMenuList || [];

  return (
    <main className={styles.leftMenu}>
      <ul className={styles.leftMenu_list}>
        {menuList.map((menu) => (
          <li className={styles.leftMenu_item} key={menu.id}>
            <ul className={styles.leftMenu_subList}>
              {menu.children.map((menuItem) => (
                <li
                  className={`${styles.leftMenu_subItem} ${menuItem.link.indexOf(pathname) !== -1 && styles.leftMenu_subItem_active}`}
                  key={menuItem.id}
                  onClick={() => {
                    router.push(menuItem.link);
                  }}
                >
                  {menuItem.label}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
