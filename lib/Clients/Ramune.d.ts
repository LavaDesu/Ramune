import { Client, ClientOptions, UserClient } from "./";
import { Token } from "../Responses";
/**
 * Represents an OAuth app, and should be the first thing to create in order
 * to use the library.
 *
 * To use the app with client credentials, call and wait for {@link refreshToken}
 */
export declare class Ramune extends Client {
    readonly appID: string;
    readonly appSecret: string;
    protected readonly missingTokenMessage = "Have you run connect()?";
    /**
     * Constructs an OAuth app
     *
     * After creating an instance, you may do any of the following to start using the API:
     * - Make unauthenticated requests
     * - Make authenticated requests after calling and waiting for {@link refreshToken}
     * - Create {@link UserClient | UserClients} with {@link createUserClient} which allows you to
     *   make requests on behalf of a user
     *
     * @param id - The OAuth app ID
     * @param secret - The OAuth app secret
     * @param options - Extra client options
     */
    constructor(id: string, secret: string, options?: ClientOptions);
    refreshToken(): Promise<Token>;
    /**
     * Creates a {@link UserClient} authenticated with this OAuth app
     *
     * @param token The initial token, which can either be a refresh token
     *              or an authentication code
     * @param type The type of the token
     * @param options Extra options to pass to the created UserClient
     *
     * @returns A {@link UserClient} to make authenticated requests on
     *          behalf of another user
     */
    createUserClient(token: string, type: "refresh" | "auth", options?: ClientOptions): Promise<UserClient>;
}
//# sourceMappingURL=Ramune.d.ts.map