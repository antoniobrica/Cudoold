import React from 'react';
import './admins.module.scss';
import { Form, Select, Dropdown } from 'semantic-ui-react';
import { useUsersQuery } from '../../services/useRequest';
import { GET_REFERENCES, GET_USERS } from '../../graphql/graphql';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface AdminsProps {
  parentAdminsSelect,
  admins?,
}
enum ReferenceType {
  COMPANY = "COMPANY"
}
export function Admins(props: AdminsProps) {
  const [items, setItems] = React.useState([])
  const [admins, setAdmins] = React.useState(null)

  const { loading, error, data } = useQuery(GET_REFERENCES, {
    variables: {
      referenceType: ReferenceType.COMPANY,
      referenceID: "Sftobiz_1234"
    }
  });

  React.useEffect(() => {
    if (data) {
      setItems(data.references.users.map(({ userName, userID }, id) => ({ key: id, value: userName, text: userName, id: userID })));
    }
  }, [data]);

  const onAdmins = (event, data) => {
    console.log('admins--', data.value)
    const peopleArr = [];
    for (let i = 0; i < data.value.length; i++) {
      items.map(d => {
        if (d.value == data.value[i]) {
          peopleArr.push({ userID: d.id, userName: data.value[i] });

        }
      })
    }

    setAdmins(data.value)
    props.parentAdminsSelect(peopleArr)
  }
  return (
    <Form.Field>
     
      <label>Admin</label>

      <Dropdown className="small_drop follower-select"
        clearable
        fluid
        multiple
        search
        selection
        options={items}
        value={admins}
        onChange={onAdmins}
        placeholder='Select'
      />

    </Form.Field>
  );
}

export default Admins;

