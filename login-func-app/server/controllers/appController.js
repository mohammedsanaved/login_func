import userModel from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator';

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check required fields
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' });
    }

    // Check for existing username
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: 'Please use a unique username' });
    }

    // Check for existing email
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'Please use a unique email' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      username,
      password: hashedPassword,
      profile: profile || '',
      email,
    });

    // Save the user
    const savedUser = await user.save();
    console.log(savedUser);

    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: 'Username Not Found' });
    }

    bcrypt.compare(password, user.password, (err, passwordCheck) => {
      if (err || !passwordCheck) {
        return res.status(400).send({ error: 'Password is not Match' });
      }
      //create a JWT token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        ENV.JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log(token);
      return res.status(200).send({
        msg: 'Login successful',
        username: user.username,
        token,
      });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;
  console.log(req.params);
  try {
    if (!username) {
      return res.status(400).send({ error: 'Invalid Username' });
    }
    const user = await userModel.findOne({ username }).select('-password');
    console.log(user);
    if (!user) {
      return res.status(404).send({ error: "Couldn't Find the User" });
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    return res.status(500).send({ error: "Couldn't find user data" });
  }
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  try {
    // const { id } = req.user;
    const { id } = req.query;
    console.log(id);

    if (id) {
      const body = req.body;

      // update the data
      await userModel.updateOne({ _id: id }, body);
    } else {
      return res.status(404).send({ error: 'User Not Found' });
    }

    return res.status(200).send({ msg: 'Record Updated...!' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}
/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ msg: 'Verify Successfully....' });
  }
  return res.status(400).send({ error: 'Invalid OTP' });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: 'You have Access' });
  } else {
    return res.status(440).send({ error: 'Session Expired' });
  }
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: 'Session expired!' });
    }

    const { username, password } = req.body;

    try {
      const user = await userModel.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: 'Username not found' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.updateOne(
        { username: user.username },
        { password: hashedPassword }
      );

      req.app.locals.resetSession = false; // reset session

      return res.status(201).send({ msg: 'Record Updated...!' });
    } catch (error) {
      return res.status(500).send({ error: 'Unable to reset password' });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
