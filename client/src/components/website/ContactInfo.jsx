// components/ContactInfo.jsx
import {
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <aside
      className="
        bg-white rounded-xl
        border border-slate-200
        p-6 md:p-8
        text-slate-700
      "
    >
      {/* HEADER */}
      <h3 className="text-base font-semibold text-slate-900 mb-6">
        Contact Information
      </h3>

      {/* UNITED STATES */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          United States · Head Office
        </h4>

        <p className="text-sm leading-relaxed">
          152 Thatcher Road St, Mahattan, 10463, US
        </p>

        <p className="text-sm mt-2">
          (+025) 3886 25 16
        </p>

        <a
          href="mailto:hello@swattechmart.com"
          className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline"
        >
          hello@swattechmart.com
        </a>
      </div>

      {/* UNITED KINGDOM */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          United Kingdom · Branch
        </h4>

        <p className="text-sm leading-relaxed">
          12 Buckingham Rd, Thornthwaite, HG3 4TY, UK
        </p>

        <p className="text-sm mt-2">
          (+718) 895-5350
        </p>

        <a
          href="mailto:contact@swattechmart.co.uk"
          className="mt-2 inline-block text-sm font-medium text-emerald-600 hover:underline"
        >
          contact@swattechmart.co.uk
        </a>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-dotted border-slate-300 my-6" />

      {/* SOCIAL */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Follow Us
        </p>

        <div className="flex items-center gap-3">
          <IconCircle>
            <Twitter size={16} />
          </IconCircle>

          <IconCircle>
            <Facebook size={16} />
          </IconCircle>

          <IconCircle>
            <Instagram size={16} />
          </IconCircle>

          <IconCircle>
            <Youtube size={16} />
          </IconCircle>

          <IconCircle>
            <Linkedin size={16} />
          </IconCircle>
        </div>
      </div>
    </aside>
  );
}

function IconCircle({ children }) {
  return (
    <div
      className="
        w-9 h-9
        rounded-full
        border border-slate-300
        flex items-center justify-center
        text-slate-600
        hover:bg-slate-100 hover:text-slate-900
        transition
        cursor-pointer
      "
    >
      {children}
    </div>
  );
}
