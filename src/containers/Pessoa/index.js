import { ReactComponent as IconDropdown } from '../../assets/icon-dropdown.svg';
import { ReactComponent as IconPhone } from '../../assets/icon-phone-14x14.svg';
import { ReactComponent as IconTextNumber } from '../../assets/icon-text_number.svg';
import { ReactComponent as IconEmail } from '../../assets/icon-email-14x14.svg';
import { ReactComponent as IconDocumentNumber } from '../../assets/icon-document_number.svg';
import { ReactComponent as IconCalendar } from '../../assets/icon-calendar.svg';
import { ReactComponent as IconNovaPessoa } from '../../assets/button-add.svg';

import backgroundModalNovaPessoa from "@iso/assets/back_nova_pessoa.svg";

import Collapse from '@iso/components/uielements/collapse';
import { Button, Col, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Api from '../../api';
import InputPersonalizado from '../../components/InputPersonalizado';
import { Container } from '../style';
import { DivContentModalPF, DivContentModalPJ, DivModalInputCPF, DivModalInputNome, DivModalNovaPessoa, DivModalPFInputCPF, DivModalPFInputNome, DivModalPFTexto, DivModalPFTextoCPF, DivModalPFTextoNome, DivModalPFTitulo, DivModalSelectTipoEnvolvimento, DivModalTexto, DivModalTextoCPF, DivModalTextoNome, DivModalTextoTipoEnvolvimento, DivModalTitulo, DivNovaPessoa, DivSpanNovaPessoa, SpanNovaPessoa } from './styled-components';
import './style.css';

const { Option } = Select;

export default function Pessoa({ uuid }) {
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
            if (response.consultor)
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
        marginBottom: '30px',
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

    const [isModalNovaPessoaVisible, setIsModalNovaPessoaVisible] = useState(false);
    const novaPessoaHandle = (e) => {
        console.log('Nova Pessoa');
        showModal();
    }
    const showModal = () => {
        setIsModalNovaPessoaVisible(true);
    };

    const handleOk = () => {
        setIsModalNovaPessoaVisible(false);
    };

    const handleCancel = () => {
        setIsModalNovaPessoaVisible(false);
    };     

    const [isModalNovaPessoaPFVisible, setIsModalNovaPessoaPFVisible] = useState(false);
    const showModalPF = () => {
        setIsModalNovaPessoaPFVisible(true);
    };

    const handlePFOk = () => {
        setIsModalNovaPessoaPFVisible(false);
    };

    const handlePFCancel = () => {
        setIsModalNovaPessoaPFVisible(false);
    };  

    const [isModalNovaPessoaPJVisible, setIsModalNovaPessoaPJVisible] = useState(false);
    const showModalPJ = () => {
        setIsModalNovaPessoaPJVisible(true);
    };

    const handlePJOk = () => {
        setIsModalNovaPessoaPJVisible(false);
    };

    const handlePJCancel = () => {
        setIsModalNovaPessoaPJVisible(false);
    }; 

    const handleNovaPessoaPF = () => {
        console.log("PF");
        handleCancel();
        showModalPF();
    }

    const handleNovaPessoaPJ = () => {
        console.log("PJ");
        handleCancel();
        showModalPJ();
    }

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
                            header={"PESSOA | " + valuesConsultorParceiro.nome}
                            key="1" >

                            <Collapse expandIconPosition="right" defaultActiveKey={["1"]} className="pontilhado conteudo">
                                <Panel
                                    header="INFORMAÇÕES DA PESSOA"
                                    key="1" >

                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome" valorCampo={valuesConsultorParceiro.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome do pai" valorCampo={valuesConsultorParceiro.contato} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="contato" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Papel na operação" valorCampo={valuesConsultor.nome} iconeLabel={<IconDropdown />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Profissão" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Renda aferida" valorCampo={valuesConsultor.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Estado civil" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconDropdown />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="E-mail" valorCampo={valuesConsultor.nome} iconeLabel={<IconEmail />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Regime de união" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconDropdown />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Celular" valorCampo={valuesConsultor.nome} iconeLabel={<IconPhone />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Logradouro | Endereço" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Data de nascimento" valorCampo={valuesConsultor.nome} iconeLabel={<IconCalendar />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Número | Endereço" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="CPF" valorCampo={valuesConsultor.nome} iconeLabel={<IconDocumentNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Complemento | Endereço" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="RG" valorCampo={valuesConsultor.nome} iconeLabel={<IconDocumentNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="CEP" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Orgão emissor" valorCampo={valuesConsultor.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Estado" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconDropdown />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nacionalidade" valorCampo={valuesConsultor.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Cidade" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Escolaridade" valorCampo={valuesConsultor.nome} iconeLabel={<IconDropdown />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Bairro" valorCampo={valuesConsultorParceiro.telefoneRepresentanteLegal} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultorParceiro} idCampo="telefone" editavel={false} />
                                        </Col>
                                    </Row>
                                    <Row style={rowStyle} gutter={gutter} justify="start">
                                        <Col sm={18} md={12} xs={12} style={colStyle}>
                                            <InputPersonalizado texto="Nome da mãe" valorCampo={valuesConsultor.nome} iconeLabel={<IconTextNumber />} onSave={onSave} handleChange={handleInputChangeConsultor} idCampo="nome" editavel={false} />
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            <DivNovaPessoa>
                                <IconNovaPessoa onClick={novaPessoaHandle} style={{cursor: 'pointer'}}/>
                                <Modal 
                                    style={{ top: 90, left: '35%', borderRadius: 5 }}  
                                    width={260}
                                    height={222}
                                    visible={isModalNovaPessoaVisible}
                                    closable 
                                    onOk={handleOk} 
                                    onCancel={handleCancel}
                                    footer={null}
                                    closable={false}
                                >
                                    <DivModalNovaPessoa>
                                        <DivSpanNovaPessoa><SpanNovaPessoa>Que tipo de pessoa você gostaria de adicionar?</SpanNovaPessoa></DivSpanNovaPessoa>
                                        <div><Button onClick={handleNovaPessoaPF} type="text" style={{ width: '210px', height: '35px', marginTop: '30px', borderStyle: 'solid', borderColor: 'gray'}}>Pessoa física</Button></div>
                                        <div><Button onClick={handleNovaPessoaPJ} type="text" style={{ width: '210px', height: '35px', marginTop: '10px', borderStyle: 'solid', borderColor: 'gray'}}>Pessoa jurídica</Button></div>
                                    </DivModalNovaPessoa>  
                                </Modal>                                 
                            </DivNovaPessoa>
                            <Modal 
                                    style={{ borderRadius: 10 }}  
                                    width={648}
                                    height={480}
                                    visible={isModalNovaPessoaPFVisible}
                                    closable 
                                    onOk={handlePFOk} 
                                    onCancel={handlePFCancel}
                                    footer={null}
                                    closable={false}
                                >
                                    <DivContentModalPF>
                                        <DivModalTitulo><span>Adiciona nova PF</span></DivModalTitulo>
                                        <DivModalTexto>
                                            <span>Antes de adicionarmos uma nova pessoa à operação, precisamos que você nos informe os dados abaixo! ;)</span>
                                        </DivModalTexto>
                                        <DivModalTextoTipoEnvolvimento>Tipo de envolvimento</DivModalTextoTipoEnvolvimento>    
                                        <DivModalSelectTipoEnvolvimento>
                                            <Select defaultValue="Tomador" style={{ width: 544 }} >
                                                <Option value="Composição de renda">Composição de renda</Option>
                                                <Option value="Tomador">Tomador</Option>
                                            </Select>
                                        </DivModalSelectTipoEnvolvimento>
                                        <DivModalTextoNome>Nome</DivModalTextoNome>
                                        <DivModalInputNome><Input placeholder="Nome..." style={{width: 544, height: 40}} /></DivModalInputNome>
                                        <DivModalTextoCPF>CPF</DivModalTextoCPF>
                                        <DivModalInputCPF><Input placeholder="CPF..." style={{width: 544, height: 40}}/></DivModalInputCPF>
                                    </DivContentModalPF>
                            </Modal> 
                            <Modal 
                                    style={{ borderRadius: 5 }}  
                                    width={648}
                                    height={480}
                                    visible={isModalNovaPessoaPJVisible}
                                    closable 
                                    onOk={handlePJOk} 
                                    onCancel={handlePJCancel}
                                    footer={null}
                                    closable={false}
                                >
                                    <DivContentModalPJ>
                                    <DivModalTitulo><span>Adiciona nova PJ</span></DivModalTitulo>
                                        <DivModalTexto>
                                            <span>Antes de adicionarmos uma nova pessoa à operação, precisamos que você nos informe os dados abaixo! ;)</span>
                                        </DivModalTexto>
                                        <DivModalTextoTipoEnvolvimento>Tipo de envolvimento</DivModalTextoTipoEnvolvimento>    
                                        <DivModalSelectTipoEnvolvimento>
                                            <Select defaultValue="Tomador" style={{ width: 544 }} >
                                                <Option value="Composição de renda">Composição de renda</Option>
                                                <Option value="Tomador">Tomador</Option>
                                            </Select>
                                        </DivModalSelectTipoEnvolvimento>                                        
                                        <DivModalTextoNome>Razão Social</DivModalTextoNome>
                                        <DivModalInputNome><Input placeholder="Razão Social..." style={{width: 544, height: 40}} /></DivModalInputNome>
                                        <DivModalTextoCPF>CNPJ</DivModalTextoCPF>
                                        <DivModalInputCPF><Input placeholder="CNPJ..." style={{width: 544, height: 40}}/></DivModalInputCPF>
                                    </DivContentModalPJ>
                            </Modal>                                   
                        </Panel>

                    </Collapse>
                )}
                <br />
            </Container>
        )
    );
}
