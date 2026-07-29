import { LogOut } from "lucide-react";

export default function LogoutButton({ loggingOut, onLogout }) {
  return (
    <button
      onClick={onLogout}
      disabled={loggingOut}
      className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-lightNavy text-white hover:bg-amazon-navy px-4 py-2 text-sm w-full"
    >
      <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
      {loggingOut ? "Logging out…" : "Logout"}
    </button>
  );
}