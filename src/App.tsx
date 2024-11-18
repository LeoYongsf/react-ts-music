import { FC, memo, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  return (
    <div>
      This is App
      <Outlet />
    </div>
  );
};

export default memo(App);
