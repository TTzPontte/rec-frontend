import Select, { SelectOption } from '@iso/components/uielements/select';
import React, { useState } from 'react';
import { ReactComponent as CheckConfirmSecondary } from '../../assets/check-confirm-secondary.svg';
import { ReactComponent as CloseSecondary } from '../../assets/close-secondary.svg';
import { ReactComponent as IconPencilEdit } from '../../assets/icon-pencil_edit.svg';
import './style.css';

export default function SelectPersonalizado({ texto, valorCampo, iconeLabel, lista, onSave, handleChange, idCampo }) {
    const [estiloInput, setEstiloInput] = useState("selectdDesabilitado");
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
        if (estiloIconeEditar == 'hidden') {
            setEstiloIconeEditar('iconeEditar');
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
            <div className="hoverAzul labelInput" onClick={habilitarDesabilitar} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>{iconeLabel} {texto} <IconPencilEdit className={estiloIconeEditar} /></div>
            <div className="divInput">
                <Select
                bordered={!desabilitarCampo}
                    defaultValue={valorCampo}
                    style={{ width: '100%' }}
                    className={estiloInput}
                    disabled={desabilitarCampo}
                    showArrow={!desabilitarCampo}
                    onChange={(value) =>
                        handleChange({ target: { id: idCampo, value } })
                    }>
                    {lista.map((arg) => (
                        <SelectOption value={arg}>
                            {arg}
                        </SelectOption>
                    ))}
                </Select>
            </div>
            <CheckConfirmSecondary className={estiloIconeOk} onClick={handleOk} /> <CloseSecondary className={estiloIconeNOk} onClick={handleCancel} />
        </div>
    );
}
