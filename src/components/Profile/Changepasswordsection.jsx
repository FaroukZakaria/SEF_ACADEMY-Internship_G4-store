import { Lock } from "lucide-react";
export default function ChangePasswordSection({
  isChangingPassword,
  otpSent,
  otpEmail,
  otpCode,
  setOtpCode,
  newPassword,
  setNewPassword,
  passwordLoading,
  passwordError,
  passwordSuccess,
  onOpen,
  onSendOtp,
  onVerifyOtp,
  onCancel,
}) {
  return (
    <div className="bg-amazon-surface rounded-xl border border-amazon-border p-6 mb-6">
      <h3 className="font-semibold text-amazon-textDark mb-4 flex items-center gap-2">
        <Lock className="w-5 h-5 text-amazon-orange" aria-hidden="true" />
        Change Password
      </h3>

      {!isChangingPassword ? (
        <button
          onClick={onOpen}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-amazon-orange text-amazon-orange hover:bg-amazon-bg px-4 py-2 text-sm"
        >
          Change Password
        </button>
      ) : !otpSent ? (
        <div className="space-y-4">
          <p className="text-sm text-amazon-textLight">
            We'll send an OTP to your email to verify your identity.
          </p>
          <div>
            <label className="text-xs font-medium text-amazon-textLight mb-1 block">
              Email
            </label>
            <div className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-bg text-amazon-textDark cursor-not-allowed select-none">
              {otpEmail}
            </div>
          </div>
          {passwordError && (
            <p className="text-sm text-red-600">{passwordError}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={onSendOtp}
              disabled={passwordLoading || !otpEmail}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-orange text-white hover:bg-amazon-orangeHover active:bg-amazon-orangeHover px-4 py-2 text-sm"
            >
              {passwordLoading ? "Sending…" : "Send OTP"}
            </button>
            <button
              onClick={onCancel}
              disabled={passwordLoading}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-bg text-amazon-textDark hover:bg-amazon-border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-amazon-textLight">
            Enter the OTP sent to{" "}
            <span className="text-amazon-textDark">{otpEmail}</span> and
            choose a new password.
          </p>
          <div>
            <label className="text-xs font-medium text-amazon-textLight mb-1 block">
              OTP code
            </label>
            <input
              placeholder="6-digit code"
              className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-amazon-textLight mb-1 block">
              New password
            </label>
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2.5 text-sm border border-amazon-border rounded-lg bg-amazon-surface text-amazon-textDark focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {passwordError && (
            <p className="text-sm text-red-600">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="text-sm text-amazon-orange">{passwordSuccess}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={onVerifyOtp}
              disabled={passwordLoading || !otpCode || !newPassword}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-amazon-orange text-white hover:bg-amazon-orangeHover active:bg-amazon-orangeHover px-4 py-2 text-sm"
            >
              {passwordLoading ? "Verifying…" : "Verify & set password"}
            </button>
            <button
              onClick={onCancel}
              disabled={passwordLoading}
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