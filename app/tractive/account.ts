import { isAuthenticated } from './index';
import { getOptionsAndAccountDetails } from './getOptionsAndAccountDetails';

/**
 * Gets Tractive account information.
 * @returns {Promise<AccountInfo>} Account information
 */
async function getAccountInfo(): Promise<any | void> {
  try {
    if (!(await isAuthenticated())) {
      console.log('Not authenticated.');
      return;
    }
    const { accountDetails, getOpts } = await getOptionsAndAccountDetails();
    const options = { ...getOpts, path: `/4/user/${accountDetails.uid}` };
    const response = await fetch(`https://${options.hostname}${options.path}`, {
      method: options.method,
      headers: options.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching account info:', (error as Error).message);
  }
}

/**
 * Get all account subscriptions
 * @returns {Promise<Subscription[]>} Array of subscriptions
 */
async function getAccountSubscriptions(): Promise<any[] | void> {
  if (!(await isAuthenticated())) {
    console.log('Not authenticated.');
    return;
  }

  const { accountDetails, getOpts } = await getOptionsAndAccountDetails();
  const options = { ...getOpts, path: `/4/user/${accountDetails.uid}/subscriptions` };

  try {
    const response = await fetch(`https://${options.hostname}${options.path}`, {
      method: options.method,
      headers: options.headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Get a subscription
 * @param {string} subscriptionID
 * @returns {Promise<Subscription>} Subscription object
 */
async function getAccountSubscription(subscriptionID: string): Promise<any | void> {
  if (!(await isAuthenticated())) {
    console.log('Not authenticated.');
    return;
  }

  const { getOpts } = await getOptionsAndAccountDetails();
  const options = { ...getOpts, path: `/4/subscription/${subscriptionID}` };

  try {
    const response = await fetch(`https://${options.hostname}${options.path}`, {
      method: options.method,
      headers: options.headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Get a list of accounts you share trackers with
 * @returns {Promise<Share[]>} Array of shares
 */
async function getAccountShares(): Promise<any[] | void> {
  if (!(await isAuthenticated())) {
    console.log('Not authenticated.');
    return;
  }

  const { accountDetails, getOpts } = await getOptionsAndAccountDetails();
  const options = { ...getOpts, path: `/4/user/${accountDetails.uid}/shares` };

  try {
    const response = await fetch(`https://${options.hostname}${options.path}`, {
      method: options.method,
      headers: options.headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getAccountInfo, getAccountSubscriptions, getAccountSubscription, getAccountShares };
