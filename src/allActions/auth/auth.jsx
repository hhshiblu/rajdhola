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

const createActivationToken = (sellerId) => {
  return jwt.sign(sellerId, process.env.ACTIVATED_KEY, {
    expiresIn: "4m",
  });
};

export const createSeller = async (fromData) => {
  const shopName = fromData.get("name");
  const userName = fromData.get("userName");
  const email = fromData.get("email");
  const address = JSON.parse(fromData.get("address"));
  const phoneNumber = fromData.get("phoneNumber");
  const category = fromData.get("category");
  const zipCode = fromData.get("zipCode");
  const password = fromData.get("password");
  const cpassword = fromData.get("cpassword");
  const image = fromData.get("file");
  const phoneNumberRegex = /^(019|013|014|018|015|016|017)\d{8}$/;
  if (!phoneNumberRegex.test(phoneNumber) || phoneNumber.length !== 11) {
    return {
      error: "Invalid phone number",
    };
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return {
      error: "Invalid email address",
    };
  }

  if (
    !userName ||
    !shopName ||
    !email ||
    !phoneNumber ||
    !address ||
    !zipCode ||
    !password ||
    !cpassword ||
    !image ||
    !category
  ) {
    return { error: "please fill all  fields" };
  }
  if (password !== cpassword) {
    return {
      error: "passwords do not match",
    };
  }
  let images = null;
  const name = uuidv4();
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const res = await uploadFileToS3(buffer, name + image.name);
    images = res;
  } catch (error) {
    return { error: "Something  wrong! Try Later" };
  }

  try {
    const db = await connectToDB();
    const isSeller = await db.collection("sellers").findOne({
      email: email,
    });

    if (isSeller) {
      return {
        error: "user already exists",
      };
    }

    const Password = await bcrypt.hash(password, 10);
    const cPassword = await bcrypt.hash(cpassword, 10);
    const otp = generateOTP();
    try {
      const res = await sendMail({
        email: email,
        subject: "Activate your shop",
        html: `
        <html lang="en">

      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Begin your Rajdhola venture - start selling with us today!.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
      </div>

      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tr style="width:100%">
            <td><img alt="rajdhola.com" src="https://rajdhola.s3.ap-south-1.amazonaws.com/rajdhola.jpg" width="140" height="40" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
              <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${shopName},</p>
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
            userName,
            shopName,
            images,
            email,
            address,
            category,
            password: Password,
            cpassword: cPassword,
            phoneNumber: parseInt(phoneNumber, 10),
            zipCode: parseInt(zipCode, 10),
            otp: parseInt(otp, 10),
          });
        } else {
          // console.log(unverified.images.objectkey);
          // const res = await deleteFiles(unverified.images.objectkey);
          // console.log(res);
          const filter = { _id: new ObjectId(unverified._id) };
          const update = {
            $set: {
              userName,
              shopName,
              images,
              email,
              address,
              category,
              password: Password,
              cpassword: cPassword,
              phoneNumber: parseInt(phoneNumber, 10),
              zipCode: parseInt(zipCode, 10),
              otp: parseInt(otp, 10),
            },
          };

          await db.collection("unverifiedsellers").updateOne(filter, update);
        }
        return {
          success: true,
          message: `please cheak your email : ${email} to activate your account`,
        };
      } else {
        return {
          success: false,
          message: `Something  error occurred`,
        };
      }
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  } catch (error) {
    return { error: error.message };
  }
};

export async function activationSeller(email, otp) {
  try {
    const db = await connectToDB();
    if (!otp) {
      return {
        error: "otp field required",
      };
    }
    const Seller = await db.collection("unverifiedsellers").findOne({
      email: email,
    });

    const enteredOTP = parseInt(otp, 10);

    if (enteredOTP !== Seller.otp) {
      return { error: "Invalid OTP. Retry or get a new one." };
    } else {
      await db.collection("sellers").insertOne({
        userName: Seller.userName,
        shopName: Seller.shopName,
        images: Seller.images,
        email: Seller.email,
        address: Seller.address,
        category: Seller.category,
        password: Seller.password,
        cPassword: Seller.cpassword,
        phoneNumber: Seller.phoneNumber,
        zipCode: parseInt(Seller.zipCode, 10),
        status: "pending",
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
        message: " Your Shop created successfully !",
      };
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
      !phoneNumberRegex.test(address.altNumber) ||
      address.number.length !== 11 ||
      address.altNumber.length !== 11
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

export const autodelete = async () => {
  const db = await connectToDB();
  const unverifieduser = await db.collection("unverifiedusers").findOne({
    phoneNumber: parseInt(phoneNumber, 10),
  });
};
