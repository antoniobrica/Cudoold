
import React from 'react';
import {
  Button,
  Header,
  Modal,

  Input,
  Form,
  Grid,

  Select,
  TextArea,
} from 'semantic-ui-react';
// import SampleModal from './sample-modal';
import { MS_SERVICE_URL } from '@cudo/mf-core';
export function FilterPopup() {
  const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
  ];

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal style={{ width: '450px' }}
        className="modal_media right-side--fixed-modal filter-modal"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          // <Button size="mini" className="grey-btn">
          //   Filter
          // </Button>
          <img src={`${MS_SERVICE_URL['ASSETS_CDN_URL'].url}/assets/images/filter.png`} className="filter-icon mr-10 " />
        }
        closeOnDimmerClick={false}
      >

        <Modal.Header className="headertop">
          <label>Filter </label>
        </Modal.Header>
        <Modal.Content body>
          <div>
            <Form>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Assing to
                      </label>
                      <Select
                         clearable
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Followers </label>
                      <Select
                         clearable
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Status
                      </label>
                      <Select
                         clearable
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Start date
                      </label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        End date
                      </label>
                      <Input
                        placeholder="Default"
                        size="small"
                        className="full-width"
                        type="date"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>
                        Type
                      </label>
                      <Select
                         clearable
                        placeholder="Select"
                        className="small"
                        options={countryOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Apply"
            onClick={() => setOpen(false)}
            positive
            size="small"
            className="primary"
          />
          <Button
            size="small"
            className="icon-border"
            onClick={() => setOpen(false)}
          >
            <i className="ms-Icon ms-font-xl ms-Icon--CalculatorMultiply"></i> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default FilterPopup;
