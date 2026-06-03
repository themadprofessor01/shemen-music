import Link from "next/link";

export function ReferenceFooter() {
  return (
    <footer className="ref-footer">
      <p>@ Copyright 2024 ShemenMusic. All Rights Reserved</p>
      <div className="ref-footer-links">
        <Link href="/terms">Service Terms</Link>
        <span>-</span>
        <Link href="/privacy">Cookie Warnings</Link>
        <span>-</span>
        <a href="mailto:contact@shemenmusic.com">Support</a>
        <span>-</span>
        <a href="mailto:contact@shemenmusic.com">Feedback</a>
      </div>
    </footer>
  );
}
