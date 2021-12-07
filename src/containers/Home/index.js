
import { Button, Pagination } from "antd";
import { Input } from 'antd';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { List, Col, Row } from 'antd';
import { useState, useCallback } from 'react';
import React from 'react';
import './style.css';
import {
    Container,
    Form,
    Main,
    InputDiv,
    ButtonDiv,
    IconBuscaDiv,
  } from './styled-components';
import { ReactComponent as IconCheck32x32 } from '../../assets/Icon-check-32x32.svg';  

import Api from '../../api';
import Topbar from "../Topbar/Topbar";
import { set } from "nprogress";

export default function Home({ handleOperacao }) {

    const tableColumns = [
        {
            title: 'Id Operação',
            dataIndex: 'uuid',
            rowKey: 'uuid',
            width: '5%',
            render: (text, processo) => (
                <Button
                    type="text"
                    onClick={() => handleOperacao(processo)}
                    title={processo.uuid}
                >
                    {processo.uuid}
                </Button>
            ),
        },
        {
            title: 'Origem',
            dataIndex: 'origem',
            rowKey: 'origem',
            width: '5%',
            render: (text, processo) => (
                <Button
                    type="text"
                    onClick={() => handleOperacao(processo)}
                    title={processo.origem}
                >
                    {processo.origem}
                </Button>
            ),
        },        
        {
            title: 'Valor da Operação',
            dataIndex: 'valorSolicitado',
            rowKey: 'valorSolicitado',
            width: '5%',
            render: (text, processo) => (
                <Button
                    type="text"
                    onClick={() => handleOperacao(processo)}
                    title={processo.valorSolicitado}
                >
                    {processo.valorSolicitado}
                </Button>
            ),
        },                
        {
            title: 'Tomador de Empréstimo',
            dataIndex: 'tomador',
            rowKey: 'tomador',
            width: '5%',
            render: (text, processo) => (
                <Button
                    type="text"
                    onClick={() => handleOperacao(processo)}
                    title={processo.tomador}
                >
                    {processo.tomador}
                </Button>
            ),
        },                        
        {
            title: 'CPF Tomador',
            dataIndex: 'cpfTomador',
            rowKey: 'cpfTomador',
            width: '5%',
            render: (text, processo) => (
                <Button
                    type="text"
                    onClick={() => handleOperacao(processo)}
                    title={processo.cpfTomador}
                >
                    {processo.cpfTomador}
                </Button>
            ),
        },
    ];

    const api = new Api();
    const [textoBusca, setTextoBusca] = useState('');
    // const [processos, setProcessos] = useState([]);
    const [processosSearch, setProcessosSearch] = useState({skip: 0, take: 10, total: 0, processos: 0});

    async function search() {
        await api.busca('/processo/search?term='
        .concat(textoBusca)
        .concat('&page=')
        .concat(processosSearch.skip)
        .concat('&size=')
        .concat(processosSearch.take), setProcessosSearch);
    }

    function handleTextBuscaFn(evento: any) {
        setTextoBusca(evento.target.value);
    }
    const handleTextBusca = useCallback(handleTextBuscaFn, []);
    
    async function handleSubmitFn(evento: any) {
        evento.preventDefault();
        await search();
    }
    const handleSubmit = useCallback(handleSubmitFn, [textoBusca]);    

    async function handleTableChange(page: any) {
        processosSearch.skip = processosSearch.take * (page.current - 1);
        await search();
    };

    async function onChangePagination(pageNumber) {
        processosSearch.skip = processosSearch.take * (pageNumber - 1);
        await search();
    }   

    const rowStyle = {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
    };

    const colStyle = {
        marginBottom: '5px',
    };

    const divForm = {
        height: '75px',
    }

    const gutter = 16;
    return (
        <Container>
            <Topbar/>
            <Main>
                <Form>
                    <div style={divForm}>
                        <IconBuscaDiv>
                            <IconCheck32x32 />
                        </IconBuscaDiv>
                        <InputDiv>
                            <Input 
                                name="texto-busca"
                                bordered={false}
                                className="home_input-busca"
                                onChange={handleTextBusca}
                            />
                        </InputDiv>
                        <ButtonDiv>
                            <Button
                                type="primary"
                                className="home_botao-busca"
                                onClick={handleSubmit}
                            >
                                Pesquisar
                            </Button>
                        </ButtonDiv>
                    </div>
                </Form>

                {/* <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col span={2}></Col>
                    <Col span={20} style={colStyle}>
                        <TableWrapper
                            rowKey='uuid'
                            dataSource={processosSearch.processos}
                            columns={tableColumns}
                            pagination={{
                                defaultCurrent: processosSearch.take + 1,
                                total: processosSearch.total,
                                // pageSize: processosSearch.take,
                            }}
                            style={{ marginTop: '20px', width: '100%' }}
                            onChange={handleTableChange}                            
                        />
                    </Col>
                    <Col span={2}></Col>
                </Row> */}

                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col span={2}></Col>
                    <Col span={20} style={colStyle}>
                    <List
                        header={
                            <div className="home_item-lista">                                
                                <table className="home_table-list-header" style={ {width: '99%', marginLeft: '5px'} }>
                                    <colgroup>
                                        <col style={ {width: '23%'} } />
                                        <col style={ {width: '20%'} } />
                                        <col style={ {width: '20%'} } />
                                        <col style={ {width: '20%'} } />
                                        <col style={ {width: '20%'} } />
                                    </colgroup>                                    
                                    <thead className="ant-table-thead">
                                        <tr>
                                            <th className="ant-table-cell" style={ {width: '23%', background: '#ffffff', borderBottom: '0px'} } >Id Operação</th>
                                            <th className="ant-table-cell" style={ {width: '20%', background: '#ffffff', borderBottom: '0px'} } >Origem</th>
                                            <th className="ant-table-cell" style={ {width: '20%', background: '#ffffff', borderBottom: '0px'} } >Valor da Operação</th>
                                            <th className="ant-table-cell" style={ {width: '20%', background: '#ffffff', borderBottom: '0px'} } >Tomador de Empréstimo</th>
                                            <th className="ant-table-cell" style={ {width: '20%', background: '#ffffff', borderBottom: '0px'} } >CPF Tomador</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        }
                        dataSource={Array.from(processosSearch.processos)}
                        renderItem={item =>  (
                            <List.Item 
                                className="home_item-lista" style={ {borderLeft: '5px solid #5C3B6B'} }
                            >
                                <table className="home_table-list-header" style={ {width: '100%'} }>
                                    <colgroup>
                                        <col style={ {width: '23%'} } />
                                        <col style={ {width: '20%'} } />
                                        <col style={ {width: '20%'} } />
                                        <col style={ {width: '20%'} } />
                                        <col style={ {width: '20%'} } />
                                    </colgroup>                                    
                                    <tbody className="ant-table-tbody">
                                        <tr data-row-key={item.uudi} className="ant-table-row ant-table-row-level-0">
                                            <td className="ant-table-cell" style={ {width: '23%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.uudi} >
                                                    <span>{item.uuid}</span>
                                                </Button>    
                                            </td>
                                            <td className="ant-table-cell" style={ {width: '20%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.origem} >
                                                    <span>{item.origem}</span>
                                                </Button>
                                            </td> 
                                            <td className="ant-table-cell" style={ {width: '20%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.valorSolicitado} >
                                                    <span>{item.valorSolicitado}</span>
                                                </Button>
                                            </td> 
                                            <td className="ant-table-cell" style={ {width: '20%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.tomador} >
                                                    <span>{item.tomador}</span>
                                                </Button>
                                            </td>                  
                                            <td className="ant-table-cell" style={ {width: '20%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.cpfTomador} >
                                                    <span>{item.cpfTomador}</span>
                                                </Button>
                                            </td>                                                                                                                                                            
                                        </tr>                                     
                                    </tbody>    
                                </table>
                            
                            </List.Item>
                        )
                        }
                    />
                    <div style={ { float: 'right', marginRight: '10px', height: '100px' } } ><Pagination defaultCurrent={1} onChange={onChangePagination} total={processosSearch.total} /></div>
                    </Col>
                    <Col span={2}></Col>
                </Row>

            </Main>
        </Container>        
    );
}
