

### ESP8266



Upload files to Arduino 
https://github.com/esp8266/arduino-esp8266fs-plugin


#### gzip
1. Compress a file  and keep the Uncompressed File
    ```shell
    gzip -k index.html main.js
    gzip index.html main.js
    ```
1. Uncompress a file
      ```shell
      gzip -d index.html.gz
      ```
 

---
 ### Sensors data
 
 ![](https://github.com/dstoianov/esp8266-weather-station-server-client/raw/master/files/sensors.png)
 
 ### Chart 
 
 ![](https://github.com/dstoianov/esp8266-weather-station-server-client/raw/master/files/chart.png)
 
 ### Info
 
 ![](https://github.com/dstoianov/esp8266-weather-station-server-client/raw/master/files/info.png)
 
 ### Settings, not finished yet
 
 ![](https://github.com/dstoianov/esp8266-weather-station-server-client/raw/master/files/settings.png)
 
 
 
 ----


##### WiFi Socket 
1. Spec
    - ESP8266 NodeMCU ~ 3€
    - PZEM-004T ~3€
    - Relay PIC AVR DSP ARM ~8€
    - Plastic Case/Box ~7-10€
1. Data
    - Input：120V～,10A,60Hz or  220V~,10A,50/60Hz
    - Max Output：120V～,15A  or 220V~,10A
    - Wireless standard：Wi-Fi 2.4GHz b/g/n
1. Features:
    - remote On/Off
    - monitoring current Watt/Power/Volt/Amp consumption
    - track energy spending via socket
    - powered by the same socket
    - no phone app needed
    - report for last 24h 
    - track temperature + humidity (optional)


##### Weather Station (indoor) 
1. Spec
    - ESP8266 NodeMCU ~ 3€
    - MH-Z14A ~ 17.82€ (CO2 Sensor)
    - HTU21D ~1.54€ (Hum/Temp)
    - BME280 ~2.71€ (Hum/Temp/Pressure)
    - BMP180 ~2.56€ (Temp/Pressure)
    - BH1750FVI ~1€ (Light Intensity Sensor)
    - KY-037 ~0.60€ (sound)
    - OLED Display 128X64 I2C SSD1306 12864 ~2.50€ (optional)
    - VEML6070 ~2.38€, (UV sensor, optional)
    - DS18B20 ~0.5€ (Temp sensor, optional)
    - HC-SR501 ~1€ (PIR sensor, optional)
1. SENSORS AND MEASUREMENTS
    - Temperature
    - Humidity
    - Barometer (optional)
    - CO2 meter
    - Sound meter
    - Light meter
    - UV level meter
    
    
### Wi-Fi Weather station (outdoor)
1. Spec
    - Wi-Fi board - ESP8266 NodeMCU ~ 3€
    - temp/humidity/pressure
        - BME280 ~2.71€ (Hum/Temp/Pressure)
        - one or two sensors
        - HTU21D ~1.54€ (Temp/Humidity)
        - BMP180 ~2.56€ (Temp/Pressure)
    - BH1750FVI ~1€ (Light Intensity Sensor)
    - VEML6070 ~2.38€, (UV sensor, optional)
    - KY-037 ~0.60€ (sound sensor)
    - DS18B20 ~0.5€ (Temp sensor, optional)
    - HC-SR501 ~1€ (PIR sensor, optional)
    - OLED Display 128X64 I2C SSD1306 12864 ~2.50€ (optional)






