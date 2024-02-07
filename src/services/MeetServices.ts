import { HttpApiServices } from "./HttpApiServices";

export class MeetServices extends HttpApiServices{

    baseUrl = '/meet'

    async getMeets() {
        return await this.get(this.baseUrl);
    }

    async getObjectsById(id: string) {
        return await this.get(this.baseUrl+'/objects/'+id);
    }

    async deleteMeet(id: string) {
        return await this.delete(this.baseUrl+'/'+id);
    }

}