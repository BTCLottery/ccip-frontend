import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcSigner } from '@ethersproject/providers';

const createContract = async (
  address: string,
  abi: ContractInterface,
  ethersProvider: JsonRpcSigner
) => {
  return new Contract(
    address, // PRESALER_ADDRESS,
    abi, // PresaleABI,
    ethersProvider
  );
};
export default createContract;
