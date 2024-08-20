
**Not:Yuklemeden önce dinamik üretilen dosyaların eksik kalmaması için localde çalıştırılması gerekiyor**

# generate-robots-txt.js hakkında (Program çalışmadan önce çalıştırılan uygulama) :

## Standart yükleme için;
### generate-robots-txt.js dosyasındaki generateRobotsTxtAndSitemapXml() fonksiyonunda
1. Öncelikle uygulama genelinde dragon api'nin versiyonu lol'ün güncel versiyon yapılır. (https://ddragon.leagueoflegends.com/api/versions.json)
2. isManualyAddingSkinVideos = false; yapılır. 
**Bu fonksiyon sayesinde robots.txt ve sitemap.xml dosyaları dinamik olarak üretilir.**

## Yeni hero veya kostüm geldiğinde ;
1. Öncelikle uygulama genelinde dragon api'nin versiyonu lol'ün güncel versiyon yapılır. (https://ddragon.leagueoflegends.com/api/versions.json)
2. isManualyAddingSkinVideos = false; yapılır.

**Bu şekilde çalıştırıldığında güncel kahramanlar ve kostümlerinin listesi çekilir.Eskiden dolu olanlar LATEST_my_skin_video_db.json dosyasında "videoUrl": "XXX" şeklinde gelirken, yeni gelen championlar ve önceden boş olanlar "videoUrl": "" şeklinde boş geleceği için tespit edilip düzeltilebilir.**

3. Oluşturulmuş yeni sayfa içeriğini doldurmak için leagueoflegends-skins_content-creator uygulaması kullanılarak içerik oluşturulur

## Video kaynaklarını güncel tutma, Videosu eksik olan skinleri otomatik güncelleme;
### generate-robots-txt.js dosyasındaki generateRobotsTxtAndSitemapXml() fonksiyonunda
1. Öncelikle uygulama genelinde dragon api'nin versiyonu lol'ün güncel versiyon yapılır.
2. isManualyAddingSkinVideos = true; yapılıp, 
3. let heroIdForManuallyAddingSkinVideos = 'YeniHero'; hero adı yazılır.
4. let youtubeApiKey = 'XXX'; youtube videosu da eklenecek ise apiKey eklenir. (https://console.cloud.google.com/apis/library?pli=1 adresinden alınır api key)
5. Console da gelen en son liste çıktısı "my_skin_video_db.json" dosyasındaki yeriyle güncellenir.

----------------------------------------------------------------

# Genel Bilgiler
### Nesne bağlantıları
1. Sayfa adresleri olarak my_skin_video_db_ForSkinsBigImages dosyasındaki newPageUrl alanları kullanılıyor fakat my_skin_video_db nesnesine bağlantı yapmak için primary key olarak pageUrl alanı kullanıyor.  


----------------------------------------------------------------

# Yeni Kayıt Girişi İçin Yeni Yöntem
+ 0. isManualyAddingSkinVideos = false; yapılır ve üretilen LATEST_my_skin_video_db.json dosyasının kopyası oluşturulup onun üzerinde çalışılır.
+ 1. LATEST_my_skin_video_db.json dosyasında  "videoUrl": "XXX" olan nesneler silinir. 
+ 2. Geri kalanlar my_skin_video_db.json dosyasına kopyalanır ve videoUrl alanları youtube spotlight kanalından embed linkindeki key alınarak doldurulur
+ 3. my_skin_video_db_ForSkinsBigImages.json dosyasına giriş yapılıp splashNumber ları https://lol-skin.weblog.vc/ sitesinden kopyalanarak alınır.
4. Aatrox.json benzeri hero ile alakalı dosyalara (lol - mainpage, skinpage) üzerinden içerikler girilir.