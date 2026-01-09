# Google Forms Entegrasyonu - Adım Adım Kılavuz

Bu kılavuz, Nexus Güvenlik web sitesindeki iletişim formunu Google Forms ile nasıl bağlayacağınızı anlatır.

---

## 1. Google Forms'ta Form Oluşturma

### Adım 1.1: Google Forms'a Git
- https://forms.google.com adresine git
- Google hesabınla giriş yap

### Adım 1.2: Yeni Form Oluştur
- "Boş" seçeneğine tıkla
- Form başlığını yaz: **Nexus Güvenlik - Teklif Formu**

### Adım 1.3: Alanları Ekle
Aşağıdaki alanları sırasıyla ekle:

| Sıra | Alan Adı | Tür | Zorunlu |
|------|----------|-----|---------|
| 1 | Adınız Soyadınız | Kısa yanıt | ✅ Evet |
| 2 | Telefon | Kısa yanıt | ✅ Evet |
| 3 | E-posta | Kısa yanıt | ❌ Hayır |
| 4 | İlgilendiğiniz Hizmet | Açılır liste | ❌ Hayır |
| 5 | Konum Türü | Açılır liste | ❌ Hayır |
| 6 | Mesajınız | Paragraf | ❌ Hayır |

### Adım 1.4: Açılır Liste Seçenekleri

**İlgilendiğiniz Hizmet:**
- Alarm Sistemleri
- Güvenlik Kameraları
- Yangın Algılama
- Erişim Kontrol
- Video İnterkom
- Diğer

**Konum Türü:**
- Ev / Konut
- İş Yeri / Ofis
- Fabrika / Üretim Tesisi
- Depo / Antrepo
- Diğer

---

## 2. Entry ID'leri Bulma

### Adım 2.1: Önceden Doldurulmuş Bağlantı Al
1. Formun sağ üstündeki **3 nokta (⋮)** menüsüne tıkla
2. **"Önceden doldurulmuş bağlantı al"** seçeneğini seç

### Adım 2.2: Test Verisi Gir
Her alana herhangi bir test verisi gir:
- Adınız Soyadınız: `test`
- Telefon: `test`
- E-posta: `test`
- İlgilendiğiniz Hizmet: Herhangi birini seç
- Konum Türü: Herhangi birini seç
- Mesajınız: `test`

### Adım 2.3: Bağlantıyı Kopyala
1. **"Bağlantıyı al"** butonuna tıkla
2. **"Bağlantıyı kopyala"** seçeneğine tıkla

### Adım 2.4: URL'yi İncele
Kopyaladığın URL şuna benzer:
```
https://docs.google.com/forms/d/e/1FAIpQLSc_XXXXXXXXXXXX/viewform?usp=pp_url&entry.123456789=test&entry.987654321=test&entry.111111111=test...
```

Bu URL'den şunları çıkar:
- **Form ID:** `1FAIpQLSc_XXXXXXXXXXXX` (d/e/ ile /viewform arasındaki kısım)
- **Entry ID'ler:** `entry.123456789`, `entry.987654321` vb.

---

## 3. Web Sitesini Güncelleme

### Adım 3.1: iletisim.html Dosyasını Aç
Dosya yolu: `iletisim.html`

### Adım 3.2: Form Action URL'sini Değiştir
Satır 140'ta şu kodu bul:
```html
action="https://docs.google.com/forms/d/e/FORM_ID_BURAYA/formResponse"
```

`FORM_ID_BURAYA` kısmını kendi Form ID'nle değiştir:
```html
action="https://docs.google.com/forms/d/e/1FAIpQLSc_XXXXXXXXXXXX/formResponse"
```

> **ÖNEMLİ:** URL'nin sonunda `/viewform` değil `/formResponse` olmalı!

### Adım 3.3: Entry ID'leri Değiştir
Her input/select/textarea'daki `name` özelliğini güncelle:

| Alan | Mevcut | Değiştirilecek |
|------|--------|----------------|
| Adınız Soyadınız | `name="entry.111111111"` | `name="entry.GERCEK_ID"` |
| Telefon | `name="entry.222222222"` | `name="entry.GERCEK_ID"` |
| E-posta | `name="entry.333333333"` | `name="entry.GERCEK_ID"` |
| İlgilendiğiniz Hizmet | `name="entry.444444444"` | `name="entry.GERCEK_ID"` |
| Konum Türü | `name="entry.555555555"` | `name="entry.GERCEK_ID"` |
| Mesajınız | `name="entry.666666666"` | `name="entry.GERCEK_ID"` |

---

## 4. Google Sheets Bağlantısı (Opsiyonel)

### Adım 4.1: Yanıtları Sheets'e Bağla
1. Google Form'da **"Yanıtlar"** sekmesine git
2. Yeşil **Sheets ikonu**na tıkla
3. **"Yeni e-tablo oluştur"** seçeneğini seç
4. İsim ver ve **"Oluştur"** tıkla

Artık her form gönderildiğinde otomatik olarak Google Sheets'e kaydedilecek.

### Adım 4.2: E-posta Bildirimi (Opsiyonel)
1. Google Form'da **"Yanıtlar"** sekmesine git
2. Sağ üstteki **3 nokta (⋮)** menüsüne tıkla
3. **"Yeni yanıtlar için e-posta bildirimi al"** seçeneğini işaretle

---

## 5. Test Etme

1. Web sitesinde iletişim formunu doldur
2. "Formu Gönder" butonuna tıkla
3. "Formunuz başarıyla gönderildi!" mesajını gör
4. Google Sheets'te verinin geldiğini kontrol et

---

## Sorun Giderme

### Form gönderilmiyor
- Entry ID'lerin doğru olduğundan emin ol
- URL'nin sonunda `/formResponse` olduğunu kontrol et
- Tarayıcı konsolunda hata var mı bak (F12)

### Veriler Sheets'e gelmiyor
- Google Form'da "Yanıtlar" sekmesini kontrol et
- Sheets bağlantısının aktif olduğundan emin ol

### Açılır liste değerleri eşleşmiyor
- Web sitesindeki `<option value="">` değerlerinin Google Form'daki seçeneklerle **birebir aynı** olması gerekir
- Büyük/küçük harf ve boşluklara dikkat et

---

## Örnek Tamamlanmış Form Kodu

```html
<form id="contactForm"
      action="https://docs.google.com/forms/d/e/1FAIpQLSc_XXXX/formResponse"
      method="POST"
      target="hidden_iframe">

    <input type="text" name="entry.123456789" required>  <!-- Adınız Soyadınız -->
    <input type="tel" name="entry.234567890" required>   <!-- Telefon -->
    <input type="email" name="entry.345678901">          <!-- E-posta -->
    <select name="entry.456789012">                      <!-- Hizmet -->
    <select name="entry.567890123">                      <!-- Konum -->
    <textarea name="entry.678901234"></textarea>         <!-- Mesaj -->

</form>
<iframe name="hidden_iframe" style="display:none;"></iframe>
```

---

## Yardım

Sorun yaşarsan:
1. Google Form'un "Önceden doldurulmuş bağlantı" URL'sini kopyala
2. Bu URL'yi geliştirici ile paylaş
3. Geliştirici entry ID'leri otomatik olarak çıkarabilir
