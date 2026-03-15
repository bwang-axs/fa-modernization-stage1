import styles from './AppDownloadBanner.module.css'

export function AppDownloadBanner() {
  return (
    <div className={styles.banner} role="banner" aria-label="Download the mobile app">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.tagline}>Your tickets, always in your pocket</p>
          <p className={styles.cta}>Free on the App Store & Google Play</p>
        </div>
        <div className={styles.codeWrap} aria-hidden>
          <div className={styles.qrCode}>
            {/* Placeholder QR-style grid; replace with real QR image or lib in production */}
            <svg viewBox="0 0 29 29" className={styles.qrSvg} aria-hidden>
              <rect width="29" height="29" fill="white" />
              <g fill="#111827">
                <rect x="1" y="1" width="7" height="7" />
                <rect x="3" y="3" width="3" height="3" />
                <rect x="21" y="1" width="7" height="7" />
                <rect x="23" y="3" width="3" height="3" />
                <rect x="1" y="21" width="7" height="7" />
                <rect x="3" y="23" width="3" height="3" />
                <rect x="10" y="1" width="2" height="2" />
                <rect x="14" y="1" width="2" height="2" />
                <rect x="18" y="1" width="2" height="2" />
                <rect x="10" y="5" width="2" height="2" />
                <rect x="14" y="5" width="2" height="2" />
                <rect x="10" y="9" width="2" height="2" />
                <rect x="14" y="9" width="2" height="2" />
                <rect x="1" y="10" width="2" height="2" />
                <rect x="5" y="10" width="2" height="2" />
                <rect x="21" y="10" width="2" height="2" />
                <rect x="25" y="10" width="2" height="2" />
                <rect x="10" y="13" width="9" height="2" />
                <rect x="10" y="17" width="2" height="2" />
                <rect x="14" y="17" width="2" height="2" />
                <rect x="18" y="17" width="2" height="2" />
                <rect x="21" y="21" width="7" height="7" />
                <rect x="23" y="23" width="3" height="3" />
                <rect x="10" y="21" width="2" height="2" />
                <rect x="14" y="21" width="2" height="2" />
                <rect x="18" y="21" width="2" height="2" />
              </g>
            </svg>
          </div>
          <button type="button" className={styles.getAppBtn}>
            Get the app
          </button>
        </div>
      </div>
    </div>
  )
}
