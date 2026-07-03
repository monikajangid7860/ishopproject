// app/signup/page.jsx
import SignUpForm from "@/components/website/SignUpForm";

export const metadata = {
  title: "Register",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* left illustration */}
          <div className="flex justify-center">
            <img
              src="/images/login.png"
              alt="Register Illustration"
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>

          {/* right form */}
          <div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
}
