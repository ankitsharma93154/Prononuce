import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function GenderToggleButton({ onChange }) {
  const [alignment, setAlignment] = React.useState('male');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onChange(newAlignment === 'male');
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Gender"
    >
      <ToggleButton className='toggle' value="male">Male</ToggleButton>
      <ToggleButton value="female">Female</ToggleButton>
    </ToggleButtonGroup>
  );
}
