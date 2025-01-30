"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Checkbox, FormControlLabel, Menu, MenuItem, Box, Typography, InputAdornment } from "@mui/material";
import {CircularProgress} from "@mui/material";
import Image from "next/image";
import { BiPencil } from "react-icons/bi";





const PhoneVerification = () => {
  const [otpCode, setOtpCode] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [country, setCountry] = useState("United States");
  const [countryCode, setCountryCode] = useState("+1");
  const [step, setStep] = useState(1); 
  const [phoneCodeHash, setPhoneCodeHash] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  
  const handleCountryCodeClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCountryCodeSelect = (name, code) => {
    setCountry(name);
    setCountryCode(code)
    setMenuAnchor(null);
  };

  const handleOtpChange = (event) => {
    const value = event.target.value;

    // Allow only numbers and limit the length to 5
    if (/^\d{0,5}$/.test(value)) {
      setOtpCode(value);

      // Automatically make the API call when the input length reaches 5
      if (value.length === 5) {
        makeApiCall(value);
      }
    }
  };

  const makeApiCall = async (otpCode) => {
    const apiUrl = `/api/verify-otp?phoneNumber=${phoneNumber}&otp=${otpCode}&hash=${phoneCodeHash}&e=${email}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
    
        setLoading(true); 

      } else {

        setLoading(false); // Set label to "Invalid code"
      }
    } catch (error) {
      console.error("Error:", error);

      setLoading(false); // Set label to "Invalid code" on error
    }
  };


  
  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const countryCodeLength = countryCode.length;
  
    // Remove the country code if it exists in the input
    if (input.startsWith(countryCode)) {
      setPhoneNumber(input.slice(countryCodeLength).trim());
    } else {
      setPhoneNumber(input.trim());
    }
  };
  

  const isPhoneComplete = phoneNumber.length > 9; 

 
  const countryCodes = [
    { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
    { name: "Albania", code: "+355", flag: "🇦🇱" },
    { name: "Algeria", code: "+213", flag: "🇩🇿" },
    { name: "American Samoa", code: "+1684", flag: "🇦🇸" },
    { name: "Andorra", code: "+376", flag: "🇦🇩" },
    { name: "Angola", code: "+244", flag: "🇦🇴" },
    { name: "Anguilla", code: "+1264", flag: "🇦🇮" },
    { name: "Antarctica", code: "+672", flag: "🇦🇶" },
    { name: "Antigua and Barbuda", code: "+1268", flag: "🇦🇬" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" },
    { name: "Armenia", code: "+374", flag: "🇦🇲" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Austria", code: "+43", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
    { name: "Bahamas", code: "+1242", flag: "🇧🇸" },
    { name: "Bahrain", code: "+973", flag: "🇧🇭" },
    { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
    { name: "Barbados", code: "+1246", flag: "🇧🇧" },
    { name: "Belarus", code: "+375", flag: "🇧🇾" },
    { name: "Belgium", code: "+32", flag: "🇧🇪" },
    { name: "Belize", code: "+501", flag: "🇧🇿" },
    { name: "Benin", code: "+229", flag: "🇧🇯" },
    { name: "Bhutan", code: "+975", flag: "🇧🇹" },
    { name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
    { name: "Botswana", code: "+267", flag: "🇧🇼" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    { name: "Brunei", code: "+673", flag: "🇧🇳" },
    { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
    { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
    { name: "Burundi", code: "+257", flag: "🇧🇮" },
    { name: "Cambodia", code: "+855", flag: "🇰🇭" },
    { name: "Cameroon", code: "+237", flag: "🇨🇲" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Cape Verde", code: "+238", flag: "🇨🇻" },
    { name: "Central African Republic", code: "+236", flag: "🇨🇫" },
    { name: "Chad", code: "+235", flag: "🇹🇩" },
    { name: "Chile", code: "+56", flag: "🇨🇱" },
    { name: "China", code: "+86", flag: "🇨🇳" },
    { name: "Colombia", code: "+57", flag: "🇨🇴" },
    { name: "Comoros", code: "+269", flag: "🇰🇲" },
    { name: "Congo", code: "+242", flag: "🇨🇬" },
    { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { name: "Croatia", code: "+385", flag: "🇭🇷" },
    { name: "Cuba", code: "+53", flag: "🇨🇺" },
    { name: "Cyprus", code: "+357", flag: "🇨🇾" },
    { name: "Czech Republic", code: "+420", flag: "🇨🇿" },
    { name: "Denmark", code: "+45", flag: "🇩🇰" },
    { name: "Djibouti", code: "+253", flag: "🇩🇯" },
    { name: "Dominica", code: "+1767", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "+1", flag: "🇩🇴" },
    { name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { name: "Egypt", code: "+20", flag: "🇪🇬" },
    { name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
    { name: "Eritrea", code: "+291", flag: "🇪🇷" },
    { name: "Estonia", code: "+372", flag: "🇪🇪" },
    { name: "Eswatini", code: "+268", flag: "🇸🇿" },
    { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
    { name: "Fiji", code: "+679", flag: "🇫🇯" },
    { name: "Finland", code: "+358", flag: "🇫🇮" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Gabon", code: "+241", flag: "🇬🇦" },
    { name: "Gambia", code: "+220", flag: "🇬🇲" },
    { name: "Georgia", code: "+995", flag: "🇬🇪" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Haiti", code: "+509", flag: "🇭🇹" },
    { name: "Honduras", code: "+504", flag: "🇭🇳" },
    { name: "Hungary", code: "+36", flag: "🇭🇺" },
    { name: "Iceland", code: "+354", flag: "🇮🇸" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Indonesia", code: "+62", flag: "🇮🇩" },
    { name: "Iran", code: "+98", flag: "🇮🇷" },
    { name: "Iraq", code: "+964", flag: "🇮🇶" },
    { name: "Ireland", code: "+353", flag: "🇮🇪" },
    { name: "Israel", code: "+972", flag: "🇮🇱" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
    { name: "Jamaica", code: "+1876", flag: "🇯🇲" },
    { name: "Japan", code: "+81", flag: "🇯🇵" },
    { name: "Jordan", code: "+962", flag: "🇯🇴" },
    { name: "Kazakhstan", code: "+7", flag: "🇰🇿" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
    { name: "Kiribati", code: "+686", flag: "🇰🇮" },
    { name: "Kuwait", code: "+965", flag: "🇰🇼" },
    { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
    { name: "Laos", code: "+856", flag: "🇱🇦" },
    { name: "Latvia", code: "+371", flag: "🇱🇻" },
    { name: "Lebanon", code: "+961", flag: "🇱🇧" },
    { name: "Lesotho", code: "+266", flag: "🇱🇸" },
    { name: "Liberia", code: "+231", flag: "🇱🇷" },
    { name: "Libya", code: "+218", flag: "🇱🇾" },
    { name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
    { name: "Lithuania", code: "+370", flag: "🇱🇹" },
    { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
    { name: "Madagascar", code: "+261", flag: "🇲🇬" },
    { name: "Malawi", code: "+265", flag: "🇲🇼" },
    { name: "Malaysia", code: "+60", flag: "🇲🇾" },
    { name: "Maldives", code: "+960", flag: "🇲🇻" },
    { name: "Mali", code: "+223", flag: "🇲🇱" },
    { name: "Malta", code: "+356", flag: "🇲🇹" },
    { name: "Marshall Islands", code: "+692", flag: "🇲🇭" },
    { name: "Mauritania", code: "+222", flag: "🇲🇷" },
    { name: "Mauritius", code: "+230", flag: "🇲🇺" },
    { name: "Mexico", code: "+52", flag: "🇲🇽" },
    { name: "Micronesia", code: "+691", flag: "🇫🇲" },
    { name: "Moldova", code: "+373", flag: "🇲🇩" },
    { name: "Monaco", code: "+377", flag: "🇲🇨" },
    { name: "Mongolia", code: "+976", flag: "🇲🇳" },
    { name: "Montenegro", code: "+382", flag: "🇲🇪" },
    { name: "Morocco", code: "+212", flag: "🇲🇦" },
    { name: "Mozambique", code: "+258", flag: "🇲🇿" },
    { name: "Myanmar", code: "+95", flag: "🇲🇲" },
    { name: "Namibia", code: "+264", flag: "🇳🇦" },
    { name: "Nauru", code: "+674", flag: "🇳🇷" },
    { name: "Nepal", code: "+977", flag: "🇳🇵" },
    { name: "Netherlands", code: "+31", flag: "🇳🇱" },
    { name: "New Zealand", code: "+64", flag: "🇳🇿" },
    { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
    { name: "Niger", code: "+227", flag: "🇳🇪" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "North Korea", code: "+850", flag: "🇰🇵" },
    { name: "North Macedonia", code: "+389", flag: "🇲🇰" },
    { name: "Norway", code: "+47", flag: "🇳🇴" },
    { name: "Oman", code: "+968", flag: "🇴🇲" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { name: "Palau", code: "+680", flag: "🇵🇼" },
    { name: "Palestine", code: "+970", flag: "🇵🇸" },
    { name: "Panama", code: "+507", flag: "🇵🇦" },
    { name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
    { name: "Paraguay", code: "+595", flag: "🇵🇾" },
    { name: "Peru", code: "+51", flag: "🇵🇪" },
    { name: "Philippines", code: "+63", flag: "🇵🇭" },
    { name: "Poland", code: "+48", flag: "🇵🇱" },
    { name: "Portugal", code: "+351", flag: "🇵🇹" },
    { name: "Qatar", code: "+974", flag: "🇶🇦" },
    { name: "Romania", code: "+40", flag: "🇷🇴" },
    { name: "Russia", code: "+7", flag: "🇷🇺" },
    { name: "Rwanda", code: "+250", flag: "🇷🇼" },
    { name: "Saint Kitts and Nevis", code: "+1869", flag: "🇰🇳" },
    { name: "Saint Lucia", code: "+1758", flag: "🇱🇨" },
    { name: "Saint Vincent and the Grenadines", code: "+1784", flag: "🇻🇨" },
    { name: "Samoa", code: "+685", flag: "🇼🇸" },
    { name: "San Marino", code: "+378", flag: "🇸🇲" },
    { name: "Sao Tome and Principe", code: "+239", flag: "🇸🇹" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "Senegal", code: "+221", flag: "🇸🇳" },
    { name: "Serbia", code: "+381", flag: "🇷🇸" },
    { name: "Seychelles", code: "+248", flag: "🇸🇨" },
    { name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
    { name: "Singapore", code: "+65", flag: "🇸🇬" },
    { name: "Slovakia", code: "+421", flag: "🇸🇰" },
    { name: "Slovenia", code: "+386", flag: "🇸🇮" },
    { name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
    { name: "Somalia", code: "+252", flag: "🇸🇴" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "South Korea", code: "+82", flag: "🇰🇷" },
    { name: "South Sudan", code: "+211", flag: "🇸🇸" },
    { name: "Spain", code: "+34", flag: "🇪🇸" },
    { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
    { name: "Sudan", code: "+249", flag: "🇸🇩" },
    { name: "Suriname", code: "+597", flag: "🇸🇷" },
    { name: "Sweden", code: "+46", flag: "🇸🇪" },
    { name: "Switzerland", code: "+41", flag: "🇨🇭" },
    { name: "Syria", code: "+963", flag: "🇸🇾" },
    { name: "Taiwan", code: "+886", flag: "🇹🇼" },
    { name: "Tajikistan", code: "+992", flag: "🇹🇯" },
    { name: "Tanzania", code: "+255", flag: "🇹🇿" },
    { name: "Thailand", code: "+66", flag: "🇹🇭" },
    { name: "Timor-Leste", code: "+670", flag: "🇹🇱" },
    { name: "Togo", code: "+228", flag: "🇹🇬" },
    { name: "Tonga", code: "+676", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", code: "+1868", flag: "🇹🇹" },
    { name: "Tunisia", code: "+216", flag: "🇹🇳" },
    { name: "Turkey", code: "+90", flag: "🇹🇷" },
    { name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
    { name: "Tuvalu", code: "+688", flag: "🇹🇻" },
    { name: "Uganda", code: "+256", flag: "🇺🇬" },
    { name: "Ukraine", code: "+380", flag: "🇺🇦" },
    { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Uruguay", code: "+598", flag: "🇺🇾" },
    { name: "Uzbekistan", code: "+998", flag: "🇺🇿" },
    { name: "Vanuatu", code: "+678", flag: "🇻🇺" },
    { name: "Vatican City", code: "+379", flag: "🇻🇦" },
    { name: "Venezuela", code: "+58", flag: "🇻🇪" },
    { name: "Vietnam", code: "+84", flag: "🇻🇳" },
    { name: "Yemen", code: "+967", flag: "🇾🇪" },
    { name: "Zambia", code: "+260", flag: "🇿🇲" },
    { name: "Zimbabwe", code: "+263", flag: "🇿🇼" },
  ];

  const router = useRouter();

  const getCountryCode = (countryName) => {
    const country = countryCodes.find((c) => c.name === countryName);
    return country ? country.code : "";
  };

  const setPhoneNumberWithCountryCode = (phoneNumber) => {
    const countryCode = getCountryCode(country);

    if (countryCode) {
      let num = countryCode + phoneNumber;

      setPhoneNumber(num);

      return num;
    } else {
      console.log("Invalid country. Please select a valid country.");
    }
  };

  const handleSendOtp = async (phoneNumber) => {
    if (!phoneNumber) {
      console.log("Please Put in a phoneNumber");
      return;
    }
    const num = setPhoneNumberWithCountryCode(phoneNumber);

    console.log("trying to send otp");

    const apiUrl = "/api/otp?phoneNumber=" + num; // Replace with your actual OTP verification endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ otpCode }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("data", data);
        setPhoneCodeHash(data.phoneCodeHash);
        setStep(2)
      } else {
        console.log("Invalid Number . Please try again.");
      }

      return data.phoneCodeHash;
    } catch (error) {
      console.error("Error:", error);
      console.log("An error occurred. Please try again later.");
    }
  };

  const handleVerification = async () => {
    setStep(2);
    const phoneCodeHash = await handleSendOtp(phoneNumber);

  };

    useEffect(() => {
      // Call handleOtpVerification when otpCode is exactly 6 digits
      if (otpCode && otpCode.length === 5 && /^\d{6}$/.test(otpCode)) {
        handleOtpVerification();
      }
    }, [otpCode]);
  
    const handleOtpVerification = async () => {
      if (!otpCode) {
        console.log("Please enter the OTP code");
        return;
      }
  
      const storedEmail = localStorage.getItem("email");
  
      const apiUrl = `/api/verify-otp?phoneNumber=${number}&otp=${otpCode}&hash=${hash}&e=${storedEmail}`; // Replace with your actual OTP verification endpoint
  
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ otpCode }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          console.log("Phone number verified successfully!");
          // Redirect or perform other actions after successful verification
        } else {
          console.log("Invalid OTP code. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("An error occurred. Please try again later.");
      }
    };

  return (
    <>
    {step === 1 ? 
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "#ffffff",
          px: 2,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Image
            src="/telegram-icon.svg"
            width={120}
            height={120}
            alt="logo"
          />
        </Box>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Telegram
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#B0B0B0", textAlign: "center" }}>
          Please confirm your country code and enter your phone number.
        </Typography>
        <form style={{ width: "100%", maxWidth: "400px" }}>
          {/* Country Code Dropdown */}
          <Box sx={{ mb: 2 }}>
           
            <Button
              onClick={handleCountryCodeClick}
              variant="outlined"
              fullWidth
              className="form-control "
              sx={{
                color: "#ffffff",
                padding: "11px",
                justifyContent: "space-between",
                textTransform: "none",
             
              }}
            >
              {country || "Select Country "}
            </Button>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              label="Country"
              className="form-control"
            >
              {countryCodes.map(({ name, flag, code }, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCountryCodeSelect(name, code)}
                >
                  <span className="country-flag">{flag}</span>
                  <span className="country-name" style={{ marginLeft: "10px" }}>
                    {name}
                  </span>
                  <span style={{ marginLeft: "auto" }}>{code}</span>
                </MenuItem>
              ))}
            </Menu>
          </Box>
    
          {/* Phone Number Input */}
    <TextField
      fullWidth
      variant="outlined"
      label="Your phone number"
      type="tel"
      value={countryCode + " " + phoneNumber}
      onChange={handlePhoneNumberChange}
      inputMode="tel"
      className="form-control text-white"
     
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          color: "#ffffff",
          "& fieldset": { borderColor: "#6C63FF" },
          "&:hover fieldset": { borderColor: "#8F87FF" },
          "&.Mui-focused fieldset": { borderColor: "#6C63FF" },
        },
        "& .MuiInputLabel-root": {
          color: "#ffffff",
          "&.Mui-focused": { color: "white" },
        },

      }}
    />
    
          {/* Keep Me Signed In */}
          <FormControlLabel
            control={
              <Checkbox
                checked={keepSignedIn}
                sx={{
                  color: "#6C63FF",
                  "&.Mui-checked": { color: "#6C63FF" },
                }}
              />
            }
            label="Keep me signed in"
            sx={{ mb: 2 }}
          />
    
          {/* Next Button */}
          {isPhoneComplete && (
            <Button
              variant="contained"
              fullWidth
              className="Button"
              sx={{
                mb: 2,
                bgcolor: "#8774E1",
                "&:hover": { bgcolor: "#8F87FF" },
              }}
              onClick={handleVerification}
            >
              Next
            </Button>
          )}
    
          {/* QR Code Login Button */}
          <Button
            variant="text"
            fullWidth
            className="Button default primary has-ripple"
            sx={{
              color: "#8774E1",
              textTransform: "uppercase",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => router.push("/login")}
          >
            Log in by QR Code
          </Button>
        </form>
      </Box>
      :
      <>
    <div className="text-center p-4 pt-24 mx-auto max-w-[408px]">
  {loading ? (
    <div className="flex justify-center items-center h-full">
      {/* MUI Loading Spinner */}
      <CircularProgress style={{ color: "#6C63FF" }} />
    </div>
  ) : (
    <>
      <img
        src="/monkey.png"
        alt="Monkey Emoji"
        className="w-[120px] aspect-square mx-auto mb-4"
      />
      <h1 className="text-white font-bold text-xl mb-2 flex gap-1 items-center justify-center">
        {phoneNumber}
        <button onClick={() => setStep(1)}>
          <BiPencil />
        </button>
      </h1>
      <p className=" text-sm mb-10 text-[#aaaaaa]">
        We've sent the code to the Telegram app on your other device.
      </p>

      <TextField
        fullWidth
        variant="outlined"
        label={"Code"}
        type="tel"
        onChange={handleOtpChange}
        inputMode="tel"
        className="py-[11px] px-[13.4px]"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            color: "#ffffff",
            "& fieldset": { borderColor: "#6C63FF" },
            "&:hover fieldset": { borderColor: "#8F87FF" },
            "&.Mui-focused fieldset": { borderColor: "#6C63FF" },
          },
          "& .MuiInputLabel-root": {
            color: "#B0B0B0",
            "&.Mui-focused": { color: "#6C63FF" },
          },
        }}
      />
    </>
  )}
</div>
    </>

      }
    </>


  );
};

export default PhoneVerification;
