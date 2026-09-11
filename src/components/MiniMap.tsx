import type { Position } from "@/features/location/location-service";
import { nearestPlace } from "@/features/location/location-service";

/**
 * Deliberately simple, control-free map surface. A production build swaps this
 * for a map provider SDK without changing the calling components.
 */
export function MiniMap({
  position,
  inZone,
  label,
  className = "",
}: {
  position: Position;
  inZone: boolean;
  label?: string;
  className?: string;
}) {
  const { place } = nearestPlace(position);
  const offsetX = inZone ? 0 : 26;
  const offsetY = inZone ? 0 : -18;

  return (
    <div
      role="img"
      aria-label={
        label ?? `Map showing current position ${inZone ? "inside" : "outside"} the ${place.name} safe zone`
      }
      className={`relative overflow-hidden rounded-2xl border border-border bg-secondary ${className}`}
    >
      <svg viewBox="0 0 320 200" className="h-full w-full">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
          </pattern>
        </defs>
        <rect width="320" height="200" fill="url(#grid)" />
        <path d="M0 140 H320" stroke="currentColor" strokeWidth="10" className="text-background" />
        <path d="M120 0 V200" stroke="currentColor" strokeWidth="8" className="text-background" />
        <circle cx="160" cy="100" r="62" className="fill-primary/10 stroke-primary/50" strokeDasharray="6 6" />
        <circle cx="160" cy="100" r="6" className="fill-primary" />
        <text x="160" y="176" textAnchor="middle" className="fill-muted-foreground" fontSize="12">
          {place.name} · {place.safeZoneRadiusM}m safe zone
        </text>
        <g transform={`translate(${160 + offsetX} ${100 + offsetY})`}>
          <circle r="14" className={inZone ? "fill-success/60" : "fill-destructive/30"} />
          <circle r="7" className={inZone ? "fill-success" : "fill-destructive"} />
        </g>
      </svg>
    </div>
  );
}
