import { useLocation, useModel } from '@umijs/max';
import { Select } from 'antd';
import styles from './index.less';

interface SubHeader {
  title: any;
  leftItem?: any;
}
interface PageHeader {
  title?: string;
}

const onChange = (event: any) => {
  console.log('onChange:', event);
};

const SubHeader = ({ leftItem, title }: SubHeader) => {
  let LeftBox: any[] = [];
  if (leftItem?.props.children?.length !== undefined) {
    leftItem.props.children.map((res: any, index: any) => {
      LeftBox.push(
        <Select
          showSearch
          key={index}
          defaultValue={res.props.children[0]?.props.children}
          placeholder="请选择"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {
            Object.values(res.props.children).map((res) => {
              return res;
            }) as any
          }
        </Select>,
      );
    });
  } else {
    LeftBox.push(
      <Select
        showSearch
        key={leftItem.toString()}
        defaultValue={leftItem.props.children.props.children[0]?.props.children}
        placeholder="请选择"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {leftItem?.props.children.props.children}
      </Select>,
    );
  }
  return (
    <div className={styles.content}>
      <div className={styles.seat} />
      <div className={styles.leftItem}>{LeftBox}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.seat}></div>
    </div>
  );
};
export default SubHeader;

export const PageHeader = ({ title }: PageHeader) => {
  const { tags } = useModel('menuModel');
  const { pathname } = useLocation();

  // 获取标题
  const Title = () => {
    let txt = tags.find((item: any) => item.path === pathname);
    return txt?.label;
  };

  return (
    <div className={styles.PageHeader}>
      <div>
        <span className={styles.Title}>{title ?? Title()}</span>
      </div>
    </div>
  );
};
