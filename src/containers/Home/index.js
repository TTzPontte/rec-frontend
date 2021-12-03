import Button from '@iso/components/uielements/button';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Col, Row } from 'antd';
import React from 'react';
import './style.css';



export default function Home({ handleOperacao }) {

    const tableColumns = [

        {
            title: 'Nome',
            dataIndex: 'nome',
            rowKey: 'nome',
            width: '5%',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Ação',
            dataIndex: 'nome',
            rowKey: 'nome',
            width: '5%',
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
                    id: 8124678,
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
                    id: 987523,
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
                    id: 786124768,
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

    const divStyle = {
        border: '1px',
        solid: '#000',
    };

    const gutter = 16;
    return (
        <Row style={rowStyle} gutter={gutter} justify="start">
            <Col sm={18} md={20} xs={22} style={colStyle}>
                <TableWrapper
                    dataSource={operacoes.payload.content}
                    columns={tableColumns}
                    pagination={{
                        total: operacoes.payload.totalElements,
                        pageSize: operacoes.payload.size,
                    }}
                    style={{ marginTop: '20px', width: '100%' }}
                    onChange={handleTableChange}
                />
            </Col>
        </Row>
    );
}
