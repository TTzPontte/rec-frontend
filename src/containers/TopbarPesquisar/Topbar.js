import { Layout } from 'antd';
import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import TopbarWrapper from './Topbar.styles';
import { ReactComponent as IconCheck32x32 } from '../../assets/Icon-check-32x32.svg';
import Input from '@iso/components/uielements/input';
import { Col, Row } from 'antd';
import './style.css';
import {
  SearchEventContext,
} from 'react-ctrl-f';

const { Header } = Layout;

export default function Topbar({ uiid }) {
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const { onSearchChange } = useContext(SearchEventContext);
  
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };

  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };

  const colStyle = {
    display: 'flex',
    marginBottom: '5px',
    alignItems: 'center',
  };
  const colStyle2 = {
    display: 'flex',
    marginBottom: '5px',
    alignItems: 'center',
    borderLeft: '1px solid #E1DFDF',
  };

  const inputStyled = {
    boxShadow: '0 0 0 0 !important',
    outline: ' 0 !important',
    width: '500px',
    height: '49px',
    margin: '12px',
    border: '0px',
    fontSize: '19px',

  }
  const iconeStyle = {
    width: '49px',
    height: '49px',
    margin: '12px',
    border: '0px',
  }

  const gutter = 16;
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >

        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col sm={15} md={15} xs={15} style={colStyle}>
            <h1>ID# {uiid}</h1>
          </Col>

          <Col sm={5} md={5} xs={5} style={colStyle2}>
            <IconCheck32x32 style={iconeStyle}/>
            <Input style={inputStyled} bordered={false} onChange={onSearchChange}/>
          </Col>
        </Row>
        {/* <div className="isoLeft">
          <h1>#{uiid}</h1>
        </div>

        <div className="isoCenter">

        </div>

        <div className="isoCenter">

          <Input addonBefore={<IconCheck32x32 />} />
        </div> */}
      </Header>
    </TopbarWrapper>
  );
}
