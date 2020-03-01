import jwt from "jsonwebtoken"

export const isTokenValid = <T extends object>(token: string | T, maxAge: string): T | false => {
    try {
        const options = {
            maxAge,
        }

        if (typeof token !== "string") {
            token = token.toString()
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, options) as T
        return decoded
    } catch ({ name, message }) {}

    return false
}

export const createToken = <T extends object>(data: T, expiresIn: string): string | false => {
    const options = {
        expiresIn,
    }

    return jwt.sign(data, process.env.JWT_SECRET, options)
}
