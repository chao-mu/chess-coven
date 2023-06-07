// React
import React from "react";

// NextJs
import Image from "next/image";

// Images
import heartFull from "@/public/images/heart-full.svg";
import heartEmpty from "@/public/images/heart-empty.svg";

type HeartProps = {
  full: boolean;
};

export function Heart({ full }: HeartProps) {
  return (
    <Image
      alt={`${full ? "full" : "empty"} heart`}
      src={full ? heartFull : heartEmpty}
      width={25}
      height={25}
    />
  );
}
