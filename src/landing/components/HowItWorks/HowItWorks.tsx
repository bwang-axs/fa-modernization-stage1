import styles from './HowItWorks.module.css'

const steps = [
  {
    number: 1,
    title: 'Select Tickets to List',
    description:
      'Choose tickets from your AXS account. Pick one event or several—you’re in control.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Choose a Price',
    description:
      'Set your own price or use our smart price suggestions to help your tickets sell faster.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Get Paid',
    description:
      'Once your tickets sell, receive payment securely through AXS. Fast and reliable.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section
      className={styles.section}
      aria-labelledby="how-it-works-title"
    >
      <div className={styles.container}>
        <h2 id="how-it-works-title" className={styles.sectionTitle}>
          How it works
        </h2>
        <p className={styles.sectionSubtitle}>
          Selling your tickets on AXS is simple. Three steps and you’re done.
        </p>
        <div className={styles.steps} role="list">
          {steps.map((step) => (
            <article
              key={step.number}
              className={styles.step}
              role="listitem"
            >
              <span className={styles.connector} aria-hidden="true" />
              <span className={styles.stepNumber} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.iconWrap}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
