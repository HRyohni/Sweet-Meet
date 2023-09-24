Sveučilište Jurja Dobrile u Puli Fakultet informatike u Puli

![](RackMultipart20230924-1-i20a4k_html_98470a7de84b95fc.png)

# **Sweet Meet**

Leo Matošević

Tim: 197/22

Smjer : Informatika

Kolegij : Programsko inženjerstvo

Mentor : doc. dr. sc. Nikola Tanković

Asistent : Toni Starčić, mag. inf.

# Sadržaj

[1.Uvod 3](#_Toc145841688)

[2.Motivacija 4](#_Toc145841689)

[3.Alati Korišreni za Sweet Meet 5](#_Toc145841690)

[Vue 5](#_Toc145841691)

[Vuetify 2 **Error! Bookmark not defined.**](#_Toc145841692)

[4.Firebase 5](#_Toc145841693)

[5.Kocnepti Projekta 6](#_Toc145841694)

[6.Use-case dijagram 7](#_Toc145841695)

[7.Class Diagram Sweet meet 8](#_Toc145841696)

[8.Landing Page 9](#_Toc145841697)

[9.Registracija 10](#_Toc145841698)

[10.registerUser 11](#_Toc145841699)

[11.Prijava 12](#_Toc145841700)

[12.InfoView 13](#_Toc145841701)

[13.Glavna stranica („Feed") 14](#_Toc145841702)

[14.Profile 16](#_Toc145841703)

[15.Edit profile 17](#_Toc145841704)

[16.Messages 18](#_Toc145841705)

[17.Komponente (Components) 19](#_Toc145841706)

[Šta su komponente? 19](#_Toc145841707)

[Sweet Meet Komponente 19](#_Toc145841708)

[18.BlockUserComponent 19](#_Toc145841709)

[19.FollowButtonComponent 20](#_Toc145841710)

[20.FollowSugestionComponent 21](#_Toc145841711)

[21.MessageSystemComponent 22](#_Toc145841712)

[22.NotificationMenuComponet 23](#_Toc145841713)

[23.ProfileCardComponet 24](#_Toc145841714)

[24.SearchUserComponent 25](#_Toc145841715)

[25.SweetCardComponent 26](#_Toc145841716)

[26.SweetCardDatingComponent 27](#_Toc145841717)

[27.UploadPostComponent 28](#_Toc145841718)

1.
# Uvod

Upravo zbog rastuće popularnosti društvenih mreža i aplikacija za spojeve, nastaje potreba za inovacijama koje će iskoristiti sličnosti između aplikacija za spojeve i društvenih , te ih spojiti u jednu platformu. Sweet Meet predstavlja nešto više od občne aplikacije za spojeve. Ugrađujući elemente karakteristične za društvene mreže, Sweet Meet stvara dinamičnu platformu koja pruža više mogućnosti korištenja.

Ova aplikacija se ističe od drugih aplikacija zaspojeve, upravo zbog svoje posebnosti da pruži korisnicima novo iskustvo. Sweet Meet teži stvaranju društwa koja nije ograničena samo na potragu za partnerom, već i pruža prostor za proširivanje društvene mreže i pronalaženje ljudi sa zajedničkim interesima, prijatelja i drugo. Nadalje, važno je istaknuti da Sweet Meet omogućuje korisnicima da dijele svoje interese, hobije i životna događanja.

Sweet Meet je dizajniran sa naglaskom na interaktivnosti i personalizaciji. Korisnici će imati mogućnost da kreiraju detaljne profile koji će odražavati njihove interese, strasti i životne stilove. Ovo će omogućiti korisnicima da pronađu ljude sa sličnim ciljevima,

Ciljano tržište za Sweet Meet obuhvata širok spektar korisnika, od mladih koji traže romantične veze do ljudi koji žele proširiti svoj društveni krug.

Uvođenjem Sweet Meeta na tržište, očekiva sepromjena načina na koji ljudi doživljavaju online spojeve i društvene mreže.

Sweet Meet koristi tehnologije kao što su Vue.js za izgradnju korisničkih sučelja i Firebase platformu za razvoj mobilnih i web aplikacija. Firebase pruža alate za bazu podataka, autentikaciju korisnika, hosting i druge funkcionalnosti koje olakšavaju razvoj i upravljanje aplikacijama.

Glavne prednosti Sweet Meeta u odnosu na druge aplikacije za spojeve su:

- Proširene Mogućnosti: Sweet Meet nudi širi spektar mogućnosti od običnih aplikacija za spojeve, uključujući dijeljenje interesa, hobija , životnih događaja i slika za objavljivanje.
- Društvena Komponenta: Integracija društvenih mreža omogućava korisnicima proširenje svoje društvene mreže i povezivanje s ljudima s sličnim interesima.
- Jednostavno Korištenje: Sučelje aplikacije je dizajnirano kako bi bilo lako za korištenje.

1.
# Motivacija

Ciljano tržište aplikacije "Sweet Meet" obuhvaća ljude koji veze. Osim toga, platforma je namijenjena onima koji žele proširiti svoju društvenu mrežu, pronaći ljude s zajedničkim interesima, sklopiti prijateljstva. Ovaj pristup razlikuje "Sweet Meet" od standardnih aplikacija za spojeve, čime se ciljano tržište proširuje na širu društvenu zajednicu.

Dosadašnji proces povezivanja ljudi za spojeve i društvene mreže obično se odvijao kroz tradicionalne aplikacije za spojeve koje su se fokusirale isključivo na veze. Međutim, "Sweet Meet" donosi pristup kombinirajući elemente društvenih mreža i aplikacija za spojeve, pružajući korisnicima više mogućnosti.

**SWOT Analiza:**

**Snage (S)**

Inovativan Pristup: Kombinacija društvene mreže i aplikacije za spojeve daje Sweet Meetu jedinstvenu poziciju na tržištu.

Proširene Mogućnosti: Pružanje prostora za dijeljenje interesa, hobija i životnih događaja.

**Slabosti (W)**

Nedostatak Korisnika: U početku, aplikacija možda neće biti dovoljno prepoznatljiva na tržištu.

**Prilike (O)**

Rast društvenih mreža: Rastuća količina korisnika za aplikacije, te aplikacije za spojeve

**Prijetnje (T)**

Konkurencija na Tržištu: Postojeće aplikacije za spojeve i društvene mreže mogu pokušati implementirati slične značajke.

1.
# Alati Korišreni za Sweet Meet

## Vue

Sweet meet je izrađen u alatu Vue je JavaScript framework za izgradnju korisničkih sučelja. Nadovezuje se na standardni HTML, CSS i JavaScript i pruža deklarativni model programiranja temeljen na komponentama koji vam pomaže da učinkovito razvijete korisnička sučelja, bila ona jednostavna ili složena.

![](RackMultipart20230924-1-i20a4k_html_e5ad2ba84808a25a.png)

1.
# Firebase

Firebase je platforma za razvoj mobilnih i web aplikacija koju je razvio Google. Pruža razne usluge i alate koji omogućuju razvoj visokokvalitetnih aplikacija na brz i učinkovit način. Firebase uključuje alate za bazu podataka, autentikaciju korisnika, hosting, izvršavanje backend koda, pohranu datoteka te mnoge druge funkcionalnosti koje pomažu programerima u izgradnji i upravljanju aplikacijama. Posebno je popularan među developerima zbog svoje jednostavnosti korištenja i brzine implementacije.

![](RackMultipart20230924-1-i20a4k_html_29532fd7940533fb.png)

1.
# Kocnepti Projekta

Sweet meet prilikom izrade je imao puno vrsta dizajna i ideja. Krajni rezultat se ispostavio najbolji, i ako nikada nije bio nacrtan.

![](RackMultipart20230924-1-i20a4k_html_f94c0645bf064dc3.png)

1.
# Use-case dijagram

Use-case dijagram prikazuje korištenje aplikacije sweet meet. Aktor su zapravo korisnici koji se registriraju. Korisnik za početak registrira se te dodaje informacije o sebi koji se spremaju. Korisnik ulazi na stranicu **Feed** gdje ima više mogućnosti korištenja. Prvo dio ako korisnik želi poći smjerom društvene mreže može poranći prijatelje pregledati njihove objave, te ih upoznati. Ako korisnik traži spoj može pregledati druge osobe i informacije o njima, te ih može upoznati ako korisnik dobije „Match".

![](RackMultipart20230924-1-i20a4k_html_88a878d7fd975a1a.png)

1.
# Class Diagram Sweet meet

Class Diagram prikazuje korištenje sweet meet aplikacije i razumjevanje strukture aplikacije. Na slici je prikazan class dijagram aplikacije sweet meet-a. Možemo primjetiti da je glavni faktor aplikacije sam korisnik, odnosno korisničko ime. Svi podtaci su pohranjeni preko korisničkog imena tako ako trebamo bilo kakvu informaciju o korisniku tražimo po njegovom imenu. Također možemo primjetiti ako se korisnik obriše sve ostale stavke se također brišu, jer svaka informacija je povezana sa korisnikom.

![](RackMultipart20230924-1-i20a4k_html_ff474e245e8fc47f.png)

1.
# Landing Page

Dizajn je skroz promjenit, i ako nema prototip dizajna za konačnu stranicu dizajn je inspiriran raznim dizajnima pronađenim na pinterestu. Cilj Početne stranice je prikazati cilj aplikacije i priopčiti da nije samo aplikacija za spojeve nego nešto više. Koristi se jednostavni („moderni") dizajn kako bi smjanilo mogućnosti zbunjenosti pri korištenju aplikacije.

![](RackMultipart20230924-1-i20a4k_html_42fd44579696da2d.png)

**Funkcionalnosti**

i ako početna stranica nije namjenjena da ima puno funkcionalnosti, nego samo uvod u aplikaciju ima par jednostavnih fukcija za navigiranjem u aplikaciji, kao što su login i register

**loginPage() i registerPage():** pošalje korisnika na drugu stranicu u ovome slučaju prijava ili registracija

![](RackMultipart20230924-1-i20a4k_html_74e59dbfee3cb6f0.png)

1.
# Registracija

Dizajn Registracije je ilustriran istom jednostavnom („modernom") temom. Stranica služi za registraciju korisnika na stranicu.

![](RackMultipart20230924-1-i20a4k_html_e407d94ee662da04.png)

**Funkcionalnosti**

Sweet meet pri prijavi koristi UserName kao ID korisnika, tako da svaki korisnik moram imati svoj jedinstveni UserName (isto tako može biti DisplayName što će se spominjati i kasnije). Jedinstveni ID (UserName) omogućuje lakše dohvaćanje podataka, te pristup podataka od drugih korisnika unutar aplikacije. Aplikacija ne dopušta registraciju više korisnika sa istim displayName-om.

**chekIfUserNameExsists(**_ **username** _**)**

Dohvaća popis svih korisničkih imena iz baze podataka. Provjerava je li traženo korisničko ime među tim imenima. Ako pronađe traženo korisničko ime, vraća true (označava da već postoji), inače vraća false. Ako dokument s popisom korisničkih imena ne postoji u bazi podataka, preusmjerava korisnika na početnu stranicu aplikacije.

1.
# registerUser

Provjerava postoji li već korisnik s imenom. Ako postoji, prikazuje se poruka "user already exists" i funkcija vraća "error". Zatim registrira korisnika s dobivenim podatcima u aplikaciju.

updateProfile() je fukncija unutar firestore-a koja služi kako bi dodali dodatne informacije kao DisplayName, ali se ne sprema direktno na bazu podataka. saveAditionalData() funkcija služi za pohranu dodatnih informacija u bazu podataka na firestore.

![](RackMultipart20230924-1-i20a4k_html_e1f19119db912b16.png)

**SaveAditionalData():** Pohranjuje dodatne informacije za bazu podataka

![](RackMultipart20230924-1-i20a4k_html_735e4ba5bb5662f.png)

1.
# Prijava

Dizajn prijave se ne razlikuje puno od stranice registracije. Stranica prijava omogućuje i korisniku zamjeniti lozinku u slučaju gdje je korisnik zaboravio lozinku. Link za zamjenu lozinke će biti poslan na korisnikov mail, gdje je moguće ju izmjeniti. Prijava omogućuje korisniku ulazak u glavnu stranicu ili pod nazivom „Feed".

![](RackMultipart20230924-1-i20a4k_html_9fdad7595565fa83.png)

**Funkcijonalnost**

Među ostalim funkcijama dvije su naj bitnije. Login() funkcija koja omogućuje samu prijavu u aplikaciju i resetPassword() koja omogućuje izmjene lozinke.

![](RackMultipart20230924-1-i20a4k_html_3068b21a4592b79a.png) ![](RackMultipart20230924-1-i20a4k_html_128c42677e868a6b.png)

1.
# InfoView

InfoView je stranica koja se otvori nakon registracije, služi za prikupljanje svih informacija o korisniku. InfoView je stranica koja je ujedno najbitnija i najkompleksnija. Pošto je Sweet meet aplikacija za spojeve, potrebno je izdvojiti što više podataka od korisnika kako bi se moglo prikazati kasnije. na slikama je prikazane tri kartice od pet.

![](RackMultipart20230924-1-i20a4k_html_8589d41796034099.png) ![](RackMultipart20230924-1-i20a4k_html_147dcbc3f55368a5.png)

**Funkcionalnosti**

Navigacija između kartica se koriste dvije funkcije. nextStep() i backStep() koje izmjenjuju varijablu step. Varijabla step služi u html-u kao. Korisnik mora upisati sve infromacije, te pri tome kada je ispunio podatci se premaju na bazu podataka i korisnik ima pristum glavnoj stranici („Feed").

_Neke funkcije:_

**geolocate()** Ova funkcija koristi HTML5 geolokacijski API kako bi pronašla trenutnu lokaciju korisnika. Kada se pozove, funkcija traži od korisnika dozvolu za pristup njegovoj lokaciji. Ako korisnik pristane, funkcija postavlja poziciju markera na trenutnu geografsku širinu i dužinu i centrirana je na toj lokaciji.

**nextStep():** Ova funkcija prelazi korisnika na sljedeći korak u procesu unosa podataka. Povećava vrijednost varijable step za 1.

**panToMarker():** Ova funkcija pomiče prikaz mape tako da bude centriran na trenutnu poziciju markera.

1.
# Glavna stranica („Feed")

Glavna stranica ili „Feed" je stranica na kojoj korisnik pregledava slike od svojih prijatelja, komentare, obavijesti, karticu za spojeve i ostalo.

![](RackMultipart20230924-1-i20a4k_html_ace4ec1e262f7971.png)

**Funkcionalnosti**

Stranica se dijeli na dvije glavne funkcionalnosti.

Lijeva strana je više društvena mreža, prikazuje slike prijatelja njihove komentare lajkove, lajkove na komentarima. Korisnik može komentirati „Post-ove" od prijatelja i pregledavati ih.

Desna strana je više aplikacija za spojeve, prikazuje ostale korisnike pomoću pametnog algoritma. Tražeći sličnosti između trenutnog prijavitog korisnika s ostalim korisnicima, uspoređuje ih te tako prikazuje trenutnom korisniku njihove informacije, slike, deskripciju, interese, najdraže filmove, udaljenosti između njih idt..

**Funkcije**

Ovo su samo neke od bitnijih funkcija.

**Debugging()** Ova funkcija služi za provjeru i ispitivanje. Trenutno je u njoj dio koda koji se odnosi na rad s datotekama u pohrani (storage).

**DragPosts()** Ova funkcija se poziva kad se dogodi povlačenje na objektu (vjerovatno na nekom vizualnom elementu), a promjenjiva drag mijenja svoju vrijednost između 2 i 4.

**getPostIDs()** Ova funkcija dohvaća ID-jeve postova i pohranjuje ih u AllPostsIdNames.

**showFollowingUsersPosts()** Ova funkcija dohvaća postove koje prateći korisnici objavljuju i pohranjuje ih u friendsPosts nakon obrade i sortiranja.

**signOut()** Ova funkcija omogućava korisniku da se odjavi iz aplikacije.

**addPost()** Ova funkcija preusmjerava korisnika na stranicu za dodavanje novog posta.

**openMessageView()** Ova funkcija preusmjerava korisnika na stranicu za pregledavanje poruka.

**goToProfilePage()** Ova funkcija preusmjerava korisnika na vlastitu profilnu stranicu.

**getUserProfilePicture(user)** Ova funkcija dohvaća URL slike profila za određenog korisnika.

1.
# Profile

Profile je stranica koja prikazuje početnu stranicu od korisnika. Svaki korisnik ima svoju jedinstvenu stranicu za profil. Profilna stranica služi kako bi se povezali s drugim korisnicima saznali nešto novo o njima, osim toga možemo i pregledavati njihove objave, zapratiti i itd...

![](RackMultipart20230924-1-i20a4k_html_955ae73fdae60703.png)

Funkcije

**checkLoginStatus()** Ova funkcija provjerava je li korisnik prijavljen. Ako je prijavljen, postavlja userLoginStatus na true, inače preusmjerava korisnika na stranicu za prijavu.

**setUserUrlName()** Ova funkcija postavlja userUrlName na temelju parametra rute. To omogućava dobivanje imena korisnika iz URL-a.

**setUserEditProfileIfAdmin()** Ova funkcija postavlja userAdmin na true ako je trenutno prijavljeni korisnik administrator profila koji se trenutno pregledava.

**getUserData()** Ova funkcija dohvaća podatke o korisniku iz baze podataka na temelju userUrlName. Postavlja razna svojstva profila, kao što su boja kartice profila, opis profila, slike itd.

**getPostIDs():** Ova funkcija dohvaća ID-jeve postova korisnika i ažurira broj objavljenih postova.

1.
# Edit profile

Edit profile stranica služi za izmjenu informacija. Indetična je **InfoView** ali bez kartica sve u jednom redu, kako bi se što bolje provjerili podatke i nebi bilo zbunjenosti.

![](RackMultipart20230924-1-i20a4k_html_4a6cdff82994ec1a.png)

###

Funkcionalnost

Prilikom ulaska u stranicu dohvaćaju se svi podatci smještaju u polja. Tako korisnik može istovremeno urediti i provjeriti svoje podatke.

1.
# Messages

Messages stranica služi za povezivanje s ljudima, ondosno komunikacija s prijateljima. Dopisivanje s prijateljima je moguće tek nakon korisnik drugog korisnika zaprati.

![](RackMultipart20230924-1-i20a4k_html_a62f97ffd5291bc8.png)

**Funkcionalnosti**

Messages stranica omogućuje korisniku izmjenu poruka s drugim korisnicima. Pregled svih prijatelja te započimanje razgovor sa njima. Također je moguće blokirati korisnika te prijaviti. Prijave se spremaju na bazu podataka te samo ovlaštene osobe mogu pristupiti tome.

_ **Neke funkcije** _

**fetchFriendList:** Ova funkcija dohvaća listu prijatelja korisnika.

**fetchLastMessage** : Ova funkcija dohvaća zadnju poruku između trenutnog korisnika i odabranog

**fetchProfileAvatar** : Ova funkcija dohvaća URL slike profila određenog korisnika.

**newMessageRequest** : Ova funkcija provjerava je li trenutni korisnik zapravo zaprimatelj neke nove poruke (ako je netko zapratio trenutnog korisnika).

- Prolazi kroz listu pratitelja i provjerava je li korisnik novi pratitelj.
- Ako jest, dodaje ga na listu prijatelja s oznakom "newUser".

**returnUserFollowing** i **returnUserFollowers** : Ove funkcije vraćaju listu korisnika koje trenutni korisnik prati, odnosno listu korisnika koji prate trenutnog korisnika.

1.
# Komponente (Components)

## **Šta su komponente?**

Komponente omogućuju organizaciju i ponovnu upotrebu koda grupiranjem HTML-a, CSS-a i JavaScript logike vezane uz određeni dio korisničkog sučelja. Svaka komponenta ima vlastito izolirano ponašanje te može sadržavati vlastitu logiku, stilove i predložak za prikaz. Komponente olakšavaju razvoj kompleksnih aplikacija jer omogućuju razbijanje aplikacije na manje, upravljive dijelove.

## **Sweet Meet Komponente**

Ova aplikacija je od samog početka krenula u izradu svega pomoću komponenti, kako bi se lakše snašli u kodu i sučeljima.

1.
# BlockUserComponent

Komponenta služi za prijavu korisnika. Svaki korisnik može drugog korisnika prijaviti. Spremaju se podatci prijava na bazu podataka. Gdje samo ovlaštene osobe mogu provjeriti količinu prijava, te tko je prijavio.

![](RackMultipart20230924-1-i20a4k_html_e7a209218877def6.png)

**Funkcije**

**fetchBlockedUsers(username**) i **updateBlockedUsers():** Ove metode koriste se za upravljanje listom blokiranih korisnika

1.
# FollowButtonComponent

FollowButtonComponet je komponenta koja prikazuje tipku za zapratiti korisnika. Tipka se mjenja ovisno dali korisnik tu osobu prati već ili neprati.

![](RackMultipart20230924-1-i20a4k_html_7e61377c67830a06.jpg)

**Funkcije**

**fetchUserToFollowData()** Ova metoda dohvaća informacije o korisniku kojeg želimo pratiti. To uključuje listu pratitelja (Followers) i listu koju taj korisnik sam prati (Following).

**fetchUsersFollowing()**Ova metoda dohvaća listu korisnika koje je trenutno prijavljeni korisnik sam odabrao pratiti.

**checkUserFollowed()**Ova metoda provjerava je li trenutno prijavljeni korisnik već prati korisnika kojeg želimo pratiti.

**follow()**Ova metoda se poziva kada korisnik želi započeti praćenje drugog korisnika.

Prvo provjerava je li korisnik već prati drugog korisnika, a ako ne, ažurira podatke u Firestore bazi podataka kako bi označio da korisnik sada prati drugog korisnika.

**unFollow()**Ova metoda se poziva kada korisnik želi prekinuti praćenje drugog korisnika.

- Ponovno provjerava je li korisnik zapravo pratio drugog korisnika, a ako jest, ažurira podatke u Firestore bazi podataka kako bi označio da korisnik više ne prati drugog korisnika.

**sendNewNotificationToUser(notificationMessage)** Ova metoda šalje obavijesti korisniku kada netko započne pratiti drugog korisnika. Ova obavijest se čuva u polju Notifications u Firestore bazi podataka.

1.
# FollowSugestionComponent

Komponenta koja prikazuje korisniku ostale korisnike preko pametnog algoritma koga može sljedeće zapratiti. Za praćenje se koristi komponenta **FollowButtonComponent**

![](RackMultipart20230924-1-i20a4k_html_367496c10404580c.png)

**Funckije**

**fetchAllUsers()** Dohvaća listu svih korisnika iz Firestore baze podataka.

**fetchUsersData()** Dohvaća podatke o trenutno prijavljenom korisniku iz Firestore baze podataka.

**findSimilarity()** Pronalazi sličnosti između trenutno prijavljenog korisnika i ostalih korisnika kako bi se predložili korisnici koje bi trenutno prijavljeni korisnik mogao početi pratiti.

**fetchProfileAvatar(user)** Dohvaća URL profilne slike određenog korisnika iz Firestore baze podataka.

**fetchUsersFollowing()** Dohvaća listu korisnika koje trenutno prijavljeni korisnik prati iz Firestore baze podataka.

**reFetchAllData()** Ponovno dohvaća sve potrebne podatke (poput svih korisnika, podataka o trenutno prijavljenom korisniku, listi koju korisnik prati i slično) kako bi se osvježili podaci za preporuke.

**updateData()** Pokreće ponovno dohvaćanje svih podataka kada korisnik interagira s komponentom (npr. klikom).

**goToProfileOnClick(username)** Preusmjerava korisnika na profil određenog korisnika kada korisnik klikne na profilnu sliku.

1.
# MessageSystemComponent

MessageSystemComponent je komponenta koja služi za komunikaciju sa drugim korisnicima. Moguće je slati i emotikone pomoću druge komponente **VemojiPicker**.

![](RackMultipart20230924-1-i20a4k_html_89cb3f31a1b238.png)

**Funkcije**

**checkIfFriendExists()** Provjerava postoji li korisnik koji se pokušava kontaktirati.

**checkIfMessagesDatabaseExists()** Provjerava postoji li baza podataka poruka za trenutno prijavljenog korisnika i njegovog prijatelja.

**createMessageDatabase()** Ako baza podataka poruka ne postoji, stvara je za oba korisnika.

**fetchMessageHistory()** Dohvaća povijest poruka iz baze podataka.

**sendMsgToFriend(message)** Šalje poruku prijatelju i ažurira bazu podataka poruka.

**saveMsgToUserDatabase(data)** Sprema poruku u lokalnu bazu podataka trenutnog korisnika.

**fetchChatsAvatars()** Dohvaća avatare korisnika u razgovoru.

**convertTimestamp(timestamp)** Pretvara vremenski žig u čitljiv format.

**toggleMarker()** Prebacuje između emoji ikone i mikrofona za unos poruka.

**clearCurrentMessage()** Briše trenutnu poruku nakon slanja.

**selectEmoji(emoji)** Dodaje odabrani emoji u trenutnu poruku.

1.
# NotificationMenuComponet

NotificationMenuComponet je komponenta za prikaz obavijesti kao što su: lajkove, komentare, lajkove na komentarima, zapratio, Sweet meet Match.

![](RackMultipart20230924-1-i20a4k_html_1c8cf30a5659d403.png)

**Funkcije**

**fetchNotificationsProfileAvatar(user)** Dohvaća URL profilske slike za određenog korisnika iz Firestore baze podataka.

**fetchNotifications()** Dohvaća obavijesti za trenutno prijavljenog korisnika iz Firestore baze podataka. Za svaku obavijest, dodaje URL profilske slike.

**checkForNewNotifications()** Provjerava ima li novih obavijesti za trenutno prijavljenog korisnika i ažurira popis obavijesti ako se broj obavijesti promijenio.

**clearNotifications()** Briše sve obavijesti za trenutno prijavljenog korisnika u Firestore bazi podataka.

**goToProfilePage(username)** Preusmjerava korisnika na stranicu profila određenog korisnika kada korisnik klikne na obavijest.

**PhoneNumberComponent**

PhoneNumberComponent je komponenta koja omogućuje unost i dizajn mobilnih brojeva. Glavna funkcija komponente je zapravo druga komponenta **VuePhoneNumberInput** što je izradio drugi korisnik louismazel.

![](RackMultipart20230924-1-i20a4k_html_123096525f52ce83.png)

1.
# ProfileCardComponet

Ova komponenta omogućava prikaz profila korisnika s informacijama kao što su ime, prezime, opis, broj pratitelja, broj korisnika koje prati i broj objavljenih postova. Također pruža mogućnost uređivanja profila (ako je korisnik administrator) i gumba za praćenje korisnika (ako nije prikazan poseban slučaj). Osim toga, omogućava se i prikaz profilske slike i pozadinske slike.

![](RackMultipart20230924-1-i20a4k_html_b258091e70c263bf.png)

**Funkcije**

Komponenta sama po sebi nema puno funkcija, nego se osljanja na dobivene informacije i postavlja ih u dizajn

1.
# SearchUserComponent

Ova komponenta omogućava korisnicima pretragu korisnika po korisničkim imenima i brzu navigaciju na profile korisnika koji se pronađu. Također koristi stvarne podatke iz baze podataka kako bi se stvorio popis stavki za automatski završetak.

![](RackMultipart20230924-1-i20a4k_html_f19e8581f4a254b7.png)

**Funkcije**

**fetchAllUsernames** : Pomoću ove metode komponenta dohvaća popis korisničkih imena iz baze podataka i ažurira itemArray s tim popisom.

**goToProfile** : Ova metoda se poziva kada korisnik pritisne ikonu za pretragu. Provjerava se ako je uneseno korisničko ime, a zatim se korisnika preusmjerava na odgovarajući profil, prazni se unos (username) i osvježava se stranica kako bi se omogućila nova pretraga.

1.
# SweetCardComponent

SweetCardComponent je komponenta koja je jedna od najvažnijih komponenti, Ova komponenta omogućava korisnicima pregled i interakciju s postovima, uključujući komentare i lajkove. Također, podržava funkcionalnost prijave korisnika i povezivanja s profilom drugog korisnika.

![](RackMultipart20230924-1-i20a4k_html_c1748904580b556c.png) **Funkcije**

**getPostData:** Dohvaća podatke o postu (broj komentara, broj lajkova, slika, opis) iz baze podataka.

**randomImageUrl:** Vraća nasumični URL slike ako je uključen debugMode.

**openOrCloseComments:** Otvora/zatvara prozor za komentare.

**likeBtn:** Postavlja/uklanja lajk za post i ažurira broj lajkova u bazi podataka.

**addNewComment:** Dodaje novi komentar na post i ažurira broj komentara u bazi podataka.

**getComments** : Dohvaća postojeće komentare s baze podataka.

**isPostAlreadyLiked** : Provjerava je li trenutni korisnik već lajkao post.

**isCommentAlreadyLiked** : Provjerava je li trenutni korisnik već lajkao određeni komentar.

**getUserProfilePicture** : Dohvaća URL profilne slike korisnika.

**sendNewNotificationToUser** : Šalje novu obavijest korisniku o interakcijama na postu.

**goToProfile** : Preusmjerava korisnika na profil drugog korisnika.

**changeLikeState** : Postavlja stanje lajka na komentar.

**updateComment** : Ažurira broj lajkova na komentaru.

**toggleCommentBtnColor** : Prebacuje boju gumba za lajk komentara

1.
# SweetCardDatingComponent

SweetCardDatingComponent je komponenta implementira dating aplikaciju za pronalaženje "soulmate-a". Korisnicima omogućava pregledavanje profila potencijalnih partnera, odobravanje ili odbacivanje. Komponenta također prati status soulmate-a (odobreni i odbijeni), prati podudaranja te koristi dizajn efekte poput konfeta za označavanje podudaranja.

**F ![](RackMultipart20230924-1-i20a4k_html_1832f5fb9ce44c19.png) unkcije**:

**fetchNewSoulmate:** Ova funkcija se poziva kada korisnik želi pronaći novog soulmate-a. Resetira neke vrijednosti i zatim poziva niz asinkronih funkcija za dohvat podataka o korisniku, statusu soulmate-a, svih korisničkih imena, pronalaženje soulmate-a, dohvat soulmate postova itd.

**fetchUserInformation:** Dohvaća informacije o trenutno prijavljenom korisniku iz Firestore baze podataka.

**fetchStatusOfSoulmates** : Dohvaća status (odobreni i odbijeni soulmates) za trenutno prijavljenog korisnika.

**fetchAllUsers:** Dohvaća popis svih korisničkih imena iz Firestore baze podataka.

**findSoulMate:** Pronalazi soulmate-a koji odgovara preferencijama trenutno prijavljenog korisnika. Provjerava razne uvjete poput spola, odbijenih i odobrenih soulmates-a i postojanja posta.

**calculateDistance** : Izračunava udaljenost između trenutnog korisnika i soulmate-a koristeći Haversinu formulu. Rezultat se prikazuje u kilometrima.

**getPostIDs** : Dohvaća ID-ove postova za određenog korisnika.

**approveSoulmate** : Dodaje soulmate-a u listu odobrenih.

**checkForMatchingSoulmates** : Provjerava ima li podudaranja između trenutnog korisnika i soulmate-a te šalje obavijest ako se podudaranje dogodilo.

**randomImageUrl** : Generira slučajnu URL adresu slike za debug mod.

**sendNewNotificationToUser** : Šalje novu obavijest korisniku.

**reportUser** : Koristi se za prijavljivanje korisnika.

**draggedRight** : Poziva se kad se korisnik "prevuče" prema desno (sviđa mu se soulmate).

**love** : Pokreće animaciju konfeta kad se podudaranje dogodi.

1.
# UploadPostComponent

UploadPostComponent je komponenta predstavlja dijalog prozor za dodavanje nove objave na platformu. Korisnik može odabrati sliku, unijeti opis i zatim je objaviti. Slika se učitava na Firebase Storage, nakon čega se dobiva njen URL koji se pohranjuje u bazu podataka zajedno s dodatnim informacijama o objavi poput broja lajkova, broja komentara i datuma objave. Komponenta također prikazuje trenutnu sliku koja je odabrana prije učitavanja.

![](RackMultipart20230924-1-i20a4k_html_ed6cb41ee09e8430.png)

**funkcije**

**getUserProfilePicture(user)**: Ova asinkrona funkcija dohvaća URL profilne slike korisnika. Prima korisničko ime (user) kao argument i koristi ga za dohvaćanje dokumenta u Firestore bazi podataka koji sadrži URL profilne slike. Ako dokument postoji, vraća URL slike. Ako ne postoji, vraća null.

**getCurrentDate()**: Ova funkcija vraća trenutni datum u formatu "dan.mjesec.godina". Koristi se za označavanje datuma objave. Međutim, trenutni datum nije ispravno dohvaćen. Trebalo bi se koristiti new Date().getDate() za dan, new Date().getMonth() + 1 za mjesec (jer se mjeseci broje od 0 do 11), i new Date().getFullYear() za godinu.

**UploadPost()**: Ova funkcija se poziva kada korisnik klikne na "Upload" gumb. Prvo postavlja vrijednost snackbar na suprotnu trenutnoj vrijednosti, što će prikazati obavijest o učitavanju slike. Zatim postavlja imageUrl na odabrani URL slike. Nakon toga, definira referencu na Firebase Storage lokaciju gdje će slika biti spremljena. Zatim učitava sliku na tu lokaciju, a kada je učitavanje završeno, dobiva URL slike i poziva funkciju savePostUrl() za pohranu informacija o objavi u Firestore.

**savePostUrl():** Ova asinkrona funkcija dodaje dokument s informacijama o objavi u Firestore bazu podataka.
