import nProgress from "nprogress";
import { getBalanceApi, getUserInfoApi } from "../api/httpApi";
nProgress.configure({ minimum: 0.7, easing: "ease", speed: 500 });

/**
 * 从路径中提取特定值用作侧边栏持久化展开
 * @param {string} path - 路径字符串
 * @returns {string} - 提取的值
 */
export const extractValueFromPath = (path) => {
  const startIndex = path.indexOf("/") + 1; // 找到第一个斜杠的索引，并加1
  const endIndex = path.indexOf("/", startIndex); // 从 startIndex 开始找到第二个斜杠的索引

  if (endIndex !== -1) {
    // 如果存在第二个斜杠
    return "/" + path.substring(startIndex, endIndex); // 提取 startIndex 到 endIndex 之间的部分作为值
  } else {
    return "/" + path.substring(startIndex); // 如果没有第二个斜杠，则提取 startIndex 到结尾的部分作为值
  }
};

/**
 * 随机生成颜色
 * @returns
 */
export const randomColor = () => {
  const colors = ["#8315F9", "#D97706", "#0284C7", "red"];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * 带进度跳转
 * @param {string} url
 * @param {object} history
 */
export const Jump = (url, history) => {
  nProgress.start();
  setTimeout(() => {
    nProgress.done();
    history.push(url);
  }, 1000);
};

/**
 * 随机生成数字
 * @param {number} min
 * @param {number} max
 * @returns
 * @example randomNum(1, 10) => 5
 */
export const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 是否查看过Tour
 * @param {string} page
 * @returns
 */
export const isSeenTour = (page) => {
  const data = JSON.parse(localStorage.getItem("seenTour"));
  return data && data[page] === true;
};

/**
 * 查看Tour
 * @param {string} page
 * @returns
 */
export const seenTour = (page) => {
  const data = localStorage.getItem("seenTour") ? JSON.parse(localStorage.getItem("seenTour")) : {};

  data[page] = true;
  localStorage.setItem("seenTour", JSON.stringify(data));
};

// 获取用户当前信息
export const getUserInfo = async (dispatch) => {
  const [userInfo, balanceInfo] = await Promise.all([getUserInfoApi(), getBalanceApi()]);

  const obj = {
    userDesc: userInfo.data[0].user_desc,
    userPay: userInfo.data[0].user_pay,
    balance: balanceInfo.data,
  };

  if (dispatch) {
    dispatch({
      type: "USER_INFO_CHANGE",
      payload: obj,
    });
  }

  return obj;
};
