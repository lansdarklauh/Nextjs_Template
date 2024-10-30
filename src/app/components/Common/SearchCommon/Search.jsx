'use client';

import { useRouter } from 'next/navigation';
import styles from '../Common.module.scss';
import SearchBar from './SearchBar';
import SearchMenu from './SearchMenu';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function SearchCommon({ showSearchMenu, link, onSearch, onSelected, kw, option, menuList }) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const search = (value) => {
    if (onSearch) {
      onSearch(value);
    } else if (link) {
      const params = link.params || {};
      const url = (link.url || '') + `?kw=${value}` + `&pageIndex=${params.pageIndex || 1}`;
      router.push(url);
    }
  };

  return (
    <main className={styles.search}>
      <SearchBar
        onSearch={(value) => {
          search(value);
        }}
        kw={kw || ''}
        option={option || {}}
      />
      {showSearchMenu && (
        <>
          <div className={styles.search_menu} style={{ display: menu ? 'block' : '' }}>
            <span
              className={styles.search_menu_mobile_close}
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <CloseOutlined />
            </span>
            <SearchMenu
              menuList={menuList}
              search={(obj) => {
                onSelected(obj);
              }}
            ></SearchMenu>
          </div>
          <div
            className={styles.search_menu_mobile_btn}
            onClick={() => {
              setMenu(!menu);
            }}
          >
            展开筛选项
          </div>
        </>
      )}
    </main>
  );
}
