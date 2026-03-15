import type { SeatUpgrade } from '../../../data/eventDetailMock'
import styles from './SeatUpgradeCarousel.module.css'

interface SeatUpgradeCarouselProps {
  upgrades: SeatUpgrade[]
}

export function SeatUpgradeCarousel({ upgrades }: SeatUpgradeCarouselProps) {
  return (
    <section className={styles.section} aria-labelledby="upgrades-heading">
      <h2 id="upgrades-heading" className={styles.heading}>
        Seat upgrades
      </h2>
      <div
        className={styles.carousel}
        role="list"
        aria-label="Seat upgrade options"
      >
        {upgrades.map((upgrade) => (
          <article
            key={upgrade.id}
            className={styles.card}
            role="listitem"
          >
            {upgrade.badge && (
              <span className={styles.badge} data-badge={upgrade.badge}>
                {upgrade.badge === 'best-value' ? 'Best value' : 'Popular'}
              </span>
            )}
            <div className={styles.price}>
              Upgrade for ${upgrade.price}
            </div>
            <div className={styles.seat}>
              {upgrade.section} · {upgrade.row}
            </div>
            <p className={styles.valueStatement}>{upgrade.valueStatement}</p>
            <button type="button" className={styles.upgradeBtn}>
              Upgrade
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
