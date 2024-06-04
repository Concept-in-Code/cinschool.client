export type CommonFeedbackType = 'error'
  | 'critical'
  | 'info'
  | 'success';

export interface CommonFeedback {
  type: CommonFeedbackType,
  message?: string,
  action?: string,
  variables?: Map<string, unknown>,
}