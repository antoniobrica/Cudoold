import React, { useEffect, useState } from 'react';

import './login-select.module.scss';
import { Logindrop } from '@cudo/shared-components';
import { useHistory } from 'react-router';
import { isAuthenticated, ToEmail } from '../services/auth';
import axios from 'axios';
import { environment } from '../../environments/environment';


/* eslint-disable-next-line */
export interface LoginSelectProps { }

export function LoginSelect(props: LoginSelectProps) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setselectedCompany] = useState('');
  const handleLogin = () => {
    if (selectedCompany) {
      localStorage.setItem('selectedCompany', selectedCompany);
      history.push('/home');
    }
  };
  useEffect(() => {
    localStorage.setItem('selectedCompany', selectedCompany);
  }, [selectedCompany])
  useEffect(() => {
    if (!isAuthenticated()) {
      ToEmail()
    }
    else {
      // Need to handle with redux
      setEmail(localStorage.getItem('email'))
      axios({
        url: environment.MS_ACCOUNT_URL,
        method: 'post',
        data: {
          query: `
            query userQuery {
              userByEmail(email: "${localStorage.getItem('email')}") {
                references {
                  referenceID
                  referenceType
                  name
                  imageUrl
                  }
                }
              }
            `
        }
      }).then((result) => {
        console.log(result.data?.data?.userByEmail);
        if (result.data?.data?.userByEmail?.length) {
          if (result.data?.data?.userByEmail?.length == 1) {
            history.push('/home');
            return;
          }
          const companiesList = []
          for (let index = 0; index < result.data?.data?.userByEmail.length; index++) {
            const element = result.data?.data?.userByEmail[index];
            const { imageUrl: image, referenceID: key, name: value } = element.references[0]
            companiesList.push({
              image,
              value: key,
              key,
              text: value
            }
            )
          }
          setCompanies([...companiesList])
          if (result.data?.data?.userByEmail.length == 1) {
            const element = result.data?.data?.userByEmail[0];
            const { imageUrl: image, referenceID: key, name: value } = element.references[0]
            setselectedCompany(key);
            localStorage.setItem('selectedCompany', key);
            history.push('/home');
          }
        }
      });
    }
  }, [])
  return (
    <div>
      <Logindrop login={handleLogin} email={email} companies={companies} selectedCompany={setselectedCompany} />
    </div>
  );
}

export default LoginSelect;
