import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list'

export default function DropdownSelect() {
  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Amphibians'},
      {key:'2', value:'Arachnids'},
      {key:'3', value:'Birds'},
      {key:'4', value:'Fish'},
      {key:'5', value:'Fungi'},
      {key:'6', value:'Insects'},
      {key:'7', value:'Kelp'},
      {key:'8', value:'Mammals'},
      {key:'9', value:'Mollusks'},
      {key:'10', value:'Plants'},
      {key:'11', value:'Protozoans'},
      {key:'12', value:'Reptiles'},
      {key:'13', value:'Others'},
  ]

  return(
    <SelectList 
        setSelected={(item) => setSelected(item)} 
        data={data} 
        save='value'
        placeholder='select category'
        boxStyles={{
          borderColor: "#ccc", 
          borderRadius: 8,
          outlineStyle: 'none',
        }}
    />
  )
};