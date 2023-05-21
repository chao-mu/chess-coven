// React
import React from 'react';

// NextJS
import { Image } from 'next/image';

type HeartProps = {
  full: boolean
}

export function Heart({ full }: HeartProps) {
  return (
    <img
      src={`/images/${full ? '/heart-full.svg' : '/heart-empty.svg'}`}
    />
  )
}
