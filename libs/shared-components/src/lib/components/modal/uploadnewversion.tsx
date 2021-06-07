import React from 'react';
import { Button, Checkbox, Modal, Input, Form, Grid, Select } from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { BkpIndex, PhaseIndex, FileTypeIndex, FileStructureIndex } from "@cudo/mf-account-app-lib";


import img from 'libs/shared-components/src/default.png';

interface AlertProps {
  opennewF?,
  cancel?,
  file?
}
export function UploadNewVersion(props: AlertProps) {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },

  ]


  const [open, setOpen] = React.useState(false)
  const [fileData, setFileData] = React.useState(null)
  const [isFolder, setisFolder] = React.useState(false);
  const [fileTypeName, setfileTypeName] = React.useState("");
  const [fileTypeID, setfileTypeID] = React.useState("");
  const [structureTitle, setstructureTitle] = React.useState("");
  const [structureID, setstructureID] = React.useState("");
  const [BKPIDTitle, setBKPIDTitle] = React.useState("");
  const [BKPID, setBKPID] = React.useState("");
  const [phaseName, setPhasesName] = React.useState("");
  const [phaseID, setPhasesID] = React.useState("");
  const [folderName, setfolderName] = React.useState("");
  const [directory, setDirectory] = React.useState("");
  const [workTypeData, setworkTypeData] = React.useState('')



  React.useEffect(() => {
    if (props.file) {
      console.log('files-data', props.file);
      setFileData(props.file);
      setPhasesName(props.file.phaseName);
      setBKPIDTitle(props.file.directory);
      setfileTypeName(props.file.fileTypeName);
      setstructureTitle(props.file.structureTitle);
    }
  }, [props.file]);

  React.useEffect(() => {
    if (props.opennewF) {
      setOpen(props.opennewF);
    }
  }, [props.opennewF]);

  const openf = () => {
    setOpen(true)
  }
  const cancel = () => {
    setOpen(false)
    props.cancel()
  }
  const submit = () => {
    setOpen(false)
    props.cancel()
  }
  const onsetPhasesID = (data) => {
    setPhasesID((data.phaseID).toString());
    setPhasesName(data.phaseName)
  }
  const setFileTypeChange = (data) => {
    setfileTypeName(data.fileTypeTitle);
    setfileTypeID(data.fileTypeID)
  }
  const setBKPIDChange = (data) => {
    console.log('bkp=f', data.isFolder);
    setisFolder(data.isFolder)
    if (data.isFolder) {
      setfolderName(data.folderTitle)
      setDirectory(data.folderTitle)
      console.log('folderName', folderName);
    }
    else {
      setBKPIDTitle(data.BKPIDTitle)
      setDirectory(data.BKPIDTitle)

      setBKPID(data.BKPID)
    }
  }
  const setFileStructureChange = (data) => {
    // setfileStructureID()
    setstructureID(data.structureID)
    setstructureTitle(data.structureTitle)
  }

  return (
    <div>
      <Modal className="modal_media modal_center modal_media_1"
        onClose={cancel}
        onOpen={openf}
        open={open}
        trigger={<Button size='mini' className="grey-btn"> New version</Button>}
      >
        <Modal.Header><h3>Upload new version </h3></Modal.Header>
        <Modal.Content body>

          <div>


            <Form>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>File to replace:</label>

                      <img src={img} className="mr-10 " /> {props.file.fileTitle}
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>


              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="dashed_area">
                        <div className="file-upload-message">
                          <p className="file-upload-default-message">
                            <i className="ms-Icon ms-Icon--Upload" aria-hidden="true"></i>  Click to upload new file</p>

                        </div>
                        <Input type="file" className="file-upload-input" />
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>File settings</label>
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div className="content">
                        <div className="description">Generate file number
                  <p className="enable">Enable this option to generate file numbering</p>
                          <Checkbox toggle className="toggle_area" />

                        </div>

                      </div>
                    </Form.Field>
                  </Grid.Column>


                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Project</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>Work type</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>Phase</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <PhaseIndex phaseName={phaseName} parentPhaseSelect={onsetPhasesID} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>BKP/Folder</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <BkpIndex bkp={BKPIDTitle} parentBKPSelect={setBKPIDChange} />
                  </Grid.Column>

                  <Grid.Column>
                    {/* <Form.Field>
                      <label>File type</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <FileTypeIndex fileTypeName={fileTypeName} parentFileTypeSelect={setFileTypeChange} />

                  </Grid.Column>
                  <Grid.Column>
                    {/* <Form.Field>
                      <label>File structure</label>
                      <Select placeholder='Select' className="small" options={countryOptions} />

                    </Form.Field> */}
                    <FileStructureIndex structureTitle={structureTitle} parentFileStructureSelect={setFileStructureChange} />

                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid  >
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Who can access</label>

                    </Form.Field>

                  </Grid.Column>

                </Grid.Row>
              </Grid>
              <Grid columns={2} >
                <Grid.Row>


                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Everyone in the Project/Subproject' className="small" />
                    </Form.Field>

                  </Grid.Column>

                  <Grid.Column>
                    <Form.Field>
                      <Checkbox label='Specific People only' className="small" />

                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>
            </Form>

          </div>


        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Submit"
            onClick={submit}
            positive
            size='mini' className="grey-btn"
          />
          <Button size='mini' className="icon-border" onClick={cancel}>
            X  Cancel
        </Button>

        </Modal.Actions>
      </Modal>
    </div>

  )
}

export default UploadNewVersion
