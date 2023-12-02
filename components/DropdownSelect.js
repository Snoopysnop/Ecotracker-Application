import React from 'react';

import { SelectList } from 'react-native-dropdown-select-list'

export default function DropdownSelect({ title, data, setSelected }) {
  return (
    <SelectList
      setSelected={setSelected}
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