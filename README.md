# wBm Chat Uygulaması

## 📌 Proje Tanımı

Bu proje, öğrenciler arasında gerçek zamanlı mesajlaşmayı ve kullanıcı yönetimini kolaylaştırmayı amaçlayan bir web tabanlı mesajlaşma sistemidir. 
Amaç; kullanıcıların birbirleriyle güvenli ve rol tabanlı bir yapı içerisinde iletişim kurabilmesini sağlamak, admin paneli aracılığıyla kullanıcı kontrolü ve yetki ataması yapabilmektir.

Kullanıcılar sisteme kayıt olabilir, giriş yapabilir, mesaj gönderip alabilir, adminler ise tüm kullanıcıları listeleyip rol değişikliği veya silme işlemleri yapabilir. 
Bu yapı, küçük çaplı sosyal uygulamalar veya öğrenci projeleri için temel bir iletişim altyapısı sunar.

---------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Kullanılan Teknolojiler

- **Next.js** – Frontend ve backend işlemleri için.
- **Prisma ORM** – Veritabanı işlemleri ve veri modelleme.
- **SQLite** – Geliştirme ortamı için lokal veritabanı.
- **Tailwind CSS** – Modern ve özelleştirilebilir stil sistemi.
- **Shadcn UI** – Arayüz bileşenleri için kullanıldı (opsiyonel).
- **Bcrypt.js** – Şifreleme işlemleri için.
- **NextAuth veya JWT** – Oturum yönetimi (projeye göre).

---------------------------------------------------------------------------------------------------------------------------------

## 🚀 Kurulum Talimatları

1. **Projeyi Klonlayın**
   ```bash
   git clone https://github.com/kullaniciadi/wBm-Chat.git
   cd wBm-Chat
Gerekli Paketleri Kurun


npm install
Ortam Değişkenlerini Ayarlayın
Ana dizine .env dosyası oluşturun ve içine aşağıdaki bilgileri ekleyin:


DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="rastgele-uzun-bir-gizli-anahtar"
Veritabanını Oluşturun ve Migrasyonları Uygulayın


npx prisma migrate dev --name init
Geliştirme Sunucusunu Başlatın


npm run dev
Tarayıcıda şu adresi açın:



http://localhost:3000
🔑 Admin Giriş Bilgileri
Proje testi için bir admin hesabı:
  



E-posta: berhan20001@gmail.com
Şifre: 123456789


🧩 Ek Bilgiler
Kullanıcı rollerini değiştirmek veya kullanıcıları silmek için admin paneli kullanılır.

Proje sadece localde değil, dileyen kullanıcılar için GitHub üzerinden Vercel ile kolayca canlıya alınabilir.

Şifreler bcryptjs ile güvenli bir şekilde saklanmaktadır.

📄 Lisans
Bu proje eğitim amaçlıdır. Lisanslama gereksinimi duyulmayan açık kaynaklı bir örnektir.
