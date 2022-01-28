import React from "react";
import Collapse from "@iso/components/shared/template/uielements//collapse";
import { Container } from "./styles";

export const CollapsePersonalizado = ({
  title,
  children,
  startOpen = true,
}) => {
  const { Panel } = Collapse;

  const isOpen = startOpen ? 1 : 0;

  return (
    <Container>
      <Collapse expandIconPosition="right" defaultActiveKey={isOpen}>
        <Panel classname="panelCollapse" header={title} key="1">
          {children}
        </Panel>
      </Collapse>
    </Container>
  );
};
