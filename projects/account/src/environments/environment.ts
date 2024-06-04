import { Environment } from 'common/core';

export const environment: Environment = {
  apiUrl: `${location.protocol}//${location.host}/api`,
  adminUrl: `${location.protocol}//${location.host}/admin/`
};