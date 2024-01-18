
import styles from "../components/mainComponents/gdpr.module.scss";
import FooterPanel from "../components/mainComponents/FooterPanel";

export default function HomePage() {

  return (
    <>
    <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
        </div>


      <p>Merhaba,</p>
      <p>
        Sitemizde Google AdSense reklamlarını kullanmaktayız. Bu reklamlar,
        sizin gibi kullanıcılarımıza daha iyi hizmet sunabilmek, içerik ve
        reklamları kişiselleştirebilmek amacıyla kullanılır. Bu süreçte, kişisel
        verileriniz işlenebilir.
      </p>
      <p>Hangi Tür Bilgiler Toplanır?</p>
      <p>
        Google AdSense reklamları, tarayıcınız aracılığıyla çeşitli bilgileri
        toplayabilir. Bu bilgiler arasında IP adresiniz, tarayıcı tipiniz,
        işletim sisteminiz, ziyaret ettiğiniz sayfalar, tıklama aktiviteleriniz
        ve benzeri veriler bulunabilir.
      </p>
      <p>Verileriniz Nasıl Kullanılır?</p>
      <p>
        Toplanan veriler, reklam performansını değerlendirmek, içeriği
        kişiselleştirmek, kullanıcı deneyimini iyileştirmek ve reklamları
        hedeflemek için kullanılır. Ancak, bu verilerin kimliğinizi belirlemek
        için kullanılması söz konusu değildir.
      </p>
      <p>Çerez Kullanımı</p>
      <p>
        Bu süreçte çerezler de kullanılabilir. Çerezler, tarayıcınıza
        yerleştirilen küçük metin dosyalarıdır ve kullanıcı deneyimini
        geliştirmek amacıyla kullanılırlar.
      </p>
      <p>Verilerin Paylaşımı</p>
      <p>
        Toplanan veriler, reklamverenlerle paylaşılabilir. Ancak, bu veriler
        kişisel kimliğinizi belirlemek amacıyla paylaşılmaz.
      </p>
      <p>Gizlilik Ayarları ve Seçenekler</p>
      <p>
        Tarayıcınızın gizlilik ayarları üzerinden çerezleri ve kişisel verileri
        kontrol edebilirsiniz. Ayrıca, Google'ın reklam tercihleri sayfasını
        ziyaret ederek reklam tercihlerinizi özelleştirebilirsiniz.
      </p>
      <p>Daha Fazla Bilgi</p>
      <p>
        Daha fazla bilgi için lütfen leagueoflegends-skins.com Gizlilik
        Politikası'nı inceleyin.
      </p>
      <p>
        Bu metin, sitemizdeki Google AdSense reklamları hakkında genel bir
        bilgilendirme sağlamak amacıyla hazırlanmıştır. Lütfen gizlilik
        konularında daha fazla bilgi almak için Gizlilik Politikamızı inceleyin.
      </p>
      <p>Teşekkür ederiz.</p>

      <FooterPanel />
      </div>
    </>
  );
}
