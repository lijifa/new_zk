interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { Col, Form, Input, Row, Tree } from 'antd';
import { useState } from 'react';

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
];

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  // 树状图点击
  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  // 树状图点击回调
  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  // 树状图点击展开
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="角色名称："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="权限字符："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="显示顺序："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="菜单权限：" name="diagram-name4">
            {/* 树状图权限 */}
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
            />
          </Form.Item>
        </Col>
      </Row>
      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
    </Form>
  );
};

export default Add;
