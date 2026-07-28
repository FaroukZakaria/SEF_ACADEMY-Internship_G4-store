
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";
import ProfileInfoCard from "./ProfileInfoCard";
import AddressesSection from "./Addressessection";
import ChangePasswordSection from "./ChangePasswordSection";
import LogoutButton from "./LogoutButton";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

   useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me");
      const user = res.data.user;

      setProfileData(user);
      setEditData(user);
    } catch (err) {
      console.warn("[fetchProfile] API failed:", err);
    } finally {
      setLoading(false);
    }
  };

 
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const res = await api.patch(`/users/${profileData._id}`, {
        username: editData.username,
        phone: editData.phone,
        avatar: editData.avatar,
      });

      const updatedUser = res.data.user;
      setProfileData(updatedUser);
      setEditData(updatedUser);
      setIsEditing(false);
toast.success("Profile updated");
    } catch (err) {
      console.error("[handleSaveProfile]", err);
      toast.error(err.response?.data?.message || "Failed to save changes");
    }
  };

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenChangePassword = () => {
    setOtpEmail(profileData.email);
    setOtpSent(false);
    setOtpCode("");
    setNewPassword("");
    setIsChangingPassword(true);
  };

  const handleSendOtp = async () => {
    setPasswordLoading(true);
    try {
      await api.post("/auth/forgot-password/send-otp", { email: otpEmail });
      setOtpSent(true);
      toast.success("OTP sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setPasswordLoading(true);
    try {
      await api.post("/auth/forgot-password/verify-otp", {
        email: otpEmail,
        otp: otpCode,
        newPassword,
      });
      toast.success("Successfully updated password");
      setIsChangingPassword(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancelChangePassword = () => {
    setIsChangingPassword(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post("/auth/logout");
    } catch {
      console.warn("[handleLogout] API failed, but proceeding to logout");
    } finally {
      localStorage.removeItem("token");
      setLoggingOut(false);
      window.location.href = "/login";
    }
  };

  if (loading || !profileData) {
    return (
      <main className="flex-1 bg-amazon-bg min-h-screen flex items-center justify-center">
        <p className="text-sm text-amazon-textLight">Loading profile…</p>
      </main>
    );
  }

  const displayed = isEditing ? editData : profileData;

  return (
    <main className="flex-1 bg-amazon-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-amazon-textDark mb-8">
          My Profile
        </h1>

        <ProfileInfoCard
          displayed={displayed}
          isEditing={isEditing}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSaveProfile}
          onFieldChange={handleFieldChange}
        />

        <AddressesSection />

        <ChangePasswordSection
          isChangingPassword={isChangingPassword}
          otpSent={otpSent}
          otpEmail={otpEmail}
          setOtpEmail={setOtpEmail}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          passwordLoading={passwordLoading}
          onOpen={handleOpenChangePassword}
          onSendOtp={handleSendOtp}
          onVerifyOtp={handleVerifyOtp}
          onCancel={handleCancelChangePassword}
        />

        <LogoutButton loggingOut={loggingOut} onLogout={handleLogout} />
      </div>
    </main>
  );
}

export default ProfilePage;