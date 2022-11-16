//经济运行分析
import Analyseheader from '@/components/Analyseheader';
import { RowOperBtn } from '@/components/OperationBtn';
import Chart from '@/components/Echarts';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import React, { memo } from 'react';
import styles from './index.less';
const { RangePicker } = DatePicker;


let Data = [
  {
    name: '优良',
    value: 0,
  },
  {
    name: '一般',
    value: 0,
  },
  {
    name: '极差',
    value: 0,
  },
  {
    name: '超载',
    value: 0,
  },
  {
    name: '离线',
    value: 0,
  },
];
const title = {
  size: 30,
  linHeight: 30,
};
const title4 = {
  text: '--天',
  size: 18,
  linHeight: 30,
};
const title5 = {
  text: '总运行天数',
  size: 16,
};

let circle = {
  max: 90,
  min: 70,
  top: '30%',
  left: '50%',
};
let middletext = {
  top: '17%',
  left: '48%',
};
let outsidetext1 = {
  top: '70%',
  left: '10%',
  width1: 40,
};

let list = [
  {
    label: '静海区政府西楼变电室',
  },
  {
    label: '静海区政府西楼变电室',
  },
  {
    label: '静海区政府西楼变电室',
  },
];
let data = [
  {
    text: '日负荷概率',
    color: 'rgba(38, 140, 255, 1)',
  },
];
const Distributing = memo(() => {
  const [form] = Form.useForm();


  // 表格列字段
  const columns = [
    {
      title: '缴费单位',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '用水类型',
      dataIndex: 'systemName',
    },
    {
      title: '所属项目',
      dataIndex: 'siteName',
    },
    {
      title: '所属系统',
      dataIndex: 'siteProject',
    },
    {
      title: '所属站点',
      dataIndex: 'siteSystem',
    },
    {
      title: '站点所在地',
      dataIndex: 'businessAlarmRuleTempId',
    },
    {
      title: '创建时间',
      dataIndex: ['alarmTime'],
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[{ key: 'detail', text: '单价详情' }]}
          btnCilck={(e: string) => {
            clickRowbtn(e, record);
          }}
          rowData={record}
          // isDisabled={isDisabledFun(record)}
        />
      ),
    },
  ];



  // 过滤不可选择的行属性
  const isDisabledFun = (res: { gender: string }) => {
    return res.gender === 'female';
  };

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    console.log('e：按钮标识(key);\n data当前操作行数据');
    console.log(e);
    console.log(data);
  };

  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="name">
            <Input placeholder="请输入组态图名称搜索" />
          </Form.Item>

          <Form.Item name="email">
            <Select
              placeholder="请选择组态图类型"
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
                  label: '供冷',
                },
                {
                  value: '2',
                  label: '供热',
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="phone">
            <Select
              placeholder="请选择站点"
              showSearch
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
                  label: 'A光合谷A能源站',
                },
                {
                  value: '2',
                  label: 'B光合谷B能源站',
                },
                {
                  value: '3',
                  label: 'C光合谷C能源站',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="createData">
            <RangePicker />
          </Form.Item>

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );


  return (
    <>
      <PageHeader title="经济运行分析" />
      <div className={styles.moduleContent}>
      {advanceSearchForm}
        <div className={styles.module}>
          <div className={styles.moduleLeft}>
            <Analyseheader title="经济运行时间占比" />
            <div className={styles.earchs}>
              <Chart
                type="ConCom"
                XDATA={Data}
                ConComTitle={title}
                ConComUnit="KW.h"
                ConComTitle2={title4}
                ConComTitle3={title5}
                ConComCircle={circle}
                ConComMiddletext={middletext}
                ConComOutsidetext={outsidetext1}
              />
            </div>
          </div>
          <div className={styles.moduleRight}>
            <Analyseheader
              title="变电站日负荷趋势图"
              type="rectangle"
              data={data}
            />
            <div className={styles.earchsR}>
              <Chart
                type="Line"
                XDATA={[
                  '2022-09-26',
                  '2022-09-29',
                  '2022-10-01',
                  '2022-10-05',
                  '2022-10-09',
                  '2022-10-14',
                  '2022-10-18',
                ]}
                YDATA={[
                  [1, 2, 3, 4, 5, 6, 8],
                  [8, 1, 6, 3, 8, 5, 6],
                  [5, 6, 5, 8, 1, 3, 2],
                ]}
                LineStyleOpacity={['0', '0', '0']}
                LineStyleColor={['#00D8A0 ', '#268CFF', '#f7d18a']}
                LineXtextColor={'#666'}
                LineYtextColor={'#666'}
                LineTooltipShow
                LineLegendColor={'#666'}
                LineColor={'#CDD7E8'}
              />
            </div>
          </div>
        </div>
        <div className={styles.moduleB}>
          <div className={styles.bars}>
            <div className={styles.barscontent}>
              <Button
                // type="primary"
                disabled
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  height: '30px',
                }}
              >
                导出
              </Button>
              <span className={styles.toolbarTip}>
                <i className={styles.green}></i>
                优良：日负荷率在57%至77%内
                <i className={styles.yellow}></i>
                一般：日负荷率大于77%至90%或处于30%至57%
                <i className={styles.overload}></i>
                超载：日负荷率大于90%
                <i className={styles.red}></i>
                极差：日负荷率小于30%
                总有功功率、总无功功率、总视在功率、日负荷率都为24小时平均值。
              </span>
            </div>
          </div>
          <div className={styles.Table}>
            <div>
              <div className={'zkTableContent'}>
                <ZKTable
                isRowCheck={false}
                  rowId={'businessAlarmRuleTempId'}
                  btnList={[]}
                  searchForm={form}
                  tableColumns={columns}
                  //tableDataFun={getTableData}
                  defaultFormItem={{
                    name: 'hello',
                    email: '1',
                    phone: '2',
                  }}
                  clickOperBtn={(t: string, d: any) => {
                    console.log(
                      't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
                    );
                    console.log(t, d);
                    console.log('点击表格上方操作按钮回调');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Distributing;
