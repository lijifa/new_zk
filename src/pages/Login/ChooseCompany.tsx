// import React, {useEffect} from 'react';
import { useModel } from '@umijs/max';
import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import styles from './ChooseCompany.less';
interface companyItemDataType {
  key: number;
  label: string;
}

const ChooseCom = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const selectedCompany = initialState?.selectedCompany;
  const { isModalVisible, isOpenFun, callBackFun } = props;
  const [selectedItem, setSelectItem] = useState(selectedCompany);

  useEffect(() => {
    if (selectedCompany && selectedCompany.key !== 0) {
      setSelectItem(selectedCompany);
    }
  }, [selectedCompany]);

  const clickCompany = (itemData: companyItemDataType) => {
    setSelectItem(itemData);
  };

  const clickSubmit = async () => {
    callBackFun(selectedItem);
  };

  const clickClose = () => {
    isOpenFun(true);
  };

  const getCompanyListTpl = () => {
    let cdata = initialState?.currentCompany || [];

    return cdata.map((item: companyItemDataType, index: number) => {
      let itemSty = styles.companyItem;
      console.log(item.key, selectedItem?.key);
      console.log(typeof item.key, typeof selectedItem?.key);

      if (item.key === selectedItem?.key) {
        itemSty = `${styles.companyItem} ${styles.companyCheck}`;
      }
      return (
        <div
          className={itemSty}
          key={index}
          onClick={() => {
            clickCompany(item);
          }}
        >
          {item.label}
        </div>
      );
    });
  };

  return (
    <Modal
      width={520}
      title={null}
      footer={null}
      closable={false}
      destroyOnClose={true}
      centered
      // modalRender={()=> <ChooseCompany />}
      // bodyStyle={{padding:0, background: 'transparent'}}
      // style={{background: 'transparent'}}
      open={isModalVisible}
    >
      <div className={styles.companyListBox}>
        <div className={styles.contentTitle}>选择并进入企业</div>
        <div className={styles.companyContent}>{getCompanyListTpl()}</div>
        <div className={styles.companyBtn}>
          <Button className={styles.sureBtn} onClick={() => clickSubmit()}>
            确定
          </Button>
          <Button className={styles.closeBtn} onClick={() => clickClose()}>
            取消
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ChooseCom;
