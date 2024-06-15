export class DataConnetion {
    static readonly baseUrl = 'http://localhost:8081'
    static readonly downloadTheoryUrl = this.baseUrl + '/subject/theoryElement/files'
    static readonly downloadTaskUrl = this.baseUrl + '/subject/task/files'
    static readonly downloadDeliveryUrl = this.baseUrl + '/subject/delivery/files'
}