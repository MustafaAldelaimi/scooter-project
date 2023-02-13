const { TestWatcher } = require('jest')
const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
let scooter
beforeEach(() => {
  scooter =  new Scooter('London', null, 1, 2, 100, false)
})

  it('is an object', () => {
    expect(typeof scooter).toBe("object")
  })

  it('has a station', () => {
    expect(scooter.station).toBe('London');
  });

  it('has a user', () => {
    expect(scooter.user).toBe(null);
  });

  it('has a serial number', () => {
    expect(scooter.serial).toBeDefined();
  });

  it('has the next serial number', () => {
    expect(scooter.nextSerial).toBe(scooter.serial + 1);
  });

  it('has a charge', () => {
    expect(scooter.charge).toBe(100);
  });

  it('is not broken', () => {
    expect(scooter.isBroken).toBe(false);
  });

})

//Method tests
describe('scooter methods', () => {
  // tests here!
  let scooter =  new Scooter('London', null, 1, 2, 100, false)

  //rent method
  describe('rent()', () => {
    beforeEach(() => {
      scooter.isBroken = false
      scooter.charge = 100
    })

    it('throws an error if the scooter needs to charge', () => {
      scooter.charge = 10;
      expect(() => scooter.rent()).toThrow('scooter needs to charge');
    });
    it('throws an error if the scooter needs repair', () => {
      scooter.isBroken = true;
      expect(() => scooter.rent()).toThrow('scooter needs repair');
    });

    it('checks out the scooter to the user', () => {
      scooter.rent('Jim');
      expect(scooter.user).toBe('Jim');
      expect(scooter.station).toBe(null);
    });
  })

  //dock method
  describe('dock()', () => {

    it('returns the scooter to the station', () => {
      scooter.rent('Jim');
      scooter.dock('Lumbridge');
      expect(scooter.station).toBe('Lumbridge');
      expect(scooter.user).toBe(null);
    });
  });

  //requestRepair method
  describe('requestRepair()', () => {
    test('repairs scooter', async () => {
      scooter.isBroken = true
      await scooter.requestRepair()
      expect(scooter.isBroken).toBe(false)
    })
    test('logs "repair completed" to the console', async () => {
      scooter.isBroken = true
      await scooter.requestRepair()
      const logSpy = jest.spyOn(console, 'log')
      expect(logSpy).toHaveBeenCalledWith("repair completed")
    })
  })
  

  //charge method
  describe('recharge()', () => {
    test("fully charges scooter", async () => {
      scooter.charge = 80
      await scooter.recharge(); // we need to wait for the charge!
      expect(scooter.recharge).toBe(100);
  });
    
    it('logs something to the console', async () => {
      scooter.charge = 80
      await scooter.recharge(); // we need to wait for the charge!
      const logSpy = jest.spyOn(console, 'log')
      expect(logSpy).toHaveBeenCalled();
    })
  })
  
})
