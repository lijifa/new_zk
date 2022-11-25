interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  id: number; //父组件选择的id
  type: string; //父组件传递来的类型
  projectType: { label: string; value: string }[] | undefined; //父组件传递来的类型
  searchOper: any;
}
import ModalFooter from '@/components/ModalFooter';
import {
  getAddProject,
  getAmendProject,
  getCheckProject,
} from '@/services/SystemConfig/ProjectSetting/project';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const [List, setlist] = useState<any>();
  const { id, type, projectType, searchOper } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const [fileList, setFileList] = useState<UploadFile[]>();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
    console.log(newFileList)
    setFileList(newFileList);

  }
   

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {
    if (type === 'add') {
      setlist(undefined);
    } else {
      getCheckProject({ id }).then((res) => {
        setlist(res.data);
      });
    }
  }, []);

  const onFinish = (values: any) => {
    console.log(values);
    let {
      address,
      area,
      linkmanName,
      linkmanPhone,
      memberCount,
      name,
      picId = 1,
      projectIntroduction,
      projectTypeId,
      sumMoney,
    } = values;
    if (type === 'add') {
      getAddProject({
        name,
        projectTypeId,
        sumMoney,
        area,
        address,
        linkmanName,
        linkmanPhone,
        memberCount,
        projectIntroduction,
        picId,
      });
    } else {
      getAmendProject({
        id,
        name,
        projectTypeId,
        sumMoney,
        area,
        address,
        linkmanName,
        linkmanPhone,
        memberCount,
        projectIntroduction,
        picId,
      });
    }
    searchOper('reset');
    props.onSubmit();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="项目名称:"
              name="name"
              initialValue={List && List.name}
              rules={[
                {
                  required: true,
                  message: '支持数字,字母,汉字,特殊符号,2-15字',
                },
              ]}
            >
              <Input placeholder="支持数字,字母,汉字,特殊符号,2-15字" />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              label="项目类型:"
              name="projectTypeId"
              initialValue={List && List.projectTypeId.toString()}
              rules={[{ required: true, message: '请选择项目类型' }]}
            >
              <Select
                placeholder="请选择项目类型"
                options={projectType}
              ></Select>
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              initialValue={List && List.sumMoney}
              label="项目总金额(元):"
              name="sumMoney"
              rules={[{ required: true, message: '请选择所属系统' }]}
            >
              <Input placeholder="请输入项目总金额" />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="项目总面积(万㎡):"
              name="area"
              initialValue={List && List.area}
              rules={[{ required: true, message: '请输入项目总面积' }]}
            >
              <Input placeholder="请输入项目总面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="项目所在地:"
              name="address"
              initialValue={List && List.address}
              rules={[{ required: true, message: '请输入项目所在地' }]}
            >
              <Input placeholder="请输入项目所在地" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="联系人姓名:"
              name="linkmanName"
              initialValue={List && List.linkmanName}
              rules={[{ required: true, message: '请输入项目联系人' }]}
            >
              <Input placeholder="请输入项目联系人" />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row>
          <Col span={7}>
            <Form.Item
              initialValue={List && List.linkmanPhone}
              label="联系人电话:"
              name="linkmanPhone"
              rules={[{ required: true, message: '请输入11位联系人电话' }]}
            >
              <Input placeholder="请输入11位联系人电话" />
            </Form.Item>
          </Col>
          <Col span={7} style={{ marginLeft: '78px' }}>
            <Form.Item
              initialValue={List && List.memberCount}
              label="用能人数:"
              name="memberCount"
              rules={[{ required: true, message: '请输入用能人数' }]}
            >
              <Input placeholder="请输入用能人数" />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              initialValue={List && List.projectIntroduction}
              label="项目简介:"
              name="projectIntroduction"
              rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 200, resize: 'none' }}
                //onChange={onChange}
                placeholder="输入字数最多不超过500字"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={24}>
            <span
              style={{
                color: 'rgba(241, 97, 103, 1)',
                fontSize: '12px',
                position: 'absolute',
                top: '2px',
                left: '107px',
              }}
            >
              注：建议上传尺寸大小为920×680像素的图片，图片格式大小范围100KB-5MB,支持.jpg与.png格式
            </span>
            <Form.Item
              label="项目照片:"
              name="picId"
              // rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList&&fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </>
            </Form.Item>
          </Col>
        </Row>
      )}

      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default Add;
