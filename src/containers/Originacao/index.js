import Collapse from '@iso/components/uielements/collapse';
import PageHeader from '@iso/components/utility/pageHeader';
import React from 'react';
import { Container } from '../style';
import Input from '@iso/components/uielements/input';
import '../style.css';
import { Col, Row } from 'antd';


export default function Originacao({operacao}) {

    const { Panel } = Collapse;
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
        <Container>
            <Collapse expandIconPosition="right" defaultActiveKey={["1"]} className="fundoRoxo">
                <Panel
                    header="PARCEIRO | CRÉDITO BOM DEMAIS"
                    key="1" >

                    <div className="pontilhado">
                        <div className="conteudo">
                            <h2>INFORMAÇÕES PESSOAIS</h2>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Nome da empresa parceira
                                    <Input defaultValue={operacao.nomeEmpresa}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Email do parceiro
                                    <Input defaultValue={operacao.emailParceiro}/>
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Nome do parceiro
                                    <Input defaultValue={operacao.nomeParceiro}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Telefone
                                    <Input defaultValue={operacao.telefone}/>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </Panel>
                   

            </Collapse>
            <br />
            <Collapse expandIconPosition="right" background="purple" defaultActiveKey={["1"]} className="fundoRoxo">
                <Panel
                    background='purple'
                    header="OPERAÇÃO | HOME EQUITY"
                    key="1" >

                    <div className="pontilhado">
                        <div className="conteudo">
                            <h2>INFORMAÇÕES DA OPERAÇÃO</h2>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Tipo de operação
                                    <Input defaultValue={operacao.tipoOperacao}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Formula de amortização
                                    <Input defaultValue={operacao.formulaAmortizacao}/>
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Valor da operação
                                    <Input defaultValue={operacao.valorOperacao}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Mês do ano sem pagar
                                    <Input defaultValue={operacao.mesSemPagar}/>
                                </Col>
                            </Row>

                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Valor informado do imóvel
                                    <Input defaultValue={operacao.valorInformadoImovel}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Carência
                                    <Input defaultValue={operacao.carencia}/>
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Renda composta
                                    <Input defaultValue={operacao.rendaComposta}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Motivo do empréstimo
                                    <Input defaultValue={operacao.motivoEmprestimo}/>
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    CEP do imóvel
                                    <Input defaultValue={operacao.cepImovel}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Informações adicionais
                                    <Input defaultValue={operacao.informacoesAdicionais}/>
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    Prazo de pagamento
                                    <Input defaultValue={operacao.prazoPagamento}/>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </Panel>


            </Collapse>
        </Container>
    );
}
