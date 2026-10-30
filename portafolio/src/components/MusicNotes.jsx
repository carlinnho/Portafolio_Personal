import "./MusicNotes.css";

const symbols = {
  half: (
    <>
      <ellipse cx="15" cy="36" rx="7.5" ry="4.5" transform="rotate(-22 15 36)" fill="none" stroke="currentColor" strokeWidth="2.7" />
      <path d="M22 34V6" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    </>
  ),
  quarter: (
    <>
      <ellipse cx="15" cy="36" rx="8" ry="5" transform="rotate(-22 15 36)" />
      <path d="M22 34V6" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    </>
  ),
  eighth: (
    <>
      <ellipse cx="15" cy="36" rx="8" ry="5" transform="rotate(-22 15 36)" />
      <path d="M22 34V6c10 2 14 8 8 17 1-7-2-10-8-11" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sixteenth: (
    <>
      <ellipse cx="15" cy="36" rx="8" ry="5" transform="rotate(-22 15 36)" />
      <path d="M22 34V5c10 2 14 7 8 15 1-6-2-9-8-10m0 8c10 2 14 7 8 15 1-6-2-9-8-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  beamed: (
    <>
      <ellipse cx="9" cy="38" rx="6" ry="4" transform="rotate(-22 9 38)" />
      <ellipse cx="35" cy="32" rx="6" ry="4" transform="rotate(-22 35 32)" />
      <path d="M15 36V9L41 3v27" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 9 41 3v6l-26 6Z" />
    </>
  ),
};

const notes = ["half", "eighth", "quarter", "beamed", "sixteenth", "quarter", "eighth"];

export default function MusicNotes() {
  return (
    <div className="contact-music-notes" aria-hidden="true">
      {notes.map((type, index) => (
        <span className={`music-note music-note--${index + 1}`} key={index}>
          <svg viewBox="0 0 48 48" fill="currentColor" focusable="false">
            {symbols[type]}
          </svg>
        </span>
      ))}
    </div>
  );
}
