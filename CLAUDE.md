# KINETRA — Proje Kuralları

Bu dosya her oturumda okunur. Buradaki kurallar kullanıcı isteğiyle çelişmedikçe bağlayıcıdır.
Bir kuralı çiğnemek gerekiyorsa, önce nedenini söyle ve onay al.

---

## 1. Proje

Kurgusal bir spor ekipmanı markasının tanıtım sitesi. Portfolyo projesi — gerçek satış yok.
20 spor branşı, her birinin bir imza ürünü. Üç branş (futbol, atletizm, yüzme) derin vitrinle anlatılır.
Tek sayfa ağırlıklı, iki dilli, demo sepetli.

**Bitti tanımı:** 20 branş + 3 derin vitrin + demo sepet + iki dil + Vercel'de yayın.
Bunun dışındaki her fikir "sürüm 2" listesine yazılır, uygulanmaz.

## 2. Marka

- **Ad:** KINETRA (kinetic + terra)
- **Ton:** Kısa cümleler. Önce iddia, sonra kanıt. Ölçülü teknik dil.
- **Yasak:** "Sınırlarını zorla" tarzı slogan dili, ünlem, abartı sıfat.
- **İmza öğe — künye bloğu:** her ürün ve bölümde tekrar eder.

```
01 / KAVRAMA / GRIP
Islakta da tutar.
Holds when wet.
4 mm lateks avuç içi, ıslak zeminde test edildi.
```

## 3. Renk

**Hex kodu asla bileşen içine yazılmaz.** Tümü tek bir token dosyasında CSS değişkeni olarak tanımlanır,
bileşenler yalnızca değişken adını kullanır. Paletin sonradan değişebilmesi buna bağlı.

| Token | Değer | Kullanım |
|---|---|---|
| `--bg-light` | `#F6F2EC` | sıcak kırık beyaz, açık bölüm zemini |
| `--bg-dark` | `#17140F` | sıcak siyah, koyu bölüm zemini |
| `--accent-deep` | `#0E8C80` | derin turkuaz, açık zeminde |
| `--accent-bright` | `#25D3C0` | canlı turkuaz, koyu zeminde |
| `--text-muted-light` | `#746C62` | sıcak gri, ikincil metin — **açık zeminde** |
| `--text-muted-dark` | `#8A8175` | sıcak gri, ikincil metin — **koyu zeminde** |
| `--copper` | `#C97B3C` | opsiyonel, onay alınmadan kullanılmaz |

**İkincil metin rengi zemine göre değişir.** Tek bir `--text-muted` tonu hem açık hem koyu
zeminde WCAG AA'yı (küçük/gövde metin için 4.5:1) aynı anda karşılayamıyor — ölçüldü,
matematiksel olarak da kanıtlandı (iki zeminin parlaklık aralıkları çakışmıyor). Bu yüzden
ikiye bölündü:
- `--text-muted-light` (`#746C62`) → `--bg-light` üzerinde **4.63:1** — AA geçer
- `--text-muted-dark` (`#8A8175`, orijinal ton) → `--bg-dark` üzerinde **4.79:1** — AA geçer

Bir bileşen hangi zeminde render ediliyorsa ikincil metin için o zeminin token'ı kullanılır;
zemin değişince (açık↔koyu bölüm) token da değişir, karışık kullanılmaz.

**Bölüm ritmi:** açık ve koyu bölümler dönüşümlü ilerler.
**Aksan kullanımı:** sayfanın %1'inden azı. Çizgi, alt çizgi, aktif gösterge, odak halkası.
Başlıkta, butonda, ikon dolgusunda aksan rengi kullanılmaz.

## 4. Tipografi

- **Başlık:** Space Grotesk
- **Metin:** Manrope
- Fontlar kendi sunucumuzdan servis edilir (dosyalar projeye dahil), Google CDN'den çekilmez.

**Dört seviye, fazlası yok:**

1. Dev başlık — ekran genişliğine göre akışkan
2. Bölüm başlığı
3. Gövde metni
4. Küçük etiket — büyük harf, geniş harf aralığı, `--text-muted-light`/`--text-muted-dark` (zemine göre)

Sabit piksel boyut yerine akışkan ölçek kullanılır. Aynı ekranda dörtten fazla yazı boyutu bulunmaz.

## 5. Boşluk

8'in katları: **8 · 16 · 24 · 40 · 64 · 96 · 160**
Bu ölçeğin dışında bir değer kullanılmaz. 30px yoktur; ya 24 ya 40.

**Izgara:** masaüstü 12 sütun, tablet 6, mobil 4.
Arka planlar her zaman tam genişlik. Metin satırları okunabilirlik sınırını aşmaz.
Ölü kenar boşluğu bırakılmaz — içerik kenardan kenara kurgulanır, nefes alanı içeride verilir.

## 6. Sayfa yapısı

Navigasyon: **Branşlar · Vitrin · Teknoloji · Hakkında · Sepet · TR/EN**

Bölüm sırası:

1. Hero
2. Marka manifestosu (kısa)
3. Branş duvarı — 01–20, üzerine gelince ürün belirir
4. Derin vitrin — futbol, atletizm, yüzme
5. Teknoloji — isimlendirilmiş marka teknolojileri, asimetrik ızgara burada denenir
6. İstatistikler
7. Demo ürün detayı + sepet
8. Footer

**Üst menü:** en üstte şeffaf, kaydırma başlayınca buzlu cam (glassmorphism).
Cam her zaman koyu tonlu olur — açık bölümlerin üstünde de okunur kalması için.
Bulanıklık efekti yalnızca kaydırma durumunda devrededir, sayfa tepedeyken kapalıdır.

## 7. Teknik yığın

React · Vite · TypeScript · Tailwind CSS · React Router · Framer Motion

- Yeni paket eklemeden önce sor. Az bağımlılık hedef.
- TypeScript tipleri gevşetilmez, `any` kullanılmaz.
- Ürün verisi tek bir dosyada tutulur. 20 branşa çıkmak = o dosyaya satır eklemek.
- Fiyat alanları baştan gerçekçi tanımlanır: tutar, para birimi, indirimli fiyat alanı.

## 8. İki dil

- **Hiçbir metin bileşen içine yazılmaz.** Tümü `tr` ve `en` sözlük dosyalarında durur.
  **Dar istisna:** `src/routes/GlobalNotFound.tsx` — tanınmayan bir dil kodundan (örn. `/de`)
  ulaşılan genel 404 sayfası. Bu sayfada hangi dilde gösterileceği bilinemez (henüz bir
  `LangContext` yok, tavuk-yumurta problemi), o yüzden metni iki dilde birden doğrudan
  bileşene yazıldı. Geçerli bir dil kodu altındaki 404'ler (`/tr/olmayan-sayfa` gibi) bu
  istisnaya girmez — onlar dil bilindiği için normal şekilde sözlükten okunur.
- URL yapısı: `/tr/...` ve `/en/...`
- Sayfaların iki dildeki karşılıkları bir eşleştirme tablosunda tutulur; dil değiştirildiğinde
  kullanıcı **aynı sayfanın** diğer dilinde kalır, ana sayfaya atılmaz.
- Her sayfaya `hreflang` etiketleri eklenir.
- Tarayıcı diline göre otomatik yönlendirme **yapılmaz.**
- Fiyat iki dilde de TL. Biçim: TR `1.299 ₺` · EN `₺1,299`

## 9. Mobil

Mobil, masaüstünün sıkıştırılmış hali değil; ayrı tasarlanır. Her bölüm yapılırken mobil karşılığı aynı turda çözülür.

- Tam ekran yükseklik için `dvh` kullanılır — `vh` adres çubuğu yüzünden zıplamaya yol açar.
- Yalnızca hover ile erişilen hiçbir bilgi olmaz; dokunmatik karşılığı tasarlanır.
- Yatay kaydırmalı kurgular mobilde dikey akışa çevrilir.
- Ağır paralaks ve çoklu bulanıklık mobilde sadeleştirilir.
- Bölüm başına bir ana hareket kuralı: aynı ekranda yarışan animasyonlar olmaz.

## 10. Animasyon

- Hero ve karmaşık geçişler Framer Motion, basit geçişler saf CSS.
- Kaydırmaya bağlı hareket, hover'da görsel değişimi, sayaçlar, harf harf beliren başlıklar.
- `prefers-reduced-motion` her animasyonda desteklenir, statik alternatif sunulur.

## 11. Görseller

- Kaynak: ChatGPT'de üretilen PNG'ler. Ham dosyalar `raw-media/` klasöründe durur ve **repoya girmez.**
- Yayın formatı: **WebP**, üç boyutta (mobil / tablet / masaüstü). Hedef: görsel başına 200 KB altı.
- Yükleme davranışı: önce çok küçük bulanık kopya, sonra net görsel. Boş kutu gösterilmez.
- Her görselde anlamlı `alt` metni bulunur.

**Fotoğraf sözlüğü:** stüdyo ürün çekimlerinde aynı zemin, aynı açı, aynı ışık.
Editoryal sahnelerde mekân değişir, lens ve ışık tarifi değişmez.

**Filigran:** `KINETRA | 01` biçiminde, Space Grotesk büyük harf, sağ alt köşe,
görsel genişliğine oranlı boyut. Açık görsellerde koyu, koyu görsellerde açık sürüm.
Filigran dosyaya gömülür, CSS katmanı olarak eklenmez.

## 12. Erişilebilirlik

- Metin/zemin kontrastı ölçülür, göz kararıyla geçilmez. İkincil metin için bkz. §3 —
  `--text-muted-light`/`--text-muted-dark` zemine göre doğru seçilmezse AA kontrastı kaybolur.
- Klavye ile tüm site gezilebilir, odak halkası görünür (aksan rengi burada kullanılabilir).
- Anlamlı HTML etiketleri kullanılır.

## 13. Yasaklar

- `dangerouslySetInnerHTML` — kod enjeksiyonu riski, istisnasız yasak.
- Bileşen içine gömülü hex kodu, sabit piksel yazı boyutu, ölçek dışı boşluk değeri.
- Bileşen içine gömülü metin (iki dil yapısını bozar).
- Gizli anahtar, API anahtarı, `.env` içeriği — projede olmayacak, önerilmeyecek.
- İstemciden gelen veriye güvenen mantık.

## 14. İçerik bütünlüğü koruması

Marka adı, bölüm başlıkları, ürün adları ve fiyatlar için MutationObserver tabanlı geri alma katmanı.

- Kapsam dar tutulur: yalnızca işaretlenmiş elemanlar izlenir, tüm DOM değil.
- Geri yazma sırasında izleyici geçici olarak durdurulur — sonsuz döngü riski buradadır.
- Bileşen kaldırıldığında izleyici `disconnect` edilir.
- Metin gerçek metin olarak kalır; SEO ve ekran okuyucu etkilenmez.
- README'de bilinçli bir tercih olarak, sınırlarıyla birlikte belgelenir.

## 15. Demo sepet

- Sepet durumu tarayıcı hafızasında (`localStorage`) tutulur. Kişisel veri saklanmaz — yalnızca ürün kimliği ve adet.
- Ödeme adımı sahte bir onay ekranıyla biter. Gerçek ödeme sağlayıcısı bağlanmaz.
- Sepet mantığı ödeme sağlayıcısından bağımsız yazılır.

## 16. Çalışma yöntemi

- **Plan Mode her zaman açık.** Dosyaya dokunmadan önce planı göster, onay bekle.
- **Tek seferde tek bölüm.** Beş bölüm birden inşa edilmez.
- Her bölüm bittiğinde: mobil kontrolü → onay → commit.
- Kullanıcı kod bilmiyor. Ne yapıldığı ve neden o yöntemin seçildiği her adımda açıklanır.
- Bir yön belirlendiğinde en az bir alternatif ve ödünleşmesi sunulur.
- Takıldığında tahmin etme, sor.

## 17. Klasör düzeni

```
public/          yayına giden optimize görseller, fontlar
raw-media/       ham PNG'ler — repoya girmez
src/
  components/    tekrar kullanılan parçalar
  sections/      sayfa bölümleri
  pages/         rota bileşenleri (Home, NotFound...)
  routes/        router yapılandırması, dil katmanı (LangLayout, GlobalNotFound)
  data/          ürün ve branş verisi
  i18n/          tr / en sözlükleri, rota eşleştirmesi
  styles/        renk ve ölçek token'ları
  lib/           yardımcı işlevler, içerik koruma katmanı
```
