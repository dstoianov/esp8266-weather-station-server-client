
### Pi configuration

Add this 2 lines to the cron `crontab -e`


and check how it works

```shell
pi@raspberrypi:~ $ crontab -l
*/10 * * * * /usr/bin/python /home/pi/thingspeak/dht22.py >/dev/null 2>&1
*/10 * * * * /usr/bin/python /home/pi/thingspeak/ds18b20.py >/dev/null 2>&1
```
