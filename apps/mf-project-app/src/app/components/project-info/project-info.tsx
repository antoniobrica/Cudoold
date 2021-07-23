import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux'
import { projectAction } from '../../redux/actions'

import './project-info.module.scss';
import { GET_TODOS, GET_PROJECTS } from "../../graphql/graphql";
import { useTodoQuery, useProjectQuery } from "../../services/useRequest";
import { ITodo, IProject } from "../../interfaces/project";
import Modal from 'react-modal';
import { Card, Icon, Form, Grid, Button, Dropdown, Label } from 'semantic-ui-react'
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { LoaderPage, LazyLoading } from "@cudo/shared-components"
import ReactQuill, { Quill } from 'react-quill';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//import ModalExampleModal from 'libs/shared-components/src/lib/components/modal/modal';

import ModalExampleModal from '../modal/modal'
import { MS_SERVICE_URL } from '@cudo/mf-core';

/* eslint-disable-next-line */
export interface ProjectInfoProps {
  companyId?
}

export function ProjectInfo(props: ProjectInfoProps) {

  const notify = () => toast("This is Warning Message");
  const { companyId } = props
  const { loading, error, data } = useProjectQuery(GET_PROJECTS, { variables: { companyId }, });
  const [openForm, setopenForm] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  if (loading) return <LazyLoading />;

  const history = useHistory();
  const location = useLocation()
  // console.log('---Project--projectInfo--location--mk--', location, '---history---', history)
  // @ts-ignore
  const projectId = location?.state?.projectId ? location?.state?.projectId : null
  // console.log('--Project--projectInfo-useEffect-----refreshed projectId-from history-location-state---', projectId);

  //  useEffect(() => {
  //   if (projectId) {
  //     console.log('--Project--projectInfo-useEffect-----refreshed projectId-from history-location-state---', projectId);
  //     openProject(projectId)
  //   }
  //  }, [projectId])

  const addProject = () => {
    setopenForm(!openForm);
  }

  const dispatch = useDispatch()

  const openProject = (projectId) => {
    // console.log('---Project detail open==>', history)
    dispatch({ type: projectAction.SELECT_PROJECT_ID, payload: projectId })
    // console.log('---Project detail history push-----------')
    history.push(`/home/project/${projectId}`);
  }

  dispatch({ type: projectAction.SELECT_PROJECT_ID, payload: null })
  dispatch({ type: projectAction.SELECT_COMPANY_ID, payload: localStorage.getItem('selectedCompany') })

  function openModal() {
    setIsOpen(true);
  }

  const refresh = (data) => {
    // console.log('refresh is called', data);
  }

  if (error) return (
    <div style={{ marginLeft: 900 }} >
      <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
    </div>
  );
  return (
    <div>
      {/* <h1>Projects</h1> */}
      {/* <div>
        <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
      </div> */}

      <div className="app-content-body body_cards_area project-listing-page">
        <div className="dashboard-header">
          <h3>All Projects <span className="total">Total {data.projects.length} project added</span></h3>

          {/* <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer className="success" position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss pauseOnHover />
          </div> */}

          <ModalExampleModal onSuccess={refresh}></ModalExampleModal>
        </div>

        <Form>
          <div className="project-listing-cards">
            <ul>
              {data?.projects?.map((project: IProject, i) => {
                const { projectId, projectName, client, buildingType, description } = project
                // const shortDescription = description.length > 94 ? description.substring(0, 94) + '...' : description
                return (
                  <li key={projectId} >
                    <div className="project-logo-action">
                      <div className="project-logo">
                        <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/default-logo.png`} alt="Logo" />
                      </div>

                      <div className="project-action">
                        <div className="symbol symbol-30 d-flex">
                          <span className="dropdown-action">
                            <Dropdown icon='ellipsis horizontal' floating labeled>
                              <Dropdown.Menu className="dropdowncomplete">
                                <Dropdown.Item icon='setting' text='Manage project' />
                                <Dropdown.Item icon='tasks' text='View activity' />
                                <Dropdown.Item icon='archive' text='Archive' />
                                <Dropdown.Item icon='trash alternate outline' text='Delete' />
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="project-name">
                      <h4 onClick={() => openProject(projectId)}>{projectName ? projectName : 'NA'} <span>{client ? client : 'NA'}</span></h4>
                    </div>

                    <div className="project-info">
                      <p>Type of building <span>{buildingType}</span></p>
                      {/* <p>Level of building <span>3rd</span></p> */}
                    </div>

                    <div className="project-description">
                      {/* <p>{shortDescription ? shortDescription : 'NA'}</p> */}
                      <p><ReactQuill id="txtDescription" readOnly={true} value={description} modules={{ toolbar: null }} /></p>
                      {/* <div className="project-members">
                        <Label circular color="orange">AK</Label>
                        <Label circular color="violet">AM</Label>
                        <Label circular color="brown">VN</Label>
                      </div> */}
                    </div>
                  </li>
                )
              }
              )}
            </ul>
          </div>
        </Form>
      </div>

      <div style={{ flexDirection: 'row', display: 'flex', flexWrap: "wrap" }}>
        {/* {data.getProjects.map((project: IProject) => (
      <Project key={project.projectId} project={project} />
    ))} */}
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  companyId: state.app.selectedCompany.selectedCompanyId
})

export default connect(mapStateToProps)(ProjectInfo)
