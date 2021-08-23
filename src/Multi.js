import {useEffect, useState} from "react";
import Select from 'react-select'
import axios from "axios";

export default function Multi() {
  const [selectOption, setSelectOption] = useState([]);
  const [value, setValue] = useState([]);

  const getOptions = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    const data = res.data

    const options = data.map(dat => ({
      "value": dat.id,
      "label": dat.name
    }))

    setSelectOption(options)
  }

  const handleChange = (e) => {
    console.log(e)
    setValue(e)
  }

  useEffect(async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    const data = res.data

    const options = data.map(dat => ({
      "value": dat.id,
      "label": dat.name
    }))

    setSelectOption(options)
  }, [])

  return(
    <div>
      <Select
        options={selectOption}
        onChange={handleChange}
        isMulti
      />
      {
        value === null ? "" : value.map(v => <h4>{v.label}</h4>)
      }
    </div>
  )
}