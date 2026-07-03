// app/profile/page.jsx
import ProfileSidebar from "@/components/website/ProfileSidebar";
import AccountInfoForm from "@/components/website/AccountInfoForm";

export default function ProfilePage() {
  return (
    <main className="bg-slate-50 min-h-screen overflow-x-hidden py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR */}
        <div className="md:col-span-1">
          <ProfileSidebar />
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-6 md:p-8">
          <AccountInfoForm />
        </div>

      </div>
    </main>
  );
}
