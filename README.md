
# generate-robots-txt.js hakkında (Program çalışmadan önce çalıştırılan uygulama) :

## Standart yükleme için;
### generate-robots-txt.js dosyasındaki generateRobotsTxtAndSitemapXml() fonksiyonunda
1. isManualyAddingSkinVideos = false; yapılır. 
**Bu fonksiyon sayesinde robots.txt ve sitemap.xml dosyaları dinamik olarak üretilir.**

## Yeni kostüm geldiğinde ;
1. isManualyAddingSkinVideos = false; yapılır.
**Bu şekilde çalıştırıldığında güncel kahramanlar ve kostümlerinin listesi çekilir.Eskiden dolu olanlar LATEST_my_skin_video_db.json dosyasında "videoUrl": "XXX" şeklinde gelirken, yeni gelen championlar ve önceden boş olanlar "videoUrl": "" şeklinde boş geleceği için tespit edilip düzeltilebilir.**

## Video kaynaklarını güncel tutma, Videosu eksik olan skinleri otomatik güncelleme;
### generate-robots-txt.js dosyasındaki generateRobotsTxtAndSitemapXml() fonksiyonunda
1. isManualyAddingSkinVideos = true; yapılıp, 
2. let heroIdForManuallyAddingSkinVideos = 'YeniHero'; hero adı yazılır.
3. let youtubeApiKey = 'XXX'; youtube videosu da eklenecek ise apiKey eklenir. (https://console.cloud.google.com/apis/library?pli=1 adresinden alınır api key)
4. Console da gelen en son liste çıktısı "my_skin_video_db.json" dosyasındaki yeriyle güncellenir.


