import Chart from '@/components/Echarts';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Select, Space, Tabs } from 'antd';
import { useRef } from 'react';
import styles from './index.less';

const { RangePicker } = DatePicker;

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

const EnergyConsumption = () => {
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
      title: '所属站点',
      dataIndex: 'gender',
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
      title: '电能耗(kW·h)',
      dataIndex: 'gender',
    },
    {
      title: '电费(元)',
      dataIndex: 'gender',
    },
    {
      title: '水能耗(m³)',
      dataIndex: 'gender',
    },
    {
      title: '水费(元)',
      dataIndex: 'gender',
    },
    {
      title: '天然气能耗(Nm³)',
      dataIndex: 'gender',
    },
    {
      title: '天然气费(元)',
      dataIndex: 'gender',
    },
  ];

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
          <Form.Item name="data">
            <Select
              placeholder="请选择时间"
              style={{ width: 80 }}
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
                  label: '按日',
                },
                {
                  value: '2',
                  label: '按月',
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
      <PageHeader />

      <div className={styles.content}>
        <div className={'zkTableContent'} style={{ paddingLeft: 0 }}>
          {advanceSearchForm}
        </div>
        <div className={styles.DayBox}>
          <div className={styles.leftBox}>
            <div className={styles.energy}>
              <img src={require('@/assets/Energy_consumption/img/hvac1.png')} />
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>电能耗(kW·h)</div>
                <div className={styles.energyItemN}>
                  <span style={{ color: 'rgba(38, 140, 255)' }}>
                    1111111.11
                  </span>
                </div>
              </div>
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>费用(元)</div>
                <div className={styles.energyItemN}>
                  <span>1111111.11</span>
                </div>
              </div>
            </div>
            <div className={styles.energy}>
              <img src={require('@/assets/Energy_consumption/img/hvac2.png')} />
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>水能耗(m³)</div>
                <div className={styles.energyItemN}>
                  <span style={{ color: 'rgba(38, 140, 255)' }}>
                    1111111.11
                  </span>
                </div>
              </div>
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>费用(元)</div>
                <div className={styles.energyItemN}>
                  <span>1111111.11</span>
                </div>
              </div>
            </div>
            <div className={styles.energy}>
              <img src={require('@/assets/Energy_consumption/img/hvac3.png')} />
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>天然气(Nm³)</div>
                <div className={styles.energyItemN}>
                  <span style={{ color: 'rgba(38, 140, 255)' }}>111.11</span>
                </div>
              </div>
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>费用(元)</div>
                <div className={styles.energyItemN}>
                  <span>11.11</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-container" style={{ flex: 1 }}>
            <Tabs destroyInactiveTabPane type="card" items={items} />
          </div>
        </div>
        <div className={styles.table_box}>
          <ZKTable
            btnList={['export']}
            searchForm={form}
            tableColumns={columns}
            defaultFormItem={{ data: '1' }}
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
                    室外温度、室外湿度、取系统内当日平均值，其他值为当日累计。
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

export default EnergyConsumption;
