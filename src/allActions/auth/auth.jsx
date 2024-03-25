"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "@/libs/sendMail";
import { sentOtp } from "@/libs/sentOtp";
import { v4 as uuidv4 } from "uuid";
import { deleteFiles, uploadFileToS3 } from "@/libs/uploadimage";
import connectToDB from "@/libs/connect";
import { ObjectId } from "mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
}

export const CreateSeller = async (identity) => {
  if (!identity) {
    return {
      error: "You must provite email or number",
    };
  }
  const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  try {
    const db = await connectToDB();

    if (/[a-zA-Z@]/.test(identity)) {
      const email = identity;
      if (!emailRegex.test(email)) {
        return {
          error: "Invalid email address",
        };
      }
      const seller = await db.collection("sellers").findOne({
        email: email,
      });
      if (seller) {
        return {
          error: "user already exists",
        };
      }
      const otp = generateOTP();
      const res = await sendMail({
        email: email,
        subject: "Activate your shop",
        html: `
        <html lang="en">

      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${otp} security code . Begin your Rajdhola venture - start selling with us today!.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
      </div>

      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tr style="width:100%">
            <td><img alt="rajdhola.com" src="https://rajdhola.s3.ap-south-1.amazonaws.com/rajdhola.jpg" width="140" height="40" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
              <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${email},</p>
              <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Rajdhola, transform your sales journey! Discover leads, close deals, and become a vendor powerhouse. Click below to activate your account now..</p>
              <table style="text-align:center" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
               <td style="font-weight: bold; font-size: 22px;">${otp}</td>

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
      if (res.success == true) {
        const unverified = await db.collection("unverifiedsellers").findOne({
          email: email,
        });

        if (!unverified) {
          await db.collection("unverifiedsellers").insertOne({
            email: email,
            otp: parseInt(otp, 10),
          });
        } else {
          const filter = { _id: new ObjectId(unverified._id) };
          const update = { $set: { otp: parseInt(otp, 10) } };

          await db.collection("unverifiedsellers").updateOne(filter, update);
        }
        return {
          success: true,
          email: true,
          message: "6 digits otp sent successfully",
        };
      }
    } else if (/^\d+$/.test(identity)) {
      const number = identity;
      if (!phoneNumberRegex.test(number) || number.length !== 11) {
        return {
          error: "Invalid phone number",
        };
      }
      const seller = await db.collection("sellers").findOne({
        phoneNumber: parseInt(number, 10),
      });
      if (seller) {
        return {
          error: "user already exists",
        };
      }
      const ontimeOtp = generateOTP();
      const res = await sentOtp(number, ontimeOtp);

      if (res.success == 1) {
        const unverified = await db.collection("unverifiedsellers").findOne({
          phoneNumber: parseInt(number, 10),
        });

        if (!unverified) {
          await db.collection("unverifiedsellers").insertOne({
            phoneNumber: parseInt(number, 10),
            otp: parseInt(ontimeOtp, 10),
          });
        } else {
          const filter = { _id: new ObjectId(unverified._id) };
          const update = { $set: { otp: parseInt(ontimeOtp, 10) } };

          await db.collection("unverifiedsellers").updateOne(filter, update);
        }
        return {
          success: true,
          number: true,
          message: "6 digits otp sent successfully",
        };
      }
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export async function activationSeller(identity, otp) {
  try {
    const db = await connectToDB();
    if (!otp) {
      return {
        error: "otp field required",
      };
    }
    const enteredOTP = parseInt(otp, 10);
    if (/[a-zA-Z@]/.test(identity)) {
      const email = identity;
      const Seller = await db.collection("unverifiedsellers").findOne({
        email: email,
      });

      if (enteredOTP !== Seller.otp) {
        return { error: "Invalid OTP. Retry or get a new one." };
      } else {
        const filter = { _id: new ObjectId(Seller._id) };
        const update = {
          $set: {
            verify: true,
            v: parseInt(0, 10),
            updated: new Date(),
          },
        };

        await db.collection("unverifiedsellers").updateOne(filter, update);
        return {
          success: true,
          message: "Shop verified successfully !",
          statusCode: 201,
        };
      }
    } else {
      const Seller = await db.collection("unverifiedsellers").findOne({
        phoneNumber: parseInt(identity, 10),
      });

      if (enteredOTP !== Seller.otp) {
        return { error: "Invalid OTP. Retry or get a new one." };
      } else {
        const filter = { _id: new ObjectId(Seller._id) };
        const update = {
          $set: {
            verify: true,
            v: parseInt(0, 10),
            updated: new Date(),
          },
        };

        await db.collection("unverifiedsellers").updateOne(filter, update);
        return {
          success: true,
          message: " Shop verified successfully !",
          statusCode: 201,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: "Too late  timed out !",
      statusCode: 500,
    };
  }
}

export async function sellerCreateWithInfo(
  identity,
  cate,
  password,
  cpassword
) {
  try {
    if (!password || !cpassword || !cate) {
      return { error: "please fill all  fields" };
    }
    if (password !== cpassword) {
      return {
        error: "Passwords do not match",
      };
    }

    if (password.length < 5) {
      return {
        error: "Password must be at least 5 characters long",
      };
    }

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;
    if (!strongPasswordRegex.test(password)) {
      return {
        error:
          "Password must be strong (at least one uppercase letter, one lowercase letter, and one digit)",
      };
    }
    const Password = await bcrypt.hash(password, 10);
    const cPassword = await bcrypt.hash(cpassword, 10);
    const db = await connectToDB();
    if (/[a-zA-Z@]/.test(identity)) {
      const email = identity;
      const Seller = await db.collection("unverifiedsellers").findOne({
        email: email,
        verify: true,
      });
      if (Seller) {
        await db.collection("sellers").insertOne({
          email: Seller.email,
          category: cate,
          status: "pending",
          password: Password,
          cPassword,
          v: parseInt(0, 10),
          available_Banalace: parseInt(0, 10),
          withdrawRequest: [],
          createdAt: new Date(),
        });
        await db
          .collection("unverifiedsellers")
          .deleteOne({ _id: new ObjectId(Seller._id) });

        return {
          success: true,
          message: " Shop created successfully !",
          statusCode: 201,
        };
      } else {
        return {
          error: "user not found",
        };
      }
    } else {
      const Seller = await db.collection("unverifiedsellers").findOne({
        phoneNumber: parseInt(identity, 10),
        verify: true,
      });

      if (Seller) {
        await db.collection("sellers").insertOne({
          phoneNumber: Seller.phoneNumber,
          category: cate,
          status: "pending",
          password: Password,
          cPassword,
          v: parseInt(0, 10),
          available_Banalace: parseInt(0, 10),
          withdrawRequest: [],
          createdAt: new Date(),
        });
        await db
          .collection("unverifiedsellers")
          .deleteOne({ _id: new ObjectId(Seller._id) });

        return {
          success: true,
          message: " Shop created successfully !",
          statusCode: 201,
        };
      } else {
        return {
          error: "user not found",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: "Too late  timed out !",
      statusCode: 500,
    };
  }
}

// USER

export const createUser = async (name, phoneNumber, password) => {
  try {
    const db = await connectToDB();

    //  const productobject = await db.collection("products");
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
    const user = await db.collection("users").findOne({
      phoneNumber: parseInt(phoneNumber, 10),
    });

    if (user) {
      return {
        error: "User already exists . Use  different number.",
      };
    } else {
      const ontimeOtp = generateOTP();
      const res = await sentOtp(phoneNumber, ontimeOtp);

      if (res.success == 1) {
        const unverified = await db.collection("unverifiedusers").findOne({
          phoneNumber: parseInt(phoneNumber, 10),
        });

        if (!unverified) {
          await db.collection("unverifiedusers").insertOne({
            phoneNumber: parseInt(phoneNumber, 10),
            otp: parseInt(ontimeOtp, 10),
          });
        } else {
          const filter = { _id: new ObjectId(unverified._id) };
          const update = { $set: { otp: parseInt(ontimeOtp, 10) } };

          await db.collection("unverifiedusers").updateOne(filter, update);
        }
        return {
          success: true,
          message: "6 digits otp sent successfully",
        };
      }
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
    const db = await connectToDB();
    if (!givenOtp) {
      return {
        error: "otp field required",
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const giveotp = parseInt(givenOtp, 10);
    const unverifieduser = await db.collection("unverifiedusers").findOne({
      phoneNumber: parseInt(phoneNumber, 10),
    });

    if (giveotp !== unverifieduser.otp) {
      return { error: "Invalid OTP. Retry or get a new one." };
    } else {
      await db.collection("users").insertOne({
        name: name,
        phoneNumber: parseInt(phoneNumber, 10),
        password: hashPassword,
        address: [],
        role: "user",
        createdAt: new Date(),
        v: parseInt(0, 10),
      });
      await db
        .collection("unverifiedusers")
        .deleteOne({ _id: new ObjectId(unverifieduser._id) });

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

// export const resendCode = async (number) => {
//   try {
//     const unverifieduser = await prisma.unverifiedusers.findFirst({
//       where: {
//         phoneNumber: parseInt(number, 10),
//       },
//     });
//     const ontimeOtp = generateOTP();
//     const res = await sentOtp(number, ontimeOtp);
//     if (res.success == 1) {
//       await prisma.unverifiedusers.update({
//         where: {
//           id: unverifieduser.id,
//         },
//         data: {
//           otp: parseInt(ontimeOtp, 10),
//         },
//       });

//       return {
//         time: 180,
//         success: true,
//         message: "onetime otp sent successfully",
//       };
//     }
//   } catch (error) {
//     return {
//       message: "server error",
//     };
//   }
// };

export const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("users");

    const userInfo = await collection.findOne(
      { _id: new ObjectId(session?.user?.id) },
      { projection: { password: 0, cpassword: 0 } }
    );
    const user = JSON.parse(JSON.stringify(userInfo));
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

export const addAddress = async (fromData) => {
  try {
    const address = JSON.parse(fromData.get("address"));
    const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
    if (
      !phoneNumberRegex.test(address.number) ||
      address.number.length !== 11
    ) {
      return {
        error: "Invalid phone number",
      };
    }

    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("users");
    const userWithSameTypeAddress = await collection.findOne({
      _id: new ObjectId(session?.user?.id),
      "addresses.addressType": address.addressType,
    });
    if (userWithSameTypeAddress) {
      return {
        error: `${address.addressType} address already exists`,
      };
    }
    const updateResult = await collection.updateOne(
      { _id: new ObjectId(session?.user?.id) },
      {
        $push: {
          addresses: address,
        },
      }
    );
    if (updateResult.acknowledged == true) {
      revalidatePath("/user-account/address-book");
      return {
        success: true,
        message: "Address updated successfully",
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const deleteAddress = async (addressType) => {
  try {
    const session = await getServerSession(authOptions);
    const db = await connectToDB();
    const collection = db.collection("users");

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(session?.user?.id) },
      {
        $pull: {
          addresses: { addressType: addressType },
        },
      }
    );
    if (updateResult.acknowledged == true) {
      revalidatePath("/user-account/address-book");
      return {
        success: true,
        message: "Address deleted successfully",
      };
    } else {
      return {
        success: false,
        error: "Some error occurred",
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const getUserByPhoneNumber = async (number) => {
  try {
    const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
    if (!phoneNumberRegex.test(number) || number.length !== 11) {
      return {
        error: "Invalid phone number",
      };
    }
    const db = await connectToDB();
    const user = await db.collection("users").findOne({
      phoneNumber: parseInt(number, 10),
    });

    if (!user) {
      return {
        error: "Users not found",
      };
    } else {
      const otp = generateOTP();
      const res = await sentOtp(number, otp);

      if (res.success === 1) {
        // Update the user document with the generated OTP and a timestamp
        const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes in milliseconds
        await db.collection("users").updateOne(
          { _id: user._id },
          {
            $set: {
              otp: otp,
              otpExpiration: otpExpirationTime,
            },
          }
        );

        // Set a timeout to delete the OTP after 5 minutes
        if (user.otp) {
          setTimeout(async () => {
            await db
              .collection("users")
              .updateOne(
                { _id: user._id },
                { $unset: { otp: "", otpExpiration: "" } }
              );
          }, 5 * 60 * 1000);
        }

        return {
          success: true,
          message: "Send Otp successfully",
        };
      }
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const verifyOtpForForgot = async (otp, number) => {
  try {
    if (!otp) {
      return {
        error: "otp  field is required",
      };
    }
    const db = await connectToDB();
    const user = await db.collection("users").findOne({
      phoneNumber: parseInt(number, 10),
    });
    if (otp == user.otp) {
      return {
        success: true,
        message: "Otp Verification successful",
      };
    } else {
      return { error: "Invalid OTP. Retry or get a new one." };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const ChangePassword = async (password, number) => {
  try {
    if (!password) {
      return {
        error: "Password field is required",
      };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const db = await connectToDB();
    const user = await db.collection("users").findOne({
      phoneNumber: parseInt(number, 10),
    });
    const res = await db
      .collection("users")
      .updateOne({ _id: user._id }, { $set: { password: hashPassword } });
    if (res.acknowledged == true) {
      await db
        .collection("users")
        .updateOne({ _id: user._id }, { $unset: { otp: "" } });
      return {
        success: true,
        message: "Password change successfully",
      };
    }
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
