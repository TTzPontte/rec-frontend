
import StringUtils from "../../utils/StringUtils";
import { Button, Pagination } from "antd";
import { Input } from 'antd';
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

export default function Home({ handleOperacao }) {

    const api = new Api();
    const [textoBusca, setTextoBusca] = useState('');
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
        height: '64px',
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

                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col span={2}></Col>
                    <Col span={20} style={colStyle}>
                    <List
                        header={
                            <div className="home_item-lista">                                
                                <table className="home_table-list-header" style={ {width: '99%', marginLeft: '5px'} }>
                                    <colgroup>
                                        <col style={ {width: '26%'} } />
                                        <col style={ {width: '9%'} } />
                                        <col style={ {width: '12%'} } />
                                        <col style={ {width: '16%'} } />
                                        <col style={ {width: '12%'} } />
                                    </colgroup>                                    
                                    <thead className="ant-table-thead">
                                        <tr>
                                            <th className="ant-table-cell" style={ {width: '26%', background: '#ffffff', borderBottom: '0px', paddingLeft: '20px', paddingTop: '20px'} } >Id Operação</th>
                                            <th className="ant-table-cell" style={ {width: '9%', background: '#ffffff', borderBottom: '0px', paddingTop: '20px'} } >Origem</th>
                                            <th className="ant-table-cell" style={ {width: '12%', background: '#ffffff', borderBottom: '0px', paddingTop: '20px'} } >Valor da Operação</th>
                                            <th className="ant-table-cell" style={ {width: '16%', background: '#ffffff', borderBottom: '0px', paddingTop: '20px'} } >Tomador de Empréstimo</th>
                                            <th className="ant-table-cell" style={ {width: '12%', background: '#ffffff', borderBottom: '0px', paddingTop: '20px'} } >CPF Tomador</th>
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
                                                    <span>{StringUtils.truncateString(item.origem, 12)}</span>
                                                </Button>
                                            </td> 
                                            <td className="ant-table-cell" style={ {width: '20%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.valorSolicitado} >
                                                    <span>{item.valorSolicitado}</span>
                                                </Button>
                                            </td> 
                                            <td className="ant-table-cell" style={ {width: '20%'} } >
                                                <Button type="text" onClick={() => handleOperacao(item)} title={item.tomador} >
                                                    <span>{StringUtils.truncateString(item.tomador, 22)}</span>
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
                    <div style={ { float: 'right', marginRight: '10px', height: '100px' } } >
                        <Pagination 
                            defaultCurrent={1} 
                            onChange={onChangePagination} 
                            total={processosSearch.total} 
                            showTotal={(total, range) => `${total} processos`}
                        />                          
                    </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>

            </Main>
        </Container>        
    );
}
