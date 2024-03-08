"use client";

import Link from "next/link";

const ConversationList = () => (
  <li>
    <Link href="/conversations">
      <div className="pr-4 pl-4 flex items-center space-x-4 rtl:space-x-reverse hover:bg-gray-300 hover:rounded-lg border-t-0 border-b border-gray-200 border-solid pb-2">
        <div className="flex-shrink-0">
          <img
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full"
            src="/images/kesh.jpg"
            alt="Neiage"
          />
        </div>
        <div className="flex-1 min-w-0 self-start">
          <p className="font-medium text-gray-900 truncate">
            Kaleshe Alleyne-Vassel
          </p>
          <p className="text-sm text-gray-500 truncate">Email marketing</p>
          <p className="text text-gray-500 truncate pt-2">
            Hey, excited about working with y...
          </p>
        </div>
        <div className="inline-flex  self-start">Jan 26</div>
      </div>
    </Link>
  </li>
);

export default ConversationList;
