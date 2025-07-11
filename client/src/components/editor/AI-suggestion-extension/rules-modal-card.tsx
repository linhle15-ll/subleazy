export const RulesModalCard = ({ onEdit, onDelete, rule } : { onEdit: any, onDelete: any, rule: any}) => {
  return (
    <div className="card">
      <div className="label-medium card-title">
        Rule {rule.id}: {rule.title}
      </div>
      <div className="label card-text">{rule.prompt}</div>
      <div className="button-group">
        <button onClick={onEdit} type="submit" className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md">
          Edit
        </button>
        <button onClick={onDelete} type="submit" className="font-medium bg-gray-200 text-black p-1 px-2 m-1 rounded-md">
          Delete
        </button>
      </div>
    </div>

    
  )
}