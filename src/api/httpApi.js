import { getToken } from "@/utils/handleToken";
import { post, get } from "./request";

/**
 * 登录
 * @param {string} user_email
 * @param {string} verification_code
 * @returns
 */
export const loginApi = (user_email, verification_code, user_avatar) => {
  return post("/user/login", { user_email, verification_code, user_avatar });
};

/**
 * 手机注册
 * @param {string} user_name
 * @param {string} user_password
 * @returns
 */
export const registerPhoneApi = (user_name, user_password, user_phone, verification_code) => {
  return post("/user/register", {
    user_password,
    user_name,
    user_phone,
    verification_code,
    redemption_code: "",
  });
};

/**
 * 邮箱注册
 * @param {string} user_name
 * @param {string} user_password
 * @returns
 */
export const registerEmailApi = (user_name, user_password, user_email, email_verification_code) => {
  return post("/user/register", {
    user_name,
    user_password,
    user_email,
    email_verification_code,
    redemption_code: "",
  });
};

/**
 * 发送手机验证码
 * @param {string} user_phone
 * @returns
 */
export const sendPhoneCodeApi = (user_phone) => {
  return post("/user/send_sms", {
    user_phone,
    user_status: 0,
  });
};

/**
 * 发送邮箱验证码
 * @param {string} user_email
 * @returns
 */
export const sendEmailCodeApi = (user_email) => {
  return post("/user/send_code_email", { user_email });
};

/**
 * 退出登录
 * @returns
 */
export const logoutApi = () => post("/user/logout", { user_id: getToken() });

/**
 * 获取工作空间列表
 * @returns
 */
export const getWorkSpaceApi = () => get("/api/work/oneself_work_list");

/**
 * 获取该用户下所有的工作空间
 * @returns
 */
export const getAllWorkApi = () => get("/api/work/work_list");

/**
 * 创建工作空间
 * @param {string} work_name
 * @returns
 */
export const createWorkSpaceApi = (work_name) => post("/api/work/create_work", { work_name });

/**
 * 获取受邀工作空间列表
 * @returns
 */
export const getInviteWorkApi = () => get("/api/work/join_work_list");

/**
 * 重命名工作空间
 * @param {string} work_id
 * @param {string} work_name
 * @returns
 */
export const renameWorkSpaceApi = (work_id, work_name) => {
  return post("/api/work/re_work_name", { work_id, work_name });
};

/**
 * 删除工作空间
 * @param {string} work_name
 * @returns
 */
export const deleteWorkSpaceApi = (work_name) => post("/api/work/delete_work", { work_name });

/**
 * 添加用户到工作空间
 * @param {string} work_id
 * @param {string} user_name
 * @returns
 */
export const workAddUserApi = (work_id, user_name) => {
  return post("/api/work/add_work_user", { work_id, user_name });
};

/**
 * 将用户从工作空间中删除
 * @param {string} work_id
 * @param {string} user_name
 * @returns
 */
export const workDeleteUserApi = (work_id, user_name) => {
  return post("/api/work/delete_work_user", { work_id, user_name });
};

/**
 * 获取工作空间用户列表
 * @param {string} work_name
 * @returns
 */
export const getWorkUserListApi = (work_name) => post("/api/work/get_work_user_list", { work_name });

/**
 * 获取项目列表
 * @param {string} work_id
 * @returns
 */
export const getProjectListApi = (work_id) => post("/api/task/task_info", { work_id });

/**
 * 创建项目
 * @param {object} data
 * @returns
 */
export const createProjectApi = (data) => post("/api/task/create_task", data);

/**
 * 删除项目
 * @param {string} task_id
 * @returns
 */
export const deleteProjectApi = (task_id) => post("/api/task/task_delete", { task_id });

/**
 * 重命名项目
 * @param {string} task_id
 * @param {string} task_name
 * @returns
 */
export const renameProjectApi = (task_id, task_name) => {
  return post("/api/task/task_rename", { task_id, task_name });
};

/**
 * 通知上传
 * @param {string} work_id
 * @param {string} task_id
 * @param {string} file_name
 * @param {string} file_hash_name
 * @returns
 */
export const noticeUploadApi = (work_id, task_id, file_name, file_hash_name, file_type) => {
  return post("/api/task/task_upload", {
    work_id,
    task_id,
    user_id: getToken(),
    file_name,
    file_hash_name,
    file_type,
  });
};

/**
 * 获取数据集
 * @param {string} task_id
 * @param {string} task_type
 * @returns
 */
export const getDatasetApi = (task_id, task_type) => {
  return post("/api/task/task_type_info", { task_id, task_type });
};

/**
 * 解析dataset
 * @param {Array} idList
 * @param {string} task_id
 * @param {object} params
 * @returns
 */
export const parseDatasetApi = (idList, task_id, params) =>
  post("/api/task/task_return_list", {
    vids: idList,
    task_id,
    params,
  });

/**
 * 删除dataset
 * @param {Array} idList
 * @param {string} task_type
 * @returns
 */
export const deleteDatasetApi = (idList, task_type) =>
  post("/api/task/dataset_delete", {
    vids: idList,
    task_type,
  });

/**
 * 获取版本信息
 * @param {string} task_type
 * @param {string} task_id
 * @returns
 */
export const getVersionListApi = (task_type, task_id) => {
  return post("/api/task/task_vision_info", { task_type, task_id });
};

/**
 * 获取版本内所有文件
 * @param {string} task_type
 * @param {string} task_id
 * @param {string} vision
 * @returns
 */
export const getVersionFile = (task_type, task_id, vision) => {
  return post("/api/task/task_vision_detail", { task_type, task_id, vision });
};

/**
 * 修改版本名字
 * @param {string} task_type
 * @param {string} task_id
 * @param {string} vision
 * @param {string} title
 * @returns
 */
export const renameVersionApi = (task_type, task_id, vision, title) => {
  return post("/api/task/change_task_vision_title", { task_type, task_id, vision, title });
};

/**
 * 通知下载数据集
 * @param {string} task_id
 * @param {string} vision
 * @param {string} task_type
 * @returns
 */
export const downloadDatasetApi = (task_id, vision, task_type) => {
  return post("/api/task/download_md_vision", { task_id, vision, task_type });
};

/**
 * 获取下载数据集状态
 * @param {string} task_id
 * @param {string} vision
 * @returns
 */
export const downloadDatasetByUrlApi = (task_id, vision) => {
  return get(`/api/task/download_status/${task_id}-${vision}`);
};

/**
 * 获取解析文件详情
 * @param {string} task_type
 * @param {string} task_id
 * @param {string} vision
 * @param {string} file_id
 * @returns
 */
export const getFileDetailApi = (object) => {
  return post("/api/task/task_vision_result", object);
};

/**
 * 解析单页pdf
 * @param {Object} object
 * @returns
 */
export const parseSinglePdfApi = (object) => {
  return post("/api/task/task_return_one", object);
};

/**
 * 删除版本
 * @param {string} task_id
 * @param {string} vision
 * @param {string} task_type
 * @returns
 */
export const deleteVersionApi = (task_id, vision, task_type) => {
  return post("/api/task/task_vision_delete", { task_id, vision, task_type });
};

/**
 * 合并版本
 * @param {string} task_id
 * @param {Array<string>} vision_list
 * @param {string} task_type
 * @returns
 */
export const mergeVersionApi = (task_id, vision_list, task_type) => {
  return post("/api/task/task_vision_merge", { task_id, vision_list, task_type });
};

/**
 * 获取解析使用情况
 * @returns
 */
export const usageSituationApi = () => post("/user/balance_detail", { user_id: getToken() });

/**
 * 获取余额
 * @returns
 */
export const getBalanceApi = () => post("/user/balance", { user_id: getToken() });

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => post("/user/user_detail", { user_id: getToken() });

/**
 * 更新用户信息
 * @param {string} user_nickname
 * @param {string} user_desc
 * @returns
 */
export const updateUserInfoApi = (user_nickname, user_desc) =>
  post("/user/change_user_info", {
    user_nickname,
    user_desc,
  });

/**
 * 上传文件更新用户头像
 * @param {FormData} formData
 * @returns
 */
export const updateUserAvatarApi = (formData) => post("/user/send_avatar", formData);

/**
 * 上传默认头像
 * @param {string} user_avatar
 * @returns
 */
export const updateUserAvatarByUrlApi = (user_avatar) => {
  return post("/user/send_default_avatar", { user_avatar });
};

/**
 * 获取用户使用信息
 * @returns
 */
export const getUserUsageInfoApi = () => post("/api/task/show_work_basic_info");
