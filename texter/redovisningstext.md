    För varje krav du implementerat skriver du ett textstycke som uppfyller kravet. Poängsättningen tar sin start i din text
    så se till att skriva väl för att undvika poängavdrag. Missar du att skriva/dokumentera din lösning så blir det 0 poäng.
    Du kan inte komplettera en inlämning för att få högre betyg.
    
    Skriv ett allmänt stycke om hur projektet gick att genomföra. Problem/lösningar/strul/enkelt/svårt/snabbt/lång tid, etc.
    Var projektet lätt eller svårt? Tog det lång tid? Vad var svårt och vad gick lätt? Var det ett bra och rimligt projekt
    för denna kursen?
    
    Avsluta med ett sista stycke med dina tankar om kursen och vad du anser om materialet och handledningen (ca 5-10
    meningar). Ge feedback till lärarna och förslå eventuella förbättringsförslag till kommande kurstillfällen. Är du
    nöjd/missnöjd? Kommer du att rekommendera kursen till dina vänner/kollegor? På en skala 1-10, vilket betyg ger du
    kursen?

# MusicFinder

## Krav 1

### Specifikation

Med MusicFinder kan du leta efter musikevenemang nära dig och spela upp musiken från de bokade artisterna i samma app!
MusicFinders vision är att ge våra användare möjligheten att upptäcka ny musik som man dessutom kan gå och se live inom
kort. Har du någon gång varit med om att du hittar en ny artist som du gillar, kollar om de ska spela i din närhet snart
och ser att du är ute en vecka för sent? Vi också! Med MusicFinder blir det tvärtom - du hittar musiken och spelningarna
i samma app.

### Datakällor

MusicFinder använder sig
av [Ticketmasters API](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)
för att hitta evenemang och information om dessa. När man sedan navigerar in i ett specifikt evenemang kallas
[Spotifys API](https://developer.spotify.com/documentation/web-api/) för att hitta länken till artisten som
håller i evenemanget. Autentisering sköts av Emil Folinos [Auth API](https://auth.emilfolino.se/documentation.html).

### Arkitektur

Appen är byggd med ramverket React Native och Expo, en verktygslåda som hjälper till med utveckling för
mobila enheter. Ett antal paket och komponenter är installerade, bland annat sådana som tillhandahåller plats- och
kartverktyg. För testning används jest. Katalogstrukturen för koden ser ut såhär:

```
proj
  __test__
  assets
  components
    Event
    Home
    MapView
    SearchView
    User
  constants
  hooks
  interface
  models
  styles
    variables
```

- **__test__** innehåller tester.
- **assets** innehåller de bilder som används.
- **components** innehåller egengjorda komponenter.
    - **Event** innehåller komponenter som är relaterade till att visa upp evenemangen för en särskild artist eller ett
      särskilt evenemang.
    - **Home** innehåller komponenter som är relaterade till hemskärmen, dvs. all kod för karusell-vyerna, headern osv.
    - **MapView** innehåller navigeringen för kartvyn.
    - **SearchView** innehåller komponenter som är relaterde till sökvyn.
    - **User** innehåller komponenter som har hand om inloggning, registrering och att visa upp användarens sparade event.
- **constants** innehåller exporterade variabler som andra komponenter behöver, främst api-nycklar.
- **hooks** innehåller funktioner som används av useEffects i App.tsx.
- **interface** innehåller mallar för hur vissa objekt ser ut.
- **models** innehåller objekt med metoder som relaterar till ett särskilt ämne. Dessa sköter exempelvis
  uppkopplingen mot API'n, användarautentisering och gör data mer läsbar.
- **styles/variables** innehåller konstanter som används för att styla de olika komponenterna.


## Krav 2
När jag inledde med arbetet med MusicFinder var min ambition att folk som är intresserade av musik lättare skulle 
kunna hitta okända artister som man inte känner till. Efter att ha bott i stora städer (Melbourne, Berlin) vet jag hur 
svårt det kan vara att hitta nya, intressanta artister i det brus av kulturella evenemang som alltid pågår. Jag 
bestämde mig tidigt att använda Spotifys API för att kunna ge användaren en chans att lyssna på artisten som har 
spelningen. Att hitta en öppen API med evenemang var svårare, men jag landade till slut i att använda Ticketmasters 
API då de har en relativt stor databas av evenemang och ger responser med en stor mängd data som kan användas. 

Det tog inte särskild lång tid innan jag förstod att det skulle vara svårare än vad jag trodde att uppfylla min 
ursprungliga ambition. Problemet med att använda Ticketmasters API är att de evenemang som visas upp måste sälja 
biljetter genom Ticketmaster. Man fångar alltså bara in en bråkdel av de evenemang som sker i ett visst område. 
Överlag är de evenemang som Ticketmaster säljer evenemang till artister som redan är relativt stora och till 
konserter som sker i storstäder. Samtidigt tror jag att det jag är ute efter - ett API som främjar kulturella 
snarare än kommersiella intressen - knappast existerar, i alla fall på global skala. Det blev därför en bra 
kompromiss att använda Ticketmasters API för att öva sig på hur man skulle kunna utveckla en mer komplett app av det 
här slaget.

Det finns några andra saker jag gärna hade vidareutvecklat, något jag kanske kommer göra i framtiden också om andan 
faller på. Just nu är den lite tunn ur vissa synvinklar. Den presenterar evenemang som är nära en geografiskt och i 
tid, men användaren har ingen möjlighet att filtrera evenemang efter exempelvis genre eller datum, utan har bara en 
ganska primitiv sökfunktion. Jag skulle därför vilja introducera en vy där användaren själv kan filtrera 
sökresultaten efter ett antal kriterier.

Ett annat problem med appen är att den i vissa fall visar samma artist flera gånger i hemvyn om de har flera 
evenemang nära varandra. Tanken är egentligen att användaren ska få olika artister presenterade. Det borde gå att lösa 
ganska enkelt, men jag har inte haft tid att lösa det. Eftersom jag enligt krav 3 har matchat designen med 
TicketMaster blir vyn kanske inte riktigt optimal för just min app heller. 

För att göra upplevelsen av att använda appen för att leta efter ny musik mer hel hade jag gärna vidareutvecklat 
appen för att implementera Spotifys SDK utöver deras API. Då hade användaren kunnat spela musik direkt från appen, 
lägga till artister i spellistor och man kan använda fler av Spotifys datapunkter. Det kändes dock som att det inte 
riktigt var i uppgiftens scope, så jag har inte försökt mig på det under utvecklingen.

## Krav 3
För detta kravet valde jag att matcha designen på Ticketmasters app, eftersom de hade relativt liknande vyer som jag 
tänkte ha och samtidigt använder samma data som jag använder. Appen ser ut såhär:

Detta är mina versioner av vyerna ovan:


För att kopiera Ticketmasters design har det varit mycket trial and error. Jag har hittat ett typsnitt som var 
hyfsat likt det de använder (deras typsnitt är inte öppen licens) och har använt ColorZilla för att identifera vilka 
färger de använder. För att positionera element har jag undvikit att använda absoluta värden. Jag hämtar istället 
dimensionerna på användarens enhet och positionerar elementen relativt efter det. Detsamma gäller storleken på såväl 
element som typsnitt. För att skala typsnitt har jag använt paketet react-native-relative-fontsize.

## Krav 4
Appen har login- och registreringsfunktionalitet och användaren kan lägga till/ta bort favoritevenemang som visas 
under "Mina sidor". Auth-API't använder JWT för autentisering. En token genereras vid login och sparas i 
AsyncStorage. Den används sedan för autentisering av användaren så länge den är giltig eller tills användaren loggar 
ut, då den förstörs.

## Krav 5
Kartvyer finns på tre ställen i appen. Ens egen position visas i alla tre vyer. Kartvyerna är dels den generalla 
kartvyn, som visar evenemang nära en i tid och rum. Det finns även en kartvy som visar en artists evenemang och 
slutligen en som visar platsen för ett specifikt evenemang. Alla använder samma komponent, MapViewComp, som använder 
sig av react-native-maps för att visa upp kartan med de olika positionerna för evenemangen. Expo-location används 
för att hämta information om användarens position. 

## Krav 6
Några enkla test går att köra genom att stå i hemkatalogen och köra kommandot "npm test". Testerna är skrivna i 
testramverket jest. Testerna som körs är:

* EventPressable.test.js
  * Testar att de tryckbara komponenterna som visas i karuseller i hemvyn visar upp rätt information.
* HomeHeaderLoggedIn.test.js
  * Testar att headern i hemvyn visar rätt information när en användare är inloggad.
* HomeHeaderLoggedOut.test.js
  * Testar att headern i hemvyn visar rätt information när en användare är utloggad.
* Login.test.js
  * Testar att login-formuläret laddas på rätt sätt.
* Register.test.js
  * Testar att registrerings-formuläret laddas på rätt sätt.
* SingleEvent.test.js
  * Testar att rätt information visas upp om ett evenemang i SingleEvent-vyn.

## Allmänt om projektet

