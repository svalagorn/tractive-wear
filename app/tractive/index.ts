import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOptionsAndAccountDetails } from './getOptionsAndAccountDetails';

const TractiveClient = '6536c228870a3c8857d452e8';

export interface AccountDetails {
  email: string;
  password: string;
  token?: string;
  uid?: string;
}

interface GloOpts {
  method: string;
  hostname: string;
  path: string;
  headers: {
    'X-Tractive-Client': string;
    Authorization?: string;
    'content-type': string;
  };
}

let accountDetails: AccountDetails = {
  email: '',
  password: '',
};

let getOptions: GloOpts = {
  method: 'GET',
  hostname: 'graph.tractive.com',
  path: '',
  headers: {
    'X-Tractive-Client': TractiveClient,
    'content-type': 'application/json',
  },
};

const isAuthenticated = async (): Promise<boolean> => {
  const accountDetailsString = await AsyncStorage.getItem('accountDetails');
  if (!accountDetailsString) {
    return false;
  }

  const accountDetails: AccountDetails = JSON.parse(accountDetailsString);

  return !!accountDetails.token;
};

const authenticate = async (): Promise<boolean> => {
  const options = {
    method: 'POST',
    hostname: 'graph.tractive.com',
    path: `/4/auth/token?grant_type=tractive&platform_email=${encodeURIComponent(
      accountDetails.email
    )}&platform_token=${encodeURIComponent(accountDetails.password)}`,
    headers: {
      'X-Tractive-Client': TractiveClient,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`https://${options.hostname}${options.path}`, {
      method: options.method,
      headers: options.headers,
    });
    const data = await response.json();
    accountDetails.token = data.access_token;
    accountDetails.uid = data.user_id;
    getOptions.headers['Authorization'] = `Bearer ${accountDetails.token}`;

    await AsyncStorage.setItem('accountDetails', JSON.stringify(accountDetails));
    await AsyncStorage.setItem('getOptions', JSON.stringify(getOptions));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const connect = async (email: string, password: string): Promise<boolean> => {
  accountDetails.email = email;
  accountDetails.password = password;
  await authenticate();
  return isAuthenticated();
};

export { connect, isAuthenticated };
