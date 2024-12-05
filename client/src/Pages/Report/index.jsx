import React from 'react';
import { useState } from 'react';
import StageSelect from '../../Components/common/commonDropdown';
const Index = () => {
  const [ selectedStage, setSelectedStage ] = useState('');
  return (
    <div>
      <StageSelect 
        Api_path='common/showStage'
        value={selectedStage}
        onChange={setSelectedStage}
        label='Stage'
      />
    </div>
  )
}

export default Index
