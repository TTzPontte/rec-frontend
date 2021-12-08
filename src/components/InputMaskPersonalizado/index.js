import { CheckCircleFilled, CloseCircleFilled, EditOutlined, UpSquareOutlined } from '@ant-design/icons';
import Input from '@iso/components/uielements/input';
import React, { useState } from 'react';
import './style.css';
import InputMask from 'react-input-mask';

export default function InputPersonalizado({ texto, valorCampo, iconeLabel, onSave, handleChange, idCampo, mask, editavel = true }) {
    const [estiloInput, setEstiloInput] = useState("desabilitado inputMaskClass");
    const [desabilitarCampo, setDesabilitarCampo] = useState(true);
    const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
    const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
    const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");

    const habilitarDesabilitar = () => {
        if (editavel) {
            setDesabilitarCampo(!desabilitarCampo);

            if (estiloInput == "desabilitado inputMaskClass") {
                setEstiloInput("inputMaskClass");
            } else {
                setEstiloInput("desabilitado inputMaskClass");
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
            <div className="hoverAzul" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto}  <EditOutlined className={estiloIconeEditar} /></div>
            <div className="divInput"> <InputMask 

                onChange={(value) =>
                    handleChange({ target: { id: idCampo, value:value.target.value } })
                }


                bordered={!desabilitarCampo}
                className={estiloInput}
                disabled={desabilitarCampo}
                id={idCampo} value={valorCampo} mask={mask} /></div>
            <CheckCircleFilled className={estiloIconeOk} onClick={handleOk} /> <CloseCircleFilled className={estiloIconeNOk} onClick={handleCancel} />


        </div>
    );
}