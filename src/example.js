// import React, {useState} from "react";
//
// function App() {
//   const [inputList, setInputList] = useState([{firstName: "", lastName: ""}]);
// // handle input change
//   const handleInputChange = (e, index) => {
//     const {name, value} = e.target;
//     const list = [...inputList];
//     list[index][name] = value;
//     setInputList(list);
//   };
//
// // handle click event of the Remove button
//   const handleRemoveClick = index => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };
//
// // handle click event of the Add button
//   const handleAddClick = () => {
//     setInputList([...inputList, {firstName: "", lastName: ""}]);
//   };
//   return (
//     <div className="App">
//       <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
//       {inputList.map((x, i) => {
//         return (
//           <div className="box">
//             <input
//               name="firstName"
//               placeholder="Enter First Name"
//               value={x.firstName}
//               onChange={e => handleInputChange(e, i)}
//             />
//             <input
//               className="ml10"
//               name="lastName"
//               placeholder="Enter Last Name"
//               value={x.lastName}
//               onChange={e => handleInputChange(e, i)}
//             />
//             <div className="btn-box">
//               {inputList.length !== 1 && <button
//                 className="mr10"
//                 onClick={() => handleRemoveClick(i)}>Remove</button>}
//               {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
//             </div>
//           </div>
//         );
//       })}
//       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//     </div>
//   );
// }
//
// export default App;
//
//
import {useState} from "react";
import CreatableSelect from 'react-select/creatable';
import nextId from "react-id-generator";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
  rating: false,
  id: nextId()
});

const defaultOptions = [
  createOption('Product Group', ),
  createOption('Alternative Group', ),
  createOption('Business Group', ),
  createOption('Creative Group', ),
  createOption('Full-Stack Group', ),
  createOption('Front-End Group', ),
  createOption('ReactJS Group', ),
  createOption('Python Group', ),
  createOption('PHP Group',),
];

export default function App1() {
  const [inputList, setInputList] = useState([
    {
      product: "Product Group",
      dataType: "Text",
      required: 'Yes',
      level: 'L5',
      repLevel: true,
    },
    {
      product: "Alternative",
      dataType: "Text",
      required: 'Yes',
      level: 'L5',
      repLevel: true,
    },
    {
      product: "Business Group",
      dataType: "Text",
      required: 'Yes',
      level: 'L5',
      repLevel: true,
    },
    {
      product: "Creative Group",
      dataType: "Text",
      required: 'Yes',
      level: 'L5',
      repLevel: true,
    },
  ]);

  const [isLoading, setLoading] = useState(false)
  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState(undefined)

  const handleAddClick = () => {
    setInputList([...inputList,
      {product: "Product Group", dataType: "Text", required: 'Yes', level: 'L5', repLevel: ''}]
    );
  };

  const handleChange = (newValue) => {
    setValue(newValue)
  };

  const handleCreate = (inputValue) => {
    setLoading(true)
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setLoading(false)
      setOptions([...options])
      setValue(newOption)
    }, 1000);
  };

  return (
    <div className="container">
      <h1>Table</h1>
      <div className="d-flex justify-content-end">
        <button onClick={handleAddClick} className="btn btn-primary">Add Row</button>
      </div>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Product Group</th>
          <th scope="col">Data-Type</th>
          <th scope="col">Required</th>
          <th scope="col">Level</th>
          <th scope="col">Rep-Level</th>
        </tr>
        </thead>
        <tbody>
        {inputList.map((el, i) => {
          return (
            <tr>
              <td>
                <div className="d-flex justify-content-between">
                  <div style={{width: '100%'}}>
                    <CreatableSelect
                      isClearable
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      onChange={handleChange}
                      onCreateOption={handleCreate}
                      options={options}
                        isOptionDisabled={option => option.rating === true}
                    />
                  </div>
                </div>
              </td>
              <td>{el.dataType}</td>
              <td>{el.required}</td>
              <td>{el.level}</td>
              <td>{el.repLevel}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}