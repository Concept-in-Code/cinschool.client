import { Environment } from 'common/core';

export const environment: Environment = {
  accountUrl: `${location.protocol}//${location.host}/account/`,
  adminUrl: `${location.protocol}//${location.host}/admin/`,
  apiUrl: `${location.protocol}//${location.host}/api`,
};