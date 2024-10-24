import i18n from "@/i18n";
import { getToken } from "@/utils/handleToken";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { md5 } from "js-md5";

const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

const bucketName = "cnawsbucket";
const region = "cn-northwest-1";

// 创建 S3 客户端
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * 获取 S3 桶中的文件列表
 */
export const getS3ListApi = async () => {
  const params = { Bucket: bucketName };
  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    return data.Contents;
  } catch (err) {
    console.error("Error", err);
    return [];
  }
};

/**
 * 上传文件到 S3
 * @param {string} work_id
 * @param {string} task_id
 * @param {File} file
 * @param {Function} progressCB
 */
export const s3UploadApi = (work_id, task_id, file, progressCB) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: `back_end/upload/${work_id}/${task_id}/${getToken()}/${md5(file.name)}.${
        file.name.split(".")[file.name.split(".").length - 1]
      }`,
      Body: file,
      ContentType: file.type,
    };

    const upload = new Upload({
      client: s3Client,
      params,
      leavePartsOnError: false, // optional
    });

    // 监听上传进度事件
    upload.on("httpUploadProgress", (event) => {
      const progress = event.loaded / event.total;
      progressCB(progress);
    });

    // 开始上传
    upload
      .done()
      .then((data) => resolve({ res: { status: 200, data } }))
      .catch((err) => reject({ res: { status: 500, err } }));
  });
};

// 读取 S3 文件内容
const getFileContent = async (key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    // 将响应的 Body 转换为文本
    const body = await response.Body.text();
    return body;
  } catch (err) {
    console.error("Error", err);
  }
};

// 读取 S3 文件内容并处理为二进制数据
export const getBinaryFileContent = async (key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    // 将 ReadableStream 转换为 Blob
    const stream = response.Body;
    const reader = stream.getReader();
    let chunks = [];
    let done, value;

    while ((({ done, value } = await reader.read()), !done)) {
      chunks.push(value);
    }

    const blob = new Blob(chunks);
    const url = URL.createObjectURL(blob);
    return url;
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

export const getMdFileContent = async (key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    // 将 ReadableStream 转换为 Uint8Array
    const stream = response.Body;
    const reader = stream.getReader();
    let chunks = [];
    let done, value;

    while ((({ done, value } = await reader.read()), !done)) {
      chunks.push(value);
    }

    // 合并所有 chunks 成为一个 Uint8Array
    const fullArray = new Uint8Array(
      chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), [])
    );

    // 使用 TextDecoder 将 Uint8Array 转换为字符串
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(fullArray);

    console.log(text);

    return text;
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

export const modifyMdFileContent = async (key, newContent) => {
  try {
    // Step 1: 获取当前的文件内容
    const getParams = {
      Bucket: bucketName,
      Key: key,
    };
    const getObjectCommand = new GetObjectCommand(getParams);
    const getResponse = await s3Client.send(getObjectCommand);

    // 将 ReadableStream 转换为字符串
    const stream = getResponse.Body;
    const reader = stream.getReader();
    let chunks = [];
    let done, value;

    while ((({ done, value } = await reader.read()), !done)) {
      chunks.push(value);
    }

    const fullArray = new Uint8Array(
      chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), [])
    );
    const decoder = new TextDecoder("utf-8");
    let currentContent = decoder.decode(fullArray);

    // Step 2: 修改内容
    currentContent += "\n" + newContent; // 这里将新内容添加到文件末尾，你可以根据需要进行修改

    // Step 3: 上传修改后的内容
    const encoder = new TextEncoder();
    const encodedContent = encoder.encode(currentContent);

    const putParams = {
      Bucket: bucketName,
      Key: key,
      Body: encodedContent, // 上传的内容
      ContentType: "text/markdown", // 设置适当的 Content-Type
    };

    const putObjectCommand = new PutObjectCommand(putParams);
    console.log(putObjectCommand);

    await s3Client.send(putObjectCommand);

    console.log(i18n.t("api.s3Api.7725643-0"));
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};

/**
 * 从S3获取PDF文件并返回Blob URL
 * @param {string} key - S3中PDF文件的键
 * @returns {Promise<string>} 返回PDF文件的Blob URL
 */
export const getPdfFileContent = async (key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);

    // 将 ReadableStream 转换为 Blob
    const stream = response.Body;
    const reader = stream.getReader();
    let chunks = [];
    let done, value;

    while ((({ done, value } = await reader.read()), !done)) {
      chunks.push(value);
    }

    const blob = new Blob(chunks, { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (err) {
    console.error(i18n.t(i18n.t('api.s3Api.7183293-0')), err);
    throw err;
  }
};
