// React
import React from "react";

// NextJS
import Link from "next/link";

// Icons
import { SiGithub, SiLichess } from "react-icons/si";

export function Footer() {
  return (
    <footer className="w-full mt-auto bg-white shadow bg-gray-900/75">
      <div className="w-full flex flex-wrap justify-between p-2 items-center">
        <ul className="flex flex-wrap items-center text-gray-300 gap-4 mr-8">
          <li>
            <Link
              href="https://github.com/chao-mu/tactical-elements"
              className="flex items-center gap-2 hover:underline hover:text-amber-500"
            >
              <SiGithub />
              <span>Source Code</span>
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link
              href="https://lichess.org/@/bestieboots"
              className="flex items-center gap-2 hover:underline hover:text-amber-500"
            >
              <SiLichess />
              Say hi!
            </Link>
          </li>
        </ul>
        <span className="text-gray-400">
          © 2023{" "}
          <Link
            href="https://modestprogress.com/"
            className="hover:underline hover:text-amber-500"
          >
            Modest Progress LLC
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
