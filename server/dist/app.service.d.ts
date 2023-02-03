export declare class AppService {
    getHello(): string;
    getEmployees(page: number): Promise<any>;
    findEmployee(email: string): Promise<any>;
}
