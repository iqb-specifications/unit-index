[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

This is the specification of the data index of an assessment unit as used in IQB applications.

Read more:

* [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
* [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)
* [Verona-Interfaces](https://verona-interfaces.github.io/)

Change log see releases.

<hr/>
Achtung: Spezifikation und Dokumentation befinden sich derzeit in Überarbeitung. Für die wichtigsten Änderungen beim Wechsel vom XML- zum JSON-Format siehe [unten](https://github.com/iqb-specifications/unit-index?tab=readme-ov-file#Vergleich-zur-XML-Version)!

# Kurzdokumentation

Leistungstests und Befragungen sind im Kontext von [TBA](https://iqb-berlin.github.io/tba-info/) Folgen von Units. Eine Unit soll mit ihren Daten zunächst unabhängig von einer Testdurchführung entwickelt werden. Die Platzierung in Tests erfolgt zu einem späteren Zeitpunkt. Es soll dann sehr einfach sein, eine Unit in einem anderen Test einzusetzen.

Eine Unit wird über einen Index und separate Datenblöcke definiert. Die Datenblöcke und eventuelle weitere Abhängigkeiten sind im Index genannt. Es handelt sich beim Index und den separaten Datenblöcken um **Dateien**. Ein Transport bzw. Austausch von Units bedeutet also i.d.R. Dateitransfer.

Um eine hohe Flexibilität zu ermöglichen, ist hier nur der Index spezifiziert. Obwohl es für viele Datenblöcke erprobte Datenstrukturen gibt, sind die Datenblöcke nicht streng spezifiziert. Statt dessen ist im Index der Typ (Id und Version) genannt, wodurch sich ein verarbeitendes System auf Varianten der Datenstrukturen einstellen kann. Über diese Verfahrensweise können sich die Datenstrukturen der separaten Blöcke unabhängig vom Index weiterentwickeln.

```json
{
    "id": "ME2236a01",
    "uuid": "https://w3id.org/iqb/unit/e4r5t6z7",
    "modifiedAt": "2026-04-09T13:15:10.977Z",
    "label": "Ein wunderbarer Ausflug",
    "userInterface": {
        "player": "verona-player-simple@6.0",
        "definition": "<p>Bitte warte auf Anweisungen der Testleitung!</p>",
        "isDefinitionInline": true
    }
}
```

Das obige Beispiel zeigt eine Minimalvariante einer Unit-Definition: Es gibt nur die Index-Datei, und die Definition des User Interfaces ist nicht extern geführt, sondern wird inline übergeben.

## Allgemeine Daten

* `id`: Id der Unit - wird durch den User vergeben
* `uuid`: Universelle Id der Unit - wird automatisch vergeben. Die gesicherte Einmaligkeit hilft beim Wiederfinden von Varianten/Versionen einer Unit
* `modifiedAt`: Markiert den Zeitpunkt der letzten Änderung der Index-Daten. Sollte sich ein externer Datenblock ändern, wird dessen `modifiedAt`-Wert neu gesetzt, aber der `modifiedAt`-Wert für den Index ändert sich nicht.
* Die optionalen Werte für `label` und `description` können Texte enthalten, die bei der Anzeige und der Verarbeitung der Unit genutzt werden.
* Hinweis: Über den externen Datenblock `metadata` können weitere Unit-Metadaten übergeben werden (s. u.).

## Abhängigkeiten/dependencies

In diesem Dokument werden an mehreren Stellen Abhängigkeiten definiert. Das sind Referenzen zu Ressourcen, die notwendig sind für die entsprechende Funktion. Es handelt sich stets um ein Array, das mehrere Typen als Einträge haben kann:

* **Datei**: Folgende Eigenschaften spezifizieren diese Datei:
  - `fileName`: Name der Datei relativ zur Index-Datei (erforderlich)
  - `unpackBeforeProviding`: Der Zugriff (Request) erfolgt nicht auf die Datei selbst, sondern es handelt sich um ein Datei-Archiv mit mehreren Dateien. Dieses Archiv (z. B. ZIP) muss erst ausgepackt werden, und der Zugriff erfolgt dann auf eine dieser Dateien. Der Typ des Archives ist standardmäßig zip (Steuerung ggf. über Dateiendung).
  - `httpResponseMode`: Bei der Auslieferung können Sets von Parametern die Performance verbessern. Beim Modus `STREAM` sollte beispielsweise eine variable Bitrate bei der multipart-Auslieferung eingestellt werden. `STANDARD` wäre ein normales GET.
* **Widget**: Es wird nur ein String übergeben, der den Typ des [Verona-Widgets](https://verona-interfaces.github.io/widget-docs/) angibt. Es wird bei Widgets kein spezifisches Modul angegeben, sondern es muss irgendein Modul dieser Art verfügbar sein.

## UI-Definition `userInterface`

Eine Unit benötigt eine Definition für die Darstellung und ggf. Interaktion durch die Testperson.

* `player`: Zur Anzeige in einem Verona-System muss ein zu der UI-Definition passender Player zur Verfügung stehen. Mit diesem Attribut wird die Id und ggf. die Version des Players angegeben.
* `editor`: Zum Editieren in einem Verona-System kann ein zu der UI-Definition passender Editor genutzt werden. Mit diesem Attribut wird die Id und ggf. die Version des Editors angegeben.
* `type`: Wenn die UI-Definition einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Dadurch kann ein alternativer Player oder Editor zugewiesen werden, falls der oben Genannte nicht gefunden wird. Außerdem kann diese Angabe helfen, Kompatibilitätsprobleme zu finden und zu beheben.
* `definition`: Hier ist die eigentliche UI-Definition zu finden, die der Player für die Präsentation und ggf. Interaktion bekommen soll. Es kann sich hier um einen Dateinamen handeln mit diesem Inhalt oder um die (maskierte/stringified) Definition selbst. Die Unterscheidung wird über den Schalter `isDefinitionInline` getroffen.
* `isDefinitionInline`: Legt fest, wie die Eigenschaft `definition` zu interpretieren ist. Wenn false (Default-Wert), dann ist dort ein Key als externer Datenblock gespeichert. Wenn true, dann ist der Inhalt von `definition` direkt die UI-Definition. Hinweis: Es kann auch Player geben, die keine UI-Definition benötigen, wie z. B. kleine Spiele, die in den Testverlauf eingestreut werden. Dann fehlt `definition` oder ist leer.
* `modifiedAt`: Zeitpunkt der letzten Änderung
* `playerDependencies`, `editorDependencies`: Abhängigkeiten, die für die Funktionalität des Players bzw. Editors bereitgestellt werden müssen.

## Externe Datenblöcke

Die folgende Tabelle listet alle möglichen externen Datenblöcke. Es handelt sich jeweils um dieselbe Datenstruktur:

* `id`: Dieser String wird genutzt, um den Datenblock zu finden. Es handelt sich üblicherweise um den Namen einer Datei, die im selben Verzeichnis liegt wie die Index-Datei.
* `type`: Die externe Datei folgt i.d.R. einer Spezifikation. Die Id und die Version können im `type`-Attribut angegeben werden und helfen, Kompatibilitätsprobleme zu finden und zu beheben. Bei allen Datenblöcken gibt es einen Default-Typ (s. u.).
* `modifiedAt`: Zeitpunkt der letzten Änderung
* `dependencies`: Abhängigkeiten, die ggf. für die Verwendbarkeit des Datenblockes bereitgestellt werden müssen.

Folgende Datenblöcke werden auf diese Art referenziert:

| Tag           | Erläuterung                                                                                                                                                                                                              | Default                                       | Konvention Dateiname                  |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|------------|
| `codingScheme`         | **Kodieranweisungen/Kodierschema**: Vorschriften, wie die Antworten der Unit zu kodieren sind. | [iqb-coding-scheme](https://iqb-specifications.github.io/coding-scheme/)   | *.vocs.json |
| `comments` | **Kommentare**: Formatierte hierarchische Texte (Html ggf. mit eingebetteten Bildern) zur Diskussion während der Entwicklungszeit  | [iqb-unit-comments](https://iqb-specifications.github.io/unit-comments/)   | *.voco.json |
| `richNotes` | **Formatierte Texte/ Begleitmaterial**: Formatierte Texte (Html ggf. mit eingebetteten Bildern) mit unterschiedlichen Verwendungszwecken (z. B. didaktische Kommentare, Transcript) und Links.  | [iqb-unit-rich-notes](https://iqb-specifications.github.io/unit-rich-notes/) |  *.vorn.json |
| `metadata` | **Metadaten der Unit**: In einem standardisierten JSON-Format werden Verweise auf Vokabulare und Metadatenprofile gespeichert.  | [metadata-values](https://iqb-specifications.github.io/metadata-values/) | *.vomd.json |
| `items`     | **Items**: Liste von Items mit Metadaten und Zuordnung von Variablen  | [iqb-unit-items](https://iqb-specifications.github.io/unit-items/)  | *.voit.json |
| `variables` | **Variablen**: Es werden alle möglichen Variablen aufgeführt, die die Antwortwerte enthalten. Die JSON-Datei enthält zwei Einträge `baseVariables` und `derivedVariables`, jeweils ein Array der folgenden Verona-Datenstruktur | [variable-info](https://verona-interfaces.github.io/variable-info/)    | *.vova.json |


# Änderungen gegenüber der XML-Version

Das XML-Format für die Unit wurde 2017 eingeführt. Seitdem hat das JSON-Format stark an Bedeutung in der Entwicklung vor allem von Webanwendungen gewonnen. Die Unterstützung in Programmiersprachen und in Entwicklungstools wurde sehr verbessert. Keiner der inzwischen eingeführten externen Datenblöcke für eine Unit ist in XML formuliert.

Da mit der Änderung des Formates erhebliche Umstellungsarbeiten in den Programmierungen verbunden sind, liegt es nahe, die Gelegeheit auch für die Optimierung von Datenstrukturen zu nutzen. Folgende teilw. konzeptuelle Änderungen sind mit der Umstellung verbunden:

## Geändert

* Die Metadaten sind aufgeteilt in die fixen Eigenschaften `id`, `uuid`, `label`, `modifiedAt` und `description` einerseits und einem externen Datenblock `metadata` andererseits. Letzterer folgt den im TBA-System des IQB etablierten Datenstrukturen.
* Die alte externe JSON-Datenstruktur `Metadata/Reference` war ein Mix aus Unit-Metadaten und Items mit ihren Metadaten. Dies ist aufgelöst in (a) externer Datenblock für Unit-Metadaten und (b) externer Datenblock für Items mit eigener Spezifikation.
* Unit-Definition
  - Die Benennung `Definition` ist zu allgemein und wurde in `userInterface` gesetzt, da es sich hier um die Definition der Präsentation und Interaktion handelt.
  - Der "Inhalt" der UI-Definition wurde getrennt von den anderen UI-Eigenschaften. Es kann ein Player definiert werden, auch wenn es keine UI-Definition im eigentlichen Sinne gibt (z. B: Minispiel-Player ohne Parameter).
* Der Schemer wird nicht mehr explizit zugewiesen. Da absehbar stets nur die aktuelle Version des IQB-Schemers genutzt wird, ist statt dessen `type` zu nutzen, wenn man etwas anderes möchte. Es ist sehr unwahrscheinlich, dass man eine frühere Schemer-Version braucht.
* Die Abhängigkeiten sind keine eigene Liste mehr, sondern zu den Orten gewandert, in denen sie jeweils relevant sind.
* Die Variablen können jetzt - da sie ein externer Datenblock sind - direkt der JSON-Verona-Spezifikation folgen.

## Hinzugefügt

* Speicherung von Kommentaren, die z. B. in der Entwicklungsumgebung IQB-Studio vergeben wurden
* Speicherung von formatierten Texten (rich notes), mit denen Transripte und didaktische Kommentierungen implementiert werden können (Text, Bilder, Links)
* die Daten eines Items enthalten jetzt die Möglichkeit, neben der Quellvariable eine weitere Variable zu nennen, die für die Anzeige des Items genutzt werden kann (visualAnchorVariable)
* die Unit erhält eine `uuid`
