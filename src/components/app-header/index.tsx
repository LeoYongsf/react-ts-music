import { FC, memo, ReactNode } from "react";
import headerTitles from "@/assets/data/header-titles.json";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = () => {
  function showItem(item: any) {
    if (item.type === "path") {
      return <NavLink to={item.link} className={styles.link}>
        {item.title}
        <i className={`sprite_01 ${styles.icon}`}></i>
      </NavLink>;
    } else {
      return <a href={item.link} target="_blank" rel="noreferrer">
        {item.title}
      </a>;
    }
  }

  return (
    <div className={styles.HeaderWrapper}>
      <div className={`wrap-v1 ${styles.content}`}>
        <div className={styles.HeaderLeft}>
          <a className={`sprite_01 ${styles.logo}`} href="/">
            网易云音乐
          </a>
          <div className={styles['title-list']}>
            {headerTitles.map((item) => {
              return (
                <div className={styles.item} key={item.title}>
                  {showItem(item)}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.HeaderRight}>
          <span>
          <Input
            className={styles.search}
            placeholder="音乐/MV/电台/用户"
            prefix={<SearchOutlined/>}/>
          </span>
          <span className={styles.center}>创作者中心</span>
          <span className={styles.login}>登录</span>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default memo(AppHeader);
