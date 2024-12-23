export const sections = [
  {
    id: "installation",
    title: "安装",
    description: "使用pip安装UnDatasIO客户端:",
    code: {
      python: `pip install UnDatasIO`,
      json: ``,
    },
  },
  {
    id: "configuration",
    title: "配置",
    description: "请在用户中心获取您的token。如果未填写task_name，将使用PdfParserDemo作为默认task_name。",
    code: {
      python: `from undatasio.undatasio import UnDatasIO

token = 'Your API token'
task_name = 'your task name'

# 1. Initialize the UnDatasIO client
client = UnDatasIO(token=token, task_name=task_name)`,
      json: `{
  "baseURL": "https://backend.undatas.io/api/api",
  "Content-Type": "application/x-www-form-urlencoded"
}`,
    },
  },
  {
    id: "upload",
    title: "上传文件",
    code: {
      python: `# 2. Upload files
upload_response = client.upload(file_dir_path='./example_files')
if upload_response['code'] == 200:
    print("File upload successful!")
else:
    print(f"File upload failed: {upload_response['msg']}")`,
      json: `{
  "url": "/upload",
  "params": {
    "file": "File",
    "user_id": "Your API Keys",
    "task_name": "Your task_name"
  },
  "response": {
    "code": 200,
    "message": "success", 
    "data": []
  }
}`,
    },
  },
  {
    id: "view-files",
    title: "查看已上传文件",
    code: {
      python: `# 3. View all uploaded files
upload_filename_response = client.show_upload()
if upload_filename_response['code'] == 200:
    print(upload_filename_response.json())
else:
    print(f"File upload failed: {upload_filename_response['msg']}")`,
      json: `{
  "url": "/view_upload_file",
  "params": {
    "user_id": "Your API Keys",
    "task_name": "Your task_name"
  },
  "response": {
    "code": 200,
    "message": "success",
    "data": [
      {
        "file_name":"",
        "size":""
      }
    ]
  }
}`,
    },
  },
  {
    id: "parse-pdf",
    title: "解析PDF文件",
    code: {
      python: `# 4. Parse files
parse_response = client.parser(file_name_list=['example_file1.pdf', 'example_file2.pdf'])
if parse_response['code'] == 200:
    print("File parsing successful")
else:
    print(f"File parsing request failed: {parse_response['msg']}")`,
      json: `{
  "url": "/task_return_list",
  "params": {
    "fileName": ["example_file1.pdf", "example_file2.pdf"],
    "user_id": "String",
    "task_id": "String"
  },
  "response": {
    "code": 200,
    "message": "success",
    "data": []
  }
}`,
    },
  },
  {
    id: "view-version-information",
    title: "查看版本信息",
    code: {
      python: `# 5. View historical parsing results
parse_filename_response = client.show_version()
if parse_filename_response['code'] == 200:
    print(parse_filename_response.json())
else:
    print(f"File upload failed: {parse_filename_response['msg']}")`,
      json: `{
  "url": "/version_info",
  "params": {
    "user_id": "String",
    "task_name": "String"
  },
  "response": {
    "code": 200,
    "message": "success",
    "data": []
  }
}`,
    },
  },
  {
    id: "view-results",
    title: "查看解析结果",
    code: {
      python: `# 6. View parsing results (assuming you know the version number is 'v1' and want to get the title and table information in the parsing results)
results = client.get_result_type(type_info=['title', 'table'], file_name='example_file.pdf', version='v1')
if results['code'] == 200:
    print(f"Parsing results: {results.json()}")
else:
    print(f"Failed to get parsing results: {results['msg']}")`,
      json: `{
  "url": "/get_type_info",
  "params": {
    "user_id": "String",
    "type_info": ["table"],
    "file_name": "String",
    "version": "String",
    "task_name": "String"
  },
  "response": {
    "code": 200,
    "message": "success",
    "data": "result"
  }
}
      `,
    },
  },
];
