import React, { useEffect } from "react";

function useStopEventPropagation() {
  useEffect(() => {
    // 添加事件监听器
    const stopEventPropagation = (e) => {
      e.stopPropagation();
    };
    document.addEventListener("click", stopEventPropagation, true);
    // 在组件卸载时移除事件监听器
    return () => {
      document.removeEventListener("click", stopEventPropagation, true);
    };
  }, []); // 只有在组件挂载和卸载时执行
}

export default useStopEventPropagation;
