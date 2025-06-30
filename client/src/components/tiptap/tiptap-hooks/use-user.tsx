'use client'

import { useState } from "react"

const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D']

const getRandomElement = <T,>(list: Array<T>) => list[Math.floor(Math.random() * list?.length)]
const getRandomColor = () => getRandomElement(colors)

export const userColor = getRandomColor()
export const userName = "Linh" // hardcoded

export const useUser = () => {
  return {
    name: userName,
    color: userColor,
  }
}