#include <Wire.h>
#define ADDR 0x08
#define UPDATE_RATE 5000
#define BUFSIZE 0x20

const int pResistor = A0;
int value_pResistor = 0;
int value_humidity = 0;
int value_temp = 0;

char buffer_out[0x20];


void setup() {
  Wire.begin(ADDR);             // join i2c bus with address #8
  Wire.onRequest(requestEvent); // register event
  pinMode(pResistor, INPUT);// Set pResistor - A0 pin as an input (optional)
  //Serial.begin(57600);
}

void loop() {
  value_pResistor = analogRead(pResistor);
  value_temp = 20.00f * 100;
  value_humidity = 47;

//use mapping to get the temp values
//int value_temp = map(sensorReading, 0, 1023, -5, 32);

  
  //Serial.println( String(analogRead(pResistor), HEX ));
  delay(UPDATE_RATE);
}

// function that executes whenever data is requested by master
// this function is registered as an event, see setup()
void requestEvent() {
  String toSend = String(analogRead(pResistor), HEX);
  //not floats are split into integers 
  sprintf(buffer_out, "%d %d.%d %d", value_pResistor, value_temp / 100, value_temp % 100, value_humidity );
  
  //String toSend = String(analogRead(pResistor), HEX); 
  //Serial.println(toSend);
  //Wire.write(&toSend[0]); // respond with message of x bytes
  Wire.write(&buffer_out[0], BUFSIZE);
}
