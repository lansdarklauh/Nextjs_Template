'use client';

import Link from 'next/link';
import styles from './form.module.scss';
import InfoForm from '@/app/components/Common/InfoForm/InfoForm';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import Name from '@/assets/imgs/name.png';
import { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Button, Input, Upload } from 'antd';
import EditorComponent from '@/app/components/Common/Editor/Editor';

export default function Form() {
  const [form, setForm] = useState({});
  const [empty, setEmpty] = useState({});
  const [richText, setRichText] = useState('');

  const list = [
    {
      key: 'logo',
      label: '上传图片',
      require: true,
      placeholder: '请上传图片',
      component: [
        <div className={styles.form_item_upload} key={0}>
          <ImgCrop zoomSlider aspect={1 / 1} modalOk='确定' modalCancel='取消'>
            <Upload
              name='avatar'
              listType='picture-card'
              showUploadList={false}
              accept='image/*'
              style={{
                width: '5rem'
              }}
              beforeUpload={(file) => {
                const isLt5M = file.size / 1024 / 1024 < 1;
                if (!isLt5M) {
                  message.error('图片大小不能超过 1MB!');
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
                    setEmpty({ ...empty, logo: false });
                    setForm({ ...form, logo: { url: url, file: info.file.originFileObj } });
                  });
                }
              }}
            >
              {form?.logo ? (
                <img
                  src={form?.logo?.url || ''}
                  alt='avatar'
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
                    上传图片
                  </div>
                </button>
              )}
            </Upload>
          </ImgCrop>
        </div>
      ],
      tip: '可裁剪图片，可配置限制大小'
    },
    {
      key: 'name',
      label: '文本框',
      require: true,
      rules: [
        {
          pattern: /^(?:[\u4e00-\u9fa5]{1,30}|[A-Za-z\s]{1,60})$/,
          message: '限30个中文字，或60个英文字母（含空格）'
        }
      ],
      placeholder: '可配置验证规则'
    },
    {
      key: 'summary',
      label: '文本域',
      require: true,
      placeholder: 'TextArea控件，支持自适应高度，最大行数10行',
      component: (
        <Input.TextArea
          showCount
          placeholder='TextArea控件，支持自适应高度，最大行数10行'
          value={form.summary}
          onChange={(e) => {
            setEmpty({ ...empty, summary: false });
            setForm({ ...form, summary: e.target.value });
          }}
          maxLength={100}
          autoSize={{
            minRows: 6,
            maxRows: 10
          }}
        ></Input.TextArea>
      )
    },
    {
      key: 'content',
      label: '富文本编辑器',
      placeholder: '请填写产品详情',
      noExtra: true,
      component: (
        <EditorComponent
          onChange={(value) => {
            setRichText(value);
          }}
          defaultValue={richText || ''}
          editorParams={{
            placeholder: '可配置富文本编辑器的限制以及根据需要配置控件',
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
                    // 可参考该方式上传图片
                    // const formData = new FormData();
                    // formData.append('imagedata', url);
                    // formData.append('operation', 101);
                    // formData.append('random', signature.current[0]);
                    // formData.append('timestamp', signature.current[1]);
                    // formData.append('signature', signature.current[2]);
                    // try {
                    //   const res = await UploadImg(formData);
                    //   if (res && res.Code === 0 && res.Message) {
                    //     message.success('上传成功');
                    //     const srcUrl = (process.env.NEXT_PUBLIC_UPLOAD_IMG_API || '') + res.Message;
                    //     insertFn(srcUrl, '', '');
                    //   } else {
                    //     message.error(res.Message);
                    //   }
                    // } catch (error) {
                    //   console.log(error);
                    //   message.error(JSON.stringify(error));
                    // }
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
        ></EditorComponent>
      )
    },
    {
      key: 'doc',
      label: '上传文档',
      require: true,
      placeholder: '可上传文档等',
      component: [
        <div className={styles.form_item_upload} key={0}>
          <Upload
            name='file'
            style={{
              width: '5rem'
            }}
            accept='.doc,.docx,.ppt,.pptx,.pdf'
            maxCount={1}
            fileList={form.doc ? [form.doc] : []}
            beforeUpload={(file) => {
              const isLt5M = file.size / 1024 / 1024 < 30;
              if (!isLt5M) {
                message.error('文件大小不能超过 30MB!');
              }
              return isLt5M;
            }}
            onChange={(info) => {
              if (info.fileList.length === 0) {
                setEmpty({ ...empty, doc: true });
                setForm({ ...form, doc: null });
                return;
              }
              setForm({ ...form, doc: info.fileList[0].originFileObj });
            }}
          >
            <Button icon={<UploadOutlined />}>可配置上传格式与上传大小</Button>
          </Upload>
        </div>
      ]
    }
  ];

  const submit = async (resultForm, cb) => {
    console.log('resultForm', resultForm);
    console.log('richText', richText);
    console.log('form', form);
    console.log('empty', empty);
    cb && cb();
  };

  return (
    <main className={styles.form}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <Link href={'/'}>表单组件</Link>
        </h1>
        <p className={styles.description}>该组件基于Ant-Design封装，默认为输入框，但可自定义需要的表单输入框，可配置标签，tip，验证规则等。</p>
        <div className={styles.form}>
          <InfoForm
            list={list}
            defaultForm={{ form, setForm }}
            defaultEmpty={{ empty, setEmpty }}
            submit={submit}
            props={{
              customClassName: 'custom_infoForm'
            }}
          ></InfoForm>
        </div>
        <div className={styles.author}>
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
