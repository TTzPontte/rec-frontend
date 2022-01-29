import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Title,
  AreaEditing,
  Header,
  List,
  Item,
  SubAreaAddItem,
  BtnAddItem,
  InputAddItem,
  AreaDropDown,
  AreaSaveChanged,
} from "./styled-components";
import { ReactComponent as CheckConfirm } from "../../assets/check-confirm.svg";
import { ReactComponent as CloseSecondary } from "../../assets/close-secondary.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import { ReactComponent as IconPencilEdit } from "../../assets/icon-pencil_edit.svg";
import { ReactComponent as IconDropdown } from "../../assets/icon-dropdown.svg";
import addAttachmentIcon from "../../assets/add-attachment.svg";

export const DropDownDM = ({
  handleGetItem = async () => {},
  handleSaveItem = async () => {},
  handleSaveProcessInfo = async () => {},
  iconLabel = <IconDropdown />,
  title = "",
  initialValue = "Selecione",
}) => {
  const [listItem, setListItem] = useState([]);
  const [inputItem, setInputItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editing, setEditing] = useState(false);
  const [lastSave, setLastSave] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    descricao: initialValue,
    isSave: false,
  });
  
  const setLastSaveCallback = useCallback(
    () => setLastSave(initialValue),
    [initialValue]
  );
  useEffect(() => {
    setLastSaveCallback();
  }, [setLastSaveCallback]);

  useEffect(() => {
    handleGetItem().then(({ data }) => setListItem(data));
  }, [handleGetItem]);

  const handleAddItem = (item) => {
    if (handleSaveItem) {
      handleSaveItem(item).then(({ data }) => {
        setListItem([...listItem, data]);
        setIsAddingItem(false);
        setInputItem("");
      });
    }
  };

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    setInputItem("");
    setIsAddingItem(false);
  };

  const handleOpenList = () => {
    setIsOpen(!isOpen);
    setIsAddingItem(false);
    setInputItem("");
  };

  const handleIsAddingItem = () => setIsAddingItem(!isAddingItem);

  const handleSave = () => {
    handleSaveProcessInfo(selectedItem);
    setLastSave(selectedItem.descricao);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };
  const handleSetEdding = () => setEditing(!editing);

  return (
    <Container>
      <Title onClick={handleSetEdding}>
        {iconLabel}
        <span>{title}</span>
        <IconPencilEdit className="iconPencilEdit" />
      </Title>
      {!editing ? (
        <span className="description">{lastSave || "Selecione"}</span>
      ) : (
        <AreaEditing>
          <AreaDropDown>
            <Header isOpen={isOpen}>
              <h1>{selectedItem.descricao}</h1>
              <ArrowDown className="btnArrowDown" onClick={handleOpenList}>
                Flexa
              </ArrowDown>
            </Header>

            <List isOpen={isOpen}>
              {listItem.length > 0 &&
                listItem.map((item) => (
                  <Item key={item.id} onClick={() => handleSelectedItem(item)}>
                    <span> {item.descricao} </span>
                  </Item>
                ))}

              {handleSaveItem ? (
                <SubAreaAddItem>
                  {isAddingItem ? (
                    <InputAddItem hasText={!!inputItem}>
                      <input
                        type="text"
                        placeholder="Adicione um novo item"
                        value={inputItem}
                        onChange={(e) => setInputItem(e.target.value)}
                      />
                      <CheckConfirm
                        className="checkConfirm-addItem"
                        onClick={() => handleAddItem(inputItem)}
                      />
                    </InputAddItem>
                  ) : (
                    <BtnAddItem onClick={handleIsAddingItem}>
                      <img src={addAttachmentIcon} alt="" />
                      <span>Adicionar novo item</span>
                    </BtnAddItem>
                  )}
                </SubAreaAddItem>
              ) : null}
            </List>
          </AreaDropDown>

          <AreaSaveChanged>
            <CheckConfirm style={{ cursor: "pointer" }} onClick={handleSave} />
            <CloseSecondary
              style={{ cursor: "pointer" }}
              onClick={handleCancel}
            />
          </AreaSaveChanged>
        </AreaEditing>
      )}
    </Container>
  );
};
