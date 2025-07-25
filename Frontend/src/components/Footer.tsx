// Footer component for the site
export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-black/80 backdrop-blur-md border-t border-gray-800">
      {/* Copyright and author info */}
      <a className="flex items-center gap-2 text-secondary">
        <span className="text-2xl text-secondary">{"\u00AE"}</span> H.Ries
      </a>
    </footer>
  );
}
