'use client';

import TextArea from 'antd/es/input/TextArea';
import styles from '../Common.module.scss';
import { LikeFilled, MessageFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useState } from 'react';

export default function Comment({ comments }) {
  const [commentsList, setCommentsList] = useState(comments);

  const [replying, setReplying] = useState(false);

  const handleReply = (comment, send) => {
    if (replying && send) return;
    setReplying(!!send);
    comment.replying = send;
    setCommentsList([...commentsList]);
  };

  return (
    <main className={styles.comment}>
      <div className={styles.comment_top}>评论</div>
      <div className={styles.comment_publish}>
        <TextArea
          placeholder=''
          autoSize={{
            minRows: 4,
            maxRows: 6
          }}
        />
        <div className={styles.publish_option}>
          <span className={styles.publish_user}>
            <Avatar className={styles.user_img} icon={<UserOutlined />} />
            <span className={styles.user_name}>username</span>
          </span>
          <span className={styles.publish_btn}>发布</span>
        </div>
      </div>
      <ul className={styles.comment_list}>
        {commentsList &&
          commentsList.map((item) => {
            return (
              <li key={item.id} className={styles.comment_item}>
                <div className={styles.comment_info}>
                  <div className={styles.comment_user}>
                    <Avatar className={styles.user_img} icon={<UserOutlined />} />
                    <div className={styles.user_info}>
                      <span className={styles.user_name}>{item.name}</span>
                      <span className={styles.comment_time}>{item.time}</span>
                    </div>
                  </div>
                  <span className={styles.comment_option}>
                    <span className={styles.comment_btn}>
                      <LikeFilled />
                    </span>
                    <span
                      className={styles.comment_btn}
                      onClick={() => {
                        handleReply(item, true);
                      }}
                    >
                      <MessageFilled style={{ marginRight: '0.5rem' }} />
                      回复
                    </span>
                  </span>
                </div>
                <p className={styles.comment_content}>{item.content}</p>
                {item.reply && item.reply.length > 0 ? (
                  <div className={styles.comment_reply}>
                    <ul className={styles.comment_list}>
                      {item.reply &&
                        item.reply.map((reply) => {
                          return (
                            <li key={item.id} className={`${styles.comment_item} ${styles.comment_item_underline}`}>
                              <div className={styles.comment_info}>
                                <div className={styles.comment_user}>
                                  <Avatar className={styles.user_img} icon={<UserOutlined />} />
                                  <div className={styles.user_info}>
                                    <span className={styles.user_name}>{reply.name}</span>
                                    <span className={styles.comment_time}>{reply.time}</span>
                                  </div>
                                </div>
                                <span className={styles.comment_option}>
                                  <span className={styles.comment_btn}>
                                    <LikeFilled />
                                  </span>
                                  <span
                                    className={styles.comment_btn}
                                    onClick={() => {
                                      handleReply(reply, true);
                                    }}
                                  >
                                    <MessageFilled style={{ marginRight: '0.5rem' }} />
                                    回复
                                  </span>
                                </span>
                              </div>
                              <p className={styles.comment_content}>{reply.content}</p>
                              {reply.replying && (
                                <div className={styles.comment_send}>
                                  <TextArea
                                    placeholder='请输入回复内容'
                                    autoSize={{
                                      minRows: 4,
                                      maxRows: 6
                                    }}
                                  ></TextArea>
                                  <div>
                                    <span
                                      className={styles.publish_btn_default}
                                      onClick={() => {
                                        handleReply(reply, false);
                                      }}
                                    >
                                      取消
                                    </span>
                                    <span
                                      className={styles.publish_btn}
                                      onClick={() => {
                                        handleReply(reply, false);
                                      }}
                                    >
                                      发布
                                    </span>
                                  </div>
                                </div>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ) : null}
                {item.replying && (
                  <div className={styles.comment_send}>
                    <TextArea
                      placeholder='请输入回复内容'
                      autoSize={{
                        minRows: 4,
                        maxRows: 6
                      }}
                    ></TextArea>
                    <div>
                      <span
                        className={styles.publish_btn_default}
                        onClick={() => {
                          handleReply(item, false);
                        }}
                      >
                        取消
                      </span>
                      <span
                        className={styles.publish_btn}
                        onClick={() => {
                          handleReply(item, false);
                        }}
                      >
                        发布
                      </span>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </main>
  );
}
