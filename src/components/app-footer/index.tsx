import { FC, memo, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const AppFooter: FC<IProps> = () => {
  return <div style={{height: '70px',backgroundColor:'rgba(132,123,123,0.32)'}}>This is AppFooter</div>;
};

export default memo(AppFooter);
