'use client'
import { useState } from 'react'
import { highlightColors } from '../highlight-colors'
import { ColorPicker } from '../color-picker'

export const EditRuleForm = ({ rule, onSave, onCancel } : { rule: any, onSave: any, onCancel: any}) => {
  const [title, setTitle] = useState(rule.title)
  const [prompt, setPrompt] = useState(rule.prompt)
  const [color, setColor] = useState(rule.color || highlightColors[0].color)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const selectedColor = highlightColors.find(c => c.color === color)
    const backgroundColor = selectedColor?.backgroundColor

    onSave({
      ...rule, title, prompt, color, backgroundColor,
    })
  }

  function validateForm() {
    return title.length > 0 && prompt.length > 0
  }

  const handleColorChange = (newColor: any) => {
    setColor(newColor)
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="edit-rule-form">
        <div className="label-medium">Edit Rule {rule.id}</div>
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
        <div className="button-group">
          <button disabled={!validateForm()} type="submit" className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md" >
            Save
          </button>
          <button type="button" className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md"  onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}