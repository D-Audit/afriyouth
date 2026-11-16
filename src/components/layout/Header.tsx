"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { headerCta, mainNav, type NavItem } from "@/content/navigation";
import { ui } from "@/content/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Desktop dropdown: opens on hover or click; the chevron flips while it is open. */
function DesktopDropdown({
  item,
  active,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem & { menu: NonNullable<NavItem["menu"]> };
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => onClose(), 140);
  };
  useEffect(() => cancelClose, []);

  return (
    <li
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        onOpen();
      }}
      onPointerLeave={(event) => event.pointerType === "mouse" && scheduleClose()}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          onClose();
          triggerRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 rounded-full pl-2.5 pr-2 text-[0.9375rem] transition-colors xl:pl-3.5 xl:pr-2.5",
          active || open ? "text-ink" : "text-muted hover:text-ink",
          active && "bg-sand",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.75}
          className={cn(
            "size-4 transition-transform duration-300 ease-out-soft",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={panelId}
        data-open={open}
        className={cn(
          "absolute left-1/2 top-full z-10 w-[40rem] -translate-x-1/2 pt-3 transition-[opacity,translate,visibility] duration-300 ease-out-soft",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-lift">
          <ul className="grid grid-cols-2 gap-1 p-2">
            {item.menu.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => onClose()}
                  className="group/item flex gap-3 rounded-xl p-3 transition-colors hover:bg-canvas"
                >
                  {link.icon && (
                    <Icon
                      name={link.icon}
                      className="mt-1 size-5 shrink-0 text-accent-ink"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block font-medium text-ink">{link.label}</span>
                    {link.description && (
                      <span className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted">
                        {link.description}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={item.href}
            onClick={() => onClose()}
            className="group/all flex items-center justify-between gap-4 border-t border-line bg-canvas px-5 py-4 transition-colors hover:bg-sand"
          >
            <span>
              <span className="block font-medium text-ink">{item.menu.overviewLabel}</span>
              <span className="block text-sm text-muted">{item.menu.overviewDescription}</span>
            </span>
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 text-accent-ink transition-transform duration-300 ease-out-soft group-hover/all:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </li>
  );
}

/** Mobile row: the label links to the page, the chevron button expands its sub-pages. */
function MobileItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const active = isActive(pathname, item.href);
  const label = (
    <Link
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      className={cn(
        "flex min-h-14 flex-1 items-center font-display text-[1.625rem]",
        active ? "text-accent-ink" : "text-ink",
      )}
    >
      {item.label}
    </Link>
  );

  if (!item.menu) return <li>{label}</li>;

  return (
    <li>
      <div className="flex items-center gap-3">
        {label}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-label={`${item.label}: ${expanded ? "hide" : "show"} pages`}
          onClick={() => setExpanded((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-line text-ink"
        >
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.75}
            className={cn(
              "size-5 transition-transform duration-300 ease-out-soft",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
      <div
        id={listId}
        inert={!expanded}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out-soft",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="overflow-hidden">
          {item.menu.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex min-h-11 items-center gap-3 pl-1 text-muted hover:text-ink aria-[current=page]:text-accent-ink"
              >
                {link.icon && <Icon name={link.icon} className="size-4 text-accent-ink" />}
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pb-3">
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center gap-2 pl-1 font-medium text-accent-ink"
            >
              {item.menu.overviewLabel}
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close an open dropdown when clicking anywhere else.
  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menu]);

  // Lock page scroll (native and Lenis) and move focus into the menu while it is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = overflow;
      lenis?.start();
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, lenis]);

  function close(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }

  // Focus trap: Tab cycles between the toggle button and links inside the panel.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
    const focusables = [
      toggleRef.current,
      ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const solid = scrolled || menu !== null;

  return (
    <header
      onKeyDown={onKeyDown}
      // The bar itself is transparent; the pill inside carries the glass surface. Keeping
      // backdrop-filter off the <header> matters: a filter here would become the containing
      // block for the fixed mobile panel and collapse it.
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        open ? "bg-canvas" : "bg-transparent",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center">
        <div
          className={cn(
            "flex h-14 w-full items-center justify-between gap-6 rounded-full border transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out-soft",
            solid && !open
              ? "border-ink/[0.07] bg-white/85 pl-3 pr-2 shadow-[0_1px_2px_rgb(13_6_36/0.04),0_14px_34px_-18px_rgb(13_6_36/0.28)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent px-0",
          )}
        >
          <Link href="/" className="rounded-lg" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>

          <nav ref={navRef} aria-label={ui.mainNavLabel} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                if (item.menu) {
                  return (
                    <DesktopDropdown
                      key={item.href}
                      item={{ ...item, menu: item.menu }}
                      active={active}
                      open={menu === item.href}
                      onOpen={() => setMenu(item.href)}
                      onClose={() => setMenu((current) => (current === item.href ? null : current))}
                    />
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-full px-2.5 text-[0.9375rem] transition-colors xl:px-3.5",
                        active ? "bg-sand text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href={headerCta.href}>{headerCta.label}</Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ui.menuClose : ui.menuOpen}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
              ) : (
                <Menu aria-hidden="true" strokeWidth={1.5} className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto overscroll-contain bg-canvas lg:hidden"
      >
        <nav
          aria-label={ui.mainNavLabel}
          className="container-site flex min-h-full flex-col py-6"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) close(false);
          }}
        >
          <ul className="divide-y divide-line border-y border-line">
            {mainNav.map((item) => (
              <MobileItem key={item.href} item={item} pathname={pathname} />
            ))}
          </ul>
          <Button href={headerCta.href} size="lg" icon="arrow" className="mt-8 w-full">
            {headerCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
