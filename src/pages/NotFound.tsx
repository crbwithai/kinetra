import { useLang } from '../i18n/LangContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <main>
      <h1>{t('notFound.baslik')}</h1>
      <p>{t('notFound.aciklama')}</p>
    </main>
  )
}
