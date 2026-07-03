import LoginForm from "@/components/website/LoginForm";

export default function LoginPage() {
  
  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT Illustration */}
          <div className="flex justify-center">
            <img
              src="/images/login.png"
              alt="Login Illustration"
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>

          {/* RIGHT Login Form */}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
