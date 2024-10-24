import React, { useEffect, useState } from "react";
import IndexRouter from "./router/IndexRouter";

// styles
import "./index.scss";
import "./styles/scroll.scss";
import "./styles/antdStyles.scss";
import "./styles/vditor.scss";

// antd全局配置
import { ConfigProvider, App as AntdApp } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";

// 快乐主题
import { HappyProvider } from "@ant-design/happy-work-theme";

// redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

// redux 持久化
import { PersistGate } from "redux-persist/integration/react";

// nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ minimum: 0.2, easing: "ease", speed: 500 });

// antd的日期和日历插件
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

// 国际化
import "./i18n";
import { useTranslation } from "react-i18next";

function App() {
  const storedLocale = localStorage.getItem("i18nextLng");
  const [antdLocale, setAntdLocale] = useState(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.t = t;
    window.i18n = i18n;
    setAntdLocale(storedLocale === "en" ? enUS : zhCN);
  }, []);

  const themeStyle = {
    // colorPrimary: "#8315F9",
    colorPrimary: "#2313d3",
    borderRadius: 8,
    controlHeight: 36,
  };

  return (
    <ConfigProvider theme={{ token: themeStyle }} locale={antdLocale}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AntdApp>
            <HappyProvider>
              <IndexRouter />
            </HappyProvider>
          </AntdApp>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
