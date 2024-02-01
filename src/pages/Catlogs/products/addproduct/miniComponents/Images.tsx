import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, UploadFile } from "antd";
import axios from "axios";
import { base_url, config } from "../../../../../utils/axiosConfig";
import { form_template } from "../Addproduct";
import { UploadChangeParam } from "antd/es/upload";

interface file{
  name:string,
  asset_id:string,
  status: "done"|"uploading"|"error",
  thumbUrl: string,
  url: string,
  uid: string,
}

const Images: React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}>  = ({ form, setForm}) => {
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState<file[]>([]);

  async function handleImgChange(file:file) {
    // file.
    setFileList((pre) => {
      return [{ ...file, status: "uploading", percent: 40 }, ...pre];
    });
    const formData = new FormData();
    formData.append("images", file.originFileObj);
    try {
      const res = await axios.post(`${base_url}upload`, formData, {
        ...config,
      });
      const { url, asset_id } = res.data[0];

      if (url && asset_id) {
        setForm((pre) => {
          return {
            ...pre,
            images: {
              ...pre.images,
              primary: [res.data[0], ...pre.images.primary],
            },
          };
        });
        setFileList((pre) => {
          pre[0] = {
            name: file.name ? file.name : asset_id,
            asset_id,
            status: "done",
            thumbUrl: `${url}`,
            url: `${url}`,
            uid: `${asset_id}`,
          };
          return pre;
        });
        message.success(` Success : ${asset_id} file uploaded.`);
      } else {
        message.success(` did not got response from server`);
        setFileList((pre) => {
          pre[0] = { ...pre[0], status: "error" };
          console.log({ pre });
          return pre;
        });
      }
    } catch (error:any) {
      setFileList((pre) => {
        const copy = [...pre];
        copy[0] = { ...file, status: "error" };
        return copy;
      });
      message.error(` failed : ${error.message} `);
    }
  }
async function handleOnRemove(file:UploadFile<file>) {
  if (file?.uid) {
    try {
      await axios.delete(`${base_url}upload/delete-img/${file.uid}`, {
        ...config,
      });

      setFileList((pre) => {
        const copy = pre?.filter((img) => {
          return img.uid !== file.uid;
        });
        return copy;
      });

      if (file.status !== "error") {
        setForm((pre) => {
          const primary = pre?.images.primary?.filter((img) => {
            return img.asset_id !== file.uid;
          });

          return {
            ...pre,
            images: {
              ...pre.images,
              primary,
            },
          };
        });
      }

      return true;
    } catch (error:any) {
      message.error(error.message);
      return false;
    }
  } else {
    message.error(`file not found`);
  }
}

async function handleOnChange(info:UploadChangeParam<UploadFile<file>>) {
  const { file } = info;
  const { status } = file;
  // file.
  if (status === "uploading") {
    setTimeout(() => {
      handleImgChange(file);
    }, 500);

    console.log(file);
  } else if (status === "done") {
    // onSuccess oprations

    console.log("done");
  } else if (status === "removed") {
    setFileList((pre) => {
      const newList = pre.filter((img) => {
        return img.uid !== file.uid;
      });
      return newList;
    });
    console.log("removed");
  } else if (status === "error") {
    message.error(`${info.file.error.message}.`);
  }
}

  // const img_upload_config = {
  //   name: "images",
  //   multiple: true,
  //   async onRemove(file:file) {
  //     if (file?.uid) {
  //       try {
  //         await axios.delete(`${base_url}upload/delete-img/${file.uid}`, {
  //           ...config,
  //         });

  //         setFileList((pre) => {
  //           const copy = pre?.filter((img) => {
  //             return img.uid !== file.uid;
  //           });
  //           return copy;
  //         });

  //         if (file.status !== "error") {
  //           setForm((pre) => {
  //             const primary = pre?.images.primary?.filter((img) => {
  //               return img.asset_id !== file.uid;
  //             });

  //             return {
  //               ...pre,
  //               images: {
  //                 ...pre.images,
  //                 primary,
  //               },
  //             };
  //           });
  //         }

  //         return true;
  //       } catch (error:any) {
  //         message.error(error.message);
  //         return false;
  //       }
  //     } else {
  //       message.error(`file not found`);
  //     }
  //   },
  //   async onChange(info) {
  //     const { file } = info;
  //     const { status } = file;
  //     if (status === "uploading") {
  //       setTimeout(() => {
  //         handleImgChange(file);
  //       }, 500);

  //       console.log(file);
  //     } else if (status === "done") {
  //       // onSuccess oprations

  //       console.log("done");
  //     } else if (status === "removed") {
  //       setFileList((pre) => {
  //         const newList = pre.filter((img) => {
  //           return img.uid !== file.uid;
  //         });
  //         return newList;
  //       });
  //       console.log("removed");
  //     } else if (status === "error") {
  //       message.error(`${info.file.error.message}.`);
  //     }
  //   },
  // };

  useEffect(() => {
    function initialFileList() {
      const draftFileList:file[] = [];
      form.images.primary?.forEach((item) => {
        draftFileList.push({
          name: item.asset_id,
          asset_id: item.asset_id,
          status: "done",
          thumbUrl: `${item.url}`,
          url: `${item.url}`,
          uid: `${item.asset_id}`,
        });
      });
      setFileList(draftFileList);
    }
    initialFileList();
  }, [form.images.primary]);

  useEffect(() => {
    console.log(fileList);
    // console.log(form.images);
  }, [fileList]);
  return (
    <div className="d-flex justify-content-center">
      <div
        style={{ width: "fit-content", height: "fit-content" }}
        className="ant_design_img_comp"
      >
        <Dragger 
         name= {"images"}
         multiple= {true}
         onChange={(e:UploadChangeParam<UploadFile<file>>)=>handleOnChange(e)}
        onRemove={(e:UploadFile<file>)=>handleOnRemove(e)}
        fileList={fileList}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Dragger>
      </div>
    </div>
  );
};

export default Images;
