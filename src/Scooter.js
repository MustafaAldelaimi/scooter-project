class Scooter{
  static nextSerial = 1
  // scooter code here
  constructor(station){
    this.station = station
    this.user = null
    this.serial = Scooter.nextSerial
    this.nextSerial = Scooter.nextSerial + 1
    this.charge = 100
    this.isBroken = false
  }

  rent(user) {
    if(this.charge > 20 && !this.isBroken) {
      this.user = user
      this.station = null
      console.log("Rented")
    } else if (this.isBroken) {
      throw new Error('scooter needs repair')
    } else if (this.charge < 20) {
      throw new Error("scooter needs to charge")
    } 
  }

  dock(station) {
    this.station = station
    this.user = null
  }

  async recharge() {
    console.log('Starting charge');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
  }

}
module.exports = Scooter
