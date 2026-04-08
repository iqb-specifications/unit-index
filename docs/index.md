# Intro

Die folgende kurze Dokumentation dient der Verständigung über die Syntax der Unit-Xml und deren Bedeutung.

```xml
<?xml version="1.0"?>
<Unit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://w3id.org/iqb/spec/unit-xml/18.0-beta"
      id="M_MM5"
      uuid="aisj-dioasjfwe-oidho-sihf-sodis-sisiske"
      lastChange="2024-05-12T17:50:47.270Z">
    
    <Label>Eine tolle Aufgabe</Label>
    <Description>Test-Unit für Demo-Zwecke</Description>
    <UIDefinitionRef player="iqb-player-aspect@2.4"
                     editor="iqb-editor-aspect@2.4"
                     lastChange="2024-05-12T17:50:47.270Z">
        M_MM5.voud
    </UIDefinitionRef>
    <CommentsRef lastChange="2024-05-11T11:50:47.270Z">
        M_MM5.vouc
    </CommentsRef>
</Unit>
```

# Attribute des Haupt-Tags `Unit`

* `id`: Id der Unit - wird durch den User vergeben
* `uuid`: Universelle Id der Unit - wird automatisch vergeben. Die gesicherte Einmaligkeit hilft beim Wiederfinden von Varianten/Versionen einer Unit
* `lastChange`: Markiert den Zeitpunkt der letzten Änderung für alle Daten, die kein gesondertes `lastChange`-Attribut haben.

# Allgemeine Angaben `Label`, `Description` 

Diese beiden Tags sind optional und helfen bei der Zuordnung der Unit

# Datenblöcke

## UI-Definition der Unit `UIDefinition`, `UIDefinitionRef`

Eine Unit benötigt eine Definition für die Darstellung und ggf. Interaktion durch die Testperson. Dafür gibt es die syntaktisch identischen Tags `UIDefinition` und `UIDefinitionRef`. Sie unterscheiden sich in der Interpretation des Strings innerhalb des Tags:

* `UIDefinition`: Es wird die Definition direkt in die Unit-Xml geschrieben.
* `UIDefinitionRef`: Die UI-Definition liegt als separate Datei vor. Als Inhalt des Tags wird ein Dateiname erwartet.

Folgende Attribute spezifizieren weitere Daten:

* `player`: Zur Anzeige in einem Verona-System muss ein zu der UI-Definition passender Player zur Verfügung stehen. Mit diesem Attribut wird die Id und ggf. die Version des Players angegeben.
* `editor`: Zum Editieren in einem Verona-System kann ein zu der UI-Definition passender Editor genutzt werden. Mit diesem Attribut wird die Id und ggf. die Version des Editors angegeben.
* `type`: Wenn die UI-Definition einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Dadurch kann ein alternativer Player oder Editor zugewiesen werden, falls der oben Genannte nicht gefunden wird. Außerdem kann diese Angabe helfen, Kompatibilitätsprobleme zu finden und zu beheben. 
* `lastChange`: Zeitpunkt der letzten Änderung

## Items und Metadaten `MetadataRef`

Eine separate Datei enthält die Daten für die in der Unit enthaltenen Items. Außerdem sind Metadaten der Unit insgesamt und jedes einzelnen Items gespeichert. Die separate Datei ist gesondert spezifiziert. Es sind folgende Attribute des Tags verfügbar:

* `type`: Wenn die externe Metadaten-Datei einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Diese Angabe kann helfen, Kompatibilitätsprobleme zu finden und zu beheben.
* `lastChange`: Zeitpunkt der letzten Änderung

## Kodieranweisungen/Kodierschema `CodingSchemeRef`

Eine separate Datei enthält die Daten für die automatische und/oder manuelle Kodierung der Antworten aller Items der Unit. Die Datei ist gesondert spezifiziert. Es sind folgende Attribute des Tags verfügbar:

* `schemer`: Zur Anzeige und zum Ändern in einem Verona-System kann ein zum Kodierschema passender Schemer zur Verfügung stehen. Mit diesem Attribut wird die Id und ggf. die Version des Schemers angegeben.
* `type`: Wenn die externe Kodierschema-Datei einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Diese Angabe kann helfen, Kompatibilitätsprobleme zu finden und zu beheben.
* `lastChange`: Zeitpunkt der letzten Änderung

## Formatierte Texte `RichNotesRef`

Eine separate Datei enthält die Daten für die zusätzliche formatierte Texte, die für die Unit bereitgestellt werden können. Eine gesonderte Liste von Schlüsselworten unterstützt bei der Interpretation bzw. Verwendung. Die Datei ist gesondert spezifiziert. Es sind folgende Attribute des Tags verfügbar:

* `type`: Wenn die externe Text-Datei einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Diese Angabe kann helfen, Kompatibilitätsprobleme zu finden und zu beheben.
* `lastChange`: Zeitpunkt der letzten Änderung

## Kommentare `CommentsRef`

Eine separate Datei enthält Kommentare, die während der Entwicklungszeit der Unit vergeben wurden. Die Datei ist gesondert spezifiziert. Es sind folgende Attribute des Tags verfügbar:

* `type`: Wenn die externe Kommentare-Datei einer Spezifikation folgt, kann die Id und die Version dieser Spezifikation angegeben werden. Diese Angabe kann helfen, Kompatibilitätsprobleme zu finden und zu beheben.
* `lastChange`: Zeitpunkt der letzten Änderung

# Variablen

Für die Konfiguration der Antwortverarbeitung ist es erforderlich, Informationen über die Variablen in die Unit-Xml mit aufzunehmen. Eine Variable ist eine Datenstruktur, die den Wert einer Interaktion der Testperson mit der Unit - sog. Antwort - beschreibt. Wir unterscheiden **Basisvariablen** für die Antworten, die unmittelbar aus der Interaktion stammen, und **abgeleitete Variablen** für Antwortwerte, die aus einer Kombination von Werten der Basisvariablen ermittelt wurden.

Im Datenmodell können diese Variablen grundsätzlich durch die UI-Definition festgelegt sein oder durch das Kodierschema. Wenn man diese beiden Datenstrukturen kennt, könnte man die Variablen-Informationen auch daraus ableiten. Da aber diese Datenstrukturen nicht zwingend spezifiziert sind und mitunter auch sehr komplex sein können, enthält die Unit-Xml eine separate Deklaration der Variablen. Folgende Informationen sind gespeichert:

```xml
<Unit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://w3id.org/iqb/spec/unit-xml/18.0-beta"
      id="M_MM5"
      uuid="aisj-dioasjfwe-oidho-sihf-sodis-sisiske"
      lastChange="2024-05-12T17:50:47.270Z">

    <Label>Eine tolle Aufgabe</Label>
    <Description>Test-Unit für Demo-Zwecke</Description>
    <UIDefinitionRef player="iqb-player-aspect@2.4"
                     editor="iqb-editor-aspect@2.4"
                     lastChange="2024-05-12T17:50:47.270Z">
        M_MM5.voud
    </UIDefinitionRef>
    <BaseVariables>
        <Variable id="01a" type="integer" format="" nullable="false" multiple="false" page="">
            <Values complete="true">
                <Value>
                    <label>stimmt</label>
                    <value>1</value>
                </Value>
                <Value>
                    <label>stimmt nicht</label>
                    <value>2</value>
                </Value>
            </Values>
        </Variable>
        <Variable id="01b" type="integer" format="" nullable="false" multiple="false" page="">
            <Values complete="true">
                <Value>
                    <label>stimmt</label>
                    <value>1</value>
                </Value>
                <Value>
                    <label>stimmt nicht</label>
                    <value>2</value>
                </Value>
            </Values>
        </Variable>
        <Variable id="01c" type="integer" format="" nullable="false" multiple="false" page="">
            <Values complete="true">
                <Value>
                    <label>stimmt</label>
                    <value>1</value>
                </Value>
                <Value>
                    <label>stimmt nicht</label>
                    <value>2</value>
                </Value>
            </Values>
        </Variable>
    </BaseVariables>
    <DerivedVariables>
        <Variable id="01VOLLX" type="integer" format="" nullable="false" multiple="false"/>
    </DerivedVariables>
</Unit>
```
* `id`: Interne dauerhafte Bezeichnung der Variable. Wird in Abhängigkeiten verwendet.
* `alias`: Angezeigte Id, die sich ändern kann.
* `type`: Datentyp des Antwortwertes. Mögliche Werte: `string`, `integer`, `number`, `boolean`, `attachment`, `json`, `no-value`
* `format`: Spezifiziert innerhalb des Typs weitere Varianten, die bei der Antwortverarbeitung berücksichtigt werden können. Mögliche Werte: `text-selection`, `image`, `capture-image`, `audio`, `ggb-file`, `non-negative`; die Liste ist nicht ausschließend, d. h. es können auch weitere Formatangaben neu eingeführt werden, ohne dass die XML invalide wird.
* `nullable`: Wenn `true`, dann kann zusätzlich auch der Wert NULL vorkommen.
* `multiple`: Wenn `true`, dann handelt es sich nicht um einen einzelnen Antwortwert, sondern um ein Array des oben genannten Typs.
* `page`: Seite innerhalb der UI-Definition, die aufgerufen werden soll, wenn jemand sich den Ort der Interaktion anschauen will 
* `visualAnchor`: Ein DOM-Element der UI-Definition kann ein Attribut `verona-visualAnchor` mit dem Wert haben, der hier bei der Variable hinterlegt ist. Wenn jemand sich den Ort der Interaktion anschauen will, kann diese Markierung genutzt werden

## Basisvariablen `BaseVariables`

Dieses Tag schließt eine Liste für Daten für Basisvariablen ein (s. o.). 

## Abgeleitete Variablen `DerivedVariables`

Dieses Tag schließt eine Liste für Daten für abgeleitete Variablen ein (s. o.).

# Abhängigkeiten `Dependencies`

Die Unit-Xml enthält bereits Namen von Dateien, die zusätzlich vorhanden sein müssen: Player, Editor, Unit-Kommentare usw. Darüber hinaus kann es weitere Dateien oder Dienste geben, die in einem bestimmten Zusammenhang für das Funktionieren der Unit oder die Verarbeitung der Antworten erforderlich sind. Das Tag `Dependencies` schließt Definitionen solcher Anhängigkeiten ein.

```xml
<?xml version="1.0"?>
<Unit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="https://w3id.org/iqb/spec/unit-xml/18.0-beta"
      id="M_MM5"
      uuid="aisj-dioasjfwe-oidho-sihf-sodis-sisiske"
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
