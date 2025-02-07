import jwt from "jsonwebtoken";
import { UserAuthDTO } from "../../dto/user-auth.dto";

export class JwtHelper {
    static verifyToken = async (token: string) : Promise<UserAuthDTO> => {
        const response = await fetch("http://10.144.193.7:5000/auth/public-key")
        const data = await response.json();
        const publicKey = data.key;

        try {
          	const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
          	return decoded as UserAuthDTO; 
        } catch (error) {
          	throw new Error("Invalid or expired token");
        }
    }
}