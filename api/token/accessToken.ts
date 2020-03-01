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

export type AccessToken = {
    userId: string
    count: number
}

const expiresIn: string = "20m"

export const expiresInMS = ms(expiresIn)

export const isTokenValid = (token: string | AccessToken): AccessToken | false => {
    return IsTokenValid<AccessToken>(token, expiresIn)
}

export const createToken = (user: IUser): string | false => {
    const data: AccessToken = {
        userId: user._id,
        count: user.count,
    }

    return CreateToken<AccessToken>(data, expiresIn)
}
