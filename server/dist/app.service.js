"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async getEmployees(page) {
        const response = await axios_1.default.get(`https://reqres.in/api/users?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    async findEmployee(email) {
        const response = await axios_1.default.get(`https://reqres.in/api/users`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        let employees = response.data.data.filter(e => e.email === email);
        if ((employees === null || employees === void 0 ? void 0 : employees.length) > 0) {
            return employees;
        }
        const totalPages = response.data.total_pages;
        const promises = Array.from({ length: totalPages }, (_, i) => i + 1).slice(1).map(async (p) => {
            const resp = await this.getEmployees(p);
            employees = [...employees, ...resp.data.filter(e => e.email === email)];
            if (employees.length > 0) {
                return employees;
            }
        });
        await Promise.all(promises);
        return employees;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map