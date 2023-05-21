// React
import React from 'react';

// NextJs
import Image from 'next/image';

type HeartProps = {
  full: boolean
}

export function Heart({ full }: HeartProps) {
  return (
    <Image
      alt={`${ full ? 'full' : 'empty'} heart`}
      src={`/images/${full ? '/heart-full.svg' : '/heart-empty.svg'}`}
    />
  )
}
