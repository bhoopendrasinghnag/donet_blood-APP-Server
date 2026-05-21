// import { getDB } from "../../db.js";
// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";

// dotenv.config();

// const collection = process.env.MONGO_COLLECTION;

// // ================= FIND USER =================
// const findUserByEmail = async (email) => {
//   const db = await getDB();
//   return await db.collection(collection).findOne({ email });
// };



// // ================= SEND OTP EMAIL =================
// const otpSender =
//   async (email, otp) => {
//     try {

//       const user =
//         process.env.EMAIL_USER;

//       const pass =
//         process.env.EMAIL_PASS;

//       console.log(user);

//       const transporter =
//         nodemailer.createTransport({

//           host: "smtp.gmail.com",

//           port: 465,

//           secure: true,

//           family: 4,

//           auth: {

//             user:
//               process.env.EMAIL_USER,

//             pass:
//               process.env.EMAIL_PASS,
//           },

//           tls: {
//             rejectUnauthorized: false
//           },

//           logger: true,

//           debug: true,

//           connectionTimeout: 30000,

//           greetingTimeout: 30000,

//           socketTimeout: 30000,
//         });

//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "OTP for Blood Donation Registration",
//         html: `
//       <h2>Blood Donation App</h2>
//       <h3>Your OTP is: ${otp}</h3>
//       <p>This OTP is valid for 5 minutes.</p>
//     `,
//       })
//     }
//     catch (err) {

//       console.log(
//         "MAIL ERROR ❌"
//       );

//       console.log(err);

//       throw err;
//     }
//   }


// // ================= CREATE USER =================
// const createUser = async (userData) => {
//   const db = await getDB();
//   const { confirmPassword, ...user } = userData;
//   const hashedPassword = await bcrypt.hash(userData.password, 10);
//   user.password = hashedPassword;
//   user.createdAt = new Date();
//   console.log("UserDasta", user);
//   const response = await db.collection(collection).insertOne(user);

//   return {
//     success: true,
//     data: response,
//     message: "Registration Successful 🎉"
//   };
// };

// export default {
//   findUserByEmail,
//   otpSender,
//   createUser,
// };





import { Resend }
  from "resend";

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

const otpSender =
  async (email, otp) => {

    try {

      const response =
        await resend.emails.send({

          from:
            "onboarding@resend.dev",

          to: email,

          subject:
            "OTP for Blood Donation Registration",

          html: `

                    <h2>
                        Blood Donation App
                    </h2>

                    <h3>
                        Your OTP:
                        ${otp}
                    </h3>

                    <p>
                        Valid for 5 minutes.
                    </p>
                `,
        });

      console.log(
        "MAIL SENT ✅"
      );

      console.log(response);

      return true;

    } catch (err) {

      console.log(
        "MAIL ERROR ❌"
      );

      console.log(err);

      throw err;
    }
  };

export default otpSender;