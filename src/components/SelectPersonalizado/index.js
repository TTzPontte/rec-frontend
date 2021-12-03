import Select, { SelectOption } from '@iso/components/uielements/select';

import { CheckCircleFilled, CloseCircleFilled, EditOutlined, UpSquareOutlined } from '@ant-design/icons';
import Input from '@iso/components/uielements/input';
import React, { useState } from 'react';
import './style.css';

export default function SelectPersonalizado({ texto, valorCampo, iconeLabel, lista, onSave, handleChange, idCampo }) {
    const [estiloInput, setEstiloInput] = useState("selectdDsabilitado");
    const [desabilitarCampo, setDesabilitarCampo] = useState(true);
    const [estiloIconeOk, setEstiloIconeOk] = useState("hidden");
    const [estiloIconeNOk, setEstiloIconeNOk] = useState("hidden");
    const [estiloIconeEditar, setEstiloIconeEditar] = useState("hidden");

    const habilitarDesabilitar = () => {

        setDesabilitarCampo(!desabilitarCampo);

        // if (estiloInput) {
        //     setEstiloInput(null);
        // } else {
        //     setEstiloInput("selectdDsabilitado");
        // }

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
        onSave();
        habilitarDesabilitar();
    }

    const handleCancel = () => {
        habilitarDesabilitar();
    }

    return (
        <div>
            <div className="hoverAzul" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto} <EditOutlined className={estiloIconeEditar} /></div>
            <div className="divInput">
                <Select
                    defaultValue={valorCampo}
                    style={{ width: '100%' }}
                    className={estiloInput}
                    disabled={desabilitarCampo}
                    onChange={(value) =>
                        handleChange({ target: { id: idCampo, value } })
                    }>
                    {lista.map((arg) => (
                        <SelectOption value={arg} >
                            {arg}
                        </SelectOption>
                    ))}
                </Select>
            </div>
            <CheckCircleFilled className={estiloIconeOk} onClick={handleOk} /> <CloseCircleFilled className={estiloIconeNOk} onClick={handleCancel} />
        </div>
    );
}
