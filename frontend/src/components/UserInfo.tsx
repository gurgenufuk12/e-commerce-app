import React from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";

interface UserInfoProps {
  userUid: string | undefined;
  userEmail: string | undefined;
  username: string | undefined;
  userPhone: string | undefined;
  userAddresses:
    | {
        addressId: string;
        addressName: string;
        addressType: string;
        addressLocation: string;
      }[]
    | undefined;
}
const UserInfo: React.FC<UserInfoProps> = ({
  userUid,
  userEmail,
  username,
  userPhone,
  userAddresses,
}) => {
  const authContext = React.useContext(AuthContext);
  console.log(authContext?.user);

  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-bold">Kullanıcı Adı: {username}</h1>
      <p className="text-sm">Email: {userEmail}</p>
      <p className="text-sm">Telefon: {userPhone}</p>
      <h1 className="text-lg font-bold">Adresler</h1>
      <div className="flex flex-col">
        {userAddresses?.map((address) => (
          <div key={address.addressId} className="flex flex-row items-center">
            <div className="flex flex-col h-1/3 p-4 w-2/3">
              <h1 className="text-lg font-bold">{address.addressName}</h1>
              <p className="text-sm">{address.addressType}</p>
              <p className="text-sm">{address.addressLocation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserInfo;
