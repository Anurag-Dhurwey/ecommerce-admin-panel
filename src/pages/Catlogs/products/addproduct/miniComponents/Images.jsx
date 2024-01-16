import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import axios from "axios";
import { base_url } from "../../../../../utils/axiosConfig";
const Images = ({ form, setForm, config }) => {
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState([]);

  async function handleImgChange(file) {
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
    } catch (error) {
      setFileList((pre) => {
        const copy = [...pre];
        copy[0] = { ...file, status: "error" };
        return copy;
      });
      message.error(` failed : ${error.message} `);
    }
  }

  const img_upload_config = {
    name: "images",
    multiple: true,
    async onRemove(file) {
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
                return img.uid !== file.uid;
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
        } catch (error) {
          message.error(error.message);
          return false;
        }
      } else {
        message.error(`file not found`);
      }
    },
    async onChange(info) {
      const { file } = info;
      const { status } = file;
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
    },
  };

  useEffect(() => {
    function initialFileList() {
      const draftFileList = [];
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
        <Dragger {...img_upload_config} fileList={fileList}>
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
