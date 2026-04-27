import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";

type LoginPanelProps = {
  otpMode: boolean;
  onRequestOtp: () => void;
  onBackToMobile: () => void;
};

export function LoginPanel({ otpMode, onRequestOtp, onBackToMobile }: LoginPanelProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]" aria-label="Login tab content">
      <Card className="bg-[radial-gradient(circle_at_10%_20%,rgba(236,244,229,0.95),rgba(220,237,206,0.8)_55%,rgba(199,224,178,0.9)_100%)]">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--ink-700)]">Eduai Trips</p>
        <h2 className="mb-3 font-display text-3xl text-[var(--ink-900)]">Your gateway to seamless journeys</h2>
        <p className="max-w-prose text-sm text-[var(--ink-700)]">
          Flights, hotels, packages, and visa support in one place. Log in with your mobile number to continue.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Card className="p-3">
            <p className="text-xs text-[var(--ink-600)]">Flights Booked</p>
            <p className="text-xl font-bold text-[var(--ink-900)]">24k+</p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-[var(--ink-600)]">Happy Travelers</p>
            <p className="text-xl font-bold text-[var(--ink-900)]">2k+</p>
          </Card>
          <Card className="p-3">
            <p className="text-xs text-[var(--ink-600)]">Support</p>
            <p className="text-xl font-bold text-[var(--ink-900)]">24/7</p>
          </Card>
        </div>
      </Card>

      <Card>
        <h3 className="mb-2 font-display text-2xl text-[var(--ink-900)]">Welcome Back</h3>
        <p className="mb-6 text-sm text-[var(--ink-600)]">Login with mobile OTP to continue.</p>

        {!otpMode ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              onRequestOtp();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-[130px_1fr]">
              <InputField id="country-code" label="Code" defaultValue="+91" aria-label="Country code" />
              <InputField
                id="mobile-number"
                label="Mobile Number"
                placeholder="Enter 10-digit number"
                inputMode="numeric"
                pattern="[0-9]{10}"
                required
              />
            </div>
            <label className="flex items-start gap-2 text-sm text-[var(--ink-700)]">
              <input type="checkbox" className="mt-1 h-4 w-4" defaultChecked />
              Send me booking updates and offers via SMS and WhatsApp.
            </label>
            <Button type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="rounded-xl bg-[var(--sand-100)] p-3 text-sm text-[var(--ink-700)]">
              OTP sent to +91 98765 43210
            </p>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-12 rounded-xl border border-[var(--sand-300)] text-center text-lg focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]"
                  maxLength={1}
                />
              ))}
            </div>
            <Button className="w-full">Verify & Continue</Button>
            <Button variant="ghost" className="w-full" onClick={onBackToMobile}>
              Change number
            </Button>
          </div>
        )}
      </Card>
    </section>
  );
}

export function HomePanel() {
  return (
    <section className="space-y-6" aria-label="Home tab content">
      <Card className="overflow-hidden p-0">
        <div className="relative bg-[linear-gradient(130deg,#0f3d20_0%,#2a6434_35%,#f1dcc7_100%)] px-6 py-12 text-white sm:px-10">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/85">Discover Incredible India</p>
          <h2 className="max-w-2xl font-display text-4xl leading-tight">Book flights, hotels, and curated packages in one destination-first journey.</h2>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-4">
          <InputField id="from-city" label="From" defaultValue="New Delhi" />
          <InputField id="to-city" label="To" defaultValue="Mumbai" />
          <InputField id="depart" label="Departure" defaultValue="24 Oct 2026" />
          <div className="flex items-end">
            <Button className="w-full">Search Flights</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Best Prices", "Exclusive domestic and international rates"],
          ["24/7 Support", "Expert help at every stage of travel"],
          ["Secure Payments", "Trusted transactions with strong protection"],
        ].map(([title, copy]) => (
          <Card key={title}>
            <h3 className="mb-1 text-lg font-bold text-[var(--ink-900)]">{title}</h3>
            <p className="text-sm text-[var(--ink-600)]">{copy}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

type FlightsPanelProps = {
  onOpenFareRules: () => void;
};

export function FlightsPanel({ onOpenFareRules }: FlightsPanelProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[280px_1fr]" aria-label="Flights tab content">
      <Card className="h-fit">
        <h3 className="mb-3 text-lg font-bold">Filters</h3>
        <div className="space-y-4 text-sm">
          <fieldset>
            <legend className="mb-2 font-semibold text-[var(--ink-800)]">Stops</legend>
            <label className="mb-2 flex items-center justify-between">
              <span>Non-stop</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="mb-2 flex items-center justify-between">
              <span>1 Stop</span>
              <input type="checkbox" />
            </label>
          </fieldset>
          <fieldset>
            <legend className="mb-2 font-semibold text-[var(--ink-800)]">Departure Window</legend>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm">
                Morning
              </Button>
              <Button variant="outline" size="sm">
                Evening
              </Button>
            </div>
          </fieldset>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-500)]">DEL to BOM</p>
              <h3 className="text-xl font-bold text-[var(--ink-900)]">IndiGo 6E-234</h3>
              <p className="text-sm text-[var(--ink-600)]">06:40 → 08:55 • Non-stop • 2h 15m</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--ink-500)]">per traveler</p>
              <p className="text-2xl font-bold text-[var(--ink-900)]">₹5,420</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={onOpenFareRules} variant="outline">
              View Fare Rules
            </Button>
            <Button>Select Flight</Button>
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-[var(--ink-900)]">Air India AI-866</h3>
              <p className="text-sm text-[var(--ink-600)]">09:10 → 11:25 • Non-stop • 2h 15m</p>
            </div>
            <p className="text-2xl font-bold text-[var(--ink-900)]">₹5,980</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function HotelsPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-[280px_1fr]" aria-label="Hotels tab content">
      <Card className="h-fit">
        <h3 className="mb-3 text-lg font-bold">Refine Hotels</h3>
        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between">
            <span>5 star</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span>Pool</span>
            <input type="checkbox" />
          </label>
          <label className="flex items-center justify-between">
            <span>Breakfast</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {["Goa Sands Resort", "Sea Crest Hotel", "Azure Palm Suites", "Heritage Cove"].map((name) => (
          <Card key={name}>
            <p className="mb-2 text-xs uppercase tracking-[0.15em] text-[var(--ink-500)]">Goa • 4 nights</p>
            <h3 className="mb-2 text-lg font-bold text-[var(--ink-900)]">{name}</h3>
            <p className="mb-4 text-sm text-[var(--ink-600)]">Includes breakfast, airport transfer, and free cancellation.</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">₹8,900/night</p>
              <Button size="sm">View Deal</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

type PackagesPanelProps = {
  onOpenPackageDrawer: () => void;
};

export function PackagesPanel({ onOpenPackageDrawer }: PackagesPanelProps) {
  return (
    <section className="space-y-6" aria-label="Packages tab content">
      <Card>
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            "Adventure",
            "Honeymoon",
            "Family",
            "Student Friendly",
            "Wellness",
            "Luxury",
          ].map((theme, index) => (
            <Button key={theme} variant={index === 0 ? "secondary" : "outline"} size="sm">
              {theme}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Kerala Escape", "3N/4D", "₹28,999"],
            ["Kashmir Snowline", "4N/5D", "₹34,900"],
            ["Andaman Blue", "4N/5D", "₹39,500"],
          ].map(([name, duration, price]) => (
            <Card key={name} className="p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--ink-500)]">{duration}</p>
              <h3 className="my-2 text-lg font-bold text-[var(--ink-900)]">{name}</h3>
              <p className="text-sm text-[var(--ink-600)]">Flights + stay + sightseeing included.</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold">{price}</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={onOpenPackageDrawer}>
                    View
                  </Button>
                  <Button size="sm" onClick={onOpenPackageDrawer} variant="secondary">
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}

type PaymentPanelProps = {
  onOpenPaymentHelp: () => void;
};

export function PaymentPanel({ onOpenPaymentHelp }: PaymentPanelProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]" aria-label="Payment tab content">
      <Card>
        <h3 className="mb-4 text-xl font-bold text-[var(--ink-900)]">Traveler Details</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <InputField id="first-name" label="First Name" defaultValue="Rahul" />
          <InputField id="last-name" label="Last Name" defaultValue="Sharma" />
          <InputField id="email" label="Email" defaultValue="rahul@example.com" />
          <InputField id="phone" label="Mobile" defaultValue="9876543210" />
        </div>
        <h4 className="mt-6 mb-3 text-lg font-bold text-[var(--ink-900)]">Payment Method</h4>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 rounded-xl border border-[var(--sand-300)] p-3">
            <input type="radio" name="payment" defaultChecked />
            UPI / QR
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-[var(--sand-300)] p-3">
            <input type="radio" name="payment" />
            Credit or Debit Card
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-[var(--sand-300)] p-3">
            <input type="radio" name="payment" />
            Net Banking
          </label>
        </div>
      </Card>

      <Card className="h-fit">
        <h3 className="mb-3 text-xl font-bold text-[var(--ink-900)]">Fare Summary</h3>
        <div className="space-y-2 text-sm text-[var(--ink-700)]">
          <p className="flex justify-between">
            <span>Base Fare</span>
            <span>₹5,420</span>
          </p>
          <p className="flex justify-between">
            <span>Taxes</span>
            <span>₹1,200</span>
          </p>
          <p className="flex justify-between border-t border-[var(--sand-300)] pt-2 text-base font-bold text-[var(--ink-900)]">
            <span>Total</span>
            <span>₹6,620</span>
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <Button className="w-full">Pay Securely</Button>
          <Button className="w-full" variant="outline" onClick={onOpenPaymentHelp}>
            Need Help?
          </Button>
        </div>
      </Card>
    </section>
  );
}

export function DashboardPanel() {
  return (
    <section className="space-y-4" aria-label="Dashboard tab content">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Upcoming Trips", "04"],
          ["Wallet Balance", "₹8,250"],
          ["Reward Points", "2,960"],
          ["Saved Travelers", "06"],
        ].map(([label, value]) => (
          <Card key={label} className="p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--ink-500)]">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[var(--ink-900)]">{value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h3 className="mb-3 text-xl font-bold text-[var(--ink-900)]">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-[var(--ink-600)]">
              <tr>
                <th className="px-2 py-2">Booking</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Date</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--sand-300)]">
                <td className="px-2 py-3">DEL-BOM / 6E-234</td>
                <td className="px-2 py-3">Flight</td>
                <td className="px-2 py-3">15 Oct 2026</td>
                <td className="px-2 py-3 text-[var(--brand-700)]">Confirmed</td>
              </tr>
              <tr className="border-t border-[var(--sand-300)]">
                <td className="px-2 py-3">Goa Sands Resort</td>
                <td className="px-2 py-3">Hotel</td>
                <td className="px-2 py-3">08 Oct 2026</td>
                <td className="px-2 py-3 text-[var(--ink-700)]">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

export function AboutPanel() {
  return (
    <section className="space-y-6" aria-label="About tab content">
      <Card className="bg-[linear-gradient(115deg,#183d29_0%,#2f5f3f_65%,#4f8060_100%)] text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/80">About Eduai Trips</p>
        <h2 className="font-display text-4xl leading-tight">Redefining Travel for the Indian Market</h2>
        <p className="mt-3 max-w-3xl text-sm text-white/90">
          We bring flights, hotels, visa, packages, and rewards into one connected platform designed for speed and trust.
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Consolidated Dashboard", "Control your complete travel lifecycle in one workspace."],
          ["Budget-First Discovery", "Find trips under ₹30k, ₹40k, and premium collections quickly."],
          ["Reliable Partners", "Integrated support with top airlines, hotels, and payment gateways."],
        ].map(([title, copy]) => (
          <Card key={title}>
            <h3 className="mb-2 text-lg font-bold text-[var(--ink-900)]">{title}</h3>
            <p className="text-sm text-[var(--ink-600)]">{copy}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function TermsPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-[260px_1fr]" aria-label="Terms tab content">
      <Card className="h-fit">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--ink-800)]">Contents</h3>
        <nav className="space-y-2 text-sm">
          <a className="block rounded-lg px-3 py-2 hover:bg-[var(--sand-100)]" href="#bookings-policy">
            Bookings Policy
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-[var(--sand-100)]" href="#refund-policy">
            Cancellations & Refunds
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-[var(--sand-100)]" href="#payment-terms">
            Payment Terms
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-[var(--sand-100)]" href="#privacy-data">
            Privacy & Data
          </a>
        </nav>
      </Card>
      <div className="space-y-4">
        <Card id="bookings-policy">
          <h3 className="mb-2 text-xl font-bold text-[var(--ink-900)]">1. Bookings Policy</h3>
          <p className="text-sm text-[var(--ink-700)]">All bookings are subject to availability and supplier terms. Ensure traveler details match government IDs.</p>
        </Card>
        <Card id="refund-policy">
          <h3 className="mb-2 text-xl font-bold text-[var(--ink-900)]">2. Cancellations & Refunds</h3>
          <p className="text-sm text-[var(--ink-700)]">Refund timelines generally range from 7 to 14 business days after provider confirmation.</p>
        </Card>
        <Card id="payment-terms">
          <h3 className="mb-2 text-xl font-bold text-[var(--ink-900)]">3. Payment Terms</h3>
          <p className="text-sm text-[var(--ink-700)]">Payments are processed through trusted gateways. Additional convenience fees may apply by method.</p>
        </Card>
        <Card id="privacy-data">
          <h3 className="mb-2 text-xl font-bold text-[var(--ink-900)]">4. Privacy & Data</h3>
          <p className="text-sm text-[var(--ink-700)]">We process personal information only for booking, support, and communication according to applicable law.</p>
        </Card>
      </div>
    </section>
  );
}
