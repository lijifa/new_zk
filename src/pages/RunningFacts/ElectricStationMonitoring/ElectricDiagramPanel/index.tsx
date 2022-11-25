import SubHeader from '@/components/SubHeader';
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;
const data: any = [
  {
    label: '静海政府能源管理',
  },
  {
    label: '武清人民医院',
  },
];
// 电力组态看板
const ElectricDiagramPanel: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'rgb(54, 68, 91)', height: '100%' }}>
      <SubHeader
        title={'电力组态看板'}
        leftItem={
          <>
            <div>
              {data.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
            <div>
              {data.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
          </>
        }
      />
    </div>
  );
};

export default ElectricDiagramPanel;
