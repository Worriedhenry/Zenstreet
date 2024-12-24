"use client"
import { Toaster } from "@/components/ui/toaster"
import Footer from "./footer";
import Header from "./header";
import { Provider } from "react-redux";
import Steps from "./steps";
import store from '../store/index';
export default function Home() {
  return (
    <Provider store={store}>
    <div className="h-screen flex flex-col justify-between">
      <div className="w-full"><Header /> </div>
      <div className="h-full w-full flex bg-gray-100 dark:bg-gray-700">
        <Steps />
      </div>
      <Toaster />
      <div className="sticky bottom-0"><Footer></Footer></div>
    </div>
    </Provider>
  );
}
