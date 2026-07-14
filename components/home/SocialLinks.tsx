type SocialLinksProps = {
  className?: string;
  labels: {
    linkedin: string;
    facebook: string;
    tiktok: string;
  };
};

const iconClass = "h-4 w-4 fill-current";
const linkClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-orange/60 text-orange transition-colors hover:border-orange hover:text-orange";

export function SocialLinks({ className, labels }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.linkedin}
        className={linkClass}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.facebook}
        className={linkClass}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass}>
          <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.1 4.3c-2.24 0-3.77 1.37-3.77 3.87v2.17H7.77v2.96h2.56V21h3.17z" />
        </svg>
      </a>
      <a
        href="https://www.tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.tiktok}
        className={linkClass}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={iconClass}>
          <path d="M16.6 3h-2.98v12.3a2.62 2.62 0 1 1-1.85-2.5V9.75a5.7 5.7 0 1 0 4.83 5.63V9.14a7.1 7.1 0 0 0 4.15 1.33V7.5a4.15 4.15 0 0 1-4.15-4.15V3z" />
        </svg>
      </a>
    </div>
  );
}
