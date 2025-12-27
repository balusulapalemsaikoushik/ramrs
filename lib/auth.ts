import "server-only";
import { auth0 } from "./auth0";

export async function getUsername() {
    const session = await auth0.getSession();
    if (session !== null) {
        return session.user.name;
    }
    return undefined;
}
