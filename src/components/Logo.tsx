interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CY Logo"
    >
      {/* Background shape — rounded square with subtle depth */}
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="28"
        fill="var(--color-logo-bg, #1a1a1a)"
      />
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="28"
        stroke="var(--color-logo-stroke, #383838)"
        strokeWidth="1"
        fill="none"
      />

      {/* C letter — arc form */}
      <path
        d="M72 35C63.5 28 51 28 44 35C37 42 37 54 44 61C51 68 63.5 68 72 61"
        stroke="var(--color-logo-c, #60a5fa)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Y letter — geometric, angular */}
      <path
        d="M56 58L44 75M56 58L68 75M56 58V90"
        stroke="var(--color-logo-y, #e8e6e3)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Terminal cursor — blinking dot */}
      <rect
        x="82"
        y="82"
        width="8"
        height="12"
        rx="1.5"
        fill="var(--color-logo-cursor, #60a5fa)"
        opacity="0.8"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.2;0.8"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
