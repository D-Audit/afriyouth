import { Wordmark } from "@/components/brand/Wordmark";

/**
 * First-visit intro: the official wordmark pops in on a brand-blue panel, then the panel
 * lifts away to reveal the page. Pure CSS (see `.site-loader` in globals.css), so it can
 * never get stuck if JavaScript fails. It plays once per browser session (LOADER_SCRIPT)
 * and is skipped for users who prefer reduced motion.
 */
export function SiteLoader() {
  return (
    <div aria-hidden="true" className="site-loader">
      <div className="site-loader__inner">
        <Wordmark tone="dark" className="site-loader__wordmark" />
      </div>
    </div>
  );
}

/** Runs before first paint: marks repeat visits in this tab session so the intro is skipped. */
export const LOADER_SCRIPT = `try{var k="ay-intro";if(sessionStorage.getItem(k))document.documentElement.classList.add("intro-seen");else sessionStorage.setItem(k,"1")}catch(e){document.documentElement.classList.add("intro-seen")}`;
