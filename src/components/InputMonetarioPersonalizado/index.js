import { CheckCircleFilled, CloseCircleFilled, EditOutlined, UpSquareOutlined } from '@ant-design/icons';
import Input from '@iso/components/uielements/input';
import React, { useState } from 'react';
import './style.css';
import CurrencyInput from 'react-currency-input';

export default function InputMonetarioPersonalizado({ texto, valorCampo, iconeLabel, onSave, handleChange, idCampo, editavel = true,  }) {
    const [estiloInput, setEstiloInput] = useState("desabilitado inputMonetarioClass");
    const [desabilitarCampo, setDesabilitarCampo] = useState(true);
    const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
    const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
    const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");

    const habilitarDesabilitar = () => {
        if(editavel){
            setDesabilitarCampo(!desabilitarCampo);
            
            if (estiloInput == "desabilitado inputMonetarioClass") {
                setEstiloInput("inputMonetarioClass");
            } else {
                setEstiloInput("desabilitado inputMonetarioClass");
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
            <div className="hoverAzul labelInput" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto}  <EditOutlined className={estiloIconeEditar} /></div>
            <div className="divInput"> <CurrencyInput decimalSeparator="," thousandSeparator="." precision="2"
            prefix="R$" value={valorCampo} className={estiloInput} disabled={desabilitarCampo} 

            onChange={(value) =>
                handleChange({ target: { id: idCampo, value } })
            }
            
            
            id={idCampo}/></div>
            <CheckCircleFilled className={estiloIconeOk} onClick={handleOk} /> <CloseCircleFilled className={estiloIconeNOk} onClick={handleCancel} />
        </div>
    );
}
