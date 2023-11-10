import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';

const formatEtherToLocaleString = (value: number) =>
  Number(formatEther(BigNumber.from(value ?? 0))).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default formatEtherToLocaleString;
