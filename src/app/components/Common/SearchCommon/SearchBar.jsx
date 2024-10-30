'use client';

import { Input } from 'antd';
import styles from '../Common.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function SearchBar({ kw, onSearch, option }) {
  const [searchBarInfo, setSearchBarInfo] = useState({
    placeholder: option.placeholder || '搜索文档',
    buttonText: option.buttonText || '搜索'
  });
  const [key, setKey] = useState(kw || '');
  return (
    <main className={styles.searchBar}>
      <div className={styles.searchBar_main}>
        <Input
          variant='borderless'
          placeholder={searchBarInfo.placeholder}
          className={styles.searchBar_input}
          onChange={(e) => {
            setKey(e.target.value);
          }}
          value={key}
        />
        <span
          className={styles.searchBar_button}
          onClick={() => {
            onSearch && onSearch(key);
          }}
        >
          <span className={styles.searchBar_buttonText}>
            <SearchOutlined />
            {searchBarInfo.buttonText}
          </span>
        </span>
      </div>
    </main>
  );
}
