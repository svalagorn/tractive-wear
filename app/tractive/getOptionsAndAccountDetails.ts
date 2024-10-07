import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountDetails } from '.';

export const getOptionsAndAccountDetails = async () => {
  const accountDetailsString = await AsyncStorage.getItem('accountDetails');
  if (!accountDetailsString) {
    console.log('No account details found in storage.');
    throw new Error('No account details found in storage.');
  }

  const accountDetails: AccountDetails = JSON.parse(accountDetailsString);

  const getOptsString = await AsyncStorage.getItem('getOptions');
  if (!getOptsString) {
    console.log('No getOpts found in storage.');
    throw new Error('No getOpts found in storage.');
  }

  const getOpts = JSON.parse(getOptsString);

  return { accountDetails, getOpts };
};
