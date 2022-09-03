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
[Spotifys API](https://developer.spotify.com/documentation/web-api/) för att hitta låtar relaterade till den artist som
håller i evenemanget. Autentisering sköts av Emil Folinos [Auth API](https://auth.emilfolino.se/documentation.html).

## Arkitektur

Appen är byggd med ramverket React Native och 

### Vidareutveckling

* Koppla ihop appen med Spotify:s SDK för att kunna spela musiken direkt i appen, det vill säga utan redirect till
  Spotify. 
