// import Button from '@iso/components/uielements/button';
import { Button } from "antd";
// import Input from '@iso/components/uielements/input';
import { Input } from 'antd';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Col, Row } from 'antd';
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

export default function Home({ handleOperacao }) {

    const tableColumns = [
        {
            title: 'Id Operação',
            dataIndex: 'uuid',
            rowKey: 'uuid',
            width: '5%',
            //className: 'home_tabela-cabecalho-left',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Origem',
            dataIndex: 'origem',
            rowKey: 'origem',
            width: '5%',
            render: (text) => <span>{text}</span>,
        },        
        {
            title: 'Valor da Operação',
            dataIndex: 'valorSolicitado',
            rowKey: 'valorSolicitado',
            width: '5%',
            render: (text) => <span>{text}</span>,
        },                
        {
            title: 'Tomador de Empréstimo',
            dataIndex: 'tomador',
            rowKey: 'tomador',
            width: '5%',
            render: (text) => <span>{text}</span>,
        },                        
        {
            title: 'CPF Tomador',
            dataIndex: 'cpfTomador',
            rowKey: 'cpfTomador',
            width: '5%',
            render: (text) => <span>{text}</span>,
        },                                
        {
            title: 'Ação',
            dataIndex: 'nome',
            rowKey: 'nome',
            width: '5%',
            //className: 'home_tabela-cabecalho-right',
            render: (text, operacao) => (
                <Button
                    type="primary"
                    onClick={() => handleOperacao(operacao)}
                    title="Detalhe"
                >
                    <i className="ion-android-search" />
                </Button>
            ),
        },
    ];

    const operacoes = {
        payload: {
            content: [
                {
                    nomeEmpresa: 'Fulano',
                    emailParceiro: 'email@fulano.com',
                    nomeParceiro: 'Parceiro Fulano',
                    telefone: '11 98989898',
                    tipoOperacao: 'Vendas',
                    formulaAmortizacao: 'SAC',
                    valorOperacao: '9999',
                    mesSemPagar: '1',
                    valorInformadoImovel: '999',
                    carencia: '5',
                    rendaComposta: '999',
                    motivoEmprestimo: 'Motivo qualquer',
                    cepImovel: '0601111',
                    informacoesAdicionais: 'Não há',
                    prazoPagamento: '360',
                },
                {
                    nomeEmpresa: 'Ciclado',
                    emailParceiro: 'email@fulano.com',
                    nomeParceiro: 'Parceiro Fulano',
                    telefone: '11 98989898',
                    tipoOperacao: 'Vendas',
                    formulaAmortizacao: 'SAC',
                    valorOperacao: '9999',
                    mesSemPagar: '1',
                    valorInformadoImovel: '999',
                    carencia: '5',
                    rendaComposta: '999',
                    motivoEmprestimo: 'Motivo qualquer',
                    cepImovel: '0601111',
                    informacoesAdicionais: 'Não há',
                    prazoPagamento: '360',
                },
                {
                    nomeEmpresa: 'Beltrano',
                    emailParceiro: 'email@fulano.com',
                    nomeParceiro: 'Parceiro Fulano',
                    telefone: '11 98989898',
                    tipoOperacao: 'Vendas',
                    formulaAmortizacao: 'SAC',
                    valorOperacao: '9999',
                    mesSemPagar: '1',
                    valorInformadoImovel: '999',
                    carencia: '5',
                    rendaComposta: '999',
                    motivoEmprestimo: 'Motivo qualquer',
                    cepImovel: '0601111',
                    informacoesAdicionais: 'Não há',
                    prazoPagamento: '360',
                },
            ],
            totalElements: 10,
            size: 10
        }
    };

    const api = new Api();
    const [textoBusca, setTextoBusca] = useState('');
    const [processos, setProcessos] = useState([]);

    function handleTextBuscaFn(evento: any) {
        setTextoBusca(evento.target.value);
      }
      const handleTextBusca = useCallback(handleTextBuscaFn, []);
    
      async function handleSubmitFn(evento: any) {
        evento.preventDefault();
        await api.busca(
          '/processo/search?term='.concat(textoBusca).concat('&page=0&size=100'),
          setProcessos
        );
      }
      const handleSubmit = useCallback(handleSubmitFn, [textoBusca]);    

    const handleTableChange = (e) => {
    };

    const rowStyle = {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
    };

    const colStyle = {
        marginBottom: '5px',
    };

    const gutter = 16;
    return (
        <Container>
            <Main>
                <Form>
                    <div>
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
                        <TableWrapper
                            dataSource={processos}
                            columns={tableColumns}
                            pagination={{
                                total: operacoes.payload.totalElements,
                                pageSize: operacoes.payload.size,
                            }}
                            style={{ marginTop: '20px', width: '100%' }}
                            onChange={handleTableChange}
                        />
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </Main>
        </Container>        
    );
}
