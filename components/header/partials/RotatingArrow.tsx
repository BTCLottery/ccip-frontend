import Image from 'next/image';
import cn from '@/utils/cn';

type ArrowType = {
  active: boolean;
  pixels: number;
};

export default function RotatingArrow({ active, pixels }: ArrowType) {
  return (
    <div className={cn(`w-[${pixels}px]`)}>
      <Image
        className={cn(
          `ml-1 w-full transition duration-150 text-white ${
            active ? '' : '-rotate-90'
          }`
        )}
        src="/icons/arrow.svg"
        height={pixels ?? 18}
        width={pixels ?? 18}
        alt="Menu Arrow"
        priority={true}
      />
    </div>
  );
}
