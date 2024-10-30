'use client';

import { useEffect, useState } from 'react';
import styles from '../Common.module.scss';
import { searchMenuList } from '@/utils/const';
import { Select } from 'antd';

export default function SearchMenu({ menuList, search }) {
  const [list, setList] = useState(menuList || searchMenuList);
  const [expandList, setExpandList] = useState({});
  const [selected, setSelected] = useState({});

  const selectParent = (parent, title) => {
    const tempExpandList = { ...expandList };
    const tempSelected = { ...selected };
    tempSelected[title] = [parent.value];
    tempExpandList[title] = [];
    if (parent.children && parent.children.length > 0) {
      tempExpandList[title] = [parent.children];
    } else {
      const obj = tempSelected;
      search(obj);
    }
    setExpandList(tempExpandList);
    setSelected(tempSelected);
  };

  const selectChild = (child, parentIndex, title) => {
    const tempExpandList = { ...expandList };
    const tempSelectedList = { ...selected };
    const tempList = tempExpandList[title];
    const tempSelected = tempSelectedList[title];
    if (tempList.length > parentIndex + 1) {
      tempList.splice(parentIndex + 1);
      tempSelected.splice(parentIndex + 1);
    } else {
      tempSelected.splice(parentIndex + 1);
    }
    if (child.children && child.children.length > 0) {
      tempList.push(child.children);
      tempSelected.push(child.value);
    } else {
      tempSelected.push(child.value);
      const obj = tempSelectedList;
      search(obj);
    }
    setExpandList(tempExpandList);
    setSelected(tempSelectedList);
  };

  useEffect(() => {
    const tempList = menuList;
    const tempExpandList = {};
    const tempSelected = {};
    const getDefaultSelected = (list, key) => {
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.selected) {
          if (item.children && item.children.length) {
            if (tempExpandList[key]) {
              tempExpandList[key].push(item.children);
            } else {
              tempExpandList[key] = [item.children];
            }
          }
          if (tempSelected[key]) {
            tempSelected[key].push(item.value);
          } else {
            tempSelected[key] = [item.value];
          }
          if (item.children && item.children.length) {
            getDefaultSelected(item.children, key);
          }
          break;
        }
      }
    };
    tempList.forEach((item) => {
      getDefaultSelected(item.children, item.value);
    });
    setExpandList(tempExpandList);
    setSelected(tempSelected);
  }, []);

  return (
    <main className={styles.searchMenu}>
      <div className={styles.searchMenu_main}>
        {list.map((menu) => {
          switch (menu.type) {
            case 'menu':
              return (
                <div className={styles.searchMenu_class} key={menu.value}>
                  <span className={styles.searchMenu_class_title}>{menu.title}</span>
                  <div className={styles.searchMenu_class_content}>
                    <div className={styles.searchMenu_class_head}>
                      {menu.children.map((child) => {
                        return (
                          <span
                            className={`${styles.searchMenu_class_item} ${selected[menu.value]?.[0] === child.value ? styles.searchMenu_class_item_active : ''}`}
                            key={child.value}
                            onClick={() => {
                              selectParent(child, menu.value);
                            }}
                          >
                            {child.title}
                          </span>
                        );
                      })}
                    </div>
                    {expandList && expandList[menu.value] && expandList[menu.value].length > 0 ? (
                      <ul className={styles.class_list}>
                        {expandList[menu.value].map((expandItem, index) => {
                          return (
                            <li className={styles.class_item} key={index}>
                              {expandItem && expandItem.length
                                ? expandItem.map((item) => {
                                    return (
                                      <span
                                        className={`${styles.class_item_item} ${
                                          selected[menu.value]?.[index + 1] === item.value ? styles.class_item_item_active : ''
                                        }`}
                                        key={item.value}
                                        onClick={() => {
                                          selectChild(item, index, menu.value);
                                        }}
                                      >
                                        {item.title}
                                      </span>
                                    );
                                  })
                                : null}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                </div>
              );
            case 'select':
              return (
                <div className={`${styles.searchMenu_class} ${styles.searchMenu_class_center}`} key={menu.title}>
                  <span className={styles.searchMenu_class_title}>{menu.title}</span>
                  <div className={styles.searchMenu_class_select_list}>
                    {menu.children.map((child) => {
                      return (
                        <Select
                          className={styles.searchMenu_class_select_list_item}
                          showSearch
                          placeholder={child.label}
                          optionFilterProp='label'
                          onChange={() => {}}
                          key={child.label}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}
