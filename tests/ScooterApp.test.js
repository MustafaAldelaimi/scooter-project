const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here
describe('ScooterApp', () => {
          let scooter1
          let user1
          let scooterApp

          beforeEach(() => {
                    scooterApp = new ScooterApp()
                    scooter1 = new Scooter('station')
                    user1 = new User('username123', 'password123', 20)
          })
// register user
          describe('registerUser()', () => {
                    test('should register user if they are not already registered and are 18 or older', () => {
                              const newUser = scooterApp.registerUser('username456', 'password456', 21)
                              expect(newUser.registeredUsers).toHaveProperty('user', newUser)
                              expect(newUser).teEqual({
                                        username: 'username456',
                                        password: 'password456',
                                        age: 21,
                                        loggedIn: false
                              })
                    })

                    test('should throw an error if user is already registered', () => {
                              scooterApp.registerUser('username456', 'password456', 21)
                              expect(() => {
                                        scooterApp.registerUser('username456', 'password456', 21)
                              }).toThrow('already registered')
                    })

                    test('should throw an error if age is under 18', () => {
                              expect(() => {
                                        scooterApp.registerUser('username456', 'password456', '16')
                              }).toThrow('too young to register')
                    })
          })
// log in
          describe('loginUser()',() => {
                    test('should log to console that the user has been logged in', () => {
                              const logSpy = jest.spyOn(global.console, 'log')
                              scooterApp.registerUser('username456', 'password456', 21)
                              scooterApp.loginUser('username456', 'password456')
                              expect(logSpy).toHaveBeenCalledwith('user has been logged in')
                    })

                    test('should log to console that the user has been logged in', () => {
                              expect(() => {
                                        scooterApp.loginUser('username123', 'wrong password')
                              }).toThrowError('Username or password is incorrect')
                    })
          })
// log out
          describe('logoutUser()', () => {
                    test('should log to console that the user has been logged out', () => {
                              const logSpy = jest.spyOn(global.console, 'log')
                              scooterApp.registerUser('username456', 'password456', 21)
                              scooterApp.loginUser('username456', 'password456')
                              expect(scooterApp.logoutUser('username456')).toHaveBeenCalledwith('user is logged out')
                    })

                    test('should throw error if user cannot be located', () => {
                              scooterApp.registerUser('username456', 'password456', 21)
                              expect(() => {
                                        scooterApp.logoutUser('username456')
                              }).toThrowError('no such user is logged in')
                     })
          })
// rent scooter
          describe('rentScooter()', () => {
                    test('rents scooter successfully and logs scooter is rented to console', () => {

                    })

                    test('should throw error if scooter already rented', () => {
                              expect(() => {
                                        scooterApp.rentScooter(scooter1)
                              }).toThrowError('scooter is already rented')
                    })
          })
// dock scooter
})