""" 
dht22.py 
Temperature/Humidity monitor using Raspberry Pi and DHT22. 
Data is displayed at thingspeak.com
Original author: Mahesh Venkitachalam at electronut.in 
Modified by Adam Garbo on December 1, 2016 
"""
import Adafruit_DHT
import urllib2

myAPI = "RCOSY3TYZXXXX"


def getSensorData():
    RH, T = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 22)
    # return (str(RH), str(T))
    return (str(round(RH, 1)), str(round(T, 1)))


def main():
    baseURL = 'https://api.thingspeak.com/update?api_key=%s' % myAPI
    try:
        RH, T = getSensorData()
        # print ("T " + t + "RH " + RH)
        f = urllib2.urlopen(baseURL + "&field1=%s&field2=%s" % (RH, T))
        # print f.read()
        # print T + RH
        f.close()
    except:
        print 'Holy Cow, something Broke!!! exiting.'


if __name__ == '__main__':
    main()
