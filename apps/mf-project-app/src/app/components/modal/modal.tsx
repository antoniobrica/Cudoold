import { radios } from '@storybook/addon-knobs';
import React from 'react';
import { Button, Header, Modal, Tab, Table, Input, Form, Grid, Select, TextArea } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { IProject, IProjects, ProjectMutation, IWorkTypes, IProjectWorktypes, ProjectWorkTypeModel } from "../../interfaces/project";
import { useProjectMutation, useProjectQuery, useWorkTypesQuery, useCompanyQuery, useBuildingTypesQuery } from '../../services/useRequest';
import { ApolloCache, FetchResult, useMutation } from '@apollo/client';
import { ADD_PROJECT, GET_BUILDINGTYPES, GET_CLIENT_COMPANY, GET_PRINTING_COMPANY, GET_PROJECTS, GET_WORKTYPES } from "../../graphql/graphql";
import { ModalExamplePrinting, ModalExampleCompany } from '@cudo/shared-components'
import WorkType from '../../work-type/work-type';
import { MfAccountAppLib } from '@cudo/mf-account-app-lib';
import ReactQuill, { Quill } from 'react-quill';
import { TEXT_MAXLENGTHS } from '@cudo/mf-core'

export interface ProjectInfoProps {
  onSuccess
}
export function ModalExampleModal(props: ProjectInfoProps) {
  // const { loading, error, data } = useProjectQuery(GET_PROJECTS);


  const clientOption = [
    { key: 'c1', value: 'c1', text: 'Client 1' },
    { key: 'c2', value: 'c2', text: 'Client 2' },
    { key: 'c3', value: 'c3', text: 'Client 3' },
    { key: 'c4', value: 'c4', text: 'Client 4' },


  ]
  const buildingOption = [
    { key: 'b1', value: 'b1', text: 'Building type 1' },
    { key: 'b2', value: 'b2', text: 'Building type 2' },
    { key: 'b3', value: 'b3', text: 'Building type 3' },

  ]
  const printingCompanyOption = [

    { key: 'add', value: 'add', text: '+ add new' },
    { key: 'b1', value: 'b1', text: 'Vista Print' },
    { key: 'b2', value: 'b2', text: 'Flawless Copies' },
    { key: 'b3', value: 'b3', text: 'Rappid Copies' },

  ]
  const workTypeOptions = [
    { key: 'w1', value: 'w1', text: 'Electrical work' },
    { key: 'w2', value: 'w2', text: 'HAVC work' },
  ]

  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]

  const companyTypeOptions = [
    { key: 'clientCompany', value: 'client', text: 'Client' },
    { key: 'printingCompany', value: 'printing', text: 'Printing' },
  ]

  const emailTypeOptions = [
    { key: 'officeEmail', value: 'office', text: 'Office' },
    { key: 'homeEmail', value: 'home', text: 'Home' },
    { key: 'otherEmail', value: 'other', text: 'Other' },
  ]

  const phoneTypeOptions = [
    { key: 'officePhone', value: 'office', text: 'Office' },
    { key: 'homePhone', value: 'home', text: 'Home' },
    { key: 'otherPhone', value: 'other', text: 'Other' },
  ]


  const [open, setOpen] = React.useState(false)
  const [projectName, setProjectName] = React.useState("")
  const [projectNum, setProjectNum] = React.useState(0)
  const [client, setClient] = React.useState("")
  const [buildingType, setBuildingType] = React.useState("")
  const [printing, setPrinting] = React.useState("")
  const [workType, setWorkType] = React.useState("")
  const [estCost, setEstCost] = React.useState(null)
  const [adressLine1, setAdressLine1] = React.useState("")
  const [adressLine2, setAdressLine2] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [items, setItems] = React.useState([{ key: 'add_new', value: 'add_new', text: '+ add new' }]);
  const [printingCompanies, setPrintingCompany] = React.useState([]);
  const [clientCompanies, setClientCompany] = React.useState([])
  const [buildingTypes, setBuildingTypes] = React.useState([])
  const [addWorkTypes, setAddWorkTypes] = React.useState(1)
  const [secondOpen, setSecondOpen] = React.useState(false)
  const [projectWorkEstimates, setProjectWorkEstimates] = React.useState(null)

  const [companyCountry, setCompanyCountry] = React.useState(null)

  // const [addProject] = useProjectMutation(ADD_PROJECT);

  const [validationErrors, setValidationErrors] = React.useState(null)

  const [addProject, { data }] = useMutation(ADD_PROJECT,
    {
      refetchQueries: [
        { query: GET_PROJECTS }
      ]
    }
  )
  // const { loading, error, data } = useProjectQuery(GET_PROJECTS);
  const { loading: worktypeLoading, error, data: worktypeData } = useWorkTypesQuery(GET_WORKTYPES);
  const { loading: companyLoading, data: printingCompany } = useCompanyQuery(GET_PRINTING_COMPANY);
  const { loading: clientLoading, data: clientCompany } = useCompanyQuery(GET_CLIENT_COMPANY);
  const { loading: buildingTypesloading, data: buildingTypesData } = useBuildingTypesQuery(GET_BUILDINGTYPES);

  React.useEffect(() => {
    if (worktypeData) {
      setItems(worktypeData.workTypes.map(({ name, workTypeID }) => ({ key: name, value: name, text: name, id: workTypeID })));
    }
  }, [worktypeData]);

  // React.useEffect(() => {
  //   console.log('---worktypeData?.workTypes---', worktypeData?.workTypes)
  //   console.log('---projectWorkEstimates---', projectWorkEstimates)
  //   if (worktypeData?.workTypes?.length >= projectWorkEstimates?.length) {
  //     const usedWorkTypeIDs = projectWorkEstimates.map((item) => item.workTypeID)
  //     // console.log('---usedWorkTypeIDs---', usedWorkTypeIDs)
  //     const availableWorkTypes = worktypeData.workTypes.filter((item) => !usedWorkTypeIDs.includes(item.workTypeID))
  //     console.log('---availableWorkTypes---', availableWorkTypes)
  //     setItems(availableWorkTypes.map(({ name, workTypeID }) => ({ key: name, value: name, text: name, id: workTypeID })));
  //   }
  // }, [worktypeData, projectWorkEstimates]);

  React.useEffect(() => {
    if (buildingTypesData) {
      setBuildingTypes(buildingTypesData.buildingTypes.map(({ name }) => ({ key: name, value: name, text: name })));
    }
  }, [buildingTypesData]);

  React.useEffect(() => {
    if (printingCompany) {
      setPrintingCompany(printingCompany.company.map(({ companyName }) => ({ key: companyName, value: companyName, text: companyName })));
    }
  }, [printingCompany]);

  React.useEffect(() => {
    if (clientCompany) {
      setClientCompany(clientCompany.company.map(({ companyName }) => ({ key: companyName, value: companyName, text: companyName })));
    }
  }, [clientCompany]);

  React.useEffect(() => {
    if (validationErrors?.length > 0) {
      console.log('----validation errors----', validationErrors)
      alert(validationErrors)
    }
  }, [validationErrors])

  const onprojectNameChange = e => {
    setProjectName(e.target.value)
  }
  const onprojectNumChange = e => {
    const pn = Number(e.target.value)
    setProjectNum(pn)
  }
  const onprojectClient = (event, data) => {
    setClient(data.value)
    // if (data.value == 'click') {
    //   return (
    //     <div>
    //       <ModalExampleCompany></ModalExampleCompany><br />
    //     </div>)
    // }
  }
  const onBuildingType = (event, data) => {
    setBuildingType(data.value)
  }

  const onProjectPrinting = (event, data) => {
    setPrinting(data.value)
    // if (data.value == 'add') {
    //   return (
    //     <ModalExamplePrinting />
    //   )
    // }
    // else {
    //   setPrintingCom(data.value)
    // }

  }

  const onWorkType = (event, data) => {
    setWorkType(data.value)
  }

  const onEstCost = (event, data) => {
    const es = Number(data.value)
    setEstCost(es)
  }

  const onAdressLine1 = (e) => {
    setAdressLine1(e.target.value);
  }
  const onAdressLine2 = e => {
    setAdressLine2(e.target.value)
  }
  const onCity = e => {
    setCity(e.target.value)
  }
  const onState = e => {
    setState(e.target.value)
  }
  const onZip = e => {
    setZip(e.target.value)
  }
  const onCountry = (data) => {
    setCountry(data)
  }
  const onDescription = (html) => {
    // console.log('---onDescription---e---', event, html)
    // if(html.length > 10){
      // event.preventDefault()
      setDescription(html)
    // }
  }
  // const onKeyPresDescription = (e) => {
  //   console.log('--onKeyPresDescription--', e)
  //   if (e.getLength().length > 10 && e.key !== 'Backspace') {
  //     e.preventDefault();
  //   }
  // }

  const addWorkType = () => {
    setAddWorkTypes(prevCount => prevCount + 1);
  }
  const moreWorkTypes = (data) => {
    
      console.log('----moreWorkTypes---', data)
      const worktypesArr = [];
      for (let i = 0; i < data.length; i++) {
        // console.log('data', data[i])
        worktypeData.workTypes.map(d => {
          if (d.name == data[i].workTypeName) {
            // console.log('workTypeName----', d.workTypeID);
            data[i].workTypeID = d.workTypeID;
          }
        })
      }
      console.log('worktypes==>', data)

      setProjectWorkEstimates(data);
    
  }

  const validation = () => {
    let response = true
    let errorMessages = []
    if (!projectName) {
      response = false
      errorMessages.push("Please provide project name")
    }
    if (!projectNum) {
      response = false
      errorMessages.push("Please provide project number")
    }
    if (!client) {
      errorMessages.push("Please provide client company")
    }
    if (!buildingType) {
      response = false
      errorMessages.push("Please provide building type")
    }

    if (!response) {
      return errorMessages
    }
    return []
  }
  const handleSaveProject = () => {
    const validationResponse = validation()
    if (validationResponse?.length > 0) {
      setValidationErrors(validationResponse)
      return false
    }
    console.log('-----country----', country)
    // console.log('-----printing----', printing)
    setOpen(false);
    addProject({
      variables: {
        // projectName, projectNum, client, buildingType,
        // printingCom, description, projectWorkEstimates

        projectName,
        projectNum,
        client,
        buildingType,
        printingCompany:printing,
        description,
        projectWorkEstimates,
        addressLineOne: adressLine1,
        addressLineTwo: adressLine2,
        city,
        state,
        zip,
        country,
        createdBy: 'dev'
      },
      update: (
        cache,
        data
      ) => {
        const cacheData = cache.readQuery({ query: GET_PROJECTS }) as IProjects;
        console.log('---after add project data--', data)
        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            getProjects: [...cacheData.projects, data['createProject']]
          }
        });
        console.log('data==', data);

        props.onSuccess(data);
      }
    });

  };

  const panes = [
    {
      menuItem: 'Information',
      render: () => <Tab.Pane attached={false}>
        {/* <SampleModal/> */}
        <div className="content upload-client-logo">
          <div className="description">Upload Client logo <span>Click the upload button to upload the client logo</span></div>
          <Button className="secondary_btn" size='small' primary>Click to upload</Button>
        </div>

        <Header className="header">Project Information</Header>
        <Form >
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                {/* <Form.Field error> */}
                <Form.Field>
                  <label>What's the Project Name? <span className="danger">*</span></label>
                  <Input
                    placeholder='Default'
                    size='small' className="full-width"
                    type="text" id="projectName"
                    value={projectName}
                    onChange={onprojectNameChange}
                    maxLength={TEXT_MAXLENGTHS["project_name"]?.maxLength}
                  />
                  {/* <span className="error-message">There is some error</span> */}
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Internal Project Number  <span className="danger">*</span></label>
                  <Input
                    placeholder='Default' size='small'
                    className="full-width" type="number"
                    value={projectNum}
                    onChange={onprojectNumChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Client <span className="danger">*</span></label>
                  <Select placeholder='Select' className="small"
                    options={clientCompanies}
                    value={client}
                    onChange={onprojectClient}
                  />
                </Form.Field>
                <Form.Field>
                  <a className="anchor-color" onClick={() => setSecondOpen(true)}>+ Add New</a>
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>Type of building <span className="danger">*</span></label>
                  <Select placeholder='Select' className="small" options={buildingTypes}
                    value={buildingType}
                    onChange={onBuildingType}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Printing Company </label>
                  <Select placeholder='Select' className="small" options={printingCompanies}
                    value={printing}
                    onChange={onProjectPrinting}
                  />
                </Form.Field>
                <Form.Field>
                  <a className="anchor-color" onClick={() => setSecondOpen(true)}>+ Add New</a>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>

        <Header className="header" >Manage work type and estimated cost</Header>
        <WorkType worktypes={items} workTypeData={moreWorkTypes} />
        {/*  <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Work Type</Table.HeaderCell>
              <Table.HeaderCell> </Table.HeaderCell>
              <Table.HeaderCell>Estimate Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
          [...Array(addWorkTypes)].map((k,i)=>  
<Table.Row key={i}>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>
                          <Select placeholder='Select' className="small" options={items}
                            value={workType}
                            onChange={onWorkType}
                          />
                        </Form.Field>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Form>

              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Form>
                  <Grid columns={1}>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field>

                          <Input label='$' size='small' className="full-width"
                            type="number"
                            value={estCost}
                            onChange={onEstCost}
                          />
                        </Form.Field>
                      </Grid.Column>

                    </Grid.Row>
                  </Grid>
                </Form>

              </Table.Cell>

            </Table.Row>
           
        
        )
        }          */}
        {/* <Table.Row>
              <Table.Cell>
                <a onClick={addWorkType}>+ Add more </a>

              </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>

              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table> */}

        <div>
          <Header className="header" >Address Information</Header>
        </div>
        <Form>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Address Line 1  </label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={adressLine1}
                    onChange={onAdressLine1}
                    maxLength={TEXT_MAXLENGTHS["address_line_1"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Address Line 2   </label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={adressLine2}
                    onChange={onAdressLine2}
                    maxLength={TEXT_MAXLENGTHS["address_line_2"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>City</label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={city}
                    onChange={onCity}
                    maxLength={TEXT_MAXLENGTHS["city"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>

              <Grid.Column>
                <Form.Field>
                  <label>State</label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={state}
                    onChange={onState}
                    maxLength={TEXT_MAXLENGTHS["state"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Zip</label>
                  <Input
                    placeholder='Default' size='small' className="full-width" type="text"
                    value={zip}
                    onChange={onZip}
                    maxLength={TEXT_MAXLENGTHS["zip"]?.maxLength}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                {/* <Form.Field>
                  <label>Country</label>
                  <Select
                    placeholder='Select' className="small" options={countryOptions}
                    value={country}
                    onChange={onCountry}
                  />
                </Form.Field> */}
                <MfAccountAppLib parentCallback={onCountry} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>Description </label>
                  {/* <TextArea placeholder='Tell us more'
                    value={description}
                    onChange={onDescription}
                  /> */}
                  <ReactQuill
                    value={description}
                    modules={{
                      toolbar: {
                        container: [
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline'],
                          // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          [{ 'align': [] }],
                          // ['link', 'image'],
                          ['clean'],
                          [{ 'color': [] }]
                        ]
                      }
                    }}
                    placeholder="Tell us more"
                    onChange={(content, delta, source, editor) => onDescription(content)}
                    // onKeyDown={onKeyPresDescription}
                    id="txtDescription"
                  />
                </Form.Field>
              </Grid.Column>


            </Grid.Row>
          </Grid>
        </Form>





      </Tab.Pane>,
    },
    {
      menuItem: 'People',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
    }

  ]

  const onChangeCompanyCountry = (data) => {
    setCompanyCountry(data.value)
  }


  return (
    <div className="add-project-area">
      {/* <div id="navbar"> */}
      <Modal className="modal_media right-side--fixed-modal add-new-project-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='small' className="primary"><i className="ms-Icon ms-font-xl ms-Icon--Add ms-fontColor-themePrimary"></i> Add New</Button>}
        closeOnDimmerClick={false}
      >
        <Modal.Header><h3>Add New Project </h3></Modal.Header>
        <Modal.Content body>

          <div>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />


            <Modal.Description>

            </Modal.Description>

          </div>


        </Modal.Content>
        {/* <Modal.Actions>
          <Button
            content="Click to continue"
            onClick={handleSaveProject}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={() => setOpen(false)}>
            X  Cancel
        </Button>

        </Modal.Actions> */}
        <Modal className="right-side--fixed-modal add-new-project-modal"
          closeIcon
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
          closeOnDimmerClick={false}
        >

          <Modal.Header><h3>Add Company</h3></Modal.Header>
          <Modal.Content body>

            <div>
              <div className="content">
                <div className="description">Upload Client logo  <span className="danger">*</span></div>
                <Button className="secondary_btn" size='mini' primary>Click to upload</Button>
                <p className="paragraph">Click the upload button to upload the client logo</p>
              </div>

              <Form>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>What's the Company name? <span className="danger">*</span></label>
                        <Input placeholder='Al Hamra Company' size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>

                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Company Type </label>
                        <Select placeholder='Select' className="small" options={companyTypeOptions} />

                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>

                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Email </label>
                        <Input placeholder='Email' size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column>
                      <Form.Field>
                        <label>Type  </label>
                        <Select placeholder='Select' className="small" options={emailTypeOptions} />

                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1} className="grid-add-new">
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <a href="" className="anchor-color">+ Add New</a>
                      </Form.Field>
                    </Grid.Column>


                  </Grid.Row>
                </Grid>


                <Grid columns={2} >
                  <Grid.Row>
                    <Grid.Column >
                      <Form.Field >
                        <label>Phone </label>
                        <Grid columns={2} className="form-field">
                          <Grid.Row>
                            <Grid.Column>
                              <Form.Field>
                                <Select placeholder='Select' className="small" options={countryOptions} />
                              </Form.Field>
                              <Form.Field>
                                <a href="" className="anchor-color">+ Add New</a>
                              </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                              <Form.Field>
                                <Select placeholder='Select' className="small" options={countryOptions} />
                              </Form.Field>

                            </Grid.Column>
                          </Grid.Row>
                        </Grid>

                      </Form.Field>
                    </Grid.Column>

                    <Grid.Column  >
                      <Form.Field>
                        <label>Type  </label>
                        <Select placeholder='Select' className="small" options={phoneTypeOptions} />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Address Line 1</label>
                        <Input placeholder='Address Line 1' size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>

                </Grid>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>Address Line 2</label>
                        <Input placeholder='Address Line 2' size='small' className="full-width" type="text" />
                      </Form.Field>
                    </Grid.Column>

                  </Grid.Row>

                </Grid>

                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <label>City  </label>
                        <Input placeholder='City' size='small' className="full-width" type="text" />

                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label>State Pin </label>
                        <Input placeholder='State Pin' size='small' className="full-width" type="text" />

                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        {/*<label>Country  </label>
                         <Select placeholder='Select' className="small" 
                            options={countryOptions}  
                            value={client}
                            onChange={onprojectClient}/> */}
                        <MfAccountAppLib parentCallback={onChangeCompanyCountry} />

                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                  </Grid.Row>

                </Grid>
              </Form>
              <Button
                content="Add Company mk"
                onClick={() => setOpen(false)}
                positive
                size='small' className="primary"
              />
              <Button size='small' className="icon-border" onClick={() => setSecondOpen(false)}>
                <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i> Cancel
              </Button>




            </div>


          </Modal.Content>






        </Modal>
        <Modal.Actions>
          <Button
            content="Click to continue"
            onClick={handleSaveProject}
            positive
            size='small' className="primary"
          />
          <Button size='small' className="icon-border" onClick={() => setOpen(false)}>
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply ms-fontColor-themePrimary"></i>  Cancel
          </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default ModalExampleModal
