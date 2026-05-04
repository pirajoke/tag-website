"use client";

const icons: Record<string, React.ReactNode> = {
  lobbying: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="8" y="36" width="32" height="4" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="12" y="16" width="4" height="20" fill="currentColor" opacity="0.6" />
      <rect x="22" y="16" width="4" height="20" fill="currentColor" opacity="0.6" />
      <rect x="32" y="16" width="4" height="20" fill="currentColor" opacity="0.6" />
      <path d="M6 16L24 6L42 16H6Z" fill="currentColor" opacity="0.8" />
      <circle cx="24" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  "political-campaigns": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M14 8L14 40" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
      <path d="M14 8L36 14L14 22Z" fill="currentColor" opacity="0.8" />
      <circle cx="14" cy="40" r="3" fill="currentColor" opacity="0.4" />
      <path d="M24 30L30 28L28 34L32 40L26 38L20 40L22 34L18 28Z" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  communications: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="4" y="10" width="28" height="20" rx="3" fill="currentColor" opacity="0.6" />
      <path d="M10 30L6 38L14 32" fill="currentColor" opacity="0.4" />
      <rect x="18" y="18" width="26" height="18" rx="3" fill="currentColor" opacity="0.3" />
      <path d="M36 36L42 42L38 36" fill="currentColor" opacity="0.2" />
      <line x1="10" y1="18" x2="26" y2="18" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="10" y1="22" x2="22" y2="22" stroke="white" strokeWidth="1.5" opacity="0.3" />
    </svg>
  ),
  "graphic-design": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path d="M8 40L18 10L28 40H8Z" fill="currentColor" opacity="0.5" />
      <circle cx="34" cy="18" r="10" fill="currentColor" opacity="0.3" />
      <rect x="26" y="28" width="16" height="16" rx="2" fill="currentColor" opacity="0.4" />
      <circle cx="18" cy="26" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  ),
  fundraising: (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <text x="24" y="30" textAnchor="middle" fill="currentColor" fontSize="20" fontWeight="bold" opacity="0.8">$</text>
      <path d="M24 6V10" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M24 38V42" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M6 24H10" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M38 24H42" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  ),
  "grant-writing": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="10" y="4" width="28" height="36" rx="2" fill="currentColor" opacity="0.3" />
      <rect x="14" y="8" width="20" height="28" rx="1" fill="currentColor" opacity="0.15" />
      <line x1="18" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="18" y1="19" x2="30" y2="19" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="29" x2="28" y2="29" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M32 32L40 44L36 44L34 38L30 44L26 44Z" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  "event-management": (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <rect x="6" y="14" width="36" height="28" rx="3" fill="currentColor" opacity="0.3" />
      <rect x="6" y="14" width="36" height="8" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="14" y="8" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.8" />
      <rect x="31" y="8" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="18" cy="30" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="36" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  ),
};

export function ServiceIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <div className={`text-gold ${className}`}>
      {icons[slug] || (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.6" />
        </svg>
      )}
    </div>
  );
}
