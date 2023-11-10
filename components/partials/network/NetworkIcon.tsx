import Image from 'next/image';
import { getNetworkImage } from '@/constants/networks';

type NetworkIconImage = {
  chainId: string;
  size: number;
};

export default function NetworkIcon({ chainId, size }: NetworkIconImage) {
  const { image, label } = getNetworkImage(chainId);
  if (!image || !label) return null;
  return (
    <Image
      src={image}
      width={size}
      height={size}
      alt={label ?? ''}
      className="pointer-events-none select-none"
      priority={true}
    />
  );
}
