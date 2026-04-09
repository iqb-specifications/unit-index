# Intro

Die folgende kurze Dokumentation dient der Verständigung über die Syntax der Unit-Xml und deren Bedeutung.

```xml
<?xml version="1.0"?>
<Unit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://w3id.org/iqb/spec/unit-xml/18.0-beta"
      id="M_MM5"
      uuid="b18e3b6c-ccb7-4308-b527-35e5e6ee2145"
      lastChange="2024-05-12T17:50:47.270Z">
    
    <Label>Eine tolle Aufgabe</Label>
    <Description>Test-Unit für Demo-Zwecke</Description>
    <MetadataRef type="metadata-values@iqb-standard@3.0"
                 lastChange="2024-05-11T11:50:47.270Z">
        M_MM5.vomd.json
    </MetadataRef>
    <UIDefinitionRef player="iqb-player-aspect@2.1"
                     editor="iqb-editor-aspect@2.6"
                     type="iqb-aspect@2.0"
                     lastChange="2025-05-12T17:50:47.270Z">
        M_MM5.voud.json
    </UIDefinitionRef>
</Unit>
```

# Metadaten der Unit

* Hauptelement-Attribut `id`: Id der Unit - wird durch den User vergeben
* Hauptelement-Attribut `uuid`: Universelle Id der Unit - wird automatisch vergeben. Die gesicherte Einmaligkeit hilft beim Wiederfinden von Varianten/Versionen einer Unit
* Hauptelement-Attribut `lastChange`: Markiert den Zeitpunkt der letzten Änderung für alle Daten, die kein gesondertes `lastChange`-Attribut haben.
* Die optionalen Tags `Label` und `Description` können Texte enthalten, die bei der Anzeige und der Verarbeitung der Unit genutzt werden. 
* Das Tag `MetadataRef` verweist auf eine JSON-Datei mit Metadaten. Über den Typ wird die Spezifikation referenziert (z. B. [metadata-values@iqb-standard@3.0](https://iqb-specifications.github.io/metadata-values/)).

# UI-Definition der Unit `UIDefinition`, `UIDefinitionRef`

Eine Unit benötigt eine Definition für die Darstellung und ggf. Interaktion durch die Testperson. Dafür gibt es die syntaktisch identischen Tags `UIDefinition` und `UIDefinitionRef`. Sie unterscheiden sich in der Interpretation des Strings innerhalb des Tags:

* `UIDefinition`: Es wird die Definition direkt in die Unit-Xml geschrieben.
* `UIDefinitionRef`: Die UI-Definition liegt als separate Datei vor. Als Inhalt des Tags wird ein Dateiname erwartet.

Folgende Attribute spezifizieren weitere Daten:

* `player`: Zur Anzeige in einem Verona-System muss ein zu der UI-Definition passender Player zur Verfügung stehen. Mit diesem Attribut wird die Id und ggf. die Version des Players angegeben.
* `editor`: Zum Editieren in einem Verona-System kann ein zu der UI-Definition passender Editor genutzt werden. Mit diesem Attribut wird die Id und ggf. die Version des Editors angegeben.
* `type`: Wenn die UI-Definition einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Dadurch kann ein alternativer Player oder Editor zugewiesen werden, falls der oben Genannte nicht gefunden wird. Außerdem kann diese Angabe helfen, Kompatibilitätsprobleme zu finden und zu beheben. 
* `lastChange`: Zeitpunkt der letzten Änderung

# Externe Datenblöcke

Das Suffix "Ref" zeigt an, dass es sich um eine externe Datei handelt. Der Dateiname findet sich im Tag-Inhalt. Es gibt jeweils zwei optionale Attribute:

* `type`: Die externe Datei folgt i.d.R. einer Spezifikation. Die Id und die Version können im `type`-Attribut angegeben werden und helfen, Kompatibilitätsprobleme zu finden und zu beheben.
* `lastChange`: Zeitpunkt der letzten Änderung

Folgende Datenblöcke werden auf diese Art von der Unit-Xml referenziert (alle optional):

| Tag           | Erläuterung                                                                                                                                                                                                                                            | Beispiele IQB                                                          |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `MetadataRef` | **Metadaten der Unit**: In einem standardisierten JSON-Format werden Verweise auf Vokabulare und Metadatenprofile gespeichert.                                                                                                                         | [Spezifikation](https://iqb-specifications.github.io/metadata-values/) |
| `ItemsRef`     | **Items**: Liste von Items mit Zuordnung von Variablen und Metadaten                                                                                                                                                                                   | [Spezifikation](https://iqb-specifications.github.io/unit-items/)      |
| `CodingSchemeRef`         | **Kodieranweisungen/Kodierschema**: Vorschriften, wie die Antworten der Unit zu kodieren sind.                                                                                                                                                         | [Spezifikation](https://iqb-specifications.github.io/coding-scheme/)   |
| `CommentsRef` | **Kommentare**                                                                                                                                                                                                                                         |                                                                        |
| `RichNotesRef` | **Formatierte Texte**                                                                                                                                                                                                                                  | [Spezifikation](https://iqb-specifications.github.io/unit-rich-notes/) |
| `VariablesRef` | **Variablen**: Es werden alle möglichen Variablen aufgeführt, die die Antwortwerte enthalten. Die JSON-Datei enthält zwei Einträge `baseVariables` und `derivedVariables`, jeweils ein Array der folgenden Datenstruktur | [Spezifikation](https://verona-interfaces.github.io/variable-info/)    |


# Abhängigkeiten `Dependencies`

Die Unit-Xml enthält bereits Namen von Dateien, die zusätzlich vorhanden sein müssen: Player, Editor, Unit-Kommentare usw. Darüber hinaus kann es weitere Dateien oder Dienste geben, die in einem bestimmten Zusammenhang für das Funktionieren der Unit oder die Verarbeitung der Antworten erforderlich sind. Das Tag `Dependencies` schließt Definitionen solcher Anhängigkeiten ein.

```xml
<?xml version="1.0"?>
<Unit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://w3id.org/iqb/spec/unit-xml/18.0-beta"
      id="M_MM5"
      uuid="b18e3b6c-ccb7-4308-b527-35e5e6ee2145"
      lastChange="2024-05-12T17:50:47.270Z">
    
    <Label>Eine tolle Aufgabe</Label>
    <Description>Test-Unit für Demo-Zwecke</Description>
    <UIDefinitionRef player="iqb-player-aspect@2.4"
                     editor="iqb-editor-aspect@2.4"
                     lastChange="2024-05-12T17:50:47.270Z">
        M_MM5.voud
    </UIDefinitionRef>
    <Dependecies>
        <File for="player">GeoGebra.itcr.zip</File>
    </Dependecies>
</Unit>
```

## Datei

Eine Abhängigkeit kann vom Typ `File` sein. Dann enthält der Tag-Inhalt einen Dateinamen. Das Attribut `for` gibt an, wofür diese Datei erforderlich ist. Mögliche Werte sind `player`, `editor`, `schemer`, `coder`.

## Dienst

Eine Abhängigkeit kann vom Typ `Service` sein. Dann enthält der Tag-Inhalt eine Url zum Dienst. Das Attribut `for` gibt an, wofür diese Datei erforderlich ist (mögliche Werte s. o.).
