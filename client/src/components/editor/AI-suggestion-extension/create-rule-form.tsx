'use client'

import { useState } from 'react'

import { highlightColors } from '../highlight-colors'
import { ColorPicker } from '../color-picker'

export const CreateRuleForm = ({ onSubmit } : { onSubmit: any}) => {
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [color, setColor] = useState(highlightColors[0].color)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const selectedColor = highlightColors.find(c => c.color === color)

    onSubmit({
      title, prompt, color, backgroundColor: selectedColor?.backgroundColor,
    })
    setTitle('')
    setPrompt('')
  }

  function validateForm() {
    return title.length > 0 && prompt.length > 0
  }

  const handleColorChange = (newColor: any) => {
    setColor(newColor)
  }

  return (
    <form onSubmit={handleSubmit} className="create-rule-form">
      <div className="label-medium">Create Rule</div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input"
      />
      <textarea
        placeholder="Prompt for the AI model"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        className="textarea"
      />
      <ColorPicker value={color} onChange={handleColorChange} />
      <button disabled={!validateForm()} type="submit" className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md">
        Apply
      </button>
    </form>
  )
}