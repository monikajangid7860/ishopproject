// app/contact/page.jsx
import ContactForm from "@/components/website/ContactForm";
import ContactInfo from "@/components/website/ContactInfo";
import Map from "@/components/website/Map";

export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-6">
          READY TO WORK WITH US
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: form (spans 2 cols on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <p className="text-sm text-slate-500 mb-4">
                Contact us for all your questions and opinions
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Right: contact card */}
          <div>
            <ContactInfo
              addressLine1="1822 Thackeray Road St, Mississauga, 14013, US"
              phone="+1 (905) 555-0100"
              email="contact@company.com"
              hours="Mon - Fri: 9am - 6pm"
              imageUrl="/mnt/data/8abb723d-75c3-4f3a-a790-2cabf4767e73.png"
            />
            <div className="mt-6 lg:mt-8">
            <div className="w-full max-w-xs overflow-hidden rounded-lg shadow-md">
                {/* Using plain img with provided local path */}
                <img
                  src="/images/contactimg.png"
                  alt="workspace"
                  className="w-full h-48 object-cover"
                />
              </div>
        </div>

          </div>
        </div>

        {/* Image row (to the right of form in screenshot) */}
        
        {/* Map */}
        <div className="mt-10">
          <h2 className="text-lg font-medium text-slate-800 mb-4">FIND US ON GOOGLE MAP</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Map />
          </div>
        </div>
      </div>
    </main>
  );
}
