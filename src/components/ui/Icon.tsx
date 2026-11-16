import {
  BadgeCheck,
  BookOpen,
  Building2,
  Calendar,
  ChartLine,
  Clock,
  Compass,
  FileText,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Phone,
  Rocket,
  Scale,
  Search,
  Sprout,
  Target,
  Telescope,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  search: Search,
  scale: Scale,
  lightbulb: Lightbulb,
  rocket: Rocket,
  "graduation-cap": GraduationCap,
  telescope: Telescope,
  "chart-line": ChartLine,
  users: Users,
  building: Building2,
  handshake: Handshake,
  sprout: Sprout,
  globe: Globe,
  compass: Compass,
  target: Target,
  network: Network,
  "book-open": BookOpen,
  "file-text": FileText,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  calendar: Calendar,
  clock: Clock,
  "badge-check": BadgeCheck,
  "hand-heart": HandHeart,
  waypoints: Waypoints,
};

/** Renders a content-referenced icon with the site-wide 1.5px stroke. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.5} className={className ?? "size-5"} />;
}
