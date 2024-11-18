import { FC, memo, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Rank: FC<IProps> = () => {
  return <div>This is Rank</div>;
};

export default memo(Rank);
