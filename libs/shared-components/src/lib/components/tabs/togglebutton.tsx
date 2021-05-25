import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react'


function ToggleButton() {
    
    const options = [
      { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
      { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
      { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
    ]
  return (
    <div id="navbar">
          <Button.Group>
              
    <Button className="grey-btn">Save</Button>
    <Dropdown style={{backgroundColor: '#2d62ed'}}
      className='button icon'
      floating
      options={options}
      trigger={<></>}
    />
  </Button.Group>
  </div>
  
  )
}

export default ToggleButton
 