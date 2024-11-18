import { FC, memo, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = () => {
  return <div>This is Recommend</div>;
};

export default memo(Recommend);
