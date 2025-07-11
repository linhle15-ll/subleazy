'use client'
import { useRef, useState } from 'react'
import { CreateRuleForm } from './create-rule-form'
import { EditRuleForm } from './edit-rule-form'
import { RulesModalCard } from './rules-modal-card'

function useUniqueId(initialId: string) {
  const id = useRef(initialId)

  return () => {
    id.current += 1
    return id.current
  }
}

export const RulesModal = (props: any) => {
  const [rules, setRules] = useState(props.rules)
  const [editingRuleId, setEditingRuleId] = useState(null)

  const getUniqueId = useUniqueId(rules?.length + 1)

  if (!props.isOpen) {
    return null
  }

  return (
    <div className="dialog" data-state="open">
      <div className="dialog-content">
        <div className="main">
          {rules.map((rule: any) => {
            if (rule.id === editingRuleId) {
              return (
                <EditRuleForm
                  key={rule.id}
                  rule={rule}
                  onSave={(newRule: any) => {
                    setRules(rules.map((r: any) => (r.id === rule.id ? newRule : r)))
                    setEditingRuleId(null)
                  }}
                  onCancel={() => setEditingRuleId(null)}
                />
              )
            }
            return (
              <RulesModalCard
                key={rule.id}
                onDelete={() => setRules(rules.filter((r: any) => r.id !== rule.id))}
                onEdit={() => setEditingRuleId(rule.id)}
                rule={rule}
              />
            )
          })}
          <CreateRuleForm
            onSubmit={(newRule: any)=> {
              setRules([
                ...rules,
                {
                  ...newRule,
                  id: getUniqueId().toString(),
                },
              ])
            }}
          />
        </div>
        <div className="button-group bottom gap-2">
          <button className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md" 
            type="button" onClick={() => {
            props.onClose()
            setRules(props.rules)
            
          }}>
            Close
          </button>
          <button
            className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md"
            type="button"
            disabled={props.rules === rules}
            onClick={() => props.onSave(rules)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}