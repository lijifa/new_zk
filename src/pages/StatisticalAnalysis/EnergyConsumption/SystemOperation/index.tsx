import Analyseheader from '@/components/Analyseheader';
import Chart from '@/components/Echarts';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Radio, Select, Space, Tabs } from 'antd';
import { useRef, useState } from 'react';
import styles from './index.less';

const { RangePicker } = DatePicker;

const title = {
  size: 25,
  linHeight: 24,
};
const title2 = {
  text: '总运行天数',
  size: 18,
  linHeight: 30,
};
let circle = {
  max: 80,
  min: 65,
  top: '30%',
  left: '50%',
};
let middletext = {
  top: '20%',
  left: '48%',
};
let outsidetext = {
  top: '70%',
  left: '13%',
  width1: 150,
};
let Data1 = [
  {
    name: '系统安全运行天数',
    value: 80,
  },
  {
    name: '系统不安全运行天数',
    value: 10,
  },
  {
    name: '离线天数',
    value: 2,
  },
];

// 页签切换数据;
const TabData = [
  {
    label: '系统温度',
    children: (
      <div style={{ width: '100%', height: '100%' }}>
        <Chart
          type="Line"
          XDATA={[1, 2, 3, 4, 5, 6, 7]}
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
          LineName={['供水温度', '回水温度', '室外温度']}
          LineLegendColor={'#666'}
          LineColor={'#CDD7E8'}
        />
      </div>
    ),
  },
  {
    label: '系统压力',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
            YDATA={[[1, 2, 3, 4, 5, 6, 8]]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineName={['供水温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '系统流量',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
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
            LineName={['供水温度', '回水温度', '室外温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '耗冷/热量',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
            YDATA={[
              [1, 2, 3, 4, 5, 6, 8],
              [5, 6, 5, 8, 1, 3, 2],
            ]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ', '#f7d18a']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineName={['供水温度', '室外温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '总能耗',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
            YDATA={[
              [1, 2, 3, 4, 5, 6, 8],
              [8, 1, 6, 3, 8, 5, 6],
            ]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ', '#268CFF']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineName={['供水温度', '回水温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
];
const items = TabData.map((item: any, i: any) => {
  return {
    label: item.label,
    key: i,
    children: item.children,
  };
});

const SystemOperation = () => {
  const [Time, setTime] = useState('hour');
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '时间',
      dataIndex: 'name',
    },
    {
      title: '室外温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '室外湿度(%)',
      dataIndex: 'gender',
    },
    {
      title: '供水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '回水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '供水压力(bar)',
      dataIndex: 'gender',
    },
    {
      title: '回水压力(bar)',
      dataIndex: 'gender',
    },
    {
      title: '系统温差(℃)',
      dataIndex: 'gender',
    },
    {
      title: '系统压差(bar)',
      dataIndex: 'gender',
    },
    {
      title: '系统流量(m³)',
      dataIndex: 'gender',
    },
    {
      title: '耗冷(热)量(GJ)',
      dataIndex: 'gender',
    },
    {
      title: '总能耗(kgce)',
      dataIndex: 'gender',
    },
  ];

  const titleNav = () => {
    if (Time === 'hour') {
      return (
        <div className="card-container">
          <Tabs destroyInactiveTabPane type="card" items={items} />
        </div>
      );
    } else {
      return (
        <div className={styles.DayBox}>
          <div className={styles.leftBox}>
            <Analyseheader title="供能运行结果" />
            <div style={{ height: 300, width: '100%', marginTop: 30 }}>
              <Chart
                type="ConCom"
                XDATA={Data1}
                ConComUnit="天"
                ConComTitle={title}
                ConComTitle2={title2}
                ConComTitle3={{
                  text: '',
                }}
                ConComCircle={circle}
                ConComMiddletext={middletext}
                ConComOutsidetext={outsidetext}
                ConComColor={['#00D8A0', 'red', '#888888']}
              />
            </div>
          </div>
          <div className="card-container">
            <Tabs destroyInactiveTabPane type="card" items={items} />
          </div>
        </div>
      );
    }
  };

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="email">
            <Select
              placeholder="请选择所属站点"
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
                  label: '待审核',
                },
                {
                  value: '2',
                  label: '已通过',
                },
                {
                  value: '3',
                  label: '已拒绝',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="createData">
            {Time === 'hour' ? <DatePicker /> : <RangePicker />}
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
      <PageHeader />
      <div className={styles.selectBox}>
        <div className={'zkTableContent'} style={{ paddingLeft: 0 }}>
          {advanceSearchForm}
        </div>
        <div style={{ width: 129, marginTop: 12 }}>
          <Radio.Group defaultValue={'hour'}>
            <Radio.Button
              value="hour"
              onClick={() => {
                setTime('hour');
              }}
            >
              每时
            </Radio.Button>
            <Radio.Button
              value="day"
              onClick={() => {
                setTime('day');
              }}
            >
              每日
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className={styles.content}>
        {titleNav()}
        <div>
          <ZKTable
            btnList={['export']}
            searchForm={form}
            tableColumns={columns}
            clickOperBtn={(t: string, d: any) => {
              console.log(
                't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
              );
              console.log(t, d);
              console.log('点击表格上方操作按钮回调');
              toggle();
            }}
            otherBtnFun={(e: any) => {
              return [
                <div className={styles.toolBarBox}>
                  <span className={styles.toolbarTip}>
                    <img
                      src={require('@/assets/System_operation/img/tipBlue.png')}
                    />
                    室外温度、室外湿度、供水温度、回水温度、供水压力、回水压力、系统温差、系统压差取系统内当日平均值。系统流量、耗冷(热)量、总能耗为当日累计值。
                  </span>
                </div>,
              ];
            }}
            ref={shareRef}
          />
        </div>
      </div>
    </>
  );
};

export default SystemOperation;
