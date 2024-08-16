import React, { useState } from "react";
// import "./styles.css";
import { AccWrapper, AccContent, Accordian, Button, Item, Title } from "./style.jsx";
import data from "./data.js";

const AccordianDump = () => {
  const [selected, setSelected] = useState(null);
  const [enableMutltiSelected, setEnableMutltiSelected] = useState(false);
  const [multi, setMulti] = useState([]);

  const handleSingleSelection = (currentId) => {
    setSelected(selected === currentId ? null : currentId);
  };

  const handleMultiSelect = (currentId) =>{
    let cpyMulti = [...multi];
    const findIndxOfCurrentId = cpyMulti.indexOf(currentId);
    if(findIndxOfCurrentId === -1) cpyMulti.push(currentId)
    else cpyMulti.splice(findIndxOfCurrentId,1)
    setMulti(cpyMulti);
  }

  return (
    <>
      <AccWrapper>
        <Button  onClick={() => setEnableMutltiSelected(!enableMutltiSelected)}>
          {enableMutltiSelected
            ? "Disable Multi Selected"
            : "Enable Multi Selected"}
        </Button>
        <Accordian>
          {data && data.length > 0 ? (
            data.map((dataIndex) => (
              <Item key = {dataIndex.id}>
                <Title
                  onClick={enableMutltiSelected ? () => handleMultiSelect(dataIndex.id)  : () => handleSingleSelection(dataIndex.id)}
                >
                  <h3>{dataIndex.question}</h3>
                  <span>+</span>
                </Title>
                {enableMutltiSelected ? 
                multi.indexOf(dataIndex.id) !== -1 && (
                    <AccContent>{dataIndex.answer}</AccContent>
                )
                :
                selected === dataIndex.id && (
                    <AccContent>{dataIndex.answer}</AccContent>
                  )
                }
                {/* {selected === dataIndex.id ? (
                  <div className="acc-content">{dataIndex.answer}</div>
                ) : null} */}
              </Item>
            ))
          ) : (
            <div>Data Not Found</div>
          )}
        </Accordian>
      </AccWrapper>
    </>
  );
};

export default AccordianDump;
