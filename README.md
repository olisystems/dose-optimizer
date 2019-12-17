# Optimierungsalgorithmus

Optimierungsalgorithmus ist ein Service, der Bedarf für Klimaanlagen und Ladestationen optimiert.

## Installation

Der Service kann auf zwei Arten installiert werden

### Dirket

1. install npm packages  
``` npm install ```  

2. build the project  
```  npm run build ```  

3. inculde a ```.env``` file with the following variables and its values  
```NODE_ENV``` ```SERVER_PORT``` ```MQTT_HOST``` ```MQTT_PORT``` ```MQTT_USERNAME``` ```MQTT_PASSWORD```

  
4. start app  
``` start:prod ```

### Docker

1. set the environmental variables of the docker file
2. run the docker file or include it in a docker composition


## Nutzung

Der Service lässt sich über eine REST API ansteurn  
**Endpunkt:** ```https://your-host/v1```  
**Methode:** ```POST```  
**Parameter:**


| Day     | Meal    | Price |
| --------|---------|-------|
| Monday  | pasta   | $6    |
| Tuesday | chicken | $8    |



|               |                      |
| --------------|----------------------|
| **Endpunkt:** | https://your-host/v1 |
| **Methode:**  | POST                 |