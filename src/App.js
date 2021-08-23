import { useEffect, useState } from "react";
import axios from "axios";
import AsyncCreatableSelect from "react-select/creatable";
import nextId from "react-id-generator";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
  const [selectOption, setSelectOption] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [inputList, setInputList] = useState([]);

  const handleChange = (e) => {
    setId(e.label);
    setName(e.label);
    if (e.value) {
      e.selected = true;
    }
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        value: id,
        label: name,
        selected: false,
        dataType: "Text",
        required: "Yes",
        level: "L5",
      },
    ]);
  };

  const createOption = (label) => ({
    value: nextId(),
    label: label,
    selected: false,
    dataType: "Text",
    required: "Yes",
    level: "L5",
  });

  const handleCreate = (e) => {
    const newOption = createOption(e);
    console.log(newOption);
    setSelectOption([...selectOption, newOption]);
    toast.success("Options was added successfully");
  };

  const getAllRequest = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = res.data;

    const options = data.map((dat) => ({
      value: dat.id,
      label: dat.name,
      selected: false,
      dataType: "Text",
      required: "Yes",
      level: "L5",
    }));

    setSelectOption(options);
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <h1>Table</h1>
        <div className="d-flex justify-content-end">
          <button onClick={handleAddClick} className="btn btn-primary">
            Add Row
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
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
                <tr key={i}>
                  <td>{i}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <div style={{ width: "100%" }}>
                        <AsyncCreatableSelect
                          isClearable={false}
                          options={selectOption}
                          onChange={handleChange}
                          isOptionDisabled={(option) =>
                            option.selected === true
                          }
                          onCreateOption={handleCreate}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{el.dataType}</td>
                  <td>{el.required}</td>
                  <td>{el.level}</td>
                  <td>0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
