import { Activity, BookStory, TaskItem } from '../types';

export const LOVE_WORDS = [
  "Seninle vakit geçirmek günümün en güzel anı.",
  "Fikrin benim için çok değerli, iyi ki paylaştın.",
  "Bu konuda gösterdiğin çabayı görüyor ve takdir ediyorum.",
  "İyi ki bizim ailemizdensin.",
  "Bugün sana nasıl yardımcı olabilirim?",
  "Varlığın bana huzur veriyor.",
  "Birlikte gülebildiğimiz her an bana güç katıyor.",
  "Yorulduğunu hissediyorum, dinlenmek istediğinde yanındayım.",
  "Hataların olsa da seni olduğun gibi çok seviyoruz.",
  "Seninle aynı sofrada buluşmak evimizi yuva yapıyor."
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-1',
    day: 'Pazartesi',
    dayShort: 'Pzt',
    title: 'Duygu Pandomimi (Sessiz Sinema)',
    category: 'Oyun',
    duration: '15 Dk',
    iconName: 'Smile',
    desc: "Küçük kağıtlara 'mutlu, üzgün, kızgın, şaşırmış, korkmuş, gururlu, kıskanç' gibi duygular yazın. Sırayla kağıt çekip, konuşmadan sadece mimik ve beden diliyle o duyguyu anlatmaya çalışın.",
    rules: [
      "Her oyuncunun o duyguyu canlandırmak için 1 dakikası vardır.",
      "Ses çıkarmak, fısıldamak veya dudak oynatmak yasaktır.",
      "Tahmin edilen duygu doğru çıkınca oyuncu o duyguyu en son ne zaman hissettiğini 1 cümleyle paylaşır.",
      "En çok doğru tahmin eden kişi 'Günün Duygu Dedektifi' seçilir."
    ],
    benefit: "Sözel olmayan ipuçlarıyla duyguları tanıma ve ifade etme becerisini geliştirir. Duygularını kelimelere dökmekte zorlanan çocuklar ve yetişkinler için harika bir köprüdür."
  },
  {
    id: 'act-2',
    day: 'Salı',
    dayShort: 'Sal',
    title: "Günün En'leri Masası",
    category: 'Sohbet',
    duration: '10 Dk',
    iconName: 'Sparkles',
    desc: "Akşam yemeğinde veya çay saatinde herkes sırayla gününün 'En komik', 'En zor' ve 'En gurur verici' anını paylaşır.",
    rules: [
      "Konuşan aile üyesinin sözü asla kesilmez, tüm dikkat onda toplanır.",
      "Yargılamak, akıl vermek veya eleştirmek yasaktır; sadece şefkatle dinlenir.",
      "Gönüllü olmayan zorlanmaz, dilerse 'pas' deyip bir sonraki tura katılabilir."
    ],
    benefit: "Aile üyelerinin birbirlerinin günlük yaşantılarından haberdar olmasını sağlar, empatiyi artırır ve 'dinlenildiğini hissetme' duygusunu besler."
  },
  {
    id: 'act-3',
    day: 'Çarşamba',
    dayShort: 'Çar',
    title: 'Birlikte Mutfak & Kurabiye Zamanı',
    category: 'Etkinlik',
    duration: '45 Dk',
    iconName: 'Utensils',
    desc: "Ailecek kolay bir tarif (örneğin toplantı kurabiyesi veya kek) seçin ve mutfakta eğlenceli bir iş bölümü yaparak birlikte hazırlayın.",
    rules: [
      "Herkesin somut bir görevi olmalıdır (karıştırma, dökme, şekil verme, fırın kapağını izleme).",
      "Mutfak unlanabilir veya kirlenebilir, temizlik de tatlı bir iş birliğiyle ortak yapılmalıdır.",
      "Eğlenmek esastır; kusursuz şekilli kurabiyeler şart değildir."
    ],
    benefit: "İş birliği ve takım çalışması becerilerini geliştirir. Somut bir şeyi birlikte üretmenin ve sonrasında afiyetle paylaşmanın hazzını yaşatır."
  },
  {
    id: 'act-4',
    day: 'Perşembe',
    dayShort: 'Per',
    title: 'Ev İçi Sevgi Hazine Avı',
    category: 'Oyun',
    duration: '25 Dk',
    iconName: 'Compass',
    desc: "Evin farklı köşelerine küçük sevgi notları ve ipuçları saklayın. Her ipucu bir sonrakine yönlendirsin ve finalde hep birlikte paylaşılan küçük bir sürpriz olsun.",
    rules: [
      "İpuçları evin tehlikeli yerlerine (ocak, priz, yüksek dolaplar) saklanmamalıdır.",
      "Büyükler küçükler için, küçükler de büyükler için ipucu ve sevgi notu hazırlayabilir.",
      "Her ipucunun arkasında bir aile ferdine yazılmış güzel bir iltifat yer almalıdır."
    ],
    benefit: "Problem çözme yeteneğini ve analitik düşünmeyi desteklerken eve neşe ve hareket getirir."
  },
  {
    id: 'act-5',
    day: 'Cuma',
    dayShort: 'Cum',
    title: 'Nostalji & Aile Albümü İncelemesi',
    category: 'Sohbet',
    duration: '20 Dk',
    iconName: 'Image',
    desc: "Eski basılı fotoğraf albümlerini veya ilk bebeklik videolarını açın. Anne ve babanın çocukluk yıllarına, dede-ninelerin hatıralarına ait anıları konuşun.",
    rules: [
      "Herkes albümden en çok merak ettiği veya ilgisini çeken bir fotoğraf seçsin.",
      "Çocuklar ebeveynlerine 'O gün ne olmuştu?', 'Sizin çocukluğunuzda hayat nasıldı?' diye soru sorabilir."
    ],
    benefit: "Kuşaklar arası bağı güçlendirir, köklenme hissi verir. Kendi aile geçmişini bilmek çocuklarda derin bir özgüven ve aidiyet duygusu oluşturur."
  },
  {
    id: 'act-6',
    day: 'Cumartesi',
    dayShort: 'Cmt',
    title: 'Ev Yapımı Sinema & Mısır Gecesi',
    category: 'Etkinlik',
    duration: '90 Dk',
    iconName: 'Film',
    desc: "Ailecek izlenecek sıcak bir aile filmi seçin. Oturma odasını sinema salonuna çevirin (ışıkları kısın, sembolik bilet hazırlayın, mısır patlatın).",
    rules: [
      "Film seçimi demokratik oylamayla veya kura çekilerek yapılmalıdır.",
      "Film izlenirken telefonlar ve tabletler başka bir odada sessizde bırakılır.",
      "Film bittikten sonra 5-10 dakika ana fikir ve karakterlerin seçimleri üzerine sohbet edilir."
    ],
    benefit: "Ortak kültürel tüketim sağlar. Film sonrasındaki sohbetler çocukların eleştirel ve ahlaki düşünme becerilerini geliştirir."
  },
  {
    id: 'act-7',
    day: 'Pazar',
    dayShort: 'Paz',
    title: 'Huzurlu Sessiz Okuma Saati',
    category: 'Etkinlik',
    duration: '30 Dk',
    iconName: 'BookOpen',
    desc: "Televizyon ve telefonları tamamen kapatın. Herkes kendi kitabını veya dergisini alsın. Sıcacık bir çay eşliğinde aynı odada sessizce kitap okuyun.",
    rules: [
      "Süre bitene kadar teknolojik aletlere ve bildirimlere bakılmaz.",
      "Süre bitiminde herkes okuduğu sayfadan en çok etkilendiği bir cümleyi veya fikri sesli olarak aileyle paylaşır."
    ],
    benefit: "Okuma alışkanlığını modelleme yoluyla kazandırır. Birbirinin varlığında sessizliği huzurla paylaşabilmek aile bağlarını dinginleştirir."
  }
];

export const BOOK_STORIES: BookStory[] = [
  {
    id: 'story-0',
    title: 'Önsöz: Bir Yuva Sıcaklığı',
    author: 'Hümeyra EKMEN',
    intro: 'Kitabın derleyicisi ve mimarı Hümeyra Ekmen\'den ailelere sıcacık bir selamlama.',
    fullText: `Kıymetli aileler,

"Aile Dediğin" kitabı, öğrencilerimizin tertemiz yüreklerinden süzülen; aile olmanın sıcaklığını, zorluklarını ve vazgeçilmez güzelliklerini anlatan eşsiz hikâyelerden oluşuyor. Bu kitap sadece okunup rafa kaldırılmak için değil; üzerinde konuşulmak, birbirimizi daha derinden anlamak ve aile içi bağlarımızı güçlendirmek için hazırlandı.

Modern çağın hızına ve dijital telaşlarına kapılıp birbirimize vakit ayıramadığımız şu günlerde, bu kitaptaki her bir hikâye kendi ailenizden bir parça bulabileceğiniz sıcacık birer ayna niteliğindedir. Bir hikâyede kendi geçmişinize dalacak, diğerinde çocuklarınızın dünyasına yeni pencereler açacaksınız.

Sizlerden ricam; lütfen bu portalı bir aile rehberi olarak kullanın. Hikâyeleri ailecek, göz teması kurarak, televizyonu ve telefonları bir kenara bırakıp kitabınızdan okuyun. Ardından burada hazırladığımız "Aile Sohbeti" başlıkları ve soruları üzerine sevgiyle konuşun.

İletişiminizin, muhabbetinizin ve sevginizin daim olması dileğiyle...`,
    chatTopic: "Evimizi sadece dört duvardan ibaret bir bina olmaktan çıkarıp 'gerçek bir yuva' yapan değerlerimizi konuşalım.",
    questions: [
      "Bizim evimizde sizi en çok mutlu eden, 'İyi ki burası benim evim' dedirten an nedir?",
      "Ailemizin kendine has, sadece bize özel bir ritüeli veya alışkanlığı var mı? Yenilerini ekleyebilir miyiz?",
      "Bu hafta birbirimize daha çok zaman ayırmak için hangi ekran alışkanlığımızdan biraz ödün verebiliriz?"
    ],
    keyTheme: "Aile Bilinci & Sevgi Bağı"
  },
  {
    id: 'story-1',
    title: 'Mirasın Gerçek Sahibi',
    author: 'Ertuğrul ERDEM',
    intro: 'Maddi servetlerin ötesinde nesilden nesile aktarılan manevi değerlerin ve hatıraların gücü.',
    fullText: `Hikâyeyi "Aile Dediğin" basılı kitabınızdan hep birlikte, sırayla birer paragraf sesli okuyarak takip edebilirsiniz. Okuma tamamlandıktan sonra aşağıdaki sohbet konularına geçiniz.`,
    chatTopic: "Aile yadigarları, geçmişten günümüze taşıdığımız manevi değerler ve hatıraların hayatımızdaki yeri.",
    questions: [
      "Sizce modern teknoloji ve sürekli tüketim kültürü, aile mirası ve eski anıları bize unutturuyor olabilir mi? Neden?",
      "Evimizde büyüklerimizden (dedelerimizden/ninelerimizden) kalan, maddi değeri olmasa da manevi değeri çok yüksek olan hangi eşyalar veya gelenekler var?",
      "Hikâyedeki çoban emanet kaftanı neden satmadı? Sizin için hiçbir parayla satılamayacak paha biçilmez değerler nelerdir?"
    ],
    keyTheme: "Manevi Değerler & Vefa"
  },
  {
    id: 'story-2',
    title: 'Keşke Her Gün Pazar Olsa',
    author: 'Büşra ERYİĞİT',
    intro: 'Hafta içi koşturmacasında unutulan togetherness (birliktelik) duygusunun pazar sofrasındaki canlanışı.',
    fullText: `Hikâyeyi "Aile Dediğin" basılı kitabınızdan hep birlikte, sırayla birer paragraf sesli okuyarak takip edebilirsiniz. Okuma tamamlandıktan sonra aşağıdaki sohbet konularına geçiniz.`,
    chatTopic: "Hızla akan hayatın içinde ailemize bilinçli ve kesintisiz olarak 'kaliteli zaman' ayırmanın yolları.",
    questions: [
      "Hafta içi okul ve iş koşturmacasında birbirimize daha fazla vakit ayırmak için günlük rutinlerimizde ne gibi küçük değişiklikler yapabiliriz?",
      "Sizin evinizde de 'Keşke her gün o gün olsa' dediğiniz özel bir gün, saat veya gelenek var mı?",
      "Ailecek oynadığınız, izlediğiniz veya birlikte hazırladığınız favori pazar günü etkinliğiniz nedir?"
    ],
    keyTheme: "Kaliteli Zaman & Paylaşım"
  },
  {
    id: 'story-3',
    title: 'Duvardaki Saat',
    author: 'Eslem Beyza EKMEN',
    intro: 'Tik tak seslerinin ardında zamanın akışı, duran bir saat ve canlanan aile bağları.',
    fullText: `Hikâyeyi "Aile Dediğin" basılı kitabınızdan hep birlikte, sırayla birer paragraf sesli okuyarak takip edebilirsiniz. Okuma tamamlandıktan sonra aşağıdaki sohbet konularına geçiniz.`,
    chatTopic: "Teknolojinin ve bildirimlerin aile içi iletişimi bölmesine izin vermemek ve 'ekransız anlar' inşa etmek.",
    questions: [
      "Evinizde düzenli olarak yaptığınız, zamanın nasıl aktığını unutturan bir etkinlik var mı? Yoksa bu hafta ne başlatabiliriz?",
      "Hikâyede saat neden durmuş olabilir? Aile bağlarının zayıflaması bir evin ruhunu ve bereketini nasıl etkiler?",
      "Telefon ve televizyon kullanımını evde dengede tutmak için ailecek hangi yeni kuralları hayata geçirebiliriz?"
    ],
    keyTheme: "Farkındalık & Dijital Denge"
  },
  {
    id: 'story-4',
    title: 'Zaman Yolculuğu ve Aile Hasreti',
    author: 'Sahra KARAKAYA',
    intro: 'Zamanda yolculuk yapabilsek nereye giderdik? Geleceğin özlemini bugünden sevgiyle doldurmak.',
    fullText: `Hikâyeyi "Aile Dediğin" basılı kitabınızdan hep birlikte, sırayla birer paragraf sesli okuyarak takip edebilirsiniz. Okuma tamamlandıktan sonra aşağıdaki sohbet konularına geçiniz.`,
    chatTopic: "Anı yaşamak, sahip olduklarımızın şükrünü bilmek ve aile üyelerine duyulan sevginin sıcağı sıcağına ifade edilmesi.",
    questions: [
      "Bir zaman makineniz olsa, ailenizle geçirdiğiniz geçmişteki hangi mutlu güne geri dönmek isterdiniz? Neden o anı?",
      "Birbirimizin değerini yan yanayken ve bugünü yaşarken bilmek için şu an birbirimize ne söylemek istersiniz?",
      "Gelecekte 'Keşke o günlere dönsek' diye anacağımız güzel anıları bugünden biriktirmek için bu hafta sonu ne yapalım?"
    ],
    keyTheme: "Şükür, Sevgi & Anı Biriktirme"
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  { id: 1, text: "Akşam yemeği sonrası sofrayı toplamak ve bardakları dizmek", assignees: [], done: false, priority: 'normal' },
  { id: 2, text: "Pazar sabahı taze ekmek ve kahvaltı hazırlığına destek olmak", assignees: [], done: false, priority: 'onemli' },
  { id: 3, text: "Haftalık aile toplantısı için çay ve kurabiye servisi hazırlamak", assignees: [], done: false, priority: 'onemli' },
  { id: 4, text: "Oturma odasındaki dergi ve kitapları düzenlemek", assignees: [], done: true, priority: 'normal' }
];

export const I_LANGUAGE_PRACTICES = [
  {
    situation: "Çocuğun veya eşin odasını/çalışma masasını dağınık bırakması",
    youLanguage: "Çok pasaklısın, arkandan sürekli toplamak zorunda mıyım!",
    iLanguage: "Odayı dağınık gördüğümde çok yoruluyorum ve evdeki düzeni tek başıma sağlayamadığımı hissediyorum. Eşyalarını yerine koymanda yardımına ihtiyacım var.",
    explanation: "'Pasaklısın' demek doğrudan kişiliğe saldırır ve savunma başlatır. Oysa 'Yoruluyorum' demek davranışın sendeki somut etkisidir."
  },
  {
    situation: "Aile üyesinin konuşurken telefonuna bakması ve dinlemiyor görünmesi",
    youLanguage: "Beni hiç dinlemiyorsun, sürekli o lanet telefona bakıyorsun!",
    iLanguage: "Sana bir şey anlatırken ekrana baktığında söylediklerimin önemsenmediğini hissedip üzülüyorum. Birkaç dakika göz teması kurarak konuşabilir miyiz?",
    explanation: "Suçlamak yerine hissettiğiniz değersizlik duygusunu ve göz teması isteğinizi net şekilde ifade eder."
  },
  {
    situation: "Yemek vaktine geç kalınması veya haber verilmemesi",
    youLanguage: "Hep böylesin, hiç saati bilmezsin, çok sorumsuzsun!",
    iLanguage: "Yemek saatinde haber vermeden geciktiğinde başına bir şey geldiğini düşünüp çok kaygılanıyorum. Gecikeceğin zaman bir mesaj atarsan çok rahatlarım.",
    explanation: "Karşı tarafı suçlamak yerine duyulan şefkatli endişeyi ortaya koyar ve bir çözüm önerisi sunar."
  }
];
