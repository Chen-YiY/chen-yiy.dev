interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 48, className = '' }: LogoProps) {
  // Constellation: 7 nodes connected by edges
  // Arranged to form an abstract, balanced shape
  const nodes = [
    { x: 60, y: 18, r: 5 },   // top
    { x: 30, y: 40, r: 4 },   // left
    { x: 88, y: 36, r: 4 },   // right
    { x: 60, y: 52, r: 6 },   // center (largest)
    { x: 22, y: 72, r: 3 },   // bottom-left
    { x: 58, y: 88, r: 4 },   // bottom
    { x: 92, y: 70, r: 3 },   // bottom-right
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3],
    [1, 3], [2, 3],
    [1, 4], [3, 5], [3, 6],
    [4, 5], [5, 6],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Constellation Logo"
    >
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-logo-edge, #8c8c8c)"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i === 3 ? 'var(--color-accent)' : 'var(--color-logo-node, #a0a0a0)'}
        />
      ))}

      {/* Glow on center node */}
      <circle
        cx={nodes[3].x}
        cy={nodes[3].y}
        r={nodes[3].r + 4}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values={`${nodes[3].r + 2};${nodes[3].r + 6};${nodes[3].r + 2}`}
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.1;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
