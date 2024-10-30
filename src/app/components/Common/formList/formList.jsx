import { Button, ConfigProvider, DatePicker, Input, Upload } from 'antd';
import dynamic from 'next/dynamic';
import styles from '../Common.module.scss';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '@/utils';
const EditorComponent = dynamic(() => import('@/app/components/Common/Editor/Editor'), { ssr: false });
const { TextArea } = Input;

export default function FormList({ form, defaultValue, onChange, hasAudit }) {
  const [formList, setFormList] = useState(form || []);
  const [value, setValue] = useState(defaultValue || {});
  const [error, setError] = useState({});
  useEffect(() => {
    const obj = {};
    formList &&
      formList.forEach((item) => {
        if (item.rules) {
          item.rules.forEach((rule) => {
            if (rule.required && !value[item.name]) {
              obj[item.name] = rule.message;
            } else if (rule.function) {
              const result = rule.function(value[item.name]);
              obj[item.name] = result ? rule.message : '';
            } else if (rule.pattern) {
              const result = rule.pattern.test(value[item.name]) ? '' : rule.message;
              obj[item.name] = result;
            }
          });
        }
      });
    setError(obj);
    onChange && onChange(value, obj);
  }, [formList, defaultValue]);

  useEffect(() => {
    setFormList(form);
    setValue(defaultValue);
  }, [form, defaultValue]);
  return (
    <div className={styles.form_list}>
      {formList.map((item, index) => {
        return (
          <div className={styles.form_input} key={item.name}>
            <div style={{ width: item.width || '100%' }} className={styles.form_input_main}>
              {!!item.label && (
                <label style={{ width: item.labelWidth || '15%' }} className={styles.form_label}>
                  {item.label}：
                </label>
              )}
              <div style={{ flex: '1' }} className={`${error[item.name] ? styles.error_input : ''}`}>
                {(() => {
                  switch (item.type) {
                    case 'text':
                      return (
                        <Input
                          key={index}
                          name={item.name}
                          value={value[item.name]}
                          disabled={hasAudit && value.id}
                          {...item.props}
                          onChange={(e) => {
                            const newValue = { ...value, [item.name]: e.target.value };
                            setValue(newValue);
                            item.rules.forEach((rule) => {
                              if (rule.required && !newValue[item.name]) {
                                setError({ ...error, [item.name]: rule.message });
                              } else if (rule.function) {
                                const result = rule.function(newValue[item.name]);
                                setError({ ...error, [item.name]: result ? rule.message : '' });
                              } else if (rule.pattern) {
                                const result = rule.pattern.test(newValue[item.name]) ? '' : rule.message;
                                setError({ ...error, [item.name]: result });
                              }
                            });
                            onChange && onChange(newValue, error);
                          }}
                        />
                      );
                    case 'textArea':
                      return (
                        <TextArea
                          key={index}
                          name={item.name}
                          value={value[item.name]}
                          disabled={hasAudit && value.id}
                          {...item.props}
                          onChange={(e) => {
                            const newValue = { ...value, [item.name]: e.target.value };
                            setValue(newValue);
                            item.rules.forEach((rule) => {
                              if (rule.required && !newValue[item.name]) {
                                setError({ ...error, [item.name]: rule.message });
                              } else if (rule.function) {
                                const result = rule.function(newValue[item.name]);
                                setError({ ...error, [item.name]: result ? rule.message : '' });
                              } else if (rule.pattern) {
                                const result = rule.pattern.test(newValue[item.name]) ? '' : rule.message;
                                setError({ ...error, [item.name]: result });
                              }
                            });
                            onChange && onChange(newValue, error);
                          }}
                        />
                      );
                    case 'richText':
                      return (
                        <EditorComponent
                          key={index}
                          name={item.name}
                          onChange={(value) => {
                            const newValue = { ...value, [item.name]: e.target.value };
                            setValue(newValue);
                            item.rules.forEach((rule) => {
                              if (rule.required && !newValue[item.name]) {
                                setError({ ...error, [item.name]: rule.message });
                              } else if (rule.function) {
                                const result = rule.function(newValue[item.name]);
                                setError({ ...error, [item.name]: result ? rule.message : '' });
                              } else if (rule.pattern) {
                                const result = rule.pattern.test(newValue[item.name]) ? '' : rule.message;
                                setError({ ...error, [item.name]: result });
                              }
                            });
                            onChange && onChange(newValue, error);
                          }}
                          defaultValue={value[item.name] || ''}
                          disabled={hasAudit && value.id}
                          {...item.props}
                          editorParams={{
                            placeholder:
                              '支持插入JPEG/GIF/PNG图片，限1000个中文字符。为了更好的展示您发布的信息，建议您在粘贴内容到编辑器时，使用【右键】点击编辑器输入框空白处，选择菜单中的【粘贴为纯文本】，再根据需要手动调整样式，例如：加粗标题，调整段落间距等。',
                            maxLength: 1000,
                            MENU_CONF: {
                              uploadImage: {
                                server: '',
                                maxFileSize: 5 * 1024 * 1024,
                                maxNumberOfFiles: 10,
                                onBeforeUpload(file) {
                                  if (file.size / 1024 / 1024 > 5) {
                                    message.error('图片大小不能超过 5MB!');
                                    return false;
                                  }
                                  return file;
                                },
                                customUpload: async (file, insertFn) => {
                                  getBase64(file, async (url) => {
                                    const formData = new FormData();
                                    formData.append('imagedata', url);
                                    formData.append('operation', 101);
                                    formData.append('random', signature.current[0]);
                                    formData.append('timestamp', signature.current[1]);
                                    formData.append('signature', signature.current[2]);
                                    try {
                                      const res = await UploadImg(formData);
                                      if (res && res.Code === 0 && res.Message) {
                                        message.success('上传成功');
                                        const srcUrl = (process.env.NEXT_PUBLIC_UPLOAD_IMG_API || '') + res.Message;
                                        insertFn(srcUrl, '', '');
                                      } else {
                                        message.error(res.Message);
                                      }
                                    } catch (error) {
                                      console.log(error);
                                      message.error(JSON.stringify(error));
                                    }
                                  });
                                }
                              }
                            }
                          }}
                          toolbarParams={{
                            toolbarKeys: [
                              'bold',
                              'italic',
                              '|',
                              {
                                key: 'group-image',
                                title: '图片',
                                iconSvg:
                                  '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
                                menuKeys: ['insertImage', 'uploadImage']
                              },
                              '|',
                              'undo',
                              'redo'
                            ]
                          }}
                        />
                      );
                    case 'image':
                      const imageChild = (
                        <Upload
                          name='avatar'
                          listType='picture-card'
                          showUploadList={false}
                          accept={item.accept || 'image/jpeg,image/png,image/jpg'}
                          style={{
                            width: '5rem'
                          }}
                          disabled={hasAudit && value.id}
                          {...item.props}
                          beforeUpload={(file) => {
                            const isLt5M = file.size / 1024 / 1024 < (item.maxSize || 5);
                            if (!isLt5M) {
                              message.error(`图片大小不能超过 ${item.maxSize || 5}MB!`);
                            }
                            return isLt5M;
                          }}
                          onChange={(info) => {
                            if (info.file.status === 'uploading') {
                              return;
                            }
                            if (info.file.status === 'done') {
                              // Get this url from response in real world.
                              getBase64(info.file.originFileObj, (url) => {
                                const newValue = { ...value, [item.name]: { url: url, file: info.file.originFileObj } };
                                setValue(newValue);
                                onChange && onChange(newValue, error);
                              });
                            }
                          }}
                        >
                          {value[item.name]?.url ? (
                            <img
                              src={value[item.name]?.url || ''}
                              alt={item.name}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }}
                            />
                          ) : (
                            <button
                              style={{
                                border: 0,
                                background: 'none'
                              }}
                              type='button'
                            >
                              <PlusOutlined />
                              <div
                                style={{
                                  marginTop: '0.8rem'
                                }}
                              >
                                {item.buttonText || '上传图片'}
                              </div>
                            </button>
                          )}
                        </Upload>
                      );

                      return item.crop ? (
                        <ImgCrop zoomSlider aspect={item.aspect || 1 / 1} modalOk='确定' modalCancel='取消'>
                          {imageChild}
                        </ImgCrop>
                      ) : (
                        <>{imageChild}</>
                      );
                    case 'images':
                      const multiImageChild = (
                        <Upload
                          name='images'
                          listType='picture-card'
                          style={{
                            width: '5rem'
                          }}
                          accept={item.accept || 'image/jpeg,image/png,image/jpg'}
                          fileList={value[item.name] || []}
                          beforeUpload={(file) => {
                            const isLt10M = file.size / 1024 / 1024 < (value[item.name] || 5);
                            if (!isLt10M) {
                              message.error(`图片大小不能超过 ${value[item.name] || 5}MB!`);
                            }
                            return isLt10M;
                          }}
                          disabled={hasAudit && value.id}
                          {...item.props}
                          onChange={({ file, fileList }) => {
                            const getFileListUrl = (fileList, cb) => {
                              const list = [];
                              let index = 0;
                              fileList.forEach((item) => {
                                if (item.url) {
                                  list.push(item);
                                  index++;
                                  if (index === fileList.length) {
                                    cb && cb(list);
                                  }
                                } else {
                                  getBase64(item.originFileObj, (url) => {
                                    list.push({ url, uid: file.uid, file: item.originFileObj });
                                    index++;
                                    if (index === fileList.length) {
                                      cb && cb(list);
                                    }
                                  });
                                }
                              });
                            };
                            getFileListUrl(fileList, (list) => {
                              const newValue = { ...value, [item.name]: list };
                              setValue(newValue);
                              onChange && onChange(newValue, error);
                            });
                          }}
                        >
                          {value[item.name]?.length >= (item.maxNum || 5) ? null : (
                            <button
                              style={{
                                border: 0,
                                background: 'none',
                                padding: '0.5rem'
                              }}
                              type='button'
                            >
                              <PlusOutlined />
                              <div
                                style={{
                                  marginTop: '0.8rem'
                                }}
                              >
                                上传图片
                              </div>
                            </button>
                          )}
                        </Upload>
                      );

                      return item.crop ? (
                        <ImgCrop zoomSlider aspect={item.aspect || 1 / 1} modalOk='确定' modalCancel='取消'>
                          {multiImageChild}
                        </ImgCrop>
                      ) : (
                        <>{multiImageChild}</>
                      );
                    case 'file':
                      return (
                        <Upload
                          name='file'
                          style={{
                            width: '5rem'
                          }}
                          accept={item.accept || '.doc,.docx,.ppt,.pptx,.pdf'}
                          maxCount={item.maxNum || 1}
                          fileList={value[item.name] || []}
                          beforeUpload={(file) => {
                            const isLt5M = file.size / 1024 / 1024 < item.maxSize || 30;
                            if (!isLt5M) {
                              message.error(`文件1大小不能超过 ${item.maxSize}MB!`);
                            }
                            return isLt5M;
                          }}
                          disabled={hasAudit && value.id}
                          {...item.props}
                          onChange={(info) => {
                            if (info.fileList.length === 0) {
                              setValue({ ...value, [item.name]: [] });
                              return;
                            }
                            setValue({ ...value, [item.name]: info.fileList });
                          }}
                        >
                          <Button icon={<UploadOutlined />}>{item.placeholder}</Button>
                        </Upload>
                      );
                    case 'custom':
                      return item.component;
                    default:
                      return null;
                  }
                })()}
              </div>
              {item.extra && <div style={{ width: item.extra.width || '20%' }}>{item.extra.content}</div>}
            </div>
            {error[item.name] && (
              <p style={{ marginLeft: `calc(${item.labelWidth || '15%'} + 1rem)` }} className={styles.error_tip}>
                {error[item.name]}
              </p>
            )}
            {item.tip && <p className={styles.extra_tip}>{item.tip}</p>}
          </div>
        );
      })}
    </div>
  );
}
