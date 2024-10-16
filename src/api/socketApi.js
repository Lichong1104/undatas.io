/**
 * socket获取文件详情
 * @param {object} param0
 * @returns
 */
export const socketTaskVision = async ({ task_id, vision, count }) => {
  return new Promise((resolve, reject) => {
    // 创建 WebSocket 连接
    const socket = new WebSocket(`ws://192.168.8.21:8087/api/socket/socket_task_vision`);

    // 处理连接打开事件
    socket.addEventListener("open", () => {
      // 发送参数给服务器
      const message = JSON.stringify({ task_id, vision, count });
      socket.send(message);
    });

    // 处理消息接收事件
    socket.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      resolve({ res, socket }); // 返回数据和 WebSocket 对象
    });

    // 处理错误事件
    socket.addEventListener("error", (error) => {
      console.log("WebSocket error:", error);
      reject(error);
    });

    // 处理连接关闭事件
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });
  });
};
