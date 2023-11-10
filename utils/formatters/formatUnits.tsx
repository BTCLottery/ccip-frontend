import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits as units } from '@ethersproject/units';

const formatUnits = (value: number, decimals: number) =>
  Number(units(BigNumber.from(value ?? 0), decimals)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
export default formatUnits;
