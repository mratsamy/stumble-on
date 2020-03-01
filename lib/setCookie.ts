import { NextApiResponse } from "next"
import { serialize, CookieSerializeOptions } from "cookie"

export const setCookie = (
    response: NextApiResponse,
    name: string,
    value: string,
    options: CookieSerializeOptions = {}
) => {
    if (options["maxAge"] || false) {
        options["expires"] = new Date(Date.now() + options["maxAge"])
        options["maxAge"] /= 1000
    }

    // Check for the node env variable, if not production allow http connections to send cookies
    options["secure"] = process.env.NODE_ENV === "production"

    // look here if multiple cookies aren't set during a session
    response.setHeader("Set-Cookie", serialize(name, value, options))
}
