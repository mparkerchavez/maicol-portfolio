import { SignalAnchor } from "@/components/signals/signal-anchor";
import { OpenChatButton } from "@/components/site/open-chat-button";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-inverse-paper py-20 text-inverse-ink">
      <div className="site-container grid gap-16 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-mono text-inverse-ink/70">07 /// LET&apos;S TALK</p>
          <a href="mailto:mparkerchavez@gmail.com" className="mt-6 block text-display-2 text-inverse-ink no-underline">
            Let&apos;s talk.
          </a>
          <div className="mt-10 flex flex-wrap gap-5 text-mono-lg">
            <SignalAnchor href="mailto:mparkerchavez@gmail.com" signalType="click" targetId="footer-email" className="text-inverse-ink">
              EMAIL MPARKERCHAVEZ@GMAIL.COM
            </SignalAnchor>
            <SignalAnchor href="/Maicol-Parker-Chavez-Resume.pdf" signalType="click" targetId="footer-resume" className="text-inverse-ink">
              RESUME DOWNLOAD PDF
            </SignalAnchor>
            <SignalAnchor
              href="https://www.linkedin.com/in/mparkerchavez"
              signalType="click"
              targetId="footer-linkedin"
              className="text-inverse-ink"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </SignalAnchor>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-12">
          <OpenChatButton prompt="what should I ask next?" className="text-left text-mono text-inverse-ink/80 hover:text-inverse-ink">
            OR -&gt; ASK LLAMITA WHAT TO ASK NEXT
          </OpenChatButton>
          <p className="text-mono-sm text-inverse-ink/55">© 2026 MAICOL PARKER-CHAVEZ</p>
        </div>
      </div>
    </footer>
  );
}
