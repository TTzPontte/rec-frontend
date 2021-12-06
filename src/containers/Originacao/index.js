import { DownSquareOutlined, MailOutlined, UpSquareOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Collapse from '@iso/components/uielements/collapse';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import InputPersonalizado from '../../components/InputPersonalizado';
import SelectPersonalizado from '../../components/SelectPersonalizado';
import TextAreaPersonalizado from '../../components/TextAreaPersonalizado';
import InputMaskPersonalizado from '../../components/InputMaskPersonalizado';
import { Container } from '../style';
import '../style.css';
import InputMask from 'react-input-mask';

import Api from '../../api';
export default function Originacao({ uuid }) {
    const [tiposOperacao, setTiposOperacao] = useState(['SAC', 'PRICE']);
    const [formulaAmortizacao, setFormulaAmortizacao] = useState(['SAC', 'PRICE']);
    const [values, setValues] = React.useState(null);
    const [valuesSimulacao, setValuesSimulacao] = React.useState(null);
    const [valuesConsultorParceiro, setValuesConsultorParceiro] = React.useState(null);
    const [valuesConsultor, setValuesConsultor] = React.useState(null);
    const api = new Api();

    useEffect(() => {
        async function findByUuid() {
            let response = await api.buscarProcessoByUuid('/processo/'.concat(uuid + '/0/1'));

            let valorInformadoImovel = 0;
            if (response.patrimonios) {
                {
                    response.patrimonios.map((arg) => (
                        valorInformadoImovel = arg.patrimonio.valorInformado +valorInformadoImovel
                    ))
                }

            }else {
                response.patrimonios = {};
            }

            if (!response.simulacao) {
                response.simulacao = {};
            }

            if (!response.processoAnexo) {
                response.processoAnexo = {};
            }

            response.cpf = "40205783899";
            response.consultor.parceiro.telefoneRepresentanteLegal = "17991618479";
            response.valorInformadoImovel = valorInformadoImovel;
            setValues(response);
            setValuesSimulacao(response.simulacao);
            setValuesConsultorParceiro(response.consultor.parceiro);
            setValuesConsultor(response.consultor);
            console.log('response.simulacao');
            console.log(response.simulacao);
            console.log('response.consultor');
            console.log(response.consultor);
            console.log('response.consultor.parceiro');
            console.log(response.consultor.parceiro);
        }
        findByUuid();

    }, []);


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

    const onSave = (e) => {
        // e.preventDefault();

        const consultor = {...valuesConsultor, parceiro: valuesConsultorParceiro}

        const formValues = { ...values, simulacao: valuesSimulacao, consultor: consultor};

        console.log(formValues);
        async function submit() {
            try {
                const response = await api.salvarProcesso(`/processo/${formValues.id}`, formValues);
                console.log('response');
                console.log(response);
                if (response.data.returnCode === 200) {
                    // FormUtils.openNotification(
                    //     'success',
                    //     'Sucesso',
                    //     'Processo Atualizado com sucesso'
                    // );
                    // handleRedirect();
                } else {
                    // FormUtils.openNotification('error', 'Atenção', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        // if (validateForm()) {
            submit();
        // }
    };

    const operacao = {
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
    }

    const handleInputChange = (e) => {
        console.log(e);
        const auxValues = { ...values };
        auxValues[e.target.id] = e.target.value;
        setValues(auxValues);
        console.log(values);
    };

    const handleInputChangeSimulacao = (e) => {
        console.log(e);
        const auxValues = { ...valuesSimulacao };
        auxValues[e.target.id] = e.target.value;
        setValuesSimulacao(auxValues);
        console.log(valuesSimulacao);
    };

    const handleInputChangeConsultorParceiro = (e) => {
        console.log(e);
        const auxValues = { ...valuesConsultorParceiro };
        auxValues[e.target.id] = e.target.value;
        setValuesConsultorParceiro(auxValues);
        console.log(valuesConsultorParceiro);
    };

    const handleInputChangeConsultor = (e) => {
        console.log(e);
        const auxValues = { ...valuesConsultor };
        auxValues[e.target.id] = e.target.value;
        setValuesConsultor(auxValues);
        console.log(valuesConsultor);
    };

    const handleInputMaskChange = (e) => {
        // console.log(e);
        const auxValues = { ...values };

        let str = e.target.value;
        auxValues[e.target.id] = onlyNumbers(str);
        setValues(auxValues);
        console.log(values);

    };

    const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');


    return (

        (values && valuesSimulacao && valuesConsultor && valuesConsultorParceiro &&
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
                                        <InputPersonalizado texto="Nome da empresa parceira" valorCampo={valuesConsultorParceiro.nome} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="nome" />
                                    </Col>
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Email do parceiro" valorCampo={valuesConsultorParceiro.contato} iconeLabel={<MailOutlined />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="contato" />
                                    </Col>
                                </Row>
                                <Row style={rowStyle} gutter={gutter} justify="start">
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Nome do parceiro" valorCampo={valuesConsultor.nome} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" />
                                    </Col>
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputMaskPersonalizado texto="Telefone" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<WhatsAppOutlined />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" mask="(99) 99999-9999"/>
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
                                        <SelectPersonalizado texto="Formula de amortização" valorCampo={values.amortizacao} iconeLabel={<DownSquareOutlined />} lista={formulaAmortizacao} onSave={onSave} handleChange={handleInputChange} idCampo="formulaAmortizacao" />
                                    </Col>
                                </Row>
                                <Row style={rowStyle} gutter={gutter} justify="start">
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Valor da operação" valorCampo={values.valorSolicitado} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="valorOperacao" />
                                    </Col>
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Mês do ano sem pagar" valorCampo={valuesSimulacao.mesAnoSemPagar} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="mesSemPagar" />
                                    </Col>
                                </Row>

                                <Row style={rowStyle} gutter={gutter} justify="start">
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Valor informado do imóvel" valorCampo={values.valorInformadoImovel} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="valorInformadoImovel" />
                                    </Col>
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Carência" valorCampo={valuesSimulacao.carencia} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="carencia" />
                                    </Col>
                                </Row>
                                <Row style={rowStyle} gutter={gutter} justify="start">
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Renda composta" valorCampo={valuesSimulacao.rendaMensal} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="rendaComposta" />
                                    </Col>
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="Motivo do empréstimo" valorCampo={valuesSimulacao.motivacao} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="motivoEmprestimo" />
                                    </Col>
                                </Row>
                                <Row style={rowStyle} gutter={gutter} justify="start">
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <InputPersonalizado texto="CEP do imóvel" valorCampo={values.patrimonios.cep} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="cepImovel" />
                                    </Col>
                                    <br />
                                    <Col sm={11} md={11} xs={11} style={colStyle}>
                                        <InputPersonalizado texto="Prazo de pagamento" valorCampo={valuesSimulacao.prazo} iconeLabel={<DownSquareOutlined />} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="prazoPagamento" />
                                    </Col>
                                    <Col sm={18} md={12} xs={12} style={colStyle}>
                                        <TextAreaPersonalizado texto="Informações adicionais" valorCampo={values.processoAnexo.texto} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="informacoesAdicionais" />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                    </Panel>
                </Collapse>
            </Container>
        )

    );
}
