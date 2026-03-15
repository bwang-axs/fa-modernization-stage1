import type { AddOn } from '../../../data/eventDetailMock'
import styles from './AddOnsCarousel.module.css'

interface AddOnsCarouselProps {
  addOns: AddOn[]
}

export function AddOnsCarousel({ addOns }: AddOnsCarouselProps) {
  return (
    <section className={styles.section} aria-labelledby="addons-heading">
      <h2 id="addons-heading" className={styles.heading}>
        Add-ons
      </h2>
      <div
        className={styles.carousel}
        role="list"
        aria-label="Add-on options"
      >
        {addOns.map((addOn) => (
          <article
            key={addOn.id}
            className={styles.card}
            role="listitem"
          >
            {addOn.imageUrl ? (
              <div className={styles.imageWrap}>
                <img src={addOn.imageUrl} alt="" className={styles.image} />
              </div>
            ) : (
              <div className={styles.placeholder}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
            )}
            <div className={styles.body}>
              <h3 className={styles.name}>{addOn.name}</h3>
              <p className={styles.description}>{addOn.description}</p>
              <div className={styles.footer}>
                <span className={styles.price}>${addOn.price}</span>
                <button type="button" className={styles.cta}>
                  {addOn.ctaLabel}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
