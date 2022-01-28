import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import useWindowSize from "@iso/lib/shared/template/hooks/useWindowSize";
import appActions from "@iso/redux/shared/template/app/actions";
import ThemeSwitcher from "@iso/containers/shared/template/ThemeSwitcher/ThemeSwitcher";
import { DashboardRoutes } from "./dashboard.routes";
import Home from "@iso/containers/Home";
import { SideNavigation, Topbar } from "./components";
import { DashboardContainer, DashboardGlobalStyles } from "./styled-component";

const { Content } = Layout;
const { toggleAll } = appActions;

const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
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

  const handleOperacao = (e) => setOperacao(e);

  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      {!operacao && (
        <Layout
          className="isoContentMainLayout"
          style={{
            height: appHeight,
          }}
        >
          <Content className="isomorphicContent" style={styles.content}>
            <Home handleOperacao={handleOperacao} />
          </Content>
        </Layout>
      )}

      {operacao && (
        <Layout style={{ height: height }}>
          <Layout style={styles.layout}>
            <SideNavigation handleOperacao={handleOperacao} />
            <Layout
              className="isoContentMainLayout"
              style={{
                height: appHeight,
              }}
            >
              <Topbar uuid={operacao.uuid} />

              <Content className="isomorphicContent" style={styles.content}>
                <DashboardRoutes operacao={operacao} />
              </Content>
              
            </Layout>
          </Layout>
          <ThemeSwitcher />
        </Layout>
      )}
    </DashboardContainer>
  );
}
