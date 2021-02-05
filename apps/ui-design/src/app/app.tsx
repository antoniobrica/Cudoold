import React from 'react';
 

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
 
  import {Menubar} from '@cudo/shared-components';  
  
import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';

// import { Sidebar } from 'semantic-ui-react';

export function App() {
  return (
    <div>
   <Menubar></Menubar> 
    <ModalExampleModal></ModalExampleModal> 
    </div>
    
   
   
    
  );
}

export default App;
