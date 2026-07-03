// components/Map.jsx
export default function Map() {
  // replace the src with your actual embed url if needed
  const src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.96305791531697!3d-37.816279742021214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f0f8a7%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1616660000000!5m2!1sen!2sus";

  return (
    <div className="w-full" style={{ minHeight: 220 }}>
      <div className="relative w-full" style={{ paddingTop: "35%" }}>
        <iframe
          title="company location"
          src={src}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
