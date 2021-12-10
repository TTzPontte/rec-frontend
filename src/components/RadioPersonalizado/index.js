import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import React, { useState } from 'react';
import { ReactComponent as CheckConfirmSecondary } from '../../assets/check-confirm-secondary.svg';
import { ReactComponent as CloseSecondary } from '../../assets/close-secondary.svg';
import { ReactComponent as IconPencilEdit } from '../../assets/icon-pencil_edit.svg';
import './style.css';
export default function InputPersonalizado({ texto, valorCampo, iconeLabel, onSave, handleChange, idCampo, editavel = true, tipoInput = "text" }) {
    const [estiloInput, setEstiloInput] = useState("desabilitado");
    const [desabilitarCampo, setDesabilitarCampo] = useState(true);
    const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
    const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
    const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");

    const habilitarDesabilitar = () => {
        if(editavel){
            setDesabilitarCampo(!desabilitarCampo);
            
            if (estiloInput) {
                setEstiloInput(null);
            } else {
                setEstiloInput("desabilitado");
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

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };

    return (
        <div>
            <div className="hoverAzul labelInput" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto} <IconPencilEdit className={estiloIconeEditar} /></div>
            <div className="divInput"> 
            
            
            
            
            {/* <Radio type={tipoInput} defaultValue={valorCampo} className={estiloInput} disabled={desabilitarCampo} onChange={handleChange} id={idCampo}/> */}
            <RadioGroup 
             disabled={desabilitarCampo}
             bordered={!desabilitarCampo}
            onChange={(value) =>
                handleChange({ target: { id: idCampo, value: value.target.value } })
            }
            id={idCampo} value={valorCampo}>
                <Radio  value='SAC'>
                  SAC
                </Radio>
              </RadioGroup>
            
            
            
            
            </div>
            <CheckConfirmSecondary className={estiloIconeOk} onClick={handleOk} /> <CloseSecondary className={estiloIconeNOk} onClick={handleCancel} />
        </div>
    );
}
