import ms from "ms"

import { IUser } from "~api/users/users"
import { isTokenValid as IsTokenValid, createToken as CreateToken } from "~api/token/token"

/**
 * Refesh Tokens are used in conjunction with authentication tokens
 *
 * Access tokens expire every ~20 minutes. Refresh tokens take longer to expire,
 * and a valid refresh token can be used to grant a new access token without requiring
 * the user from logging back in again
 */

export type RefreshToken = {
    userId: string
    username: string
    email: string
}

const expiresIn: string = "3d"

export const expiresInMS = ms(expiresIn)

export const isTokenValid = (token: string | RefreshToken): RefreshToken | false => {
    return IsTokenValid<RefreshToken>(token, expiresIn)
}

export const createToken = (user: IUser): string | false => {
    const data: RefreshToken = {
        userId: user._id,
        username: user.displayName || "",
        email: user.email,
    }

    return CreateToken<RefreshToken>(data, expiresIn)
}
