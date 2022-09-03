# MusicFinder

## Specifikation

Med MusicFinder kan du leta efter musikevenemang nära dig och spela upp musiken från de bokade artisterna i samma app!
MusicFinders vision är att ge våra användare möjligheten att upptäcka ny musik som man dessutom kan gå och se live inom
kort. Har du någon gång varit med om att du hittar en ny artist som du gillar, kollar om de ska spela i din närhet snart
och ser att du är ute en vecka för sent? Vi också! Med MusicFinder blir det tvärtom - du hittar musiken och spelningarna
i samma app.

## Datakällor

MusicFinder använder sig
av [Ticketmasters API](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)
för att hitta evenemang och information om dessa. När man sedan navigerar in i ett specifikt evenemang kallas
[Spotifys API](https://developer.spotify.com/documentation/web-api/) för att hitta länken till artisten som
håller i evenemanget. Autentisering sköts av Emil Folinos [Auth API](https://auth.emilfolino.se/documentation.html).

## Arkitektur

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
