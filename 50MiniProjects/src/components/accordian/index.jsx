import React, { useState } from "react";
import data from "./data";
import "./styles.css";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setMultiSelection] = useState(false);
  const [multi, setMulti] = useState([]);

  const handleSingleSelection = (id) => {
    // setSelect()
    console.log("here", id);
    setSelected(id === selected ? null : id);
  };

  const handleMultiSelect = (id) => {
    // setMode("multi");
    let cpyMulti = [...multi];
    // if (cpyMulti.includes(id)) {
    //     console.log("Yes")
    // } else{
    //     multi.push(id);
    // }
    // multi.push(id);
    // console.log(cpyMulti)
    // console.log(enableMultiSelection);

    const findIndexOfCurrentId = cpyMulti.indexOf(id);
    if (findIndexOfCurrentId === -1) cpyMulti.push(id);
    else cpyMulti.splice(findIndexOfCurrentId, 1);
    setMulti(cpyMulti);
  };

  return (
    <>
      <div className="acc-wrapper">
        <button
          onClick={() => setMultiSelection(!enableMultiSelection)}
          className="button"
        >
          {enableMultiSelection ? "Disabled MultiSelect" : "Enable MultiSelect"}
        </button>

        <div className="accordian">
          {data && data.length > 0 ? (
            data.map((dataItem) => (
              <div className="item" key={dataItem.id}>
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelect(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h2>{dataItem.question}</h2>
                  <span>+</span>
                </div>
                {enableMultiSelection
                ? multi.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )}
                {/* {selected === dataItem.id ? (
                  <div className="acc-content">{dataItem.answer}</div>
                ) : null} */}
              </div>
            ))
          ) : (
            <div>No Data</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordian;

// const Wrapper = styled.div`
//     display: flex;
//     height: 100vh;
//     width: 100vw;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     gap: 20px;

//     .item{
//     background: #614101;
//     margin-bottom: 10px;
//     padding: 10px 20px;
//     }

//     .title {
//     background: #614101;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     cursor: pointer;
//   }

// `
