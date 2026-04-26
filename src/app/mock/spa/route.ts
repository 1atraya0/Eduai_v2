import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

const resourceFiles = {
  home: "11-Eduai Trips - Home.html",
  flights: "12-Eduai Trips - Domestic & Inter.html",
  hotels: "13-Eduai Trips - Domestic & Inter.html",
  packages: "14-Eduai Trips - Packages.html",
  payment: "15-Eduai Trips - Payment (PayU In.html",
  dashboard: "16-Eduai Trips - Integrated Custo.html",
  about: "17-Eduai Trips - About Us.html",
  terms: "18-Eduai Trips - Terms & Conditio.html",
  login: "10-Eduai Trips - Login (Mobile +.html",
} as const;

type TabId = keyof typeof resourceFiles;

const navItems: Array<{ id: TabId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "flights", label: "Flights" },
  { id: "packages", label: "Packages" },
  { id: "about", label: "About Us" },
  { id: "terms", label: "T&C" },
];

const homePackagesCarouselMarkup = `
  <section class="home-packages-shell mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Featured travel packages">
    <div class="mb-5 flex items-end justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Handpicked Escapes</p>
        <h2 class="mt-2 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">Popular Packages</h2>
        <p class="mt-2 text-sm text-gray-600">Swipe or use arrows to explore and book instantly.</p>
      </div>
      <div></div>
    </div>

    <div class="home-packages-viewport">
      <div id="homePackagesTrack" class="home-packages-track" aria-live="polite">
        <article class="home-package-card" data-carousel-index="0">
          <img class="home-package-image" src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80" alt="Snowy Kashmir valley" loading="lazy" />
          <div class="home-package-content">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">4N / 5D</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">Kashmir Snowline</h3>
            <p class="mt-2 text-sm text-gray-600">Srinagar, Gulmarg, and Pahalgam with flights and boutique stays.</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-brand-600 text-lg font-bold">Rs 34,900</p>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50" data-tab-target="packages">View</button>
                <button type="button" class="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" data-open-booking="true" data-booking-type="package">Add</button>
              </div>
            </div>
          </div>
        </article>

        <article class="home-package-card" data-carousel-index="1">
          <img class="home-package-image" src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80" alt="Kerala backwaters and greenery" loading="lazy" />
          <div class="home-package-content">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">3N / 4D</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">Kerala Escape</h3>
            <p class="mt-2 text-sm text-gray-600">Munnar and Alleppey with private transfers and curated experiences.</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-brand-600 text-lg font-bold">Rs 28,999</p>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50" data-tab-target="packages">View</button>
                <button type="button" class="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" data-open-booking="true" data-booking-type="package">Add</button>
              </div>
            </div>
          </div>
        </article>

        <article class="home-package-card" data-carousel-index="2">
          <img class="home-package-image" src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=80" alt="Andaman beach and turquoise water" loading="lazy" />
          <div class="home-package-content">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">5N / 6D</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">Andaman Blue</h3>
            <p class="mt-2 text-sm text-gray-600">Island hopping, beach stays, and water activities with local guides.</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-brand-600 text-lg font-bold">Rs 39,500</p>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50" data-tab-target="packages">View</button>
                <button type="button" class="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" data-open-booking="true" data-booking-type="package">Add</button>
              </div>
            </div>
          </div>
        </article>

        <article class="home-package-card" data-carousel-index="3">
          <img class="home-package-image" src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80" alt="North East hills and clouds" loading="lazy" />
          <div class="home-package-content">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">6N / 7D</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">North East Explorer</h3>
            <p class="mt-2 text-sm text-gray-600">Shillong, Cherrapunji, and Kaziranga with scenic road journeys.</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-brand-600 text-lg font-bold">Rs 42,400</p>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50" data-tab-target="packages">View</button>
                <button type="button" class="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" data-open-booking="true" data-booking-type="package">Add</button>
              </div>
            </div>
          </div>
        </article>

        <article class="home-package-card" data-carousel-index="4">
          <img class="home-package-image" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" alt="Goa beach at sunset" loading="lazy" />
          <div class="home-package-content">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">3N / 4D</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">Goa Weekend Escape</h3>
            <p class="mt-2 text-sm text-gray-600">Beachfront stay, nightlife experiences, and private airport transfer.</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-brand-600 text-lg font-bold">Rs 24,500</p>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50" data-tab-target="packages">View</button>
                <button type="button" class="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" data-open-booking="true" data-booking-type="package">Add</button>
              </div>
            </div>
          </div>
        </article>

        <article class="home-package-card" data-carousel-index="5">
          <img class="home-package-image" src="https://images.unsplash.com/photo-1590845947670-c009801ffa74?auto=format&fit=crop&w=900&q=80" alt="Golden Temple in Amritsar" loading="lazy" />
          <div class="home-package-content">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">2N / 3D</p>
            <h3 class="mt-2 text-xl font-bold text-gray-900">Punjab Heritage Trail</h3>
            <p class="mt-2 text-sm text-gray-600">Amritsar highlights, local food walks, and guided city experiences.</p>
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-brand-600 text-lg font-bold">Rs 21,700</p>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50" data-tab-target="packages">View</button>
                <button type="button" class="rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700" data-open-booking="true" data-booking-type="package">Add</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div id="homePackagesDots" class="mt-4 flex items-center justify-center gap-2" aria-hidden="true"></div>
  </section>
`;

function injectHomePackagesCarousel(markup: string): string {
  if (markup.includes("id=\"homePackagesTrack\"")) {
    return markup;
  }
  const whyChooseHeadingPattern = /(<h2[^>]*>\s*Why\s+Choose\s+EduaiTrips\s*<\/h2>)/i;
  if (whyChooseHeadingPattern.test(markup)) {
    return markup.replace(whyChooseHeadingPattern, `${homePackagesCarouselMarkup}\n$1`);
  }
  return `${markup}\n${homePackagesCarouselMarkup}`;
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

function extractHeadBitsAll(sources: Record<TabId, string>): { styles: string; links: string } {
  const styleSet = new Set<string>();
  const linkSet = new Set<string>();

  Object.values(sources).forEach((html) => {
    [...html.matchAll(/<style[\s\S]*?<\/style>/gi)].forEach((m) => {
      styleSet.add(m[0]);
    });

    [...html.matchAll(/<link[^>]+>/gi)]
      .map((m) => m[0])
      .filter((tag) => /googleapis|font-awesome|cdnjs/i.test(tag))
      .forEach((tag) => {
        linkSet.add(tag);
      });
  });

  return {
    styles: [...styleSet].join("\n"),
    links: [...linkSet].join("\n"),
  };
}

function stripHeaderAndScripts(body: string): string {
  return body
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .trim();
}

function buildSpaHtml(tabMarkup: Record<TabId, string>, styles: string, links: string): string {
  const nav = navItems
    .map(
      (item, index) =>
        `<button id="tab-${item.id}" data-tab-target="${item.id}" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-controls="panel-${item.id}" tabindex="${index === 0 ? "0" : "-1"}" type="button" class="spa-nav-item ${index === 0 ? "nav-item-active" : ""} relative text-sm text-gray-600 hover:text-brand-600 transition-colors h-full flex items-center">${item.label}</button>`,
    )
    .join("\n");

  const mobileNav = navItems
    .map(
      (item) =>
        `<button data-tab-target="${item.id}" type="button" class="w-full rounded-xl border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-brand-50 hover:text-brand-700">${item.label}</button>`,
    )
    .join("\n");

  const tabPanels: TabId[] = ["home", "flights", "hotels", "packages", "payment", "dashboard", "about", "terms", "login"];

  const sections = tabPanels
    .map(
      (item, index) =>
        `<section id="panel-${item}" data-tab-panel="${item}" role="tabpanel" aria-labelledby="tab-${item}" tabindex="0" class="spa-tab-panel" ${index === 0 ? "" : 'style="display:none"'}>${tabMarkup[item]}</section>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EduaiTrips SPA</title>
  <script>
    window.FontAwesomeConfig = { autoReplaceSvg: 'nest' };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  ${links}
  ${styles}
  <style>
    .spa-nav-item { background: transparent; border: 0; cursor: pointer; font: inherit; }
    .spa-nav-item.nav-item-active::after { bottom: -9px !important; }
    .spa-nav-item:focus-visible {
      outline: 2px solid #16a34a;
      outline-offset: 3px;
      border-radius: 0.35rem;
    }
    .spa-tab-panel { will-change: transform, opacity; }
    .spa-swipe-forward { animation: spaSwipeForward 240ms ease; }
    .spa-swipe-back { animation: spaSwipeBack 240ms ease; }
    .spa-cart-badge {
      min-width: 1.1rem;
      height: 1.1rem;
      padding: 0 0.28rem;
      border-radius: 9999px;
      font-size: 0.68rem;
      line-height: 1.1rem;
      text-align: center;
      font-weight: 700;
      background: #ef4444;
      color: #fff;
    }
    .spa-overlay {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 120;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
    }
    .spa-overlay.active { display: flex; }
    .spa-mobile-menu {
      position: fixed;
      inset: 0;
      z-index: 140;
      display: none;
      background: rgba(2, 6, 23, 0.5);
      backdrop-filter: blur(3px);
    }
    .spa-mobile-menu.active { display: block; }
    .spa-mobile-menu-panel {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: min(76vw, 280px);
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      border-left: 1px solid #e2e8f0;
      box-shadow: -20px 0 48px -24px rgba(0, 0, 0, 0.45);
      padding: 0.85rem;
      overflow: auto;
    }
    .spa-booking-bar {
      transition: opacity 200ms ease, transform 200ms ease;
    }
    .spa-booking-hidden {
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
    }
    .home-packages-shell {
      position: relative;
      z-index: 2;
    }
    .home-packages-track {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(300px, 1fr);
      gap: 1rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding-bottom: 0.4rem;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .home-packages-track::-webkit-scrollbar {
      display: none;
    }
    .home-packages-viewport {
      position: relative;
      border-radius: 1rem;
    }
    .home-package-card {
      scroll-snap-align: start;
      border: 1px solid #e5e7eb;
      border-radius: 1rem;
      background: linear-gradient(180deg, #ffffff 0%, #f7fbf7 100%);
      min-height: 310px;
      overflow: hidden;
      box-shadow: 0 16px 44px -28px rgba(20, 83, 45, 0.45);
      transition: transform 180ms ease, box-shadow 180ms ease;
    }
    .home-package-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 22px 52px -30px rgba(20, 83, 45, 0.55);
    }
    .home-package-image {
      width: 100%;
      height: 170px;
      object-fit: cover;
      display: block;
    }
    .home-package-content {
      padding: 0.95rem;
    }
    .home-carousel-nav {
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 0.75rem;
      border: 1px solid #d1d5db;
      color: #374151;
      background: #fff;
      transition: all 180ms ease;
    }
    .home-carousel-nav:hover {
      border-color: #22c55e;
      color: #15803d;
      background: #f0fdf4;
    }
    .home-carousel-dot {
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 999px;
      background: #d1d5db;
      transition: all 180ms ease;
    }
    .home-carousel-dot.active {
      width: 1.2rem;
      background: #16a34a;
    }
    .spa-card {
      width: min(560px, 96vw);
      max-height: 86vh;
      overflow: auto;
      border-radius: 18px;
      background: #fff;
      box-shadow: 0 24px 80px -24px rgba(0, 0, 0, 0.35);
    }
    /* Brand utility fallback so custom brand shades render correctly in SPA mode. */
    .bg-brand-50 { background-color: #f0fdf4 !important; }
    .bg-brand-100 { background-color: #dcfce7 !important; }
    .bg-brand-200 { background-color: #bbf7d0 !important; }
    .bg-brand-300 { background-color: #86efac !important; }
    .bg-brand-400 { background-color: #4ade80 !important; }
    .bg-brand-500 { background-color: #22c55e !important; }
    .bg-brand-600 { background-color: #16a34a !important; }
    .bg-brand-700 { background-color: #15803d !important; }
    .bg-brand-800 { background-color: #166534 !important; }
    .bg-brand-900 { background-color: #14532d !important; }
    .text-brand-500 { color: #22c55e !important; }
    .text-brand-600 { color: #16a34a !important; }
    .text-brand-700 { color: #15803d !important; }
    .text-brand-900 { color: #14532d !important; }
    .border-brand-100 { border-color: #dcfce7 !important; }
    .border-brand-200 { border-color: #bbf7d0 !important; }
    .border-brand-300 { border-color: #86efac !important; }
    .border-brand-500 { border-color: #22c55e !important; }
    .border-brand-600 { border-color: #16a34a !important; }
    .hover\:bg-brand-700:hover { background-color: #15803d !important; }
    .hover\:bg-brand-600:hover { background-color: #16a34a !important; }
    .hover\:text-brand-700:hover { color: #15803d !important; }
    .hover\:text-brand-600:hover { color: #16a34a !important; }

    /* About page hero correction. */
    [data-tab-panel="about"] #brand-hero {
      background: #14532d !important;
    }
    [data-tab-panel="about"] #brand-hero > .absolute.inset-0 {
      opacity: 0.26 !important;
    }
    [data-tab-panel="about"] .bg-brand-50 {
      background-color: #ecfdf3 !important;
    }
    [data-tab-panel="about"] .text-brand-700 {
      color: #166534 !important;
    }

    /* Convert package drawer into centered popup card. */
    #drawerOverlay {
      display: none;
      opacity: 0;
      transition: opacity 200ms ease;
      z-index: 130 !important;
    }
    #drawerOverlay.active {
      display: block;
      opacity: 1;
    }
    #packageDetailsDrawer {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      right: auto !important;
      bottom: auto !important;
      width: min(760px, 94vw) !important;
      max-width: 96vw !important;
      height: auto !important;
      max-height: 82vh !important;
      border-radius: 20px !important;
      transform: translate(-50%, -50%) scale(0.96) !important;
      opacity: 0;
      pointer-events: none;
      overflow: auto !important;
      transition: transform 220ms ease, opacity 220ms ease;
      z-index: 131 !important;
    }
    #packageDetailsDrawer.active {
      transform: translate(-50%, -50%) scale(1) !important;
      opacity: 1;
      pointer-events: auto;
    }

    /* Keep all modal cards pinned at screen center regardless of page scroll. */
    #hotelDetailsModal,
    #fareRulesModal,
    #processingModal,
    #successModal,
    #failureModal {
      position: fixed !important;
      inset: 0 !important;
      z-index: 132 !important;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      overflow: auto;
      pointer-events: none;
    }
    #hotelDetailsModal.active,
    #fareRulesModal.active,
    #processingModal.active,
    #successModal.active,
    #failureModal.active {
      display: flex !important;
      pointer-events: auto;
    }
    #hotelDetailsModal > div,
    #fareRulesModal > div,
    #processingModal > div,
    #successModal > div,
    #failureModal > div {
      max-height: min(88vh, 900px);
      overflow: auto;
      margin: 0 !important;
      top: auto !important;
      left: auto !important;
      right: auto !important;
      bottom: auto !important;
      transform: none !important;
    }

    /* Login layout tuning in SPA context. */
    [data-tab-panel="login"] {
      padding: 0.75rem;
    }
    [data-tab-panel="login"] #auth-container {
      margin: 0.5rem auto;
      min-height: calc(100vh - 120px);
      height: auto !important;
      border-radius: 24px;
    }

    @media (max-width: 1024px) {
      #packageDetailsDrawer {
        width: min(680px, 95vw) !important;
        max-height: 80vh !important;
      }
      [data-tab-panel="login"] #auth-container {
        min-height: auto;
        border-radius: 16px;
      }
    }

    @media (max-width: 768px) {
      #header .spa-top {
        height: auto !important;
        min-height: 3.55rem;
        flex-wrap: wrap;
        row-gap: 0.25rem;
        padding-top: 0.4rem;
        padding-bottom: 0.4rem;
        padding-left: 0.7rem;
        padding-right: 0.7rem;
      }
      #header nav { display: none !important; }
      #mobileMenuButton {
        display: inline-flex !important;
        width: 2.15rem;
        height: 2.15rem;
        border-radius: 0.6rem;
      }
      #cartButton {
        width: 2.15rem;
        height: 2.15rem;
        padding: 0;
        border-radius: 0.6rem;
        justify-content: center;
      }
      #cartButton span#cartCount {
        position: absolute;
        top: -0.18rem;
        right: -0.2rem;
      }
      #cartButton .spa-cart-text {
        display: none !important;
      }
      #loginCta {
        height: 2.15rem;
        padding: 0 0.6rem;
        font-size: 0.72rem;
        border-radius: 0.6rem;
        gap: 0.35rem;
        white-space: nowrap;
      }
      #loginCta i { font-size: 0.72rem; }
      #header .spa-brand-text { font-size: 1.02rem; }

      [data-tab-panel="home"] #hero > div.relative.z-10.w-full {
        max-width: 100% !important;
        padding-left: 0.7rem !important;
        padding-right: 0.7rem !important;
      }
      .spa-nav-item.nav-item-active::after {
        bottom: -6px !important;
      }

      /* Keep the home booking box inside hero image on narrow viewports. */
      [data-tab-panel="home"] #hero {
        height: auto !important;
        min-height: 470px;
        overflow: visible !important;
      }
      [data-tab-panel="home"] #hero .w-full.bg-white {
        width: calc(100% - 0.35rem) !important;
        max-width: calc(100% - 0.35rem) !important;
        overflow: visible !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 14px !important;
        padding: 0.55rem !important;
        margin: 0 auto 0.75rem !important;
      }
      [data-tab-panel="home"] #hero .flex.items-center.gap-6.border-b {
        overflow-x: auto;
        white-space: nowrap;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.6rem;
        padding-bottom: 0.45rem;
        padding-top: 0.1rem;
        scrollbar-width: none;
      }
      [data-tab-panel="home"] #hero .flex.items-center.gap-6.border-b::-webkit-scrollbar {
        display: none;
      }
      [data-tab-panel="home"] #hero .flex.items-center.gap-6.border-b button {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.82rem;
        line-height: 1.15;
        padding-bottom: 0.35rem !important;
        margin-bottom: 0 !important;
      }
      [data-tab-panel="home"] #hero .flex.items-center.gap-6.border-b button i {
        font-size: 0.78rem;
      }
      [data-tab-panel="home"] #hero .space-y-6 > :not([hidden]) ~ :not([hidden]) {
        margin-top: 0.6rem !important;
      }
      [data-tab-panel="home"] #hero .grid.grid-cols-1.md\:grid-cols-4 > div {
        padding: 0.55rem !important;
      }
      [data-tab-panel="home"] #hero .flex.justify-center.mt-6 {
        margin-top: 0.5rem !important;
      }
      [data-tab-panel="home"] #hero .bg-brand-600.hover\:bg-brand-700 {
        font-size: 0.95rem !important;
        padding: 0.7rem 1rem !important;
      }
      [data-tab-panel="home"] #hero .grid.grid-cols-1.md\:grid-cols-4 {
        grid-template-columns: 1fr !important;
      }
      [data-tab-panel="login"] .grid,
      [data-tab-panel="login"] .flex {
        gap: 0.75rem !important;
      }
      [data-tab-panel="login"] input,
      [data-tab-panel="login"] button,
      [data-tab-panel="login"] select {
        min-height: 2.8rem;
      }
      .home-packages-track {
        grid-auto-columns: minmax(84%, 1fr);
      }
      .home-package-image {
        height: 160px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spa-swipe-forward,
      .spa-swipe-back,
      #packageDetailsDrawer,
      #drawerOverlay {
        animation: none !important;
        transition: none !important;
      }
    }

    @keyframes spaSwipeForward {
      from { transform: translateX(22px); opacity: 0.55; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes spaSwipeBack {
      from { transform: translateX(-22px); opacity: 0.55; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body class="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
  <header id="header" class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <div class="spa-top max-w-360 mx-auto px-6 h-20 flex items-center justify-between gap-3">
      <button data-tab-target="home" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
          <i class="fa-solid fa-plane"></i>
        </div>
        <span class="spa-brand-text text-xl font-bold tracking-tight text-gray-900">EduaiTrips</span>
      </button>
      <nav role="tablist" aria-label="Travel sections" class="flex items-center gap-7 h-full relative">
        ${nav}
      </nav>
      <div class="flex items-center gap-4">
        <button id="cartButton" class="hidden items-center gap-2 h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors text-sm">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="spa-cart-text">Cart</span>
          <span id="cartCount" class="spa-cart-badge">0</span>
        </button>
        <button id="loginCta" data-tab-target="login" class="flex items-center gap-2 h-10 px-5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors text-sm" type="button">
          <i class="fa-regular fa-user"></i> Login / Signup
        </button>
        <button id="mobileMenuButton" type="button" class="hidden h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700" aria-label="Open menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <div id="mobileMenu" class="spa-mobile-menu" aria-hidden="true">
    <aside class="spa-mobile-menu-panel">
      <div class="mb-4 flex items-center justify-between">
        <p class="text-sm font-semibold text-gray-900">Explore</p>
        <button id="mobileMenuClose" type="button" class="h-9 w-9 rounded-full border border-gray-200 text-gray-600" aria-label="Close menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="space-y-2">
        ${mobileNav}
      </div>
    </aside>
  </div>

  <main class="flex-1">${sections}</main>

  <div id="cartOverlay" class="spa-overlay">
    <div class="spa-card p-6">
      <div class="mb-4 flex items-center justify-between gap-3">
        <h3 class="text-2xl font-bold text-gray-900">Your Cart</h3>
        <button id="closeCartOverlay" class="h-9 w-9 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="cartItems" class="space-y-3"></div>
      <div class="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
        <p class="text-sm text-gray-500">Total</p>
        <p id="cartTotal" class="text-xl font-bold text-brand-600">Rs 0</p>
      </div>
      <button id="cartPayBtn" class="mt-4 w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
        Pay All
      </button>
    </div>
  </div>

  <script>
    const tabMap = {
      "home": "home",
      "flights": "flights",
      "hotels": "hotels",
      "packages": "packages",
      "dashboard": "dashboard",
      "about": "about",
      "t&c": "terms",
      "terms": "terms",
      "login": "login",
      "signup": "login"
    };

    const tabOrder = ["home", "flights", "hotels", "packages", "payment", "dashboard", "about", "terms", "login"];
    let currentTab = "home";
    const cartItems = [];
    let lastScrollY = window.scrollY;

    function updateTabA11y(tabId) {
      const navItems = document.querySelectorAll(".spa-nav-item");
      navItems.forEach((item) => {
        const isActive = item.getAttribute("data-tab-target") === tabId;
        item.setAttribute("aria-selected", isActive ? "true" : "false");
        item.setAttribute("tabindex", isActive ? "0" : "-1");
      });
    }

    function setActiveTab(tabId, keepScrollPosition = true) {
      const currentScrollY = window.scrollY;

      const panels = document.querySelectorAll("[data-tab-panel]");
      const currentIndex = tabOrder.indexOf(currentTab);
      const nextIndex = tabOrder.indexOf(tabId);
      const forward = nextIndex >= currentIndex;

      panels.forEach((panel) => {
        const isActive = panel.getAttribute("data-tab-panel") === tabId;
        panel.style.display = isActive ? "" : "none";
        panel.classList.remove("spa-swipe-forward", "spa-swipe-back");
        if (isActive) {
          panel.classList.add(forward ? "spa-swipe-forward" : "spa-swipe-back");
        }
      });

      const navItems = document.querySelectorAll(".spa-nav-item");
      navItems.forEach((item) => {
        item.classList.toggle("nav-item-active", item.getAttribute("data-tab-target") === tabId);
      });

      updateTabA11y(tabId);
      currentTab = tabId;
      updateBookingBarVisibility(true);
      if (keepScrollPosition) {
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "auto" }));
      }
    }

    function updateBookingBarVisibility(forceShow = false) {
      const activePanel = document.querySelector('[data-tab-panel="' + currentTab + '"]');
      const bookingBar = activePanel?.querySelector("#edit-search-bar");
      if (!(bookingBar instanceof HTMLElement)) {
        lastScrollY = window.scrollY;
        return;
      }

      bookingBar.classList.add("spa-booking-bar");
      const isFlightOrHotel = currentTab === "flights" || currentTab === "hotels";
      if (!isFlightOrHotel || forceShow) {
        bookingBar.classList.remove("spa-booking-hidden");
        lastScrollY = window.scrollY;
        return;
      }

      const y = window.scrollY;
      const scrollingDown = y > lastScrollY + 3;
      const scrollingUp = y < lastScrollY - 3;

      if (scrollingDown && y > 90) {
        bookingBar.classList.add("spa-booking-hidden");
      } else if (scrollingUp) {
        bookingBar.classList.remove("spa-booking-hidden");
      }

      lastScrollY = y;
    }

    function moveTabFocus(step) {
      const enabledTabs = Array.from(document.querySelectorAll(".spa-nav-item")).filter((item) => !item.classList.contains("hidden"));
      if (enabledTabs.length === 0) return;
      const activeIndex = Math.max(0, enabledTabs.findIndex((item) => item.getAttribute("data-tab-target") === currentTab));
      const nextIndex = (activeIndex + step + enabledTabs.length) % enabledTabs.length;
      const nextTab = enabledTabs[nextIndex];
      const tabId = nextTab.getAttribute("data-tab-target");
      if (!tabId) return;
      setActiveTab(tabId, false);
      nextTab.focus();
    }

    function parseRupee(value) {
      const n = Number(String(value || "").replace(/[^\d]/g, ""));
      return Number.isFinite(n) ? n : 0;
    }

    function formatRupee(value) {
      return "Rs " + value.toLocaleString("en-IN");
    }

    function updateCartUI() {
      const cartButton = document.getElementById("cartButton");
      const cartCount = document.getElementById("cartCount");
      const cartItemsHost = document.getElementById("cartItems");
      const cartTotal = document.getElementById("cartTotal");
      if (!cartButton || !cartCount || !cartItemsHost || !cartTotal) return;

      if (cartItems.length > 0) {
        cartButton.classList.remove("hidden");
        cartButton.classList.add("inline-flex");
      } else {
        cartButton.classList.add("hidden");
        cartButton.classList.remove("inline-flex");
      }

      cartCount.textContent = String(cartItems.length);
      cartItemsHost.innerHTML = "";

      let total = 0;
      cartItems.forEach((item, index) => {
        total += item.total;
        const row = document.createElement("div");
        row.className = "rounded-xl border border-gray-200 p-3";
        row.innerHTML =
          '<div class="flex items-center justify-between gap-3">' +
            '<div>' +
              '<p class="text-sm font-semibold text-gray-900">' + item.title + '</p>' +
              '<p class="text-xs text-gray-500">Qty ' + item.qty + ' • ' + item.type + '</p>' +
            '</div>' +
            '<div class="text-right">' +
              '<p class="text-sm font-bold text-brand-600">' + formatRupee(item.total) + '</p>' +
              '<button data-remove-cart="' + index + '" class="mt-1 text-xs text-red-500 hover:text-red-600">Remove</button>' +
            '</div>' +
          '</div>';
        cartItemsHost.appendChild(row);
      });

      cartTotal.textContent = formatRupee(total);
    }

    function openOverlay(id) {
      pinOverlayToBody(id);
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add("active");
      syncBodyScrollLock();
    }

    function closeOverlay(id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove("active");
      syncBodyScrollLock();
    }

    function injectBookingButtons() {
      // Flights already include a native "Book Now" CTA under price; do not inject extra buttons there.
      document.querySelectorAll('[data-tab-panel="flights"] button').forEach((btn) => {
        const text = (btn.textContent || "").toLowerCase().trim();
        if (text === "book now") {
          btn.setAttribute("data-open-booking", "true");
          btn.setAttribute("data-booking-type", "flight");
        }
      });

      // Packages and hotels: only decorate existing action buttons instead of adding new duplicates.
      document
        .querySelectorAll('[data-tab-panel="packages"] button, [data-tab-panel="hotels"] button')
        .forEach((btn) => {
          const text = (btn.textContent || "").toLowerCase().trim();
          const isPrimaryAction = text.includes("book");

          if (!isPrimaryAction) {
            return;
          }

          if (!btn.hasAttribute("data-open-booking")) {
            const tabId = btn.closest("[data-tab-panel]")?.getAttribute("data-tab-panel") || "general";
            btn.setAttribute("data-open-booking", "true");
            btn.setAttribute("data-booking-type", tabId);
          }
        });

      document.querySelectorAll('[data-tab-panel] button:not([type])').forEach((btn) => {
        btn.setAttribute("type", "button");
      });
    }

    function openById(id) {
      pinOverlayToBody(id);
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add("active");
      if (el.classList.contains("hidden")) {
        el.classList.remove("hidden");
      }
      if (!el.classList.contains("flex") && el.id.toLowerCase().includes("modal")) {
        el.classList.add("flex");
      }

      if (id === "packageDetailsDrawer") {
        recenterPackagePopup();
      }
      if (id === "hotelDetailsModal") {
        recenterModalContent("hotelDetailsModal");
      }
      syncBodyScrollLock();
    }

    function closeById(id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove("active");
      if (el.id === "fareRulesModal") {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
      syncBodyScrollLock();
    }

    function syncBodyScrollLock() {
      // Keep background scrollable as requested by user.
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    function pinOverlayToBody(id) {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.parentElement !== document.body) {
        document.body.appendChild(el);
      }
    }

    function recenterPackagePopup() {
      const drawer = document.getElementById("packageDetailsDrawer");
      if (!drawer || !drawer.classList.contains("active")) return;

      drawer.style.position = "fixed";
      drawer.style.top = "50%";
      drawer.style.left = "50%";
      drawer.style.right = "auto";
      drawer.style.bottom = "auto";
      drawer.style.transform = "translate(-50%, -50%) scale(1)";
      // Reset internal scroll each open so header/top area is immediately visible.
      drawer.scrollTop = 0;
    }

    function recenterModalContent(id) {
      const modal = document.getElementById(id);
      if (!modal || !modal.classList.contains("active")) return;
      const card = modal.firstElementChild;
      if (!(card instanceof HTMLElement)) return;
      card.scrollTop = 0;
      card.style.margin = "0";
      card.style.transform = "none";
      card.style.top = "auto";
      card.style.left = "auto";
    }

    function wireHomeWidgetTabs() {
      const homePanel = document.querySelector('[data-tab-panel="home"]');
      if (!homePanel) return;

      const buttons = Array.from(homePanel.querySelectorAll('#hero .flex.items-center.gap-6.border-b button'));
      if (buttons.length === 0) return;

      const mapping = {
        flights: "flights",
        hotels: "hotels",
        packages: "packages",
        visa: "terms",
      };

      const activateLocal = (activeBtn) => {
        buttons.forEach((btn) => {
          btn.classList.remove("text-brand-600", "font-semibold", "border-b-2", "border-brand-600");
          btn.classList.add("text-gray-500", "font-medium");
        });
        activeBtn.classList.remove("text-gray-500", "font-medium");
        activeBtn.classList.add("text-brand-600", "font-semibold", "border-b-2", "border-brand-600");
      };

      buttons.forEach((btn, index) => {
        btn.setAttribute("type", "button");
        if (index === 0) {
          activateLocal(btn);
        }

        btn.addEventListener("click", (event) => {
          event.preventDefault();
          activateLocal(btn);

          const label = (btn.textContent || "").toLowerCase().trim();
          const key = Object.keys(mapping).find((k) => label.includes(k));
          if (!key) return;
          setActiveTab(mapping[key]);
        });
      });
    }

    function wireHomePackagesCarousel() {
      const track = document.getElementById("homePackagesTrack");
      const dotsHost = document.getElementById("homePackagesDots");
      if (!(track instanceof HTMLElement)) return;

      const cards = Array.from(track.querySelectorAll(".home-package-card"));
      if (cards.length === 0) return;

      let activeIndex = 0;
      let autoTimer;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (dotsHost) {
        dotsHost.innerHTML = cards
          .map((_, index) => {
            const activeClass = index === 0 ? " active" : "";
            return '<button type="button" class="home-carousel-dot' + activeClass + '" data-carousel-dot="' + index + '" aria-label="Go to package ' + (index + 1) + '"></button>';
          })
          .join("");
      }

      const setActiveDot = (index) => {
        dotsHost?.querySelectorAll(".home-carousel-dot").forEach((dot, dotIndex) => {
          dot.classList.toggle("active", dotIndex === index);
        });
      };

      const scrollToIndex = (index, behavior = "smooth") => {
        const normalized = ((index % cards.length) + cards.length) % cards.length;
        const wrappedForward = index >= cards.length;
        const wrappedBackward = index < 0;

        if (wrappedForward || wrappedBackward) {
          const jumpCard = cards[normalized];
          if (!(jumpCard instanceof HTMLElement)) return;
          activeIndex = normalized;
          track.scrollTo({ left: jumpCard.offsetLeft, behavior: "auto" });
          setActiveDot(activeIndex);
          return;
        }

        const bounded = ((index % cards.length) + cards.length) % cards.length;
        const nextCard = cards[bounded];
        if (!(nextCard instanceof HTMLElement)) return;
        activeIndex = bounded;
        track.scrollTo({ left: nextCard.offsetLeft, behavior });
        setActiveDot(activeIndex);
      };

      const scrollByCard = (direction) => {
        scrollToIndex(activeIndex + direction, "smooth");
      };

      const updateActiveFromScroll = () => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let bestIndex = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        cards.forEach((card, index) => {
          if (!(card instanceof HTMLElement)) return;
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(center - cardCenter);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
          }
        });
        if (bestIndex !== activeIndex) {
          activeIndex = bestIndex;
          setActiveDot(activeIndex);
        }
      };

      const stopAuto = () => {
        if (autoTimer) {
          window.clearInterval(autoTimer);
          autoTimer = undefined;
        }
      };

      const startAuto = () => {
        if (reducedMotion) return;
        stopAuto();
        autoTimer = window.setInterval(() => {
          scrollToIndex(activeIndex + 1, "smooth");
        }, 3200);
      };

      dotsHost?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const dot = target.closest("[data-carousel-dot]");
        if (!(dot instanceof HTMLElement)) return;
        const index = Number(dot.getAttribute("data-carousel-dot"));
        if (!Number.isFinite(index)) return;
        scrollToIndex(index, "smooth");
      });

      track.addEventListener("scroll", updateActiveFromScroll, { passive: true });
      track.addEventListener("pointerenter", stopAuto);
      track.addEventListener("pointerleave", startAuto);
      track.addEventListener("focusin", stopAuto);
      track.addEventListener("focusout", startAuto);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopAuto();
        } else {
          startAuto();
        }
      });

      startAuto();
    }

    function getMappedTabFromText(text) {
      const key = (text || "").toLowerCase().trim();
      if (!key) return null;
      if (tabMap[key]) return tabMap[key];
      return null;
    }

    function getActionFromText(text) {
      const t = (text || "").toLowerCase().trim();
      if (!t) return null;

      if (t.includes("explore packages") || t.includes("view packages") || t.includes("load more packages")) {
        return { kind: "tab", tabId: "packages" };
      }

      if (t.includes("continue to payment")) {
        return { kind: "pay" };
      }

      if (t.includes("search flights") || t.includes("edit search")) {
        return { kind: "tab", tabId: "flights" };
      }

      if (t.includes("go to dashboard") || t.includes("customer dashboard")) {
        return { kind: "tab", tabId: "dashboard" };
      }

      if (t.includes("back to home")) {
        return { kind: "tab", tabId: "home" };
      }

      if (t.includes("terms") || t.includes("t&c")) {
        return { kind: "tab", tabId: "terms" };
      }

      if (t.includes("login") || t.includes("signup")) {
        return { kind: "tab", tabId: "login" };
      }

      if (t.startsWith("pay ") || t.includes("retry payment")) {
        return { kind: "pay" };
      }

      if (t.includes("fare rules")) {
        return { kind: "open", id: "fareRulesModal" };
      }

      if (t.includes("close") || t === "x") {
        return { kind: "closeAll" };
      }

      return null;
    }

    function closeAllOverlays() {
      ["drawerOverlay", "packageDetailsDrawer", "fareRulesModal", "hotelDetailsModal", "processingModal", "successModal", "failureModal"].forEach(closeById);
      closeOverlay("cartOverlay");
    }

    window.showProcessingModal = function showProcessingModal() {
      openById("processingModal");

      setTimeout(() => {
        closeById("processingModal");
        if (Math.random() > 0.3) {
          openById("successModal");
        } else {
          openById("failureModal");
        }
      }, 1400);
    };

    window.closeModals = function closeModals() {
      closeById("processingModal");
      closeById("successModal");
      closeById("failureModal");
    };

    updateTabA11y("home");
    updateCartUI();
    updateBookingBarVisibility(true);

    const cartButton = document.getElementById("cartButton");
    const closeCartOverlay = document.getElementById("closeCartOverlay");
    const cartPayBtn = document.getElementById("cartPayBtn");
    const loginCta = document.getElementById("loginCta");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenuClose = document.getElementById("mobileMenuClose");

    cartButton?.addEventListener("click", () => openOverlay("cartOverlay"));
    closeCartOverlay?.addEventListener("click", () => closeOverlay("cartOverlay"));

    loginCta?.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveTab("login");
      mobileMenu?.classList.remove("active");
    });

    mobileMenuButton?.addEventListener("click", () => {
      mobileMenu?.classList.add("active");
    });

    mobileMenuClose?.addEventListener("click", () => {
      mobileMenu?.classList.remove("active");
    });

    mobileMenu?.addEventListener("click", (event) => {
      if (event.target === mobileMenu) {
        mobileMenu.classList.remove("active");
      }
    });

    cartPayBtn?.addEventListener("click", () => {
      closeOverlay("cartOverlay");
      setActiveTab("payment", false);
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    });

    // Ensure these popups are always outside tab panels/layout contexts.
    [
      "drawerOverlay",
      "packageDetailsDrawer",
      "hotelDetailsModal",
      "fareRulesModal",
      "processingModal",
      "successModal",
      "failureModal",
      "cartOverlay",
    ].forEach(pinOverlayToBody);

    // Keep centered in viewport even if user scrolls/resizes while open.
    const recenterAll = () => {
      recenterPackagePopup();
      recenterModalContent("hotelDetailsModal");
      recenterModalContent("fareRulesModal");
      recenterModalContent("processingModal");
      recenterModalContent("successModal");
      recenterModalContent("failureModal");
    };
    window.addEventListener("resize", recenterAll, { passive: true });
    window.addEventListener("scroll", () => {
      recenterAll();
      updateBookingBarVisibility();
    }, { passive: true });

    const observeIds = ["packageDetailsDrawer", "hotelDetailsModal"];
    observeIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new MutationObserver(() => {
        requestAnimationFrame(recenterAll);
      });
      observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    });

    injectBookingButtons();
    wireHomeWidgetTabs();
    wireHomePackagesCarousel();

    document.querySelector('nav[role="tablist"]')?.addEventListener("keydown", (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveTabFocus(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveTabFocus(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        const enabledTabs = Array.from(document.querySelectorAll(".spa-nav-item")).filter((item) => !item.classList.contains("hidden"));
        enabledTabs[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      } else if (event.key === "End") {
        event.preventDefault();
        const enabledTabs = Array.from(document.querySelectorAll(".spa-nav-item")).filter((item) => !item.classList.contains("hidden"));
        enabledTabs[enabledTabs.length - 1]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.matches("#cartOverlay")) {
        closeOverlay(target.id);
        return;
      }

      const explicit = target.closest("[data-tab-target]");
      if (explicit) {
        event.preventDefault();
        const tabId = explicit.getAttribute("data-tab-target");
        if (tabId) {
          setActiveTab(tabId);
          mobileMenu?.classList.remove("active");
        }
        return;
      }

      const clickable = target.closest("a,button");
      if (!clickable) return;

      const removeIndex = clickable.getAttribute("data-remove-cart");
      if (removeIndex !== null) {
        event.preventDefault();
        cartItems.splice(Number(removeIndex), 1);
        updateCartUI();
        return;
      }

      const href = clickable.getAttribute("href");
      if (href === "#" || href === "" || href?.startsWith("#") || href?.toLowerCase().startsWith("javascript:")) {
        event.preventDefault();
      }

      const inlineClick = clickable.getAttribute("onclick") || "";
      let handledInlineOverlay = false;
      if (inlineClick.includes("drawerOverlay") || inlineClick.includes("packageDetailsDrawer")) {
        event.preventDefault();
        if (inlineClick.includes("classList.add")) {
          openById("drawerOverlay");
          openById("packageDetailsDrawer");
          handledInlineOverlay = true;
        }
        if (inlineClick.includes("classList.remove")) {
          closeById("drawerOverlay");
          closeById("packageDetailsDrawer");
          handledInlineOverlay = true;
        }
      }

      if (inlineClick.includes("fareRulesModal")) {
        event.preventDefault();
        if (inlineClick.includes("classList.add")) {
          openById("fareRulesModal");
          handledInlineOverlay = true;
        }
        if (inlineClick.includes("classList.remove")) {
          closeById("fareRulesModal");
          handledInlineOverlay = true;
        }
      }

      if (inlineClick.includes("hotelDetailsModal")) {
        event.preventDefault();
        if (inlineClick.includes("classList.add")) {
          openById("hotelDetailsModal");
          handledInlineOverlay = true;
        }
        if (inlineClick.includes("classList.remove")) {
          closeById("hotelDetailsModal");
          handledInlineOverlay = true;
        }
      }

      if (handledInlineOverlay) {
        return;
      }

      const clickableText = (clickable.textContent || "").toLowerCase().trim();
      if (clickable.closest("#packageDetailsDrawer") && (clickableText.includes("proceed to book") || clickableText === "book now")) {
        event.preventDefault();
        const drawer = document.getElementById("packageDetailsDrawer");
        const titleEl = drawer?.querySelector("h2, h3, h4");
        const textContent = drawer?.textContent || "";
        const matchedPrice = textContent.match(/₹\s*[\d,]+/);
        const title = (titleEl?.textContent || "Package Booking").trim();
        const price = (matchedPrice?.[0] || "Rs 145000").trim();

        cartItems.push({
          title,
          type: "package",
          qty: 1,
          total: Math.max(1, parseRupee(price)),
        });
        updateCartUI();

        const previous = clickable.textContent;
        clickable.textContent = "Added to Cart";
        setTimeout(() => {
          clickable.textContent = previous;
        }, 900);

        closeById("packageDetailsDrawer");
        closeById("drawerOverlay");
        return;
      }

      if (clickable.hasAttribute("data-open-booking")) {
        event.preventDefault();
        const type = clickable.getAttribute("data-booking-type") || currentTab;
        const card = clickable.closest(".bg-white, .card-shadow") || clickable.parentElement;
        const titleEl = card?.querySelector("h3, h4");
        const priceEl = card?.querySelector(".text-brand-600, .text-2xl, .text-xl");
        const title = (titleEl?.textContent || (type + " booking")).trim();
        const price = (priceEl?.textContent || "Rs 5,150").trim();
        cartItems.push({
          title,
          type,
          qty: 1,
          total: Math.max(1, parseRupee(price)),
        });
        updateCartUI();

        // Visual acknowledgement without opening a quick-booking modal.
        const previous = clickable.textContent;
        clickable.textContent = "Added";
        setTimeout(() => {
          clickable.textContent = previous;
        }, 700);
        return;
      }

      const text = clickable.textContent || "";
      const action = getActionFromText(text);

      if (action) {
        event.preventDefault();
        if (action.kind === "tab") {
          setActiveTab(action.tabId);
          closeAllOverlays();
          return;
        }

        if (action.kind === "pay") {
          if (currentTab !== "payment") {
            setActiveTab("payment", false);
            requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
          } else {
            window.showProcessingModal();
          }
          return;
        }

        if (action.kind === "open") {
          openById(action.id);
          return;
        }

        if (action.kind === "closeAll") {
          closeAllOverlays();
          return;
        }
      }

      if (clickable.closest("#header") || clickable.closest("#footer")) {
        const mapped = getMappedTabFromText(text);
        if (mapped) {
          event.preventDefault();
          setActiveTab(mapped);
        }
      }
    });
  </script>
</body>
</html>`;
}

export async function GET() {
  try {
    const resourcesDir = join(process.cwd(), "resources");
    const entries = await Promise.all(
      Object.entries(resourceFiles).map(async ([tab, fileName]) => {
        const html = await readFile(join(resourcesDir, fileName), "utf8");
        return [tab as TabId, html] as const;
      }),
    );

    const source = Object.fromEntries(entries) as Record<TabId, string>;
    const headBits = extractHeadBitsAll(source);

    const tabMarkup = Object.fromEntries(
      Object.entries(source).map(([tab, html]) => {
        const body = extractBody(html);
        let content = stripHeaderAndScripts(body);
        if (tab === "home") {
          content = injectHomePackagesCarousel(content);
        }
        return [tab, content];
      }),
    ) as Record<TabId, string>;

    const spa = buildSpaHtml(tabMarkup, headBits.styles, headBits.links);

    return new NextResponse(spa, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Unable to build SPA mock", { status: 500 });
  }
}
