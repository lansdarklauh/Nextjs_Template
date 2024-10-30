'use client';

import { useEffect, useState } from 'react';
import styles from '../Common.module.scss';
import { phoneArea } from '@/utils/const';

export default function LoginForm({ list, defaultForm }) {
  const [originForm, setOriginForm] = useState({});
  const [form, setForm] = defaultForm && defaultForm.form && defaultForm.setForm ? [defaultForm.form, defaultForm.setForm] : [originForm, setOriginForm];

  const formList = list;

  useEffect(() => {
    setForm({ ...form, areaCode: '86' });
  }, []);

  return (
    <>
      <div className={styles.login_box_form}>
        {formList.map((item) =>
          !item.hidden ? (
            <div className={styles.form_box} key={item.key}>
              {item.showArea && (
                <select
                  className={styles.form_input_select}
                  value={form.areaCode}
                  onChange={(e) => {
                    setForm({ ...form, areaCode: e.target.value });
                  }}
                >
                  {phoneArea.map((area) => (
                    <option value={area.key} key={area.key}>
                      {area.value}
                    </option>
                  ))}
                </select>
              )}
              <input
                className={styles.form_input}
                placeholder={item.placeholder || '请输入'}
                type={item.type || 'text'}
                value={form[item.key] || ''}
                onChange={(e) => {
                  setForm({ ...form, [item.key]: e.target.value });
                }}
              />
              {item.button && (
                <span className={styles.login_link} onClick={item.button.onClick}>
                  {item.button.text || '按钮'}
                </span>
              )}
            </div>
          ) : null
        )}
      </div>
    </>
  );
}
