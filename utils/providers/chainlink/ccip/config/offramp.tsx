// First, define a specific type for the keys in messageExecutionState
type MessageExecutionStateKey = 0 | 1 | 2 | 3;

// Next, define the type of messageExecutionState using a Record
const messageExecutionState: Record<MessageExecutionStateKey, string> = {
  0: 'UNTOUCHED',
  1: 'IN_PROGRESS',
  2: 'SUCCESS',
  3: 'FAILURE',
};

// Now, specify that status is of type MessageExecutionStateKey or number (if you expect other numbers as well)
const getMessageState = (status: MessageExecutionStateKey | number): string => {
  if (status in messageExecutionState) {
    // You'll need to assert status as a key of messageExecutionState, because TypeScript
    // doesn't narrow 'string | number' to 'MessageExecutionStateKey' automatically.
    return messageExecutionState[status as MessageExecutionStateKey];
  }
  return 'unknown';
};

const ccipOffRampConfig = {
  getMessageState,
};

export default ccipOffRampConfig;
