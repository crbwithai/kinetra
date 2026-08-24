import LangSwitcher from '../components/LangSwitcher'
import { useLang } from '../i18n/LangContext'
import { useSeo } from '../i18n/useSeo'

export default function Home() {
  const { t } = useLang()
  useSeo('home')

  return (
    <>
      <header>
        <LangSwitcher />
      </header>
      <main>
        <section>
          <p>{t('hero.baslik')}</p>
        </section>
      </main>
    </>
  )
}
