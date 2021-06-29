## Projekt Öffnen und starten
Um das Projekt vollständig starten zu können, soll man den Projektordner mit einem beliebigen IDE öffnen und dann starten.(index.html==>"open with live server")

##
In diesem Projekt habe ich mit einer kostenlosen IMDB-API gearbeitet.
Der Projektordner besteht aus einer einfachen HTML-Datei, die nur die grundlegenden Elemente und Container-Divs enthält. Ich habe die Javascript-Dateien nach ihrer Funktionalität aufgeteilt und dem HTML hinzugefügt. Um die Webseite zu stylen, habe ich eine CSS-Datei verwendet.

## requestSender-Funktion-Kommunikations-API
Zunächst habe ich eine Funktion erstellt, um eine Anfrage an die API zu senden. Diese Funktion akzeptiert zwei Argumente: URL und Methode. Als normale Abrufanforderung sendet sie asynchron eine Anforderung und empfängt eine Antwort im JSON-Format. Im Block "t_h_e_n" habe ich die Antwort in ein normales Javascript-Objekt umgewandelt. Da es auch asynchron ist, wurde auch der zweite Teil "t_h_e_n" benötigt, um das Endergebnis zu erhalten.
Nachdem ich die Funktion requestSender erstellt hatte, habe ich sie überall dort verwendet, wo ich die API mit der entsprechenden URL und Methode kommunizieren möchte (immer GET).

## Durchsuchen von Filmen durch Klicken auf die Genres
Wenn die Funktion getGenres aufgerufen wird(onLoad), werden die von der API bereitgestellten Genres abgerufen (da für einige Genres kein Film bereitgestellt wird, habe ich einige davon nicht in der Navigationsleiste angezeigt). Durch Klicken auf jedes Listenelement (Genre) in der Navigationsleiste wird eine Verbindung zur API hergestellt, um die Filme in diesem Genre mithilfe der Funktion getMoviesByGenre abzurufen. Diese Funktion sendet eine Anfrage an die API, um Filme mit dem ausgewählten Genre abzurufen. Entsprechend der Anzahl der Filme, die API anbietet, erstellt es eine leere Karte für jeden Film und zeigt jedes Mal 20 Karten an (wiederholt den gleichen Vorgang, wenn die Schaltfläche Mehr gedrückt wird) (Ausführen der Funktionen createCards und createSingleCard). Nachdem leere Karten erstellt und ihrer ID die Eigenschaft imdb_id zugewiesen wurde, ruft sie die Funktion getMovieById auf, kommuniziert die API, ruft Informationen ab und hängt sie gemäß der IMDB-ID an div an.

## Suche nach Filmen durch Eingabe ihrer Titel
Ein weiterer Dienst, den die Website anbietet, ist die Suche nach einem Film durch Eingabe seines Titels. Die GetInput-Funktion fügt der Suchschaltfläche ein onclick-Ereignis hinzu, sodass der Benutzer beim Klicken auf die Suchschaltfläche mithilfe der Funktion getMovieIDsByTitle eine Verbindung zur API herstellt und die ID des Films erhält, die die eingegebenen Wörter im Titel enthält. Dann erstellt es mit der Funktion createSingleCard die Karten dieser Filme.#   m o v i e S e a r c h e r  
 