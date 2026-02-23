const Person = require("./models/person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await Person.findOne({ username });

        if (!user)
            return done(null, false, { message: "Incorrect username" });

        const isMatch = await user.comparePassword(password);

        if (!isMatch)
            return done(null, false, { message: "Incorrect password" });

        return done(null, user);

    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;