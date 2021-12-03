import Collapse from '@iso/components/uielements/collapse';
import PageHeader from '@iso/components/utility/pageHeader';
import React, { useEffect, useState } from 'react';
import { Container } from '../style';
import Input, { Textarea } from '@iso/components/uielements/input';
import Topbar from '../Topbar/Topbar';
import '../style.css';
import { Col, Row } from 'antd';
import { UpSquareOutlined, DownSquareOutlined, WhatsAppOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';

import InputPersonalizado from '../../components/InputPersonalizado';
import SelectPersonalizado from '../../components/SelectPersonalizado';
import TextAreaPersonalizado from '../../components/TextAreaPersonalizado';

export default function Originacao({ operacao }) {
    const [tiposOperacao, setTiposOperacao] = useState(['SAC', 'PRICE']);
    const [formulaAmortizacao, setFormulaAmortizacao] = useState(['SAC', 'PRICE']);
    const [values, setValues] = React.useState(operacao);


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

    const onSave = () => {
        console.log(values)
    }


    const handleInputChange = (e) => {
        console.log(e);
        const auxValues = { ...values };
        auxValues[e.target.id] = e.target.value;
        setValues(auxValues);
        console.log(values);
    };


    return (
        <Container>

            {/* <Topbar operacao={operacao} /> */}


            <Collapse expandIconPosition="right" defaultActiveKey={["1"]} className="fundoRoxo">
                <Panel
                    header="PARCEIRO | CRÉDITO BOM DEMAIS"
                    key="1" >

                    <div className="pontilhado">
                        <div className="conteudo">
                            <h2>INFORMAÇÕES PESSOAIS</h2>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Nome da empresa parceira" valorCampo={operacao.nomeEmpresa} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="nomeEmpresa" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Email do parceiro" valorCampo={operacao.emailParceiro} iconeLabel={<MailOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="emailParceiro" />
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Nome do parceiro" valorCampo={operacao.nomeParceiro} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="nomeParceiro" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Telefone" valorCampo={operacao.telefone} iconeLabel={<WhatsAppOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="telefone" />
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
                                    <SelectPersonalizado texto="Tipo de operação" valorCampo={operacao.tipoOperacao} iconeLabel={<DownSquareOutlined />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChange} idCampo="tipoOperacao" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <SelectPersonalizado texto="Formula de amortização" valorCampo={operacao.formulaAmortizacao} iconeLabel={<DownSquareOutlined />} lista={formulaAmortizacao} onSave={onSave} handleChange={handleInputChange} idCampo="formulaAmortizacao" />
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Valor da operação" valorCampo={operacao.valorOperacao} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="valorOperacao" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Mês do ano sem pagar" valorCampo={operacao.mesSemPagar} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="mesSemPagar" />
                                </Col>
                            </Row>

                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Valor informado do imóvel" valorCampo={operacao.valorInformadoImovel} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="valorInformadoImovel" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Carência" valorCampo={operacao.carencia} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="carencia" />
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Renda composta" valorCampo={operacao.rendaComposta} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="rendaComposta" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="Motivo do empréstimo" valorCampo={operacao.motivoEmprestimo} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="motivoEmprestimo" />
                                </Col>
                            </Row>
                            <Row style={rowStyle} gutter={gutter} justify="start">
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <InputPersonalizado texto="CEP do imóvel" valorCampo={operacao.cepImovel} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="cepImovel" />
                                </Col>
                                <br />
                                <Col sm={11} md={11} xs={11} style={colStyle}>
                                    <InputPersonalizado texto="Prazo de pagamento" valorCampo={operacao.prazoPagamento} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="prazoPagamento" />
                                </Col>
                                <Col sm={18} md={12} xs={12} style={colStyle}>
                                    <TextAreaPersonalizado texto="Informações adicionais" valorCampo={operacao.informacoesAdicionais} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="informacoesAdicionais" />
                                </Col>
                            </Row>
                        </div>
                    </div>

                </Panel>
            </Collapse>
        </Container>
    );
}
