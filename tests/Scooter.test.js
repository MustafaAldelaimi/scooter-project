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
    it('throws an error if the scooter needs to charge', () => {
      scooter.charge = 10;
      expect(() => scooter.rent()).toThrow('scooter needs to charge');
    });
    it('throws an error if the scooter needs repair', () => {
      scooter.isBroken = true;
      expect(() => scooter.rent()).toThrow('scooter needs repair');
    });

    it('checks out the scooter to the user', () => {
      scooter.rent();
      expect(scooter.user).toBeDefined();
      expect(scooter.station).toBe(null);
    });
  })

  //dock method
  describe('dock()', () => {
    beforeEach(() => {
      scooter.rent();
    });

    it('returns the scooter to the station', () => {
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
      expect(logSpy).toHaveBeenCalledWith("repair completed")
    })
  })
  

  //charge method
  describe('charge()', () => {
    it('fully charges scooter', async () => {
      scooter.charge = 80
      await scooter.charge(); // we need to wait for the charge!
      expect(newScooter.charge).toBe(100);
    });
    
    it('logs something to the console', async () => {
      scooter.charge = 80
      await scooter.charge(); // we need to wait for the charge!
      expect(logSpy).toHaveBeenCalled();
    })
  })
  
})
