import Image from "next/image";

const ROWS = [
  [
    "/kickscontrol/01-hero-desktop.png",
    "/documind/11_dashboard_full.png",
    "/screenshots/02-dashboard.png",
    "/kickscontrol/07-backoffice-inventory.png",
    "/documind/07c_room_engineering.png",
    "/screenshots/07-reports.png",
  ],
  [
    "/screenshots/08-calendar.png",
    "/kickscontrol/02-catalog-grid.png",
    "/documind/admin_02_dashboard.png",
    "/screenshots/03-projects.png",
    "/kickscontrol/05-backoffice-dashboard.png",
    "/documind/04_documents.png",
  ],
  [
    "/documind/02_dashboard.png",
    "/screenshots/09-budgets.png",
    "/kickscontrol/03-product-detail.png",
    "/documind/09_members.png",
    "/screenshots/05-time-entries.png",
    "/kickscontrol/10-checkout-payment.png",
  ],
  [
    "/kickscontrol/08-cart-drawer.png",
    "/screenshots/04-clients.png",
    "/documind/admin_05_logs.png",
    "/kickscontrol/11-orders-list.png",
    "/screenshots/06-users.png",
    "/documind/06_rooms_list.png",
  ],
];

type Props = {
  /** Disable the drifting animation (used for the static LinkedIn banner). */
  still?: boolean;
  /** Width of each screenshot tile in px. */
  tileWidth?: number;
  /** Lighter overlay for short canvases (the banner) where the collage should show more. */
  lightShade?: boolean;
};

export default function ProjectCollage({ still = false, tileWidth = 340, lightShade = false }: Props) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Tilted wall of screenshots */}
      <div className="absolute left-1/2 top-1/2 w-[200%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] flex flex-col gap-5">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className={`flex gap-5 w-max ${still ? "" : i % 2 ? "collage-drift-reverse" : "collage-drift"}`}
            style={{ marginLeft: `${-(i % 2) * tileWidth * 0.5}px` }}
          >
            {/* Duplicated so the drift loops seamlessly */}
            {[...row, ...row].map((src, j) => (
              <div
                key={j}
                className="relative shrink-0 aspect-[16/10] rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900"
                style={{ width: tileWidth }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={`${tileWidth}px`}
                  className="object-cover object-top"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Darkening layers so the foreground text stays readable */}
      {lightShade ? (
        <div className="absolute inset-0 bg-slate-950/55" />
      ) : (
        <>
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.6)_45%,rgba(2,6,23,0.2)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
        </>
      )}
    </div>
  );
}
