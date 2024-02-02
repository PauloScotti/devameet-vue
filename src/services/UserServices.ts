import { HttpApiServices } from "./HttpApiServices";

export class UserServices extends HttpApiServices{
    async updateUser(body: any) {
        return await this.put('user', body);
    }

}