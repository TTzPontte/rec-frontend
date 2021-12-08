import { CheckCircleFilled, CloseCircleFilled, EditOutlined, UpSquareOutlined } from '@ant-design/icons';
import Input, { Textarea } from '@iso/components/uielements/input';
import React, { useState } from 'react';
import './style.css';

export default function TextAreaPersonalizado({ texto, valorCampo, iconeLabel, onSave, handleChange, idCampo }) {
    const [estiloInput, setEstiloInput] = useState("desabilitado semRelize textarea");
    const [desabilitarCampo, setDesabilitarCampo] = useState(true);
    const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
    const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
    const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");

    const habilitarDesabilitar = () => {

        setDesabilitarCampo(!desabilitarCampo);

        if (estiloInput == "desabilitado semRelize textarea") {
            setEstiloInput("semRelize");
        } else {
            setEstiloInput("desabilitado semRelize textarea");
        }

        if (estiloIconeNOk === 'hidden') {
            setEstiloIconeNOk('iconeCinza');
        } else {
            setEstiloIconeNOk("hidden");
        }

        if (estiloIconeOk === 'hidden') {
            setEstiloIconeOk('iconeVerde');
        } else {
            setEstiloIconeOk("hidden");
        }
    }

    const handleMouseOver = () => {
        if (estiloIconeEditar) {
            setEstiloIconeEditar(null);
        } else {
            setEstiloIconeEditar("hidden");
        }
    }

    const handleOk = () => {
        console.log(valorCampo);
        console.log('valorCampo');
        onSave();
        habilitarDesabilitar();

    }

    const handleCancel = () => {
        habilitarDesabilitar();
    }

    return (
        <div>
            <div className="hoverAzul" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto}  <EditOutlined className={estiloIconeEditar} /></div>
            <div className="divInput"> 
            <Input  defaultValue={valorCampo} className={estiloInput} disabled={desabilitarCampo} onChange={handleChange} id={idCampo}/>
            </div>
            <CheckCircleFilled className={estiloIconeOk} onClick={handleOk} /> <CloseCircleFilled className={estiloIconeNOk} onClick={handleCancel} />
        </div>
    );
}