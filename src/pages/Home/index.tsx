import { FC, memo, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  return (
    <div>
      This is Home
      <Outlet />
    </div>);
};

export default memo(Home);