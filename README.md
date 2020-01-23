# Optimierungsalgorithmus

Optimierungsalgorithmus ist ein Service, der Bedarf für Klimaanlagen und Ladestationen optimiert.


## Installation

Der Service kann auf zwei Arten installiert werden


### Dirket

1. install npm packages  
``` npm install ```  

2. build the project  
```  npm run build ```  

3. inculde a **.env** - file with the following variables and its values  
 - NODE_ENV
 - SERVER_PORT
 - MQTT_HOST
 - MQTT_PORT
 - MQTT_USERNAME 
 - MQTT_PASSWORD

4. start app  
``` npm start:prod ```


### Docker

1. set the environmental variables of the docker file
2. run the docker file or include it in a docker composition


## Anwendungskonfigurationen

Neben den oben genannten Umgebungskonfigurationen, lässt sich auch die Arbeitsweise des Algorithmus konfigurieren.  
Die Konfigurationen hierfür sind in der Datei ./config.ts einzutragen.  
Sollten hier Änderungen vorgenommen werden, dann muss ein neues Build gebaut werden, damit diese übernommen werdne  
  
Folgende Parameter können konfiguriert werden:
* roundingDemands:
  * direction: 'up'/'down'
  * to: 1/10/100/1000


## Nutzung

Der Service lässt sich über eine REST API ansteurn über folgende parameter eigenschaften:
**Endpunkt:** <https://your-host/v1>  
**Methode:** ```POST```  
**Parameter:** ```OLI_ID```  
**Parameter:**


## Tests

Der Service muss gestartet werden bevor dieser getestet werden kann. Der Optimierungsalgorithmus kann auf zwei Arten getestet werden.

### Visuelle Tests
Die Virtuell Tests werden im Webbrowser durch das aufrufen folgender URL:  http://<host>:<port>/test durchgeführt. Als Host und Port müssen die bei der Installation verwendeten Werte verwendet werden. Zuvor müssen allerdings noch die Konfigurationen für den Host und den Port in der Datei test/optimization-plots/config.js angepasst werden.  

Die geladene Seite beinhaltet drei Testszenarien die über Registerkarten auswählbar sind. Jede Registerkarte beinhaltet einen Graphen der unoptimierte Testdaten beinhaltet. Die Daten des Graphs werden in der Legende rechts neben dem Graphen beschreiben. Unter den unoptimierten Graphen gibt es einen Button „Optimize“. Wird dieser Button gedrückt, dann erscheint darunter ein neuer Graph, der die Ergebnisse der Optimierung darstellt. Bewegt man sich mit dem Mauszeiger über die Graphen, dann werden dessen Werte in Form von Tooltips angezeigt.

### Unit Tests
Unit Tests werden über folgendes npm Kommando ausgeführt: 
```  npm run test ```


## Arbeitsweise der Algoritmus

Der Service ist in 3 Module aufgeteilt

1. API
2. ...
