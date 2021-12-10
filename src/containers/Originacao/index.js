import { ReactComponent as IconDropdown } from '../../assets/icon-dropdown.svg';  
import { ReactComponent as IconPhone } from '../../assets/icon-phone-14x14.svg';  
import { ReactComponent as IconTextNumber } from '../../assets/icon-text_number.svg';  
import { ReactComponent as IconEmail } from '../../assets/icon-email-14x14.svg';  

import Collapse from '@iso/components/uielements/collapse';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Api from '../../api';
import InputMaskPersonalizado from '../../components/InputMaskPersonalizado';
import InputMonetarioPersonalizado from '../../components/InputMonetarioPersonalizado';
import RadioPersonalizado from '../../components/RadioPersonalizado';
import InputPersonalizado from '../../components/InputPersonalizado';
import SelectPersonalizado from '../../components/SelectPersonalizado';
import TextAreaPersonalizado from '../../components/TextAreaPersonalizado';
import { Container } from '../style';
import './style.css';

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
                response.processoAnexo.texto = "Lorem ipsum dolor sit amet consectetur adipiscing elit suspendisse aptent orci, facilisi eget facilisis nibh penatibus tincidunt mauris condimentum porta. Sollicitudin augue tincidunt vehicula interdum aliquam litora orci molestie, class varius libero adipiscing magnis nunc lorem, justo eros egestas habitant arcu risus gravida. Mauris in dictum non est cursus torquent venenatis facilisi porttitor gravida, primis finibus malesuada dapibus etiam eros suspendisse hac. Ac senectus erat urna ad hendrerit mus blandit egestas rutrum sagittis tempor, tristique phasellus nunc volutpat eu venenatis varius ullamcorper ultricies nullam. Rutrum in auctor suspendisse conubia hendrerit faucibus vel hac bibendum tristique rhoncus habitant aliquam ligula, tellus vitae potenti ridiculus varius nam duis cubilia est sem consequat sit primis. Massa cursus quam facilisi blandit ligula suscipit pulvinar odio turpis, ut fusce aenean etiam magnis non duis scelerisque, est rhoncus ultricies posuere dignissim cubilia amet placerat.";
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
    };

    const colStyle = {
        marginBottom: '40px',
        paddingBottom: '20px',
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
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome da empresa parceira" valorCampo={valuesConsultorParceiro.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Email do parceiro" valorCampo={valuesConsultorParceiro.contato} iconeLabel={<IconEmail />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="contato" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome do parceiro" valorCampo={valuesConsultor.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMaskPersonalizado texto="Telefone" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconPhone />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" mask="+ 99 (99) 99999-9999" editavel={false} />
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
                                            <SelectPersonalizado texto="Tipo de operação" valorCampo={values.processoTipo} iconeLabel={<IconDropdown />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChange} idCampo="processoTipo" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <RadioPersonalizado texto="Formula de amortização" valorCampo={values.amortizacao} iconeLabel={<IconDropdown />} lista={formulaAmortizacao} onSave={onSave} handleChange={handleInputChange} idCampo="amortizacao" />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMonetarioPersonalizado texto="Valor da operação" valorCampo={values.valorSolicitado} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputMonetarioChange} idCampo="valorSolicitado" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Mês do ano sem pagar" valorCampo={valuesSimulacao.mesAnoSemPagar} iconeLabel={<IconDropdown />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="mesAnoSemPagar" />
                                        </Col>
                                    </Row>

                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMonetarioPersonalizado texto="Valor informado do imóvel" valorCampo={values.valorInformadoImovel} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputMonetarioChange} idCampo="valorInformadoImovel" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Carência" valorCampo={valuesSimulacao.carencia} iconeLabel={<IconDropdown />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="carencia" />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMonetarioPersonalizado texto="Renda composta" valorCampo={valuesSimulacao.rendaMensal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputMonetarioChangeSimulacao} idCampo="rendaMensal" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <SelectPersonalizado texto="Motivo do empréstimo" valorCampo={valuesSimulacao.motivacao} iconeLabel={<IconDropdown />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="motivacao" />
                                        </Col>
                                    </Row>

                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputMaskPersonalizado texto="CEP do imóvel" valorCampo={valuesSimulacao.cep} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputMaskChange} idCampo="cep" mask="99999-999" />
                                            <br/>
                                            <div style={colStyle}/>
                                            <SelectPersonalizado texto="Prazo de pagamento" valorCampo={valuesSimulacao.prazo} iconeLabel={<IconDropdown />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="prazo" />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <TextAreaPersonalizado texto="Informações adicionais" valorCampo={valuesProcessoAnexo.texto} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChange} idCampo="texto" />
                                        </Col>
                                    </Row>
                                       
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                        </Col>
                                    {/* <Row style={rowStyle} gutter={16} justify="start">
                                        <Col sm={11} md={11} xs={11} style={colStyle}>
                                            <SelectPersonalizado texto="Prazo de pagamento" valorCampo={valuesSimulacao.prazo} iconeLabel={<IconDropdown />} lista={tiposOperacao} onSave={onSave} handleChange={handleInputChangeSimulacao} idCampo="prazo" />
                                        </Col>
                                    </Row> */}
                                </div>
                            </div>

                        </Panel>
                    </Collapse>
                )}
            </Container>
        )
    );
}
