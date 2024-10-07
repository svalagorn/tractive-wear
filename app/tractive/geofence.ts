import { isAuthenticated } from '.';
import { getOptionsAndAccountDetails } from './getOptionsAndAccountDetails';

const getTrackerGeofences = async (trackerID: string): Promise<any> => {
  if (!(await isAuthenticated())) {
    console.log('Not authenticated.');
    return;
  }

  const { getOpts } = await getOptionsAndAccountDetails();
  const options = { ...getOpts, path: `/4/tracker/${trackerID}/geofences` };

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
};

const getGeofence = async (fenceID: string): Promise<any> => {
  if (!(await isAuthenticated())) {
    console.log('Not authenticated.');
    return;
  }

  const { getOpts } = await getOptionsAndAccountDetails();
  const options = { ...getOpts, path: `/4/geofence/${fenceID}` };

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
};

export { getTrackerGeofences, getGeofence };
