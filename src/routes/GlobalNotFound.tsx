import { Link } from 'react-router'

// CLAUDE.md §8 istisnası: bu sayfaya yalnızca tanınmayan bir dil kodundan
// (örn. /de) ulaşılır, yani bir LangContext yok — hangi dilde gösterileceği
// bilinemez. O yüzden metin sözlükten değil, doğrudan burada, iki dilde birden.
export default function GlobalNotFound() {
  return (
    <main>
      <p>
        Sayfa bulunamadı — <Link to="/tr">Türkçe siteye git</Link>
      </p>
      <p>
        Page not found — <Link to="/en">go to the English site</Link>
      </p>
    </main>
  )
}
