import { Textarea } from '@iso/components/uielements/input';
import React, { useState } from 'react';
import { ReactComponent as CheckConfirmSecondary } from '../../assets/check-confirm-secondary.svg';
import { ReactComponent as CloseSecondary } from '../../assets/close-secondary.svg';
import { ReactComponent as IconPencilEdit } from '../../assets/icon-pencil_edit.svg';
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
        if (estiloIconeEditar == 'hidden') {
            setEstiloIconeEditar('iconeEditar');
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
            <div className="hoverAzul" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto}  <IconPencilEdit className={estiloIconeEditar} /></div>
            <div className="divInput"> 
            <Textarea  defaultValue={valorCampo} rows={7} className={estiloInput} disabled={desabilitarCampo} onChange={handleChange} id={idCampo}/>
            </div>
            <CheckConfirmSecondary className={estiloIconeOk} onClick={handleOk} /> <CloseSecondary className={estiloIconeNOk} onClick={handleCancel} />
        </div>
    );
}