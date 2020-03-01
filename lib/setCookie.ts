import { NextApiResponse } from "next"
import { serialize } from "cookie"

export const setCookie = (response: NextApiResponse, name: string, value: string, options: object = {}) => {
    if (options["maxAge"] || false) {
        options["expires"] = new Date(Date.now() + options["maxAge"])
        options["maxAge"] /= 1000
    }

    // look here if multiple cookies aren't set during a session
    response.setHeader("Set-Cookie", serialize(name, value, options))
}
