'use client';

import { Input } from 'antd';
import styles from './InfoForm.module.scss';
import { useRef, useState } from 'react';
import './InfoForm.scss';

export default function InfoBox({ list, defaultForm, defaultEmpty, submit, props }) {
  const [originForm, setOriginForm] = useState({});
  const [originEmpty, setOriginEmpty] = useState({});
  const [form, setForm] = defaultForm && defaultForm.form && defaultForm.setForm ? [defaultForm.form, defaultForm.setForm] : [originForm, setOriginForm];
  const [empty, setEmpty] =
    defaultEmpty && defaultEmpty.empty && defaultEmpty.setEmpty ? [defaultEmpty.empty, defaultEmpty.setEmpty] : [originEmpty, setOriginEmpty];
  const formList = list || [];
  const isSubmit = useRef(false);

  const submitForm = async () => {
    if (isSubmit.current) {
      return;
    }
    isSubmit.current = true;
    const empty = {};
    formList.forEach((item) => {
      if (item.require && !form[item.key]) {
        empty[item.key] = true;
      } else {
        if (item.rules) {
          for (let rule of item.rules) {
            if (form[item.key] && rule.pattern && !rule.pattern.test(form[item.key])) {
              empty[item.key] = rule.message;
              break;
            } else if (form[item.key] && rule.function && !rule.function(form[item.key])) {
              empty[item.key] = rule.message;
              break;
            }
          }
        }
      }
    });
    setEmpty(empty);
    if (Object.keys(empty).length) {
      isSubmit.current = false;
      return;
    }
    submit &&
      submit(form, () => {
        isSubmit.current = false;
      });
  };

  return (
    <>
      <main className={styles.infoForm}>
        <div className={styles.infoForm_main}>
          <div className={`${styles.infoForm_form} ${props?.customClassName}`}>
            {formList.map((item) => (
              <div className={styles.form_item} key={item.key}>
                <span className={`${styles.form_item_label} ${item.require && styles.form_item_label_require} infoForm_custom_label`}>{item.label}：</span>
                {item.noExtra ? (
                  <>
                    <div
                      className={`${styles.form_item_enter} ${!item.extra && styles.form_item_enter_noExtra_pc}  ${
                        !(item.button || item.tip) && styles.form_item_enter_noExtra
                      }  infoForm_custom_input`}
                    >
                      {item.component !== undefined ? (
                        item.component
                      ) : (
                        <Input
                          className={`${styles.form_item_input} ${empty[item.key] && styles.form_item_input_empty}`}
                          placeholder={item.placeholder || ''}
                          onChange={(e) => {
                            setEmpty({ ...empty, [item.key]: false });
                            setForm({ ...form, [item.key]: e.target.value });
                          }}
                          value={form[item.key]}
                          disabled={item.disabled}
                        ></Input>
                      )}
                      {empty[item.key] && <span className={styles.form_item_warning}>{empty[item.key] === true ? item.placeholder : empty[item.key]}</span>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`${styles.form_item_enter}  ${!(item.button || item.tip) && styles.form_item_enter_noExtra}  infoForm_custom_input`}>
                      {item.component !== undefined ? (
                        item.component
                      ) : (
                        <Input
                          className={`${styles.form_item_input} ${empty[item.key] && styles.form_item_input_empty}`}
                          placeholder={item.placeholder || ''}
                          onChange={(e) => {
                            setEmpty({ ...empty, [item.key]: false });
                            setForm({ ...form, [item.key]: e.target.value });
                          }}
                          value={form[item.key]}
                          disabled={item.disabled}
                        ></Input>
                      )}
                      {empty[item.key] && <span className={styles.form_item_warning}>{empty[item.key] === true ? item.placeholder : empty[item.key]}</span>}
                    </div>
                    <div className={`${styles.form_item_input_extra} ${!(item.button || item.tip) && styles.form_item_input_extra_noData}`}>
                      {[
                        item.button && (
                          <span
                            className={styles.form_item_input_button}
                            key={'button'}
                            onClick={() => {
                              item.button?.callback ? item.button.callback() : console.log('no button');
                            }}
                          >
                            {item.button?.text}
                          </span>
                        ),
                        <span className={styles.form_item_input_tip} key={'tip'}>
                          {item.tip}
                        </span>
                      ]}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className={styles.infoForm_option}>
            <div className={styles.option_btn_submit} onClick={submitForm}>
              提交
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
