import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "outline-light";
type ButtonSize = "md" | "lg";
type ButtonIcon = "arrow" | "external" | "none";

const base =
  "group/button inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,transform] duration-200 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/5",
  ghost: "text-ink underline-offset-4 hover:underline",
  inverse: "bg-canvas text-ink hover:bg-sand",
  "outline-light":
    "border border-on-night/35 text-on-night hover:border-on-night hover:bg-on-night/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ButtonIcon;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string; ariaLabel?: string };
type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

function ButtonIconGlyph({ icon }: { icon: ButtonIcon }) {
  if (icon === "none") return null;
  const Glyph = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <Glyph
      aria-hidden="true"
      strokeWidth={1.5}
      className="size-4 shrink-0 transition-transform duration-200 ease-out-soft group-hover/button:translate-x-0.5"
    />
  );
}

/** Pill button. Renders a Next.js Link when `href` is internal, an <a> for external/mailto, else a <button>. */
export function Button({
  variant = "primary",
  size = "md",
  icon = "none",
  className,
  children,
  ...rest
}: LinkButtonProps | NativeButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "ghost" ? "px-1 py-2.5" : sizes[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <ButtonIconGlyph icon={icon} />
    </>
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ariaLabel } = rest;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as Omit<NativeButtonProps, keyof CommonProps>)}
    >
      {content}
    </button>
  );
}
