import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import appActions from "@iso/redux/app/actions";
import ThemeSwitcher from "@iso/containers/ThemeSwitcher/ThemeSwitcher";
import siteConfig from "@iso/config/site.config";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import DashboardRoutes from "./DashboardRoutes";
import Button from "@iso/components/uielements/button";
import Home from "../Home";
import SideNavigation from "../SideNavigation";
import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";
import TopbarPesquisar from "../TopbarPesquisar/Topbar";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    //padding: '70px 0 0',
    flexShrink: "0",
    background: "#f1f3f6",
    position: "relative",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
    padding: "0px 50px",
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();

  const [operacao, setOperacao] = React.useState(null);

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  const handleOperacao = (e) => {
    console.log("---------------------------------------------------------");
    console.log(e);
    console.log("---------------------------------------------------------");
    setOperacao(e);
  };

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      {/* <Layout style={{ height: height }}>
        <Topbar operacao={operacao}/> */}

      {!operacao && (
        <Layout
          className="isoContentMainLayout"
          style={{
            height: appHeight,
          }}
        >
          <Content className="isomorphicContent" style={styles.content}>
            <Home handleOperacao={handleOperacao} />
            {/* <Button onClick={handleOperacao} >teste</Button> */}
          </Content>
        </Layout>
      )}

      {operacao && (
        <Layout style={{ height: height }}>
          {/* <Topbar operacao={operacao} /> */}
          <Layout style={styles.layout}>
            <SideNavigation handleOperacao={handleOperacao} />
            <Layout
              className="isoContentMainLayout"
              style={{
                height: appHeight,
              }}
            >
              <TopbarPesquisar uiid={operacao.uuid} />
              <Content className="isomorphicContent" style={styles.content}>
                <DashboardRoutes operacao={operacao} />
              </Content>
              <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
            </Layout>
          </Layout>

          <ThemeSwitcher />
        </Layout>
      )}
    </DashboardContainer>
  );
}
