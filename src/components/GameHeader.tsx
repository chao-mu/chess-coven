// React
import React from 'react'

type GameHeaderProps = {
  title: string
  rules: string
  story?: string
}

export const GameHeader = ({ title, rules, story }: GameHeaderProps) => {
  return (
    <div className="px-4 flex flex-col text-white pt-5 px-10 pb-2">
      <div className="text-3xl font-bold pb-2">{ title }</div>         
      <div className="text-lg flex flex-col gap-4 py-4">
        { story && <div>{ story }</div> }
        <div className="font-bold">{ rules }</div>
      </div>
    </div>                                       
  )
}


