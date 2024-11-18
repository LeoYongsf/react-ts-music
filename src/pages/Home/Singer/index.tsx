import { FC, memo, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const Singer: FC<IProps> = () => {
  return <div>This is Singer</div>;
};

export default memo(Singer);
