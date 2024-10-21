import React, { useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ProfileInfo from "./ProfileInfo.tsx";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Avatar = () => {
  const authContext = React.useContext(AuthContext);
  const [showProfileInfo, setShowProfileInfo] = React.useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowProfileInfo(false);
    }
  };

  useEffect(() => {
    if (showProfileInfo) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileInfo]);

  return (
    <div className="relative">
      <div
        onClick={() => setShowProfileInfo((prev) => !prev)}
        className="w-auto h-[30px] flex items-center cursor-pointer"
      >
        <PersonIcon
          className="text-white"
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <div className="ml-2 flex flex-col">
          <span>{authContext?.user?.email?.split("@")[0]}</span>
        </div>
        <KeyboardArrowDownIcon
          className="text-white"
          sx={{
            width: 30,
            height: 30,
          }}
        />
      </div>

      {showProfileInfo && (
        <div ref={profileRef} className="absolute top-10 z-50">
          <ProfileInfo handleClose={() => setShowProfileInfo(false)} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
