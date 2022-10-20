import styles from './404.less';
import { history } from '@umijs/max';
const NotFoundPage: React.FC = () => {
  const JumpToHome = (e: any) => {
    e.preventDefault();
    history.push('/home');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentImg}></div>
        <p>
          页面找不到了，要不<a onClick={(e) => JumpToHome(e)}>返回首页</a>
          试试吧！
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
