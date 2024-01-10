import axios from "axios";

export const sentOtp = async (number, otp) => {
  try {
    const response = await axios.get(
      `https://panel.smsbangladesh.com/otp?user=eng.zhshimul@gmail.com&to=88${number}&text=Your OTP is ${otp}&password=shimuldiba1996@%26&`
    );
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    // Handle errors here
  }
};
