import { DownSquareOutlined, MailOutlined, UpSquareOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Collapse from '@iso/components/uielements/collapse';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Api from '../../api';
import InputMaskPersonalizado from '../../components/InputMaskPersonalizado';
import InputMonetarioPersonalizado from '../../components/InputMonetarioPersonalizado';
import InputPersonalizado from '../../components/InputPersonalizado';
import SelectPersonalizado from '../../components/SelectPersonalizado';
import TextAreaPersonalizado from '../../components/TextAreaPersonalizado';
import { Container } from '../style';
import './style.css';
import {
    MatchText,
    SearchProvider,
    SearchContext,
    SearchEventContext,
} from 'react-ctrl-f';

export default function Originacao({ uuid }) {
    const [tiposOperacao, setTiposOperacao] = useState([1, 2]);
    const [formulaAmortizacao, setFormulaAmortizacao] = useState(['SAC', 'PRICE']);
    const [values, setValues] = React.useState(null);
    const [valuesSimulacao, setValuesSimulacao] = React.useState(null);
    const [valuesConsultorParceiro, setValuesConsultorParceiro] = React.useState(null);
    const [valuesConsultor, setValuesConsultor] = React.useState(null);
    const [valuesProcessoAnexo, setValuesProcessoAnexo] = React.useState(null);
    const api = new Api();

    useEffect(() => {
        async function findByUuid() {
            let response = await api.buscarProcessoByUuid('/processo/'.concat(uuid + '/0/1'));

            let valorInformadoImovel = 0;
            if (response.patrimonios) {
                {
                    response.patrimonios.map((arg) => (
                        valorInformadoImovel = arg.patrimonio.valorInformado + valorInformadoImovel
                    ))
                }

            } else {
                response.patrimonios = {};
            }

            if (!response.simulacao) {
                response.simulacao = {};
            }

            if (!response.processoAnexo) {

                response.processoAnexo = {};
                setValuesProcessoAnexo(response.processoAnexo);
            } else {
                response.processoAnexo.map((p) => (
                    setValuesProcessoAnexo(p.tipo == "info_adicional" ? p : null)
                ))
            }

            response.valorInformadoImovel = valorInformadoImovel;
            setValues(response);
            setValuesSimulacao(response.simulacao);
            setValuesConsultorParceiro(response.consultor.parceiro);
            setValuesProcessoAnexo(response.processoAnexo);
            setValuesConsultor(response.consultor);
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

    const gutter = 16;

    const onSave = (e) => {
        // e.preventDefault();
        const auxValues = { ...values };
        const auxValuesSimulacao = { ...valuesSimulacao };

        if (auxValues.valorSolicitado)
            auxValues['valorSolicitado'] = Number(auxValues.valorSolicitado.toString().replace(',', '.'));

        if (auxValuesSimulacao.rendaMensal)
            auxValuesSimulacao['rendaMensal'] = Number(auxValuesSimulacao.rendaMensal.toString().replace(',', '.'));

        const consultor = { ...valuesConsultor, parceiro: valuesConsultorParceiro }

        const formValues = { ...auxValues, simulacao: auxValuesSimulacao, consultor: consultor };

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


    const handleInputChange = (e) => {
        console.log(e);
        const auxValues = { ...values };
        auxValues[e.target.id] = e.target.value;
        setValues(auxValues);
        console.log(values);
    };

    const handleInputChangeNumber = (e) => {
        console.log(e);
        const auxValues = { ...values };
        auxValues[e.target.id] = e.target.valueAsNumber;
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
        console.log(e.target.value);
        const auxValues = { ...valuesSimulacao };
        let str = e.target.value;
        auxValues[e.target.id] = str;
        setValuesSimulacao(auxValues);
        console.log(valuesSimulacao);

    };

    const handleInputMonetarioChange = (e) => {
        let str = e.target.value;
        const auxValues = { ...values };
        let valor = onlyMonetario(str);
        auxValues[e.target.id] = valor;
        setValues(auxValues);
        console.log(auxValues);
        console.log(valor);

    };

    const handleInputMonetarioChangeSimulacao = (e) => {
        let str = e.target.value;
        const auxValues = { ...valuesSimulacao };
        let valor = onlyMonetario(str);
        auxValues[e.target.id] = valor;
        setValuesSimulacao(auxValues);
        console.log(auxValues);
        console.log(valor);

    };

    var onlyMonetario = (str) => str.replace(/[\R$.]/g, '');

    const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

    return (
        (values &&
            <Container>

                {(values && valuesConsultor && valuesConsultorParceiro &&

                    <Collapse expandIconPosition="right" defaultActiveKey={["1"]} className="fundoRoxo">

                        <Panel
                            header="PARCEIRO | CRÉDITO BOM DEMAIS"
                            key="1" >

                            <div className="pontilhado">
                                <div className="conteudo">
                                    <h2>INFORMAÇÕES PESSOAIS</h2>
                                        <MatchText id='match-text-id-1'>
                                        <h2>INFORMAÇÕES PESSOAIS</h2>
                                        </MatchText>

                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome da empresa parceira" valorCampo={valuesConsultorParceiro.nome} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Email do parceiro" valorCampo={valuesConsultorParceiro.contato} iconeLabel={<MailOutlined />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="contato" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome do parceiro" valorCampo={valuesConsultor.nome} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMaskPersonalizado texto="Telefone" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<WhatsAppOutlined />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" mask="(99) 99999-9999" editavel={false} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </Panel>

                    </Collapse>
                )}
                <br />
                {(valuesSimulacao &&
                    <Collapse expandIconPosition="right" defaultActiveKey={["1"]} className="fundoRoxo">
                        <Panel
                            background='purple'
                            header="OPERAÇÃO | HOME EQUITY"
                            key="1" >

                            <div className="pontilhado">
                                <div className="conteudo">
                                    <h2>INFORMAÇÕES DA OPERAÇÃO</h2>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Tipo de operação" valorCampo={values.processoTipo} iconeLabel={<DownSquareOutlined />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChange} idCampo="processoTipo" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Formula de amortização" valorCampo={values.amortizacao} iconeLabel={<DownSquareOutlined />} lista={formulaAmortizacao} onSave={onSave} handleChange={handleInputChange} idCampo="amortizacao" />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMonetarioPersonalizado texto="Valor da operação" valorCampo={values.valorSolicitado} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputMonetarioChange} idCampo="valorSolicitado" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Mês do ano sem pagar" valorCampo={valuesSimulacao.mesAnoSemPagar} iconeLabel={<DownSquareOutlined />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="mesAnoSemPagar" />
                                        </Col>
                                    </Row>

                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMonetarioPersonalizado texto="Valor informado do imóvel" valorCampo={values.valorInformadoImovel} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputMonetarioChange} idCampo="valorInformadoImovel" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Carência" valorCampo={valuesSimulacao.carencia} iconeLabel={<DownSquareOutlined />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="carencia" />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMonetarioPersonalizado texto="Renda composta" valorCampo={valuesSimulacao.rendaMensal} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputMonetarioChangeSimulacao} idCampo="rendaMensal" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Motivo do empréstimo" valorCampo={valuesSimulacao.motivacao} iconeLabel={<DownSquareOutlined />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="motivacao" />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={16} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMaskPersonalizado texto="CEP do imóvel" valorCampo={valuesSimulacao.cep} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputMaskChange} idCampo="cep" mask="99999-999" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <TextAreaPersonalizado texto="Informações adicionais" valorCampo={valuesProcessoAnexo.texto} iconeLabel={<UpSquareOutlined />} onSave={onSave} handleChange={handleInputChange} idCampo="texto" />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={16} justify="start">
                                        <Col sm={11} md={11} xs={11} style={colStyle}>
                                            <SelectPersonalizado texto="Prazo de pagamento" valorCampo={valuesSimulacao.prazo} iconeLabel={<DownSquareOutlined />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="prazo" />
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </Panel>
                    </Collapse>
                )}
            </Container>
        )
    );
}
