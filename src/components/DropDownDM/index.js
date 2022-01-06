import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  List,
  Item,
  SubAreaAddItem,
  BtnAddItem,
  InputAddItem,
  AreaDropDown,
  AreaSaveChanged,
} from "./styles";
import { ReactComponent as CheckConfirm } from "../../assets/check-confirm.svg";
import { ReactComponent as CloseSecondary } from "../../assets/close-secondary.svg";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import addAttachment from "../../assets/add-attachment.svg";

export const DropDownDM = ({
  handleGetItem,
  handleSaveItem,
  handleGetStatusInfo,
  handleSaveProcessInfo,
}) => {
  const [listItem, setListItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    id: 0,
    nome: "Selecione",
  });
  const [inputItem, setInputItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  useEffect(() => {
    handleGetItem().then((data) => setListItem(data));
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
    handleSaveProcessInfo(selectedItem).then(() => {
      if (handleGetStatusInfo) {
        handleGetStatusInfo({
          status: true,
          selectedItem,
        });
      }
    });
  };

  const handleCancel = () => {
    if (handleGetStatusInfo) {
      handleGetStatusInfo({
        status: false,
      });
    }
  };

  return (
    <Container>
      <AreaDropDown>
        <Header isOpen={isOpen}>
          <h1>{selectedItem.nome}</h1>
          <ArrowDown className="btnArrosDown" onClick={handleOpenList}>
            Flexa
          </ArrowDown>
        </Header>

        <List isOpen={isOpen}>
          {listItem.map((item) => (
            <Item key={item.id} onClick={() => handleSelectedItem(item)}>
              <span> {item.nome} </span>
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
                  <img src={addAttachment} alt="" />
                  <span>Adicionar novo item</span>
                </BtnAddItem>
              )}
            </SubAreaAddItem>
          ) : null}
        </List>
      </AreaDropDown>

      <AreaSaveChanged>
        <CheckConfirm
          style={{
            height: "20px",
            cursor: "pointer",
            paddingRight: "5px",
          }}
          onClick={handleSave}
        />
        <CloseSecondary
          style={{
            height: "20px",
            cursor: "pointer",
          }}
          onClick={handleCancel}
        />
      </AreaSaveChanged>
    </Container>
  );
};
