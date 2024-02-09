"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "@/libs/sendMail";
import { sentOtp } from "@/libs/sentOtp";
import { v4 as uuidv4 } from "uuid";
import { uploadFileToS3 } from "@/libs/uploadimage";
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
  const sellerid = {
    id: sellerId,
  };

  return jwt.sign(sellerid, process.env.ACTIVATED_KEY, {
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

  const hashPassword = await bcrypt.hash(password, 10);
  const hashCPassword = await bcrypt.hash(cpassword, 10);
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
    let images = null;
    const name = uuidv4();
    try {
      const buffer = Buffer.from(await image.arrayBuffer());
      const res = await uploadFileToS3(buffer, name + image.name);
      images = res;
    } catch (error) {
      return { error: "Something  wrong! Try Later" };
    }

    const res = await db.collection("tempShops").insertOne({
      userName,
      shopName,
      images,
      email,
      address,
      category,
      hashPassword,
      hashCPassword,
      phoneNumber: parseInt(phoneNumber, 10),
      zipCode: parseInt(zipCode, 10),
      createdAt: new Date(),
    });
    if (res.acknowledged == true) {
      const ActivationToken = createActivationToken(String(res.insertedId));

      const activeUrl = `https://rajdhola.com/create-seller/activation/${ActivationToken}`;

      try {
        await sendMail({
          email: email,
          subject: "Activate your shop",
          html: `
        <html lang="en">

      <head></head>
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">The sales intelligence platform that helps you uncover qualified leads.<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
      </div>

      <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
          <tr style="width:100%">
            <td><img alt="rajdhola.com" src="https://firebasestorage.googleapis.com/v0/b/my-portfolio-d208f.appspot.com/o/rajdhola_white_logo.svg?alt=media&token=c72b4e45-54ea-410e-a9d1-167695190311" width="170" height="50" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
              <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${shopName},</p>
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
          message: `please cheak your email : ${email} to activate your account`,
        };
      } catch (error) {
        return { error: error.message, status: 500 };
      }
    }
  } catch (error) {
    return { error: error.message };
  }
};

export async function activationSeller(token) {
  try {
    const db = await connectToDB();
    const id = jwt.verify(token, process.env.ACTIVATED_KEY);

    if (!id) {
      return {
        error: "Invalid token",
      };
    }
    const isSeller = await db.collection("tempShops").findOne({
      _id: new ObjectId(id.id),
    });
    const {
      userName,
      shopName,
      email,
      phoneNumber,
      address,
      zipCode,
      category,
      hashPassword,
      hashCPassword,
      images,
    } = isSeller;
    const sellerExit = await db.collection("sellers").findOne({
      email: email,
    });
    if (!sellerExit) {
      const res = db.collection("sellers").insertOne({
        userName,
        shopName,
        images,
        email,
        address,
        category,
        hashPassword,
        hashCPassword,
        phoneNumber: parseInt(phoneNumber, 10),
        zipCode: parseInt(zipCode, 10),
        status: "pending",
        v: parseInt(0, 10),
        available_Banalace: parseInt(0, 10),
        withdrawRequest: [],
        createdAt: new Date(),
      });

      if (res.acknowledged == true) {
        await db.collection("tempShops").deleteOne({
          _id: new ObjectId(id.id),
        });
        return {
          success: true,
          message: "shop created successfully",
        };
      }
    } else
      return {
        success: false,
        error: "shop already exists",
      };
    return {
      success: false,
    };
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
    console.log(addressType);
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
