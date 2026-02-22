"use client";

interface PlayButtonProps {
  active: boolean;
  onToggle: () => void;
}

export default function PlayButton({
  active,
  onToggle,
}: PlayButtonProps) {
  return (
    <div className="youtube_icon_wrapper">
    <span
      className={`youtube_icon ${active ? "active" : ""}`}
      onClick={onToggle}
    >
      {active ? (
        // ⏸ Pause
        <svg xmlns="http://www.w3.org/2000/svg" fill="#140b02" width="30" height="30" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6zm8-14h4v14h-4z" />
        </svg>
      ) : (
        // ▶ Play
        <svg xmlns="http://www.w3.org/2000/svg" fill="#140b02" width="30" height="30" viewBox="0 0 24 24">
          <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" />
        </svg>
      )}
    </span>
    </div>
  );
}
