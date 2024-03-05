import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, UploadFile } from "antd";
import axios from "axios";
import { api,  config } from "../../../../../utils/axiosConfig";
import { form_template } from "../Addproduct";
import { UploadChangeParam } from "antd/es/upload";

interface file {
  name: string;
  asset_id: string;
  status: "done" | "uploading" | "error";
  thumbUrl?: string;
  url: string;
  percent?: number;
}

const Images: React.FC<{
  form: form_template;
  setForm: React.Dispatch<React.SetStateAction<form_template>>;
}> = ({ form, setForm }) => {
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState<UploadFile<file>[]>([]);

  async function handleImgChange(file: UploadFile<file>) {
    if (!file.originFileObj) return;
    setFileList((pre) => {
      return [{ ...file, status: "uploading", percent: 40 }, ...pre];
    });
    const formData = new FormData();
    formData.append("images", file.originFileObj);
    try {
      const res = await axios.post(`${api.image.post()}`, formData, {
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
            ...pre[0],
            name: file.name ? file.name : asset_id,
            response: {
              asset_id,
              name: file.name,
              url,
              thumbUrl: file.thumbUrl,
              status: "done",
            },
            status: "done",
            percent: 100,
            thumbUrl: `${url}`,
            url: `${url}`,
          };
          return pre;
        });
        message.success(` Success : ${asset_id} file uploaded.`);
      } else {
        message.success(` did not got response from server`);
        setFileList((pre) => {
          pre[0] = { ...pre[0], status: "error", response: undefined };
          return pre;
        });
      }
    } catch (error: any) {
      setFileList((pre) => {
        const copy = [...pre];
        copy[0] = { ...file, status: "error", response: undefined };
        return copy;
      });
      message.error(` failed : ${error.message} `);
    }
  }
  async function handleOnRemove(file: UploadFile<file>) {
    console.log(file);
    if (file?.uid) {
      try {
        if (file.status === "done") {
          await axios.delete(`${api.image.delete(file.uid)}`, {
            ...config,
          });
        }

        setFileList((pre) => {
          const copy = pre?.filter((img) => {
            return img.uid !== file.uid;
          });
          return copy;
        });

        if (file.status !== "error") {
          setForm((pre) => {
            const primary = pre?.images.primary?.filter((img) => {
              return img.asset_id !== file.response?.asset_id;
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
      } catch (error: any) {
        message.error(error.message);
        return false;
      }
    } else {
      message.error(`file not found`);
    }
  }

  async function handleOnChange(info: UploadChangeParam<UploadFile<file>>) {
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

  useEffect(() => {
    function initialFileList() {
      const draftFileList: UploadFile<file>[] = [];
      form.images.primary?.forEach((item) => {
        draftFileList.push({
          name: item.asset_id,
          status: "done",
          thumbUrl: `${item.url}`,
          url: `${item.url}`,
          uid: `${item.asset_id}`,
          response: {
            asset_id: item.asset_id,
            name: item.asset_id,
            status: "done",
            thumbUrl: `${item.url}`,
            url: `${item.url}`,
          },
        });
      });
      setFileList(draftFileList);
    }
    initialFileList();
  }, []);

  useEffect(() => {
    console.log(fileList);
    // console.log(form.images);
  }, [fileList]);
  return (
    <div className="d-flex justify-content-center align-items-center flex-wrap">
      <div className="d-flex gap-2 justify-content-center align-items-center flex-wrap col-12">
        {form.images.primary.length ? (
          form.images.primary.map((img) => {
            return (
              <span
                className="overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                <img
                  height="100px"
                  width={"100px"}
                  style={{ objectFit: "cover" }}
                  key={img.url}
                  src={img.url}
                  alt="products image"
                />
              </span>
            );
          })
        ) : (
          <h5>No Images</h5>
        )}
      </div>
      <div
        style={{ width: "fit-content", height: "fit-content" }}
        className="ant_design_img_comp"
      >
        <Dragger
          name={"images"}
          multiple={true}
          onChange={(e: UploadChangeParam<UploadFile<file>>) =>
            handleOnChange(e)
          }
          onRemove={(e: UploadFile<file>) => handleOnRemove(e)}
          fileList={fileList}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </div>
    </div>
  );
};

export default Images;
