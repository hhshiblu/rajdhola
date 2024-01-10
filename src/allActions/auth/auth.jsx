"use server";
import jwt from "jsonwebtoken";
import prisma from "../../../prisma/prisma";
import bcrypt from "bcryptjs";
import { sendMail } from "@/libs/sendMail";
import { sentOtp } from "@/libs/sentOtp";

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

const createSctivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATED_KEY, {
    expiresIn: "4m",
  });
};
let otp = null;

export const createSeller = async (fromData) => {
  const shopName = fromData.get("name");
  const email = fromData.get("email");
  const phoneNumber = fromData.get("phoneNumber");
  const address = fromData.get("address");
  const zipCode = fromData.get("zipCode");
  const password = fromData.get("password");
  const cpassword = fromData.get("cpassword");
  const image = fromData.get("file");

  if (
    !shopName ||
    !email ||
    !phoneNumber ||
    !address ||
    !zipCode ||
    !password ||
    !cpassword ||
    !image
  ) {
    return { error: "please fill all  fields" };
  }
  if (password !== cpassword) {
    return {
      error: "passwords do not match",
    };
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const hashCPassword = await bcrypt.hash(cpassword, 10);
  try {
    const isSeller = await prisma.shops.findFirst({
      where: {
        email: email,
      },
    });

    if (isSeller) {
      return {
        error: "user already exists",
      };
    }

    const seller = {
      shopName,
      email,
      phoneNumber,
      address,
      zipCode,
      hashPassword,
      hashCPassword,
      // avatar: fileUrl,
    };

    const ActivationToken = createSctivationToken(seller);
    const activeUrl = `http://localhost:3000/create-seller/activation/${ActivationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        html: `
    <html lang="en">

  <head></head>
  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">The sales intelligence platform that helps you uncover qualified leads.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
      <tr style="width:100%">
        <td><img alt="Koala" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/koala-logo.png" width="170" height="50" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
          <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${seller.shopName},</p>
          <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Rajdhola, transform your sales journey! Discover leads, close deals, and become a vendor powerhouse. Click below to activate your account now..</p>
          <table style="text-align:center" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
            <tbody>
              <tr>
                <td><a href="${activeUrl}" target="_blank" style="background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;p-x:12px;p-y:12px;line-height:100%;max-width:100%;padding:12px 12px"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;p-x:12px;p-y:12px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:9px">Click Here</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
              </tr>
            </tbody>
          </table>
          <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Rajdhola team</p>
          <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
          <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">@rajdhola </p>
        </td>
      </tr>
    </table>
  </body>

</html>
  `,
      });

      return {
        success: true,
        message: `please cheak your email : ${seller.email} to activate your account`,
      };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export async function activationSeller(token) {
  try {
    const newSeller = jwt.verify(token, process.env.ACTIVATED_KEY);

    if (!newSeller) {
      return {
        error: "Invalid token",
      };
    }
    const {
      shopName,
      email,
      phoneNumber,
      address,
      zipCode,
      hashPassword,
      hashCPassword,
    } = newSeller;

    const isSeller = await prisma.shops.findFirst({
      where: {
        email: email,
      },
    });

    if (!isSeller) {
      await prisma.shops.create({
        data: {
          name: shopName,
          email: email,
          password: hashPassword,
          cpassword: hashCPassword,
          address: address,
          phoneNumber: parseInt(phoneNumber, 10),
          zipCode: parseInt(zipCode, 10),
          status: "pending",
          v: parseInt(0, 10),
          createdAt: new Date(),
        },
      });
      await sendMail({
        email: email,
        subject: "activated your shop",
        message: `hello ${shopName} your shop  create successfull`,
      });
    } else {
      try {
        return {
          error: "user already exists",
        };
      } catch (error) {
        return { error: error.message, statusCode: 500 };
      }
    }
  } catch (error) {
    return {
      error: error.message,
      statusCode: 500,
    };
  }
}

// USER

export const createUser = async (name, phoneNumber, password) => {
  try {
    if (!name || !phoneNumber || !password) {
      return {
        error: "all fields are required",
      };
    }
    const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
    if (!phoneNumberRegex.test(phoneNumber) || phoneNumber.length !== 11) {
      return {
        error: "Invalid phone number",
      };
    }
    if (password.length <= 5) {
      return {
        error: "Password must be 5 characters long",
      };
    }

    const user = await prisma.users.findFirst({
      where: {
        phoneNumber: parseInt(phoneNumber, 10),
      },
    });

    if (user) {
      return {
        error: "User already exists . Use  different number.",
      };
    } else {
      const ontimeOtp = generateOTP();
      const res = await sentOtp(phoneNumber, ontimeOtp);
      if (res.success == 1) {
        const unverified = await prisma.unverifiedusers.findFirst({
          where: {
            phoneNumber: parseInt(phoneNumber, 10),
          },
        });

        if (!unverified) {
          await prisma.unverifiedusers.create({
            data: {
              phoneNumber: parseInt(phoneNumber, 10),
              otp: parseInt(ontimeOtp, 10),
            },
          });
        } else {
          await prisma.unverifiedusers.update({
            where: {
              id: unverified.id,
            },
            data: {
              otp: parseInt(ontimeOtp, 10),
            },
          });
        }
      }
      return {
        time: 180,
        success: true,
        message: "6 digits otp sent successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const verifyOtp = async (givenOtp, name, phoneNumber, password) => {
  try {
    if (!givenOtp) {
      return {
        error: "otp field required",
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const giveotp = parseInt(givenOtp, 10);
    const unverifieduser = await prisma.unverifiedusers.findFirst({
      where: {
        phoneNumber: parseInt(phoneNumber, 10),
      },
    });
    if (giveotp !== unverifieduser.otp) {
      return { error: "Invalid OTP. Retry or get a new one." };
    } else {
      await prisma.unverifiedusers.delete({
        where: {
          id: unverifieduser.id,
        },
      });
      await prisma.users.create({
        data: {
          name: name,
          phoneNumber: parseInt(phoneNumber, 10),
          password: hashPassword,
          createdAt: new Date(),
          role: "user",
          v: parseInt(0, 10),
        },
      });
      return {
        success: true,
        message: "user verified successfully",
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const resendCode = async (number) => {
  try {
    const unverifieduser = await prisma.unverifiedusers.findFirst({
      where: {
        phoneNumber: parseInt(number, 10),
      },
    });
    const ontimeOtp = generateOTP();
    const res = await sentOtp(number, ontimeOtp);
    if (res.success == 1) {
      await prisma.unverifiedusers.update({
        where: {
          id: unverifieduser.id,
        },
        data: {
          otp: parseInt(ontimeOtp, 10),
        },
      });

      return {
        time: 180,
        success: true,
        message: "onetime otp sent successfully",
      };
    }
  } catch (error) {
    return {
      message: "server error",
    };
  }
};
