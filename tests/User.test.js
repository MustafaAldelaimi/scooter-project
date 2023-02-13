const User = require('../src/User')

// User tests here
describe('User', () => {
          let user
          beforeEach(() => {
                    user = new User('username', 'password', 18)
          })

// test username
          it('has a username', () => {
                    expect(user.username).toBe('username')
          })
// test password
          it('has a password', () => {
                    expect(user.password).toBe('password')
          })
// test age
          it('has an age', () => {
                    expect(user.age).toBe(18)
          })
// test login
          describe('login', () => {
                    it('throws an error if password is incorrect', () => {
                              expect(() => user.login('wrong password').toThrow('incorrect password'))
                    })

                    it('logs in successfully', () => {
                              user.login('password')
                              expect(user.loggedIn).toBe(true)
                    })
          })
// test logout
          describe('logout', () => {
                    it ('should log user out', () => {
                              user.login('password')
                              user.logout()
                              expect(user.loggedIn).toBe(false)
                    })
          })

})
