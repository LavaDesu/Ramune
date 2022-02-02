import { Client, ClientOptions, Ramune } from "./";
import { Token } from "../Responses";
/**
 * An OAuth Client that is authenticated as a user.
 */
export declare class UserClient extends Client {
    readonly parent: Ramune;
    /**
     * Constructs a UserClient
     *
     * @remark This is not meant to be constructed manually! Please use
     *         {@link Ramune.createUserClient} instead.
     *
     */
    constructor(parent: Ramune, token: Token, options?: ClientOptions);
    refreshToken(): Promise<Token>;
}
//# sourceMappingURL=UserClient.d.ts.map