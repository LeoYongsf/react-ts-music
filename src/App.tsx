import { FC, memo, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "@/components/app-header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppPlayBar from "@/components/player/app-play-bar";
import AppFooter from "@/components/app-footer";

interface IProps {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const App: FC<IProps> = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader />
      <Outlet />
      <AppFooter />
      <AppPlayBar />
    </QueryClientProvider>
  );
};

export default memo(App);
