import env from '@/utils/providers/chainlink/ccip/config/env';
import router from '@/utils/providers/chainlink/ccip/config/router';
import offramp from '@/utils/providers/chainlink/ccip/config/offramp';

// override console.log to disable ethersjs warning when there are duplicates in ABI

const oldLog = console.log;

// eslint-disable-next-line
const log = (...args: any) => {
  const msg = args.length > 0 ? args[0] : '';

  if (/Duplicate definition of/.test(msg)) {
    return;
  }

  oldLog(...args); // This will pass all the arguments to the original console.log function
};

console.log = log;

const ccipConfig = {
  ...router,
  ...env,
  ...offramp,
};

export default ccipConfig;
