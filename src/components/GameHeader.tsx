// React
import React from 'react'


type GameHeaderProps = {
  title: string
  rules: string
}

export const GameHeader = ({ title, rules }: GameHeaderProps) => {
  return (
    <div className="px-4 bg-purple-500 flex flex-col text-white pt-2">
      <div className="text-3xl font-bold">{ title }</div>         
      <div className="text-lg flex flex-col">
        <div className="mb-4">{ rules }</div>
        <div className="whitespace-nowrap">White on bottom</div>
      </div>
    </div>                                       
  )
}


