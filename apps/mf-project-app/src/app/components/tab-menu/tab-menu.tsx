import React from 'react';
import Tabsbar from 'libs/shared-components/src/lib/components/tabs/tabs'
import AccordionExampleMenu from 'libs/shared-components/src/lib/components/menu/sidebar';
import './tab-menu.module.scss';
 
import { environment } from "../../../environments/environment";
import MicroFrontend from "../../../MicroFrontend";
import { Tab,Image } from 'semantic-ui-react'



const {
  EACT_APP_COST_HOST: costHost,
  REACT_APP_MEETING_HOST: meetingHost,
  REACT_APP_TASK_HOST: taskHost,
} = environment;


/* eslint-disable-next-line */
export interface TabMenuProps {}

 function TabMenu(props: TabMenuProps) {

  function TaskApp(history: any) {
    return (
      <MicroFrontend history={history} host={taskHost} name="TaskApp" />
    );
  }


  function Home() {
    const [input, setInput] = React.useState("");
    const [isTask, setIsTask] = React.useState(false);
    const data = "parrent"
    const callbackFunction = (childData) => {
      setInput(childData);
      if (childData == "task") {
        setIsTask(true);
      }
      else {
        setIsTask(false);
      }
    };
    const handleOpenProject = (item) => {
      // props.parentCallback(item)
    }
    const panes = [
      {
        menuItem: { key: 'Overview', icon: 'file alternate outline', content: 'Overview' },
        render: () => <Tab.Pane attached={false} onClick={handleOpenProject('overview')}>
            
            <div className="ui-tabs">
            <div className="text-center ">
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' wrapped />

            </div>
            <div className="text-center margin-top">
          
          <span className="found">No Data Found</span>
          <p className="project-sub" style={{color:'#9A9EA1'}}>Hey User, you don't have any active sub project lists on this project. Click the button <br/> below  to create a sub project list.</p>
      </div>
            </div>
         
          
        </Tab.Pane>,
      },
      {
        menuItem: { key: 'Task', icon: 'shield alternate', content: 'Task' },
        render: () => <Tab.Pane  onClick={handleOpenProject('task')}>
          <TaskApp></TaskApp>
        </Tab.Pane>,
      },
      {
         
        menuItem: { key: 'Planning', icon: 'flag outline', content: 'Planning' },
        render: () => <Tab.Pane attached={false} onClick={handleOpenProject('planning')}>Planning</Tab.Pane>,
      },
      {
           
          menuItem: { key: 'Cost', icon: 'money bill alternate outline', content: 'Cost' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('cost')}>Cost</Tab.Pane>,
        },
        {
          
          menuItem: { key: 'Tender', icon: 'gavel', content: 'Tender' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('tender')}>Tender</Tab.Pane>,
        },
        {
          
          menuItem: { key: 'Meetings', icon: 'calendar outline', content: 'Meetings' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('meetings')}>Meetings</Tab.Pane>,
        },
        {
           
          menuItem: { key: 'Files', icon: 'folder open outline', content: 'Files' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('files')}>Files</Tab.Pane>,
        },
        {
           
          menuItem: { key: 'Questions', icon: 'question circle outline', content: 'Questions' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('questions')}>Questions</Tab.Pane>,
        },
        {
           
          menuItem: { key: 'People', icon: 'user outline', content: 'People' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('people')}>People</Tab.Pane>,
        },
        {
           
          menuItem: { key: 'Settings', icon: 'setting', content: 'Settings' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('settings')}>Settings</Tab.Pane>,
        },
        {
          
          menuItem: { key: 'Messages', icon: 'envelope open outline', content: 'Messages' },
          render: () => <Tab.Pane attached={false} onClick={handleOpenProject('messages')}>Messages</Tab.Pane>,
        },
    ]
    
return (
  <div className="app-content-body-dash navbar-collapse box-shadow bg-white-only">
      <div> 
         <span className="">Electrical Work</span> | <span className="preliminary-font">Preliminary Studies</span>
       </div>
          
       <Tab className="ui-tabs" menu={{ secondary: true, pointing: true }} panes={panes} />

  </div>
      
  

);
    // return (
    //   <div>
    //     <Tabsbar parentCallback={callbackFunction}></Tabsbar>
    //     <div className="home">
    //       {isTask ?
    //         <div>
    //           <TaskApp></TaskApp>
    //         </div> :
    //         null}
  
    //     </div>
    //   </div>
    // );
  }
  
  

  return (
    <div>
     <AccordionExampleMenu>
     </AccordionExampleMenu>
     <Home></Home>
    </div>
  );
}

export default TabMenu;