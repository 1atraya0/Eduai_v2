import { NextRequest, NextResponse } from "next/server";

type FlightSegment = {
  departure_airport?: { name?: string; id?: string; time?: string };
  arrival_airport?: { name?: string; id?: string; time?: string };
  duration?: number;
  airplane?: string;
  airline?: string;
  airline_logo?: string;
  travel_class?: string;
  flight_number?: string;
  ticket_also_sold_by?: string[];
  legroom?: string;
  extensions?: string[];
  overnight?: boolean;
  often_delayed_by_over_30_min?: boolean;
};

type FlightOption = {
  flights?: FlightSegment[];
  layovers?: Array<{ duration?: number; name?: string; id?: string; overnight?: boolean }>;
  total_duration?: number;
  carbon_emissions?: { this_flight?: number; typical_for_this_route?: number; difference_percent?: number };
  price?: number;
  type?: string;
  airline_logo?: string;
  extensions?: string[];
  departure_token?: string;
  booking_token?: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDuration(minutes: number | undefined) {
  const totalMinutes = Number(minutes ?? 0);
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return "--";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

function formatTime(value: string | undefined) {
  if (!value) return "--:--";
  const [datePart, timePart] = value.split(" ");
  if (!timePart) return escapeHtml(value);
  const [hoursRaw, minutesRaw] = timePart.slice(0, 5).split(":");
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return escapeHtml(value);
  const period = hours >= 12 ? "PM" : "AM";
  const normalizedHours = ((hours + 11) % 12) + 1;
  return `${normalizedHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

function normalizeAirportId(value: string | null | undefined, fallback: string) {
  const raw = String(value ?? "").trim().toUpperCase();
  if (!raw) return fallback;

  const codeMatch = raw.match(/\(([A-Z]{3})\)/);
  if (codeMatch?.[1]) return codeMatch[1];

  const exactCode = raw.match(/^([A-Z]{3})$/);
  if (exactCode?.[1]) return exactCode[1];

  const bracketMatch = raw.match(/\[([A-Z]{3})\]/);
  if (bracketMatch?.[1]) return bracketMatch[1];

  const trailingCode = raw.match(/(?:^|\s)([A-Z]{3})$/);
  if (trailingCode?.[1]) return trailingCode[1];

  return fallback;
}

function normalizeOption(option: FlightOption) {
  const segments = Array.isArray(option.flights) ? option.flights : [];
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  const layovers = Array.isArray(option.layovers) ? option.layovers : [];

  return {
    airline: firstSegment?.airline || lastSegment?.airline || "Flight",
    airlineLogo: option.airline_logo || firstSegment?.airline_logo || lastSegment?.airline_logo || "",
    price: typeof option.price === "number" ? option.price : null,
    totalDuration: option.total_duration ?? segments.reduce((sum, segment) => sum + Number(segment.duration || 0), 0),
    type: option.type || "One way",
    layovers,
    segments,
    extensions: Array.isArray(option.extensions) ? option.extensions : [],
    bookingToken: option.booking_token || "",
    firstSegment,
    lastSegment,
  };
}

function renderOptionCard(option: FlightOption, index: number) {
  const summary = normalizeOption(option);
  const departureAirport = summary.firstSegment?.departure_airport || {};
  const arrivalAirport = summary.lastSegment?.arrival_airport || {};
  const segmentsMarkup = summary.segments
    .map((segment) => {
      const departure = segment.departure_airport || {};
      const arrival = segment.arrival_airport || {};
      const notes = [];
      if (segment.overnight) notes.push("Overnight");
      if (segment.often_delayed_by_over_30_min) notes.push("Often delayed by 30+ min");
      return `
        <div class="rounded-xl border border-gray-100 bg-gray-50 p-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-gray-900">${escapeHtml(segment.airline || summary.airline)} ${escapeHtml(segment.flight_number || "")}</p>
              <p class="text-xs text-gray-500">${escapeHtml(departure.id || "")} → ${escapeHtml(arrival.id || "")} • ${escapeHtml(segment.travel_class || "Economy")}</p>
            </div>
            <div class="text-right text-sm text-gray-600">
              <p>${formatTime(departure.time)} - ${formatTime(arrival.time)}</p>
              <p class="text-xs text-gray-400">${formatDuration(segment.duration)}</p>
            </div>
          </div>
          ${notes.length ? `<p class="mt-2 text-xs text-brand-700">${notes.map(escapeHtml).join(" • ")}</p>` : ""}
          ${Array.isArray(segment.extensions) && segment.extensions.length ? `<p class="mt-2 text-xs leading-relaxed text-gray-500">${segment.extensions.slice(0, 3).map(escapeHtml).join(" • ")}</p>` : ""}
        </div>
      `;
    })
    .join("");

  const layoversMarkup = summary.layovers.length
    ? `<div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">${summary.layovers
        .map((layover) => `<span class="rounded-full bg-gray-100 px-3 py-1">${escapeHtml(formatDuration(layover.duration))} layover • ${escapeHtml(layover.name || layover.id || "Layover")}${layover.overnight ? " • Overnight" : ""}</span>`)
        .join("")}</div>`
    : "";

  const extensionsMarkup = summary.extensions.length
    ? `<div class="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">${summary.extensions
        .slice(0, 4)
        .map((extension) => `<span class="rounded-full border border-gray-200 bg-white px-3 py-1">${escapeHtml(extension)}</span>`)
        .join("")}</div>`
    : "";

  return `
    <article class="bg-white rounded-2xl border border-gray-200 flight-card-shadow overflow-hidden hover:border-brand-300 transition-colors">
      <div class="p-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4 w-full md:w-1/4">
            <div class="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              ${summary.airlineLogo ? `<img src="${escapeHtml(summary.airlineLogo)}" alt="${escapeHtml(summary.airline)} logo" class="h-8 w-8 object-contain">` : `<span class="font-bold text-gray-700 text-sm">${escapeHtml((summary.airline || "F").slice(0, 2))}</span>`}
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 text-sm">${escapeHtml(summary.airline)}</h4>
              <p class="text-xs text-gray-500">${escapeHtml(summary.firstSegment?.flight_number || "")}${summary.type ? ` | ${escapeHtml(summary.type)}` : ""}</p>
            </div>
          </div>

          <div class="flex items-center justify-between w-full md:w-2/4 px-4 gap-4">
            <div class="text-right min-w-21">
              <p class="text-xl font-bold text-gray-900">${formatTime(departureAirport.time)}</p>
              <p class="text-xs text-gray-500">${escapeHtml(departureAirport.id || departureAirport.name || "")}</p>
            </div>

            <div class="flex flex-col items-center flex-1 px-2">
              <span class="text-xs font-medium text-gray-500 mb-1">${formatDuration(summary.totalDuration)}</span>
              <div class="w-full relative flex items-center justify-center">
                <div class="w-full h-0.5 dashed-line"></div>
                <div class="absolute w-6 h-6 bg-white border-2 border-brand-100 rounded-full flex items-center justify-center text-brand-500 text-[10px]">
                  <i class="fa-solid fa-plane"></i>
                </div>
              </div>
              <span class="text-[10px] text-gray-400 mt-1">${summary.layovers.length ? `${summary.layovers.length} stop(s)` : "Non-stop"}</span>
            </div>

            <div class="text-left min-w-21">
              <p class="text-xl font-bold text-gray-900">${formatTime(arrivalAirport.time)}</p>
              <p class="text-xs text-gray-500">${escapeHtml(arrivalAirport.id || arrivalAirport.name || "")}</p>
            </div>
          </div>

          <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-1/4 gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <div class="text-left md:text-right">
              <p class="text-2xl font-bold text-brand-600">${summary.price != null ? `₹${summary.price.toLocaleString("en-IN")}` : "Price on request"}</p>
              <p class="text-xs text-gray-500">per adult</p>
            </div>
            <button class="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm text-sm whitespace-nowrap" data-book-flight="${escapeHtml(summary.bookingToken)}">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 border-t border-gray-100 px-6 py-3">
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-xs font-medium text-brand-600 flex items-center gap-1 bg-brand-50 px-2 py-1 rounded-md">
            <i class="fa-solid fa-star"></i> Result ${index + 1}
          </span>
          ${summary.type ? `<span class="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">${escapeHtml(summary.type)}</span>` : ""}
          ${summary.layovers.length ? `<span class="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">${summary.layovers.length} layover(s)</span>` : ""}
          ${summary.price != null ? `<span class="text-xs font-medium text-green-600 flex items-center gap-1 ml-auto bg-green-50 px-2 py-1 rounded-md"><i class="fa-solid fa-check-circle"></i> Live fare</span>` : ""}
        </div>
        ${layoversMarkup}
        ${segmentsMarkup}
        ${extensionsMarkup}
      </div>
    </article>
  `;
}

function renderFlightsFragment(bestFlights: FlightOption[], otherFlights: FlightOption[]) {
  const allFlights = [...bestFlights, ...otherFlights];
  const totalFlights = allFlights.length;
  const cheapest = allFlights.reduce<number | null>((lowest, option) => {
    if (typeof option.price !== "number") return lowest;
    return lowest == null ? option.price : Math.min(lowest, option.price);
  }, null);

  const cards = totalFlights > 0
    ? allFlights.map((option, index) => renderOptionCard(option, index)).join("")
    : '<div class="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-sm text-gray-500">No flights were returned for this search.</div>';

  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-2 flex items-center justify-between flight-card-shadow mb-6">
      <div class="flex items-center gap-1 overflow-x-auto">
        <button class="px-4 py-2 text-sm font-medium text-brand-700 bg-brand-50 rounded-xl whitespace-nowrap">
          Cheapest <span class="text-xs text-brand-600 ml-1">${cheapest != null ? `₹${cheapest.toLocaleString("en-IN")}` : "--"}</span>
        </button>
        <button class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl whitespace-nowrap transition-colors">
          Fastest <span class="text-xs text-gray-400 ml-1">Live</span>
        </button>
        <button class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl whitespace-nowrap transition-colors">
          Earliest <span class="text-xs text-gray-400 ml-1">Live</span>
        </button>
      </div>
      <div class="hidden md:flex items-center gap-2 px-4 text-sm text-gray-500 border-l border-gray-200">
        <span>${totalFlights} Flights available</span>
      </div>
    </div>
    ${cards}
  `;
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "SERPAPI_API_KEY is not configured.",
        html: '<div class="rounded-2xl border border-dashed border-red-200 bg-red-50 p-6 text-sm text-red-700">Set SERPAPI_API_KEY in your environment to load live flights.</div>',
        count: 0,
        countLabel: "Search unavailable",
      },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const departureId = normalizeAirportId(searchParams.get("departure_id"), "DEL");
  const arrivalId = normalizeAirportId(searchParams.get("arrival_id"), "BOM");
  const outboundDate = searchParams.get("outbound_date")?.trim() || "2026-04-30";
  const currency = searchParams.get("currency")?.trim().toUpperCase() || "INR";

  const query = new URLSearchParams({
    engine: "google_flights",
    departure_id: departureId,
    arrival_id: arrivalId,
    currency,
    type: "2",
    outbound_date: outboundDate,
    hl: "en",
    gl: "in",
    api_key: apiKey,
  });

  try {
    const response = await fetch(`https://serpapi.com/search?${query.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`SerpApi request failed with status ${response.status}`);
    }

    const json = (await response.json()) as {
      best_flights?: FlightOption[];
      other_flights?: FlightOption[];
    };

    const bestFlights = Array.isArray(json.best_flights) ? json.best_flights : [];
    const otherFlights = Array.isArray(json.other_flights) ? json.other_flights : [];
    const html = renderFlightsFragment(bestFlights, otherFlights);
    const count = bestFlights.length + otherFlights.length;

    return NextResponse.json({
      html,
      count,
      countLabel: `${count} flights available`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load flights";
    return NextResponse.json(
      {
        error: message,
        html: '<div class="rounded-2xl border border-dashed border-red-200 bg-red-50 p-6 text-sm text-red-700">Unable to load live flights right now.</div>',
        count: 0,
        countLabel: "Search unavailable",
      },
      { status: 500 },
    );
  }
}
