export type TransactionState =
  | 'None'
  | 'PendingSignature'
  | 'Mining'
  | 'Success'
  | 'Fail'
  | 'Exception';
