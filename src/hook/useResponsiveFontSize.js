// hooks/useResponsiveFontSize.js
import { useEffect } from 'react';

const useResponsiveFontSize = () => {
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const html = document.documentElement;

            if (width < 768) {
                html.style.fontSize = '14px';
            } else {
                const fontSize = 16 + (10 * (width - 768) / (1920 - 768));
                html.style.fontSize = `${fontSize}px`;
            }
        };

        // 初始化时设置一次
        handleResize();

        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);

        // 清除事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
};

export default useResponsiveFontSize;