import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'

export default function DropdownSelect({ title, data, selected, setSelected }) {
  return (
    <SelectList
      setSelected={(item) => setSelected(item)}
      data={data}
      save='value'
      placeholder={'select ' + title}
      disable={true}
      boxStyles={{
        borderColor: "#ccc",
        borderRadius: 8,
        outlineStyle: 'none',
      }}
    />
  )
};