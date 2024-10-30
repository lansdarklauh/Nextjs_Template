'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    console.log(`App Version: ${process.env.NEXT_PUBLIC_APP_VERSION}`);
    const handleResize = () => {
      const width = window.innerWidth;
      const html = document.documentElement;
      const deviceType = document.cookie.includes('device=mobile') ? 'mobile' : 'desktop';

      if (width < 768 || deviceType === 'mobile') {
        const fontSize = (24 / 750) * width;
        html.style.fontSize = `${fontSize}px`;
      } else if (width < 960 && width > 768) {
        const fontSize = (14 / 960) * 960;
        html.style.fontSize = `${fontSize}px`;
      } else if (width < 1600 && width > 960) {
        const fontSize = (14 / 1600) * 1600;
        html.style.fontSize = `${fontSize}px`;
      } else {
        const fontSize = (14 / 1920) * width;
        html.style.fontSize = `${fontSize}px`;
      }
    };

    // 初始化时设置一次
    handleResize();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    setLoading(false);
    setTimeout(() => {
      setRender(false);
    }, 600);

    // 清除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    render && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999999
        }}
        className={`fade-exit ${!loading && 'fade-exit-active'}`}
      >
        <span id='loader'></span>
      </div>
    )
  );
}
