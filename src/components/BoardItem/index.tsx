import styles from './index.less';

interface Item_H {
  icon: any;
  title: string;
  num?: any;
}

interface Item_V {
  icon: any;
  title: string;
  num: any;
  line?: number | string;
}

const Item_H = ({ icon, title, num }: Item_H) => {
  return (
    <div className={styles.content_H}>
      <span className={styles.icon_H}>{icon}</span>
      <span className={styles.title_H}>{title}</span>
      {num ? <span className={styles.num_H}>{num}</span> : null}
    </div>
  );
};

export const Item_V = ({ icon, title, num, line }: Item_V) => {
  return (
    <div className={styles.content_V} style={{ marginTop: line }}>
      <div className={styles.leftIcon_V}>{icon}</div>
      <div className={styles.rightBox_V}>
        <div className={styles.title_V}>{title}</div>
        <div className={styles.num_V}>{num}</div>
      </div>
    </div>
  );
};

export default Item_H;
