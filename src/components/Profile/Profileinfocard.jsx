import { Mail, Phone, Pencil } from "lucide-react";
export default function ProfileInfoCard({
  displayed,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onFieldChange,
}) {
  return (
    <div className="bg-amazon-surface rounded-xl border border-amazon-border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border border-amazon-border bg-amazon-bg flex items-center justify-center">
          <img
            alt={displayed.username}
            className="w-full h-full object-cover"
            src={displayed.avatar || " "}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-amazon-textDark">
            {displayed.username}
          </h2>
          <p className="text-sm text-amazon-textLight">{displayed.email}</p>
          <p className="text-xs text-amazon-orange capitalize mt-0.5">
            {displayed.role}
          </p>
        </div>
      </div>

      {!isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-amazon-textDark">
            <Mail className="w-4 h-4 text-amazon-textLight" aria-hidden="true" />
            <span>{displayed.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-amazon-textDark">
            <Phone className="w-4 h-4 text-amazon-textLight" aria-hidden="true" />
            <span>{displayed.phone}</span>
          </div>
          <button
            onClick={onEdit}
            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-amazon-orange text-amazon-orange hover:bg-amazon-bg px-4 py-2 text-sm mt-4"
          >
            <Pencil className="w-4 h-4 mr-2" aria-hidden="true" />
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-amazon-textLight mb-1 block">
              Username
            </label>
            <input
              className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              value={displayed.username}
              onChange={(e) => onFieldChange("username", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-amazon-textLight mb-1 block">
              Phone
            </label>
            <input
              className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              value={displayed.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-amazon-textLight mb-1 block">
              Avatar URL
            </label>
            <input
              className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              value={displayed.avatar}
              onChange={(e) => onFieldChange("avatar", e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-orange text-white hover:bg-amazon-orangeHover px-4 py-2 text-sm"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-bg text-amazon-textDark hover:bg-amazon-border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}