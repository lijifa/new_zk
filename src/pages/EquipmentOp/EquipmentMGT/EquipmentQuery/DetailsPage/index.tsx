import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tabs,
} from 'antd';
import React, { memo, useRef } from 'react';
import styles from './index.less';

const { RangePicker } = DatePicker;

const DetailsPage = memo(() => {
  const [form] = Form.useForm();
  const shareRef = useRef<any>();

  const TITLE_NAME = [
    '基础信息',
    '维修记录',
    '保养记录',
    '抄表记录',
    '告警记录',
    '易损清单',
  ];

  // 表格数据
  const columns = [
    {
      title: '规格类型',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '规格参数',
      dataIndex: 'age',
    },
  ];
  // 表格数据
  const SecColumns = [
    {
      title: '维修单号',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '维修名称',
      dataIndex: 'age',
    },
    {
      title: '维修日期',
      dataIndex: 'age',
    },
    {
      title: '维修等级',
      dataIndex: 'age',
    },
    {
      title: '维修类型',
      dataIndex: 'age',
    },
    {
      title: '主维修人',
      dataIndex: 'age',
    },
    {
      title: '维修结果',
      dataIndex: 'age',
    },
  ];
  // 表格数据
  const ThreeColumns = [
    {
      title: '保养单号',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '保养名称',
      dataIndex: 'age',
    },
    {
      title: '保养日期',
      dataIndex: 'age',
    },
    {
      title: '保养总时长(h)',
      dataIndex: 'age',
    },
    {
      title: '主保养人',
      dataIndex: 'age',
    },
    {
      title: '保养结果',
      dataIndex: 'age',
    },
  ];
  // 表格数据
  const FourColumns = [
    {
      title: '抄表单号',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '抄表名称',
      dataIndex: 'age',
    },
    {
      title: '抄表时间',
      dataIndex: 'age',
    },
    {
      title: '抄表人',
      dataIndex: 'age',
    },
  ];
  // 表格数据
  const FiveColumns = [
    {
      title: '告警原因',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '告警类型',
      dataIndex: 'age',
    },
    {
      title: '状态',
      dataIndex: 'age',
    },
    {
      title: '生成时间',
      dataIndex: 'age',
    },
    {
      title: '恢复时间',
      dataIndex: 'age',
    },
  ];
  // 表格数据
  const SixColumns = [
    {
      title: '材料名称',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '型号',
      dataIndex: 'age',
    },
    {
      title: '单位',
      dataIndex: 'age',
    },
    {
      title: '品牌',
      dataIndex: 'age',
    },
    {
      title: '售后厂家',
      dataIndex: 'age',
    },
    {
      title: '创建人',
      dataIndex: 'age',
    },
    {
      title: '创建时间',
      dataIndex: 'age',
    },
  ];

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  const page = (key: number) => {
    switch (key) {
      case 0:
        return (
          <div className={'zkTableContent'}>
            <Row justify={'space-between'}>
              <Col span={24} className={styles.table_box}>
                <div className={styles.labelContern}>
                  <div className={styles.labelConternItem}>
                    <label>设备名称:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>所属系统:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>所属站点:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>设备种类:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>一级分类:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>二级分类:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>设备编号:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>设备型号:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>所属品牌:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>启用日期:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>使用状态:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>安装位置:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>质保时长:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>出厂编号:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>供应厂商:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label>保养周期:</label>
                    <span>--</span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label></label>
                    <span></span>
                  </div>
                  <div className={styles.labelConternItem}>
                    <label></label>
                    <span></span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24} className={styles.time_box}>
                <div className={styles.subTitle}>
                  <span>设备规格（合计0）</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <ZKTable
                    btnList={['']}
                    searchForm={form}
                    tableColumns={columns}
                    ref={shareRef}
                    isRowCheck={false}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24} className={styles.time_box}>
                <div className={styles.subTitle}>
                  <span>设备文档</span>
                </div>
              </Col>
            </Row>
          </div>
        );
      case 1:
        return (
          <div className={'zkTableContent'}>
            <div className="zkSearchBox">
              <Form form={form}>
                <Space align="center">
                  <Form.Item name="username">
                    <Input placeholder="请输入巡检标准名称搜索" />
                  </Form.Item>
                  <Form.Item name="username">
                    <RangePicker />
                  </Form.Item>

                  <Button type="primary" onClick={() => searchOper('submit')}>
                    搜索
                  </Button>
                  <Button onClick={() => searchOper('reset')}>重置</Button>
                </Space>
              </Form>
            </div>
            <div className={styles.count_box}>
              <div>
                <span>维修次数：</span>
                <label>--</label>
              </div>
              <div>
                <span>最近维修时间：</span>
                <label>--</label>
              </div>
            </div>
            <div>
              <ZKTable
                btnList={['']}
                searchForm={form}
                tableColumns={SecColumns}
                ref={shareRef}
                isRowCheck={false}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className={'zkTableContent'}>
            <div className="zkSearchBox">
              <Form form={form}>
                <Space align="center">
                  <Form.Item name="username">
                    <Input placeholder="请输入保养单号搜索" />
                  </Form.Item>
                  <Form.Item name="username">
                    <RangePicker />
                  </Form.Item>

                  <Button type="primary" onClick={() => searchOper('submit')}>
                    搜索
                  </Button>
                  <Button onClick={() => searchOper('reset')}>重置</Button>
                </Space>
              </Form>
            </div>
            <div className={styles.count_box}>
              <div>
                <span>保养次数：</span>
                <label>--</label>
              </div>
              <div>
                <span>最近保养时间：</span>
                <label>--</label>
              </div>
            </div>
            <div>
              <ZKTable
                btnList={['']}
                searchForm={form}
                tableColumns={ThreeColumns}
                ref={shareRef}
                isRowCheck={false}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className={'zkTableContent'}>
            <div className="zkSearchBox">
              <Form form={form}>
                <Space align="center">
                  <Form.Item name="username">
                    <Input placeholder="请输入抄表单号搜索" />
                  </Form.Item>
                  <Form.Item name="username">
                    <RangePicker />
                  </Form.Item>

                  <Button type="primary" onClick={() => searchOper('submit')}>
                    搜索
                  </Button>
                  <Button onClick={() => searchOper('reset')}>重置</Button>
                </Space>
              </Form>
            </div>
            <div className={styles.count_box}>
              <div>
                <span>抄表次数：</span>
                <label>--</label>
              </div>
              <div>
                <span>最近抄表时间：</span>
                <label>--</label>
              </div>
            </div>
            <div>
              <ZKTable
                btnList={['']}
                searchForm={form}
                tableColumns={FourColumns}
                ref={shareRef}
                isRowCheck={false}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className={'zkTableContent'}>
            <div className="zkSearchBox">
              <Form form={form}>
                <Space align="center">
                  <Form.Item name="username">
                    <Select
                      placeholder="请选择告警类型"
                      style={{ width: 200 }}
                      optionFilterProp="label"
                      filterOption={(input, option) =>
                        (option?.label ?? '').includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? '').toLowerCase())
                      }
                      options={[
                        {
                          value: '1',
                          label: '在职',
                        },
                        {
                          value: '2',
                          label: '离职',
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item name="username">
                    <RangePicker />
                  </Form.Item>

                  <Button type="primary" onClick={() => searchOper('submit')}>
                    搜索
                  </Button>
                  <Button onClick={() => searchOper('reset')}>重置</Button>
                </Space>
              </Form>
            </div>
            <div className={styles.count_box}>
              <div>
                <span>告警次数：</span>
                <label>--</label>
              </div>
              <div>
                <span>最近告警时间：</span>
                <label>--</label>
              </div>
            </div>
            <div>
              <ZKTable
                btnList={['']}
                searchForm={form}
                tableColumns={FiveColumns}
                ref={shareRef}
                isRowCheck={false}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className={'zkTableContent'}>
            <Row>
              <Col span={24} className={styles.time_box}>
                <div className={styles.subTitle}>
                  <span>易损清单</span>
                </div>
              </Col>
            </Row>
            <div>
              <ZKTable
                btnList={['']}
                searchForm={form}
                tableColumns={SixColumns}
                ref={shareRef}
                isRowCheck={false}
              />
            </div>
          </div>
        );
      default:
        break;
    }
  };

  const items = TITLE_NAME.map((e, i) => {
    return {
      label: e,
      key: `${i}`,
      children: <>{page(i)}</>,
    };
  });

  return (
    <>
      <div className={styles.content}>
        <PageHeader />
        <div className={'zkTableContent'}>
          <div className={styles.card_container}>
            <Tabs type="card" items={items} />
          </div>
        </div>
      </div>
    </>
  );
});

export default DetailsPage;
