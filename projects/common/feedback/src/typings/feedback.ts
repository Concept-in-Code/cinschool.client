export type FeedbackType = 'error'
  | 'critical'
  | 'info'
  | 'success';

export interface Feedback {
  type: FeedbackType,
  message?: string,
  action?: string,
  variables?: Map<string, unknown>,
}