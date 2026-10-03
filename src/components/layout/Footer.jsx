import { contact, site } from '../../content'
import Icon from '../ui/Icon'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        {contact.map(({ label, url, icon }) => (
          <a
            key={label}
            href={url}
            className="footer-link"
            target={url.startsWith('http') ? '_blank' : undefined}
            rel={url.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
          >
            <Icon name={icon} />
          </a>
        ))}
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()}, built with care.
      </p>
      {site.templateCredit && (
        <a
          className="footer-credit"
          href={site.templateCredit.href}
          target="_blank"
          rel="noreferrer"
        >
          {site.templateCredit.label}
        </a>
      )}
    </footer>
  )
}
