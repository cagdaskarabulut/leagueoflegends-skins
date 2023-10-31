Standart yükleme için;
generate-robots-txt.js dosyasındaki generateRobotsTxtAndSitemapXml() fonksiyonunda
1-) isManualyAddingSkinVideos = false; yapılır.
Bu fonksiyon sayesinde robots.txt ve sitemap.xml dosyaları dinamik olarak üretilir.

*** Yeni hero veya kostüm geldiğinde;
generate-robots-txt.js dosyasındaki generateRobotsTxtAndSitemapXml() fonksiyonunda
1-) isManualyAddingSkinVideos = true; yapılıp, 
2-) let heroIdForManuallyAddingSkinVideos = 'YeniHero'; hero adı yazılır.
3-) let youtubeApiKey = 'XXX'; youtube videosu da eklenecek ise apiKey eklenir.
4-) Console da gelen en son liste çıktısı "my_skin_video_db.json" dosyasındaki yeriyle güncellenir.